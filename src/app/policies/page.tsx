import { redirect } from "next/navigation";
import { draftMode } from "next/headers";
import { sanityFetch } from "@/sanity/lib/live";

interface Policy {
	slug: { current: string };
}

async function getFirstPolicy(): Promise<Policy | null> {
	const isDraftMode = (await draftMode()).isEnabled;

	const { data } = await sanityFetch({
		query: `*[_type == "policy"] | order(order asc) [0] { slug }`,
		perspective: isDraftMode ? 'previewDrafts' : 'published',
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
