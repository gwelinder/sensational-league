"use client";

import type { PortableTextBlock } from "@portabletext/types";
import { createDataAttribute } from "@sanity/visual-editing";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CountdownTicker } from "@/components/CountdownTicker";
import { SectionsRenderer } from "@/components/SectionsRenderer";
import StyledTextRenderer from "@/components/StyledTextRenderer";
import TypeformApplyButton from "@/components/TypeformApplyButton";
import TypeformWidget from "@/components/TypeformWidget";
import { getImageUrl } from "@/lib/sanity-image";
import { cn } from "@/lib/utils";

interface Stat {
	value: string;
	label: string;
}

interface Pillar {
	title: string;
	description: string;
}

interface FormatDesignedFor {
	eyebrow?: string;
	description?: string;
	features?: string[];
}

interface CaptainCard {
	name?: string;
	tagline?: string;
	summary?: string;
	superpower?: string;
	oneLiner?: string;
	bio?: string;
	photo?: SanityImage;
	videoUrl?: string;
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
				variants?: {
					wide?: string;
					square?: string;
					vertical?: string;
				};
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
		formatSection?: {
			eyebrow?: string;
			title?: string;
			subtitle?: string;
			coreConcepts?: string[];
			designedFor?: FormatDesignedFor;
		};
		captainsSection?: {
			enabled?: boolean;
			eyebrow?: string;
			title?: string;
			subtitle?: string;
			intro?: string;
			captains?: CaptainCard[];
		};
	};
}

const PLAYER_DRAFT_FORM_ID = "ZmJZ6YB2";
const DEFAULT_TYPEFORM_URL =
	process.env.NEXT_PUBLIC_TYPEFORM_PLAYERDRAFT_URL ||
	`https://form.typeform.com/to/${PLAYER_DRAFT_FORM_ID}`;
const APPLICATION_CTA_TEXT = "Start application";
const DEFAULT_APPLICATION_HELPER_TEXT =
	"Applications are reviewed weekly by the Sensational captains. Early submissions are encouraged.";
const HERO_CARD_DEFAULT_DESCRIPTION = [
	"We are looking for 80 players to join the Sensational League in Copenhagen spring 2026.",
	"You will join a league built around performance, community, visibility, and opportunity.",
	"Submit your application and become one of the Sensational 80.",
].join(" ");
const HERO_SUBLINE_DEFAULT =
	"Sensational League is a new pro 7v7 women's football league built as a sports entertainment experience.";
const HERO_LOCATION_LABEL = "Copenhagen • Spring 2026";
const DEFAULT_EMBED_DESCRIPTION =
	"Submit your application below in Danish or English. Captains and staff receive every submission instantly inside SharePoint so we can follow up with invites, feedback, and next steps.";
const HERO_VIDEO_CDN_BASE =
	"https://sensational-hero-video.generaite.workers.dev";
const HERO_VIDEO_VARIANTS_DEFAULT = {
	wide: `${HERO_VIDEO_CDN_BASE}/hero-wide.mp4`,
	square: `${HERO_VIDEO_CDN_BASE}/hero-square.mp4`,
	vertical: `${HERO_VIDEO_CDN_BASE}/hero-vertical.mp4`,
};
const DEFAULT_HERO_VIDEO_URL = HERO_VIDEO_VARIANTS_DEFAULT.wide;
const DEFAULT_HERO_VIDEO_POSTER = "/logos/image_046_page_39.jpeg";
const DEFAULT_EMBED_BULLETS = [
	"Share your football profile, background, and ambitions",
	"Attach links or handles that showcase how you play and create",
	"Captains review weekly. Early submissions get priority",
];
const DEFAULT_EMBED_DEADLINE_NOTE =
	"Deadline: January 1, 2026 – but we encourage early applications as spots are limited to 80 players.";

const DEFAULT_FORMAT_SECTION = {
	eyebrow: "Our format",
	title: "Purpose-built 7v7",
	subtitle:
		"Football meets a community challenge to score on and off the pitch.",
	coreConcepts: [
		"Eight teams led by Sensational captains compete in a fast, entertainment-driven 7v7 format.",
		"Each team also takes on a Community Challenge—our impact element where players earn points by amplifying women’s sport.",
		"We’re drafting 80 female footballers (17+) for Copenhagen 2026. All positions welcome—we value skill, personality, and creativity.",
		"You don’t need to play at the highest level; commitment, team spirit, and the will to grow matter most.",
	],
	designedFor: {
		eyebrow: "Designed for modern players",
		description:
			"Football that fits real lives: fewer but bigger gamedays, broadcast visibility, and a creator lab that backs every player.",
		features: [
			"Six gamedays · broadcast + live crowd",
			"Community Challenge scoring",
			"Creator lab + content studio",
			"Impact storytelling with partners",
		],
	},
};

const CAPTAIN_VIDEO_DEFAULTS = {
	bettina: `${HERO_VIDEO_CDN_BASE}/captains/bettina`,
	line: `${HERO_VIDEO_CDN_BASE}/captains/line`,
	theresa: `${HERO_VIDEO_CDN_BASE}/captains/theresa`,
	nina: `${HERO_VIDEO_CDN_BASE}/captains/nina`,
	nicoline: `${HERO_VIDEO_CDN_BASE}/captains/nicoline`,
	rikke: `${HERO_VIDEO_CDN_BASE}/captains/rikke`,
};

const DEFAULT_CAPTAINS_SECTION: {
	enabled: boolean;
	eyebrow: string;
	title: string;
	subtitle: string;
	intro: string;
	captains: CaptainCard[];
} = {
	enabled: false,
	eyebrow: "Captains",
	title: "Meet Our Captains",
	subtitle: "Legendary leaders turning the Sensational 80 into a movement.",
	intro:
		"Six icons of Danish football bring elite experience, cultural impact, and unstoppable energy to the league.",
	captains: [
		{
			name: "Bettina Falk",
			tagline: "Defender • 5x Danish Champion • Brøndby Legend",
			summary:
				"Led club and country with grit before reshaping how cities move and play. 56 caps for Denmark, World Cup + Euro appearances, and five titles in six seasons with Brøndby.",
			superpower: "Reading the game and speed",
			oneLiner: "Brøndby Legend x 56 Caps",
			videoUrl: CAPTAIN_VIDEO_DEFAULTS.bettina,
		},
		{
			name: "Line Røddik Hansen",
			tagline: "Defender • Lyon, FC Barcelona & Denmark",
			summary:
				"From the boys’ team in Birkerød to conquering Europe. 132 caps, EURO silver medalist, and one of the few Danes to wear Lyon, Barça, and Ajax shirts.",
			superpower:
				"Calm under chaos—the cooler the crowd, the sharper the tackle.",
			oneLiner: "132 Caps x Lyon, Barca",
			videoUrl: CAPTAIN_VIDEO_DEFAULTS.line,
		},
		{
			name: "Theresa Eslund",
			tagline: "Right Back • 133 Caps • UEFA EURO 2017 Best XI",
			summary:
				"Starred across Norway, USA, Australia, and Denmark. Selected for the UEFA EURO 2017 Best XI and still runs the right side like a highway.",
			superpower: "Relentless drive",
			oneLiner: "133 Caps · UEFA EURO 2017 BEST XI",
			videoUrl: CAPTAIN_VIDEO_DEFAULTS.theresa,
		},
		{
			name: "Nina Frausing Pedersen",
			tagline: "Defender • Liverpool & Fortuna Hjørring",
			summary:
				"International across Denmark, Sweden, Germany, England, and Australia. Played for Liverpool, Turbine Potsdam, Fortuna Hjørring, and Brøndby while earning a PhD.",
			superpower: "Perseverance that wins both matches and PhDs",
			oneLiner: "National Caps x Liverpool, Fortuna Hjørring, Brøndby",
			videoUrl: CAPTAIN_VIDEO_DEFAULTS.nina,
		},
		{
			name: "Nicoline Sørensen",
			tagline: "Forward • Everton & Brøndby • Denmark International",
			summary:
				"One of Denmark’s most electric attackers. 100+ club games across Sweden, Denmark, and England, including 49 for Everton, plus national TV expert commentator.",
			superpower: "Instant change of pace that flips games",
			oneLiner: "54 Caps x Everton striker",
			videoUrl: CAPTAIN_VIDEO_DEFAULTS.nicoline,
		},
		{
			name: "Rikke Sevecke",
			tagline: "Defender • Everton & Portland Thorns",
			summary:
				"Modern centre-back who dominated in Denmark, France, England, and the NWSL before advocating for athlete heart health after retirement.",
			superpower: "Strength with purpose",
			oneLiner: "54 Caps x Everton, Portland Thorns",
			videoUrl: CAPTAIN_VIDEO_DEFAULTS.rikke,
		},
	],
};

type HeroVideoSource =
	| { type: "youtube"; src: string }
	| { type: "video"; src: string };

type HeroVideoVariant = "wide" | "square" | "vertical";

function normalizeUrl(raw?: string | null): string | null {
	if (!raw) return null;
	let value = raw.trim();
	if (!value) return null;
	if (value.startsWith("//")) {
		value = `https:${value}`;
	}
	if (!/^https?:/i.test(value)) {
		value = `https://${value}`;
	}
	return value;
}

function extractYouTubeId(url: string): string | null {
	try {
		const parsed = new URL(url);
		const host = parsed.hostname.replace(/^www\./i, "");
		if (host === "youtube.com" || host === "m.youtube.com") {
			const paramId = parsed.searchParams.get("v");
			if (paramId) {
				return paramId;
			}
			const segments = parsed.pathname.split("/").filter(Boolean);
			if (segments[0] === "embed" || segments[0] === "shorts") {
				return segments[1] || null;
			}
		}
		if (host === "youtu.be") {
			return parsed.pathname.split("/").filter(Boolean)[0] || null;
		}
	} catch {
		return null;
	}
	return null;
}

function getHeroVideoSource(raw?: string | null): HeroVideoSource | null {
	const normalized = normalizeUrl(raw) || normalizeUrl(DEFAULT_HERO_VIDEO_URL);
	if (!normalized) return null;
	const youtubeId = extractYouTubeId(normalized);
	if (youtubeId) {
		const params = new URLSearchParams({
			autoplay: "1",
			mute: "1",
			controls: "0",
			showinfo: "0",
			rel: "0",
			loop: "1",
			playsinline: "1",
			modestbranding: "1",
			playlist: youtubeId,
		});
		return {
			type: "youtube",
			src: `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`,
		};
	}
	return { type: "video", src: normalized };
}

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

// Commented out - not currently used but kept for future reference
/* function HeroNewsletterSignup() {
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
				<p className="text-xs text-black">Thanks! You&apos;re on the list.</p>
			)}
		</form>
	);
}
*/

// Commented out - not currently used but kept for future reference
/* interface CountdownParts {
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
} */

function getInitials(name?: string): string {
	if (!name) return "SL";
	return (
		name
			.split(" ")
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0]?.toUpperCase() ?? "")
			.join("") || "SL"
	);
}

function getCaptainGradient(name?: string) {
	const base = (name || "Sensational").split("").reduce((acc, char, index) => {
		return acc + char.charCodeAt(0) * (index + 1);
	}, 0);
	const hue = base % 360;
	const secondary = (hue + 32) % 360;
	return `linear-gradient(135deg, hsl(${hue}, 65%, 22%), hsl(${secondary}, 70%, 12%))`;
}

function useVideoThumbnail(videoUrl?: string | null) {
	const [thumbnail, setThumbnail] = useState<string | null>(null);

	useEffect(() => {
		const scheduleReset = () => {
			if (typeof queueMicrotask === "function") {
				queueMicrotask(() => setThumbnail(null));
			} else {
				setTimeout(() => setThumbnail(null), 0);
			}
		};

		if (!videoUrl || typeof window === "undefined") {
			scheduleReset();
			return;
		}

		let cancelled = false;
		const video = document.createElement("video");
		video.crossOrigin = "anonymous";
		video.muted = true;
		video.preload = "auto";
		video.playsInline = true;
		video.src = videoUrl;

		const cleanup = () => {
			video.pause();
			video.removeAttribute("src");
			video.load();
		};

		const drawFrame = () => {
			if (!video.videoWidth || !video.videoHeight) return;
			const canvas = document.createElement("canvas");
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			if (!cancelled) {
				setThumbnail(canvas.toDataURL("image/jpeg", 0.85));
			}
		};

		const handleSeeked = () => {
			drawFrame();
			video.removeEventListener("seeked", handleSeeked);
			cleanup();
		};

		const handleLoaded = () => {
			const preferredTime = 6;
			const padding = 0.25;
			const fallbackTime = 0.2;
			const duration = Number.isFinite(video.duration) ? video.duration : 0;
			if (duration && duration > preferredTime + padding) {
				video.currentTime = Math.min(preferredTime, duration - padding);
				return;
			}
			const effectiveDuration = duration > 0 ? duration : fallbackTime * 4;
			const midpoint = effectiveDuration * 0.55;
			const targetTime = Math.min(
				Math.max(midpoint, fallbackTime),
				effectiveDuration - fallbackTime,
			);
			video.currentTime = Number.isFinite(targetTime)
				? targetTime
				: fallbackTime;
		};

		const handleError = () => {
			video.removeEventListener("seeked", handleSeeked);
			cleanup();
		};

		video.addEventListener("loadedmetadata", handleLoaded, { once: true });
		video.addEventListener("loadeddata", handleLoaded, { once: true });
		video.addEventListener("seeked", handleSeeked);
		video.addEventListener("error", handleError, { once: true });

		return () => {
			cancelled = true;
			video.removeEventListener("seeked", handleSeeked);
			cleanup();
			scheduleReset();
		};
	}, [videoUrl]);

	return thumbnail;
}

function CaptainVideoPreview({
	videoUrl,
	posterUrl,
	fallbackInitials,
}: {
	videoUrl?: string | null;
	posterUrl?: string;
	fallbackInitials: string;
}) {
	const [isActive, setIsActive] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const generatedThumbnail = useVideoThumbnail(videoUrl);
	const previewImage = posterUrl || generatedThumbnail || undefined;

	const startPlayback = () => {
		if (!videoUrl) return;
		const instance = videoRef.current;
		if (!instance) return;
		instance.play().catch(() => {
			/* no-op */
		});
	};

	const handlePause = () => setIsActive(false);
	const handlePlay = () => setIsActive(true);

	return (
		<div className="relative aspect-[4/3] w-full overflow-hidden rounded-[26px] border border-white/10 bg-black/60">
			<div
				className={cn(
					"absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center transition-opacity duration-300",
					isActive ? "opacity-0 pointer-events-none" : "opacity-100",
				)}
				style={{
					backgroundImage: previewImage
						? undefined
						: getCaptainGradient(fallbackInitials),
				}}
			>
				{previewImage ? (
					<div className="absolute inset-0">
						<Image
							src={previewImage}
							alt="Captain preview"
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-black/35" />
					</div>
				) : (
					<div className="text-5xl font-black tracking-[0.3em] text-white/70">
						{fallbackInitials}
					</div>
				)}
				{videoUrl ? (
					<button
						type="button"
						onClick={startPlayback}
						className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-black"
					>
						<span>Play film</span>
						<span aria-hidden>▶</span>
					</button>
				) : null}
			</div>
			{videoUrl ? (
				<video
					ref={videoRef}
					className={cn(
						"absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
						isActive
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none",
					)}
					controls
					playsInline
					preload="none"
					poster={previewImage}
					src={videoUrl}
					onPause={handlePause}
					onEnded={handlePause}
					onPlay={handlePlay}
				/>
			) : null}
		</div>
	);
}

// Commented out - not currently used but kept for future reference
/* function useCountdown(deadline?: string) {
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
} */

// Commented out - not currently used but kept for future reference
/* function CountdownTimer({
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
*/

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
	title = "WE’RE LOOKING FOR 80 FOOTBALL PLAYERS",
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

export default function HomePage({ content }: HomePageProps) {
	// SanityLive component in layout.tsx handles live updates automatically
	// No need for manual useOptimistic - it's only needed for drag and drop

	const [heroVideoVariant, setHeroVideoVariant] =
		useState<HeroVideoVariant>("wide");
	const heroVideoSingleUrl = normalizeUrl(content?.hero?.video?.url);
	const heroVariantOverrides = {
		wide: normalizeUrl(content?.hero?.video?.variants?.wide ?? null),
		square: normalizeUrl(content?.hero?.video?.variants?.square ?? null),
		vertical: normalizeUrl(content?.hero?.video?.variants?.vertical ?? null),
	};
	const heroVideoUrls = {
		wide:
			heroVariantOverrides.wide ||
			heroVideoSingleUrl ||
			HERO_VIDEO_VARIANTS_DEFAULT.wide,
		square:
			heroVariantOverrides.square ||
			(heroVideoSingleUrl
				? heroVideoSingleUrl
				: HERO_VIDEO_VARIANTS_DEFAULT.square),
		vertical:
			heroVariantOverrides.vertical ||
			(heroVideoSingleUrl
				? heroVideoSingleUrl
				: HERO_VIDEO_VARIANTS_DEFAULT.vertical),
	};
	const heroVideoSourcesByVariant: Record<
		HeroVideoVariant,
		HeroVideoSource | null
	> = {
		wide: getHeroVideoSource(heroVideoUrls.wide),
		square: getHeroVideoSource(heroVideoUrls.square),
		vertical: getHeroVideoSource(heroVideoUrls.vertical),
	};
	const heroVideoSource =
		heroVideoSourcesByVariant[heroVideoVariant] ||
		heroVideoSourcesByVariant.wide;

	useEffect(() => {
		const determineVariant = (): HeroVideoVariant => {
			if (typeof window === "undefined") return "wide";
			if (window.innerWidth < 640) return "vertical";
			if (window.innerWidth < 1100) return "square";
			return "wide";
		};

		const handleResize = () => {
			setHeroVideoVariant(determineVariant());
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _heroHeadlineAttribute = content?._id
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _heroCountdownAttribute = content?._id
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

	const captainsDataAttribute = content?._id
		? createDataAttribute({
				id: content._id,
				type: content._type || "homePage",
				path: "captainsSection",
			})
		: undefined;

	const normalizedSections: PageSection[] = (content?.sections ?? []).map(
		(section, index) => ({
			...section,
			_key: section._key ?? `section-${index}`,
			_type: section._type ?? "contentSection",
		}),
	) as PageSection[];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _pressCtaAttribute = content?._id
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

	const heroVideoPosterFromSanity = content?.hero?.video?.poster
		? (getImageUrl(content.hero.video.poster, 2400) ?? undefined)
		: undefined;
	const heroPosterUrl = heroVideoPosterFromSanity || DEFAULT_HERO_VIDEO_POSTER;
	const heroVideoObjectFit = heroVideoVariant === "wide" ? "contain" : "cover";
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _pressButtonText =
		content?.pressCta?.buttonText || content?.pressCta?.label || "News";
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _pressEmoji = content?.pressCta?.emoji || "📰";
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _pressHref = content?.pressCta?.href || "/press";

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

	const formatSection = content?.formatSection;
	const designedFor = {
		eyebrow:
			formatSection?.designedFor?.eyebrow ||
			DEFAULT_FORMAT_SECTION.designedFor?.eyebrow,
		description:
			formatSection?.designedFor?.description ||
			DEFAULT_FORMAT_SECTION.designedFor?.description,
		features: formatSection?.designedFor?.features?.length
			? formatSection?.designedFor?.features
			: DEFAULT_FORMAT_SECTION.designedFor?.features,
	};

const captainsSection = content?.captainsSection;
	const captainsEyebrow =
		captainsSection?.eyebrow || DEFAULT_CAPTAINS_SECTION.eyebrow;
	const captainsTitle =
		captainsSection?.title || DEFAULT_CAPTAINS_SECTION.title;
	const captainsSubtitle =
		captainsSection?.subtitle || DEFAULT_CAPTAINS_SECTION.subtitle;
	const captainsIntro =
		captainsSection?.intro || DEFAULT_CAPTAINS_SECTION.intro;
const captainsList = captainsSection?.captains?.length
	? captainsSection.captains
	: DEFAULT_CAPTAINS_SECTION.captains;
const captainsEnabled =
	(captainsSection?.enabled ?? DEFAULT_CAPTAINS_SECTION.enabled) &&
	captainsList.length > 0;

	return (
		<main className="min-h-screen bg-white">
			{/* Hero Section */}
		<section
			className="relative overflow-hidden bg-[#020202] px-4 pb-24 pt-20 text-white"
			data-sanity={heroDataAttribute?.toString()}
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-60"
				style={{
					background:
						"radial-gradient(circle at 15% 10%, rgba(212,255,0,0.08), transparent 55%), radial-gradient(circle at 80% 6%, rgba(255,255,255,0.12), transparent 40%)",
				}}
			/>
			<div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
				<div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.25fr)_380px]">
					<div className="space-y-8">
								<div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/60 px-5 py-2 text-[0.65rem] font-black uppercase tracking-[0.35em]">
									<span>Copenhagen</span>
									<span>Season 01</span>
								</div>
								<Image
									src="/logos/SL-LOCKUP-WITH-TAGLINE.svg"
									alt="Sensational League"
									width={420}
									height={200}
									className="w-full max-w-[420px] drop-shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
									priority
								/>
								<p className="brand-caption text-xs uppercase tracking-[0.4em] text-white/70">
									{HERO_LOCATION_LABEL}
								</p>
								<p
									className="brand-body max-w-2xl text-base text-white/85"
									data-sanity={heroSublineAttribute?.toString()}
								>
									{content?.hero?.subline || HERO_SUBLINE_DEFAULT}
								</p>
								<HeroStats stats={content?.hero?.stats} variant="dark" />
								{/* Countdown Ticker */}
								{countdownConfig?.enabled !== false && (
									<CountdownTicker
										deadline={countdownConfig?.deadline || "2026-01-01T00:00:00"}
										label={countdownConfig?.label || "Application deadline"}
										timezone={countdownConfig?.timezone || "CET"}
										variant="dark"
									/>
								)}
								<div className="flex flex-wrap gap-4">
									<Link
										href="/player-draft"
										className="inline-flex items-center gap-2 rounded-full border border-white px-6 py-3 text-xs font-black uppercase tracking-[0.3em] text-white transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:bg-white hover:text-black"
									>
										About the Player Draft
										<span aria-hidden>→</span>
									</Link>
									<Link
										href="#about"
										className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-xs font-black uppercase tracking-[0.3em] text-white transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:bg-white hover:text-black"
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
					>
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
		</section>

		{heroVideoSource && (
			<>
				<section className="relative -mt-12 bg-[#050505] px-4 pb-48 pt-16 text-white">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,255,0,0.06),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.1),transparent_40%)] opacity-60" />
					<div className="relative mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-10">
						<div className="flex flex-wrap items-center justify-between gap-4">
							<div>
								<p className="brand-caption text-xs uppercase tracking-[0.35em] text-white/60">
									Season film
								</p>
								<h3 className="mt-2 text-3xl font-black uppercase tracking-[0.18em]">
									Fast. Rebellious. Female.
								</h3>
							</div>
							<div className="flex items-center gap-3">
								<span className="brand-caption text-[0.6rem] uppercase tracking-[0.35em] text-white">
									Sound on
								</span>
								{content?.hero?.video?.credit && (
									<p className="brand-caption text-[0.6rem] uppercase tracking-[0.35em] text-white/60">
										{content.hero.video.credit}
									</p>
								)}
							</div>
						</div>
						<div className="relative aspect-[9/13] w-full overflow-hidden rounded-[32px] border border-white/10 bg-black/40 shadow-[0_50px_140px_rgba(0,0,0,0.55)] sm:aspect-video">
							{heroVideoSource.type === "youtube" ? (
								<iframe
									title="Sensational League hero video"
									src={`${heroVideoSource.src}&controls=1`}
									className="absolute inset-0 h-full w-full"
									allow="autoplay; fullscreen; picture-in-picture"
									allowFullScreen
									loading="lazy"
									referrerPolicy="strict-origin-when-cross-origin"
									style={{ border: "none" }}
								/>
							) : (
								<video
									className="absolute inset-0 h-full w-full object-cover"
									style={{ objectFit: heroVideoObjectFit }}
									src={heroVideoSource.src}
					/* 				poster={heroPosterUrl} */
									playsInline
									loop
									muted
									autoPlay
									controls
									preload="metadata"
								/>
							)}
						</div>
					</div>
				</section>
			</>
		)}
		{!heroVideoSource && (
			<div className="relative z-0 -mt-16 h-24 bg-gradient-to-b from-[#050505] via-[#0d0d0d] to-[#f8f8f0]" />
		)}

			{/* 			<section id="newsletter" className="bg-[#f7f7f2] px-4 py-12">
				<div className="mx-auto max-w-2xl text-center">
								<HeroNewsletterSignup />
				</div>

			</section> */}

			{/* Press Link CTA */}
			{/* 			<section
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
			</section> */}

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
				className="relative z-10 -mt-24 rounded-t-[80px] bg-[#f8f8f0] px-4 pb-36 pt-40 text-black shadow-[0_-40px_120px_rgba(0,0,0,0.35)]"
				data-sanity={aboutDataAttribute?.toString()}
			>
				<div className="mx-auto max-w-7xl space-y-20">
					<div
						className="text-center space-y-5"
						data-sanity={aboutTitleAttribute?.toString()}
					>
						{content?.about?.title ? (
							<StyledTextRenderer
								value={content.about.title}
								className="text-5xl md:text-6xl font-black uppercase tracking-[0.12em] text-black"
							/>
						) : (
							<h2 className="text-5xl md:text-6xl font-black uppercase tracking-[0.15em] text-black">
								ABOUT THE LEAGUE
							</h2>
						)}
						<div className="mx-auto h-1 w-24 bg-[var(--color-volt)]" />
					</div>

					<div className="grid gap-10">
						<div
							className="rounded-[40px] border-4 border-black bg-[var(--color-volt)] p-12 text-black shadow-[12px_12px_0px_rgba(0,0,0,0.95)]"
							data-sanity={aboutInfoCardAttribute?.toString()}
						>
							<p className="brand-caption text-xs uppercase tracking-[0.35em] text-black/60">
								THE FORMAT ENGINE
							</p>
							<h3 className="brand-subhead mt-3 text-3xl md:text-4xl font-black uppercase tracking-[0.15em]">
								{infoCardTitle}
							</h3>
							<p className="brand-body mt-6 text-xl md:text-2xl font-semibold leading-relaxed">
								{infoCardBody}
							</p>
						</div>
						<div className="grid gap-6 md:grid-cols-3">
							{(content?.about?.pillars && content.about.pillars.length > 0
								? content.about.pillars
								: [
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
									]
							).map((pillar, index) => (
								<div
									key={`${pillar.title}-${index}`}
									className="flex flex-col justify-between rounded-[32px] border-2 border-black bg-white p-8 text-left shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)]"
									data-sanity={
										content?._id && content?.about?.pillars
											? createDataAttribute({
													id: content._id,
													type: content._type || "homePage",
													path: `about.pillars[${index}]`,
												})?.toString()
											: undefined
									}
								>
									<div>
										<p className="brand-caption mb-4 text-xs uppercase tracking-[0.3em] text-black/50">
											{pillar.title}
										</p>
										<p className="brand-body text-lg font-medium leading-relaxed text-black">
											{pillar.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-[40px] border-4 border-black bg-black p-8 md:p-12 text-white shadow-[16px_16px_0_rgba(0,0,0,0.85)]">
						<div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
							<div className="space-y-6">
								<h3 className="text-3xl md:text-4xl font-black uppercase tracking-[0.15em] text-white">
									{designedFor.eyebrow}
								</h3>
								<p className="brand-body text-lg text-white/80 leading-relaxed">
									{designedFor.description}
								</p>
							</div>
							<ul className="grid gap-4 sm:grid-cols-2">
								{designedFor.features?.map((feature) => (
									<li
										key={feature}
										className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-[var(--color-volt)]/50 hover:bg-white/10"
									>
										<span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[var(--color-volt)] shadow-[0_0_12px_rgba(212,255,0,0.6)]" />
										<span className="text-xs font-black uppercase tracking-[0.15em] text-white/90 leading-snug">
											{feature}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

		{captainsEnabled && (
		<section
			id="captains"
			className="bg-black px-4 py-24 text-white"
			data-sanity={captainsDataAttribute?.toString()}
		>
				<div className="mx-auto max-w-7xl space-y-12">
					<div className="text-center space-y-4">
						<p className="brand-caption text-xs uppercase tracking-[0.35em] text-white/60">
							{captainsEyebrow}
						</p>
						<h2 className="text-5xl font-black uppercase tracking-[0.18em]">
							{captainsTitle}
						</h2>
						{captainsSubtitle && (
							<p className="brand-body mx-auto max-w-3xl text-base text-white/70">
								{captainsSubtitle}
							</p>
						)}
						{captainsIntro && (
							<p className="brand-body mx-auto max-w-3xl text-sm text-white/60">
								{captainsIntro}
							</p>
						)}
					</div>
					<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{captainsList.map((captain, index) => {
							const initials = getInitials(captain.name);
							const videoUrl = normalizeUrl(captain.videoUrl);
							const posterUrl = captain.photo
								? (getImageUrl(captain.photo, 1200) ?? undefined)
								: undefined;
							const captainSlug = captain.name
								?.toLowerCase()
								.replace(/\s+/g, "-")
								.replace(/[æå]/g, "a")
								.replace(/[ø]/g, "o");
						return (
							<article
								key={`${captain.name ?? "captain"}-${index}`}
								className="group flex h-full flex-col gap-5 rounded-[32px] border border-white/10 bg-white/[0.07] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur"
							>
								<CaptainVideoPreview
									videoUrl={videoUrl}
									posterUrl={posterUrl}
									fallbackInitials={initials}
								/>
					<div className="flex h-full flex-1 flex-col gap-4">
									<p className="brand-caption text-[0.6rem] uppercase tracking-[0.35em] text-white/55">
										{captain.tagline}
									</p>
									<div className="flex flex-wrap items-baseline gap-3">
										<h3 className="text-2xl font-black uppercase tracking-[0.22em]">
											{captain.name}
										</h3>
										{captain.oneLiner && (
											<span className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">
												{captain.oneLiner}
											</span>
										)}
									</div>
								{captain.summary && (
									<p className="brand-body text-sm leading-relaxed text-white/80 min-h-[110px]">
										{captain.summary}
									</p>
								)}
								<div className="mt-auto flex flex-wrap gap-3 text-[0.62rem] font-black uppercase tracking-[0.3em]">
									{captain.superpower && (
										<span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-volt)]/50 bg-[var(--color-volt)]/10 px-4 py-1 text-[var(--color-volt)]">
											<span>Superpower</span>
											<span className="tracking-normal text-white">
												{captain.superpower}
											</span>
										</span>
									)}
								</div>
								{captainSlug && (
									<Link
										href={`/captains/${captainSlug}`}
										className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-volt)] transition-colors hover:text-white"
									>
										View Profile
										<span aria-hidden>→</span>
									</Link>
								)}
								</div>
							</article>
						);
						})}
					</div>
					<div className="mt-12 text-center">
						<Link
							href="/captains"
							className={cn(
								"inline-flex items-center gap-3 rounded-none border-2 border-[var(--color-volt)]",
								"bg-transparent px-8 py-4 text-sm font-black uppercase tracking-[0.3em] text-[var(--color-volt)]",
								"transition-all duration-200 hover:bg-[var(--color-volt)] hover:text-black"
							)}
						>
							Meet All Captains
							<span aria-hidden>→</span>
						</Link>
					</div>
				</div>
		</section>
		)}

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
