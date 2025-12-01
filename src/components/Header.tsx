'use client';

import Link from "next/link";
import Image from "next/image";
import { SKIP_TO_CONTENT_ID } from "@/constants/accessibility";
import { cn } from "@/lib/utils";
import { createDataAttribute } from "@sanity/visual-editing";
import { getImageProps } from "@/lib/sanity-image";

interface SanityImage {
	asset?: {
		_ref?: string;
		_type?: string;
	};
	alt?: string;
	width?: number;
	height?: number;
	objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}


interface HeaderProps {
	settings?: {
		_id: string;
		_type: string;
		navigation?: {
			sparkLogo?: SanityImage;
			wordmarkLogo?: SanityImage;
			links?: Array<{
				label: string;
				href: string;
			}>;
		};
	};
}


export default function Header({ settings }: HeaderProps) {
	const defaultLinks = [
		{ href: "/#about", label: "About" },
		{ href: "/player-draft", label: "Draft" },
		{ href: "/captains", label: "Captains" },
		// { href: "/teams", label: "Teams" },  // Hidden until launch
		// { href: "/impact", label: "Impact" }, // Hidden until launch
		{ href: "/press", label: "News" },
	];

	const links = settings?.navigation?.links?.length
		? settings.navigation.links
		: defaultLinks;

	const navAttribute = settings?._id ? createDataAttribute({
		id: settings._id,
		type: settings._type,
		path: 'navigation',
	}) : undefined;

	const sparkLogoProps = settings?.navigation?.sparkLogo
		? getImageProps(settings.navigation.sparkLogo, 200)
		: null;

	const wordmarkLogoProps = settings?.navigation?.wordmarkLogo
		? getImageProps(settings.navigation.wordmarkLogo, 400)
		: null;

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
				{sparkLogoProps ? (
					<Image
						src={sparkLogoProps.src}
						alt={sparkLogoProps.alt || "Sensational League"}
						style={sparkLogoProps.style}
						className={cn(
							!settings?.navigation?.sparkLogo?.width &&
							!settings?.navigation?.sparkLogo?.height &&
							"w-10 h-10"
						)}
					/>
				) : (
					<Image
						src="/logos/SL-SPARK-LARGE.svg"
						alt="Sensational League"
						width={40}
						height={40}
						className="w-10 h-10"
						style={{ filter: "brightness(0) invert(1)" }}
					/>
				)}
					<div className="hidden sm:block">
					{wordmarkLogoProps ? (
						<Image
							src={wordmarkLogoProps.src}
							alt={wordmarkLogoProps.alt || "Sensational League"}
							style={{ ...wordmarkLogoProps.style, filter: "brightness(0) invert(1)" }}
							className={cn(
								!settings?.navigation?.wordmarkLogo?.width &&
								!settings?.navigation?.wordmarkLogo?.height &&
								"h-6"
							)}
						/>
					) : (
						<Image
							src="/logos/SL-WORDMARK-LEFT ALIGNED.svg"
							alt="Sensational League"
							width={150}
							height={24}
							className="h-6"
							style={{ filter: "brightness(0) invert(1)" }}
						/>
					)}
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
					{links.slice(0, 5).map(({ href, label }) => (
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
