import React from 'react';
import Link from 'next/link';
import { getDrafts } from '@/lib/kv';
import { FileEdit, ArrowRight, CheckCircle2, Clock, XCircle, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DraftsListPage() {
  const drafts = await getDrafts();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <FileEdit className="w-6 h-6 text-amber-400" />
            Standings Drafts
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Bot-generated drafts awaiting review. Drafts never touch the GitHub repo until you publish.
          </p>
        </div>
      </div>

      {/* Drafts List */}
      {drafts.length === 0 ? (
        <div className="bg-[#0d1f38] border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <FileEdit className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">No Drafts in KV Store</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            When the scraper bot runs on cron or when you trigger "Fetch now", any new standings changes will appear here as drafts.
          </p>
          <div className="mt-5">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
            >
              Go to Dashboard to Fetch
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {drafts.map((draft) => {
            const isPending = draft.status === 'pending';
            const isPublished = draft.status === 'published';
            const isRejected = draft.status === 'rejected';

            return (
              <div
                key={draft.id}
                className={`bg-[#0d1f38] border rounded-xl p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isPending
                    ? 'border-amber-400/40 shadow-lg shadow-amber-400/5'
                    : 'border-slate-800'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-white bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                      {draft.id}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        isPending
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : isPublished
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {isPending ? (
                        <>
                          <Clock className="w-3 h-3" /> PENDING REVIEW
                        </>
                      ) : isPublished ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> PUBLISHED
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" /> REJECTED
                        </>
                      )}
                    </span>

                    {/* Validation Badge */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        draft.validation.valid
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {draft.validation.valid ? '18 TEAMS VALID' : `${draft.validation.errors.length} VALIDATION ERRORS`}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 space-y-1">
                    <p>
                      <span className="text-slate-500">Source:</span>{' '}
                      <span className="text-slate-300 font-medium">{draft.source}</span>
                    </p>
                    <p>
                      <span className="text-slate-500">Created:</span>{' '}
                      <span className="text-slate-300">
                        {new Date(draft.createdAt).toLocaleString()}
                      </span>
                    </p>
                    {draft.publishedCommitSha && (
                      <p>
                        <span className="text-slate-500">Commit:</span>{' '}
                        <code className="text-emerald-400">{draft.publishedCommitSha.substring(0, 7)}</code>
                      </p>
                    )}
                    {draft.publishedPrNumber && (
                      <p>
                        <span className="text-slate-500">Pull Request:</span>{' '}
                        <a
                          href={draft.publishedPrUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-400 hover:underline"
                        >
                          PR #{draft.publishedPrNumber}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/drafts/${draft.id}`}
                    className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                      isPending
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/10'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{isPending ? 'Inspect & Publish' : 'View Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
