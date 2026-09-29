'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FileEdit,
  History,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

interface AdminNavProps {
  pendingDraftsCount: number;
  liveCommitSha?: string;
  season?: string;
}

export function AdminNav({ pendingDraftsCount, liveCommitSha, season }: AdminNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page, don't show the navigation bar
  if (pathname === '/admin/login') {
    return null;
  }

  const navLinks = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    {
      href: '/admin/drafts',
      label: 'Drafts',
      icon: FileEdit,
      badge: pendingDraftsCount > 0 ? pendingDraftsCount : undefined,
    },
    { href: '/admin/history', label: 'History & Revert', icon: History },
    { href: '/admin/logs', label: 'Scrape Logs', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a192f]/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5">
              <img
                src="/assets/official-logo.png"
                alt="Young Apostles FC"
                className="w-9 h-9 object-contain drop-shadow"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <span className="font-extrabold text-sm sm:text-base tracking-wide text-white flex items-center gap-2">
                  YAFC Admin
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Standings Bot
                  </span>
                </span>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Bot Fetches • Admin Publishes to GitHub
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        isActive
                          ? 'bg-slate-950 text-amber-400'
                          : 'bg-amber-400 text-slate-950'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/embed"
              target="_blank"
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
              title="Open public embed widget in new tab"
            >
              <span>Embed</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {liveCommitSha && (
              <span className="text-[11px] px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
                {liveCommitSha.substring(0, 7)}
              </span>
            )}

            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0d1f38] px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-400 text-slate-950">
                    {link.badge} pending
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
            <Link
              href="/embed"
              target="_blank"
              className="text-xs text-slate-300 flex items-center gap-1.5"
            >
              <span>View Live Embed Widget</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="text-xs text-rose-400 font-semibold flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-rose-500/10"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
