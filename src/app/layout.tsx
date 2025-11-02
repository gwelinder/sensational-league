import type { Metadata } from "next";
import "./globals.css";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import ConditionalLayout from "@/components/ConditionalLayout";

// GT Standard fonts are loaded via @font-face in globals.css
// This provides better performance and brand consistency

export const metadata: Metadata = {
  title: "Sensational League - Fast. Rebellious. Female.",
  description: "Women's 7v7 football league combining athletic excellence with social impact.",
  keywords: ["women's football", "7v7", "sports league", "social impact", "female athletes"],
  openGraph: {
    title: "Sensational League",
    description: "Fast. Rebellious. Female. - Women's 7v7 football league combining athletic excellence with social impact.",
    type: "website",
  },
};

async function getSiteSettings() {
	const { data } = await sanityFetch({
		query: `*[_type == "siteSettings"][0] {
      _id,
      _type,
      title,
      navigation,
      footer
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
