/**
 * Centralized analytics utilities for GA4/GTM integration.
 *
 * This module provides type-safe dataLayer interactions and event tracking
 * for Typeform forms, page views, and custom conversions.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TypeformEventData {
	form_id: string;
	form_name?: string;
	response_id?: string;
	question_index?: number;
	question_ref?: string;
	question_title?: string;
	percent_complete?: number;
	time_on_form_seconds?: number;
}

export interface UTMParams {
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
	utm_term?: string;
	utm_content?: string;
}

export interface TypeformHiddenFields extends UTMParams {
	page_url?: string;
	page_referrer?: string;
	session_id?: string;
	client_id?: string;
	user_agent?: string;
	[key: string]: string | undefined;
}

type DataLayerEvent =
	| { event: "typeform_ready"; typeform: TypeformEventData }
	| { event: "typeform_start"; typeform: TypeformEventData }
	| { event: "typeform_progress"; typeform: TypeformEventData }
	| { event: "typeform_submit"; typeform: TypeformEventData }
	| { event: "typeform_close"; typeform: TypeformEventData }
	| { event: "newsletter_signup"; email_domain?: string }
	| { event: "form_conversion"; form_name: string; [key: string]: unknown }
	| { event: string; [key: string]: unknown }
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| any[]; // Consent commands are arrays like ["consent", "update", {...}]

declare global {
	interface Window {
		dataLayer?: DataLayerEvent[];
		gtag?: (...args: unknown[]) => void;
	}
}

// ---------------------------------------------------------------------------
// DataLayer Utilities
// ---------------------------------------------------------------------------

/**
 * Push an event to the dataLayer. Safe to call server-side (no-op).
 */
export function pushToDataLayer(event: DataLayerEvent): void {
	if (typeof window === "undefined") return;
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push(event);
}

/**
 * Generate a simple session ID if not already set.
 * Uses sessionStorage to persist across page navigations within a session.
 */
export function getSessionId(): string {
	if (typeof window === "undefined") return "";
	const KEY = "sl_session_id";
	let sessionId = sessionStorage.getItem(KEY);
	if (!sessionId) {
		sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
		sessionStorage.setItem(KEY, sessionId);
	}
	return sessionId;
}

/**
 * Extract UTM parameters from the current URL.
 */
export function getUTMParams(): UTMParams {
	if (typeof window === "undefined") return {};
	const params = new URLSearchParams(window.location.search);
	return {
		utm_source: params.get("utm_source") || undefined,
		utm_medium: params.get("utm_medium") || undefined,
		utm_campaign: params.get("utm_campaign") || undefined,
		utm_term: params.get("utm_term") || undefined,
		utm_content: params.get("utm_content") || undefined,
	};
}

/**
 * Persist UTM params to sessionStorage so they survive navigation.
 * Call this on initial page load.
 */
export function persistUTMParams(): void {
	if (typeof window === "undefined") return;
	const KEY = "sl_utm_params";
	const currentParams = getUTMParams();

	// Only store if we have UTM params in the URL
	const hasParams = Object.values(currentParams).some(Boolean);
	if (hasParams) {
		sessionStorage.setItem(KEY, JSON.stringify(currentParams));
	}
}

/**
 * Get persisted UTM params (falls back to current URL params).
 */
export function getPersistedUTMParams(): UTMParams {
	if (typeof window === "undefined") return {};
	const KEY = "sl_utm_params";
	const stored = sessionStorage.getItem(KEY);
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch {
			// Fall through to URL params
		}
	}
	return getUTMParams();
}

/**
 * Build hidden fields object for Typeform embeds.
 * This passes attribution data into the form submission.
 * Only includes fields with actual values (Typeform requires string values).
 */
export function buildTypeformHiddenFields(): Record<string, string> {
	if (typeof window === "undefined") return {};

	const utm = getPersistedUTMParams();

	const fields: TypeformHiddenFields = {
		...utm,
		page_url: window.location.href,
		page_referrer: document.referrer || undefined,
		session_id: getSessionId(),
		user_agent: navigator.userAgent,
	};

	// Filter out undefined values - Typeform requires string values
	const result: Record<string, string> = {};
	for (const [key, value] of Object.entries(fields)) {
		if (value !== undefined && value !== "") {
			result[key] = value;
		}
	}
	return result;
}

// ---------------------------------------------------------------------------
// Typeform Event Tracking
// ---------------------------------------------------------------------------

const formStartTimes = new Map<string, number>();

/**
 * Track when Typeform is ready/loaded.
 */
export function trackTypeformReady(formId: string, formName?: string): void {
	pushToDataLayer({
		event: "typeform_ready",
		typeform: {
			form_id: formId,
			form_name: formName,
		},
	});
}

/**
 * Track when user starts filling the form.
 */
export function trackTypeformStart(formId: string, formName?: string): void {
	formStartTimes.set(formId, Date.now());
	pushToDataLayer({
		event: "typeform_start",
		typeform: {
			form_id: formId,
			form_name: formName,
		},
	});
}

/**
 * Track question progress.
 */
export function trackTypeformProgress(
	formId: string,
	questionIndex: number,
	questionRef?: string,
	totalQuestions?: number,
	formName?: string,
): void {
	const startTime = formStartTimes.get(formId);
	const timeOnForm = startTime
		? Math.round((Date.now() - startTime) / 1000)
		: undefined;
	const percentComplete = totalQuestions
		? Math.round((questionIndex / totalQuestions) * 100)
		: undefined;

	pushToDataLayer({
		event: "typeform_progress",
		typeform: {
			form_id: formId,
			form_name: formName,
			question_index: questionIndex,
			question_ref: questionRef,
			percent_complete: percentComplete,
			time_on_form_seconds: timeOnForm,
		},
	});
}

/**
 * Track form submission.
 */
export function trackTypeformSubmit(
	formId: string,
	responseId?: string,
	formName?: string,
): void {
	const startTime = formStartTimes.get(formId);
	const timeOnForm = startTime
		? Math.round((Date.now() - startTime) / 1000)
		: undefined;

	pushToDataLayer({
		event: "typeform_submit",
		typeform: {
			form_id: formId,
			form_name: formName,
			response_id: responseId,
			percent_complete: 100,
			time_on_form_seconds: timeOnForm,
		},
	});

	// Also push as a conversion event for easier GA4 configuration
	pushToDataLayer({
		event: "form_conversion",
		form_name: formName || formId,
		form_id: formId,
		response_id: responseId,
		conversion_type: "typeform_submission",
	});

	// Clean up
	formStartTimes.delete(formId);
}

/**
 * Track form close/abandonment.
 */
export function trackTypeformClose(
	formId: string,
	lastQuestionIndex?: number,
	totalQuestions?: number,
	formName?: string,
): void {
	const startTime = formStartTimes.get(formId);
	const timeOnForm = startTime
		? Math.round((Date.now() - startTime) / 1000)
		: undefined;
	const percentComplete =
		lastQuestionIndex !== undefined && totalQuestions
			? Math.round((lastQuestionIndex / totalQuestions) * 100)
			: undefined;

	pushToDataLayer({
		event: "typeform_close",
		typeform: {
			form_id: formId,
			form_name: formName,
			question_index: lastQuestionIndex,
			percent_complete: percentComplete,
			time_on_form_seconds: timeOnForm,
		},
	});

	// Clean up
	formStartTimes.delete(formId);
}

// ---------------------------------------------------------------------------
// Other Event Tracking
// ---------------------------------------------------------------------------

/**
 * Track newsletter signups.
 */
export function trackNewsletterSignup(email?: string): void {
	// Extract domain for aggregate analysis (privacy-safe)
	const emailDomain = email?.split("@")[1];

	pushToDataLayer({
		event: "newsletter_signup",
		email_domain: emailDomain,
	});
}

/**
 * Generic event tracking.
 */
export function trackEvent(
	eventName: string,
	params: Record<string, unknown> = {},
): void {
	pushToDataLayer({
		event: eventName,
		...params,
	});
}
