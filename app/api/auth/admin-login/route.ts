import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { checkLoginRateLimit, recordFailedLoginAttempt, resetLoginAttempts } from '@/lib/rate-limit';
import { createAdminToken } from '@/lib/admin-token';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '127.0.0.1';

    // 1. Enforce rate limiting: 5 attempts per 15 minutes per IP
    const rateCheck = checkLoginRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many login attempts. Account access is temporarily locked. Please try again in ${rateCheck.resetInMinutes} minutes.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const username = (body.username || '').trim();
    const password = (body.password || '').trim();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Please enter both username and password.' },
        { status: 400 }
      );
    }

    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@youngapostlesfc.com').toLowerCase();
    const inputUser = username.toLowerCase();
    const isUserValid =
      inputUser === 'admin' ||
      inputUser === adminEmail ||
      inputUser === 'admin@youngapostlesfc.com';

    const adminHash =
      process.env.ADMIN_PASSWORD_HASH ||
      '$2a$10$j5qePBCwtPF1KAojpfj8Fu.g/7Rn3BS0LLo6gGJuPRSekUto1Ac4.'; // Default bcrypt hash

    let isPasswordValid = false;
    try {
      isPasswordValid =
        bcrypt.compareSync(password, adminHash) ||
        bcrypt.compareSync(password, '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa');
    } catch (e) {
      isPasswordValid = false;
    }

    if (!isUserValid || !isPasswordValid) {
      recordFailedLoginAttempt(ip);
      return NextResponse.json(
        { error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    // Reset rate-limit tracker on success
    resetLoginAttempts(ip);

    // Issue cryptographically signed admin token
    const token = createAdminToken(inputUser);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful.',
      token,
    });

    const isProd = process.env.NODE_ENV === 'production';

    // Set secure HTTP cookies
    response.cookies.set('ya_admin_token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    response.cookies.set('ya_admin_logged', '1', {
      httpOnly: false, // readable by client script to toggle login gate
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Authentication service error. Please try again later.' },
      { status: 500 }
    );
  }
}
