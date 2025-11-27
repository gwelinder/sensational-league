"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent-v1";

type ConsentState = "accepted" | "declined";

type ConsentPayload = {
	ad_storage: "granted" | "denied";
	ad_user_data: "granted" | "denied";
	ad_personalization: "granted" | "denied";
	analytics_storage: "granted" | "denied";
	functionality_storage: "granted" | "denied";
	personalization_storage: "granted" | "denied";
};

/**
 * Push consent update to GTM/GA4 dataLayer.
 * Works with both GTM and direct gtag.js implementations.
 */
function pushConsentUpdate(action: ConsentState) {
	try {
		const consentPayload: ConsentPayload =
			action === "accepted"
				? {
						ad_storage: "granted",
						ad_user_data: "granted",
						ad_personalization: "granted",
						analytics_storage: "granted",
						functionality_storage: "granted",
						personalization_storage: "granted",
					}
				: {
						ad_storage: "denied",
						ad_user_data: "denied",
						ad_personalization: "denied",
						analytics_storage: "denied",
						functionality_storage: "denied",
						personalization_storage: "denied",
					};

		// Ensure dataLayer exists
		window.dataLayer = window.dataLayer || [];

		// Use gtag function if available, otherwise push to dataLayer directly
		if (typeof window.gtag === "function") {
			window.gtag("consent", "update", consentPayload);
		} else {
			// Push consent update in GTM-compatible format
			window.dataLayer.push({
				event: "consent_update",
				consent_state: action,
			});
			// Also push the standard consent command for gtag
			window.dataLayer.push(["consent", "update", consentPayload]);
		}

		// Track the consent action itself as an event
		window.dataLayer.push({
			event: "cookie_consent",
			consent_action: action,
		});
	} catch (error) {
		console.error("Failed to push consent update", error);
	}
}

export default function CookieBanner() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		try {
			const stored = localStorage.getItem(CONSENT_KEY) as ConsentState | null;
			if (!stored) {
				// Defer state update to avoid calling setState directly in effect
				setTimeout(() => setVisible(true), 0);
			} else if (stored === "accepted" || stored === "declined") {
				pushConsentUpdate(stored);
			}
		} catch {
			setTimeout(() => setVisible(true), 0);
		}
	}, []);

	if (!visible) return null;

	function setConsent(value: ConsentState) {
		try {
			localStorage.setItem(CONSENT_KEY, value);
		} catch {
			// Ignore storage errors
		}
		pushConsentUpdate(value);
		setVisible(false);
	}

	return (
		<div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-5xl rounded-t-xl border border-black/10 bg-white p-4 shadow-lg dark:border-white/10 dark:bg-black">
			<p className="text-sm text-zinc-700 dark:text-zinc-300">
				We use cookies to improve your experience and analyze site traffic. By
				accepting, you help us understand how to serve you better.
			</p>
			<div className="mt-3 flex gap-3">
				<button
					type="button"
					onClick={() => setConsent("declined")}
					className="inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-900"
				>
					Decline
				</button>
				<button
					type="button"
					onClick={() => setConsent("accepted")}
					className="inline-flex items-center justify-center rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-zinc-900"
				>
					Accept
				</button>
			</div>
		</div>
	);
}
