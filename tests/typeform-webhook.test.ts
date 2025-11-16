import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { handleTypeformWebhook } from "@/lib/typeform/handleTypeformWebhook";
import {
	PLAYER_DRAFT_EMAIL_FIELD_REF,
	PLAYER_DRAFT_NAME_FIELD_REF,
} from "@/lib/typeform/playerDraftFieldMap";

const secret = "test-secret";
const formId = "FORM123";

function buildPayload(overrides?: Record<string, unknown>) {
	const base = {
		form_response: {
			form_id: formId,
			token: "abc-token",
			submitted_at: "2025-01-01T00:00:00Z",
			answers: [
				{
					field: { id: "name", ref: PLAYER_DRAFT_NAME_FIELD_REF, type: "short_text" },
					type: "text",
					text: "Billie Draft",
				},
				{
					field: { id: "email", ref: PLAYER_DRAFT_EMAIL_FIELD_REF, type: "email" },
					type: "email",
					email: "billie@example.com",
				},
			],
		},
	};

	return JSON.stringify({ ...base, ...overrides });
}

function signPayload(body: string, customSecret = secret) {
	return `sha256=${crypto.createHmac("sha256", customSecret).update(body).digest("base64")}`;
}

test("rejects invalid signatures", async () => {
	const payload = buildPayload();
	const result = await handleTypeformWebhook(payload, "sha256=invalid", {
		env: {
			sharePointListId: "LIST123",
			expectedFormId: formId,
			typeformSecret: secret,
		},
		deps: {
			createSharePointListItem: async () => ({ id: "should-not-run" }),
			sendPlayerDraftThankYou: async () => true,
		},
	});

	assert.equal(result.status, 401);
	assert.deepEqual(result.body, { error: "Invalid signature" });
});

test("successfully stores submissions and triggers thank-you email", async () => {
	const payload = buildPayload();
	const signature = signPayload(payload);
	const createSharePointListItem = async ({ fields }: { fields: Record<string, unknown> }) => {
		assert.equal(fields.Title, "Billie Draft");
		assert.equal(fields.STATUS, "Submitted");
		return { id: "item-123" };
	};
	let emailCalled = false;
	const sendPlayerDraftThankYou = async () => {
		emailCalled = true;
		return true;
	};

	const result = await handleTypeformWebhook(payload, signature, {
		env: {
			sharePointListId: "LIST123",
			expectedFormId: formId,
			typeformSecret: secret,
		},
		deps: { createSharePointListItem, sendPlayerDraftThankYou },
	});

	assert.equal(result.status, 200);
	assert.equal(result.body.success, true);
	assert.equal(result.body.sharePointItemId, "item-123");
	assert.equal(result.body.emailSent, true);
	assert.equal(emailCalled, true);
});

test("validates required fields before hitting integrations", async () => {
	const body = buildPayload({
		form_response: {
			form_id: formId,
			token: "missing-email",
			answers: [
				{
					field: { id: "name", ref: PLAYER_DRAFT_NAME_FIELD_REF, type: "short_text" },
					type: "text",
					text: "No Email",
				},
			],
		},
	});
	const signature = signPayload(body);
	let sharePointCalled = false;

	const result = await handleTypeformWebhook(body, signature, {
		env: {
			sharePointListId: "LIST123",
			expectedFormId: formId,
			typeformSecret: secret,
		},
		deps: {
			createSharePointListItem: async () => {
				sharePointCalled = true;
				return { id: "should-not-run" };
			},
			sendPlayerDraftThankYou: async () => true,
		},
	});

	assert.equal(result.status, 400);
	assert.equal(sharePointCalled, false);
	assert.deepEqual(result.body.error, "Missing required fields");
});
