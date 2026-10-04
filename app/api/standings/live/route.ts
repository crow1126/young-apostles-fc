import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const OFFICIAL_2026_TABLE = [
  { pos: 1, name: 'Samartex', crest: 'assets/opponents/samartex.png', played: 5, diff: '+4', points: 11, isClub: false },
  { pos: 2, name: 'Medeama', crest: 'assets/opponents/medeamasc.png', played: 4, diff: '+4', points: 8, isClub: false },
  { pos: 3, name: 'Ashgold', crest: 'assets/opponents/ashgold.png', played: 4, diff: '+2', points: 7, isClub: false },
  { pos: 4, name: 'Port City', crest: 'assets/opponents/portcity.png', played: 4, diff: '+2', points: 7, isClub: false },
  { pos: 5, name: 'Hearts of Oak', crest: 'assets/opponents/heartsofoak.png', played: 4, diff: '+4', points: 7, isClub: false },
  { pos: 6, name: 'Bechem Utd', crest: 'assets/opponents/bechemunited.png', played: 4, diff: '0', points: 7, isClub: false },
  { pos: 7, name: 'Aduana Stars', crest: 'assets/opponents/aduanastars.png', played: 4, diff: '+2', points: 7, isClub: false },
  { pos: 8, name: 'Karela Utd', crest: 'assets/opponents/karelaunited.png', played: 4, diff: '0', points: 6, isClub: false },
  { pos: 9, name: 'Basake Holy Stars', crest: 'assets/opponents/basakeholystars.png', played: 4, diff: '-2', points: 6, isClub: false },
  { pos: 10, name: 'Kotoko', crest: 'assets/opponents/asantekotoko.png', played: 4, diff: '-1', points: 5, isClub: false },
  { pos: 11, name: 'Swedru All Blacks', crest: 'assets/opponents/swedruallblacks.png', played: 4, diff: '0', points: 5, isClub: false },
  { pos: 12, name: 'Heart of Lions', crest: 'assets/opponents/heartoflions.png', played: 4, diff: '0', points: 5, isClub: false },
  { pos: 13, name: 'Vision', crest: 'assets/opponents/visionfc.png', played: 4, diff: '+1', points: 5, isClub: false },
  { pos: 14, name: 'Debibi United', crest: 'assets/opponents/debibiunited.png', played: 4, diff: '+1', points: 4, isClub: false },
  { pos: 15, name: 'Berekum Chelsea', crest: 'assets/opponents/berekumchelsea.png', played: 4, diff: '-3', points: 4, isClub: false },
  { pos: 16, name: 'Gold Stars', crest: 'assets/opponents/goldstarsfc.png', played: 4, diff: '-3', points: 3, isClub: false },
  { pos: 17, name: 'Young Apostles', crest: 'assets/official-logo.png', played: 5, diff: '-7', points: 3, isClub: true },
  { pos: 18, name: 'Dreams', crest: 'assets/opponents/dreamsfc.png', played: 4, diff: '-4', points: 1, isClub: false }
];

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
    // Read from data/cms.json if available
    const cmsPath = path.join(process.cwd(), 'data', 'cms.json');
    if (fs.existsSync(cmsPath)) {
      try {
        const raw = fs.readFileSync(cmsPath, 'utf8');
        const json = JSON.parse(raw);
        if (Array.isArray(json.leagueTable) && json.leagueTable.length > 0) {
          const yaClub = json.leagueTable.find((t: any) => t.isClub || (t.name && t.name.toLowerCase().includes('young apostles'))) || {
            pos: 17,
            played: 5,
            diff: '-7',
            points: 3,
            name: 'Young Apostles',
          };

          return NextResponse.json(
            {
              success: true,
              source: 'GPL 2026/27 Official Table',
              table: json.leagueTable,
              clubStats: json.standings || {
                rank: String(yaClub.pos),
                played: String(yaClub.played),
                diff: String(yaClub.diff),
                points: String(yaClub.points),
              },
              lastSynced: json.standingsLastSynced || new Date().toISOString(),
            },
            {
              status: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
              },
            }
          );
        }
      } catch (readErr) {
        console.warn('Error reading cms.json in live route:', readErr);
      }
    }

    // Default to the official 26/27 Matchday 4 table
    return NextResponse.json(
      {
        success: true,
        source: 'GPL 2026/27 Official Table',
        table: OFFICIAL_2026_TABLE,
        clubStats: {
          rank: '17',
          played: '4',
          diff: '-6',
          points: '3',
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
    console.error('Standings route error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to retrieve standings',
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
