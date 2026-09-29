import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDraft, getSettings } from '@/lib/kv';
import { getCommittedStandings } from '@/lib/scraper';
import { DraftEditor } from '@/components/draft-editor';
import { ArrowLeft, FileEdit, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DraftDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const draft = await getDraft(params.id);

  if (!draft) {
    notFound();
  }

  const committed = getCommittedStandings();
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/admin/drafts"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Drafts
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <FileEdit className="w-6 h-6 text-amber-400" />
                Draft Review: {draft.id}
              </h1>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1 ${
                  draft.status === 'pending'
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                    : draft.status === 'published'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {draft.status === 'pending' ? (
                  <>
                    <Clock className="w-3 h-3" /> PENDING
                  </>
                ) : draft.status === 'published' ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" /> PUBLISHED
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3" /> REJECTED
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Source: <span className="text-slate-200">{draft.source}</span> • Scraped at{' '}
              <span className="text-slate-200">{new Date(draft.createdAt).toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Editor Component */}
      <DraftEditor
        draft={draft}
        committed={committed}
        publishMode={settings.publish_mode || 'pr'}
      />
    </div>
  );
}
