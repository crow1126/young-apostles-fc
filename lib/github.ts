import { Octokit } from '@octokit/rest';
import { StandingsData, CommitInfo } from './types';

const GH_OWNER = process.env.GITHUB_OWNER || 'crow1126';
const GH_REPO = process.env.GITHUB_REPO || 'young-apostles-fc';
const GH_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GH_FILE = 'data/standings.json';

function getOctokit(): Octokit {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN is not configured in server environment. Please set GITHUB_TOKEN.');
  }
  return new Octokit({ auth: token });
}

export function isGitHubConfigured(): boolean {
  return Boolean(process.env.GITHUB_TOKEN);
}

/**
 * Fetch last 20 commits touching data/standings.json
 */
export async function getStandingsCommitHistory(): Promise<CommitInfo[]> {
  try {
    const octokit = getOctokit();
    const res = await octokit.repos.listCommits({
      owner: GH_OWNER,
      repo: GH_REPO,
      path: GH_FILE,
      per_page: 20,
    });

    return res.data.map(item => ({
      sha: item.sha,
      shortSha: item.sha.substring(0, 7),
      date: item.commit.author?.date || item.commit.committer?.date || '',
      author: item.commit.author?.name || item.author?.login || 'Admin',
      message: item.commit.message,
      url: item.html_url,
    }));
  } catch (err: any) {
    console.warn('Failed to fetch commit history via GitHub API:', err.message);
    return [];
  }
}

/**
 * Fetch the contents of data/standings.json at a specific commit SHA (for Revert)
 */
export async function getStandingsAtCommit(sha: string): Promise<StandingsData> {
  const octokit = getOctokit();
  const res = await octokit.repos.getContent({
    owner: GH_OWNER,
    repo: GH_REPO,
    path: GH_FILE,
    ref: sha,
  });

  if ('content' in res.data && res.data.content) {
    const decoded = Buffer.from(res.data.content, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  }

  throw new Error(`Could not load data/standings.json at commit ${sha}`);
}

export interface PublishResult {
  mode: 'direct' | 'pr';
  commitSha?: string;
  commitUrl?: string;
  prNumber?: number;
  prUrl?: string;
  branch?: string;
  message: string;
}

/**
 * Publish updated standings to GitHub.
 * Mode:
 *   - 'direct': commits directly to main branch
 *   - 'pr': creates a feature branch, commits to it, and opens a Pull Request to main
 */
export async function publishStandingsToGitHub(
  data: StandingsData,
  mode: 'direct' | 'pr' = 'pr',
  commitMessage?: string
): Promise<PublishResult> {
  const octokit = getOctokit();
  const contentStr = JSON.stringify(data, null, 2);
  const contentBase64 = Buffer.from(contentStr, 'utf-8').toString('base64');
  const message = commitMessage || `chore(standings): update GPL table via Admin Control Panel`;

  if (mode === 'direct') {
    // 1. Get current file SHA on main branch
    let fileSha: string | undefined;
    try {
      const currentFile = await octokit.repos.getContent({
        owner: GH_OWNER,
        repo: GH_REPO,
        path: GH_FILE,
        ref: GH_BRANCH,
      });
      if ('sha' in currentFile.data) {
        fileSha = currentFile.data.sha;
      }
    } catch (e) {
      // File might not exist yet on remote, fileSha stays undefined
    }

    // 2. Commit directly to main
    const commitRes = await octokit.repos.createOrUpdateFileContents({
      owner: GH_OWNER,
      repo: GH_REPO,
      path: GH_FILE,
      message,
      content: contentBase64,
      sha: fileSha,
      branch: GH_BRANCH,
    });

    const sha = commitRes.data.commit.sha ?? '';
    const url = commitRes.data.commit.html_url || `https://github.com/${GH_OWNER}/${GH_REPO}/commit/${sha}`;

    return {
      mode: 'direct' as const,
      commitSha: sha,
      commitUrl: url,
      message: `Directly committed to ${GH_BRANCH} (${sha ? sha.substring(0, 7) : 'unknown'})`,
    };
  } else {
    // PR Mode:
    // 1. Get the SHA of the latest commit on main
    const refData = await octokit.git.getRef({
      owner: GH_OWNER,
      repo: GH_REPO,
      ref: `heads/${GH_BRANCH}`,
    });
    const mainSha = refData.data.object.sha;

    // 2. Create a new branch
    const branchName = `standings-update-${Date.now()}`;
    await octokit.git.createRef({
      owner: GH_OWNER,
      repo: GH_REPO,
      ref: `refs/heads/${branchName}`,
      sha: mainSha,
    });

    // 3. Get existing file SHA on the new branch
    let fileSha: string | undefined;
    try {
      const fileData = await octokit.repos.getContent({
        owner: GH_OWNER,
        repo: GH_REPO,
        path: GH_FILE,
        ref: branchName,
      });
      if ('sha' in fileData.data) {
        fileSha = fileData.data.sha;
      }
    } catch (e) {
      // Ignore
    }

    // 4. Commit updated file to the new branch
    const commitRes = await octokit.repos.createOrUpdateFileContents({
      owner: GH_OWNER,
      repo: GH_REPO,
      path: GH_FILE,
      message,
      content: contentBase64,
      sha: fileSha,
      branch: branchName,
    });

    // 5. Open Pull Request to main
    const prRes = await octokit.pulls.create({
      owner: GH_OWNER,
      repo: GH_REPO,
      title: `Standings Update: GPL ${data.season} (${new Date().toLocaleDateString()})`,
      head: branchName,
      base: GH_BRANCH,
      body: `### GPL Standings Update\n\n- **Season**: ${data.season}\n- **Published by**: Admin Control Panel\n- **Teams**: 18 teams updated\n- **Source**: ${data.source}\n- **Timestamp**: ${new Date().toISOString()}\n\n*Merging this PR will trigger automated Vercel deployment.*`,
    });

    const prCommitSha = commitRes.data.commit.sha ?? '';
    return {
      mode: 'pr' as const,
      branch: branchName,
      prNumber: prRes.data.number,
      prUrl: prRes.data.html_url,
      commitSha: prCommitSha,
      commitUrl: commitRes.data.commit.html_url || `https://github.com/${GH_OWNER}/${GH_REPO}/commit/${prCommitSha}`,
      message: `Created Pull Request #${prRes.data.number} on branch ${branchName}`,
    };
  }
}
