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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    // Verify admin authentication
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

    // Direct personal GitHub PAT provided by caller is also accepted
    if (!isAuthenticated && body.token && typeof body.token === 'string' && body.token.startsWith('ghp_')) {
      isAuthenticated = true;
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Valid admin session required to publish changes.' },
        {
          status: 401,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    const token =
      body.token ||
      process.env.GITHUB_TOKEN ||
      process.env.GH_TOKEN;

    if (!token) {
      return NextResponse.json(
        {
          error: 'No GitHub token configured on server or in request.',
          needsClientToken: true,
        },
        {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    const { payload, label } = body;
    if (!payload) {
      return NextResponse.json(
        { error: 'Missing CMS payload in request body.' },
        {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    // Also update local file if running locally or during dev
    try {
      const cmsDir = path.join(process.cwd(), 'data');
      const publicCmsDir = path.join(process.cwd(), 'public', 'data');
      const dataStr = JSON.stringify(payload, null, 2);

      if (fs.existsSync(cmsDir)) {
        fs.writeFileSync(path.join(cmsDir, 'cms.json'), dataStr, 'utf-8');
      }
      if (fs.existsSync(publicCmsDir)) {
        fs.writeFileSync(path.join(publicCmsDir, 'cms.json'), dataStr, 'utf-8');
      }
    } catch (localErr) {
      console.warn('Could not write local cms.json copy:', localErr);
    }

    // 1. Fetch current file SHA from GitHub for data/cms.json
    const targetFile = 'data/cms.json';
    const getRes = await fetch(
      `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${targetFile}?ref=${GH_BRANCH}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'YAFC-Admin-Serverless',
        },
        cache: 'no-store',
      }
    );

    let sha: string | undefined;
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    // 2. Commit new content to GitHub
    const newContent = JSON.stringify(payload, null, 2);
    const encoded = Buffer.from(newContent, 'utf-8').toString('base64');

    const putRes = await fetch(
      `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${targetFile}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'YAFC-Admin-Serverless',
        },
        body: JSON.stringify({
          message: `cms: update ${label || 'content'} via Admin Portal`,
          content: encoded,
          ...(sha ? { sha } : {}),
          branch: GH_BRANCH,
        }),
      }
    );

    if (!putRes.ok) {
      const errData = await putRes.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: `GitHub commit failed: ${errData.message || putRes.statusText}`,
        },
        {
          status: putRes.status,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    const result = await putRes.json();

    // Also commit to public/data/cms.json if possible
    try {
      const pubFile = 'public/data/cms.json';
      const getPubRes = await fetch(
        `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${pubFile}?ref=${GH_BRANCH}`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'YAFC-Admin-Serverless',
          },
          cache: 'no-store',
        }
      );
      let pubSha: string | undefined;
      if (getPubRes.ok) {
        const pubData = await getPubRes.json();
        pubSha = pubData.sha;
      }
      await fetch(
        `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${pubFile}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'YAFC-Admin-Serverless',
          },
          body: JSON.stringify({
            message: `cms: sync public copy of ${label || 'content'}`,
            content: encoded,
            ...(pubSha ? { sha: pubSha } : {}),
            branch: GH_BRANCH,
          }),
        }
      );
    } catch (e) {
      console.warn('Could not sync public/data/cms.json in git:', e);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully pushed ${label || 'changes'} to live site!`,
        commit: result.commit?.sha,
      },
      {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  } catch (error: any) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  }
}
