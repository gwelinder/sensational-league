import crypto from "node:crypto";
import { createSharePointListItem as createSharePointListItemImpl } from "@/lib/sharepoint/saveListItem";
import { sendPlayerDraftThankYou as sendPlayerDraftThankYouImpl } from "@/lib/email/sendPlayerDraftThankYou";
import { syncTypeformToCDP as syncTypeformToCDPImpl } from "@/lib/cdp";
import {
	mapPlayerDraftResponse,
	type TypeformFormResponse,
} from "@/lib/typeform/typeformSharePointMapper";

export interface HandleTypeformWebhookDeps {
	createSharePointListItem?: typeof createSharePointListItemImpl;
	sendPlayerDraftThankYou?: typeof sendPlayerDraftThankYouImpl;
	syncTypeformToCDP?: typeof syncTypeformToCDPImpl;
}

export interface HandleTypeformWebhookEnv {
	typeformSecret?: string | null;
	expectedFormId?: string | null;
	sharePointListId?: string | null;
}

export type RawWebhookBody = string | Buffer;

export interface HandleTypeformWebhookResult {
	status: number;
	body: Record<string, unknown>;
}

/**
 * Attribution data extracted from Typeform hidden fields.
 * These are passed from the website via the Typeform embed.
 */
export interface TypeformAttribution {
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
	utm_term?: string;
	utm_content?: string;
	page_url?: string;
	page_referrer?: string;
	session_id?: string;
	user_agent?: string;
}

const defaultDeps: Required<HandleTypeformWebhookDeps> = {
	createSharePointListItem: createSharePointListItemImpl,
	sendPlayerDraftThankYou: sendPlayerDraftThankYouImpl,
	syncTypeformToCDP: syncTypeformToCDPImpl,
};

function toBuffer(body: RawWebhookBody): Buffer {
	return typeof body === "string" ? Buffer.from(body, "utf8") : body;
}

function toJsonString(body: RawWebhookBody): string {
	return typeof body === "string" ? body : body.toString("utf8");
}

function verifyTypeformSignature(
	rawBody: RawWebhookBody,
	signatureHeader: string | null,
	secret?: string | null,
): boolean {
	if (!secret) {
		console.warn("⚠️ TYPEFORM_PLAYERDRAFT_SECRET not set - skipping signature verification");
		return true;
	}

	if (!signatureHeader) {
		return false;
	}

	const expectedPrefix = "sha256=";
	if (!signatureHeader.startsWith(expectedPrefix)) {
		return false;
	}

	const computedSignature = `${expectedPrefix}${crypto
		.createHmac("sha256", secret)
		.update(toBuffer(rawBody))
		.digest("base64")}`;

	const providedSignature = signatureHeader.trim();

	if (providedSignature.length !== computedSignature.length) {
		return false;
	}

	try {
		return crypto.timingSafeEqual(
			Buffer.from(providedSignature, "utf8"),
			Buffer.from(computedSignature, "utf8"),
		);
	} catch {
		return false;
	}
}

function parseFormResponse(payload: unknown): TypeformFormResponse | null {
	if (
		payload &&
		typeof payload === "object" &&
		"form_response" in payload &&
		payload.form_response
	) {
		return payload.form_response as TypeformFormResponse;
	}
	return null;
}

/**
 * Extract attribution data from Typeform hidden fields.
 * These are passed from the website embed for campaign tracking.
 */
function extractAttribution(hidden: Record<string, string> | undefined): TypeformAttribution {
	if (!hidden) return {};

	return {
		utm_source: hidden.utm_source,
		utm_medium: hidden.utm_medium,
		utm_campaign: hidden.utm_campaign,
		utm_term: hidden.utm_term,
		utm_content: hidden.utm_content,
		page_url: hidden.page_url,
		page_referrer: hidden.page_referrer,
		session_id: hidden.session_id,
		user_agent: hidden.user_agent,
	};
}

export async function handleTypeformWebhook(
	rawBody: RawWebhookBody,
	signatureHeader: string | null,
	options: {
		deps?: HandleTypeformWebhookDeps;
		env?: HandleTypeformWebhookEnv;
	} = {},
): Promise<HandleTypeformWebhookResult> {
	const deps = { ...defaultDeps, ...options.deps } as Required<HandleTypeformWebhookDeps>;
	const env = options.env ?? {};
	const typeformSecret = env.typeformSecret ?? process.env.TYPEFORM_PLAYERDRAFT_SECRET;
	const expectedFormId = env.expectedFormId ?? process.env.TYPEFORM_PLAYERDRAFT_FORM_ID;
	const sharePointListId = env.sharePointListId ?? process.env.SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID;

	if (!verifyTypeformSignature(rawBody, signatureHeader, typeformSecret)) {
		return {
			status: 401,
			body: { error: "Invalid signature" },
		};
	}

	let parsedBody: unknown;
	try {
		parsedBody = JSON.parse(toJsonString(rawBody));
	} catch {
		return {
			status: 400,
			body: { error: "Invalid JSON" },
		};
	}

	const formResponse = parseFormResponse(parsedBody);
	if (!formResponse) {
		return {
			status: 400,
			body: { error: "Missing form_response" },
		};
	}

	if (expectedFormId && formResponse.form_id !== expectedFormId) {
		return {
			status: 403,
			body: { error: "Unexpected form" },
		};
	}

	if (!sharePointListId) {
		return {
			status: 500,
			body: { error: "SharePoint list not configured" },
		};
	}

	// Extract attribution data from hidden fields
	const attribution = extractAttribution(formResponse.hidden);

	// Log attribution data for analytics debugging
	if (Object.values(attribution).some(Boolean)) {
		console.log("📊 Typeform submission attribution:", {
			responseId: formResponse.token,
			...attribution,
		});
	}

	const mappingResult = mapPlayerDraftResponse(formResponse);
	if (mappingResult.missingRequired.length > 0) {
		return {
			status: 400,
			body: { error: "Missing required fields", missing: mappingResult.missingRequired },
		};
	}

	// Add attribution data to SharePoint fields if configured
	const ATTRIBUTION_FIELDS_ENABLED = process.env.SHAREPOINT_PLAYER_APPLICATIONS_ATTRIBUTION_ENABLED === "true";
	if (ATTRIBUTION_FIELDS_ENABLED) {
		// These SharePoint field names would need to be created in the list
		if (attribution.utm_source) mappingResult.fields.UTMSource = attribution.utm_source;
		if (attribution.utm_medium) mappingResult.fields.UTMMedium = attribution.utm_medium;
		if (attribution.utm_campaign) mappingResult.fields.UTMCampaign = attribution.utm_campaign;
		if (attribution.page_url) mappingResult.fields.SourcePageURL = attribution.page_url;
		if (attribution.page_referrer) mappingResult.fields.SourceReferrer = attribution.page_referrer;
		if (attribution.session_id) mappingResult.fields.SessionID = attribution.session_id;
	}

	try {
		const { id } = await deps.createSharePointListItem({
			listId: sharePointListId,
			fields: mappingResult.fields,
		});

		let emailSent = false;
		if (mappingResult.email) {
			const positionPreference = mappingResult.positionPreference?.join(", ") || undefined;
			emailSent = await deps.sendPlayerDraftThankYou({
				email: mappingResult.email,
				fullName: mappingResult.fullName,
				positionPreference,
				submittedAt: formResponse.submitted_at,
			});
		}

		// Sync to CDP (Customer Data Platform)
		let cdpSync: { success: boolean; applicantId?: string; flowsTriggered?: number } | undefined;
		if (deps.syncTypeformToCDP && mappingResult.email) {
			try {
				cdpSync = await deps.syncTypeformToCDP(formResponse, id, {
					email: mappingResult.email,
					fullName: mappingResult.fullName,
					positionPreference: mappingResult.positionPreference,
				});
				
				if (cdpSync.success) {
					console.log(`✅ CDP sync successful: applicant=${cdpSync.applicantId}, flows=${cdpSync.flowsTriggered}`);
				} else {
					console.warn("⚠️ CDP sync returned unsuccessful");
				}
			} catch (cdpError) {
				// Don't fail the webhook if CDP sync fails
				console.error("⚠️ CDP sync error (non-fatal):", cdpError);
			}
		}

		return {
			status: 200,
			body: {
				success: true,
				sharePointItemId: id,
				emailSent,
				cdpSync: cdpSync ? {
					success: cdpSync.success,
					applicantId: cdpSync.applicantId,
					flowsTriggered: cdpSync.flowsTriggered,
				} : undefined,
				unmappedRefs: mappingResult.unmappedRefs,
				attribution: Object.values(attribution).some(Boolean) ? attribution : undefined,
			},
		};
	} catch (error) {
		console.error("Failed to store Typeform submission in SharePoint:", error);
		return {
			status: 500,
			body: { error: "Failed to create SharePoint item" },
		};
	}
}
