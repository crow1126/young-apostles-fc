import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Young Apostles FC - Digital Platform & Standings',
  description: 'Official Digital Platform, GPL Standings, and Admin Control Panel for Young Apostles FC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#081225] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
