"use client";

import type { PortableTextBlock } from "@portabletext/types";
import type { SanityDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createDataAttribute, useOptimistic } from "@sanity/visual-editing";
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
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			setIsSubmitted(true);
			setTimeout(() => setIsSubmitted(false), 3000);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
			<div className="flex flex-col sm:flex-row gap-3">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email"
					required
					className={cn(
						"flex-1 px-6 py-4 border-2 border-black rounded-none",
						"text-black placeholder-gray-500 brand-body",
						"focus:outline-none focus:border-[var(--color-volt)]",
						"transition-colors duration-200",
					)}
				/>

				<button
					type="submit"
					disabled={isSubmitted}
					className={cn(
						"px-10 py-4 font-black uppercase tracking-wider",
						"brand-caption transition-all duration-200",
						"focus:outline-none disabled:opacity-70",
						isSubmitted
							? "bg-black text-white"
							: "bg-[var(--color-volt)] text-black hover:bg-black hover:text-[var(--color-volt)]",
					)}
				>
					{isSubmitted ? "✓ JOINED" : "JOIN →"}
				</button>
			</div>
		</form>
	);
}

export default function HomePage({ content: initialContent }: HomePageProps) {
	// Use optimistic updates to prevent page reloads on every edit
	const content = useOptimistic<HomePageProps["content"], SanityDocument>(
		initialContent,
		(currentContent, action) => {
			// Only update if this is the same document
			if (!currentContent || action.id !== currentContent._id) {
				return currentContent;
			}

			// Return the updated document data
			return {
				...currentContent,
				...action.document,
			} as HomePageProps["content"];
		},
	);

	// Hero section attributes
	const heroDataAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "hero",
			})
		: undefined;

	const heroHeadlineAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "hero.headline",
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

	const aboutDescriptionAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "about.description",
			})
		: undefined;

	// Default data
	const defaultPillars: Pillar[] = [
		{
			title: "Elite Competition",
			description:
				"7v7 format with professional standards and innovative scoring systems.",
		},
		{
			title: "Social Impact",
			description:
				"Teams earn points for community engagement and UN SDG contributions.",
		},
		{
			title: "Digital Innovation",
			description:
				"Multi-metric tracking including social media growth and viral moments.",
		},
	];

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
								src="/logos/SL-PRIMARY LOCKUP-CROPPED.svg"
								alt="Sensational League"
								className="mx-auto w-full h-auto max-w-full"
							/>
						)}
					</div>

					{/* Headline with Yellow Background - Left aligned to match logo "S" position */}
					<div className="mb-8 md:mb-12 flex justify-center">
						<div className="w-full flex">
							<h1
								className="brand-headline text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1]"
								data-sanity={heroHeadlineAttribute?.toString()}
								style={{ marginLeft: "2%" }}
							>
								{content?.hero?.headline ? (
									<div className="inline-block bg-[var(--color-volt)] px-2 py-0">
										<StyledTextRenderer value={content.hero.headline} />
									</div>
								) : (
									<div className="inline-block bg-[var(--color-volt)] px-2 py-0">
										<span className="text-black">
											FAST. REBELLIOUS. FEMALE.
										</span>
									</div>
								)}
							</h1>
						</div>
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

					{/* Dynamic Spark Logo Animation - Moments of Greatness */}
					<div className="relative h-[400px] md:h-[500px] overflow-hidden">
						{/* Animated Sparks with Secondary Colors */}
						<div className="absolute inset-0 flex items-center justify-center">
							{/* Large Center Spark - Volt Yellow */}
							<div className="absolute animate-pulse" style={{ animation: 'pulse 3s ease-in-out infinite' }}>
								<img
									src="/logos/SL-SPARK-LARGE.svg"
									alt=""
									className="w-64 h-64 md:w-96 md:h-96"
									style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(85%) saturate(2000%) hue-rotate(30deg) brightness(104%) contrast(104%)' }}
								/>
							</div>

							{/* Top Left - Orange */}
							<div
								className="absolute top-8 left-8 animate-bounce"
								style={{
									animation: 'float-right-1 6s ease-in-out infinite',
									animationDelay: '0s'
								}}
							>
								<img
									src="/logos/SL-SPARK-MEDIUM.svg"
									alt=""
									className="w-24 h-24 md:w-32 md:h-32 opacity-60"
									style={{ filter: 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(4578%) hue-rotate(1deg) brightness(103%) contrast(107%)' }}
								/>
							</div>

							{/* Top Right - Cyan */}
							<div
								className="absolute top-12 right-12"
								style={{
									animation: 'float-right-2 7s ease-in-out infinite',
									animationDelay: '1s'
								}}
							>
								<img
									src="/logos/SL-SPARK-SMALL.svg"
									alt=""
									className="w-20 h-20 md:w-28 md:h-28 opacity-70"
									style={{ filter: 'brightness(0) saturate(100%) invert(65%) sepia(89%) saturate(2578%) hue-rotate(157deg) brightness(102%) contrast(106%)' }}
								/>
							</div>

							{/* Bottom Left - Purple */}
							<div
								className="absolute bottom-16 left-16"
								style={{
									animation: 'float-right-3 8s ease-in-out infinite',
									animationDelay: '2s'
								}}
							>
								<img
									src="/logos/SL-SPARK-MEDIUM.svg"
									alt=""
									className="w-28 h-28 md:w-36 md:h-36 opacity-50"
									style={{ filter: 'brightness(0) saturate(100%) invert(22%) sepia(95%) saturate(6234%) hue-rotate(280deg) brightness(97%) contrast(109%)' }}
								/>
							</div>

							{/* Bottom Right - Orange */}
							<div
								className="absolute bottom-8 right-20"
								style={{
									animation: 'float-right-4 5.5s ease-in-out infinite',
									animationDelay: '1.5s'
								}}
							>
								<img
									src="/logos/SL-SPARK-SMALL.svg"
									alt=""
									className="w-16 h-16 md:w-24 md:h-24 opacity-60"
									style={{ filter: 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(4578%) hue-rotate(1deg) brightness(103%) contrast(107%)' }}
								/>
							</div>

							{/* Middle Right - Cyan */}
							<div
								className="absolute top-1/2 right-8 -translate-y-1/2"
								style={{
									animation: 'spin-slow 20s linear infinite'
								}}
							>
								<img
									src="/logos/SL-SPARK-MEDIUM.svg"
									alt=""
									className="w-20 h-20 md:w-28 md:h-28 opacity-40"
									style={{ filter: 'brightness(0) saturate(100%) invert(65%) sepia(89%) saturate(2578%) hue-rotate(157deg) brightness(102%) contrast(106%)' }}
								/>
							</div>

							{/* Middle Left - Purple */}
							<div
								className="absolute top-1/3 left-4"
								style={{
									animation: 'float-right-1 9s ease-in-out infinite',
									animationDelay: '3s'
								}}
							>
								<img
									src="/logos/SL-SPARK-SMALL.svg"
									alt=""
									className="w-18 h-18 md:w-24 md:h-24 opacity-50"
									style={{ filter: 'brightness(0) saturate(100%) invert(22%) sepia(95%) saturate(6234%) hue-rotate(280deg) brightness(97%) contrast(109%)' }}
								/>
							</div>
						</div>
					</div>

					<style jsx>{`
						@keyframes float-right-1 {
							0%, 100% { transform: translate(0, 0) rotate(0deg); }
							25% { transform: translate(20px, -10px) rotate(5deg); }
							50% { transform: translate(40px, 0px) rotate(0deg); }
							75% { transform: translate(20px, 10px) rotate(-5deg); }
						}
						@keyframes float-right-2 {
							0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
							33% { transform: translate(15px, 15px) rotate(10deg) scale(1.1); }
							66% { transform: translate(30px, -10px) rotate(-5deg) scale(0.95); }
						}
						@keyframes float-right-3 {
							0%, 100% { transform: translate(0, 0) scale(1); }
							50% { transform: translate(25px, -20px) scale(1.15); }
						}
						@keyframes float-right-4 {
							0%, 100% { transform: translate(0, 0) rotate(0deg); }
							50% { transform: translate(35px, 15px) rotate(15deg); }
						}
						@keyframes spin-slow {
							from { transform: translateY(-50%) rotate(0deg); }
							to { transform: translateY(-50%) rotate(360deg); }
						}
					`}</style>
				</div>
			</section>

			{/* Visual Divider - Rightward Movement */}
			<div className="relative h-24 bg-white overflow-hidden">
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="w-full mx-auto">
						<div className="h-2 bg-black transform skew-x-[-3deg] origin-left"></div>
					</div>
				</div>
			</div>

			{/* About Section */}
			<section
				className="py-32 md:py-40 bg-white"
				data-sanity={aboutDataAttribute?.toString()}
			>
				<div className="max-w-7xl mx-auto px-4">
					{/* Headline - Bold and Clean */}
					<div className="mb-28">
						<h2
							className="brand-headline text-5xl md:text-7xl lg:text-8xl font-black text-center leading-tight uppercase"
							data-sanity={aboutTitleAttribute?.toString()}
						>
							{content?.about?.title ? (
								<StyledTextRenderer value={content.about.title} />
							) : (
								<>
									<span className="block text-black">PLAY FOOTBALL.</span>
									<span className="block text-[var(--color-volt)]">
										DRIVE IMPACT.
									</span>
									<span className="block text-black">CHANGE THE WORLD.</span>
								</>
							)}
						</h2>
					</div>

					{/* Three Pillars - Clean Cards with Rightward Movement */}
					<div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 max-w-6xl mx-auto">
						{(content?.about?.pillars || defaultPillars).map(
							(pillar, index) => (
								<div
									key={index}
									className="bg-white border-4 border-black p-8 hover:bg-[var(--color-volt)] hover:translate-x-2 transition-all duration-300 group"
								>
									<div className="w-20 h-3 bg-black mb-6 transform skew-x-[-12deg] group-hover:w-24 transition-all duration-300"></div>
									<h3 className="brand-subhead text-xl md:text-2xl font-black mb-4 uppercase tracking-wider text-black">
										{pillar.title}
									</h3>
									<p className="brand-body text-base text-black leading-relaxed">
										{pillar.description}
									</p>
								</div>
							),
						)}
					</div>

					{/* Description */}
					<div className="max-w-4xl mx-auto text-center">
						<p
							className="brand-body text-2xl md:text-3xl text-black leading-relaxed font-bold"
							data-sanity={aboutDescriptionAttribute?.toString()}
						>
							{content?.about?.description ||
								"We're building a community where female athletes can showcase their skills while making a difference. Our mission is simple: Fast. Rebellious. Female."}
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
