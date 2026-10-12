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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-token',
    },
  });
}

/**
 * Creates a blob on GitHub and atomically commits files using the Git Trees API.
 */
async function commitImageAndCmsToGitHub(
  token: string,
  base64Image: string,
  imageRelPath: string,
  cmsRelPath: string,
  newCmsJsonStr: string,
  commitMessage: string
): Promise<{ sha: string }> {
  const baseUrl = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}`;
  const headers: Record<string, string> = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'YAFC-Admin-Serverless',
  };

  // 1. Create Git Blob for the binary image
  const blobRes = await fetch(`${baseUrl}/git/blobs`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      content: base64Image,
      encoding: 'base64',
    }),
  } as RequestInit);

  if (!blobRes.ok) {
    const err = await blobRes.json().catch(() => ({}));
    throw new Error(`GitHub blob creation failed: ${(err as any).message || blobRes.statusText}`);
  }
  const blobData = await blobRes.json();
  const imageBlobSha: string = blobData.sha;

  // 2. Get latest commit SHA on the branch
  const refRes = await fetch(`${baseUrl}/git/ref/heads/${GH_BRANCH}`, { headers, cache: 'no-store' } as RequestInit);
  if (!refRes.ok) {
    const err = await refRes.json().catch(() => ({}));
    throw new Error(`GitHub: failed to get branch ref — ${(err as any).message || refRes.statusText}`);
  }
  const refData = await refRes.json();
  const latestCommitSha: string = refData.object.sha;

  // 3. Get tree SHA from latest commit
  const commitRes = await fetch(`${baseUrl}/git/commits/${latestCommitSha}`, { headers, cache: 'no-store' } as RequestInit);
  if (!commitRes.ok) {
    const err = await commitRes.json().catch(() => ({}));
    throw new Error(`GitHub: failed to get commit info — ${(err as any).message || commitRes.statusText}`);
  }
  const commitData = await commitRes.json();
  const baseTreeSha: string = commitData.tree.sha;

  // 4. Create new tree containing:
  //    - data/standings-poster.jpg (binary blob)
  //    - public/data/standings-poster.jpg (binary blob)
  //    - data/cms.json (text)
  //    - public/data/cms.json (text)
  const treeEntries = [
    { path: imageRelPath, mode: '100644', type: 'blob', sha: imageBlobSha },
    { path: `public/${imageRelPath}`, mode: '100644', type: 'blob', sha: imageBlobSha },
    { path: cmsRelPath, mode: '100644', type: 'blob', content: newCmsJsonStr },
    { path: `public/${cmsRelPath}`, mode: '100644', type: 'blob', content: newCmsJsonStr },
  ];

  const treeRes = await fetch(`${baseUrl}/git/trees`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: treeEntries,
    }),
  } as RequestInit);

  if (!treeRes.ok) {
    const err = await treeRes.json().catch(() => ({}));
    throw new Error(`GitHub: failed to create tree — ${(err as any).message || treeRes.statusText}`);
  }
  const newTree = await treeRes.json();

  // 5. Create new commit
  const newCommitRes = await fetch(`${baseUrl}/git/commits`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      message: commitMessage,
      tree: newTree.sha,
      parents: [latestCommitSha],
    }),
  } as RequestInit);

  if (!newCommitRes.ok) {
    const err = await newCommitRes.json().catch(() => ({}));
    throw new Error(`GitHub: failed to create commit — ${(err as any).message || newCommitRes.statusText}`);
  }
  const newCommit = await newCommitRes.json();

  // 6. Advance branch ref
  const updateRefRes = await fetch(`${baseUrl}/git/refs/heads/${GH_BRANCH}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ sha: newCommit.sha, force: false }),
  } as RequestInit);

  if (!updateRefRes.ok) {
    const err = await updateRefRes.json().catch(() => ({}));
    throw new Error(`GitHub: failed to update ref — ${(err as any).message || updateRefRes.statusText}`);
  }

  return { sha: newCommit.sha };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    // ── Authentication ──────────────────────────────────────────────────────
    const cookieToken = request.cookies.get('ya_admin_token')?.value;
    const headerToken = request.headers.get('x-admin-token');
    const adminToken = body.adminToken || headerToken || cookieToken;

    let isAuthenticated = verifyAdminToken(adminToken);
    if (!isAuthenticated) {
      const session = await getServerSession(authOptions).catch(() => null);
      if (session && (session.user as any)?.role === 'admin') isAuthenticated = true;
    }
    if (!isAuthenticated && body.token && typeof body.token === 'string' && body.token.startsWith('ghp_')) {
      isAuthenticated = true;
    }
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const token = body.token || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: 'No GitHub token configured.', needsClientToken: true },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // ── Parse the data URI ──────────────────────────────────────────────────
    const { dataUrl, filename = 'standings-poster.jpg', label = 'standings poster' } = body;
    if (!dataUrl || !dataUrl.startsWith('data:')) {
      return NextResponse.json(
        { error: 'Missing or invalid dataUrl in request body.' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json(
        { error: 'Could not parse base64 data URI.' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const base64Content = match[2];
    const imageRelPath = `data/${filename}`;
    const publicImageRelPath = `public/data/${filename}`;
    const cmsRelPath = 'data/cms.json';
    const relativeWebPath = `data/${filename}`;

    // ── Read and update cms.json ────────────────────────────────────────────
    let existingCms: Record<string, any> = {};
    const cmsFilePath = path.join(process.cwd(), 'data', 'cms.json');
    try {
      if (fs.existsSync(cmsFilePath)) {
        existingCms = JSON.parse(fs.readFileSync(cmsFilePath, 'utf-8'));
      }
    } catch (e) {
      console.warn('Could not read existing cms.json:', e);
    }

    existingCms.standingsPoster = relativeWebPath;
    existingCms.lastUpdated = new Date().toISOString();
    const newCmsJsonStr = JSON.stringify(existingCms, null, 2);

    // ── Write locally for dev / immediate serving ───────────────────────────
    try {
      const imgBuffer = Buffer.from(base64Content, 'base64');
      const rootImgPath = path.join(process.cwd(), imageRelPath);
      const publicImgPath = path.join(process.cwd(), publicImageRelPath);
      fs.mkdirSync(path.dirname(rootImgPath), { recursive: true });
      fs.mkdirSync(path.dirname(publicImgPath), { recursive: true });
      fs.writeFileSync(rootImgPath, imgBuffer);
      fs.writeFileSync(publicImgPath, imgBuffer);

      // Write cms.json locally in both root and public
      fs.writeFileSync(cmsFilePath, newCmsJsonStr, 'utf-8');
      const publicCmsPath = path.join(process.cwd(), 'public', 'data', 'cms.json');
      fs.writeFileSync(publicCmsPath, newCmsJsonStr, 'utf-8');
    } catch (e) {
      console.warn('Local disk write error:', e);
    }

    // ── Atomically commit everything to GitHub in ONE single commit ─────────
    const commitResult = await commitImageAndCmsToGitHub(
      token,
      base64Content,
      imageRelPath,
      cmsRelPath,
      newCmsJsonStr,
      `cms: upload ${label} and update standingsPoster via Admin Portal`
    );

    return NextResponse.json(
      {
        success: true,
        path: relativeWebPath,
        url: `/${relativeWebPath}`,
        commit: commitResult.sha,
        message: `${label} uploaded and published live!`,
      },
      { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (error: any) {
    console.error('[/api/upload-image]', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
