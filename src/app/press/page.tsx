import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "sanity";
import { sanityFetch } from "@/sanity/lib/live";
import PressReleaseContent from "./PressReleaseContent";
import { OrganizationSchema, PressReleaseSchema } from "./schema-markup";

interface PressRelease {
	_id: string;
	_type: string;
	title: string;
	slug: { current: string };
	publishDate: string;
	featuredImageFromSharePoint?: string;
	ogImageUrl?: string;
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
			featuredImageFromSharePoint,
			ogImageUrl,
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
			title: "Press Release - Sensational League",
			description: "Latest press releases from Sensational League",
			openGraph: {
				title: "Press Release - Sensational League",
				description: "Latest press releases from Sensational League",
				type: "website",
				url: "https://sensationalleague.com/press",
				siteName: "Sensational League",
				locale: "en_US",
				images: [
					{
						url: "https://sensationalleague.com/Bettina,%20Majken%20og%20Rene%20Large.jpeg",
						width: 1200,
						height: 630,
						alt: "Sensational League - Press Release",
					},
				],
			},
			twitter: {
				card: "summary_large_image",
				title: "Press Release - Sensational League",
				description: "Latest press releases from Sensational League",
				images: [{
					url: "https://sensationalleague.com/Bettina,%20Majken%20og%20Rene%20Large.jpeg",
					alt: "Sensational League - Press Release",
				}],
			},
		};
	}

	// Always use English for social media sharing (OG tags), fallback to Danish only if English not available
	const title =
		pressRelease.seo?.metaTitle ||
		(pressRelease.headlineEn
			? `${pressRelease.headlineEn} - Sensational League`
			: `${pressRelease.headlineDa} - Sensational League`);
	const description =
		pressRelease.seo?.metaDescription ||
		pressRelease.subheadlineEn ||
		pressRelease.headlineEn ||
		pressRelease.subheadlineDa ||
		pressRelease.headlineDa;

	// For social sharing, prioritize English
	const ogTitle = pressRelease.headlineEn || pressRelease.headlineDa;
	const ogDescription =
		pressRelease.subheadlineEn ||
		pressRelease.subheadlineDa ||
		pressRelease.headlineEn ||
		pressRelease.headlineDa;

	// Twitter title (max 70 characters) - shortened version
	const twitterTitle = pressRelease.headlineEn
		? pressRelease.headlineEn.length > 70
			? "Sensational League Launches: Women's Football Meets Entertainment"
			: pressRelease.headlineEn
		: pressRelease.headlineDa;

	return {
		title,
		description,
		keywords: pressRelease.seo?.keywords || [
			"women's football",
			"Sensational League",
			"sports innovation",
			"kvindefodbold",
		],
		openGraph: {
			title: ogTitle,
			description: ogDescription,
			type: "article",
			publishedTime: pressRelease.publishDate,
			authors: ["Saga Sports Group"],
			url: "https://sensationalleague.com/press",
			siteName: "Sensational League",
			locale: "en_US",
			images: [
				{
					url: "https://sensationalleague.com/Bettina,%20Majken%20og%20Rene%20Large.jpeg",
					width: 1200,
					height: 630,
					alt: "Sensational League - Press Release",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: twitterTitle,
			description: ogDescription,
			site: "@SensationalLG",
			creator: "@SensationalLG",
			images: [
				{
					url: "https://sensationalleague.com/Bettina,%20Majken%20og%20Rene%20Large.jpeg",
					alt: "Sensational League - Press Release",
				},
			],
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
				"max-image-preview": "large",
				"max-snippet": -1,
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
		<>
			{/* Structured Data for Google */}
			<PressReleaseSchema
				headline={pressRelease.headlineDa}
				subheadline={pressRelease.subheadlineDa}
				publishDate={pressRelease.publishDate}
			/>
			<OrganizationSchema />

			<main className="min-h-screen bg-[var(--color-off-white)] py-8 print:py-0 print:bg-white">
				<article className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 bg-white border-4 border-black print:border-0 print:px-0 print:py-0 print:max-w-full">
					<PressReleaseContent content={pressRelease} />
				</article>
			</main>
		</>
	);
}
