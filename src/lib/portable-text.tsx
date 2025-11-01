import type { PortableTextComponents } from "next-sanity";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "sanity";

const components: PortableTextComponents = {
	block: {
		h2: ({ children }) => (
			<h2 className="mt-8 mb-4 text-2xl font-semibold text-black dark:text-white">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="mt-6 mb-3 text-xl font-semibold text-black dark:text-white">
				{children}
			</h3>
		),
		normal: ({ children }) => (
			<p className="mb-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
				{children}
			</p>
		),
		blockquote: ({ children }) => (
			<blockquote className="my-6 border-l-4 border-black pl-4 italic text-zinc-700 dark:border-white dark:text-zinc-300">
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="mb-4 ml-6 list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="mb-4 ml-6 list-decimal space-y-2 text-zinc-700 dark:text-zinc-300">
				{children}
			</ol>
		),
	},
	marks: {
		strong: ({ children }) => (
			<strong className="font-semibold">{children}</strong>
		),
		em: ({ children }) => <em className="italic">{children}</em>,
		link: ({ children, value }) => (
			<a
				href={value?.href}
				target="_blank"
				rel="noopener noreferrer"
				className="text-black underline hover:opacity-80 dark:text-white"
			>
				{children}
			</a>
		),
	},
};

export function RenderPortableText({ value }: { value: PortableTextBlock[] }) {
	return <PortableText value={value} components={components} />;
}
