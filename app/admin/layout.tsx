import { AdminNav } from '@/components/admin-nav';
import { getDrafts } from '@/lib/kv';
import { getCommittedStandings } from '@/lib/scraper';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const drafts = await getDrafts();
  const pendingCount = drafts.filter((d) => d.status === 'pending').length;
  const committed = getCommittedStandings();

  return (
    <div className="min-h-screen bg-[#081225] text-slate-100 flex flex-col">
      <AdminNav
        pendingDraftsCount={pendingCount}
        season={committed?.season}
      />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        Young Apostles FC • Admin Control Panel & Standings Bot System
      </footer>
    </div>
  );
}
