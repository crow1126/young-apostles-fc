import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // If on the admin subdomain and hitting root or /admin.html, redirect to /admin
  const isAdminSubdomain =
    hostname === 'admin.youngapostlesfcgh.com' ||
    hostname.startsWith('admin.');

  if (isAdminSubdomain && (pathname === '/' || pathname === '/admin.html')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const hasSessionCookie =
      request.cookies.has('__Secure-next-auth.session-token') ||
      request.cookies.has('next-auth.session-token');

    if (!hasSessionCookie) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin.html', '/admin/:path*'],
};
