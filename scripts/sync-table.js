// scripts/sync-table.js
// Standings updater for Ghana Premier League (GPL)
// Can be run via:
// 1. GitHub Actions scheduled cron (e.g. every Sunday & Monday night)
// 2. Node CLI: node scripts/sync-table.js
// 3. Admin portal 1-click trigger

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
  { pos: 1, name: "Hearts of Oak", played: 2, diff: "+5", points: 6 },
  { pos: 2, name: "Samartex", played: 2, diff: "+3", points: 6 },
  { pos: 3, name: "Ashgold", played: 2, diff: "+2", points: 4 },
  { pos: 4, name: "Kotoko", played: 2, diff: "+1", points: 4 },
  { pos: 5, name: "Vision FC", played: 2, diff: "+1", points: 3 },
  { pos: 6, name: "Karela Utd", played: 2, diff: "0", points: 3 },
  { pos: 7, name: "Basake Holy Stars", played: 2, diff: "0", points: 3 },
  { pos: 8, name: "Young Apostles FC", played: 2, diff: "-2", points: 3, isClub: true },
  { pos: 9, name: "Berekum Chelsea", played: 2, diff: "-2", points: 3 },
  { pos: 10, name: "Swedru All Blacks", played: 2, diff: "0", points: 3 },
  { pos: 11, name: "Bechem Utd", played: 2, diff: "-1", points: 3 },
  { pos: 12, name: "Heart of Lions", played: 2, diff: "-1", points: 1 },
  { pos: 13, name: "Aduana Stars", played: 2, diff: "-1", points: 1 },
  { pos: 14, name: "Port City", played: 1, diff: "0", points: 1 },
  { pos: 15, name: "Debibi United", played: 2, diff: "-1", points: 1 },
  { pos: 16, name: "Nsoatreman FC", played: 2, diff: "-2", points: 1 },
  { pos: 17, name: "Bibiani Gold Stars", played: 2, diff: "-2", points: 1 },
  { pos: 18, name: "Accra Lions", played: 2, diff: "-3", points: 0 }
].map(team => ({
  ...team,
  crest: resolveCrest(team.name),
  isClub: team.name.toLowerCase().includes('young apostles')
}));

async function fetchFromApiFootball(apiKey) {
  if (!apiKey) return null;
  try {
    console.log('Fetching live GPL standings from API-Football...');
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
  let table = await fetchFromApiFootball(apiKey);

  if (!table) {
    console.log('Using verified GPL table baseline with full club crests.');
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
