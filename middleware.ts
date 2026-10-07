import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  const isAdminSubdomain =
    hostname === 'admin.youngapostlesfcgh.com' ||
    hostname.startsWith('admin.');

  // If accessing the admin subdomain:
  // Root '/' serves the admin portal (admin.html) directly
  if (isAdminSubdomain) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/admin.html', request.url));
    }
    if (pathname === '/admin.html') {
      return NextResponse.next();
    }
  }

  // Direct access to /admin.html is always allowed on any domain
  if (pathname === '/admin.html') {
    return NextResponse.next();
  }

  // Allow static assets, media, fonts, and API routes
  if (
    pathname.startsWith('/assets') ||
    pathname.startsWith('/css') ||
    pathname.startsWith('/js') ||
    pathname.startsWith('/data') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // NextAuth protection ONLY for /app/admin Next.js dashboard routes, never admin.html
  if ((pathname === '/admin' || pathname.startsWith('/admin/')) && pathname !== '/admin.html') {
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
