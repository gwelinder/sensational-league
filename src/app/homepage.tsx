"use client";

import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createDataAttribute } from "@sanity/visual-editing";
import Link from "next/link";
import { useState } from "react";
import StyledTextRenderer from "@/components/StyledTextRenderer";
import { getImageProps, getImageUrl } from "@/lib/sanity-image";
import { cn } from "@/lib/utils";

interface Stat {
	value: string;
	label: string;
}

interface Pillar {
	title: string;
	description: string;
}

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

interface HomePageProps {
	content?: {
		_id?: string;
		_type?: string;
		hero?: {
			logo?: SanityImage;
			headline?: PortableTextBlock[] | null;
			subline?: string;
			ctaText?: string;
			stats?: Stat[];
			images?: SanityImage[];
		};
		about?: {
			title?: PortableTextBlock[] | null;
			description?: string;
			pillars?: Pillar[];
		};
	};
}

function SignupForm() {
	const [email, setEmail] = useState("");
	const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!agreedToPrivacy) {
			setErrorMessage("Please accept the privacy policy to continue");
			setStatus("error");
			return;
		}

		setStatus("loading");
		setErrorMessage("");

		try {
			const response = await fetch("/api/newsletter", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					consentGiven: agreedToPrivacy,
					consentTimestamp: new Date().toISOString(),
					source: "homepage-hero",
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to subscribe");
			}

			setStatus("success");
			setEmail("");
			setAgreedToPrivacy(false);

			// Reset success message after 5 seconds
			setTimeout(() => {
				setStatus("idle");
			}, 5000);
		} catch (err) {
			setStatus("error");
			setErrorMessage(
				err instanceof Error
					? err.message
					: "Failed to subscribe. Please try again.",
			);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
			<div className="flex flex-col sm:flex-row gap-3 mb-3">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email"
					required
					disabled={status === "loading"}
					className={cn(
						"flex-1 px-6 py-4 border-2 border-black rounded-none",
						"text-black placeholder-gray-500 brand-body",
						"focus:outline-none focus:border-[var(--color-volt)]",
						"transition-colors duration-200",
						"disabled:opacity-50 disabled:cursor-not-allowed",
					)}
				/>

				<button
					type="submit"
					disabled={status === "loading" || !agreedToPrivacy}
					className={cn(
						"px-10 py-4 font-black uppercase tracking-wider",
						"brand-caption transition-all duration-200",
						"focus:outline-none disabled:opacity-70",
						status === "success"
							? "bg-black text-white"
							: "bg-[var(--color-volt)] text-black hover:bg-black hover:text-[var(--color-volt)]",
					)}
				>
					{status === "loading"
						? "..."
						: status === "success"
							? "✓ JOINED"
							: "JOIN →"}
				</button>
			</div>

			{/* Privacy Consent - Compact */}
			<div className="flex items-center gap-2 justify-center">
				<input
					type="checkbox"
					id="privacy-consent"
					checked={agreedToPrivacy}
					onChange={(e) => setAgreedToPrivacy(e.target.checked)}
					disabled={status === "loading"}
					required
					className="w-4 h-4 border-2 border-gray-400 cursor-pointer accent-black disabled:opacity-50 disabled:cursor-not-allowed"
				/>
				<label
					htmlFor="privacy-consent"
					className="text-xs text-gray-600 cursor-pointer"
				>
					I want to join Sensational League and receive updates about the
					world&apos;s most innovative women&apos;s football league.{" "}
					<Link
						href="/privacy"
						className="underline hover:text-black transition-colors"
					>
						Privacy Policy
					</Link>
				</label>
			</div>

			{/* Error Message */}
			{status === "error" && errorMessage && (
				<p className="text-xs text-red-600 text-center mt-2">{errorMessage}</p>
			)}
		</form>
	);
}

export default function HomePage({ content }: HomePageProps) {
	// SanityLive component in layout.tsx handles live updates automatically
	// No need for manual useOptimistic - it's only needed for drag and drop

	// Hero section attributes
	const heroDataAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "hero",
			})
		: undefined;

	const heroSublineAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "hero.subline",
			})
		: undefined;

	// About section attributes
	const aboutDataAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "about",
			})
		: undefined;

	const aboutTitleAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "about.title",
			})
		: undefined;

	return (
		<main className="min-h-screen bg-white">
			{/* Hero Section */}
			<section
				className="relative min-h-screen flex items-center justify-center px-4 pt-8 pb-20 bg-white"
				data-sanity={heroDataAttribute?.toString()}
			>
				<div className="w-full max-w-[1400px] mx-auto">
					{/* Logo - Extra Large and Prominent, Centered */}
					<div className="mb-8 md:mb-12 text-center">
						{content?.hero?.logo && getImageUrl(content.hero.logo) ? (
							<img
								{...getImageProps(content.hero.logo, 3000)}
								alt={content.hero.logo.alt || "Sensational League"}
								className={cn(
									"mx-auto w-full h-auto",
									!content.hero.logo.width &&
										!content.hero.logo.height &&
										"max-w-full",
								)}
							/>
						) : (
							<img
								src="/logos/SL-LOCKUP-WITH-TAGLINE.svg"
								alt="Sensational League - Fast. Rebellious. Female."
								className="mx-auto w-full h-auto max-w-full"
							/>
						)}
					</div>

					{/* Subline - Centered */}
					<p
						className="brand-body text-lg md:text-xl text-gray-700 mb-8 md:mb-12 max-w-2xl mx-auto text-center"
						data-sanity={heroSublineAttribute?.toString()}
					>
						{content?.hero?.subline ||
							"Women's 7v7 football league that combines athletic excellence with social impact."}
					</p>

					{/* Form - Centered */}
					<div className="mb-16">
						<SignupForm />
					</div>

					{/* Image Grid - Bold, Dynamic with Rightward Movement */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
						{content?.hero?.images && content.hero.images.length > 0
							? content.hero.images.slice(0, 8).map((image, index) => {
									const imageProps = getImageProps(image, 800);

									return (
										<div
											key={index}
											className={cn(
												"relative aspect-[3/4] overflow-hidden border-4 border-black hover:-translate-y-2 hover:translate-x-1 transition-all duration-500 group",
												index % 2 === 1 && "md:mt-8",
											)}
										>
											<img
												{...imageProps}
												alt={image.alt || `Sensational League ${index + 1}`}
												className={cn(
													"w-full h-full group-hover:scale-110 transition-all duration-500",
													!image.objectFit && "object-cover",
												)}
												style={{
													...imageProps.style,
													objectFit: image.objectFit || "cover",
												}}
											/>
											<div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-volt)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
										</div>
									);
								})
							: // Fallback to default images when no Sanity images are available
								[
									"/logos/image_046_page_39.jpeg",
									"/logos/image_063_page_42.jpeg",
									"/logos/image_067_page_43.jpeg",
									"/logos/image_073_page_44.jpeg",
								].map((src, index) => (
									<div
										key={index}
										className={cn(
											"relative aspect-[3/4] overflow-hidden border-4 border-black hover:-translate-y-2 hover:translate-x-1 transition-all duration-500 group",
											index % 2 === 1 && "md:mt-8",
										)}
									>
										<img
											src={src}
											alt={`Sensational League ${index + 1}`}
											className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
										/>
										<div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-volt)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
									</div>
								))}
					</div>
				</div>
			</section>


			{/* About Section */}
			<section
				className="py-20 md:py-32 bg-white"
				data-sanity={aboutDataAttribute?.toString()}
			>
				<div className="max-w-7xl mx-auto px-4">
					{/* Simple Bold Label */}
					<div className="mb-12 text-center">
						<h2 className="text-6xl md:text-7xl font-black uppercase tracking-[0.15em] text-black mb-4">
							ABOUT US
						</h2>
						<div className="w-24 h-2 bg-black mx-auto"></div>
					</div>

					{/* Primary Description */}
					<div className="max-w-4xl mx-auto text-center mb-20">
						<p className="brand-body text-2xl md:text-3xl text-black leading-relaxed font-bold">
							An international 7v7 professional women&apos;s football league
							launching April 2026 across the Nordics, expanding to the UK and
							US. Elite competition meets entertainment and lifestyle.
						</p>
					</div>

					{/* Info Box - Point System */}
					<div className="max-w-5xl mx-auto mb-20">
						<div className="bg-[var(--color-volt)] border-[6px] border-black p-12 md:p-16 transform hover:translate-x-2 hover:-translate-y-2 transition-all duration-200">
							<h3 className="brand-subhead text-3xl md:text-4xl font-black mb-6 uppercase tracking-[0.15em] text-black">
								THE SENSATIONAL POINT SYSTEM
							</h3>
							<p className="brand-body text-xl md:text-2xl text-black leading-relaxed font-semibold">
								Champions are crowned for winning matches, growing their
								following, and amplifying women&apos;s sports through community
								projects. This built-in growth mechanism makes promotion of the
								game part of the competition model itself.
							</p>
						</div>
					</div>

					{/* Feature Bullets - Flexible Grid Layout */}
					<div className={cn(
						"max-w-6xl mx-auto grid gap-6",
						content?.about?.pillars && content.about.pillars.length === 3
							? "md:grid-cols-3" // 3 columns for 3 items
							: content?.about?.pillars && content.about.pillars.length === 2
								? "md:grid-cols-2 max-w-4xl" // 2 columns for 2 items, narrower
								: content?.about?.pillars && content.about.pillars.length === 1
									? "md:grid-cols-1 max-w-2xl" // 1 column for 1 item, narrower
									: "md:grid-cols-2" // Default 2x2 grid for 4+ items
					)}>
						{content?.about?.pillars && content.about.pillars.length > 0
							? content.about.pillars.map((pillar, index) => (
									<div
										key={index}
										className="border-[5px] border-black p-10 bg-white hover:bg-[var(--color-volt)] hover:translate-x-2 hover:-translate-y-2 transition-all duration-200 group"
										data-sanity={
											content._id
												? createDataAttribute({
														id: content._id,
														type: content._type || "homePage",
														path: `about.pillars[${index}]`,
													})?.toString()
												: undefined
										}
									>
										<p className="brand-body text-xl md:text-2xl text-black leading-relaxed">
											<strong className="brand-caption text-lg tracking-[0.1em] uppercase block mb-3 font-black">
												{pillar.title}
											</strong>
											{pillar.description}
										</p>
									</div>
								))
							: // Fallback to default content when no Sanity pillars are available
								[
									{
										title: "ELITE 7V7 COMPETITION",
										description:
											"Fast, high-scoring, skills focused, made for brands, broadcast and streaming.",
									},
									{
										title: "8 TEAMS",
										description: "Led by athlete-influencer Captains.",
									},
									{
										title: "6 FESTIVAL MATCHDAYS",
										description:
											"Football meets music, culture, and community.",
									},
									{
										title: "PROFESSIONAL PAY",
										description:
											"Athletes with creative control and shared value.",
									},
								].map((pillar, index) => (
									<div
										key={index}
										className="border-[5px] border-black p-10 bg-white hover:bg-[var(--color-volt)] hover:translate-x-2 hover:-translate-y-2 transition-all duration-200 group"
									>
										<p className="brand-body text-xl md:text-2xl text-black leading-relaxed">
											<strong className="brand-caption text-lg tracking-[0.1em] uppercase block mb-3 font-black">
												{pillar.title}
											</strong>
											{pillar.description}
										</p>
									</div>
								))}
					</div>
				</div>
			</section>
		</main>
	);
}
