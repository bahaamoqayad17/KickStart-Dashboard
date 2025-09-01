import { NextResponse, type NextRequest } from 'next/server';
import { hasLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { routing } from './locales/routing';
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

	// Handle locale detection and routing
	let pathWithoutLocale = pathname;
	let locale = routing.defaultLocale as 'en' | 'ar';

	// Check if the path already has a valid locale
	if (hasLocale(routing.locales, pathname)) {
		locale = (await getLocale()) as 'en' | 'ar';
		const segments = pathname.split('/');
		segments.splice(1, 1);
		pathWithoutLocale = segments.join('/') || '/';
		console.log(
			`[Middleware] Path has locale: ${pathname} -> locale: ${locale}, pathWithoutLocale: ${pathWithoutLocale}`,
		);
	} else {
		// Only redirect to default locale if the path doesn't already start with it
		// and if we're not on a root path like '/'
		if (
			pathname !== '/' &&
			!pathname.startsWith(`/${routing.defaultLocale}/`) &&
			!pathname.startsWith(`/${routing.defaultLocale}`)
		) {
			const url = request.nextUrl.clone();
			url.pathname = `/${routing.defaultLocale}${pathname}`;
			console.log(
				`[Middleware] Redirecting to default locale: ${pathname} -> ${url.pathname}`,
			);
			return NextResponse.redirect(url);
		}
		// If we're here, either we're on root '/' or already have the default locale
		pathWithoutLocale =
			pathname === '/' ? '/' : pathname.replace(`/${routing.defaultLocale}`, '') || '/';
		console.log(
			`[Middleware] No redirect needed: ${pathname} -> pathWithoutLocale: ${pathWithoutLocale}`,
		);
	}

	const isPublicRoute = publicRoutes.some(
		(route) => pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`),
	);

	const sessionToken = request.cookies.get('session')?.value;
	const hasSession = !!sessionToken && !isSessionExpired(sessionToken);

	// Redirect logged-in users away from /login
	if (hasSession && (pathWithoutLocale === '/login' || pathWithoutLocale.startsWith('/login'))) {
		const homeUrl = new URL(`/${locale}`, request.url);
		return NextResponse.redirect(homeUrl);
	}

	// Redirect unauthenticated or expired sessions away from protected routes
	if (!isPublicRoute && !hasSession) {
		const requestUrl = new URL(request.url);
		const relativePath = requestUrl.pathname + requestUrl.search;
		const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;
		const loginUrl = new URL(`/${locale}/login`, baseUrl);
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
