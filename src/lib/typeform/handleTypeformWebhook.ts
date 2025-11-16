import crypto from "node:crypto";
import { createSharePointListItem as createSharePointListItemImpl } from "@/lib/sharepoint/saveListItem";
import { sendPlayerDraftThankYou as sendPlayerDraftThankYouImpl } from "@/lib/email/sendPlayerDraftThankYou";
import {
	mapPlayerDraftResponse,
	type TypeformFormResponse,
} from "@/lib/typeform/typeformSharePointMapper";

export interface HandleTypeformWebhookDeps {
	createSharePointListItem?: typeof createSharePointListItemImpl;
	sendPlayerDraftThankYou?: typeof sendPlayerDraftThankYouImpl;
}

export interface HandleTypeformWebhookEnv {
	typeformSecret?: string | null;
	expectedFormId?: string | null;
	sharePointListId?: string | null;
}

export interface HandleTypeformWebhookResult {
	status: number;
	body: Record<string, unknown>;
}

const defaultDeps: Required<HandleTypeformWebhookDeps> = {
	createSharePointListItem: createSharePointListItemImpl,
	sendPlayerDraftThankYou: sendPlayerDraftThankYouImpl,
};

function verifyTypeformSignature(
	rawBody: string,
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

	const signature = signatureHeader.slice(expectedPrefix.length).trim();
	let providedSignature: Buffer;
	try {
		providedSignature = Buffer.from(signature, "base64");
	} catch {
		return false;
	}

	const computedSignature = crypto
		.createHmac("sha256", secret)
		.update(rawBody)
		.digest();

	if (providedSignature.length !== computedSignature.length) {
		return false;
	}

	try {
		return crypto.timingSafeEqual(providedSignature, computedSignature);
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

export async function handleTypeformWebhook(
	rawBody: string,
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
		parsedBody = JSON.parse(rawBody);
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

	const mappingResult = mapPlayerDraftResponse(formResponse);
	if (mappingResult.missingRequired.length > 0) {
		return {
			status: 400,
			body: { error: "Missing required fields", missing: mappingResult.missingRequired },
		};
	}

	try {
		const { id } = await deps.createSharePointListItem({
			listId: sharePointListId,
			fields: mappingResult.fields,
		});

		let emailSent = false;
		if (mappingResult.email) {
			emailSent = await deps.sendPlayerDraftThankYou({
				email: mappingResult.email,
				fullName: mappingResult.fullName,
				positionPreference: mappingResult.fields.Preferredposition as string | undefined,
				submittedAt: formResponse.submitted_at,
			});
		}

		return {
			status: 200,
			body: {
				success: true,
				sharePointItemId: id,
				emailSent,
				unmappedRefs: mappingResult.unmappedRefs,
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
