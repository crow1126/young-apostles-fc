import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });

  response.cookies.set('ya_admin_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  response.cookies.set('ya_admin_logged', '', {
    path: '/',
    maxAge: 0,
  });

  return response;
}
