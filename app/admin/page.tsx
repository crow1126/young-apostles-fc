import React from 'react';
import Link from 'next/link';
import { getDrafts, getScrapeLogs, getSettings } from '@/lib/kv';
import { getCommittedStandings } from '@/lib/scraper';
import { getStandingsCommitHistory } from '@/lib/github';
import { FetchNowButton } from '@/components/fetch-now-button';
import {
  Activity,
  GitCommit,
  Clock,
  FileEdit,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const drafts = await getDrafts();
  const logs = await getScrapeLogs();
  const settings = await getSettings();
  const committed = getCommittedStandings();
  const commits = await getStandingsCommitHistory();

  const pendingDrafts = drafts.filter((d) => d.status === 'pending');
  const lastLog = logs[0] || null;
  const latestCommit = commits[0] || null;

  const liveSha = latestCommit?.shortSha || 'origin/main';
  const liveDate = committed?.publishedAt
    ? new Date(committed.publishedAt).toLocaleString('en-GB')
    : latestCommit?.date
    ? new Date(latestCommit.date).toLocaleString('en-GB')
    : 'Recently';

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-[#0d2b45] to-[#0a192f] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            Admin Control Panel
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              Publish Mode: {settings.publish_mode.toUpperCase()}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
            <strong className="text-amber-400">Core Rule:</strong> The scraper bot has NO GitHub credentials and produces only drafts in KV. Live site serves <code className="text-emerald-400 font-mono">data/standings.json</code> from git, changing only when you publish.
          </p>
        </div>
        <div className="shrink-0">
          <FetchNowButton />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pending Drafts */}
        <div className="bg-[#0d1f38] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pending Drafts
            </span>
            <FileEdit className="w-5 h-5 text-amber-400" />
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">
                {pendingDrafts.length}
              </span>
              <span className="text-xs text-slate-400">
                {pendingDrafts.length === 1 ? 'draft awaiting review' : 'drafts awaiting review'}
              </span>
            </div>
          </div>
          <Link
            href="/admin/drafts"
            className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 group"
          >
            <span>Review drafts</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Card 2: Current Live Version */}
        <div className="bg-[#0d1f38] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Live Standings
            </span>
            <GitCommit className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="my-3">
            <div className="font-mono text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <span>{liveSha}</span>
              <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300 border border-emerald-500/30">
                {committed?.season || '2026/2027'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate" title={liveDate}>
              {liveDate}
            </p>
          </div>
          <Link
            href="/admin/history"
            className="text-xs text-slate-300 hover:text-white font-semibold flex items-center gap-1 group"
          >
            <span>Commit history</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Card 3: Last Scrape Status */}
        <div className="bg-[#0d1f38] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Last Scrape Status
            </span>
            <Activity className="w-5 h-5 text-sky-400" />
          </div>
          <div className="my-3">
            {lastLog ? (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  {lastLog.status === 'success' ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Draft created
                    </span>
                  ) : lastLog.status === 'unchanged' ? (
                    <span className="text-sky-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Identical (No change)
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Error
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 truncate" title={lastLog.message}>
                  {new Date(lastLog.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {lastLog.source}
                </p>
              </div>
            ) : (
              <span className="text-xs text-slate-400">No scrape recorded yet</span>
            )}
          </div>
          <Link
            href="/admin/logs"
            className="text-xs text-slate-300 hover:text-white font-semibold flex items-center gap-1 group"
          >
            <span>View scrape logs</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Card 4: Next Scheduled Run */}
        <div className="bg-[#0d1f38] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Next Scheduled Run
            </span>
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <div className="my-3">
            <div className="font-mono text-sm font-bold text-purple-300">
              {settings.cron_schedule}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Every 6 hours via Vercel Cron
            </p>
          </div>
          <Link
            href="/admin/settings"
            className="text-xs text-slate-300 hover:text-white font-semibold flex items-center gap-1 group"
          >
            <span>Manage schedule</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Main Sections: Pending Drafts Alert & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Pending Drafts Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <FileEdit className="w-4 h-4 text-amber-400" />
              Pending Scraper Drafts
            </h2>
            <Link
              href="/admin/drafts"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span>View all ({drafts.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {pendingDrafts.length === 0 ? (
            <div className="bg-[#0d1f38] border border-slate-800 rounded-xl p-8 text-center text-slate-400">
              <ShieldCheck className="w-10 h-10 text-emerald-400/60 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-200">No pending drafts</p>
              <p className="text-xs text-slate-400 mt-1">
                The live GPL standings in the repository are completely up to date.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-[#0d1f38] border border-amber-400/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-400 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/20">
                        {draft.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          draft.validation.valid
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {draft.validation.valid ? 'VALIDATED' : `${draft.validation.errors.length} ERRORS`}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-2 space-y-0.5">
                      <p>Source: <span className="text-slate-200">{draft.source}</span></p>
                      <p>Created: <span className="text-slate-200">{new Date(draft.createdAt).toLocaleString()}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/drafts/${draft.id}`}
                      className="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <span>Review & Publish</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Live Table Status & Quick Access */}
        <div className="space-y-4">
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Live Repo Status
          </h2>

          <div className="bg-[#0d1f38] border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-400">Committed File</span>
              <p className="font-mono text-xs text-emerald-400 mt-0.5">data/standings.json</p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400">Total Teams</span>
              <p className="text-sm font-bold text-white mt-0.5">
                {committed?.rows?.length || 0} GPL Clubs
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400">Young Apostles FC Rank</span>
              {(() => {
                const yafc = committed?.rows?.find((t) => t.isClub || t.name.toLowerCase().includes('young apostles'));
                return (
                  <p className="text-sm font-bold text-amber-400 mt-0.5">
                    {yafc ? `Pos #${yafc.pos} (${yafc.points} PTS, GD ${yafc.gd})` : 'Not listed'}
                  </p>
                );
              })()}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Link
                href="/api/standings"
                target="_blank"
                className="text-xs text-slate-300 hover:text-amber-400 flex items-center justify-between p-2 rounded bg-slate-800/40 hover:bg-slate-800 transition-colors"
              >
                <span>Live API (/api/standings)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/embed"
                target="_blank"
                className="text-xs text-slate-300 hover:text-amber-400 flex items-center justify-between p-2 rounded bg-slate-800/40 hover:bg-slate-800 transition-colors"
              >
                <span>Live Iframe (/embed)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
