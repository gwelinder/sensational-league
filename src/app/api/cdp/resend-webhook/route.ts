/**
 * Resend Webhook Handler
 * 
 * Handles email events from Resend:
 * - email.sent
 * - email.delivered
 * - email.opened
 * - email.clicked
 * - email.bounced
 * - email.complained
 * - contact.unsubscribed
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import {
  createEmailEvent,
  getDraftApplicantByEmail,
  updateApplicantEmailEngagement,
  handleResendUnsubscribe,
  updateFlowStats,
  getEmailFlow,
} from "@/lib/cdp";

// Verify Resend webhook signature
function verifyResendSignature(
  payload: string,
  signature: string | null,
  secret: string | null
): boolean {
  if (!secret) {
    console.warn("RESEND_WEBHOOK_SECRET not set - skipping signature verification");
    return true;
  }

  if (!signature) {
    return false;
  }

  // Resend uses HMAC SHA256
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

interface ResendWebhookEvent {
  type: string;
  created_at: string;
  data: {
    email_id?: string;
    from?: string;
    to?: string[];
    subject?: string;
    created_at?: string;
    // Click-specific
    click?: {
      link?: string;
      timestamp?: string;
      user_agent?: string;
      ip_address?: string;
    };
    // Bounce-specific
    bounce?: {
      type?: "hard" | "soft";
      message?: string;
    };
    // Contact-specific (for unsubscribe)
    email?: string;
    audience_id?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("resend-signature");
    const secret = process.env.RESEND_WEBHOOK_SECRET ?? null;

    // Verify signature
    if (!verifyResendSignature(rawBody, signature, secret)) {
      console.error("Invalid Resend webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event: ResendWebhookEvent = JSON.parse(rawBody);
    console.log(`Received Resend webhook: ${event.type}`);

    // Map Resend event type to our event type
    const eventTypeMap: Record<string, string> = {
      "email.sent": "sent",
      "email.delivered": "delivered",
      "email.opened": "opened",
      "email.clicked": "clicked",
      "email.bounced": "bounced",
      "email.complained": "complained",
      "contact.unsubscribed": "unsubscribed",
    };

    const eventType = eventTypeMap[event.type];
    if (!eventType) {
      // Unknown event type, acknowledge but don't process
      return NextResponse.json({ success: true, message: "Event type not handled" });
    }

    // Handle unsubscribe separately
    if (event.type === "contact.unsubscribed" && event.data.email) {
      await handleResendUnsubscribe(event.data.email);
      return NextResponse.json({ success: true });
    }

    // Get the recipient email
    const recipientEmail = event.data.to?.[0];
    if (!recipientEmail) {
      return NextResponse.json({ success: true, message: "No recipient email" });
    }

    // Find the applicant
    const applicant = await getDraftApplicantByEmail(recipientEmail);
    if (!applicant) {
      console.log(`No applicant found for email: ${recipientEmail}`);
      return NextResponse.json({ success: true, message: "Applicant not found" });
    }

    // Create the email event
    await createEmailEvent({
      applicant: { _ref: applicant._id },
      eventType: eventType as "sent" | "delivered" | "opened" | "clicked" | "bounced" | "complained" | "unsubscribed",
      resendEmailId: event.data.email_id,
      subject: event.data.subject,
      occurredAt: event.created_at,
      metadata: {
        clickedUrl: event.data.click?.link,
        userAgent: event.data.click?.user_agent,
        ip: event.data.click?.ip_address,
        bounceType: event.data.bounce?.type,
        bounceReason: event.data.bounce?.message,
      },
    });

    // Update applicant engagement stats
    const currentEngagement = applicant.emailEngagement || {
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
      unsubscribed: false,
    };

    const updates: Partial<typeof currentEngagement> = {};

    if (eventType === "opened") {
      updates.emailsOpened = currentEngagement.emailsOpened + 1;
      updates.lastEmailOpenedAt = event.created_at;
    } else if (eventType === "clicked") {
      updates.emailsClicked = currentEngagement.emailsClicked + 1;
    } else if (eventType === "complained" || eventType === "unsubscribed") {
      updates.unsubscribed = true;
    }

    if (Object.keys(updates).length > 0) {
      await updateApplicantEmailEngagement(applicant._id, updates);
    }

    // Update flow stats if this email was part of a flow
    // Note: We'd need to track flow info in the email tags for this
    // For now, we'll update based on enrollment data
    if (applicant.flowEnrollments) {
      for (const enrollment of applicant.flowEnrollments) {
        if (enrollment.status === "active") {
          const flow = await getEmailFlow(enrollment.flow._ref);
          if (flow) {
            const currentStats = flow.stats || {
              totalEnrolled: 0,
              currentlyActive: 0,
              completed: 0,
              exited: 0,
              emailsSent: 0,
              emailsOpened: 0,
              emailsClicked: 0,
            };

            if (eventType === "opened") {
              await updateFlowStats(flow._id, {
                emailsOpened: currentStats.emailsOpened + 1,
              });
            } else if (eventType === "clicked") {
              await updateFlowStats(flow._id, {
                emailsClicked: currentStats.emailsClicked + 1,
              });
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing Resend webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
