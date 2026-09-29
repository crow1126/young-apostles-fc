import { NextRequest, NextResponse } from 'next/server';
import { runScraperBot } from '@/lib/scraper';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  return handleScrape(request, 'vercel-cron');
}

export async function POST(request: NextRequest) {
  return handleScrape(request, 'manual-api');
}

async function handleScrape(request: NextRequest, source: string) {
  const cronSecret = process.env.CRON_SECRET;

  // Protect route if CRON_SECRET is configured
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    const customHeader = request.headers.get('x-cron-secret');
    const querySecret = request.nextUrl.searchParams.get('secret');

    const bearerMatch = authHeader?.startsWith('Bearer ') && authHeader.slice(7) === cronSecret;
    const headerMatch = customHeader === cronSecret;
    const queryMatch = querySecret === cronSecret;

    if (!bearerMatch && !headerMatch && !queryMatch) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing CRON_SECRET.' },
        { status: 401 }
      );
    }
  }

  try {
    const result = await runScraperBot(source);
    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Scraper execution error.' },
      { status: 500 }
    );
  }
}
