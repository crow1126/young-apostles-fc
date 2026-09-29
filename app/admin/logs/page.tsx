import React from 'react';
import Link from 'next/link';
import { getScrapeLogs } from '@/lib/kv';
import { FileText, ArrowLeft, CheckCircle2, ShieldCheck, XCircle, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ScrapeLogsPage() {
  const logs = await getScrapeLogs();

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
              <FileText className="w-6 h-6 text-amber-400" />
              Scrape Attempt Logs
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Audit trail of the last 100 bot fetch attempts (Cron triggers and manual "Fetch now" runs).
            </p>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#0d1f38] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Execution Trail</h2>
          <span className="text-xs font-mono text-slate-400">
            {logs.length} / 100 entries
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <p className="text-sm">No scrape logs recorded yet.</p>
            <p className="text-xs text-slate-500 mt-1">
              Trigger a manual fetch from the dashboard or wait for the Vercel Cron schedule.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#091629] text-slate-400 uppercase text-[11px] font-bold border-b border-slate-800">
                  <th className="py-3 px-4 w-44">Timestamp</th>
                  <th className="py-3 px-4 w-32">Status</th>
                  <th className="py-3 px-4 w-44">Source</th>
                  <th className="py-3 px-4">Message / Outcome</th>
                  <th className="py-3 px-4 text-center w-24">Duration</th>
                  <th className="py-3 px-4 text-right w-36">Draft</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {logs.map((log) => {
                  const dateStr = new Date(log.timestamp).toLocaleString('en-GB');

                  return (
                    <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-300">
                        {dateStr}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded inline-flex items-center gap-1 ${
                            log.status === 'success'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : log.status === 'unchanged'
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {log.status === 'success' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" /> SUCCESS
                            </>
                          ) : log.status === 'unchanged' ? (
                            <>
                              <ShieldCheck className="w-3 h-3" /> UNCHANGED
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" /> ERROR
                            </>
                          )}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-300 font-medium">
                        {log.source}
                      </td>

                      <td className="py-3 px-4 text-slate-300">
                        <span className="line-clamp-2">{log.message}</span>
                      </td>

                      <td className="py-3 px-4 text-center font-mono text-slate-400">
                        {log.durationMs ? `${log.durationMs}ms` : '-'}
                      </td>

                      <td className="py-3 px-4 text-right">
                        {log.draftId ? (
                          <Link
                            href={`/admin/drafts/${log.draftId}`}
                            className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1 text-[11px]"
                          >
                            <span>View Draft</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        ) : (
                          <span className="text-slate-600 text-xs">-</span>
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
