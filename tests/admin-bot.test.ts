import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StandingsData } from '@/lib/types';
import { NextRequest } from 'next/server';

// Hoist mock methods for Octokit
const mockGetContent = vi.fn();
const mockCreateOrUpdateFileContents = vi.fn();
const mockListCommits = vi.fn();
const mockGetRef = vi.fn();
const mockCreateRef = vi.fn();
const mockPullsCreate = vi.fn();
const mockOctokitConstructor = vi.fn();

vi.mock('@octokit/rest', () => {
  return {
    Octokit: class MockOctokit {
      repos = {
        getContent: mockGetContent,
        createOrUpdateFileContents: mockCreateOrUpdateFileContents,
        listCommits: mockListCommits,
      };
      git = {
        getRef: mockGetRef,
        createRef: mockCreateRef,
      };
      pulls = {
        create: mockPullsCreate,
      };
      constructor(...args: any[]) {
        mockOctokitConstructor(...args);
      }
    },
  };
});

// Import after mocking
import { runScraperBot } from '@/lib/scraper';
import { publishStandingsToGitHub, getStandingsAtCommit } from '@/lib/github';
import { getDrafts } from '@/lib/kv';
import { middleware } from '@/middleware';

// Sample mock standings data with 18 valid teams
const sampleValidStandings: StandingsData = {
  season: '2026/2027',
  publishedAt: '2026-09-29T12:00:00.000Z',
  source: 'Test GPL Source',
  rows: Array.from({ length: 18 }, (_, i) => ({
    pos: i + 1,
    name: i === 7 ? 'Young Apostles FC' : `GPL Team ${i + 1}`,
    crest: 'assets/opponents/gpl-official.png',
    played: 3,
    won: 1,
    drawn: 1,
    lost: 1,
    gf: 3,
    ga: 2,
    gd: 1, // 3 - 2 = 1
    points: 4, // 1*3 + 1 = 4
    isClub: i === 7,
  })),
};

describe('Young Apostles FC Admin Control Panel Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TEST 1: Scraper run creates a draft and never calls the GitHub client
  it('1. Scraper run creates a draft and never calls the GitHub client', async () => {
    // Run the scraper bot
    const result = await runScraperBot('test-cron');

    expect(result.success).toBe(true);

    const drafts = await getDrafts();
    expect(Array.isArray(drafts)).toBe(true);

    // CRITICAL: Guarantee Octokit was never instantiated or called by the scraper bot
    expect(mockOctokitConstructor).not.toHaveBeenCalled();
    expect(mockCreateOrUpdateFileContents).not.toHaveBeenCalled();
    expect(mockPullsCreate).not.toHaveBeenCalled();
  });

  // TEST 2: Publish commits only data/standings.json with the correct content
  it('2. Publish commits only data/standings.json with the correct content', async () => {
    process.env.GITHUB_TOKEN = 'test-mock-token';
    process.env.GITHUB_OWNER = 'crow1126';
    process.env.GITHUB_REPO = 'young-apostles-fc';
    process.env.GITHUB_BRANCH = 'main';

    let committedPath = '';
    let committedBranch = '';
    let committedContentBase64 = '';

    mockGetContent.mockResolvedValueOnce({
      data: { sha: 'existing-sha-123' },
    });

    mockCreateOrUpdateFileContents.mockImplementationOnce(async (params: any) => {
      committedPath = params.path;
      committedBranch = params.branch;
      committedContentBase64 = params.content;
      return {
        data: {
          commit: {
            sha: 'commit-sha-999',
            html_url: 'https://github.com/crow1126/young-apostles-fc/commit/commit-sha-999',
          },
        },
      };
    });

    const publishResult = await publishStandingsToGitHub(sampleValidStandings, 'direct');

    expect(publishResult.mode).toBe('direct');
    expect(publishResult.commitSha).toBe('commit-sha-999');

    // Assert that ONLY data/standings.json was committed
    expect(committedPath).toBe('data/standings.json');
    expect(committedBranch).toBe('main');

    // Assert that the decoded content matches the standings JSON
    const decodedStr = Buffer.from(committedContentBase64, 'base64').toString('utf-8');
    const parsed = JSON.parse(decodedStr);
    expect(parsed.season).toBe(sampleValidStandings.season);
    expect(parsed.rows.length).toBe(18);
    expect(parsed.rows[7].name).toBe('Young Apostles FC');
  });

  // TEST 3: pr mode opens a PR and does not touch main
  it('3. pr mode opens a PR and does not touch main', async () => {
    process.env.GITHUB_TOKEN = 'test-mock-token';

    let branchCreated = '';
    let committedBranch = '';
    let prHead = '';
    let prBase = '';

    // Mock git getRef
    mockGetRef.mockResolvedValueOnce({
      data: { object: { sha: 'main-base-sha-111' } },
    });

    // Mock git createRef
    mockCreateRef.mockImplementationOnce(async (params: any) => {
      branchCreated = params.ref;
      return { data: {} };
    });

    // Mock getContent on branch
    mockGetContent.mockResolvedValueOnce({
      data: { sha: 'branch-file-sha' },
    });

    // Mock createOrUpdateFileContents on the feature branch
    mockCreateOrUpdateFileContents.mockImplementationOnce(async (params: any) => {
      committedBranch = params.branch;
      return {
        data: {
          commit: {
            sha: 'branch-commit-sha-222',
            html_url: 'https://github.com/commit/branch-commit-sha-222',
          },
        },
      };
    });

    // Mock pulls.create
    mockPullsCreate.mockImplementationOnce(async (params: any) => {
      prHead = params.head;
      prBase = params.base;
      return {
        data: {
          number: 42,
          html_url: 'https://github.com/crow1126/young-apostles-fc/pull/42',
        },
      };
    });

    const result = await publishStandingsToGitHub(sampleValidStandings, 'pr');

    expect(result.mode).toBe('pr');
    expect(result.prNumber).toBe(42);
    expect(result.prUrl).toContain('/pull/42');

    // Assert that a new branch was created and main was NOT touched
    expect(branchCreated).toContain('refs/heads/standings-update-');
    expect(committedBranch).not.toBe('main');
    expect(committedBranch).toContain('standings-update-');
    expect(prHead).toContain('standings-update-');
    expect(prBase).toBe('main');
  });

  // TEST 4: Revert restores an older version
  it('4. Revert restores an older version', async () => {
    process.env.GITHUB_TOKEN = 'test-mock-token';

    const historicalStandings: StandingsData = {
      season: '2025/2026',
      publishedAt: '2025-10-15T10:00:00.000Z',
      source: 'Older Version Archive',
      rows: Array.from({ length: 18 }, (_, i) => ({
        pos: i + 1,
        name: `Historical Team ${i + 1}`,
        crest: 'assets/opponents/gpl-official.png',
        played: 2,
        won: 1,
        drawn: 0,
        lost: 1,
        gf: 2,
        ga: 2,
        gd: 0,
        points: 3,
      })),
    };

    const historicalBase64 = Buffer.from(
      JSON.stringify(historicalStandings),
      'utf-8'
    ).toString('base64');

    mockGetContent.mockResolvedValueOnce({
      data: {
        content: historicalBase64,
      },
    });

    const olderData = await getStandingsAtCommit('historical-commit-sha-777');

    expect(olderData.season).toBe('2025/2026');
    expect(olderData.source).toBe('Older Version Archive');
    expect(olderData.rows.length).toBe(18);
    expect(olderData.rows[0].name).toBe('Historical Team 1');
  });

  // TEST 5: Unauthenticated access to /admin/* is redirected
  it('5. Unauthenticated access to /admin/* is redirected to /admin/login', async () => {
    // Test 1: Accessing /admin without token redirects to /admin/login
    const req1 = new NextRequest('http://localhost:3000/admin');
    const res1 = await middleware(req1);
    expect(res1.status).toBe(307);
    expect(res1.headers.get('location')).toContain('/admin/login');

    // Test 2: Accessing /admin/drafts without token redirects
    const req2 = new NextRequest('http://localhost:3000/admin/drafts');
    const res2 = await middleware(req2);
    expect(res2.status).toBe(307);
    expect(res2.headers.get('location')).toContain('/admin/login');

    // Test 3: Accessing /admin/login is allowed without redirect
    const req3 = new NextRequest('http://localhost:3000/admin/login');
    const res3 = await middleware(req3);
    expect(res3.status).toBe(200);
    expect(res3.headers.get('location')).toBeNull();
  });
});
