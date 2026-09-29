import fs from 'fs';
import path from 'path';
import { StandingsData, StandingRow } from './types';

/**
 * MCP Tools Module
 * Provides MCP-compliant tools that read ONLY data/standings.json.
 */

export function getMCPStandings(): StandingsData {
  const filePath = path.join(process.cwd(), 'data', 'standings.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export const mcpTools = [
  {
    name: 'get_gpl_standings',
    description: 'Retrieve the official Ghana Premier League (GPL) standings table directly from data/standings.json',
    parameters: {
      type: 'object',
      properties: {
        season: {
          type: 'string',
          description: 'Optional season filter (defaults to current season in standings.json)',
        },
      },
    },
    handler: async () => {
      const data = getMCPStandings();
      return {
        season: data.season,
        publishedAt: data.publishedAt,
        source: data.source,
        table: data.rows,
      };
    },
  },
  {
    name: 'get_young_apostles_rank',
    description: 'Retrieve the current league position, points, goal difference, and record for Young Apostles FC',
    parameters: { type: 'object', properties: {} },
    handler: async () => {
      const data = getMCPStandings();
      const club = data.rows.find(
        (t) => t.isClub || t.name.toLowerCase().includes('young apostles')
      );
      return club || { error: 'Young Apostles FC not found in standings table.' };
    },
  },
];
