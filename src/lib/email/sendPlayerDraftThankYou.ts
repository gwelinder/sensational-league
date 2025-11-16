import { resendClient } from "./resendClient";
import { client as sanityClient } from "@/sanity/lib/client";
import { renderEmailTemplate } from "@/lib/email-renderer";

interface SendPlayerDraftThankYouOptions {
  email: string;
  fullName?: string;
  positionPreference?: string;
  submittedAt?: string;
}

function getFallbackHtml(fullName?: string, positionPreference?: string) {
  const greeting = fullName ? `Hi ${fullName.split(" ")[0]},` : "Hi,";
  const positionLine = positionPreference
    ? `We love that you're aiming to play ${positionPreference}. `
    : "";

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Thanks for applying ⚡</title>
  </head>
  <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#F7F7F7;">
    <table role="presentation" style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:40px 16px;" align="center">
          <table role="presentation" style="max-width:640px;width:100%;background-color:#232324;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:32px;text-align:center;background-color:#232324;">
                <h1 style="margin:0;color:#D4FF00;font-size:28px;text-transform:uppercase;letter-spacing:0.08em;">Sensational League</h1>
                <p style="margin:12px 0 0;color:#F7F7F7;font-size:13px;text-transform:uppercase;letter-spacing:0.2em;">Fast · Rebellious · Female</p>
              </td>
            </tr>
            <tr>
              <td style="padding:36px;background-color:#F7F7F7;color:#232324;">
                <p style="margin:0 0 16px;font-size:16px;">${greeting}</p>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
                  Thanks for throwing your name into the Sensational League draft pool. ${positionLine}Our team is reviewing every story, stat, and spark to build the most electric seven-a-side squads in women’s football.
                </p>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
                  Keep an eye on your inbox — we’ll reach out soon with next steps, including trial info, draft briefings, and how you can stay close to the action if you’re not selected this round.
                </p>
                <p style="margin:24px 0 0;font-size:16px;line-height:1.6;font-weight:600;">
                  Play football. Drive impact. Change the world.
                </p>
                <p style="margin:4px 0 0;font-size:16px;line-height:1.6;">
                  — The Sensational League team ⚡
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export async function sendPlayerDraftThankYou({
  email,
  fullName,
  positionPreference,
  submittedAt,
}: SendPlayerDraftThankYouOptions): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ Resend not configured - skipping player draft thank-you email");
    return false;
  }

  try {
    const template = await sanityClient.fetch(
      '*[_type == "emailTemplate" && templateId == "player-draft-thanks" && enabled == true][0] { subject, content, signature, ctaButton, socialLinks }',
    );

    const variables = {
      email,
      firstName: fullName?.split(" ")[0],
      position: positionPreference,
      submittedAt: submittedAt || new Date().toISOString(),
    } as Record<string, string | undefined>;

    let subject: string;
    let html: string;

    if (template) {
      const rendered = renderEmailTemplate(template, variables);
      subject = rendered.subject;
      html = rendered.html;
    } else {
      subject = "Thanks for applying to Sensational League";
      html = getFallbackHtml(fullName, positionPreference);
    }

    const fromEmail = process.env.RESEND_VERIFIED_DOMAIN
      ? `Sensational League <draft@${process.env.RESEND_VERIFIED_DOMAIN}>`
      : "Sensational League <onboarding@resend.dev>";

    const { error } = await resendClient.emails.send({
      from: fromEmail,
      to: [email],
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend error (player draft thank-you):", error);
      return false;
    }

    console.log("✅ Player draft thank-you email sent to", email);
    return true;
  } catch (error) {
    console.error("❌ Failed to send player draft thank-you email:", error);
    return false;
  }
}
