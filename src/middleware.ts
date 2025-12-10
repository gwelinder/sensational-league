import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Routes that are hidden from the public.
 * These pages exist but are not released yet (using mock data).
 * They will return 404 unless accessed with the preview secret.
 */
const HIDDEN_ROUTES = [
	"/impact",
	"/dashboard",
	"/teams",
	"/schedule",
	"/policies",
];

/**
 * Secret query param to bypass the hidden route protection.
 * Access hidden pages with ?preview=<PREVIEW_SECRET>
 */
const PREVIEW_SECRET = process.env.PREVIEW_SECRET || "sensational-preview-2025";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the path starts with any hidden route
	const isHiddenRoute = HIDDEN_ROUTES.some(
		(route) => pathname === route || pathname.startsWith(`${route}/`)
	);

	if (isHiddenRoute) {
		// Allow access if preview secret is provided
		const previewParam = request.nextUrl.searchParams.get("preview");
		if (previewParam === PREVIEW_SECRET) {
			return NextResponse.next();
		}

		// Return 404 for hidden routes
		return NextResponse.rewrite(new URL("/not-found", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		// Match all paths except static files and API routes
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
	],
};
