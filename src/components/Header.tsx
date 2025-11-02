'use client';

import Link from "next/link";
import { SKIP_TO_CONTENT_ID } from "@/constants/accessibility";
import { cn } from "@/lib/utils";
import { createDataAttribute, useOptimistic } from "@sanity/visual-editing";
import type { SanityDocument } from '@sanity/client';

interface HeaderProps {
	settings?: {
		_id: string;
		_type: string;
		navigation?: {
			links?: Array<{
				label: string;
				href: string;
			}>;
		};
	};
}

export default function Header({ settings: initialSettings }: HeaderProps) {
	// Use optimistic updates to prevent page reloads on every edit
	const settings = useOptimistic<HeaderProps['settings'], SanityDocument>(
		initialSettings,
		(currentSettings, action) => {
			// Only update if this is the same document
			if (!currentSettings || action.id !== currentSettings._id) {
				return currentSettings;
			}

			// Return the updated document data
			return {
				...currentSettings,
				...action.document,
			} as HeaderProps['settings'];
		}
	);

	const defaultLinks = [
		{ href: "/policies", label: "Policies" },
		{ href: "/dashboard", label: "Dashboard" },
		{ href: "/#about", label: "About" }
	];

	const links = settings?.navigation?.links?.length
		? settings.navigation.links
		: defaultLinks;

	const navAttribute = settings?._id ? createDataAttribute({
		id: settings._id,
		type: settings._type,
		path: 'navigation',
	}) : undefined;

	return (
		<header className="brand-bg">
			<a
				href={`#${SKIP_TO_CONTENT_ID}`}
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded bg-[var(--color-volt)] px-3 py-1.5 text-black brand-fast focus:brand-rebellious"
			>
				Skip to Content
			</a>
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
				<Link
					href="/"
					aria-label="Sensational League home"
					className={cn(
						"flex items-center gap-4",
						"focus:outline-none focus:ring-2 focus:ring-[var(--color-volt)] focus:ring-offset-2 focus:ring-offset-black rounded"
					)}
				>
					<img
						src="/logos/SL-SPARK-LARGE.svg"
						alt="Sensational League"
						className="w-10 h-10"
					/>
					<div className="hidden sm:block">
						<img
							src="/logos/SL-WORDMARK-LEFT ALIGNED.svg"
							alt="Sensational League"
							className="h-6"
							style={{ filter: 'brightness(0) invert(1)' }}
						/>
					</div>
				</Link>

				<nav
					aria-label="Primary"
					className="hidden gap-6 md:flex"
					data-sanity={navAttribute?.toString()}
				>
					{links.map(({ href, label }, index) => {
						const linkAttribute = settings?._id ? createDataAttribute({
							id: settings._id,
							type: settings._type,
							path: `navigation.links[${index}].label`,
						}) : undefined;

						return (
							<Link
								key={href}
								href={href}
								data-sanity={linkAttribute?.toString()}
								className={cn(
									"brand-body text-[var(--color-off-white)] text-sm",
									"hover:text-[var(--color-volt)]",
									"focus:outline-none focus:text-[var(--color-volt)]",
									"transition-colors duration-200"
								)}
							>
								{label}
							</Link>
						);
					})}
				</nav>

				<div className="flex items-center gap-4">
					{/* Studio Link */}
					<Link
						href="/studio"
						className={cn(
							"brand-caption text-[var(--color-gray-medium)]",
							"hover:text-[var(--color-volt)] underline",
							"brand-fast transition-colors"
						)}
					>
						Studio
					</Link>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div className="md:hidden px-4 pb-3">
				<nav className="flex flex-wrap gap-4" aria-label="Mobile Navigation">
					{links.slice(0, 4).map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className={cn(
								"brand-caption text-[var(--color-off-white)]",
								"hover:text-[var(--color-volt)] brand-fast",
								"focus:outline-none focus:text-[var(--color-volt)]",
								"transition-colors duration-200"
							)}
						>
							{label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}
