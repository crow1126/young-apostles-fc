// scripts/sync-table.js
// Standings updater for Ghana Premier League (GPL)
// Source priority:
//   1. FREE: ESPN/AZHarimm scrape (api-football-standings.azharimm.site) — no key needed
//   2. FALLBACK: API-Football v3 (paid, requires API_FOOTBALL_KEY secret)
//   3. SAFETY NET: Hardcoded baseline table
//
// Schedule: every 6 hours via GitHub Actions (free on public repos)
// Can also be run via:
//   - Node CLI: node scripts/sync-table.js
//   - Admin portal 1-click trigger

const fs = require('fs');
const path = require('path');

// Crest mapping for all 18 Ghana Premier League clubs
const CREST_MAP = {
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

function resolveCrest(teamName) {
  const norm = (teamName || '').toLowerCase().trim();
  if (CREST_MAP[norm]) return CREST_MAP[norm];
  for (const [key, val] of Object.entries(CREST_MAP)) {
    if (norm.includes(key) || key.includes(norm)) return val;
  }
  return 'assets/opponents/gpl-official.png';
}

// Current default 18-club standings
const DEFAULT_TABLE = [
  { pos: 1, name: "Hearts of Oak", played: 3, diff: "+5", points: 7 },
  { pos: 2, name: "Samartex", played: 3, diff: "+3", points: 7 },
  { pos: 3, name: "Holy Stars", played: 3, diff: "+1", points: 6 },
  { pos: 4, name: "Asante Kotoko SC", played: 3, diff: "+1", points: 5 },
  { pos: 5, name: "Debibi", played: 3, diff: "+2", points: 4 },
  { pos: 6, name: "Vision FC", played: 3, diff: "+1", points: 4 },
  { pos: 7, name: "Ashanti Gold", played: 3, diff: "+1", points: 4 },
  { pos: 8, name: "Port City", played: 2, diff: "+1", points: 4 },
  { pos: 9, name: "Aduana Stars", played: 3, diff: "0", points: 4 },
  { pos: 10, name: "All Blacks", played: 3, diff: "0", points: 4 },
  { pos: 11, name: "Bechem United", played: 3, diff: "-1", points: 4 },
  { pos: 12, name: "Karela United", played: 3, diff: "-1", points: 3 },
  { pos: 13, name: "Bibiani Gold Stars", played: 3, diff: "-1", points: 3 },
  { pos: 14, name: "Berekum Chelsea", played: 3, diff: "-3", points: 3 },
  { pos: 15, name: "Young Apostles FC", played: 3, diff: "-5", points: 3, isClub: true },
  { pos: 16, name: "Medeama SC", played: 2, diff: "0", points: 2 },
  { pos: 17, name: "Heart of Lions", played: 3, diff: "-1", points: 2 },
  { pos: 18, name: "Dreams FC", played: 3, diff: "-3", points: 1 }
].map(team => ({
  ...team,
  crest: resolveCrest(team.name),
  isClub: team.name.toLowerCase().includes('young apostles')
}));

// ─────────────────────────────────────────────────────────
// SOURCE 1 (FREE, no key): ESPN via AZHarimm open-source proxy
// Endpoint: https://api-football-standings.azharimm.site/leagues/gha.1/standings
// Note: unofficial scraper — can break if ESPN changes their structure
// ─────────────────────────────────────────────────────────
async function fetchFromESPN() {
  try {
    console.log('Fetching GPL standings from ESPN/AZHarimm (free, no key)...');
    const currentYear = new Date().getFullYear();
    const url = `https://api-football-standings.azharimm.site/leagues/gha.1/standings?season=${currentYear}&sort=asc`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'YAFC-Bot/1.0 (youngapostlesfcgh.com)' }
    });
    if (!res.ok) throw new Error(`ESPN proxy returned ${res.status}: ${res.statusText}`);
    const json = await res.json();

    // AZHarimm response shape: { data: { standings: [ { team, stats } ] } }
    const rows = json?.data?.standings;
    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error('ESPN proxy returned empty standings array');
    }

    return rows.map((item, idx) => {
      const teamName = item.team?.displayName || item.team?.name || '';
      const isClub = teamName.toLowerCase().includes('young apostles');

      // Stats are an array of { name, value } objects
      const stat = (name) => {
        const s = (item.stats || []).find(s => s.name === name || s.abbreviation === name);
        return s ? Number(s.value) : 0;
      };
      const gd = stat('pointDifferential') || stat('gd') || 0;
      const diffStr = gd > 0 ? `+${gd}` : `${gd}`;

      return {
        pos: idx + 1,
        name: isClub ? 'Young Apostles FC' : teamName,
        crest: resolveCrest(teamName),
        played: stat('gamesPlayed') || stat('played') || 0,
        diff: diffStr,
        points: stat('points') || 0,
        isClub
      };
    });
  } catch (err) {
    console.warn(`ESPN/AZHarimm fetch failed: ${err.message}`);
    return null;
  }
}

// ─────────────────────────────────────────────────────────
// SOURCE 2 (PAID fallback): API-Football v3 (requires API_FOOTBALL_KEY secret)
// ─────────────────────────────────────────────────────────
async function fetchFromApiFootball(apiKey) {
  if (!apiKey) return null;
  try {
    console.log('Fetching live GPL standings from API-Football (paid fallback)...');
    const currentYear = new Date().getFullYear();
    // League ID 570 = Premier League (Ghana)
    const res = await fetch(`https://v3.football.api-sports.io/standings?league=570&season=${currentYear}`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });
    if (!res.ok) throw new Error(`API returned ${res.status}: ${res.statusText}`);
    const data = await res.json();
    const standingsList = data?.response?.[0]?.league?.standings?.[0];
    if (!Array.isArray(standingsList) || standingsList.length === 0) {
      console.warn('No standings data returned in API response.');
      return null;
    }

    return standingsList.map((item, idx) => {
      const isClub = item.team.name.toLowerCase().includes('young apostles');
      const diffVal = item.goalsDiff;
      const diffStr = diffVal > 0 ? `+${diffVal}` : `${diffVal}`;
      return {
        pos: item.rank || idx + 1,
        name: isClub ? 'Young Apostles FC' : item.team.name,
        crest: resolveCrest(item.team.name),
        played: item.all.played,
        diff: diffStr,
        points: item.points,
        form: item.form || '',
        isClub: isClub
      };
    });
  } catch (err) {
    console.error('API-Football fetch error:', err.message);
    return null;
  }
}

async function updateStandingsData() {
  const apiKey = process.env.API_FOOTBALL_KEY || process.env.FOOTBALL_API_KEY;

  // Try sources in priority order
  let table = await fetchFromESPN();

  if (!table) {
    console.log('ESPN source failed, trying API-Football fallback...');
    table = await fetchFromApiFootball(apiKey);
  }

  if (!table) {
    console.log('All live sources failed. Using hardcoded GPL baseline table.');
    table = DEFAULT_TABLE;
  }

  const cmsPath = path.join(__dirname, '..', 'data', 'cms.json');
  let cms = {};
  if (fs.existsSync(cmsPath)) {
    try {
      cms = JSON.parse(fs.readFileSync(cmsPath, 'utf8'));
    } catch(e) {
      cms = {};
    }
  }

  // Find Young Apostles row
  const yaClub = table.find(t => t.isClub || t.name.toLowerCase().includes('young apostles')) || {
    pos: 8, played: 2, diff: '-2', points: 3
  };

  cms.leagueTable = table;
  cms.standings = {
    rank: String(yaClub.pos),
    played: String(yaClub.played),
    diff: String(yaClub.diff),
    points: String(yaClub.points)
  };
  cms.standingsLastSynced = new Date().toISOString();

  fs.writeFileSync(cmsPath, JSON.stringify(cms, null, 2), 'utf8');
  console.log(`✅ Successfully updated data/cms.json with ${table.length} GPL clubs!`);
  console.log(`Young Apostles FC: Pos ${yaClub.pos} | P ${yaClub.played} | Diff ${yaClub.diff} | PTS ${yaClub.points}`);
}

if (require.main === module) {
  updateStandingsData();
}

module.exports = { updateStandingsData, resolveCrest, DEFAULT_TABLE };
