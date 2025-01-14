import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('Authentication');

  // Check if user is trying to access protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!authCookie) {
      // Redirect to login if no auth cookie is present
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Check if authenticated user tries to access auth pages
  if (authCookie && (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  )) {
    // Redirect to dashboard if user is already authenticated
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};