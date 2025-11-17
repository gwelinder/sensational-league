import { createDataAttribute } from "@sanity/visual-editing";
import { draftMode } from "next/headers";
import CountdownTicker from "@/components/CountdownTicker";
import { Logo } from "@/components/Logo";
import TypeformApplyButton from "@/components/TypeformApplyButton";
import { sanityFetch } from "@/sanity/lib/live";

const DEFAULT_FORM_ID = "ZmJZ6YB2";
const DEFAULT_TYPEFORM_URL =
	process.env.NEXT_PUBLIC_TYPEFORM_PLAYERDRAFT_URL ||
	`https://form.typeform.com/to/${DEFAULT_FORM_ID}`;
const DEFAULT_APPLICATION_DEADLINE = "2026-01-01T23:59:59+01:00";
const DEFAULT_PAGE_TITLE = "Player Draft | Sensational League";
const DEFAULT_PAGE_DESCRIPTION =
	"Apply to join the Sensational League player draft and become part of the inaugural season launching in Copenhagen spring 2026.";
const DEFAULT_HERO_LOCATION_LABEL = "Copenhagen • Spring 2026";
const DEFAULT_HERO_HEADLINE = "Join the Sensational 80";
const DEFAULT_HERO_DESCRIPTION =
	"We&apos;re recruiting 80 footballers to launch Sensational League. Captains are looking for players who can compete, create, and grow women&apos;s football.";
const DEFAULT_APPLICATION_HELPER_TEXT =
	"Captains review weekly. Early submissions are encouraged so your profile is in the first batch.";
const DEFAULT_FINAL_CTA_HELPER =
	"Women’s football is moving fast. Secure your spot in the Sensational draft before the window closes.";

const DEFAULT_HERO_NAV_BUTTONS = [
	{ label: "How it works", href: "#how-it-works" },
	{ label: "Timeline", href: "#timeline" },
	{ label: "FAQ", href: "#faq" },
];

const DEFAULT_HERO_HIGHLIGHTS = [
	{ label: "Campaign window", value: "Nov 17 2025 – Jan 1 2026" },
	{ label: "Format", value: "7v7 football + community impact" },
	{ label: "Location", value: "Copenhagen, Denmark" },
];

const DEFAULT_APPLICATION_SNAPSHOT = [
	{ label: "Player profile", value: "Female players 17+, all positions" },
	{
		label: "What captains assess",
		value: "Football IQ, team spirit, content energy",
	},
	{ label: "Timeline", value: "Apps close Jan 1 • Offers out mid-Jan" },
];

const DEFAULT_LEAGUE_INTRO_PARAGRAPHS = [
	"Sensational League is an international 7v7 professional women’s football league launching its first season in Copenhagen in April 2026, before expanding to the UK and the US.",
	"Eight teams. Legendary captains. High-tempo matches. Festival-style game days. A sports entertainment format built for modern players and modern audiences.",
];

const DEFAULT_DRAFT_STEPS = [
	{
		title: "Complete the online application",
		description:
			"Fill in the player draft questionnaire—this is where captains learn your football profile, spark, and availability.",
	},
	{
		title: "Weekly captain reviews",
		description:
			"Applications are reviewed continuously by all Sensational captains together with the Saga team.",
	},
	{
		title: "Selections & invitations",
		description:
			"Selected players are invited to training sessions plus a Team & Player Placement Day where captains reveal the first eight teams.",
	},
	{
		title: "Community-first promise",
		description:
			"If you’re not selected this season, you stay in the Sensational community with access to gamedays, events, and future draft windows.",
	},
];

const DEFAULT_DRAFT_CTA = {
	eyebrow: "Ready to apply?",
	title:
		"If you’re a female footballer ready for a new kind of league, start now.",
	helper: DEFAULT_FINAL_CTA_HELPER,
	ctaText: "Apply here",
	ctaLink: DEFAULT_TYPEFORM_URL,
};

const DEFAULT_FAQ_ITEMS = [
	{
		question: "Who can apply?",
		answer:
			"Female football players aged 17 and up, with focus on Danish and Nordic players close to Copenhagen. All positions and talents are welcome if you’re serious and ready to grow.",
	},
	{
		question: "Do I need to play in a club?",
		answer:
			"No. Club players and community footballers are equally welcome—talent, energy, and mindset are what matter most.",
	},
	{
		question: "Is this a paid league?",
		answer:
			"Yes. Sensational League is a professional 7v7 format where players are paid for six game days and can unlock extra opportunities via content, events, and partnerships.",
	},
	{
		question: "What’s the timeline?",
		answer:
			"Applications close January 1, 2026. Captains review on an ongoing basis. Selected players join preseason activities plus football and media days in Feb/March 2026. The league kicks off April 2026 in Copenhagen.",
	},
	{
		question: "How are players selected?",
		answer:
			"Applications go straight to the Sensational captains and staff, who assess every applicant to build eight equally strong teams.",
	},
	{
		question: "Can I study or work while playing?",
		answer:
			"Yes. The format is built for modern players—fewer but longer game days with flexible schedules so you can balance football with studies or work.",
	},
	{
		question: "What happens if I’m not selected?",
		answer:
			"You remain part of the Sensational community with chances to join gamedays, community work, sports bar events, and future draft opportunities.",
	},
];

const DEFAULT_CONTACTS = [
	{
		label: "Communications team",
		value: "comms@sagasportsgroup.com",
		link: "mailto:comms@sagasportsgroup.com",
	},
	{
		label: "Mette Bom, Head of Communications",
		value: "mbom@sagasportsgroup.com",
		link: "mailto:mbom@sagasportsgroup.com",
	},
	{
		label: "Elvira Meyer, Communications Manager",
		value: "emeyer@sagasportsgroup.com",
		link: "mailto:emeyer@sagasportsgroup.com",
	},
];

const DEFAULT_TIMELINE_MILESTONES = [
	{
		period: "Nov–Dec 2025",
		title: "Applications open",
		description:
			"Captains meet weekly to review submissions and flag talent for invites.",
	},
	{
		period: "Jan 2026",
		title: "Player invitations",
		description:
			"Selected players receive offers and attend the Player Placement Day.",
	},
	{
		period: "Feb–Mar 2026",
		title: "Preseason + media labs",
		description:
			"Football sessions plus creator training, story labs, and community planning.",
	},
	{
		period: "Apr 2026",
		title: "Season One kickoff",
		description:
			"Copenhagen festival gamedays launch the Sensational League era.",
	},
];

const DEFAULT_IMPACT_PILLARS = [
	{
		title: "Performance",
		description:
			"High-tempo 7v7 football fronted by legendary captains and powered by creator-grade coaching.",
	},
	{
		title: "Visibility",
		description:
			"Embedded media crew, live storytelling, and partnerships that put players in front of global audiences.",
	},
	{
		title: "Community",
		description:
			"Each team drives a Community Challenge that earns points for amplifying women’s sport beyond the pitch.",
	},
	{
		title: "Opportunity",
		description: "Paid match days and commercial spotlights.",
	},
];

const DEFAULT_TIMELINE_EYEBROW = "Launch timeline";
const DEFAULT_TIMELINE_TITLE = "Season roadmap";
const DEFAULT_TIMELINE_SUBTITLE =
	"Everything between the application window and kickoff.";
const DEFAULT_ABOUT_EYEBROW = "About the league & player draft";
const DEFAULT_ABOUT_TITLE = "Fast. Rebellious. Female.";
const DEFAULT_ABOUT_SUBTITLE =
	"International 7v7 built for storyteller-athletes.";
const DEFAULT_DRAFT_EYEBROW = "How the player draft works";
const DEFAULT_DRAFT_TITLE = "Four moves to join";
const DEFAULT_DRAFT_SUBTITLE =
	"Deadline: January 1, 2026 — early applications reviewed weekly.";
const DEFAULT_FAQ_EYEBROW = "FAQ";
const DEFAULT_FAQ_TITLE = "Frequently asked questions";
const DEFAULT_FAQ_SUBTITLE = "The essentials you need to know, contact us for more.";
const DEFAULT_CONTACT_EYEBROW = "Contact";
const DEFAULT_CONTACT_TITLE = "Need clarity?";
const DEFAULT_CONTACT_SUBTITLE =
	"Reach out to the Sensational communications team.";

interface Highlight {
	label?: string;
	value?: string;
}

interface NavButton {
	label?: string;
	href?: string;
}

interface SnapshotItem {
	label?: string;
	value?: string;
}

interface Milestone {
	period?: string;
	title?: string;
	description?: string;
}

interface Pillar {
	title?: string;
	description?: string;
}

interface CountdownConfig {
	enabled?: boolean;
	label?: string;
	deadline?: string;
	timezone?: string;
}

interface Step {
	title?: string;
	description?: string;
}

interface FaqItem {
	question?: string;
	answer?: string;
}

interface ContactItem {
	label?: string;
	value?: string;
	link?: string;
}

interface PlayerDraftContent {
	_id: string;
	_type: string;
	title?: string;
	seo?: {
		metaTitle?: string;
		metaDescription?: string;
	};
	hero?: {
		locationLabel?: string;
		headline?: string;
		description?: string;
		highlights?: Highlight[];
		navButtons?: NavButton[];
		application?: {
			eyebrow?: string;
			title?: string;
			deadlineLabel?: string;
			helperText?: string;
			ctaText?: string;
			ctaLink?: string;
			countdown?: CountdownConfig;
			snapshotItems?: SnapshotItem[];
		};
	};
	timeline?: {
		eyebrow?: string;
		title?: string;
		subtitle?: string;
		milestones?: Milestone[];
	};
	about?: {
		eyebrow?: string;
		title?: string;
		subtitle?: string;
		paragraphs?: string[];
		pillars?: Pillar[];
	};
	draftStepsSection?: {
		eyebrow?: string;
		title?: string;
		subtitle?: string;
		steps?: Step[];
		cta?: {
			eyebrow?: string;
			title?: string;
			helper?: string;
			ctaText?: string;
			ctaLink?: string;
		};
	};
	faqSection?: {
		eyebrow?: string;
		title?: string;
		subtitle?: string;
		items?: FaqItem[];
	};
	contactSection?: {
		eyebrow?: string;
		title?: string;
		subtitle?: string;
		contacts?: ContactItem[];
	};
}

const PLAYER_DRAFT_QUERY = `*[_type == "playerDraftPage"][0] {
	_id,
	_type,
	title,
	seo {
		metaTitle,
		metaDescription
	},
	hero {
		locationLabel,
		headline,
		description,
		highlights[] {
			label,
			value
		},
		navButtons[] {
			label,
			href
		},
		application {
			eyebrow,
			title,
			deadlineLabel,
			helperText,
			ctaText,
			ctaLink,
			countdown {
				enabled,
				label,
				deadline,
				timezone
			},
			snapshotItems[] {
				label,
				value
			}
		}
	},
	timeline {
		eyebrow,
		title,
		subtitle,
		milestones[] {
			period,
			title,
			description
		}
	},
	about {
		eyebrow,
		title,
		subtitle,
		paragraphs,
		pillars[] {
			title,
			description
		}
	},
	draftStepsSection {
		eyebrow,
		title,
		subtitle,
		steps[] {
			title,
			description
		},
		cta {
			eyebrow,
			title,
			helper,
			ctaText,
			ctaLink
		}
	},
	faqSection {
		eyebrow,
		title,
		subtitle,
		items[] {
			question,
			answer
		}
	},
	contactSection {
		eyebrow,
		title,
		subtitle,
		contacts[] {
			label,
			value,
			link
		}
	}
}`;

async function getPlayerDraftPageData(): Promise<PlayerDraftContent | null> {
	const { data } = await sanityFetch({
		query: PLAYER_DRAFT_QUERY,
	});
	return data as PlayerDraftContent | null;
}

function getDataAttribute(
	content: PlayerDraftContent | undefined,
	path: string,
) {
	if (!content?._id) return undefined;
	return createDataAttribute({
		id: content._id,
		type: content._type || "playerDraftPage",
		path,
	}).toString();
}

function SectionHeader({
	eyebrow,
	title,
	subtitle,
	invert = false,
}: {
	eyebrow: string;
	title: string;
	subtitle?: string;
	invert?: boolean;
}) {
	return (
		<div className="space-y-2">
			<p
				className={`brand-caption text-[0.7rem] uppercase tracking-[0.3em] ${invert ? "text-white/80" : "text-black/70"}`}
			>
				{eyebrow}
			</p>
			<h2
				className={`text-3xl font-black uppercase tracking-[0.16em] sm:text-4xl ${invert ? "text-white" : "text-black"}`}
			>
				{title}
			</h2>
			{subtitle ? (
				<p
					className={`brand-body text-base leading-relaxed ${invert ? "text-white/80" : "text-black/70"}`}
				>
					{subtitle}
				</p>
			) : null}
		</div>
	);
}

function PlayerDraftPageContent({ content }: { content?: PlayerDraftContent }) {
	const heroNavButtons = content?.hero?.navButtons?.length
		? content.hero.navButtons
		: DEFAULT_HERO_NAV_BUTTONS;
	const heroHighlights = content?.hero?.highlights?.length
		? content.hero.highlights
		: DEFAULT_HERO_HIGHLIGHTS;
	const heroLocationLabel =
		content?.hero?.locationLabel || DEFAULT_HERO_LOCATION_LABEL;
	const heroHeadline = content?.hero?.headline || DEFAULT_HERO_HEADLINE;
	const heroDescription =
		content?.hero?.description || DEFAULT_HERO_DESCRIPTION;
	const heroApplication = content?.hero?.application;
	const heroApplicationEyebrow =
		heroApplication?.eyebrow || "Player draft window";
	const heroApplicationTitle =
		heroApplication?.title || "Applications close Jan 1, 2026";
	const heroApplicationHelperText =
		heroApplication?.helperText || DEFAULT_APPLICATION_HELPER_TEXT;
	const heroApplicationDeadlineLabel = heroApplication?.deadlineLabel;
	const heroApplicationCtaText =
		heroApplication?.ctaText || "Start application";
	const heroApplicationCtaLink =
		heroApplication?.ctaLink || DEFAULT_TYPEFORM_URL;
	const heroSnapshotItems = heroApplication?.snapshotItems?.length
		? heroApplication.snapshotItems
		: DEFAULT_APPLICATION_SNAPSHOT;
	const heroCountdown = heroApplication?.countdown;
	const countdownEnabled = heroCountdown?.enabled ?? true;
	const countdownDeadline = countdownEnabled
		? heroCountdown?.deadline || DEFAULT_APPLICATION_DEADLINE
		: undefined;
	const countdownLabel = heroCountdown?.label || "Countdown";
	const countdownTimezone = heroCountdown?.timezone || "CET";

	const timelineSection = content?.timeline;
	const timelineMilestones = timelineSection?.milestones?.length
		? timelineSection.milestones
		: DEFAULT_TIMELINE_MILESTONES;
	const timelineEyebrow = timelineSection?.eyebrow || DEFAULT_TIMELINE_EYEBROW;
	const timelineTitle = timelineSection?.title || DEFAULT_TIMELINE_TITLE;
	const timelineSubtitle =
		timelineSection?.subtitle || DEFAULT_TIMELINE_SUBTITLE;

	const aboutSection = content?.about;
	const aboutEyebrow = aboutSection?.eyebrow || DEFAULT_ABOUT_EYEBROW;
	const aboutTitle = aboutSection?.title || DEFAULT_ABOUT_TITLE;
	const aboutSubtitle = aboutSection?.subtitle || DEFAULT_ABOUT_SUBTITLE;
	const leagueIntroParagraphs = aboutSection?.paragraphs?.length
		? aboutSection.paragraphs
		: DEFAULT_LEAGUE_INTRO_PARAGRAPHS;
	const impactPillars = aboutSection?.pillars?.length
		? aboutSection.pillars
		: DEFAULT_IMPACT_PILLARS;

	const draftSection = content?.draftStepsSection;
	const draftEyebrow = draftSection?.eyebrow || DEFAULT_DRAFT_EYEBROW;
	const draftTitle = draftSection?.title || DEFAULT_DRAFT_TITLE;
	const draftSubtitle = draftSection?.subtitle || DEFAULT_DRAFT_SUBTITLE;
	const draftSteps = draftSection?.steps?.length
		? draftSection.steps
		: DEFAULT_DRAFT_STEPS;
	const draftCta = {
		...DEFAULT_DRAFT_CTA,
		...draftSection?.cta,
		ctaLink: draftSection?.cta?.ctaLink || DEFAULT_DRAFT_CTA.ctaLink,
	};
	const finalCtaLink = draftCta.ctaLink || heroApplicationCtaLink;
	const finalCtaText = draftCta.ctaText || "Apply here";
	const finalCtaHelper = draftCta.helper || DEFAULT_FINAL_CTA_HELPER;

	const faqSection = content?.faqSection;
	const faqEyebrow = faqSection?.eyebrow || DEFAULT_FAQ_EYEBROW;
	const faqTitle = faqSection?.title || DEFAULT_FAQ_TITLE;
	const faqSubtitle = faqSection?.subtitle || DEFAULT_FAQ_SUBTITLE;
	const faqItems = faqSection?.items?.length
		? faqSection.items
		: DEFAULT_FAQ_ITEMS;

	const contactSection = content?.contactSection;
	const contactEyebrow = contactSection?.eyebrow || DEFAULT_CONTACT_EYEBROW;
	const contactTitle = contactSection?.title || DEFAULT_CONTACT_TITLE;
	const contactSubtitle = contactSection?.subtitle || DEFAULT_CONTACT_SUBTITLE;
	const contacts = contactSection?.contacts?.length
		? contactSection.contacts
		: DEFAULT_CONTACTS;

	const heroDataAttribute = getDataAttribute(content, "hero");
	const heroApplicationAttribute = getDataAttribute(
		content,
		"hero.application",
	);
	const timelineDataAttribute = getDataAttribute(content, "timeline");
	const aboutDataAttribute = getDataAttribute(content, "about");
	const draftDataAttribute = getDataAttribute(content, "draftStepsSection");
	const faqDataAttribute = getDataAttribute(content, "faqSection");
	const contactDataAttribute = getDataAttribute(content, "contactSection");

	return (
		<main className="bg-[#F7F7F7] text-black">
			<section
				className="relative isolate overflow-hidden bg-white px-4 pb-24 pt-20 text-black shadow-[0_35px_120px_rgba(0,0,0,0.08)]"
				data-sanity={heroDataAttribute}
			>
				<div
					className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/5 to-transparent"
					aria-hidden
				/>
				<div
					className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#F4F4EF]"
					aria-hidden
				/>
				<div
					className="absolute -right-20 top-8 hidden h-72 w-72 rounded-full border border-black/10 lg:block"
					aria-hidden
				/>
				<div className="relative mx-auto grid max-w-6xl gap-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
					<div className="space-y-6">
						<p className="brand-caption text-xs uppercase tracking-[0.45em] text-black/60">
							{heroLocationLabel}
						</p>

						<h1 className="text-4xl font-black uppercase leading-tight tracking-[0.08em] text-black sm:text-6xl">
							{heroHeadline}
						</h1>
						<p className="brand-body text-lg text-black/75">
							{heroDescription}
						</p>
						<div className="mt-8 grid gap-4 sm:grid-cols-3">
							{heroHighlights.map((item) => (
								<div
									key={`${item.label ?? item.value ?? "highlight"}`}
									className="rounded-2xl border border-black/10 bg-[#F7F7F7] p-4"
								>
									<p className="brand-caption text-[0.65rem] uppercase tracking-[0.35em] text-black/50">
										{item.label}
									</p>
									<p className="mt-2 text-base font-black uppercase tracking-[0.12em] text-black">
										{item.value}
									</p>
								</div>
							))}
						</div>
						<div className="mt-10 flex flex-wrap gap-4">
							{heroNavButtons.map((button, index) => {
								const isPrimary = index === 0;
								const emphasisClass = isPrimary
									? "text-black"
									: "text-black/70";
								return (
									<a
										key={`${button.label ?? button.href ?? index}`}
										href={button.href || "#"}
										className={`inline-flex items-center justify-center rounded-full border border-black px-7 py-3 text-xs font-black uppercase tracking-[0.3em] transition-colors hover:bg-black hover:text-white ${emphasisClass}`}
									>
										{button.label || "Learn more"}
									</a>
								);
							})}
						</div>
					</div>
					<div
						className="rounded-[32px] border-2 border-black bg-white p-8 shadow-[18px_18px_0px_rgba(35,35,36,0.85)]"
						data-sanity={heroApplicationAttribute}
					>
						<p className="brand-caption text-xs uppercase tracking-[0.4em] text-black/60">
							{heroApplicationEyebrow}
						</p>
						<h3 className="mt-2 text-3xl font-black uppercase tracking-[0.2em] text-black">
							{heroApplicationTitle}
						</h3>
						{countdownDeadline ? (
							<CountdownTicker
								deadline={countdownDeadline}
								label={countdownLabel}
								timezone={countdownTimezone}
								variant="light"
								className="mt-6"
							/>
						) : null}
						<ul className="mt-6 space-y-4">
							{heroSnapshotItems.map((item, index) => (
								<li
									key={`${item.label ?? item.value ?? index}`}
									className="flex flex-col gap-1"
								>
									<span className="brand-caption text-[0.65rem] uppercase tracking-[0.35em] text-black/50">
										{item.label}
									</span>
									<span className="text-base font-black uppercase tracking-[0.12em] text-black">
										{item.value}
									</span>
								</li>
							))}
						</ul>
						<TypeformApplyButton
							formUrl={heroApplicationCtaLink}
							className="brand-caption mt-8 w-full rounded-2xl border-2 border-black bg-[var(--color-volt)] px-6 py-4 text-center text-xs font-black uppercase tracking-[0.3em] text-black transition-all hover:-translate-y-0.5 hover:translate-x-0.5"
						>
							<span>{heroApplicationCtaText}</span>
							<span aria-hidden className="ml-1">
								→
							</span>
						</TypeformApplyButton>
						{heroApplicationDeadlineLabel ? (
							<p className="brand-caption mt-4 text-xs uppercase tracking-[0.3em] text-black/60">
								{heroApplicationDeadlineLabel}
							</p>
						) : null}
						<p className="brand-body mt-3 text-sm text-black/65">
							{heroApplicationHelperText}
						</p>
					</div>
				</div>
			</section>
			<section
				className="bg-[#F2F2EC] px-4 pb-16 pt-20 sm:px-6"
				id="timeline"
				data-sanity={timelineDataAttribute}
			>
				<div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
					<div className="order-1 space-y-8">
						<div className="flex items-center gap-3 brand-caption text-sm uppercase tracking-[0.3em] text-black/55">
							<span aria-hidden="true">
								<Logo
									variant="spark-small"
									color="black"
									width={120}
									height={48}
									className="p-0"
								/>
							</span>
							<span>{timelineEyebrow}</span>
						</div>
						<h3 className="text-2xl font-black uppercase tracking-[0.18em] text-black">
							{timelineTitle}
						</h3>
						<p className="brand-body text-sm text-black/60">
							{timelineSubtitle}
						</p>
						<div className="relative rounded-[32px] border border-black/10 bg-white p-6">
							<div
								className="absolute left-10 top-14 bottom-10 w-px bg-black/10"
								aria-hidden
							/>
							<ul className="space-y-10">
								{timelineMilestones.map((milestone) => (
									<li key={milestone.period} className="relative pl-16">
										<span className="absolute left-7 top-[1.05rem] block h-6 w-6 rounded-full border-2 border-black bg-[var(--color-volt)]" />
										<p className="text-xs font-black uppercase tracking-[0.35em] text-black/45">
											{milestone.period}
										</p>
										<h3 className="mt-1 text-xl font-black uppercase tracking-[0.15em] text-black">
											{milestone.title}
										</h3>
										<p className="brand-body text-sm text-black/70">
											{milestone.description}
										</p>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="order-2 space-y-10" data-sanity={aboutDataAttribute}>
						<SectionHeader
							eyebrow={aboutEyebrow}
							title={aboutTitle}
							subtitle={aboutSubtitle}
						/>
						<div className="space-y-6 text-lg leading-relaxed text-black/80 brand-body">
							{leagueIntroParagraphs.map((paragraph, index) => (
								<p key={`${paragraph.slice(0, 32)}-${index}`}>{paragraph}</p>
							))}
						</div>
						<div className="grid gap-6 sm:grid-cols-2">
							{impactPillars.map((pillar) => (
								<div
									key={pillar.title}
									className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
								>
									<p className="text-sm font-black uppercase tracking-[0.3em] text-black/60">
										{pillar.title}
									</p>
									<p className="brand-body mt-3 text-base">
										{pillar.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
			<section
				className="px-4 py-16 sm:px-6"
				id="how-it-works"
				data-sanity={draftDataAttribute}
			>
				<div className="mx-auto max-w-6xl space-y-12">
					<SectionHeader
						eyebrow={draftEyebrow}
						title={draftTitle}
						subtitle={draftSubtitle}
					/>
					<div className="relative pl-12">
						<div
							className="absolute left-6 top-3 bottom-3 w-px bg-black/10"
							aria-hidden
						/>
						{draftSteps.map((step, index) => (
							<div key={step.title} className="relative mb-10 last:mb-0">
								<div className="absolute -left-12 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-sm font-black">
									{index + 1}
								</div>
								<div className="rounded-3xl border border-black/10 bg-white/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
									<h3 className="text-xl font-black uppercase tracking-[0.18em] text-black">
										{step.title}
									</h3>
									<p className="brand-body mt-3 text-sm text-black/70">
										{step.description}
									</p>
								</div>
							</div>
						))}
					</div>
					<div className="rounded-[36px] border-4 border-black bg-black p-10 text-white shadow-[16px_16px_0px_rgba(35,35,36,1)]">
						<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
							<div>
								{draftCta.eyebrow && (
									<p className="brand-caption text-xs uppercase tracking-[0.4em] text-white/70">
										{draftCta.eyebrow}
									</p>
								)}
								{draftCta.title && (
									<h3 className="mt-2 text-3xl font-black uppercase tracking-[0.2em]">
										{draftCta.title}
									</h3>
								)}
							</div>
							<TypeformApplyButton
								formUrl={finalCtaLink}
								className="brand-caption rounded-full border-2 border-[var(--color-volt)] bg-[var(--color-volt)] px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5"
							>
								<span>{finalCtaText}</span>
								<span aria-hidden className="ml-1">
									→
								</span>
							</TypeformApplyButton>
						</div>
						{finalCtaHelper && (
							<p className="brand-body mt-4 text-sm text-white/70">
								{finalCtaHelper}
							</p>
						)}
					</div>
				</div>
			</section>
			<section
				id="faq"
				className="bg-black px-4 py-16 text-white sm:px-6"
				data-sanity={faqDataAttribute}
			>
				<div className="mx-auto max-w-6xl space-y-10">
					<SectionHeader
						eyebrow={faqEyebrow}
						title={faqTitle}
						subtitle={faqSubtitle}
						invert
					/>
					<div className="grid gap-5 md:grid-cols-2">
						{faqItems.map((item, idx) => (
							<div
								key={`${item.question ?? "faq"}-${idx}`}
								className={`rounded-[28px] border border-white/15 p-6 ${idx % 2 === 0 ? "bg-white/5" : "bg-white/10"}`}
							>
								<h3 className="text-lg font-black uppercase tracking-[0.18em]">
									{item.question}
								</h3>
								<p className="brand-body mt-3 text-sm text-white/80">
									{item.answer}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
			<section
				className="px-4 py-16 sm:px-6"
				data-sanity={contactDataAttribute}
			>
				<div className="mx-auto max-w-4xl space-y-6">
					<SectionHeader
						eyebrow={contactEyebrow}
						title={contactTitle}
						subtitle={contactSubtitle}
					/>
					<div className="divide-y divide-black/10 rounded-[32px] border border-black/20 bg-white">
						{contacts.map((contact, index) => {
							const href =
								contact.link ||
								(contact.value?.includes("@")
									? `mailto:${contact.value}`
									: undefined) ||
								"#";
							return (
								<a
									key={`${contact.value ?? "contact"}-${index}`}
									href={href}
									className="flex flex-col gap-1 px-6 py-5 transition hover:bg-black hover:text-white"
								>
									<span className="brand-caption text-[0.7rem] uppercase tracking-[0.3em] text-black/60">
										{contact.label}
									</span>
									<span className="text-base font-black uppercase tracking-[0.18em]">
										{contact.value}
									</span>
								</a>
							);
						})}
					</div>
				</div>
			</section>
		</main>
	);
}

export const revalidate = 3600;

export async function generateMetadata() {
	const isDraft = (await draftMode()).isEnabled;
	if (isDraft) {
		return {
			title: DEFAULT_PAGE_TITLE,
			description: DEFAULT_PAGE_DESCRIPTION,
		};
	}

	const content = await getPlayerDraftPageData();
	return {
		title: content?.seo?.metaTitle || DEFAULT_PAGE_TITLE,
		description: content?.seo?.metaDescription || DEFAULT_PAGE_DESCRIPTION,
	};
}

export default async function PlayerDraftPage() {
	const content = await getPlayerDraftPageData();
	return <PlayerDraftPageContent content={content ?? undefined} />;
}
