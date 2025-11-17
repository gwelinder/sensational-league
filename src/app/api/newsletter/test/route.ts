import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import "isomorphic-fetch";

/**
 * DEBUG endpoint to test newsletter integrations
 * GET /api/newsletter/test?action=sharepoint|resend|all
 *
 * In production, add authentication to protect this endpoint!
 */
export async function GET(request: NextRequest) {

	const awaitedRequest = await request;
	const searchParams = awaitedRequest.nextUrl.searchParams;

	const action = searchParams.get('action') || 'all';

	const results: Record<string, unknown> = {
		timestamp: new Date().toISOString(),
		environment: {
			hasAzureTenantId: !!process.env.AZURE_TENANT_ID,
			hasAzureClientId: !!process.env.AZURE_CLIENT_ID,
			hasAzureClientSecret: !!process.env.AZURE_CLIENT_SECRET,
			hasSharePointSiteId: !!process.env.SHAREPOINT_SITE_ID,
			hasSharePointListId: !!process.env.SHAREPOINT_NEWSLETTER_LIST_ID,
			hasResendApiKey: !!process.env.RESEND_API_KEY,
			resendVerifiedDomain: process.env.RESEND_VERIFIED_DOMAIN || 'Not set',
		},
	};

	// Test SharePoint
	if (action === 'sharepoint' || action === 'all') {
		try {
			if (!process.env.AZURE_TENANT_ID || !process.env.AZURE_CLIENT_ID || !process.env.AZURE_CLIENT_SECRET) {
				results.sharepoint = { error: 'Missing Azure credentials' };
			} else {
				const credential = new ClientSecretCredential(
					process.env.AZURE_TENANT_ID,
					process.env.AZURE_CLIENT_ID,
					process.env.AZURE_CLIENT_SECRET,
				);

				const graphClient = Client.initWithMiddleware({
					authProvider: {
						getAccessToken: async () => {
							const token = await credential.getToken(
								"https://graph.microsoft.com/.default",
							);
							return token.token;
						},
					},
				});

				// Test: Get list metadata
				const listInfo = await graphClient
					.api(`/sites/${process.env.SHAREPOINT_SITE_ID}/lists/${process.env.SHAREPOINT_NEWSLETTER_LIST_ID}`)
					.get();

				results.sharepoint = {
					success: true,
					listName: listInfo.displayName,
					listId: listInfo.id,
					webUrl: listInfo.webUrl,
				};
			}
		} catch (error) {
			results.sharepoint = {
				error: error instanceof Error ? error.message : 'Unknown error',
				stack: error instanceof Error ? error.stack : undefined,
			};
		}
	}

	// Test Resend
	if (action === 'resend' || action === 'all') {
		try {
			if (!process.env.RESEND_API_KEY) {
				results.resend = { error: 'Missing RESEND_API_KEY' };
			} else {
				const resend = new Resend(process.env.RESEND_API_KEY);

				// Test: Send a test email to admin
				const { data, error } = await resend.emails.send({
					from: "Test <newsletter@sensationalleague.com>",
					to: ["saga@sagasportsgroup.com"],
					subject: "[TEST] Newsletter Integration Test",
					html: `<p>This is a test email to verify Resend integration.</p><p>Sent at: ${new Date().toISOString()}</p>`,
				});

				if (error) {
					results.resend = {
						error: error.message || error,
						name: typeof error === 'object' && error !== null && 'name' in error ? (error as { name: string }).name : undefined,
					};
				} else {
					results.resend = {
						success: true,
						emailId: data?.id,
					};
				}
			}
		} catch (error) {
			results.resend = {
				error: error instanceof Error ? error.message : 'Unknown error',
				stack: error instanceof Error ? error.stack : undefined,
			};
		}
	}

	return NextResponse.json(results, {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
