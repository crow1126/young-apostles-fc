// api/sync.js - Vercel Serverless Function
// Allows authenticated publishing to GitHub without requiring a GitHub token on mobile devices!

const GH_OWNER = 'crow1126';
const GH_REPO = 'young-apostles-fc';
const GH_BRANCH = 'main';
const GH_FILE = 'data/cms.json';

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || req.body?.token;
    if (!token) {
      return res.status(400).json({
        error: 'No GitHub token configured on server or in request.',
        needsClientToken: true
      });
    }

    const { payload, label } = req.body || {};
    if (!payload) {
      return res.status(400).json({ error: 'Missing CMS payload in request body.' });
    }

    // 1. Fetch current file SHA from GitHub
    const getRes = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}?ref=${GH_BRANCH}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'YAFC-Admin-Serverless'
      }
    });

    if (!getRes.ok) {
      const errData = await getRes.json().catch(() => ({}));
      return res.status(getRes.status).json({
        error: `GitHub fetch failed: ${errData.message || getRes.statusText}`
      });
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;

    // 2. Prepare new content
    const newContent = JSON.stringify(payload, null, 2);
    const encoded = Buffer.from(newContent, 'utf-8').toString('base64');

    // 3. Commit new content to GitHub
    const putRes = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'YAFC-Admin-Serverless'
      },
      body: JSON.stringify({
        message: `cms: update ${label || 'content'} via Admin Portal`,
        content: encoded,
        sha: sha,
        branch: GH_BRANCH
      })
    });

    if (!putRes.ok) {
      const errData = await putRes.json().catch(() => ({}));
      return res.status(putRes.status).json({
        error: `GitHub commit failed: ${errData.message || putRes.statusText}`
      });
    }

    const result = await putRes.json();
    return res.status(200).json({
      success: true,
      message: `Successfully pushed ${label || 'changes'} to live site!`,
      commit: result.commit?.sha
    });
  } catch (error) {
    console.error('Sync error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
