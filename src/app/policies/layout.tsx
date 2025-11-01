import Link from "next/link";
import type { ReactNode } from "react";
import { sanityFetch } from "@/sanity/lib/live";

interface Policy {
	_id: string;
	title: string;
	slug: { current: string };
}

async function getPolicies(): Promise<Policy[]> {
	const { data } = await sanityFetch({
		query: `*[_type == "policy"] | order(order asc) {
      _id,
      title,
      slug
    }`,
	});
	return (data ?? []) as Policy[];
}

export default async function PoliciesLayout({
	children,
}: {
	children: ReactNode;
}) {
	const policies = await getPolicies();

	return (
		<div className="mx-auto flex max-w-7xl gap-8 px-4 py-8">
			{/* Left Sidebar */}
			<aside className="w-64 shrink-0">
				<div className="sticky top-8">
					<h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
						Policies & Guidelines
					</h2>
					<nav aria-label="Policy navigation">
						<ul className="space-y-1">
							{policies.map((policy) => (
								<li key={policy._id}>
									<Link
										href={`/policies/${policy.slug.current}`}
										className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
									>
										{policy.title}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className="mt-8 border-t border-zinc-200 pt-4 dark:border-zinc-700">
						<Link
							href="/studio"
							className="block rounded-md px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
						>
							← Edit in Studio
						</Link>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<main className="min-w-0 flex-1 pb-16">{children}</main>
		</div>
	);
}
