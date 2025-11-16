"use client";

import Link from "next/link";
import { createDataAttribute } from "@sanity/visual-editing";
import { getImageUrl } from "@/lib/sanity-image";
import { cn } from "@/lib/utils";

interface SanityImage {
	asset?: { _ref?: string; _type?: string };
	alt?: string;
	width?: number;
	height?: number;
	objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

interface PageHeroProps {
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
	documentId: string;
	documentType: string;
}

export function PageHero({ hero, documentId, documentType }: PageHeroProps) {
	if (!hero || hero.enabled === false) {
		return null;
	}

	const heroAttribute = createDataAttribute({
		id: documentId,
		type: documentType,
		path: "hero",
	});

	const backgroundImageUrl = hero.backgroundImage
		? getImageUrl(hero.backgroundImage, 2400)
		: undefined;
	const isSplit = hero.style === "split";

	return (
		<section
			className={cn(
				"relative isolate overflow-hidden px-4 py-20",
				isSplit ? "bg-[var(--color-off-white)] text-black" : "bg-black text-white",
				hero.style === "full" && "min-h-[70vh] flex items-center",
			)}
			data-sanity={heroAttribute.toString()}
		>
			{hero.backgroundVideo ? (
				<div className="absolute inset-0">
					<video
						className="h-full w-full object-cover"
						src={hero.backgroundVideo}
						autoPlay
						muted
						playsInline
						loop
					/>
					<div className="absolute inset-0 bg-black/60" />
				</div>
			) : backgroundImageUrl ? (
				<div className="absolute inset-0">
					<img
						src={backgroundImageUrl}
						alt={hero.backgroundImage?.alt || ""}
						className="h-full w-full object-cover"
					/>
					<div className={cn("absolute inset-0", isSplit ? "bg-white/50" : "bg-black/60")} />
				</div>
			) : null}

			<div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 text-center">
				{hero.headline && (
					<h1 className="text-4xl font-black uppercase tracking-[0.2em] md:text-6xl">
						{hero.headline}
					</h1>
				)}
				{hero.subtitle && (
					<p
						className={cn(
							"brand-body mx-auto max-w-3xl text-lg",
							isSplit ? "text-black/70" : "text-white/80",
						)}
					>
						{hero.subtitle}
					</p>
				)}
				{hero.cta?.text && hero.cta?.url && (
					<Link
						href={hero.cta.url}
						className={cn(
							"mx-auto inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-black uppercase tracking-[0.3em]",
							hero.cta.style === "secondary"
								? "border border-current bg-transparent"
								: "bg-[var(--color-volt)] text-black",
						)}
					>
						{hero.cta.text}
						<span aria-hidden>→</span>
					</Link>
				)}
			</div>
		</section>
	);
}
