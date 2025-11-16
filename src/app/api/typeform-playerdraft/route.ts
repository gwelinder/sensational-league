import crypto from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createSharePointListItem } from "@/lib/sharepoint/saveListItem";
import { mapPlayerDraftResponse, type TypeformFormResponse } from "@/lib/typeform/typeformSharePointMapper";
import { sendPlayerDraftThankYou } from "@/lib/email/sendPlayerDraftThankYou";

/**
 * Env vars used here:
 * - SHAREPOINT_SITE_ID
 * - SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID
 * - TYPEFORM_PLAYERDRAFT_SECRET (optional validation)
 * - TYPEFORM_PLAYERDRAFT_FORM_ID (optional safety guard)
 */

export const runtime = "nodejs";

function verifyTypeformSignature(rawBody: string, signatureHeader: string | null): boolean {
  const secret = process.env.TYPEFORM_PLAYERDRAFT_SECRET;
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

  const signature = signatureHeader.slice(expectedPrefix.length);
  const computed = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computed));
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

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  const signatureHeader = request.headers.get("Typeform-Signature");
  if (!verifyTypeformSignature(rawBody, signatureHeader)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const formResponse = parseFormResponse(parsedBody);
  if (!formResponse) {
    return NextResponse.json({ error: "Missing form_response" }, { status: 400 });
  }

  if (
    process.env.TYPEFORM_PLAYERDRAFT_FORM_ID &&
    formResponse.form_id !== process.env.TYPEFORM_PLAYERDRAFT_FORM_ID
  ) {
    return NextResponse.json({ error: "Unexpected form" }, { status: 403 });
  }

  const listId = process.env.SHAREPOINT_PLAYER_APPLICATIONS_LIST_ID;
  if (!listId) {
    return NextResponse.json(
      { error: "SharePoint list not configured" },
      { status: 500 },
    );
  }

  const mappingResult = mapPlayerDraftResponse(formResponse);
  if (mappingResult.missingRequired.length > 0) {
    return NextResponse.json(
      {
        error: "Missing required fields",
        missing: mappingResult.missingRequired,
      },
      { status: 400 },
    );
  }

  try {
    const { id } = await createSharePointListItem({
      listId,
      fields: mappingResult.fields,
    });

    let emailSent = false;
    if (mappingResult.email) {
      emailSent = await sendPlayerDraftThankYou({
        email: mappingResult.email,
        fullName: mappingResult.fullName,
        positionPreference: mappingResult.fields.Preferredposition as string | undefined,
        submittedAt: formResponse.submitted_at,
      });
    }

    return NextResponse.json({
      success: true,
      sharePointItemId: id,
      emailSent,
      unmappedRefs: mappingResult.unmappedRefs,
    });
  } catch (error) {
    console.error("Failed to store Typeform submission in SharePoint:", error);
    return NextResponse.json(
      { error: "Failed to create SharePoint item" },
      { status: 500 },
    );
  }
}
