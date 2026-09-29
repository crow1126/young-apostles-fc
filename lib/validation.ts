import { z } from 'zod';
import { StandingsData, StandingRow, DraftValidation } from './types';

export const standingRowSchema = z.object({
  pos: z.number().int().min(1).max(18),
  name: z.string().min(1, 'Team name is required'),
  crest: z.string().default('assets/opponents/gpl-official.png'),
  played: z.number().int().min(0),
  won: z.number().int().min(0),
  drawn: z.number().int().min(0),
  lost: z.number().int().min(0),
  gf: z.number().int().min(0),
  ga: z.number().int().min(0),
  gd: z.number().int(),
  points: z.number().int().min(0),
  isClub: z.boolean().optional(),
});

export const standingsDataSchema = z.object({
  season: z.string().min(1, 'Season is required'),
  publishedAt: z.string().datetime({ offset: true }).or(z.string().min(1)),
  source: z.string().min(1, 'Source is required'),
  rows: z.array(standingRowSchema).length(18, 'Standings must contain exactly 18 teams'),
});

export const publishActionSchema = z.object({
  draftId: z.string().min(1),
  data: standingsDataSchema,
  overrideValidation: z.boolean().default(false),
  csrfToken: z.string().optional(),
});

export function validateStandings(data: Partial<StandingsData>): DraftValidation {
  const errors: string[] = [];

  if (!data.rows || !Array.isArray(data.rows)) {
    return {
      valid: false,
      errors: ['Standings table rows must be an array.'],
    };
  }

  // 1. Check team count (exactly 18)
  if (data.rows.length !== 18) {
    errors.push(`Table must have exactly 18 teams (found ${data.rows.length}).`);
  }

  // 2. Check unique positions 1..18
  const positions = new Set<number>();
  const duplicatePositions = new Set<number>();

  for (const row of data.rows) {
    if (positions.has(row.pos)) {
      duplicatePositions.add(row.pos);
    }
    positions.add(row.pos);
  }

  if (duplicatePositions.size > 0) {
    errors.push(`Duplicate positions found: ${Array.from(duplicatePositions).join(', ')}.`);
  }

  for (let i = 1; i <= 18; i++) {
    if (!positions.has(i)) {
      errors.push(`Missing position ${i} in standings table.`);
    }
  }

  // 3. Mathematical verification for each row:
  //    GP = W + D + L
  //    GD = GF - GA
  data.rows.forEach((row, index) => {
    const teamName = row.name || `Row ${index + 1}`;
    
    // GP = W + D + L
    const expectedGP = (Number(row.won) || 0) + (Number(row.drawn) || 0) + (Number(row.lost) || 0);
    if (Number(row.played) !== expectedGP) {
      errors.push(
        `${teamName} (Pos ${row.pos}): GP (${row.played}) does not equal W(${row.won}) + D(${row.drawn}) + L(${row.lost}) = ${expectedGP}.`
      );
    }

    // GD = GF - GA
    const expectedGD = (Number(row.gf) || 0) - (Number(row.ga) || 0);
    if (Number(row.gd) !== expectedGD) {
      errors.push(
        `${teamName} (Pos ${row.pos}): GD (${row.gd}) does not equal GF(${row.gf}) - GA(${row.ga}) = ${expectedGD}.`
      );
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
