import type { Metadata, Viewport } from "next";
import "./globals.css";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import SiteChrome from "@/components/SiteChrome";
import {
	OrganizationStructuredData,
	WebsiteStructuredData,
} from "@/components/StructuredData";
import { SanityLive } from "@/sanity/lib/live";
import {
	GoogleTagManager,
	GoogleTagManagerNoScript,
} from "@/components/GoogleTagManager";

// GT Standard fonts are loaded via @font-face in globals.css
// This provides better performance and brand consistency

export const metadata: Metadata = {
	metadataBase: new URL("https://sensationalleague.com"),
	title: {
		default: "Sensational League - Fast. Rebellious. Female.",
		template: "%s | Sensational League",
	},
	description:
		"Women's 7v7 football league combining athletic excellence with social impact. Play Football. Drive Impact. Change the World.",
	keywords: [
		"women's football",
		"7v7",
		"sports league",
		"social impact",
		"female athletes",
		"women's sports",
		"football league",
		"sustainable development goals",
	],
	authors: [{ name: "Sensational League" }],
	creator: "Sensational League",
	publisher: "Sensational League",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		// Prefer SVG favicon, provide ICO fallback for legacy browsers
		icon: [
			{ url: "/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon.ico", type: "image/x-icon" },
		],
		apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
		other: [
			{ url: "/icon-192.png", sizes: "192x192", type: "image/png" },
			{ url: "/icon-512.png", sizes: "512x512", type: "image/png" },
		],
	},
	manifest: "/manifest",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Sensational League",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://sensationalleague.com",
		title: "Sensational League - Fast. Rebellious. Female.",
		description:
			"Women's 7v7 football league combining athletic excellence with social impact. Play Football. Drive Impact. Change the World.",
		siteName: "Sensational League",
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Sensational League - Fast. Rebellious. Female.",
				type: "image/png",
			},
			{
				url: "/opengraph-square",
				width: 1200,
				height: 1200,
				alt: "Sensational League - Fast. Rebellious. Female.",
				type: "image/png",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Sensational League - Fast. Rebellious. Female.",
		description:
			"Women's 7v7 football league combining athletic excellence with social impact.",
		creator: "@sensationalleague",
		site: "@sensationalleague",
		images: ["/opengraph-image"],
	},
	verification: {
		// Add your verification tokens when ready
		// google: "your-google-verification-code",
		// yandex: "your-yandex-verification-code",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#D4FF00" },
		{ media: "(prefers-color-scheme: dark)", color: "#232324" },
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isEnabled = (await draftMode()).isEnabled;

	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link
					rel="alternate"
					type="application/rss+xml"
					title="Sensational League - Press Releases"
					href="/press/feed.xml"
				/>
				<OrganizationStructuredData />
				<WebsiteStructuredData />
			</head>
			<body className="min-h-dvh antialiased bg-[var(--color-surface)] text-[var(--color-text)]">
				<GoogleTagManagerNoScript />
				<SiteChrome>{children}</SiteChrome>
				<GoogleTagManager />
				<SanityLive />
				{isEnabled && (
					<>
						<VisualEditing />
						<DisableDraftMode />
					</>
				)}
			</body>
		</html>
	);
}
