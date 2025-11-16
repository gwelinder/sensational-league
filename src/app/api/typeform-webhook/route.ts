import { Buffer } from "node:buffer";
import { type NextRequest, NextResponse } from "next/server";
import { sendPlayerDraftThankYou } from "@/lib/email/sendPlayerDraftThankYou";
import { createSharePointListItem } from "@/lib/sharepoint/saveListItem";
import { handleTypeformWebhook } from "@/lib/typeform/handleTypeformWebhook";

/**
 * Env vars used here:
 * - SHAREPOINT_SITE_ID
 * - SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID
 * - TYPEFORM_PLAYERDRAFT_SECRET (optional validation)
 * - TYPEFORM_PLAYERDRAFT_FORM_ID (optional safety guard)
 */

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
	const rawBodyBuffer = Buffer.from(await request.arrayBuffer());

	const result = await handleTypeformWebhook(
		rawBodyBuffer,
		request.headers.get("Typeform-Signature"),
		{
			deps: { createSharePointListItem, sendPlayerDraftThankYou },
			env: {
				typeformSecret: process.env.TYPEFORM_PLAYERDRAFT_SECRET,
				expectedFormId: process.env.TYPEFORM_PLAYERDRAFT_FORM_ID,
				sharePointListId: process.env.SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID,
			},
		},
	);

	return NextResponse.json(result.body, { status: result.status });
}
