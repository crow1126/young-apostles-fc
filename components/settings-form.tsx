'use client';

import React, { useState } from 'react';
import { AdminSettings } from '@/lib/types';
import { updateSettingsAction } from '@/app/actions/publish';
import {
  Save,
  CheckCircle2,
  Copy,
  Check,
  GitPullRequest,
  GitCommit,
  Clock,
  Globe,
  Code2,
  Loader2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SettingsFormProps {
  initialSettings: AdminSettings;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<AdminSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate iframe embed snippet
  const embedUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/embed`
    : 'https://youngapostlesfcgh.com/embed';

  const embedSnippet = `<iframe
  src="${embedUrl}"
  width="100%"
  height="720"
  frameborder="0"
  style="border:none; border-radius:12px; overflow:hidden;"
  title="Ghana Premier League Standings - Young Apostles FC"
></iframe>`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await updateSettingsAction(settings);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        router.refresh();
      } else {
        alert(res.error || 'Failed to save settings.');
      }
    } catch (err: any) {
      alert(err.message || 'Settings update error.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Success Notification */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings saved successfully.</span>
        </div>
      )}

      {/* Setting 1: Publish Mode */}
      <div className="bg-[#0d1f38] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <GitPullRequest className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">Publish Mode</h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Choose how the Admin server action commits the updated <code className="text-emerald-400">data/standings.json</code> to GitHub when you click "Publish".
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <label
            className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between ${
              settings.publish_mode === 'pr'
                ? 'border-amber-400 bg-amber-400/10'
                : 'border-slate-800 bg-[#081225] hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white flex items-center gap-2">
                  <GitPullRequest className="w-4 h-4 text-amber-400" />
                  Pull Request (Default)
                </span>
                <input
                  type="radio"
                  name="publish_mode"
                  value="pr"
                  checked={settings.publish_mode === 'pr'}
                  onChange={() => setSettings({ ...settings, publish_mode: 'pr' })}
                  className="text-amber-400 focus:ring-0"
                />
              </div>
              <p className="text-xs text-slate-400">
                Creates a feature branch and opens a Pull Request on GitHub. Merging the PR triggers the Vercel deploy. Safest and recommended.
              </p>
            </div>
          </label>

          <label
            className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between ${
              settings.publish_mode === 'direct'
                ? 'border-amber-400 bg-amber-400/10'
                : 'border-slate-800 bg-[#081225] hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-emerald-400" />
                  Direct Commit to Main
                </span>
                <input
                  type="radio"
                  name="publish_mode"
                  value="direct"
                  checked={settings.publish_mode === 'direct'}
                  onChange={() => setSettings({ ...settings, publish_mode: 'direct' })}
                  className="text-amber-400 focus:ring-0"
                />
              </div>
              <p className="text-xs text-slate-400">
                Directly commits to the <code className="text-slate-300">main</code> branch on GitHub. Immediately triggers the live Vercel production deployment.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Setting 2: Bot Schedule */}
      <div className="bg-[#0d1f38] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold text-white">Bot Schedule (Vercel Cron)</h2>
        </div>
        <p className="text-xs text-slate-400">
          Vercel Cron runs the scraper bot on a regular schedule, fetching standings, validating math, and creating drafts in KV.
        </p>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Cron Expression (5-field)
          </label>
          <input
            type="text"
            value={settings.cron_schedule}
            onChange={(e) => setSettings({ ...settings, cron_schedule: e.target.value })}
            placeholder="0 */6 * * *"
            className="w-full max-w-sm px-3.5 py-2.5 rounded-lg bg-[#081225] border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-amber-400"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            Default: <code className="text-slate-400">0 */6 * * *</code> (Every 6 hours). Configured in <code className="text-slate-400">vercel.json</code>.
          </p>
        </div>
      </div>

      {/* Setting 3: Allowed Origins */}
      <div className="bg-[#0d1f38] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-bold text-white">Allowed Origins (CORS)</h2>
        </div>
        <p className="text-xs text-slate-400">
          Domains permitted to fetch <code className="text-emerald-400">/api/standings</code> and embed the widget in cross-origin iframes.
        </p>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Access-Control-Allow-Origin
          </label>
          <input
            type="text"
            value={settings.allowed_origins}
            onChange={(e) => setSettings({ ...settings, allowed_origins: e.target.value })}
            placeholder="*"
            className="w-full max-w-lg px-3.5 py-2.5 rounded-lg bg-[#081225] border border-slate-700 text-slate-100 text-xs font-mono focus:outline-none focus:border-amber-400"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            Use <code className="text-slate-400">*</code> to permit all websites, or comma-separated domains like <code className="text-slate-400">https://youngapostlesfcgh.com</code>.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-400/15 disabled:opacity-50 transition-all"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>

      {/* Setting 4: Iframe Embed Snippet */}
      <div className="bg-[#0d1f38] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Iframe Embed Snippet</h2>
          </div>
          <button
            type="button"
            onClick={handleCopySnippet}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Snippet</span>
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-slate-400">
          Embed the official Young Apostles FC GPL standings widget on external sports portals, blogs, or partner media sites:
        </p>

        <pre className="p-4 rounded-lg bg-[#081225] border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto select-all">
          {embedSnippet}
        </pre>
      </div>
    </form>
  );
}
