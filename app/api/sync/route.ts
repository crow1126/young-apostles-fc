import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminToken } from '@/lib/admin-token';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const GH_OWNER = process.env.GITHUB_OWNER || 'crow1126';
const GH_REPO = process.env.GITHUB_REPO || 'young-apostles-fc';
const GH_BRANCH = process.env.GITHUB_BRANCH || 'main';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-token',
    },
  });
}

/**
 * Atomically commits multiple files to GitHub in a single commit using the
 * Git Trees API. This guarantees both data/cms.json and public/data/cms.json
 * are ALWAYS identical and only ONE Vercel deployment is triggered per save.
 */
async function atomicGitCommit(
  token: string,
  files: { path: string; content: string }[],
  message: string
): Promise<{ sha: string; url: string }> {
  const baseUrl = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}`;
  const headers: Record<string, string> = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'YAFC-Admin-Serverless',
  };

  // 1. Get latest commit SHA on the branch
  const refRes = await fetch(`${baseUrl}/git/ref/heads/${GH_BRANCH}`, { headers, cache: 'no-store' } as RequestInit);
  if (!refRes.ok) {
    const err = await refRes.json().catch(() => ({}));
    throw new Error(`GitHub: failed to get branch ref — ${(err as any).message || refRes.statusText}`);
  }
  const refData = await refRes.json();
  const latestCommitSha: string = refData.object.sha;

  // 2. Get the tree SHA from that commit
  const commitRes = await fetch(`${baseUrl}/git/commits/${latestCommitSha}`, { headers, cache: 'no-store' } as RequestInit);
  if (!commitRes.ok) {
    const err = await commitRes.json().catch(() => ({}));
    throw new Error(`GitHub: failed to get commit info — ${(err as any).message || commitRes.statusText}`);
  }
  const commitData = await commitRes.json();
  const baseTreeSha: string = commitData.tree.sha;

  // 3. Create a new tree containing ALL updated files simultaneously
  const treeRes = await fetch(`${baseUrl}/git/trees`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: files.map((f) => ({
        path: f.path,
        mode: '100644',
        type: 'blob',
        content: f.content, // GitHub accepts UTF-8 string directly — no base64 needed
      })),
    }),
  } as RequestInit);
  if (!treeRes.ok) {
    const err = await treeRes.json().catch(() => ({}));
    throw new Error(`GitHub: failed to create tree — ${(err as any).message || treeRes.statusText}`);
  }
  const newTree = await treeRes.json();

  // 4. Create a new commit pointing at the new tree
  const newCommitRes = await fetch(`${baseUrl}/git/commits`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      message,
      tree: newTree.sha,
      parents: [latestCommitSha],
    }),
  } as RequestInit);
  if (!newCommitRes.ok) {
    const err = await newCommitRes.json().catch(() => ({}));
    throw new Error(`GitHub: failed to create commit — ${(err as any).message || newCommitRes.statusText}`);
  }
  const newCommit = await newCommitRes.json();

  // 5. Advance the branch ref to the new commit
  const updateRefRes = await fetch(`${baseUrl}/git/refs/heads/${GH_BRANCH}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ sha: newCommit.sha, force: false }),
  } as RequestInit);

  if (!updateRefRes.ok) {
    // Retry with force in case of a fast-forward race condition
    const forceRes = await fetch(`${baseUrl}/git/refs/heads/${GH_BRANCH}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ sha: newCommit.sha, force: true }),
    } as RequestInit);
    if (!forceRes.ok) {
      const err = await forceRes.json().catch(() => ({}));
      throw new Error(`GitHub: failed to update branch ref — ${(err as any).message || forceRes.statusText}`);
    }
  }

  return {
    sha: newCommit.sha,
    url: `https://github.com/${GH_OWNER}/${GH_REPO}/commit/${newCommit.sha}`,
  };
}

/**
 * Automatically computes Young Apostles' record (played, diff, points)
 * from completed fixtures and keeps standings and leagueTable in sync.
 */
function autoSyncYoungApostlesStandings(cms: Record<string, any>) {
  if (!Array.isArray(cms.fixtures)) return;

  const yaMatches = cms.fixtures.filter(
    (f: any) =>
      Boolean(f && f.score && typeof f.score === 'string') &&
      ((f.home && f.home.toLowerCase().includes('young apostles')) ||
       (f.away && f.away.toLowerCase().includes('young apostles')))
  );

  if (!yaMatches.length) return;

  let played = 0;
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let goalsFor = 0;
  let goalsAgainst = 0;

  for (const m of yaMatches) {
    const isHome = m.home && m.home.toLowerCase().includes('young apostles');
    const parts = m.score.split('-').map((s: string) => parseInt(s.trim(), 10));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      played += 1;
      const hGoals = parts[0];
      const aGoals = parts[1];
      const yGoals = isHome ? hGoals : aGoals;
      const oppGoals = isHome ? aGoals : hGoals;
      goalsFor += yGoals;
      goalsAgainst += oppGoals;
      if (yGoals > oppGoals) wins += 1;
      else if (yGoals === oppGoals) draws += 1;
      else losses += 1;
    }
  }

  const diff = goalsFor - goalsAgainst;
  const points = (wins * 3) + draws;
  const diffStr = diff > 0 ? `+${diff}` : String(diff);

  cms.standings = {
    rank: cms.standings?.rank || '17',
    played: String(played),
    diff: diffStr,
    points: String(points),
  };

  if (Array.isArray(cms.leagueTable)) {
    const yaRow = cms.leagueTable.find(
      (t: any) => t.isClub || (t.name && t.name.toLowerCase().includes('young apostles'))
    );
    if (yaRow) {
      yaRow.played = played;
      yaRow.diff = diffStr;
      yaRow.points = points;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    // ── Authentication ────────────────────────────────────────────────────────
    const cookieToken = request.cookies.get('ya_admin_token')?.value;
    const headerToken = request.headers.get('x-admin-token');
    const adminToken = body.adminToken || headerToken || cookieToken;

    let isAuthenticated = verifyAdminToken(adminToken);

    if (!isAuthenticated) {
      const session = await getServerSession(authOptions).catch(() => null);
      if (session && (session.user as any)?.role === 'admin') {
        isAuthenticated = true;
      }
    }

    // Personal GitHub PAT provided by caller is also accepted
    if (!isAuthenticated && body.token && typeof body.token === 'string' && body.token.startsWith('ghp_')) {
      isAuthenticated = true;
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Valid admin session required to publish changes.' },
        { status: 401, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // ── GitHub token ──────────────────────────────────────────────────────────
    const token = body.token || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: 'No GitHub token configured on server or in request.', needsClientToken: true },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // ── Payload validation & safe merge ──────────────────────────────────────
    const { payload, label } = body;
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json(
        { error: 'Missing or invalid CMS payload in request body.' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Read existing cms.json to ensure no section is wiped out if client sent partial data
    let existingCms: Record<string, any> = {};
    try {
      const cmsPath = path.join(process.cwd(), 'data', 'cms.json');
      if (fs.existsSync(cmsPath)) {
        existingCms = JSON.parse(fs.readFileSync(cmsPath, 'utf-8'));
      }
    } catch (e) {
      console.warn('Could not read existing data/cms.json for merge:', e);
    }

    // Merge: existing server data overridden by any keys provided in client payload
    const merged: Record<string, any> = { ...existingCms, ...payload };

    // Auto-recalculate Young Apostles standings from fixtures whenever fixtures exist
    if (Array.isArray(merged.fixtures)) {
      autoSyncYoungApostlesStandings(merged);
    }

    // Always stamp a fresh server-side timestamp so CDN cache-busting works
    merged.lastUpdated = new Date().toISOString();
    const newContent = JSON.stringify(merged, null, 2);

    // ── Write local copies for dev / self-hosted environments ─────────────────
    try {
      const cmsDir = path.join(process.cwd(), 'data');
      const publicCmsDir = path.join(process.cwd(), 'public', 'data');
      if (fs.existsSync(cmsDir)) {
        fs.writeFileSync(path.join(cmsDir, 'cms.json'), newContent, 'utf-8');
      }
      if (fs.existsSync(publicCmsDir)) {
        fs.writeFileSync(path.join(publicCmsDir, 'cms.json'), newContent, 'utf-8');
      }
    } catch (localErr) {
      console.warn('Could not write local cms.json copy:', localErr);
    }

    // ── Atomic GitHub commit — both files in ONE commit → ONE Vercel deploy ──
    const commitMessage = `cms: update ${label || 'content'} via Admin Portal`;
    const result = await atomicGitCommit(
      token,
      [
        { path: 'data/cms.json', content: newContent },
        { path: 'public/data/cms.json', content: newContent },
      ],
      commitMessage
    );

    return NextResponse.json(
      {
        success: true,
        message: `Successfully pushed ${label || 'changes'} to live site!`,
        commit: result.sha,
        commitUrl: result.url,
      },
      { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (error: any) {
    console.error('[/api/sync] Sync error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
