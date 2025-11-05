import { ImageResponse } from "next/og";
import { createClient } from "next-sanity";

export const runtime = "edge";
export const alt = "Sensational League - Press Release";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image() {
	// Fetch press release to get featured image
	const client = createClient({
		projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
		dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
		apiVersion: "2025-10-31",
		useCdn: true,
	});

	let featuredImageName: string | null = null;
	try {
		const pressRelease = await client.fetch<{ featuredImageFromSharePoint?: string }>(
			`*[_type == "pressRelease"] | order(publishDate desc)[0] { featuredImageFromSharePoint }`
		);
		featuredImageName = pressRelease?.featuredImageFromSharePoint || null;
	} catch (error) {
		console.error("Error fetching press release:", error);
	}

	// If featured image exists, try to fetch from SharePoint
	let featuredImageUrl: string | null = null;
	if (featuredImageName) {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://sensationalleague.com'}/api/press-kit`);
			const data = await response.json();
			if (data.success && data.photos) {
				const photo = data.photos.find((p: any) => p.name === featuredImageName);
				if (photo) {
					featuredImageUrl = photo.thumbnails?.large || photo.downloadUrl;
				}
			}
		} catch (error) {
			console.error("Error fetching featured image:", error);
		}
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
