export interface StandingRow {
  pos: number;
  name: string;
  crest: string;
  played: number; // GP
  won: number;    // W
  drawn: number;  // D
  lost: number;   // L
  gf: number;     // GF
  ga: number;     // GA
  gd: number;     // GD = GF - GA
  points: number; // PTS
  isClub?: boolean;
}

export interface StandingsData {
  season: string;
  publishedAt: string;
  source: string;
  rows: StandingRow[];
}

export type DraftStatus = 'pending' | 'published' | 'rejected';

export interface DraftValidation {
  valid: boolean;
  errors: string[];
}

export interface Draft {
  id: string;
  status: DraftStatus;
  createdAt: string;
  updatedAt: string;
  source: string;
  data: StandingsData;
  validation: DraftValidation;
  publishedCommitSha?: string;
  publishedCommitUrl?: string;
  publishedPrNumber?: number;
  publishedPrUrl?: string;
  publishedMode?: 'direct' | 'pr';
}

export interface ScrapeLog {
  id: string;
  timestamp: string;
  status: 'success' | 'unchanged' | 'error';
  message: string;
  durationMs: number;
  source: string;
  draftId?: string;
}

export interface AdminSettings {
  publish_mode: 'direct' | 'pr';
  cron_schedule: string;
  allowed_origins: string;
}

export interface CommitInfo {
  sha: string;
  shortSha: string;
  date: string;
  author: string;
  message: string;
  url: string;
}
