import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
};

interface Policy {
	slug: { current: string };
}

async function getFirstPolicy(): Promise<Policy | null> {
	// Live API handles perspective automatically - don't override it
	const { data } = await sanityFetch({
		query: `*[_type == "policy"] | order(order asc) [0] { slug }`,
	});
	return data as Policy | null;
}

export default async function PoliciesIndexPage() {
	const firstPolicy = await getFirstPolicy();

	if (firstPolicy?.slug?.current) {
		redirect(`/policies/${firstPolicy.slug.current}`);
	}

	// Fallback if no policies exist
	return (
		<main className="mx-auto max-w-4xl px-4 py-16">
			<h1 className="text-2xl font-bold">No policies found</h1>
			<p className="mt-4 text-zinc-600">Please add policies in the Studio.</p>
		</main>
	);
}
