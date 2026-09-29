'use client';

import React, { useState } from 'react';
import { triggerFetchNowAction } from '@/app/actions/publish';
import { RefreshCw, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function FetchNowButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: 'success' | 'unchanged' | 'error';
    message: string;
  } | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await triggerFetchNowAction();
      if (!res.success) {
        setResult({
          type: 'error',
          message: res.message || 'Scraper failed to fetch data.',
        });
      } else if (res.draftCreated) {
        setResult({
          type: 'success',
          message: `${res.message}${'draft' in res && res.draft ? ` (Draft ID: ${res.draft.id})` : ''}. You can review and publish it now.`,
        });
        router.refresh();
      } else {
        setResult({
          type: 'unchanged',
          message: res.message || 'Scraped data is identical to live standings. No draft created.',
        });
        router.refresh();
      }
    } catch (err: any) {
      setResult({
        type: 'error',
        message: err?.message || 'Failed to trigger scraper.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleFetch}
        disabled={loading}
        className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-400/10 disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        <span>{loading ? 'Running Scraper Bot...' : 'Fetch Now'}</span>
      </button>

      {result && (
        <div
          className={`p-3 rounded-lg text-xs flex items-start gap-2 border transition-all ${
            result.type === 'success'
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : result.type === 'unchanged'
              ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
              : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
          }`}
        >
          {result.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
          ) : result.type === 'unchanged' ? (
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
          )}
          <span className="flex-1">{result.message}</span>
        </div>
      )}
    </div>
  );
}
