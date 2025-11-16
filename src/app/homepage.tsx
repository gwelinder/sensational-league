"use client";

import type { PortableTextBlock } from "@portabletext/types";
import { createDataAttribute } from "@sanity/visual-editing";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedSpark } from "@/components/Logo";
import { SectionsRenderer } from "@/components/SectionsRenderer";
import StyledTextRenderer from "@/components/StyledTextRenderer";
import TypeformApplyButton from "@/components/TypeformApplyButton";
import TypeformWidget from "@/components/TypeformWidget";
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

interface CountdownConfig {
	enabled?: boolean;
	label?: string;
	deadline?: string;
	timezone?: string;
}

interface PageSection {
	_key: string;
	_type: string;
	[key: string]: unknown;
}

interface HomePageProps {
	content?: {
		_id?: string;
		_type?: string;
		hero?: {
			logo?: SanityImage;
			headline?: PortableTextBlock[] | null;
			video?: {
				url?: string;
				poster?: SanityImage;
				credit?: string;
			};
			subline?: string;
			ctaText?: string;
			ctaLink?: string;
			ctaDescription?: string;
			stats?: Stat[];
			images?: SanityImage[];
			countdown?: CountdownConfig;
		};
		about?: {
			title?: PortableTextBlock[] | null;
			description?: string;
			pillars?: Pillar[];
			infoCard?: {
				title?: string;
				body?: string;
			};
		};
		pressCta?: {
			label?: string;
			emoji?: string;
			href?: string;
			buttonText?: string;
		};
		application?: {
			card?: {
				badge?: string;
				title?: string;
				description?: string;
				ctaText?: string;
				ctaLink?: string;
				helperText?: string;
				countdownLabel?: string;
				formId?: string;
				resourceEyebrow?: string;
				resourceLinkLabel?: string;
				resourceLinkHref?: string;
			};
			embed?: {
				enabled?: boolean;
				badge?: string;
				title?: string;
				description?: string;
				bulletPoints?: string[];
				deadlineNote?: string;
				formId?: string;
				height?: number;
			};
		};
		sections?: PageSection[];
	};
}

const PLAYER_DRAFT_FORM_ID = "ZmJZ6YB2";
const DEFAULT_TYPEFORM_URL =
	process.env.NEXT_PUBLIC_TYPEFORM_PLAYERDRAFT_URL ||
	`https://form.typeform.com/to/${PLAYER_DRAFT_FORM_ID}`;
const APPLICATION_CTA_TEXT = "Start application";
const DEFAULT_DEADLINE = "2026-01-01T23:59:59+01:00";
const DEFAULT_COUNTDOWN_LABEL = "Applications close";
const DEFAULT_APPLICATION_HELPER_TEXT =
	"Applications are reviewed weekly by the Sensational captains. Early submissions are encouraged.";
const HERO_CARD_DEFAULT_DESCRIPTION = [
	"We are looking for 80 players to join the Sensational League in Copenhagen spring 2026.",
	"You will join a league built around performance, community, visibility, and opportunity.",
	"Submit your application and become one of the Sensational 80.",
].join(" ");
const HERO_SUBLINE_DEFAULT =
	"Copenhagen • Spring 2026 — Sensational League is launching a fast 7v7 format that turns performance, community, visibility, and opportunity into the scoring system.";
const HERO_LOCATION_LABEL = "Copenhagen • Spring 2026";
const DEFAULT_EMBED_DESCRIPTION =
	"Submit your application below in Danish or English. Captains and staff receive every submission instantly inside SharePoint so we can follow up with invites, feedback, and next steps.";
const DEFAULT_EMBED_BULLETS = [
	"Share your football profile, background, and ambitions",
	"Attach links or handles that showcase how you play and create",
	"Captains review weekly. Early submissions get priority",
];
const DEFAULT_EMBED_DEADLINE_NOTE =
	"Deadline: January 1, 2026 – but we encourage early applications as spots are limited to 80 players.";

function resolveHeroCtaText(raw?: string | null): string {
	if (!raw) {
		return APPLICATION_CTA_TEXT;
	}
	const trimmed = raw.trim();
	if (!trimmed) return APPLICATION_CTA_TEXT;
	if (trimmed.toLowerCase().includes("newsletter")) {
		return APPLICATION_CTA_TEXT;
	}
	return trimmed;
}

function SignupForm() {
	const [email, setEmail] = useState("");
	const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

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
			setTimeout(() => setStatus("idle"), 5000);
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
		<form onSubmit={handleSubmit} className="mx-auto mb-12 max-w-2xl">
			<div className="mb-3 flex flex-col gap-3 sm:flex-row">
				<input
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="Enter your email"
					required
					disabled={status === "loading"}
					className={cn(
						"flex-1 rounded-none border-2 border-black px-6 py-4",
						"text-black placeholder-gray-500 brand-body",
						"focus:border-[var(--color-volt)] focus:outline-none",
						"transition-colors duration-200",
						"disabled:cursor-not-allowed disabled:opacity-50",
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
			<div className="flex items-center justify-center gap-2">
				<input
					type="checkbox"
					id="privacy-consent"
					checked={agreedToPrivacy}
					onChange={(event) => setAgreedToPrivacy(event.target.checked)}
					disabled={status === "loading"}
					required
					className="h-4 w-4 cursor-pointer border-2 border-gray-400 accent-black disabled:cursor-not-allowed disabled:opacity-50"
				/>
				<label htmlFor="privacy-consent" className="text-xs text-gray-600">
					I want to join Sensational League and receive updates about the
					world&apos;s most innovative women&apos;s football league.{" "}
					<Link
						href="/privacy"
						className="underline transition-colors hover:text-black"
					>
						Privacy Policy
					</Link>
				</label>
			</div>
			{status === "error" && errorMessage && (
				<p className="mt-2 text-center text-xs text-red-600">{errorMessage}</p>
			)}
		</form>
	);
}

function HeroNewsletterSignup() {
	const [email, setEmail] = useState("");
	const [agreed, setAgreed] = useState(false);
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!agreed) {
			setStatus("error");
			setErrorMessage("Please accept the privacy policy to subscribe.");
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
					consentGiven: true,
					consentTimestamp: new Date().toISOString(),
					source: "hero-card",
				}),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || "Failed to subscribe");
			}

			setStatus("success");
			setEmail("");
			setAgreed(false);
		} catch (error) {
			setStatus("error");
			setErrorMessage(
				error instanceof Error ? error.message : "Something went wrong",
			);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mt-6 space-y-3">
			<div className="flex flex-col gap-3 sm:flex-row">
				<label className="sr-only" htmlFor="hero-newsletter-email">
					Email address
				</label>
		<input
					id="hero-newsletter-email"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="Get league updates"
					required
					disabled={status === "loading"}
					className={cn(
				"flex-1 rounded-none border-2 border-black/15 bg-white px-4 py-3 text-sm text-black",
				"placeholder:text-black/40 focus:border-black focus:outline-none",
				"disabled:cursor-not-allowed disabled:opacity-60",
					)}
				/>
		<button
					type="submit"
					disabled={status === "loading"}
					className={cn(
				"w-full rounded-none border-2 border-black bg-black px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-white",
				"transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5",
						"sm:w-auto",
						status === "loading" && "opacity-70",
					)}
				>
					{status === "loading" ? "Sending…" : "Join newsletter"}
				</button>
			</div>
	<label className="flex items-start gap-2 text-[11px] text-black/70">
				<input
					type="checkbox"
					checked={agreed}
					onChange={(event) => setAgreed(event.target.checked)}
			className="mt-1 h-3.5 w-3.5 cursor-pointer border border-black/40 bg-transparent text-black accent-[var(--color-volt)]"
				/>
				<span>
					I agree to the{" "}
			<Link href="/privacy" className="underline text-black">
						privacy policy
					</Link>
					.
				</span>
			</label>
	{status === "error" && (
		<p className="text-xs text-red-500">{errorMessage}</p>
	)}
	{status === "success" && (
		<p className="text-xs text-black">
					Thanks! You&apos;re on the list.
				</p>
			)}
		</form>
	);
}

interface CountdownParts {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	expired: boolean;
}

function calculateCountdown(deadline?: string): CountdownParts | null {
	if (!deadline) return null;
	const target = new Date(deadline).getTime();
	if (Number.isNaN(target)) return null;
	const now = Date.now();
	const diff = Math.max(0, target - now);
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const seconds = Math.floor((diff / 1000) % 60);
	return {
		days,
		hours,
		minutes,
		seconds,
		expired: diff === 0,
	};
}

function useCountdown(deadline?: string) {
	const [parts, setParts] = useState<CountdownParts | null>(() =>
		calculateCountdown(deadline),
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setParts(calculateCountdown(deadline));
		}, 1000);

		return () => clearInterval(interval);
	}, [deadline]);

	return parts;
}

function CountdownTimer({
	countdown,
	variant = "dark",
}: {
	countdown?: CountdownConfig;
	variant?: "dark" | "light";
}) {
	const isEnabled = countdown?.enabled ?? true;
	const target = countdown?.deadline || DEFAULT_DEADLINE;
	const label = countdown?.label || DEFAULT_COUNTDOWN_LABEL;
	const timezone = countdown?.timezone;
	const parts = useCountdown(isEnabled ? target : undefined);
	const labelClasses = variant === "dark" ? "text-white/80" : "text-black/60";
	const segmentWrapperClasses =
		variant === "dark"
			? "border-white/30 bg-white/10"
			: "border-black/20 bg-black/5";
	const segmentValueClasses = variant === "dark" ? "text-white" : "text-black";
	const segmentLabelClasses =
		variant === "dark" ? "text-white/70" : "text-black/60";

	if (!isEnabled || !parts) {
		return null;
	}

	return (
		<div className="mt-8">
			<p
				className={cn("brand-caption uppercase tracking-[0.2em]", labelClasses)}
			>
				{label}
				{timezone ? ` • ${timezone}` : ""}
			</p>
			<div className="mt-4 flex flex-wrap gap-4">
				{[
					{ label: "Days", value: parts.days },
					{ label: "Hours", value: parts.hours },
					{ label: "Minutes", value: parts.minutes },
					{ label: "Seconds", value: parts.seconds },
				].map((segment) => (
					<div
						key={segment.label}
						className={cn(
							"min-w-[80px] rounded border px-4 py-3 text-center",
							segmentWrapperClasses,
						)}
					>
						<div
							className={cn(
								"text-3xl font-black tracking-wide",
								segmentValueClasses,
							)}
						>
							{String(segment.value).padStart(2, "0")}
						</div>
						<p
							className={cn(
								"brand-caption text-xs uppercase tracking-[0.3em]",
								segmentLabelClasses,
							)}
						>
							{segment.label}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

function HeroStats({
	stats,
	variant = "dark",
}: {
	stats?: Stat[];
	variant?: "dark" | "light";
}) {
	if (!stats?.length) return null;
	const containerClasses =
		variant === "dark"
			? "border-white/30 bg-white/10 text-white"
			: "border-black/10 bg-black/5 text-black";
	const labelClasses = variant === "dark" ? "text-white/70" : "text-black/60";

	return (
		<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat, index) => (
				<div
					key={`${stat.label}-${index}`}
					className={cn("rounded-lg border px-6 py-5", containerClasses)}
				>
					<p className="text-4xl font-black tracking-tight">{stat.value}</p>
					<p
						className={cn(
							"brand-caption uppercase tracking-[0.3em]",
							labelClasses,
						)}
					>
						{stat.label}
					</p>
				</div>
			))}
		</div>
	);
}

interface ApplicationCardProps {
	badge?: string;
	title?: string;
	description?: string;
	ctaText: string;
	ctaLink: string;
	helperText?: string;
	deadlineLabel: string;
	countdown?: CountdownConfig;
	resourceEyebrow?: string;
	resourceLinkLabel?: string;
	resourceLinkHref?: string;
}

function ApplicationCard({
	badge = "Player Draft 2025–26",
	title = "We’re looking for 80 football players",
	description,
	ctaText,
	ctaLink,
	helperText,
	deadlineLabel,
	countdown,
	resourceEyebrow,
	resourceLinkHref,
	resourceLinkLabel,
}: ApplicationCardProps) {
	const helperCopy = helperText || DEFAULT_APPLICATION_HELPER_TEXT;
	const showResource = Boolean(resourceLinkHref && resourceLinkLabel);

	return (
		<div className="rounded-3xl border-4 border-black bg-white px-6 py-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
			<p className="brand-caption text-sm uppercase tracking-[0.4em] text-black/70">
				{badge}
			</p>
			<h3 className="mt-3 text-3xl font-black uppercase tracking-tight text-black">
				{title}
			</h3>
			{description && (
				<p className="brand-body mt-4 text-base text-black/80">{description}</p>
			)}
			<TypeformApplyButton
				formUrl={ctaLink}
				className={cn(
					"mt-6 inline-flex w-full items-center justify-center gap-2 rounded-none border-4 border-black",
					"bg-[var(--color-volt)] px-6 py-4 text-lg font-black uppercase tracking-[0.3em] text-black",
					"transition-all duration-200 hover:-translate-y-1 hover:translate-x-1",
				)}
			>
				{ctaText}
				<span aria-hidden>→</span>
			</TypeformApplyButton>
			<p className="brand-caption mt-4 text-xs uppercase tracking-[0.3em] text-black/60">
				{deadlineLabel}
			</p>
			{countdown?.enabled !== false && (
				<p className="brand-body mt-2 text-sm text-black/70">{helperCopy}</p>
			)}
			{showResource && (
				<div className="mt-6 rounded-lg bg-black/5 px-4 py-3">
					{resourceEyebrow && (
						<p className="brand-caption text-xs uppercase tracking-[0.2em] text-black/70">
							{resourceEyebrow}
						</p>
					)}
					<Link
						href={resourceLinkHref!}
						className="brand-body text-base font-semibold text-black underline"
					>
						{resourceLinkLabel}
					</Link>
				</div>
			)}
		</div>
	);
}

interface ApplicationEmbedProps {
	badge?: string;
	title?: string;
	description?: string;
	bulletPoints?: string[];
	deadlineNote?: string;
	formId?: string;
	height?: number;
	enabled?: boolean;
	dataAttribute?: string;
}

function ApplicationEmbedSection({
	badge,
	title,
	description,
	bulletPoints,
	deadlineNote,
	formId,
	height = 760,
	enabled = true,
	dataAttribute,
}: ApplicationEmbedProps) {
	if (!enabled) {
		return null;
	}

	const resolvedFormId = formId || PLAYER_DRAFT_FORM_ID;
	const bullets =
		bulletPoints && bulletPoints.length > 0
			? bulletPoints
			: DEFAULT_EMBED_BULLETS;

	return (
		<section
			id="apply"
			className="bg-black py-20 text-white"
			data-sanity={dataAttribute}
		>
			<div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
				<div className="space-y-6">
					{badge && (
						<p className="brand-caption text-sm uppercase tracking-[0.3em] text-white/70">
							{badge}
						</p>
					)}
					{title && (
						<h2 className="text-4xl font-black uppercase tracking-[0.15em]">
							{title}
						</h2>
					)}
					{description && (
						<p className="brand-body text-lg text-white/80">{description}</p>
					)}
					{bullets?.length ? (
						<ul className="list-disc space-y-2 pl-6 text-white/80 brand-body">
							{bullets.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					) : null}
					<p className="brand-body text-white/70">
						Optional: if you feel like it you’re welcome to upload a super short
						motivational video of yourself, where you let us know why you want
						to be a Sensational player.
					</p>
					{deadlineNote && (
						<p className="brand-body text-white/70">{deadlineNote}</p>
					)}
				</div>
				<TypeformWidget formId={resolvedFormId} height={height} />
			</div>
		</section>
	);
}

function MediaGrid({
	images,
	dataAttribute,
}: {
	images?: SanityImage[];
	dataAttribute?: string;
}) {
	const gallery = images?.slice(0, 8) ?? [];
	const fallback = [
		"/logos/image_046_page_39.jpeg",
		"/logos/image_063_page_42.jpeg",
		"/logos/image_067_page_43.jpeg",
		"/logos/image_073_page_44.jpeg",
	];

	const cards = gallery.length
		? gallery.map((image, index) => {
				const imageProps = getImageProps(image, 800);
				const keyValue =
					(image as { _key?: string })?._key ?? `gallery-${index}`;
				return (
					<div
						key={keyValue}
						className={cn(
							"group relative aspect-[3/4] overflow-hidden border-4 border-black",
							"bg-white transition-all duration-500 hover:-translate-y-2 hover:translate-x-1",
							index % 2 === 1 && "md:mt-8",
						)}
					>
						<img
							{...imageProps}
							alt={image.alt || `Sensational League ${index + 1}`}
							className={cn(
								"h-full w-full transition-all duration-500",
								"group-hover:scale-110",
								!image.objectFit && "object-cover",
							)}
							style={{
								...imageProps.style,
								objectFit: image.objectFit || "cover",
							}}
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-volt)]/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
					</div>
				);
			})
		: fallback.map((src, index) => (
				<div
					key={src}
					className={cn(
						"relative aspect-[3/4] overflow-hidden border-4 border-black",
						"bg-white transition-all duration-500 hover:-translate-y-2 hover:translate-x-1",
						index % 2 === 1 && "md:mt-8",
					)}
				>
					<img
						src={src}
						alt={`Sensational League ${index + 1}`}
						className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-volt)]/20" />
				</div>
			));

	return (
		<div
			className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
			data-sanity={dataAttribute}
		>
			{cards}
		</div>
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

	const heroHeadlineAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "hero.headline",
			})
		: undefined;

	const heroCtaAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "hero.ctaDescription",
			})
		: undefined;

	const heroCountdownAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "hero.countdown",
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

	const sectionsAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "sections",
			})
		: undefined;

	const normalizedSections: PageSection[] = (content?.sections ?? []).map(
		(section, index) => ({
			...section,
			_key: section._key ?? `section-${index}`,
			_type: section._type ?? "contentSection",
		}),
	) as PageSection[];

	const pressCtaAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "pressCta",
			})
		: undefined;

	const applicationCardAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "application.card",
			})
		: undefined;

	const applicationEmbedAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "application.embed",
			})
		: undefined;

	const aboutInfoCardAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "about.infoCard",
			})
		: undefined;

	const heroVideoUrl = content?.hero?.video?.url;
	const heroPosterUrl = content?.hero?.video?.poster
		? (getImageUrl(content.hero.video.poster, 2400) ?? undefined)
		: undefined;
	const heroCtaText = resolveHeroCtaText(content?.hero?.ctaText);
	const heroCtaLink = content?.hero?.ctaLink || DEFAULT_TYPEFORM_URL;
	const heroCtaDescription =
		content?.hero?.ctaDescription || HERO_CARD_DEFAULT_DESCRIPTION;
	const countdownConfig = content?.hero?.countdown;

	const countdownLabel =
		countdownConfig?.label || "Applications close Jan 1, 2026";

	const applicationCardSettings = content?.application?.card;
	const applicationEmbedSettings = content?.application?.embed;
	const embedEnabled = applicationEmbedSettings?.enabled === true;
	const applicationFormId =
		applicationCardSettings?.formId ||
		applicationEmbedSettings?.formId ||
		PLAYER_DRAFT_FORM_ID;
	const heroCardDescription =
		applicationCardSettings?.description || heroCtaDescription;
	const heroCardCtaText = resolveHeroCtaText(
		applicationCardSettings?.ctaText || heroCtaText,
	);
	const heroCardLink = applicationCardSettings?.ctaLink || heroCtaLink;
	const heroCardHelperText =
		applicationCardSettings?.helperText || DEFAULT_APPLICATION_HELPER_TEXT;
	const heroCardDeadline =
		applicationCardSettings?.countdownLabel || countdownLabel;
	const heroCardBadge = applicationCardSettings?.badge;
	const heroCardTitle = applicationCardSettings?.title;
	const heroResourceEyebrow =
		applicationCardSettings?.resourceEyebrow || "Need more info?";
	const heroResourceLinkLabel =
		applicationCardSettings?.resourceLinkLabel || "Read about the player draft";
	const heroResourceLinkHref =
		applicationCardSettings?.resourceLinkHref || "/player-draft";

	const pressButtonText =
		content?.pressCta?.buttonText || content?.pressCta?.label || "News";
	const pressEmoji = content?.pressCta?.emoji || "📰";
	const pressHref = content?.pressCta?.href || "/press";

	const infoCardTitle =
		content?.about?.infoCard?.title || "THE SENSATIONAL POINT SYSTEM";
	const infoCardBody =
		content?.about?.infoCard?.body ||
		"Champions are crowned for winning matches, growing their following, and amplifying women’s sports through community projects. This built-in growth mechanism makes promotion of the game part of the competition model itself.";

	const embedBullets = applicationEmbedSettings?.bulletPoints?.length
		? applicationEmbedSettings.bulletPoints
		: DEFAULT_EMBED_BULLETS;
	const embedDescription =
		applicationEmbedSettings?.description || DEFAULT_EMBED_DESCRIPTION;
	const embedBadge = applicationEmbedSettings?.badge || "Apply to play";
	const embedTitle =
		applicationEmbedSettings?.title ||
		"Start your Sensational League Player Draft application";
	const embedDeadlineNote =
		applicationEmbedSettings?.deadlineNote || DEFAULT_EMBED_DEADLINE_NOTE;
	const embedHeight = applicationEmbedSettings?.height || 760;

	const aboutDescription =
		content?.about?.description ||
		"Sensational League is an international 7v7 professional women’s football league launching April 2026 in Copenhagen before expanding across Europe and the US.";

	return (
		<main className="min-h-screen bg-white">
			{/* Hero Section */}
			<section
				className="relative isolate overflow-hidden bg-gradient-to-b from-[#040404] via-[#0b0b0b] to-[#111111] px-4 pt-12 pb-24 text-white"
				data-sanity={heroDataAttribute?.toString()}
			>
				{heroVideoUrl ? (
					<div className="absolute inset-0">
						<video
							className="h-full w-full object-cover"
							src={heroVideoUrl}
							poster={heroPosterUrl}
							autoPlay
							muted
							playsInline
							loop
						/>
						<div className="absolute inset-0 bg-black opacity-70 mix-blend-multiply" />
					</div>
				) : null}

				<div
					className="pointer-events-none absolute inset-0 opacity-45 mix-blend-screen"
					aria-hidden="true"
					style={{
						background:
							"radial-gradient(circle at 12% 12%, rgba(255,255,255,0.12), transparent 42%), radial-gradient(circle at 78% 8%, rgba(212,255,0,0.05), transparent 60%)",
					}}
				/>
				<div
					className="pointer-events-none absolute inset-x-[-15%] top-1/3 h-[40%] rounded-full bg-white/8 blur-[160px]"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-[#151515] via-[#0f0f0f]/85 to-transparent"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute inset-x-0 bottom-[-140px] h-[200px] bg-gradient-to-b from-transparent via-[#0b0b0b] to-[#151515]"
					aria-hidden="true"
				/>



				<div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 lg:flex-row lg:items-end">
					<div className="flex-1">
					<img
						src="/logos/SL-LOCKUP-WITH-TAGLINE.svg"
						alt="Sensational League"
						className="mb-10 w-full max-w-[760px]"
					/>
						<p className="brand-caption text-xs uppercase tracking-[0.4em] text-white/60">
							{HERO_LOCATION_LABEL}
						</p>

						<p
							className="brand-body mt-6 max-w-2xl text-lg text-white/75"
							data-sanity={heroSublineAttribute?.toString()}
						>
							{content?.hero?.subline || HERO_SUBLINE_DEFAULT}
						</p>



						<HeroStats stats={content?.hero?.stats} variant="dark" />

						<div className="mt-10 flex flex-wrap gap-4">
							<Link
								href="/player-draft"
								className="inline-flex items-center gap-2 rounded-full border border-white px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-white transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:bg-white hover:text-black"
							>
								About the Player Draft
								<span aria-hidden>→</span>
							</Link>
							<Link
								href="#about"
								className="inline-flex items-center gap-2 rounded-full bg-[var(--color-volt)] px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-black transition-all duration-200 hover:-translate-y-1 hover:translate-x-1"
							>
								About the League
							</Link>
						</div>
					</div>
					<div
						id="player-draft"
						data-sanity={
							applicationCardAttribute?.toString() ??
							heroCtaAttribute?.toString()
						}
						className="relative w-full max-w-md lg:self-end lg:translate-y-6"
					>
					<div
						className="pointer-events-none absolute -inset-6 rounded-[44px] bg-white/15 blur-3xl"
						aria-hidden="true"
					/>
						<div className="relative">
							<ApplicationCard
								badge={heroCardBadge}
								title={heroCardTitle}
								description={heroCardDescription}
								ctaText={heroCardCtaText}
								ctaLink={heroCardLink}
								helperText={heroCardHelperText}
								deadlineLabel={heroCardDeadline}
								countdown={countdownConfig}
								resourceEyebrow={heroResourceEyebrow}
								resourceLinkLabel={heroResourceLinkLabel}
								resourceLinkHref={heroResourceLinkHref}
							/>
						</div>
					</div>
				</div>

				{content?.hero?.video?.credit && (
					<p className="brand-caption absolute bottom-6 right-6 text-xs uppercase tracking-[0.3em] text-white/60">
						{content.hero.video.credit}
					</p>
				)}
			</section>

			<section className="relative -mt-16 bg-gradient-to-b from-[#151515] via-[#1b1b1b] to-[#f7f7f2] px-4 pt-28 pb-16">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#151515] via-[#111111]/80 to-transparent" aria-hidden="true" />
				<div className="mx-auto max-w-7xl">
					<div className="rounded-[32px] border border-black/10 bg-[#fdfdf8] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
						<MediaGrid
							images={content?.hero?.images}
							dataAttribute={
								content?._id
									? createDataAttribute({
										id: content._id,
										type: content._type || "homePage",
										path: "hero.images",
									}).toString()
								: undefined
							}
						/>
					</div>
				</div>
			</section>

			<section id="newsletter" className="bg-[#f7f7f2] px-4 py-12">
				<div className="mx-auto max-w-2xl text-center">
								<HeroNewsletterSignup />
				</div>

			</section>


			{/* Press Link CTA */}
			<section
				className="pt-12 bg-white"
				data-sanity={pressCtaAttribute?.toString()}
			>
				<div className="max-w-7xl mx-auto px-4 text-center">
					<Link
						href={pressHref}
						className="inline-flex items-center justify-center gap-2 bg-[var(--color-volt)] border-4 border-black px-8 py-4 text-black font-black uppercase tracking-[0.15em] text-lg hover:translate-x-2 hover:-translate-y-2 transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
					>
						{pressEmoji && <span aria-hidden="true">{pressEmoji}</span>}
						<span>{pressButtonText}</span>
					</Link>
				</div>
			</section>

			{embedEnabled && (
				<ApplicationEmbedSection
					badge={embedBadge}
					title={embedTitle}
					description={embedDescription}
					bulletPoints={embedBullets}
					deadlineNote={embedDeadlineNote}
					formId={applicationEmbedSettings?.formId || applicationFormId}
					height={embedHeight}
					enabled={embedEnabled}
					dataAttribute={applicationEmbedAttribute?.toString()}
				/>
			)}

			{/* About Section */}
			<section
				id="about"
				className="bg-white py-20 md:py-32"
				data-sanity={aboutDataAttribute?.toString()}
			>
				<div className="max-w-7xl mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="text-6xl md:text-7xl font-black uppercase tracking-[0.15em] text-black mb-4">
							ABOUT THE LEAGUE
						</h2>
						<div className="mx-auto h-2 w-24 bg-black" />
					</div>


					{/* Info Box - Point System */}
					<div
						className="max-w-5xl mx-auto mb-20"
						data-sanity={aboutInfoCardAttribute?.toString()}
					>
						<div className="bg-[var(--color-volt)] border-[6px] border-black p-12 md:p-16 transform hover:translate-x-2 hover:-translate-y-2 transition-all duration-200">
							<h3 className="brand-subhead text-3xl md:text-4xl font-black mb-6 uppercase tracking-[0.15em] text-black">
								{infoCardTitle}
							</h3>
							<p className="brand-body text-xl md:text-2xl text-black leading-relaxed font-semibold">
								{infoCardBody}
							</p>
						</div>
					</div>

					{/* Feature Bullets - Flexible Grid Layout */}
					<div
						className={cn(
							"max-w-6xl mx-auto grid gap-6",
							content?.about?.pillars && content.about.pillars.length === 3
								? "md:grid-cols-3"
								: content?.about?.pillars && content.about.pillars.length === 2
									? "md:grid-cols-2 max-w-4xl"
									: content?.about?.pillars &&
											content.about.pillars.length === 1
										? "md:grid-cols-1 max-w-2xl"
										: "md:grid-cols-2",
						)}
					>
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

			{content?.sections &&
				content.sections.length > 0 &&
				content?._id &&
				content._type && (
					<section
						className="bg-white"
						data-sanity={sectionsAttribute?.toString()}
					>
						<SectionsRenderer
							documentId={content._id}
							documentType={content._type}
							sections={normalizedSections}
						/>
					</section>
				)}

			<section className="bg-white py-20">
				<div className="mx-auto max-w-5xl px-4">
					<div className="mb-8 text-center">
						<h3 className="text-4xl font-black uppercase tracking-[0.2em] text-black">
							Stay updated
						</h3>
						<p className="brand-body mt-4 text-lg text-black/70">
							Get news, behind-the-scenes drops, and draft updates from
							Sensational League.
						</p>
					</div>
					<SignupForm />
				</div>
			</section>
		</main>
	);
}
