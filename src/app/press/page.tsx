import type { Metadata } from "next";
import type { PortableTextBlock } from "sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import PressReleaseContent from "./PressReleaseContent";

interface PressRelease {
	_id: string;
	_type: string;
	title: string;
	slug: { current: string };
	publishDate: string;
	// Danish fields
	headlineDa: string;
	subheadlineDa?: string;
	contentDa: PortableTextBlock[];
	aboutSectionsDa?: Array<{
		title: string;
		content: string;
	}>;
	// English fields
	headlineEn?: string;
	subheadlineEn?: string;
	contentEn?: PortableTextBlock[];
	aboutSectionsEn?: Array<{
		title: string;
		content: string;
	}>;
	// Shared fields
	contactPerson?: {
		name?: string;
		title?: string;
		phone?: string;
		email?: string;
	};
	seo?: {
		metaTitle?: string;
		metaDescription?: string;
		keywords?: string[];
	};
}

async function getPressRelease(): Promise<PressRelease | null> {
	const { data } = await sanityFetch({
		query: `*[_type == "pressRelease"] | order(publishDate desc)[0] {
			_id,
			_type,
			title,
			slug,
			publishDate,
			headlineDa,
			subheadlineDa,
			contentDa,
			aboutSectionsDa,
			headlineEn,
			subheadlineEn,
			contentEn,
			aboutSectionsEn,
			contactPerson,
			seo
		}`,
	});
	return data as PressRelease | null;
}

export async function generateMetadata(): Promise<Metadata> {
	const pressRelease = await getPressRelease();

	if (!pressRelease) {
		return {
			title: "Press - Sensational League",
			description: "Latest press releases from Sensational League",
		};
	}

	const title = pressRelease.seo?.metaTitle || `${pressRelease.headlineDa} - Sensational League`;
	const description = pressRelease.seo?.metaDescription || pressRelease.subheadlineDa || pressRelease.headlineDa;

	return {
		title,
		description,
		keywords: pressRelease.seo?.keywords || [
			"kvindefodbold",
			"women's football",
			"Sensational League",
			"sports innovation"
		],
		openGraph: {
			title: pressRelease.headlineDa,
			description: description,
			type: "article",
			publishedTime: pressRelease.publishDate,
			authors: ["Saga Sports Group"],
			url: "https://sensationalleague.com/press",
			siteName: "Sensational League",
			images: [
				{
					url: "/opengraph-image",
					width: 1200,
					height: 630,
					alt: "Sensational League - Fast. Rebellious. Female.",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: pressRelease.headlineDa,
			description: description,
			site: "@SensationalLG",
			creator: "@SensationalLG",
			images: ["/opengraph-image"],
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
}

export const revalidate = 3600; // Cache for 1 hour

export default async function PressReleasePage() {
	const pressRelease = await getPressRelease();

	if (!pressRelease) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-[var(--color-off-white)] py-8 print:py-0 print:bg-white">
			<article className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 bg-white border-4 border-black print:border-0 print:px-0 print:py-0 print:max-w-full">
				<PressReleaseContent content={pressRelease} />
			</article>
		</main>
	);
}
