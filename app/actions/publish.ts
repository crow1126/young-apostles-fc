'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDraft, saveDraft, getSettings, saveSettings } from '@/lib/kv';
import { validateStandings } from '@/lib/validation';
import { publishStandingsToGitHub, getStandingsAtCommit, isGitHubConfigured } from '@/lib/github';
import { runScraperBot } from '@/lib/scraper';
import { StandingsData, AdminSettings } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

async function requireAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('Unauthorized: You must be logged in as an administrator to perform this action.');
  }
  return session;
}

/**
 * Publish a draft to GitHub (direct commit or PR).
 * The scraper bot NEVER calls this or has access to GITHUB_TOKEN.
 * This is executed exclusively by the authenticated admin.
 */
export async function publishDraftAction(params: {
  draftId: string;
  data: StandingsData;
  overrideValidation?: boolean;
}) {
  await requireAdminAuth();

  const { draftId, data, overrideValidation = false } = params;

  // Validate standings (18 teams, unique positions 1..18, GP = W+D+L, GD = GF-GA)
  const validation = validateStandings(data);
  if (!validation.valid && !overrideValidation) {
    return {
      success: false,
      error: `Validation failed: ${validation.errors.join(' | ')}`,
      validationErrors: validation.errors,
    };
  }

  // Get publish mode from settings
  const settings = await getSettings();
  const publishMode = settings.publish_mode || 'pr';

  const draft = await getDraft(draftId);

  // Update local file data/standings.json as well so the local build/site reflects it immediately
  try {
    const filePath = path.join(process.cwd(), 'data', 'standings.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed to update local data/standings.json file:', err);
  }

  // Publish to GitHub via Octokit if GITHUB_TOKEN is available
  let publishResult: any = {
    mode: publishMode,
    message: 'Local standings updated. GitHub publishing skipped (GITHUB_TOKEN not configured).',
  };

  if (isGitHubConfigured()) {
    try {
      publishResult = await publishStandingsToGitHub(
        data,
        publishMode,
        `chore(standings): publish updated GPL standings via Admin Panel (${data.season})`
      );
    } catch (err: any) {
      return {
        success: false,
        error: `GitHub publication failed: ${err.message}`,
      };
    }
  }

  // Update draft in KV
  if (draft) {
    draft.status = 'published';
    draft.data = data;
    draft.updatedAt = new Date().toISOString();
    draft.publishedMode = publishMode;
    draft.publishedCommitSha = publishResult.commitSha;
    draft.publishedCommitUrl = publishResult.commitUrl;
    draft.publishedPrNumber = publishResult.prNumber;
    draft.publishedPrUrl = publishResult.prUrl;
    await saveDraft(draft);
  }

  revalidatePath('/admin');
  revalidatePath('/admin/drafts');
  revalidatePath(`/admin/drafts/${draftId}`);
  revalidatePath('/api/standings');
  revalidatePath('/embed');

  return {
    success: true,
    mode: publishMode,
    commitSha: publishResult.commitSha,
    commitUrl: publishResult.commitUrl,
    prNumber: publishResult.prNumber,
    prUrl: publishResult.prUrl,
    message: publishResult.message,
  };
}

/**
 * Reject a draft
 */
export async function rejectDraftAction(draftId: string) {
  await requireAdminAuth();

  const draft = await getDraft(draftId);
  if (!draft) {
    return { success: false, error: 'Draft not found.' };
  }

  draft.status = 'rejected';
  draft.updatedAt = new Date().toISOString();
  await saveDraft(draft);

  revalidatePath('/admin');
  revalidatePath('/admin/drafts');
  revalidatePath(`/admin/drafts/${draftId}`);

  return { success: true };
}

/**
 * Revert data/standings.json to an older commit
 */
export async function revertCommitAction(commitSha: string) {
  await requireAdminAuth();

  if (!isGitHubConfigured()) {
    return {
      success: false,
      error: 'GITHUB_TOKEN is required to revert to an older commit.',
    };
  }

  try {
    const historicalData = await getStandingsAtCommit(commitSha);
    const settings = await getSettings();
    const mode = settings.publish_mode || 'pr';

    const publishResult = await publishStandingsToGitHub(
      historicalData,
      mode,
      `revert(standings): restore GPL table to commit ${commitSha.substring(0, 7)}`
    );

    // Also update local file
    try {
      const filePath = path.join(process.cwd(), 'data', 'standings.json');
      fs.writeFileSync(filePath, JSON.stringify(historicalData, null, 2), 'utf-8');
    } catch (e) {}

    revalidatePath('/admin');
    revalidatePath('/admin/history');
    revalidatePath('/api/standings');
    revalidatePath('/embed');

    return {
      success: true,
      mode,
      commitSha: publishResult.commitSha,
      commitUrl: publishResult.commitUrl,
      prNumber: publishResult.prNumber,
      prUrl: publishResult.prUrl,
      message: `Reverted to commit ${commitSha.substring(0, 7)} successfully.`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Failed to revert to commit: ${err.message}`,
    };
  }
}

/**
 * Trigger manual scraper run ("Fetch now")
 */
export async function triggerFetchNowAction() {
  await requireAdminAuth();

  try {
    const result = await runScraperBot('admin-fetch-now');
    revalidatePath('/admin');
    revalidatePath('/admin/drafts');
    revalidatePath('/admin/logs');
    return result;
  } catch (err: any) {
    return {
      success: false,
      draftCreated: false,
      message: err.message || 'Scraper run failed.',
      source: 'admin-fetch-now',
    };
  }
}

/**
 * Update Admin Settings
 */
export async function updateSettingsAction(newSettings: Partial<AdminSettings>) {
  await requireAdminAuth();

  try {
    const saved = await saveSettings(newSettings);
    revalidatePath('/admin');
    revalidatePath('/admin/settings');
    return { success: true, settings: saved };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
