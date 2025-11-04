import type { Metadata } from "next";
import "./globals.css";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import ConditionalLayout from "@/components/ConditionalLayout";
import { OrganizationStructuredData, WebsiteStructuredData } from "@/components/StructuredData";

// GT Standard fonts are loaded via @font-face in globals.css
// This provides better performance and brand consistency

export const metadata: Metadata = {
  metadataBase: new URL('https://sensationalleague.com'),
  title: {
    default: "Sensational League - Fast. Rebellious. Female.",
    template: "%s | Sensational League"
  },
  description: "Women's 7v7 football league combining athletic excellence with social impact. Play Football. Drive Impact. Change the World.",
  keywords: ["women's football", "7v7", "sports league", "social impact", "female athletes", "women's sports", "football league", "sustainable development goals"],
  authors: [{ name: "Sensational League" }],
  creator: "Sensational League",
  publisher: "Sensational League",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sensationalleague.com",
    title: "Sensational League - Fast. Rebellious. Female.",
    description: "Women's 7v7 football league combining athletic excellence with social impact. Play Football. Drive Impact. Change the World.",
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
    description: "Women's 7v7 football league combining athletic excellence with social impact.",
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

async function getSiteSettings() {
	// Live API handles perspective automatically - don't override it
	const { data } = await sanityFetch({
		query: `*[_type == "siteSettings"][0] {
      _id,
      _type,
      title,
      navigation {
        sparkLogo {
          asset,
          alt,
          width,
          height,
          objectFit
        },
        wordmarkLogo {
          asset,
          alt,
          width,
          height,
          objectFit
        },
        links
      },
      footer {
        sparkLogo {
          asset,
          alt,
          width,
          height,
          objectFit
        },
        wordmarkLogo {
          asset,
          alt,
          width,
          height,
          objectFit
        },
        tagline,
        description,
        copyrightText,
        additionalText
      }
    }`,
	});
	return data;
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isEnabled = (await draftMode()).isEnabled;
	const settings = await getSiteSettings();

	return (
		<html lang="en">
			<head>
				<OrganizationStructuredData />
				<WebsiteStructuredData />
			</head>
			<body className="min-h-dvh antialiased bg-[var(--color-surface)] text-[var(--color-text)]">
				<ConditionalLayout settings={settings}>{children}</ConditionalLayout>
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
