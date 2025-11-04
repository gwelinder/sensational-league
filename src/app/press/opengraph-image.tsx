import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sensational League - Press Release";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					background: "#F7F7F7",
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: "80px",
				}}
			>
				{/* Logo/Spark */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: "40px",
					}}
				>
					<svg
						width="200"
						height="200"
						viewBox="0 0 100 100"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M50 10L60 45H95L67.5 65L77.5 100L50 80L22.5 100L32.5 65L5 45H40L50 10Z"
							fill="#CDFC2B"
							stroke="#000000"
							strokeWidth="3"
						/>
					</svg>
				</div>

				{/* Title */}
				<div
					style={{
						display: "flex",
						fontSize: 72,
						fontWeight: 900,
						letterSpacing: "0.05em",
						color: "#000",
						textAlign: "center",
						textTransform: "uppercase",
						marginBottom: "20px",
					}}
				>
					Sensational League
				</div>

				{/* Subtitle */}
				<div
					style={{
						display: "flex",
						fontSize: 36,
						fontWeight: 700,
						color: "#000",
						textAlign: "center",
						textTransform: "uppercase",
						letterSpacing: "0.15em",
					}}
				>
					Press Release
				</div>
			</div>
		),
		{
			...size,
		},
	);
}
