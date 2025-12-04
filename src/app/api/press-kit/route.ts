import { type NextRequest, NextResponse } from "next/server";
import { getGraphClient } from "@/lib/sharepoint/graphClient";

// Next.js 16 caching - revalidate every hour
export const revalidate = 3600; // 1 hour
export const dynamic = 'force-static';

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

interface SharePointItem {
	id: string;
	name: string;
	size: number;
	webUrl: string;
	lastModifiedDateTime: string;
	file?: {
		mimeType?: string;
	};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
	try {
		// Use the specific Site ID for SagaSportsGroup2 where the press kit assets are hosted
		const siteId = "sagasportsgroup.sharepoint.com,8b875f1c-1f08-4b8a-b37d-3a27340cf260,5a74c6ee-da1e-4651-9c09-3fa9e67d327b";
		const libraryId = process.env.SHAREPOINT_MEDIA_LIBRARY_ID;

		if (!siteId || !libraryId) {
			return NextResponse.json(
				{ error: "SharePoint configuration missing" },
				{ status: 500 },
			);
		}

		const graphClient = getGraphClient();
		let logosItems = { value: [] };
		let photosItems = { value: [] };

		// Get Logos
		try {
			const logosFolder = await graphClient
				.api(`/sites/${siteId}/drives/${libraryId}/root:/BRAND%20%26%20MARKETING/LOGOS`)
				.get();
			logosItems = await graphClient
				.api(`/sites/${siteId}/drives/${libraryId}/items/${logosFolder.id}/children`)
				.get();
		} catch (e) {
			console.warn("Logos folder not found", e);
		}

		// Get Photos
		try {
			const photosFolder = await graphClient
				.api(`/sites/${siteId}/drives/${libraryId}/root:/BRAND%20%26%20MARKETING/PHOTOS`)
				.get();
			photosItems = await graphClient
				.api(`/sites/${siteId}/drives/${libraryId}/items/${photosFolder.id}/children`)
				.get();
		} catch (e) {
			console.warn("Photos folder not found", e);
		}

		// Process logos (include thumbnails for display)
		const logos: SharePointFile[] = await Promise.all(
			(logosItems.value || [])
				.filter((item: SharePointItem) => item.file) // Only files, not folders
				.map(async (item: SharePointItem) => {
					// Get download URL
					const downloadInfo = await graphClient
						.api(`/sites/${siteId}/drives/${libraryId}/items/${item.id}`)
						.select("@microsoft.graph.downloadUrl")
						.get();

					// Try to get thumbnails in multiple sizes for images
					let thumbnails: { small?: string; medium?: string; large?: string } | undefined;
					if (item.file?.mimeType?.startsWith("image/")) {
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
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						} catch (_e) {
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
			(photosItems.value || [])
				.filter((item: SharePointItem) => item.file) // Only files, not folders
				.map(async (item: SharePointItem) => {
					// Get download URL
					const downloadInfo = await graphClient
						.api(`/sites/${siteId}/drives/${libraryId}/items/${item.id}`)
						.select("@microsoft.graph.downloadUrl")
						.get();

					// Try to get thumbnails in multiple sizes for preview
					let thumbnails: { small?: string; medium?: string; large?: string } | undefined;
					if (item.file?.mimeType?.startsWith("image/")) {
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
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						} catch (_e) {
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
	} catch (error) {
		console.error("Press kit API error:", error);
		return NextResponse.json(
			{
				error: "Failed to fetch press kit files",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
