import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import "isomorphic-fetch";

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Microsoft Graph client for SharePoint
function getGraphClient() {
	const tenantId = process.env.AZURE_TENANT_ID;
	const clientId = process.env.AZURE_CLIENT_ID;
	const clientSecret = process.env.AZURE_CLIENT_SECRET;

	if (!tenantId || !clientId || !clientSecret) {
		throw new Error("Missing Azure credentials");
	}

	const credential = new ClientSecretCredential(
		tenantId,
		clientId,
		clientSecret,
	);

	return Client.initWithMiddleware({
		authProvider: {
			getAccessToken: async () => {
				const token = await credential.getToken(
					"https://graph.microsoft.com/.default",
				);
				return token.token;
			},
		},
	});
}

// Helper: Save to SharePoint (independent operation)
async function saveToSharePoint(
	email: string,
	consentGiven: boolean,
	consentTimestamp: string,
	timestamp: string,
	source?: string
): Promise<boolean> {
	if (
		!process.env.AZURE_TENANT_ID ||
		!process.env.AZURE_CLIENT_ID ||
		!process.env.AZURE_CLIENT_SECRET ||
		!process.env.SHAREPOINT_SITE_ID ||
		!process.env.SHAREPOINT_NEWSLETTER_LIST_ID
	) {
		console.warn("⚠️ SharePoint not configured - missing environment variables");
		return false;
	}

	try {
		const graphClient = getGraphClient();

		// Check if email already exists
		const existingItems = await graphClient
			.api(
				`/sites/${process.env.SHAREPOINT_SITE_ID}/lists/${process.env.SHAREPOINT_NEWSLETTER_LIST_ID}/items`
			)
			.header('Prefer', 'HonorNonIndexedQueriesWarningMayFailRandomly')
			.filter(`fields/Email eq '${email}'`)
			.expand('fields')
			.get();

		if (existingItems.value && existingItems.value.length > 0) {
			// Update existing subscription
			const itemId = existingItems.value[0].id;
			const updateFields: Record<string, string | boolean> = {
				Status: "Active",
				ConsentGiven: consentGiven,
				ConsentTimestamp: consentTimestamp,
			};
			if (source) updateFields.Source = source;

			await graphClient
				.api(
					`/sites/${process.env.SHAREPOINT_SITE_ID}/lists/${process.env.SHAREPOINT_NEWSLETTER_LIST_ID}/items/${itemId}/fields`
				)
				.update(updateFields);

			console.log("✅ SharePoint: Updated existing subscription for", email);
		} else {
			// Create new subscription
			const fields: Record<string, string | boolean> = {
				Title: email,
				Email: email,
				Status: "Active",
				SubscribedAt: timestamp,
				ConsentGiven: consentGiven,
				ConsentTimestamp: consentTimestamp,
			};

			if (source) fields.Source = source;

			await graphClient
				.api(
					`/sites/${process.env.SHAREPOINT_SITE_ID}/lists/${process.env.SHAREPOINT_NEWSLETTER_LIST_ID}/items`
				)
				.post({ fields });

			console.log("✅ SharePoint: Created new subscription for", email);
		}

		return true;
	} catch (spError) {
		console.error("❌ SharePoint error:", spError);
		console.error("SharePoint error details:", {
			message: spError instanceof Error ? spError.message : 'Unknown error',
			stack: spError instanceof Error ? spError.stack : undefined,
			siteId: process.env.SHAREPOINT_SITE_ID,
			listId: process.env.SHAREPOINT_NEWSLETTER_LIST_ID,
		});
		return false;
	}
}

// Helper: Send welcome email (independent operation)
async function sendWelcomeEmail(email: string, timestamp: string): Promise<boolean> {
	if (!process.env.RESEND_API_KEY) {
		console.warn("⚠️ Resend not configured - missing RESEND_API_KEY");
		return false;
	}

	try {
		// Use verified domain if available, fallback to Resend test domain
		const fromEmail = process.env.RESEND_VERIFIED_DOMAIN === 'sensationalleague.com'
			? "Sensational League <newsletter@sensationalleague.com>"
			: "Sensational League <onboarding@resend.dev>";

		const { error } = await resend.emails.send({
			from: fromEmail,
			to: [email],
			subject: "Welcome to Sensational League ⚡",
			html: `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Welcome to Sensational League</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F7F7F7;">
	<table role="presentation" style="width: 100%; border-collapse: collapse;">
		<tr>
			<td align="center" style="padding: 40px 20px;">
				<table role="presentation" style="max-width: 600px; width: 100%; background-color: #232324; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
					<!-- Header -->
					<tr>
						<td style="padding: 40px 40px 30px; text-align: center; background-color: #232324;">
							<h1 style="margin: 0; color: #D4FF00; font-size: 32px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">SENSATIONAL LEAGUE</h1>
							<p style="margin: 10px 0 0; color: #F7F7F7; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">Fast. Rebellious. Female.</p>
						</td>
					</tr>

					<!-- Content -->
					<tr>
						<td style="padding: 40px; background-color: #F7F7F7;">
							<p style="margin: 0 0 20px; color: #232324; font-size: 16px; line-height: 1.6; font-weight: 500;">
								Welcome to the movement! ⚡
							</p>
							<p style="margin: 0 0 20px; color: #232324; font-size: 16px; line-height: 1.6;">
								You're now part of something revolutionary. Get ready for exclusive updates about the world's most innovative women's football league—where teams compete not just for goals, but for impact.
							</p>
							<p style="margin: 0 0 20px; color: #232324; font-size: 16px; line-height: 1.6;">
								<strong>Play Football. Drive Impact. Change the World.</strong>
							</p>
							<p style="margin: 0 0 30px; color: #232324; font-size: 16px; line-height: 1.6;">
								Stay tuned for announcements about our launch, team reveals, and how you can be part of the Sensational League.
							</p>

							<!-- CTA Button -->
							<table role="presentation" style="margin: 0 auto;">
								<tr>
									<td style="border-radius: 24px; background-color: #D4FF00;">
										<a href="https://sensationalleague.com" style="display: inline-block; padding: 14px 32px; color: #232324; text-decoration: none; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
											Visit Our Website
										</a>
									</td>
								</tr>
							</table>
						</td>
					</tr>

					<!-- Footer -->
					<tr>
						<td style="padding: 30px 40px; background-color: #232324; border-top: 2px solid #D4FF00;">
							<p style="margin: 0 0 15px; color: rgba(247,247,247,0.7); font-size: 12px; line-height: 1.5;">
								You're receiving this email because you subscribed to Sensational League newsletter on ${new Date(timestamp).toLocaleDateString()}.
							</p>
							<p style="margin: 0; color: rgba(247,247,247,0.7); font-size: 12px; line-height: 1.5;">
								<a href="mailto:hello@sensationalleague.com?subject=Unsubscribe" style="color: #D4FF00; text-decoration: underline;">Unsubscribe</a> |
								<a href="https://sensationalleague.com/privacy" style="color: #D4FF00; text-decoration: underline;">Privacy Policy</a>
							</p>
							<p style="margin: 15px 0 0; color: rgba(247,247,247,0.7); font-size: 12px; line-height: 1.5;">
								© ${new Date().getFullYear()} Sensational League. All rights reserved.
							</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>
			`,
		});

		if (error) {
			console.error("❌ Resend error:", error);
			console.error("Resend error details:", {
				from: "newsletter@sensationalleague.com",
				to: email,
				verifiedDomain: process.env.RESEND_VERIFIED_DOMAIN,
			});
			return false;
		}

		console.log("✅ Email: Successfully sent welcome email to", email);
		return true;
	} catch (emailError) {
		console.error("❌ Email error:", emailError);
		console.error("Email error details:", {
			message: emailError instanceof Error ? emailError.message : 'Unknown error',
			hasApiKey: !!process.env.RESEND_API_KEY,
		});
		return false;
	}
}

// Helper: Send admin notification (non-blocking, fire-and-forget)
async function sendAdminNotification(
	email: string,
	source: string,
	timestamp: string,
	ipAddress: string,
	consentGiven: boolean,
	consentTimestamp: string,
	sharePointSuccess: boolean,
	emailSuccess: boolean
): Promise<void> {
	try {
		// Use verified domain if available, fallback to Resend test domain
		const fromEmail = process.env.RESEND_VERIFIED_DOMAIN === 'sensationalleague.com'
			? "Sensational League Newsletter <notifications@sensationalleague.com>"
			: "Sensational League Newsletter <onboarding@resend.dev>";

		await resend.emails.send({
			from: fromEmail,
			to: ["saga@sagasportsgroup.com"],
			subject: `[SL] Newsletter Signup: ${email}`,
			text: `New newsletter subscription:

Email: ${email}
Source: ${source}
Subscribed at: ${timestamp}
IP Address: ${ipAddress}
Consent given: ${consentGiven}
Consent timestamp: ${consentTimestamp}

Stored in SharePoint: ${sharePointSuccess ? "Yes" : "No"}
Welcome email sent: ${emailSuccess ? "Yes" : "No"}`,
		});
		console.log("✅ Admin notification sent");
	} catch (notifyError) {
		console.error("❌ Admin notification error:", notifyError);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { email, consentGiven, consentTimestamp, source } = body;

		// Validate required fields
		if (!email || !consentGiven) {
			return NextResponse.json(
				{ error: "Email and consent are required" },
				{ status: 400 },
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email address" },
				{ status: 400 },
			);
		}

		const timestamp = new Date().toISOString();
		const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown";

		console.log(`📧 Newsletter signup: ${email} from ${source || 'unknown source'}`);

		// Run SharePoint and Email operations in parallel using Promise.allSettled
		// This ensures they are completely independent - failures don't cascade
		const [sharePointResult, emailResult] = await Promise.allSettled([
			saveToSharePoint(email, consentGiven, consentTimestamp || timestamp, timestamp, source),
			sendWelcomeEmail(email, timestamp),
		]);

		const sharePointSuccess = sharePointResult.status === 'fulfilled' && sharePointResult.value;
		const emailSuccess = emailResult.status === 'fulfilled' && emailResult.value;

		// Log results
		if (sharePointResult.status === 'rejected') {
			console.error("❌ SharePoint operation rejected:", sharePointResult.reason);
		}
		if (emailResult.status === 'rejected') {
			console.error("❌ Email operation rejected:", emailResult.reason);
		}

		// Send admin notification (non-blocking, fire-and-forget)
		sendAdminNotification(
			email,
			source || 'unknown',
			timestamp,
			ipAddress,
			consentGiven,
			consentTimestamp || timestamp,
			sharePointSuccess,
			emailSuccess
		).catch((err: Error) => console.error("Admin notification failed:", err));

		return NextResponse.json({
			success: true,
			message: "Successfully subscribed to newsletter",
			sharePointSaved: sharePointSuccess,
			emailSent: emailSuccess,
		});
	} catch (error) {
		console.error("Newsletter subscription error:", error);
		return NextResponse.json(
			{ error: "Failed to process subscription" },
			{ status: 500 },
		);
	}
}
