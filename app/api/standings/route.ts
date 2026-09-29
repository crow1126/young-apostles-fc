import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getSettings } from '@/lib/kv';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'standings.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Standings data not found.' },
        { status: 404 }
      );
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const standings = JSON.parse(raw);

    const settings = await getSettings();
    const allowedOrigin = settings.allowed_origins || '*';

    return NextResponse.json(standings, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  const settings = await getSettings();
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': settings.allowed_origins || '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
