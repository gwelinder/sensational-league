import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { type NextRequest, NextResponse } from "next/server";
import "isomorphic-fetch";

// Next.js 16 caching - revalidate every hour
export const revalidate = 3600; // 1 hour
export const dynamic = 'force-static';

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

interface SharePointFile {
	id: string;
	name: string;
	size: number;
	webUrl: string;
	downloadUrl: string;
	thumbnails?: {
		small?: string; // 96x96
		medium?: string; // 176x176
		large?: string; // 800x800
	};
	lastModified: string;
}

export async function GET(request: NextRequest) {
	try {
		const siteId = process.env.SHAREPOINT_SITE_ID;
		const libraryId = process.env.SHAREPOINT_MEDIA_LIBRARY_ID;

		if (!siteId || !libraryId) {
			return NextResponse.json(
				{ error: "SharePoint configuration missing" },
				{ status: 500 },
			);
		}

		const graphClient = getGraphClient();

		// Get the "Logos" folder
		const logosFolder = await graphClient
			.api(`/sites/${siteId}/drives/${libraryId}/root:/Logos`)
			.get();

		// Get files from Logos folder
		const logosItems = await graphClient
			.api(`/sites/${siteId}/drives/${libraryId}/items/${logosFolder.id}/children`)
			.get();

		// Get the "Photos" folder
		const photosFolder = await graphClient
			.api(`/sites/${siteId}/drives/${libraryId}/root:/Photos`)
			.get();

		// Get files from Photos folder
		const photosItems = await graphClient
			.api(`/sites/${siteId}/drives/${libraryId}/items/${photosFolder.id}/children`)
			.get();

		// Process logos (include thumbnails for display)
		const logos: SharePointFile[] = await Promise.all(
			logosItems.value
				.filter((item: any) => item.file) // Only files, not folders
				.map(async (item: any) => {
					// Get download URL
					const downloadInfo = await graphClient
						.api(`/sites/${siteId}/drives/${libraryId}/items/${item.id}`)
						.select("@microsoft.graph.downloadUrl")
						.get();

					// Try to get thumbnails in multiple sizes for images
					let thumbnails: { small?: string; medium?: string; large?: string } | undefined;
					if (item.file.mimeType?.startsWith("image/")) {
						try {
							const thumbResponse = await graphClient
								.api(`/sites/${siteId}/drives/${libraryId}/items/${item.id}/thumbnails`)
								.get();
							const thumb = thumbResponse.value?.[0];
							if (thumb) {
								thumbnails = {
									small: thumb.small?.url,
									medium: thumb.medium?.url,
									large: thumb.large?.url,
								};
							}
						} catch (e) {
							// Thumbnails not available, that's okay
						}
					}

					return {
						id: item.id,
						name: item.name,
						size: item.size,
						webUrl: item.webUrl,
						downloadUrl: downloadInfo["@microsoft.graph.downloadUrl"],
						thumbnails,
						lastModified: item.lastModifiedDateTime,
					};
				}),
		);

		// Process photos (include thumbnails for preview)
		const photos: SharePointFile[] = await Promise.all(
			photosItems.value
				.filter((item: any) => item.file) // Only files, not folders
				.map(async (item: any) => {
					// Get download URL
					const downloadInfo = await graphClient
						.api(`/sites/${siteId}/drives/${libraryId}/items/${item.id}`)
						.select("@microsoft.graph.downloadUrl")
						.get();

					// Try to get thumbnails in multiple sizes for preview
					let thumbnails: { small?: string; medium?: string; large?: string } | undefined;
					if (item.file.mimeType?.startsWith("image/")) {
						try {
							const thumbResponse = await graphClient
								.api(`/sites/${siteId}/drives/${libraryId}/items/${item.id}/thumbnails`)
								.get();
							const thumb = thumbResponse.value?.[0];
							if (thumb) {
								thumbnails = {
									small: thumb.small?.url,
									medium: thumb.medium?.url,
									large: thumb.large?.url,
								};
							}
						} catch (e) {
							// Thumbnails not available, that's okay
						}
					}

					return {
						id: item.id,
						name: item.name,
						size: item.size,
						webUrl: item.webUrl,
						downloadUrl: downloadInfo["@microsoft.graph.downloadUrl"],
						thumbnails,
						lastModified: item.lastModifiedDateTime,
					};
				}),
		);

		return NextResponse.json({
			success: true,
			logos,
			photos,
		});
	} catch (error: any) {
		console.error("Press kit API error:", error);
		return NextResponse.json(
			{
				error: "Failed to fetch press kit files",
				details: error.message,
			},
			{ status: 500 },
		);
	}
}
