import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { client as publishedClient } from "@/sanity/lib/client";
import { SectionsRenderer } from "@/components/SectionsRenderer";
import { PageHero } from "@/components/PageHero";

interface SanityImage {
	asset?: { _ref?: string; _type?: string };
	alt?: string;
	width?: number;
	height?: number;
	objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export interface PageSection {
	_key: string;
	_type: string;
	[key: string]: unknown;
}

export interface PageDocument {
	_id: string;
	_type: string;
	title?: string;
	slug?: { current?: string };
	seo?: {
		metaTitle?: string;
		metaDescription?: string;
		ogImage?: {
			asset?: { _ref?: string };
		};
	};
	hero?: {
		enabled?: boolean;
		style?: string;
		headline?: string;
		subtitle?: string;
		backgroundImage?: SanityImage;
		backgroundVideo?: string;
		cta?: {
			text?: string;
			url?: string;
			style?: string;
		};
	};
	sections?: PageSection[];
}

const RESERVED_SLUGS = new Set([
	"policies",
	"press",
	"privacy",
	"dashboard",
	"studio",
	"api",
]);

export const revalidate = 3600;

export async function getPageBySlug(slug: string): Promise<PageDocument | null> {
	const { data } = await sanityFetch({
		query: `*[_type == "page" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      seo,
      hero,
      sections[] {
        ...,
        content[] {
          ...,
          image {
            asset,
            alt,
            crop,
            hotspot
          },
          thumbnail {
            asset,
            alt,
            crop,
            hotspot
          }
        },
        categories[] {
          ...,
          faqs[] {
            ...,
            answer[]
          }
        }
      }
    }`,
		params: { slug },
	});

	return (data as PageDocument | null) ?? null;
}

export async function generateStaticParams() {
	const data = await publishedClient
		.withConfig({ stega: { enabled: false } })
		.fetch<{ slug?: { current?: string } }[]>(
			`*[_type == "page" && defined(slug.current)]{ slug }`,
		);

	return (
		data?.flatMap((doc) =>
			doc?.slug?.current && !RESERVED_SLUGS.has(doc.slug.current)
				? [{ slug: doc.slug.current }]
				: [],
		) || []
	);
}


type SlugParams = { slug: string };

export async function generateMetadata({
	params,
}: {
	params: Promise<SlugParams> | SlugParams;
}): Promise<Metadata> {
	const resolvedParams = await params;
	if (!resolvedParams.slug || RESERVED_SLUGS.has(resolvedParams.slug)) {
		return {};
	}

	const page = await getPageBySlug(resolvedParams.slug);
	if (!page) {
		return {};
	}

	return {
		title: page.seo?.metaTitle || page.title,
		description: page.seo?.metaDescription,
		openGraph: {
			title: page.seo?.metaTitle || page.title || undefined,
			description: page.seo?.metaDescription,
		},
	};
}

export default async function MarketingPage({
	params,
}: {
	params: Promise<SlugParams> | SlugParams;
}) {
	const resolvedParams = await params;
	const slug = resolvedParams.slug;
	if (!slug || RESERVED_SLUGS.has(slug)) {
		notFound();
	}

	const page = await getPageBySlug(slug);
	if (!page?._id) {
		notFound();
	}

	return (
		<article className="bg-white">
			<PageHero hero={page.hero} documentId={page._id} documentType={page._type} />
			{page.sections && page.sections.length > 0 ? (
				<SectionsRenderer
					documentId={page._id}
					documentType={page._type}
					sections={page.sections}
				/>
			) : (
				<div className="mx-auto max-w-4xl px-4 py-24 text-center">
					<h1 className="text-5xl font-black uppercase tracking-[0.2em]">
						{page.title || "Page"}
					</h1>
					<p className="brand-body mt-4 text-lg text-black/70">
						Content coming soon.
					</p>
				</div>
			)}
		</article>
	);
}
