import fs from 'fs';
import path from 'path';
import { StandingsData, StandingRow } from '@/lib/types';

export const dynamic = 'force-dynamic';

function getStandingsData(): StandingsData | null {
  try {
    const filePath = path.join(process.cwd(), 'data', 'standings.json');
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Embed page failed to read standings:', e);
  }
  return null;
}

export default function EmbedPage() {
  const standings = getStandingsData();

  if (!standings || !standings.rows) {
    return (
      <div className="p-6 text-center text-slate-400 bg-[#0a192f] rounded-lg">
        <p>No official GPL standings available.</p>
      </div>
    );
  }

  const publishedDate = new Date(standings.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="w-full bg-[#0a192f] text-slate-100 p-3 sm:p-5 rounded-xl border border-slate-800 shadow-2xl font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <img
            src="/assets/official-logo.png"
            alt="Young Apostles FC"
            className="w-10 h-10 object-contain drop-shadow"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <h1 className="text-lg font-bold text-amber-400 tracking-wide flex items-center gap-2">
              Ghana Premier League
              <span className="text-xs font-semibold px-2 py-0.5 bg-amber-400/10 text-amber-300 rounded border border-amber-400/20">
                {standings.season}
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Official League Standings • Last synced {publishedDate}
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Live verified
        </div>
      </div>

      {/* Standings Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800/80 bg-[#0d1f38]">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#0e2444] text-slate-300 text-xs font-semibold border-b border-slate-700/60 uppercase tracking-wider">
              <th className="py-2.5 px-3 text-center w-10">Pos</th>
              <th className="py-2.5 px-3">Club</th>
              <th className="py-2.5 px-2 text-center">P</th>
              <th className="py-2.5 px-2 text-center">W</th>
              <th className="py-2.5 px-2 text-center">D</th>
              <th className="py-2.5 px-2 text-center">L</th>
              <th className="py-2.5 px-2 text-center hidden sm:table-cell">GF</th>
              <th className="py-2.5 px-2 text-center hidden sm:table-cell">GA</th>
              <th className="py-2.5 px-2 text-center font-semibold">GD</th>
              <th className="py-2.5 px-3 text-center text-amber-400 font-bold">PTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {standings.rows.map((team: StandingRow) => {
              const isYafc = team.isClub || team.name.toLowerCase().includes('young apostles');
              return (
                <tr
                  key={team.pos}
                  className={`transition-colors ${
                    isYafc
                      ? 'bg-amber-400/15 font-semibold text-white border-l-4 border-l-amber-400'
                      : 'hover:bg-slate-800/40 text-slate-200'
                  }`}
                >
                  <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                        team.pos <= 4
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : team.pos >= 16
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'text-slate-400'
                      }`}
                    >
                      {team.pos}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-medium">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={`/${team.crest}`}
                        alt={team.name}
                        className="w-5 h-5 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/opponents/gpl-official.png';
                        }}
                      />
                      <span className={isYafc ? 'text-amber-300 font-bold' : ''}>
                        {team.name}
                      </span>
                      {isYafc && (
                        <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                          Club
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-center text-slate-300">{team.played}</td>
                  <td className="py-2.5 px-2 text-center text-slate-400">{team.won}</td>
                  <td className="py-2.5 px-2 text-center text-slate-400">{team.drawn}</td>
                  <td className="py-2.5 px-2 text-center text-slate-400">{team.lost}</td>
                  <td className="py-2.5 px-2 text-center text-slate-400 hidden sm:table-cell">{team.gf}</td>
                  <td className="py-2.5 px-2 text-center text-slate-400 hidden sm:table-cell">{team.ga}</td>
                  <td
                    className={`py-2.5 px-2 text-center font-semibold ${
                      team.gd > 0
                        ? 'text-emerald-400'
                        : team.gd < 0
                        ? 'text-rose-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {team.gd > 0 ? `+${team.gd}` : team.gd}
                  </td>
                  <td className="py-2.5 px-3 text-center text-amber-400 font-black text-sm">
                    {team.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-[11px] text-slate-400 pt-3 border-t border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Top 4 (CAF Competition)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span> Bottom 3 (Relegation)
          </span>
        </div>
        <div>
          Powered by <span className="text-amber-400 font-semibold">Young Apostles FC</span>
        </div>
      </div>
    </div>
  );
}
