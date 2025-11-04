import { ImageResponse } from "next/og";
import fs from "fs/promises";
import path from "path";

export const runtime = "edge";
export const alt = "Sensational League - Press Release";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image() {
	// Load the logo image
	const logoPath = path.join(process.cwd(), "public/SENSATIONAL-LEAGUE-PRIMARY-MARK-WHITE.png");
	const logoBuffer = await fs.readFile(logoPath);
	const logoBase64 = logoBuffer.toString("base64");
	const logoSrc = `data:image/png;base64,${logoBase64}`;

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
						src={logoSrc}
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
