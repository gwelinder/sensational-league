import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { PortableTextBlock } from "@portabletext/types";
import { RenderPortableText } from "@/lib/portable-text";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";

interface Policy {
	_id: string;
	title: string;
	slug: { current: string };
	content: PortableTextBlock[];
}

interface PageProps {
	params: Promise<{ slug: string }>;
}

async function getPolicy(slug: string): Promise<Policy | null> {
	// Live API handles perspective automatically - don't override it
	const { data } = await sanityFetch({
		query: `*[_type == "policy" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      content
    }`,
		params: { slug },
	});
	return data as Policy | null;
}

export async function generateStaticParams() {
	// Use the plain client for build-time data fetching
	const policies = await client.fetch<{ slug: string }[]>(
		`*[_type == "policy"] { "slug": slug.current }`,
	);
	return policies.map((policy) => ({ slug: policy.slug }));
}

export default async function PolicyPage({ params }: PageProps) {
	const { slug } = await params;
	const policy = await getPolicy(slug);

	if (!policy) {
		notFound();
	}

	return (
		<article className="prose prose-zinc max-w-none dark:prose-invert">
			<h1 className="mb-6 text-3xl font-bold text-black dark:text-white">
				{policy.title}
			</h1>
			<RenderPortableText value={policy.content} />
		</article>
	);
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    // Avoid head changes (and full reloads) in Presentation/draft mode
    const isDraft = (await draftMode()).isEnabled;
    if (isDraft) {
        const title = "Policy";
        const description = `Read Sensational League's policy - Fast. Rebellious. Female.`;
        return {
            title,
            description,
            robots: { index: false, follow: false },
            openGraph: {
                title,
                description,
                type: "article",
                url: `https://sensationalleague.com/policies/${slug}`,
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
                title,
                description,
                images: ["/opengraph-image"],
            },
        };
    }

    const policy = await getPolicy(slug);

	const title = policy?.title ?? "Policy";
	const description = `Read Sensational League's ${policy?.title ?? "policy"} - Fast. Rebellious. Female.`;

	return {
		title,
		description,
		robots: {
			index: false,
			follow: false,
		},
		openGraph: {
			title,
			description,
			type: "article",
			url: `https://sensationalleague.com/policies/${slug}`,
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
			title,
			description,
			images: ["/opengraph-image"],
		},
	};
}
