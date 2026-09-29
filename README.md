# Young Apostles FC - Official Website & Digital Platform

Official web platform for **Young Apostles Football Club (Young Apostles FC)** — competing in the Ghana Premier League (GPL).

## 🌟 Features
- **Modern Responsive Design**: Custom layout with rich animations and mobile responsiveness.
- **Club Identity & Theme**: Authentic club colors (Apostles Deep Blue, Electric Gold & Lime Green).
- **Match Center & Standings**: Fixtures, results, and league table integration.
- **Player Roster & Transfers**: Complete squad overview and player transfer history.
- **Media & News**: Match reports, gallery, and official club announcements.

## 🛡️ Admin Control Panel (Bot Fetches, Admin Pushes to GitHub)
A secure Next.js App Router admin portal and automated scraper bot for Ghana Premier League (GPL) standings.

### 🔒 Core Security & Architecture Rule
- **The Scraper Bot has NO GitHub credentials** and never touches the repository. It only produces drafts in KV store.
- **The live site serves `data/standings.json` from the repository**, imported at build time.
- **That file changes ONLY when the admin publishes**, which executes a server action committing to GitHub.
- The push to `main` (or PR merge) triggers the Vercel deploy.
- Git commit history is the single version history and rollback path.

### 🌐 Admin Routes (Protected by Middleware -> `/admin/login`)
- `/admin`: Last scrape status, pending drafts count, live version SHA & date, next scheduled run, "Fetch now" button.
- `/admin/drafts` & `/admin/drafts/[id]`: Visual diff against committed `data/standings.json`, inline cell editing, real-time math validation (18 teams, pos 1..18, GP = W+D+L, GD = GF-GA), Publish, Reject, Download JSON fallback.
- `/admin/history`: Last 20 commits touching `data/standings.json` with 1-click Revert.
- `/admin/logs`: Audit trail of last 100 scrape attempts.
- `/admin/settings`: Vercel Cron schedule, publish mode toggle (`pr` default vs `direct`), CORS allowed origins, iframe embed snippet generator.
- `/embed`: Standalone responsive embeddable standings widget for iframes.
- `/api/standings`: Public JSON API serving `data/standings.json`.

### 🔑 Environment Configuration
See `.env.example` for details:
```bash
ADMIN_EMAIL="admin@youngapostlesfc.com"
ADMIN_PASSWORD_HASH="$2a$10$..." # bcrypt hash
NEXTAUTH_SECRET="..."
GITHUB_TOKEN="ghp_..." # Scoped with Contents: Write & PR: Write (Server-only)
GITHUB_OWNER="crow1126"
GITHUB_REPO="young-apostles-fc"
CRON_SECRET="..."
```

## 📍 Club Info
- **Motto**: *... agya na ƆwƆ tumi*
- **Base**: Sunyani / Wenchi, Bono Region, Ghana
- **Official Website**: [youngapostlesfcgh.com](https://www.youngapostlesfc.com/)
