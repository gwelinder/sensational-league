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
		const userAgent = request.headers.get("user-agent") || "Unknown";
		const submittedFrom = request.headers.get("referer") || "Direct";

		// Store in SharePoint List (GDPR-compliant storage)
		let sharePointSuccess = false;
		if (
			process.env.AZURE_TENANT_ID &&
			process.env.AZURE_CLIENT_ID &&
			process.env.AZURE_CLIENT_SECRET &&
			process.env.SHAREPOINT_SITE_ID &&
			process.env.SHAREPOINT_NEWSLETTER_LIST_ID
		) {
			try {
				const graphClient = getGraphClient();

				// Check if email already exists
				// Add header to allow querying non-indexed fields
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
					const updateFields: Record<string, any> = {
						Status: "Active",
						ConsentGiven: consentGiven,
						ConsentTimestamp: consentTimestamp || timestamp,
					};
					if (source) updateFields.Source = source;

					await graphClient
						.api(
							`/sites/${process.env.SHAREPOINT_SITE_ID}/lists/${process.env.SHAREPOINT_NEWSLETTER_LIST_ID}/items/${itemId}/fields`
						)
						.update(updateFields);
				} else {
					// Create new subscription
					// Only include fields that exist in your SharePoint list
					const fields: Record<string, any> = {
						Title: email,
						Email: email,
						Status: "Active",
						SubscribedAt: timestamp,
						ConsentGiven: consentGiven,
						ConsentTimestamp: consentTimestamp || timestamp,
					};

					// Add optional fields only if they exist in your list
					if (source) fields.Source = source;
					// Uncomment these if you add these columns to SharePoint:
					// if (ipAddress) fields.IPAddress = ipAddress;
					// if (userAgent) fields.UserAgent = userAgent;

					await graphClient
						.api(
							`/sites/${process.env.SHAREPOINT_SITE_ID}/lists/${process.env.SHAREPOINT_NEWSLETTER_LIST_ID}/items`
						)
						.post({ fields });
				}
				sharePointSuccess = true;
			} catch (spError) {
				console.error("SharePoint error:", spError);
				// Don't fail the request if SharePoint fails
			}
		}

		// Send welcome email via Resend
		// When using resend.dev testing domain, can only send to account owner email
		// For production, verify your domain and remove this check
		const testingMode = process.env.RESEND_API_KEY?.startsWith('re_') && !process.env.RESEND_VERIFIED_DOMAIN;
		const recipientEmail = testingMode ? 'gwelinder@gmail.com' : email;

		let emailSuccess = false;
		try {

			const { error } = await resend.emails.send({
				from: "Sensational League <onboarding@resend.dev>", // Use resend.dev for testing, or verify your domain in Resend
				to: [recipientEmail],
				subject: testingMode ? `[TEST] Welcome to Sensational League ⚡ (for: ${email})` : "Welcome to Sensational League ⚡",
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
							${testingMode ? `<p style="margin: 15px 0 0; padding: 10px; background-color: #FF4400; color: white; font-size: 12px; border-radius: 4px;"><strong>TEST MODE:</strong> This email was intended for ${email}</p>` : ''}
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
										<a href="https://sensational-league.com" style="display: inline-block; padding: 14px 32px; color: #232324; text-decoration: none; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
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
								<a href="mailto:saga@sagasportsgroup.com?subject=Unsubscribe" style="color: #D4FF00; text-decoration: underline;">Unsubscribe</a> |
								<a href="https://sensational-league.com/privacy" style="color: #D4FF00; text-decoration: underline;">Privacy Policy</a>
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
				console.error("Resend error:", error);
			} else {
				emailSuccess = true;
			}
		} catch (emailError) {
			console.error("Email error:", emailError);
		}

		// Notify admin
		try {
			await resend.emails.send({
				from: "Sensational League Newsletter <onboarding@resend.dev>", // Use resend.dev for testing
				to: testingMode ? ["gwelinder@gmail.com"] : ["saga@sagasportsgroup.com"],
				subject: "⚡ New Sensational League Newsletter Subscription",
				text: `New newsletter subscription:

Email: ${email}
Source: ${source}
Subscribed at: ${timestamp}
IP Address: ${ipAddress}
Consent given: ${consentGiven}
Consent timestamp: ${consentTimestamp}

Stored in SharePoint: ${sharePointSuccess ? "Yes" : "No"}
Welcome email sent: ${emailSuccess ? "Yes" : "No"}
${testingMode ? '\n[TEST MODE: Welcome email sent to gwelinder@gmail.com]' : ''}`,
			});
		} catch (notifyError) {
			console.error("Admin notification error:", notifyError);
		}

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
