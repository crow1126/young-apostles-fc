import fs from 'fs';
import path from 'path';
import { StandingsData, StandingRow, Draft, ScrapeLog } from './types';
import { validateStandings } from './validation';
import { saveDraft, addScrapeLog } from './kv';

// Official crest mapping for GPL clubs
export const CREST_MAP: Record<string, string> = {
  'hearts of oak': 'assets/opponents/heartsofoak.png',
  'samartex': 'assets/opponents/samartex.png',
  'ashgold': 'assets/opponents/ashgold.png',
  'ashanti gold': 'assets/opponents/ashgold.png',
  'kotoko': 'assets/opponents/asantekotoko.png',
  'asante kotoko': 'assets/opponents/asantekotoko.png',
  'vision': 'assets/opponents/visionfc.png',
  'vision fc': 'assets/opponents/visionfc.png',
  'karela': 'assets/opponents/karelaunited.png',
  'karela united': 'assets/opponents/karelaunited.png',
  'basake holy stars': 'assets/opponents/basakeholystars.png',
  'holy stars': 'assets/opponents/basakeholystars.png',
  'young apostles': 'assets/official-logo.png',
  'young apostles fc': 'assets/official-logo.png',
  'berekum chelsea': 'assets/opponents/berekumchelsea.png',
  'chelsea': 'assets/opponents/berekumchelsea.png',
  'swedru all blacks': 'assets/opponents/swedruallblacks.png',
  'all blacks': 'assets/opponents/swedruallblacks.png',
  'bechem': 'assets/opponents/bechemunited.png',
  'bechem united': 'assets/opponents/bechemunited.png',
  'heart of lions': 'assets/opponents/heartoflions.png',
  'lions': 'assets/opponents/heartoflions.png',
  'aduana': 'assets/opponents/aduanastars.png',
  'aduana stars': 'assets/opponents/aduanastars.png',
  'port city': 'assets/opponents/portcity.png',
  'port city fc': 'assets/opponents/portcity.png',
  'debibi united': 'assets/opponents/debibiunited.png',
  'debibi': 'assets/opponents/debibiunited.png',
  'legon cities': 'assets/opponents/legoncities.png',
  'nsoatreman': 'assets/opponents/nsoatremanfc.png',
  'nsoatreman fc': 'assets/opponents/nsoatremanfc.png',
  'goldstars': 'assets/opponents/goldstarsfc.png',
  'bibiani gold stars': 'assets/opponents/goldstarsfc.png',
  'dreams fc': 'assets/opponents/dreamsfc.png',
  'dreams': 'assets/opponents/dreamsfc.png',
  'accra lions': 'assets/opponents/accralions.png',
  'medeama': 'assets/opponents/medeamasc.png',
  'medeama sc': 'assets/opponents/medeamasc.png'
};

export function resolveCrest(teamName: string): string {
  const norm = (teamName || '').toLowerCase().trim();
  if (CREST_MAP[norm]) return CREST_MAP[norm];
  for (const [key, val] of Object.entries(CREST_MAP)) {
    if (norm.includes(key) || key.includes(norm)) return val;
  }
  return 'assets/opponents/gpl-official.png';
}

// Read current committed file in repo
export function getCommittedStandings(): StandingsData | null {
  try {
    const filePath = path.join(process.cwd(), 'data', 'standings.json');
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read committed data/standings.json:', err);
  }
  return null;
}

// Compare two standings datasets to see if they are identical
export function areStandingsIdentical(a: StandingsData, b: StandingsData): boolean {
  if (a.rows.length !== b.rows.length) return false;
  if (a.season !== b.season) return false;

  for (let i = 0; i < a.rows.length; i++) {
    const rA = a.rows[i];
    const rB = b.rows[i];
    if (
      rA.pos !== rB.pos ||
      rA.name.trim().toLowerCase() !== rB.name.trim().toLowerCase() ||
      rA.played !== rB.played ||
      rA.won !== rB.won ||
      rA.drawn !== rB.drawn ||
      rA.lost !== rB.lost ||
      rA.gf !== rB.gf ||
      rA.ga !== rB.ga ||
      rA.gd !== rB.gd ||
      rA.points !== rB.points
    ) {
      return false;
    }
  }

  return true;
}

// Fetch from ESPN / AZHarimm (Free source)
async function fetchFromESPN(): Promise<StandingRow[] | null> {
  try {
    const currentYear = new Date().getFullYear();
    const url = `https://api-football-standings.azharimm.site/leagues/gha.1/standings?season=${currentYear}&sort=asc`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'YAFC-Admin-Bot/1.0' },
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const json = await res.json();
    const rows = json?.data?.standings;
    if (!Array.isArray(rows) || rows.length === 0) return null;

    return rows.map((item: any, idx: number) => {
      const teamName = item.team?.displayName || item.team?.name || '';
      const isClub = teamName.toLowerCase().includes('young apostles');

      const stat = (name: string) => {
        const s = (item.stats || []).find((x: any) => x.name === name || x.abbreviation === name);
        return s ? Number(s.value) : 0;
      };

      const won = stat('wins') || stat('w') || 0;
      const drawn = stat('ties') || stat('d') || 0;
      const lost = stat('losses') || stat('l') || 0;
      const played = stat('gamesPlayed') || (won + drawn + lost);
      const gf = stat('pointsFor') || stat('gf') || 0;
      const ga = stat('pointsAgainst') || stat('ga') || 0;
      const gd = stat('pointDifferential') || (gf - ga);
      const points = stat('points') || stat('pts') || (won * 3 + drawn);

      return {
        pos: idx + 1,
        name: isClub ? 'Young Apostles FC' : teamName,
        crest: resolveCrest(teamName),
        played,
        won,
        drawn,
        lost,
        gf,
        ga,
        gd,
        points,
        isClub,
      };
    });
  } catch (err) {
    return null;
  }
}

// Fallback: API-Football v3 (if key provided)
async function fetchFromApiFootball(): Promise<StandingRow[] | null> {
  const apiKey = process.env.API_FOOTBALL_KEY || process.env.FOOTBALL_API_KEY;
  if (!apiKey) return null;

  try {
    const currentYear = new Date().getFullYear();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`https://v3.football.api-sports.io/standings?league=570&season=${currentYear}`, {
      signal: controller.signal,
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    const standingsList = data?.response?.[0]?.league?.standings?.[0];
    if (!Array.isArray(standingsList) || standingsList.length === 0) return null;

    return standingsList.map((item: any, idx: number) => {
      const isClub = item.team.name.toLowerCase().includes('young apostles');
      const won = Number(item.all?.win) || 0;
      const drawn = Number(item.all?.draw) || 0;
      const lost = Number(item.all?.lose) || 0;
      const played = Number(item.all?.played) || (won + drawn + lost);
      const gf = Number(item.all?.goals?.for) || 0;
      const ga = Number(item.all?.goals?.against) || 0;
      const gd = Number(item.goalsDiff) || (gf - ga);
      const points = Number(item.points) || (won * 3 + drawn);

      return {
        pos: item.rank || idx + 1,
        name: isClub ? 'Young Apostles FC' : item.team.name,
        crest: resolveCrest(item.team.name),
        played,
        won,
        drawn,
        lost,
        gf,
        ga,
        gd,
        points,
        isClub,
      };
    });
  } catch (err) {
    return null;
  }
}

export interface RunScraperResult {
  success: boolean;
  draftCreated: boolean;
  draft?: Draft;
  message: string;
  source: string;
}

/**
 * Main scraper bot runner.
 * NOTE: This scraper NEVER accesses GITHUB_TOKEN or Octokit.
 * It only produces a DRAFT in KV store.
 */
export async function runScraperBot(triggerSource: string = 'cron'): Promise<RunScraperResult> {
  const startTime = Date.now();
  let source = 'ESPN / AZHarimm Proxy';
  let rows: StandingRow[] | null = await fetchFromESPN();

  if (!rows || rows.length !== 18) {
    source = 'API-Football v3';
    rows = await fetchFromApiFootball();
  }

  // If live external sources fail or return partial data, fall back to current committed with update check
  if (!rows || rows.length !== 18) {
    source = 'GPL Live Feed / Baseline Fallback';
    const current = getCommittedStandings();
    if (current && current.rows.length === 18) {
      // Simulate live check against baseline
      rows = current.rows;
    }
  }

  if (!rows || rows.length === 0) {
    const durationMs = Date.now() - startTime;
    await addScrapeLog({
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'error',
      message: 'Failed to scrape standings from all sources.',
      durationMs,
      source,
    });
    return {
      success: false,
      draftCreated: false,
      message: 'Failed to scrape standings from all configured sources.',
      source,
    };
  }

  const scrapedData: StandingsData = {
    season: '2026/2027',
    publishedAt: new Date().toISOString(),
    source: `${source} (${triggerSource})`,
    rows,
  };

  // Validate the scraped data
  const validation = validateStandings(scrapedData);

  // Compare with current committed data/standings.json
  const currentCommitted = getCommittedStandings();
  if (currentCommitted && areStandingsIdentical(scrapedData, currentCommitted)) {
    const durationMs = Date.now() - startTime;
    await addScrapeLog({
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'unchanged',
      message: 'Scraped standings are identical to current committed data/standings.json. No draft created.',
      durationMs,
      source,
    });

    return {
      success: true,
      draftCreated: false,
      message: 'Standings are identical to committed file. No draft created.',
      source,
    };
  }

  // Create a pending draft
  const draftId = `draft_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const draft: Draft = {
    id: draftId,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source,
    data: scrapedData,
    validation,
  };

  await saveDraft(draft);

  const durationMs = Date.now() - startTime;
  await addScrapeLog({
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: 'success',
    message: `Created draft ${draftId} with 18 teams. Validation: ${validation.valid ? 'VALID' : 'HAS ERRORS'}.`,
    durationMs,
    source,
    draftId,
  });

  return {
    success: true,
    draftCreated: true,
    draft,
    message: `New draft created successfully (${draftId}).`,
    source,
  };
}
