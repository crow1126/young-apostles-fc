import fs from 'fs';
import path from 'path';
import { Draft, ScrapeLog, AdminSettings } from './types';

const DEFAULT_SETTINGS: AdminSettings = {
  publish_mode: 'pr',
  cron_schedule: '0 */6 * * *',
  allowed_origins: '*',
};

interface LocalKVData {
  drafts: Record<string, Draft>;
  logs: ScrapeLog[];
  settings: AdminSettings;
}

const LOCAL_DATA_DIR = path.join(process.cwd(), '.data');
const LOCAL_KV_FILE = path.join(LOCAL_DATA_DIR, 'kv.json');

function isVercelKVConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// Local File-based KV fallback helper
function getLocalKV(): LocalKVData {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(LOCAL_KV_FILE)) {
      const raw = fs.readFileSync(LOCAL_KV_FILE, 'utf-8');
      const data = JSON.parse(raw);
      return {
        drafts: data.drafts || {},
        logs: Array.isArray(data.logs) ? data.logs : [],
        settings: { ...DEFAULT_SETTINGS, ...(data.settings || {}) },
      };
    }
  } catch (err) {
    console.error('Error reading local KV file:', err);
  }
  return { drafts: {}, logs: [], settings: DEFAULT_SETTINGS };
}

function saveLocalKV(data: LocalKVData): void {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_KV_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local KV file:', err);
  }
}

// --- DRAFTS ---

export async function getDrafts(): Promise<Draft[]> {
  if (isVercelKVConfigured()) {
    try {
      const { kv } = await import('@vercel/kv');
      const draftsMap = await kv.hgetall<Record<string, Draft>>('yafc:drafts');
      if (!draftsMap) return [];
      return Object.values(draftsMap).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (err) {
      console.warn('Vercel KV getDrafts failed, falling back to local file:', err);
    }
  }

  const local = getLocalKV();
  return Object.values(local.drafts).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getDraft(id: string): Promise<Draft | null> {
  if (isVercelKVConfigured()) {
    try {
      const { kv } = await import('@vercel/kv');
      const draft = await kv.hget<Draft>('yafc:drafts', id);
      return draft || null;
    } catch (err) {
      console.warn('Vercel KV getDraft failed, falling back to local file:', err);
    }
  }

  const local = getLocalKV();
  return local.drafts[id] || null;
}

export async function saveDraft(draft: Draft): Promise<void> {
  if (isVercelKVConfigured()) {
    try {
      const { kv } = await import('@vercel/kv');
      await kv.hset('yafc:drafts', { [draft.id]: draft });
      return;
    } catch (err) {
      console.warn('Vercel KV saveDraft failed, falling back to local file:', err);
    }
  }

  const local = getLocalKV();
  local.drafts[draft.id] = draft;
  saveLocalKV(local);
}

export async function updateDraft(draft: Draft): Promise<void> {
  await saveDraft(draft);
}

// --- LOGS (Cap at last 100 attempts) ---

export async function getScrapeLogs(): Promise<ScrapeLog[]> {
  if (isVercelKVConfigured()) {
    try {
      const { kv } = await import('@vercel/kv');
      const logs = await kv.lrange<ScrapeLog>('yafc:scrape_logs', 0, 99);
      return logs || [];
    } catch (err) {
      console.warn('Vercel KV getScrapeLogs failed, falling back to local file:', err);
    }
  }

  const local = getLocalKV();
  return local.logs.slice(0, 100);
}

export async function addScrapeLog(log: ScrapeLog): Promise<void> {
  if (isVercelKVConfigured()) {
    try {
      const { kv } = await import('@vercel/kv');
      await kv.lpush('yafc:scrape_logs', log);
      await kv.ltrim('yafc:scrape_logs', 0, 99);
      return;
    } catch (err) {
      console.warn('Vercel KV addScrapeLog failed, falling back to local file:', err);
    }
  }

  const local = getLocalKV();
  local.logs.unshift(log);
  if (local.logs.length > 100) {
    local.logs = local.logs.slice(0, 100);
  }
  saveLocalKV(local);
}

// --- SETTINGS ---

export async function getSettings(): Promise<AdminSettings> {
  if (isVercelKVConfigured()) {
    try {
      const { kv } = await import('@vercel/kv');
      const settings = await kv.get<AdminSettings>('yafc:settings');
      if (settings) return { ...DEFAULT_SETTINGS, ...settings };
    } catch (err) {
      console.warn('Vercel KV getSettings failed, falling back to local file:', err);
    }
  }

  const local = getLocalKV();
  return local.settings || DEFAULT_SETTINGS;
}

export async function saveSettings(settings: Partial<AdminSettings>): Promise<AdminSettings> {
  const current = await getSettings();
  const updated: AdminSettings = { ...current, ...settings };

  if (isVercelKVConfigured()) {
    try {
      const { kv } = await import('@vercel/kv');
      await kv.set('yafc:settings', updated);
      return updated;
    } catch (err) {
      console.warn('Vercel KV saveSettings failed, falling back to local file:', err);
    }
  }

  const local = getLocalKV();
  local.settings = updated;
  saveLocalKV(local);
  return updated;
}
