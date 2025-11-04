import type { Metadata } from "next";
import PressReleaseContent from "./PressReleaseContent";

export const metadata: Metadata = {
	title: "Pressemeddelelse - Sensational League | Millioninvestering fra Moonbug-stifter",
	description: "Sensational League lancerer i april 2026 med København som første værtsby. Professionel 7v7 kvindefodboldliga med investering fra René Rechtman (Moonbug). Skabt af Bettina Kuperman og Majken Gilmartin.",
	keywords: [
		"kvindefodbold",
		"women's football",
		"Sensational League",
		"Moonbug",
		"René Rechtman",
		"Bettina Kuperman",
		"Majken Gilmartin",
		"Saga Sports Group",
		"7v7 fodbold",
		"København",
		"sports innovation"
	],
	openGraph: {
		title: "Dansk-skabt International Kvindefodboldliga får Millioninvestering",
		description: "Sensational League lancerer april 2026. Professionel 7v7 kvindefodboldliga med investering fra Moonbug-stifter René Rechtman.",
		type: "article",
		publishedTime: "2025-11-04T00:00:00Z",
		authors: ["Saga Sports Group"],
		url: "https://sensationalleague.com/press",
		siteName: "Sensational League",
	},
	twitter: {
		card: "summary_large_image",
		title: "Dansk-skabt Kvindefodboldliga får Millioninvestering fra Moonbug-stifter",
		description: "Sensational League lancerer april 2026 med København som første værtsby. Investering fra René Rechtman.",
		site: "@SensationalLG",
	},
	alternates: {
		canonical: "https://sensationalleague.com/press",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function PressReleasePage() {
	return (
		<main className="min-h-screen bg-[var(--color-off-white)] py-8 print:py-0 print:bg-white">
			<article className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 bg-white border-4 border-black print:border-0 print:px-0 print:py-0 print:max-w-full">
				<PressReleaseContent />
			</article>
		</main>
	);
}
