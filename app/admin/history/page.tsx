import React from 'react';
import Link from 'next/link';
import { getStandingsCommitHistory, isGitHubConfigured } from '@/lib/github';
import { RevertButton } from '@/components/revert-button';
import { History, ArrowLeft, GitCommit, ExternalLink, ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const isGhConfigured = isGitHubConfigured();
  const commits = await getStandingsCommitHistory();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/admin"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <History className="w-6 h-6 text-amber-400" />
              Commit History & Version Rollback
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Showing the last 20 commits touching <code className="text-emerald-400">data/standings.json</code>. Git history is the single version history and rollback path.
            </p>
          </div>
        </div>
      </div>

      {!isGhConfigured && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <p className="font-bold">GITHUB_TOKEN is not configured in server environment.</p>
            <p className="mt-1 text-slate-300">
              Live GitHub API commit history and one-click rollback require a fine-grained token with Contents: Write. Set <code className="text-amber-400 font-mono">GITHUB_TOKEN</code> in your environment or Vercel project settings.
            </p>
          </div>
        </div>
      )}

      {/* Commits Table */}
      <div className="bg-[#0d1f38] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Repository Commit Trail</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {commits.length} commits
          </span>
        </div>

        {commits.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <p className="text-sm">No remote commits fetched yet.</p>
            <p className="text-xs text-slate-500 mt-1">
              When updates are published to GitHub, commits touching <code className="text-slate-400">data/standings.json</code> will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#091629] text-slate-400 uppercase text-[11px] font-bold border-b border-slate-800">
                  <th className="py-3 px-4 w-28">Commit</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4 w-40">Author</th>
                  <th className="py-3 px-4 w-44">Date</th>
                  <th className="py-3 px-4 text-right w-44">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {commits.map((commit, idx) => {
                  const isLatest = idx === 0;
                  const dateStr = commit.date
                    ? new Date(commit.date).toLocaleString('en-GB')
                    : 'Unknown';

                  return (
                    <tr
                      key={commit.sha}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isLatest ? 'bg-emerald-500/5' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                        <div className="flex items-center gap-1.5">
                          <span>{commit.shortSha}</span>
                          {isLatest && (
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-extrabold px-1.5 py-0.2 rounded border border-emerald-500/30 uppercase">
                              Live
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-md">{commit.message}</span>
                          {commit.url && (
                            <a
                              href={commit.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-500 hover:text-amber-400 shrink-0"
                              title="View on GitHub"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-slate-400">
                        {commit.author}
                      </td>

                      <td className="py-3 px-4 text-slate-400">
                        {dateStr}
                      </td>

                      <td className="py-3 px-4 text-right">
                        {isLatest ? (
                          <span className="text-xs text-emerald-400 font-semibold">Current Version</span>
                        ) : (
                          <RevertButton
                            commitSha={commit.sha}
                            shortSha={commit.shortSha}
                            date={dateStr}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
