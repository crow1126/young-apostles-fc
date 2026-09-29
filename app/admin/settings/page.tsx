import React from 'react';
import Link from 'next/link';
import { getSettings } from '@/lib/kv';
import { SettingsForm } from '@/components/settings-form';
import { Settings, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await getSettings();

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
              <Settings className="w-6 h-6 text-amber-400" />
              Admin & Publisher Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Configure publish modes (Pull Request vs Direct Commit), Cron schedule, and embed snippets.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <SettingsForm initialSettings={settings} />
    </div>
  );
}
