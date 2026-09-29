'use client';

import React, { useState } from 'react';
import { revertCommitAction } from '@/app/actions/publish';
import { RotateCcw, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RevertButtonProps {
  commitSha: string;
  shortSha: string;
  date: string;
}

export function RevertButton({ commitSha, shortSha, date }: RevertButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRevert = async () => {
    const confirmed = confirm(
      `Are you sure you want to revert data/standings.json to commit ${shortSha} (${date})?\n\nThis will republish that older version to GitHub.`
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await revertCommitAction(commitSha);
      if (!res.success) {
        alert(res.error || 'Failed to revert to commit.');
      } else {
        alert(`Successfully reverted to commit ${shortSha}! ${res.message}`);
        router.refresh();
      }
    } catch (err: any) {
      alert(err.message || 'Revert error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRevert}
      disabled={loading}
      className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 font-bold text-xs flex items-center gap-1.5 transition-colors border border-rose-500/30 disabled:opacity-50"
      title={`Revert to ${shortSha}`}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <RotateCcw className="w-3.5 h-3.5" />
      )}
      <span>{loading ? 'Reverting...' : 'Revert to this version'}</span>
    </button>
  );
}
