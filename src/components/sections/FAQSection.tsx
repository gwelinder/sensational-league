"use client";

import { useMemo, useState } from "react";
import { createDataAttribute } from "@sanity/visual-editing";
import type { PortableTextBlock } from "sanity";
import { RenderPortableText } from "@/lib/portable-text";
import { cn } from "@/lib/utils";

interface FAQItem {
	_key?: string;
	question?: string;
	answer?: PortableTextBlock[];
	featured?: boolean;
	tags?: string[];
}

interface FAQCategory {
	_key?: string;
	categoryName?: string;
	description?: string;
	icon?: string;
	faqs?: FAQItem[];
}

interface FAQSectionProps {
	data: {
		_key?: string;
		sectionId?: { current?: string };
		title?: string;
		subtitle?: string;
		layout?: string;
		categories?: FAQCategory[];
		searchEnabled?: boolean;
		showContactCta?: boolean;
		contactCta?: {
			heading?: string;
			description?: string;
			buttonText?: string;
			buttonUrl?: string;
		};
	};
	documentId: string;
	documentType: string;
	path: string;
}

function stringifyAnswer(answer?: PortableTextBlock[]) {
	if (!Array.isArray(answer) || answer.length === 0) return "";
	return answer
		.map((block) => {
			const children = Array.isArray(block?.children)
				? (block.children as Array<{ text?: string }>)
				: [];
			return children
				.map((child) => (typeof child?.text === "string" ? child.text : ""))
				.join(" ");
		})
		.join(" ")
		.toLowerCase();
}

export function FAQSection({ data, documentId, documentType, path }: FAQSectionProps) {
	const [query, setQuery] = useState("");
	const sectionAttribute = createDataAttribute({
		id: documentId,
		type: documentType,
		path,
	});

	const filteredCategories = useMemo(() => {
		if (!data.categories?.length) return [];
		const normalized = query.trim().toLowerCase();
		if (!normalized) return data.categories;

		return data.categories
			.map((category) => {
				const filteredFaqs = category.faqs?.filter((faq) => {
					const questionMatch = faq.question?.toLowerCase().includes(normalized);
					const answerMatch = stringifyAnswer(faq.answer).includes(normalized);
					return questionMatch || answerMatch;
				});
				return { ...category, faqs: filteredFaqs };
			})
			.filter((category) => category.faqs && category.faqs.length > 0);
	}, [query, data.categories]);

	const categoriesToRender = query ? filteredCategories : data.categories || [];

	const hasResults = categoriesToRender.some(
		(category) => category.faqs && category.faqs.length > 0,
	);

	return (
		<section
			id={data.sectionId?.current}
			className="bg-[var(--color-off-white)] py-20"
			data-sanity={sectionAttribute.toString()}
		>
			<div className="mx-auto max-w-6xl px-4">
				<div className="mb-12 text-center">
					{data.title && (
						<h2 className="text-5xl font-black uppercase tracking-[0.2em] text-black">
							{data.title}
						</h2>
					)}
					{data.subtitle && (
						<p className="brand-body mt-4 text-lg text-black/70">
							{data.subtitle}
						</p>
					)}
					{(data.searchEnabled ?? true) && (
						<div className="mx-auto mt-8 max-w-3xl">
							<input
								type="search"
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Search the player draft FAQ"
								className="w-full rounded-full border-2 border-black px-6 py-3 text-black placeholder-black/40"
							/>
						</div>
					)}
				</div>

				{!hasResults ? (
					<p className="text-center font-semibold text-black/60">
						No questions found for “{query}”. Try another keyword.
					</p>
				) : (
					<div
						className={cn(
							"grid gap-8",
							data.layout === "two-column" ? "md:grid-cols-2" : "md:grid-cols-1",
						)}
					>
						{categoriesToRender.map((category) => (
							<div
								key={category._key || category.categoryName}
								className="rounded-3xl border-4 border-black bg-white p-6"
							>
								<div className="mb-4 flex items-center gap-3">
									<span className="text-3xl">{category.icon || "❓"}</span>
									<div>
										<h3 className="text-xl font-black uppercase tracking-[0.2em]">
											{category.categoryName}
										</h3>
										{category.description && (
											<p className="brand-body text-sm text-black/60">
												{category.description}
											</p>
										)}
									</div>
								</div>
								<div className="space-y-4">
									{category.faqs?.map((faq) => (
										<details
											key={faq._key || faq.question}
											className={cn(
												"group rounded-2xl border border-black/10 bg-black/5 p-4",
												faq.featured && "border-[var(--color-volt)] bg-white",
											)}
										>
											<summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-bold text-black">
												<span>{faq.question}</span>
												<span className="text-2xl transition-transform duration-200 group-open:rotate-45">
													+
												</span>
											</summary>
											<div className="pt-4 text-black/80">
												{faq.answer ? (
													<RenderPortableText value={faq.answer} />
												) : (
													<p className="brand-body">Answer coming soon.</p>
												)}
											</div>
										</details>
									))}
								</div>
							</div>
						))}
					</div>
				)}

				{data.showContactCta && data.contactCta && (
					<div className="mt-16 rounded-3xl border-4 border-black bg-white px-8 py-10 text-center">
						<p className="brand-caption text-sm uppercase tracking-[0.4em] text-black/60">
							{data.contactCta.heading || "Still have questions?"}
						</p>
						<p className="brand-body mt-4 text-lg text-black">
							{data.contactCta.description ||
								"Reach out to our communications team and we’ll guide you through the draft."}
						</p>
						{data.contactCta.buttonText && data.contactCta.buttonUrl && (
							<a
								href={data.contactCta.buttonUrl}
								className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-volt)] px-8 py-4 text-sm font-black uppercase tracking-[0.3em] text-black"
							>
								{data.contactCta.buttonText}
								<span aria-hidden>→</span>
							</a>
						)}
					</div>
				)}
			</div>
		</section>
	);
}
