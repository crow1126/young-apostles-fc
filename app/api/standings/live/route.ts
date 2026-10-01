import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const CREST_MAP: Record<string, string> = {
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

function resolveCrest(teamName: string): string {
  const norm = (teamName || '').toLowerCase().trim();
  if (CREST_MAP[norm]) return CREST_MAP[norm];
  for (const [key, val] of Object.entries(CREST_MAP)) {
    if (norm.includes(key) || key.includes(norm)) return val;
  }
  return 'assets/opponents/gpl-official.png';
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET() {
  try {
    const res = await fetch(
      'https://site.api.espn.com/apis/v2/sports/soccer/gha.1/standings',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error(`ESPN API returned ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    const entries = data?.children?.[0]?.standings?.entries;

    if (!Array.isArray(entries) || entries.length === 0) {
      throw new Error('ESPN API returned empty standings entries');
    }

    const table = entries.map((entry: any, idx: number) => {
      const teamName = entry.team?.displayName || entry.team?.name || `Team ${idx + 1}`;
      const isClub = teamName.toLowerCase().includes('young apostles');

      const stat = (name: string): number => {
        const s = (entry.stats || []).find((st: any) => st.name === name || st.abbreviation === name);
        return s ? Number(s.value) : 0;
      };

      const diff = stat('pointDifferential') || stat('gd') || 0;
      const diffStr = diff > 0 ? `+${diff}` : `${diff}`;
      const pos = stat('rank') || idx + 1;

      return {
        pos,
        name: isClub ? 'Young Apostles FC' : teamName,
        played: stat('gamesPlayed') || 0,
        diff: diffStr,
        points: stat('points') || 0,
        crest: resolveCrest(teamName),
        isClub,
      };
    });

    const yaClub = table.find((t) => t.isClub) || {
      pos: 13,
      played: 34,
      diff: '0',
      points: 45,
      name: 'Young Apostles FC',
    };

    return NextResponse.json(
      {
        success: true,
        source: 'ESPN Live Ghana Premier League',
        table,
        clubStats: {
          rank: String(yaClub.pos),
          played: String(yaClub.played),
          diff: String(yaClub.diff),
          points: String(yaClub.points),
        },
        lastSynced: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch (error: any) {
    console.error('Live standings fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch live standings',
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
