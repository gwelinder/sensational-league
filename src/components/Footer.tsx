"use client";

import { createDataAttribute } from "@sanity/visual-editing";
import Link from "next/link";
import Image from "next/image";
import { getImageProps } from "@/lib/sanity-image";
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
			socialLinks?: {
				twitter?: string;
				instagram?: string;
				facebook?: string;
				tiktok?: string;
				youtube?: string;
			};
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const taglineAttribute = settings?._id
		? createDataAttribute({
				id: settings._id,
				type: settings._type,
				path: "footer.tagline",
			})
		: undefined;
	// Keep tagline attribute available for future Studio edits.
	void taglineAttribute;

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

	const socialLinksAttribute = settings?._id
		? createDataAttribute({
				id: settings._id,
				type: settings._type,
				path: "footer.socialLinks",
			})
		: undefined;

	// Get social links with fallback to hardcoded values
	const sparkLogoProps = settings?.footer?.sparkLogo
		? getImageProps(settings.footer.sparkLogo, 400)
		: null;

	const wordmarkLogoProps = settings?.footer?.wordmarkLogo
		? getImageProps(settings.footer.wordmarkLogo, 600)
		: null;

	const socialLinks = {
		twitter: settings?.footer?.socialLinks?.twitter || "https://twitter.com/SensationalLG",
		instagram: settings?.footer?.socialLinks?.instagram || "https://instagram.com/sensational_league",
		facebook: settings?.footer?.socialLinks?.facebook || "https://facebook.com/profile.php?id=61582488164825",
		tiktok: settings?.footer?.socialLinks?.tiktok || "https://tiktok.com/@Sensationalleague",
		youtube: settings?.footer?.socialLinks?.youtube || "https://youtube.com/@SensationalLeague",
	};

	return (
		<footer
			className="bg-[#232324] "
			data-sanity={footerAttribute?.toString()}
		>
			<div className="mx-auto max-w-7xl px-6 py-16">
				{/* Brand Section */}
				<div className="mb-16">
					<div className="flex items-center justify-center gap-6 mb-8">
						{sparkLogoProps ? (
							<Image
								src={sparkLogoProps.src}
								alt={sparkLogoProps.alt}
								style={sparkLogoProps.style}
								className={cn(
									!settings?.footer?.sparkLogo?.width &&
									!settings?.footer?.sparkLogo?.height &&
									"w-20 h-20",
								)}
							/>
						) : (
							<Image
								src="/SENSATIONAL-LEAGUE-PRIMARY-MARK-WHITE.png"
								alt=""
								width={80}
								height={80}
								className="w-20 h-20"
							/>
						)}
						{wordmarkLogoProps ? (
							<Image
								src={wordmarkLogoProps.src}
								alt={wordmarkLogoProps.alt || "Sensational League"}
								style={wordmarkLogoProps.style}
								className={cn(
									!settings?.footer?.wordmarkLogo?.width &&
									!settings?.footer?.wordmarkLogo?.height &&
									"h-10",
								)}
							/>
						) : (
							<Image
								src="/SL-WORDMARK-LEFT ALIGNED-WHITE.png"
								alt="Sensational League"
								width={200}
								height={40}
								className="h-10"
							/>
						)}
					</div>
					<p
						className="brand-body text-lg md:text-xl text-white max-w-2xl mx-auto font-medium leading-relaxed text-center"
						data-sanity={descriptionAttribute?.toString()}
					>
						{(() => {
							const description = settings?.footer?.description || "";
							// Parse text to find URLs in parentheses and make them clickable
							const urlRegex = /\((https?:\/\/[^)]+)\)/g;
							const parts = description.split(urlRegex);

							return parts.map((part, index) => {
								// If it's a URL (odd indices after split)
								if (index % 2 === 1) {
									return (
										<a
											key={`url-${part}`}
											href={part}
											target="_blank"
											rel="noopener noreferrer"
											className="underline hover:text-[var(--color-volt)] transition-colors"
										>
											{part}
										</a>
									);
								}
								// Regular text - remove the parentheses around URLs
								return <span key={`text-${index}-${part.slice(0, 10)}`}>{part.replace(/\(/g, '').replace(/\)/g, '')}</span>;
							});
						})()}
					</p>
				</div>

				{/* Social Media Icons */}
				<div
					className="flex items-center justify-center gap-8 mb-12"
					data-sanity={socialLinksAttribute?.toString()}
				>
					<a
						href={socialLinks.twitter}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-[var(--color-volt)] transition-colors"
						aria-label="Twitter"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="currentColor"
							role="img"
						>
							<title>Twitter</title>
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
						</svg>
					</a>
					<a
						href={socialLinks.instagram}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-[var(--color-volt)] transition-colors"
						aria-label="Instagram"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							role="img"
						>
							<title>Instagram</title>
							<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
							<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
							<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
						</svg>
					</a>
					<a
						href={socialLinks.facebook}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-[var(--color-volt)] transition-colors"
						aria-label="Facebook"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="currentColor"
							role="img"
						>
							<title>Facebook</title>
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
						</svg>
					</a>
					<a
						href={socialLinks.tiktok}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-[var(--color-volt)] transition-colors"
						aria-label="TikTok"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="currentColor"
							role="img"
						>
							<title>TikTok</title>
							<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
						</svg>
					</a>
					<a
						href={socialLinks.youtube}
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-[var(--color-volt)] transition-colors"
						aria-label="YouTube"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="currentColor"
							role="img"
						>
							<title>YouTube</title>
							<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
						</svg>
					</a>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-white/10 pt-8">
					{/* Links */}
				<div className="flex items-center justify-center gap-4 mb-6">
					<Link
						href="/privacy"
						className={cn(
							"brand-caption text-sm text-white uppercase tracking-wider font-bold",
							"hover:text-[var(--color-volt)] transition-colors",
						)}
					>
						Privacy Policy
					</Link>
				</div>

					{/* Copyright and Tagline */}
					<div className="text-center space-y-3">
						<p
							className="brand-caption text-sm text-white/70 uppercase tracking-wider font-bold"
							data-sanity={copyrightAttribute?.toString()}
						>
							{settings?.footer?.copyrightText ||
								`© ${new Date().getFullYear()} Sensational League`}
						</p>
						<p
							className="brand-caption text-sm text-white/70 uppercase tracking-wider font-bold"
							data-sanity={additionalAttribute?.toString()}
						>
							{settings?.footer?.additionalText || "Fast. Rebellious. Female."}
						</p>
					</div>
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
