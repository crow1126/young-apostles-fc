'use client';

import React, { useState } from 'react';
import { Draft, StandingsData, StandingRow } from '@/lib/types';
import { validateStandings } from '@/lib/validation';
import { publishDraftAction, rejectDraftAction } from '@/app/actions/publish';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  AlertTriangle,
  Download,
  Send,
  XCircle,
  Loader2,
  ExternalLink,
  GitCommit,
  GitPullRequest,
  RefreshCw,
} from 'lucide-react';

interface DraftEditorProps {
  draft: Draft;
  committed: StandingsData | null;
  publishMode: 'direct' | 'pr';
}

export function DraftEditor({ draft, committed, publishMode }: DraftEditorProps) {
  const router = useRouter();

  // Working copy of standings rows
  const [rows, setRows] = useState<StandingRow[]>(
    JSON.parse(JSON.stringify(draft.data.rows || []))
  );
  const [season, setSeason] = useState(draft.data.season || '2026/2027');
  const [overrideValidation, setOverrideValidation] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    commitUrl?: string;
    prUrl?: string;
    mode?: string;
  } | null>(null);

  // Compute live validation
  const currentData: StandingsData = {
    season,
    publishedAt: draft.data.publishedAt,
    source: draft.source,
    rows,
  };
  const validation = validateStandings(currentData);

  // Helper to find committed row for diff comparison
  const getCommittedRow = (pos: number, teamName: string): StandingRow | undefined => {
    if (!committed || !committed.rows) return undefined;
    return (
      committed.rows.find((r) => r.name.toLowerCase().trim() === teamName.toLowerCase().trim()) ||
      committed.rows.find((r) => r.pos === pos)
    );
  };

  // Cell change handler
  const handleCellChange = (
    index: number,
    field: keyof StandingRow,
    value: string | number | boolean
  ) => {
    const updated = [...rows];
    const row = { ...updated[index] };

    if (field === 'name') {
      row.name = String(value);
      row.isClub = row.name.toLowerCase().includes('young apostles');
    } else if (
      field === 'pos' ||
      field === 'played' ||
      field === 'won' ||
      field === 'drawn' ||
      field === 'lost' ||
      field === 'gf' ||
      field === 'ga' ||
      field === 'gd' ||
      field === 'points'
    ) {
      const numVal = parseInt(String(value), 10);
      (row as any)[field] = isNaN(numVal) ? 0 : numVal;

      // Smart auto-helpers: if won, drawn, lost change, update GP
      if (field === 'won' || field === 'drawn' || field === 'lost') {
        row.played = row.won + row.drawn + row.lost;
        row.points = row.won * 3 + row.drawn;
      }
      // If gf or ga change, update gd
      if (field === 'gf' || field === 'ga') {
        row.gd = row.gf - row.ga;
      }
    }

    updated[index] = row;
    setRows(updated);
  };

  // Download JSON fallback
  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(currentData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'standings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Publish action
  const handlePublish = async () => {
    if (!validation.valid && !overrideValidation) {
      alert('Please fix validation errors or tick the override checkbox to proceed.');
      return;
    }

    setPublishing(true);
    setResult(null);

    try {
      const res = await publishDraftAction({
        draftId: draft.id,
        data: currentData,
        overrideValidation,
      });

      if (!res.success) {
        setResult({
          success: false,
          message: res.error || 'Failed to publish draft.',
        });
      } else {
        setResult({
          success: true,
          message: res.message,
          commitUrl: res.commitUrl,
          prUrl: res.prUrl,
          mode: res.mode,
        });
        router.refresh();
      }
    } catch (err: any) {
      setResult({
        success: false,
        message: err?.message || 'Publication server error.',
      });
    } finally {
      setPublishing(false);
    }
  };

  // Reject action
  const handleReject = async () => {
    if (!confirm('Are you sure you want to reject this draft?')) return;

    setRejecting(true);
    try {
      const res = await rejectDraftAction(draft.id);
      if (res.success) {
        setResult({
          success: true,
          message: 'Draft rejected.',
        });
        router.push('/admin/drafts');
        router.refresh();
      } else {
        alert(res.error || 'Failed to reject draft.');
      }
    } catch (err: any) {
      alert(err.message || 'Reject error.');
    } finally {
      setRejecting(false);
    }
  };

  const isPublished = draft.status === 'published';
  const isRejected = draft.status === 'rejected';

  return (
    <div className="space-y-6">
      {/* Action Banner / Notification */}
      {result && (
        <div
          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            result.success
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-200'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {result.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-sm">{result.message}</p>
              {result.mode === 'pr' && result.prUrl && (
                <p className="text-xs text-slate-300 mt-1">
                  Pull Request opened on GitHub. Merge it to automatically deploy to Vercel.
                </p>
              )}
              {result.mode === 'direct' && result.commitUrl && (
                <p className="text-xs text-slate-300 mt-1">
                  Direct commit pushed to main branch. Vercel deployment triggered automatically.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {result.prUrl && (
              <a
                href={result.prUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>View PR on GitHub</span>
              </a>
            )}
            {result.commitUrl && (
              <a
                href={result.commitUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>View Commit</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Validation Warnings Box */}
      {!validation.valid && (
        <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-rose-300">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Validation Checks Failed ({validation.errors.length} errors)</span>
          </div>
          <ul className="text-xs space-y-1 pl-6 list-disc text-rose-300/90 font-mono">
            {validation.errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <p className="text-[11px] text-slate-400 pt-1">
            Rule requirement: 18 teams, unique positions 1..18, GP = W+D+L, GD = GF-GA.
          </p>
        </div>
      )}

      {/* Control Toolbar */}
      <div className="bg-[#0d1f38] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Season</label>
            <input
              type="text"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="px-2.5 py-1.5 rounded bg-[#081225] border border-slate-700 text-xs font-bold text-white w-28"
            />
          </div>

          <div className="border-l border-slate-700/60 pl-3">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Target Mode</span>
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20">
              {publishMode === 'direct' ? 'Direct Commit to Main' : 'Open Pull Request (pr)'}
            </span>
          </div>

          {!validation.valid && (
            <div className="border-l border-slate-700/60 pl-3 flex items-center gap-2 mt-4 sm:mt-0">
              <input
                type="checkbox"
                id="override"
                checked={overrideValidation}
                onChange={(e) => setOverrideValidation(e.target.checked)}
                className="w-4 h-4 rounded text-amber-400 focus:ring-0 bg-[#081225] border-slate-700"
              />
              <label htmlFor="override" className="text-xs font-semibold text-rose-300 cursor-pointer">
                Override validation errors (Force publish)
              </label>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Download JSON fallback */}
          <button
            onClick={handleDownloadJson}
            type="button"
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
            title="Download JSON to commit manually with local git"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON</span>
          </button>

          {!isPublished && (
            <>
              {/* Reject */}
              <button
                onClick={handleReject}
                disabled={rejecting || publishing}
                type="button"
                className="px-3 py-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 font-bold text-xs flex items-center gap-1.5 transition-colors border border-rose-500/30 disabled:opacity-50"
              >
                {rejecting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                <span>Reject</span>
              </button>

              {/* Publish */}
              <button
                onClick={handlePublish}
                disabled={publishing || rejecting || (!validation.valid && !overrideValidation)}
                type="button"
                className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-amber-400/15 disabled:opacity-40"
              >
                {publishing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Publishing to GitHub...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish to GitHub</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Interactive Table with Diff and Inline Editing */}
      <div className="bg-[#0d1f38] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white">Standings Matrix (18 Clubs)</h2>
            <span className="text-xs text-slate-400">
              • Click any cell to edit inline • Yellow highlight indicates diff vs committed file
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {rows.length} / 18 teams
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#091629] text-slate-400 uppercase text-[11px] font-bold border-b border-slate-800">
                <th className="py-2.5 px-3 text-center w-14">Pos</th>
                <th className="py-2.5 px-3 min-w-[200px]">Club Name</th>
                <th className="py-2.5 px-2 text-center w-14">GP</th>
                <th className="py-2.5 px-2 text-center w-14">W</th>
                <th className="py-2.5 px-2 text-center w-14">D</th>
                <th className="py-2.5 px-2 text-center w-14">L</th>
                <th className="py-2.5 px-2 text-center w-14">GF</th>
                <th className="py-2.5 px-2 text-center w-14">GA</th>
                <th className="py-2.5 px-2 text-center w-14">GD</th>
                <th className="py-2.5 px-3 text-center w-16 text-amber-400">PTS</th>
                <th className="py-2.5 px-3 text-center w-20">Diff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {rows.map((row, index) => {
                const comRow = getCommittedRow(row.pos, row.name);
                const isYafc = row.isClub || row.name.toLowerCase().includes('young apostles');

                // Determine diffs
                const posChanged = comRow && comRow.pos !== row.pos;
                const playedChanged = comRow && comRow.played !== row.played;
                const wonChanged = comRow && comRow.won !== row.won;
                const drawnChanged = comRow && comRow.drawn !== row.drawn;
                const lostChanged = comRow && comRow.lost !== row.lost;
                const pointsChanged = comRow && comRow.points !== row.points;
                const gdChanged = comRow && comRow.gd !== row.gd;
                const anyChanged =
                  posChanged ||
                  playedChanged ||
                  wonChanged ||
                  drawnChanged ||
                  lostChanged ||
                  pointsChanged ||
                  gdChanged;

                return (
                  <tr
                    key={index}
                    className={`transition-colors ${
                      isYafc
                        ? 'bg-amber-400/10'
                        : anyChanged
                        ? 'bg-amber-500/5'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Position */}
                    <td className="py-2 px-2 text-center">
                      <input
                        type="number"
                        min="1"
                        max="18"
                        value={row.pos}
                        onChange={(e) => handleCellChange(index, 'pos', e.target.value)}
                        className={`w-10 text-center py-1 rounded bg-[#081225] border text-xs font-bold ${
                          posChanged
                            ? 'border-amber-400 text-amber-300'
                            : 'border-slate-700 text-slate-200'
                        }`}
                      />
                    </td>

                    {/* Team Name & Crest */}
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={`/${row.crest}`}
                          alt={row.name}
                          className="w-5 h-5 object-contain shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/opponents/gpl-official.png';
                          }}
                        />
                        <input
                          type="text"
                          value={row.name}
                          onChange={(e) => handleCellChange(index, 'name', e.target.value)}
                          className={`w-full py-1 px-2 rounded bg-[#081225] border text-xs ${
                            isYafc
                              ? 'border-amber-400 font-bold text-amber-300'
                              : 'border-slate-700 text-slate-100'
                          }`}
                        />
                      </div>
                    </td>

                    {/* GP (Played) */}
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        value={row.played}
                        onChange={(e) => handleCellChange(index, 'played', e.target.value)}
                        className={`w-12 text-center py-1 rounded bg-[#081225] border text-xs ${
                          playedChanged
                            ? 'border-amber-400 text-amber-300 font-bold'
                            : 'border-slate-700 text-slate-300'
                        }`}
                      />
                    </td>

                    {/* W (Won) */}
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        value={row.won}
                        onChange={(e) => handleCellChange(index, 'won', e.target.value)}
                        className={`w-12 text-center py-1 rounded bg-[#081225] border text-xs ${
                          wonChanged
                            ? 'border-amber-400 text-amber-300 font-bold'
                            : 'border-slate-700 text-slate-300'
                        }`}
                      />
                    </td>

                    {/* D (Drawn) */}
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        value={row.drawn}
                        onChange={(e) => handleCellChange(index, 'drawn', e.target.value)}
                        className={`w-12 text-center py-1 rounded bg-[#081225] border text-xs ${
                          drawnChanged
                            ? 'border-amber-400 text-amber-300 font-bold'
                            : 'border-slate-700 text-slate-300'
                        }`}
                      />
                    </td>

                    {/* L (Lost) */}
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        value={row.lost}
                        onChange={(e) => handleCellChange(index, 'lost', e.target.value)}
                        className={`w-12 text-center py-1 rounded bg-[#081225] border text-xs ${
                          lostChanged
                            ? 'border-amber-400 text-amber-300 font-bold'
                            : 'border-slate-700 text-slate-300'
                        }`}
                      />
                    </td>

                    {/* GF */}
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        value={row.gf}
                        onChange={(e) => handleCellChange(index, 'gf', e.target.value)}
                        className="w-12 text-center py-1 rounded bg-[#081225] border border-slate-700 text-xs text-slate-300"
                      />
                    </td>

                    {/* GA */}
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        min="0"
                        value={row.ga}
                        onChange={(e) => handleCellChange(index, 'ga', e.target.value)}
                        className="w-12 text-center py-1 rounded bg-[#081225] border border-slate-700 text-xs text-slate-300"
                      />
                    </td>

                    {/* GD */}
                    <td className="py-2 px-1 text-center">
                      <input
                        type="number"
                        value={row.gd}
                        onChange={(e) => handleCellChange(index, 'gd', e.target.value)}
                        className={`w-12 text-center py-1 rounded bg-[#081225] border text-xs font-bold ${
                          gdChanged
                            ? 'border-amber-400 text-amber-300'
                            : row.gd > 0
                            ? 'border-slate-700 text-emerald-400'
                            : row.gd < 0
                            ? 'border-slate-700 text-rose-400'
                            : 'border-slate-700 text-slate-400'
                        }`}
                      />
                    </td>

                    {/* Points */}
                    <td className="py-2 px-2 text-center">
                      <input
                        type="number"
                        min="0"
                        value={row.points}
                        onChange={(e) => handleCellChange(index, 'points', e.target.value)}
                        className={`w-14 text-center py-1 rounded bg-[#081225] border text-xs font-black ${
                          pointsChanged
                            ? 'border-amber-400 text-amber-300'
                            : 'border-slate-700 text-amber-400'
                        }`}
                      />
                    </td>

                    {/* Diff Indicator */}
                    <td className="py-2 px-3 text-center">
                      {anyChanged ? (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          CHANGED
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">Same</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
