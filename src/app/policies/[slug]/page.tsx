import { notFound } from "next/navigation";
import type { PortableTextBlock } from "sanity";
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
	const policy = await getPolicy(slug);

	return {
		title: policy?.title ?? "Policy",
		description: `Read our ${policy?.title ?? "policy"}`,
	};
}
