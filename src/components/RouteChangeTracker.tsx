"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Tracks route changes and pushes page_view events to dataLayer.
 * This enables GTM/GA4 and third-party connectors (like Arrigoo CDP)
 * to listen for SPA page navigations.
 *
 * Event pushed: { event: 'page_view', page_path, page_url, page_title }
 */
export function RouteChangeTracker() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isFirstRender = useRef(true);

	useEffect(() => {
		// Skip first render - initial page load is handled by GTM's Initialization trigger
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		// Build the full URL path
		const search = searchParams?.toString();
		const url = pathname + (search ? `?${search}` : "");

		// Push page_view event to dataLayer
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: "page_view",
			page_path: pathname,
			page_url: window.location.origin + url,
			page_title: document.title,
		});
	}, [pathname, searchParams]);

	return null;
}
