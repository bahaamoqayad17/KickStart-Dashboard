import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { hasLocale } from 'next-intl';
import { routing } from './locales/routing';

export default createMiddleware(routing);

import jwt from 'jsonwebtoken';

const publicRoutes = [
	'/',
	'/login',
	'/register',
	'/forgot-password',
	'/reset-password',
	'/terms-of-service',
	'/privacy-policy',
];

function isSessionExpired(token?: string): boolean {
	if (!token) return true;

	try {
		const decoded = jwt.decode(token) as { exp?: number } | null;
		if (!decoded || !decoded.exp) return true;
		// JWT exp is in seconds → convert to ms
		return decoded.exp * 1000 < Date.now();
	} catch {
		return true; // Invalid token
	}
}

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	let pathWithoutLocale = pathname;
	if (hasLocale(routing.locales, pathname)) {
		const segments = pathname.split('/');
		segments.splice(1, 1);
		pathWithoutLocale = segments.join('/') || '/';
	}

	const isPublicRoute = publicRoutes.some(
		(route) => pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`),
	);

	const sessionToken = request.cookies.get('session')?.value;
	const hasSession = !!sessionToken && !isSessionExpired(sessionToken);

	// Redirect logged-in users away from /login
	if (hasSession && (pathWithoutLocale === '/login' || pathWithoutLocale.startsWith('/login'))) {
		const homeUrl = new URL('/', request.url);
		return NextResponse.redirect(homeUrl);
	}

	// Redirect unauthenticated or expired sessions away from protected routes
	if (!isPublicRoute && !hasSession) {
		const requestUrl = new URL(request.url);

		const relativePath = requestUrl.pathname + requestUrl.search;
		// const baseUrl = process.env.NEXTAUTH_URL || `${requestUrl.protocol}//${requestUrl.host}`;
		const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;
		const loginUrl = new URL('/login', baseUrl);
		loginUrl.searchParams.set('callbackUrl', relativePath);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|favicon-.*\\.png|apple-touch-icon.*\\.png).*)',
	],
};
