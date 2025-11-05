import { ImageResponse } from "next/og";
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const runtime = "edge";
export const alt = "Sensational League - Press Release";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image() {
	// Fetch press release to get OpenGraph image URL or Sanity image
	const client = createClient({
		projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
		dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
		apiVersion: "2025-10-31",
		useCdn: true,
	});

	let featuredImageUrl: string | null = null;
	try {
		const pressRelease = await client.fetch<{
			ogImageUrl?: string;
			featuredImage?: any;
		}>(
			`*[_type == "pressRelease"] | order(publishDate desc)[0] {
				ogImageUrl,
				featuredImage
			}`
		);

		// Priority 1: Use explicit ogImageUrl if provided
		if (pressRelease?.ogImageUrl) {
			featuredImageUrl = pressRelease.ogImageUrl;
		}
		// Priority 2: Generate URL from Sanity-hosted featuredImage
		else if (pressRelease?.featuredImage?.asset) {
			const builder = imageUrlBuilder(client);
			featuredImageUrl = builder
				.image(pressRelease.featuredImage)
				.width(1200)
				.height(630)
				.fit('crop')
				.quality(85)
				.format('jpg')
				.url();
		}
	} catch (error) {
		console.error("Error fetching press release:", error);
	}

	// Use absolute URL for the logo in edge runtime
	const logoUrl = new URL("/SENSATIONAL-LEAGUE-PRIMARY-MARK-WHITE.png", "https://sensationalleague.com").href;

	// If featured image exists, use it as background
	if (featuredImageUrl) {
		return new ImageResponse(
			(
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						position: "relative",
					}}
				>
					{/* Featured Image as background */}
					<img
						src={featuredImageUrl}
						alt="Press Release Featured"
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
					{/* Dark overlay for text readability */}
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							background: "linear-gradient(to bottom, rgba(35, 35, 36, 0.3) 0%, rgba(35, 35, 36, 0.8) 100%)",
						}}
					/>
					{/* Logo in corner */}
					<div
						style={{
							position: "absolute",
							bottom: "40px",
							right: "40px",
							display: "flex",
						}}
					>
						<img
							src={logoUrl}
							alt="Sensational League"
							width="120"
							height="120"
							style={{
								objectFit: "contain",
							}}
						/>
					</div>
				</div>
			),
			{
				...size,
			},
		);
	}

	// Fallback to default design
	return new ImageResponse(
		(
			<div
				style={{
					background: "#232324",
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: "80px",
					position: "relative",
				}}
			>
				{/* Background subtle gradient */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: "radial-gradient(circle at center, rgba(212, 255, 0, 0.1) 0%, rgba(35, 35, 36, 1) 70%)",
					}}
				/>

				{/* Logo */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: "60px",
						position: "relative",
						zIndex: 1,
					}}
				>
					<img
						src={logoUrl}
						alt="Sensational League"
						width="300"
						height="300"
						style={{
							objectFit: "contain",
						}}
					/>
				</div>

				{/* Title */}
				<div
					style={{
						display: "flex",
						fontSize: 64,
						fontWeight: 900,
						letterSpacing: "0.1em",
						color: "#D4FF00",
						textAlign: "center",
						textTransform: "uppercase",
						marginBottom: "20px",
						position: "relative",
						zIndex: 1,
					}}
				>
					Press Release
				</div>

				{/* Tagline */}
				<div
					style={{
						display: "flex",
						fontSize: 36,
						fontWeight: 700,
						color: "#F7F7F7",
						textAlign: "center",
						letterSpacing: "0.05em",
						position: "relative",
						zIndex: 1,
					}}
				>
					Fast. Rebellious. Female.
				</div>
			</div>
		),
		{
			...size,
		},
	);
}
