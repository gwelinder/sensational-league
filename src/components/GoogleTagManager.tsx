"use client";

import Script from "next/script";
import { useEffect } from "react";
import { persistUTMParams } from "@/lib/analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Google Tag Manager initialization with Consent Mode v2.
 *
 * This component:
 * 1. Sets default consent state (denied) before GTM loads
 * 2. Loads GTM container
 * 3. Configures GA4 within GTM context
 * 4. Persists UTM parameters for attribution tracking
 *
 * Consent updates are handled by the CookieBanner component.
 */
export function GoogleTagManager() {
	// Persist UTM params on mount for attribution tracking
	useEffect(() => {
		persistUTMParams();
	}, []);

	// If no GTM_ID, fall back to direct GA4 setup
	if (!GTM_ID && !GA_MEASUREMENT_ID) {
		return null;
	}

	// GTM-based setup (preferred)
	if (GTM_ID) {
		return (
			<>
				{/* Consent Mode v2 defaults - must load before GTM */}
				<Script id="gtm-consent-default" strategy="beforeInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}

						// Set default consent state (denied until user accepts)
						gtag('consent', 'default', {
							'ad_storage': 'denied',
							'ad_user_data': 'denied',
							'ad_personalization': 'denied',
							'analytics_storage': 'denied',
							'functionality_storage': 'denied',
							'personalization_storage': 'denied',
							'security_storage': 'granted',
							'wait_for_update': 500
						});

						// Enable URL passthrough for better attribution without cookies
						gtag('set', 'url_passthrough', true);

						// Enable ads data redaction when consent denied
						gtag('set', 'ads_data_redaction', true);
					`}
				</Script>

				{/* GTM Container */}
				<Script id="gtm-script" strategy="afterInteractive">
					{`
						(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','${GTM_ID}');
					`}
				</Script>
			</>
		);
	}

	// Fallback: Direct GA4 setup (if no GTM_ID but GA_MEASUREMENT_ID exists)
	return (
		<>
			{/* Consent Mode v2 defaults */}
			<Script id="ga-consent-default" strategy="beforeInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}

					gtag('consent', 'default', {
						'ad_storage': 'denied',
						'ad_user_data': 'denied',
						'ad_personalization': 'denied',
						'analytics_storage': 'denied',
						'wait_for_update': 500
					});

					gtag('set', 'url_passthrough', true);
					gtag('set', 'ads_data_redaction', true);
				`}
			</Script>

			{/* GA4 gtag.js */}
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="ga-config" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GA_MEASUREMENT_ID}', {
						send_page_view: true,
						cookie_flags: 'SameSite=None;Secure'
					});
				`}
			</Script>
		</>
	);
}

/**
 * GTM noscript fallback for the <body> tag.
 * Include this right after opening <body> tag.
 */
export function GoogleTagManagerNoScript() {
	if (!GTM_ID) return null;

	return (
		<noscript>
			<iframe
				src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
				height="0"
				width="0"
				style={{ display: "none", visibility: "hidden" }}
				title="Google Tag Manager"
			/>
		</noscript>
	);
}

export default GoogleTagManager;
