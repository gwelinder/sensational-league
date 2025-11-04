"use client";

import { createDataAttribute } from "@sanity/visual-editing";
import Link from "next/link";
import { getImageProps, getImageUrl } from "@/lib/sanity-image";
import { cn } from "@/lib/utils";

interface SanityImage {
	asset?: {
		_ref?: string;
		_type?: string;
	};
	alt?: string;
	width?: number;
	height?: number;
	objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

interface FooterProps {
	settings?: {
		_id: string;
		_type: string;
		footer?: {
			sparkLogo?: SanityImage;
			wordmarkLogo?: SanityImage;
			tagline?: string;
			description?: string;
			copyrightText?: string;
			additionalText?: string;
		};
	};
}

export default function Footer({ settings }: FooterProps) {
	const footerAttribute = settings?._id
		? createDataAttribute({
				id: settings._id,
				type: settings._type,
				path: "footer",
			})
		: undefined;

	const taglineAttribute = settings?._id
		? createDataAttribute({
				id: settings._id,
				type: settings._type,
				path: "footer.tagline",
			})
		: undefined;

	const descriptionAttribute = settings?._id
		? createDataAttribute({
				id: settings._id,
				type: settings._type,
				path: "footer.description",
			})
		: undefined;

	const copyrightAttribute = settings?._id
		? createDataAttribute({
				id: settings._id,
				type: settings._type,
				path: "footer.copyrightText",
			})
		: undefined;

	const additionalAttribute = settings?._id
		? createDataAttribute({
				id: settings._id,
				type: settings._type,
				path: "footer.additionalText",
			})
		: undefined;

	return (
		<footer
			className="bg-[#232324] "
			data-sanity={footerAttribute?.toString()}
		>
			<div className="mx-auto max-w-7xl px-6 py-20">
				{/* Brand Section */}
				<div className="mb-20">
					<div className="flex items-center gap-6 mb-10">
						{settings?.footer?.sparkLogo &&
						getImageUrl(settings.footer.sparkLogo) ? (
							<img
								{...getImageProps(settings.footer.sparkLogo, 400)}
								alt={settings.footer.sparkLogo.alt || ""}
								className={cn(
									!settings.footer.sparkLogo.width &&
										!settings.footer.sparkLogo.height &&
										"w-20 h-20",
								)}
							/>
						) : (
							<img
								src="/SENSATIONAL-LEAGUE-PRIMARY-MARK-WHITE.png"
								alt=""
								className="w-20 h-20"
							/>
						)}
						{settings?.footer?.wordmarkLogo &&
						getImageUrl(settings.footer.wordmarkLogo) ? (
							<img
								{...getImageProps(settings.footer.wordmarkLogo, 600)}
								alt={settings.footer.wordmarkLogo.alt || "Sensational League"}
								className={cn(
									!settings.footer.wordmarkLogo.width &&
										!settings.footer.wordmarkLogo.height &&
										"h-10",
								)}
							/>
						) : (
							<img
								src="/SL-WORDMARK-LEFT ALIGNED-WHITE.png"
								alt="Sensational League"
								className="h-10"
							/>
						)}
					</div>
					<p
						className="brand-body text-xl md:text-2xl text-white max-w-3xl font-medium leading-relaxed"
						data-sanity={descriptionAttribute?.toString()}
					>
						{settings?.footer?.description || ""}
					</p>
				</div>

				{/* Bottom Row */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
					<p
						className="brand-caption text-sm text-white uppercase tracking-wider font-bold"
						data-sanity={copyrightAttribute?.toString()}
					>
						{settings?.footer?.copyrightText ||
							`© ${new Date().getFullYear()} Sensational League`}
					</p>

					<div className="flex items-center justify-center gap-4">
						<Link
							href="/privacy"
							className={cn(
								"brand-caption text-sm text-white uppercase tracking-wider font-bold",
								"hover:text-[var(--color-volt)] transition-colors",
							)}
						>
							Privacy Policy
						</Link>
						<span className="text-white">|</span>
						<Link
							href="/press"
							className={cn(
								"brand-caption text-md text-white uppercase tracking-wider font-bold",
								"hover:text-[var(--color-volt)] transition-colors",
							)}
						>
							Press release
						</Link>
					</div>

					<p
						className="brand-caption text-sm text-white uppercase tracking-wider md:text-right font-bold"
						data-sanity={additionalAttribute?.toString()}
					>
						{settings?.footer?.additionalText || "Built for women's football"}
					</p>
				</div>

				{/* Slogan - At Bottom */}

		{/* 				<div className="text-center pt-8 border-t-2 border-[var(--color-volt)]">			<p
						className="brand-headline text-2xl md:text-3xl font-black uppercase tracking-wide text-[var(--color-volt)]"
						data-sanity={taglineAttribute?.toString()}
					>
						{settings?.footer?.tagline || "Fast. Rebellious. Female."}
					</p> </div>*/}
				
			</div>
		</footer>
	);
}
