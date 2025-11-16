import TypeformApplyButton from "@/components/TypeformApplyButton";
import { TypeformWidget } from "@/components/TypeformWidget";

const DEFAULT_FORM_ID = "ZmJZ6YB2";
const PLAYER_DRAFT_FORM_URL =
	process.env.NEXT_PUBLIC_TYPEFORM_PLAYERDRAFT_URL ||
	`https://form.typeform.com/to/${DEFAULT_FORM_ID}`;
const APPLICATION_DEADLINE = "2026-01-01T23:59:59+01:00";

function resolveFormId(url: string) {
	const match = url.match(/to\/([A-Za-z0-9_-]+)/i);
	return match?.[1] || DEFAULT_FORM_ID;
}

const PLAYER_DRAFT_FORM_ID = resolveFormId(PLAYER_DRAFT_FORM_URL);

const leagueIntroParagraphs = [
	"Sensational League is an international 7v7 professional women’s football league launching its first season in Copenhagen in April 2026, before expanding to the UK and the US.",
	"Eight teams. Eight captains. High-tempo matches. Festival-style game days. A sports entertainment format built for modern players and modern audiences.",
];

const whyParagraphs = [
	"Women’s sports are exploding globally: record audiences, record investments, world-class players, and a cultural shift we’ve never seen before. To unlock the full potential, we need more visibility, more media, more storytelling, and more professional platforms.",
	"The Sensational vision is simple: Grow women’s football by giving players the stage, the tools, and the platform they deserve while bringing fans, media, and brands with us.",
	"This league is designed for the future—on our own terms. Fast. Rebellious. Female. Purpose-driven and community-first. Powered by content and visibility.",
];

const participationParagraphs = [
	"When you join the Sensational League, you become part of the first-ever group of players in a new international format. You help define how women’s football is seen, covered, talked about, and celebrated.",
	"We train players to become powerful storytellers and digital creators, because media visibility on and off the pitch is how we grow the game. Your voice, your personality, and your story will inspire more girls to play and more fans and brands to care.",
	"How do we know this? Because we know how fun and giving playing, leading, and watching football is. Participate, elevate, and reciprocate.",
];

const formatHighlights = [
	"The League features eight teams, each led by a Sensational captain, competing in a fast, entertainment-driven 7v7 format.",
	"Each team also competes in a Community Challenge—our impact element where players earn points by amplifying women’s sport. This is where sport and purpose meet.",
	"We’ve opened the draft to select 80 female footballers (17+) for our inaugural season. All positions are welcome—we’re building teams with skill, creativity, balance, and personality.",
	"You don’t need to play at the highest level; commitment, love for the game, team spirit, and the will to grow are what matter most.",
];

const draftSteps = [
	{
		title: "Complete the online application",
		description:
			"Fill in the player draft questionnaire—this is where captains learn your football profile, spark, and availability.",
	},
	{
		title: "Weekly captain reviews",
		description:
			"Applications are reviewed continuously by all eight Sensational captains together with the Saga team.",
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

const faqItems = [
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
			"Applications go straight to the eight captains and Sensational staff, who assess every applicant to build eight equally strong teams.",
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

const contacts = [
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

interface CountdownParts {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

function getCountdownParts(deadline: string): CountdownParts | null {
	const target = new Date(deadline).getTime();
	if (Number.isNaN(target)) return null;
	const now = Date.now();
	const diff = Math.max(0, target - now);
	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / (1000 * 60)) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	};
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
				<p className={`brand-body text-base leading-relaxed ${invert ? "text-white/80" : "text-black/70"}`}>
					{subtitle}
				</p>
			) : null}
		</div>
	);
}

export default function PlayerDraftPage() {
	const countdown = getCountdownParts(APPLICATION_DEADLINE);

	return (
		<main className="bg-[#F7F7F7] text-black">
			<section className="relative overflow-hidden bg-black text-white">
				<div className="absolute inset-0" aria-hidden>
					<div className="absolute -left-24 top-0 h-[520px] w-[520px] rounded-full bg-[var(--color-volt)] blur-[200px] opacity-60" />
					<div className="absolute right-0 top-16 h-72 w-72 rotate-12 border border-white/20" />
				</div>
				<div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
					<div className="space-y-6">
						<p className="brand-caption text-xs uppercase tracking-[0.5em] text-[var(--color-volt)]">
							Sensational Player Draft
						</p>
						<h1 className="text-4xl font-black uppercase leading-tight tracking-[0.1em] sm:text-6xl">
							We’re looking for 80 football players
						</h1>
						<p className="brand-body text-lg text-white/80">
							Hero film by Foldager Studios sets the tone. Captains, cameras, and culture collide to recruit the
							first Sensational 80.
						</p>
						<div className="flex flex-wrap gap-4">
							<TypeformApplyButton
								formUrl={PLAYER_DRAFT_FORM_URL}
								className="brand-caption flex items-center gap-3 rounded-full border-2 border-black bg-[var(--color-volt)] px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5"
							>
								Apply now →
							</TypeformApplyButton>
							<a
								href="#how-it-works"
								className="rounded-full border border-white/40 px-6 py-3 text-xs font-black uppercase tracking-[0.3em] text-white transition-colors hover:bg-white hover:text-black"
							>
								How it works
							</a>
						</div>
					</div>
					<div className="rounded-3xl border-4 border-white/30 bg-white/5 p-8 shadow-[16px_16px_0px_rgba(35,35,36,0.8)]">
						<p className="brand-caption text-xs uppercase tracking-[0.4em] text-white/70">
							Applications close
						</p>
						<h3 className="mt-2 text-3xl font-black uppercase tracking-[0.2em]">
							January 1, 2026
						</h3>
						{countdown ? (
							<div className="mt-6 grid grid-cols-2 gap-4 text-black sm:grid-cols-4">
								{[
									{ label: "Days", value: countdown.days },
									{ label: "Hours", value: countdown.hours },
									{ label: "Minutes", value: countdown.minutes },
									{ label: "Seconds", value: countdown.seconds },
								].map((stat) => (
									<div key={stat.label} className="rounded-2xl border-2 border-black bg-white/90 p-4 text-center">
										<p className="text-3xl font-black">{String(stat.value).padStart(2, "0")}</p>
										<p className="brand-caption mt-1 text-[0.6rem] uppercase tracking-[0.4em] text-black/60">
											{stat.label}
										</p>
									</div>
								))}
							</div>
						) : null}
						<p className="brand-body mt-6 text-sm text-white/80">
							All posts link to Typeform and Sensationalleague.com featuring the “Player sign-up now open”
							banner.
						</p>
					</div>
				</div>
			</section>
			<section className="px-4 py-16 sm:px-6">
				<div className="mx-auto max-w-6xl space-y-10">
					<SectionHeader eyebrow="About the league & player draft" title="Fast. Rebellious. Female." subtitle="International 7v7 built for storytellers and footballers." />
					<div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
						<div className="space-y-6 text-lg leading-relaxed text-black/80 brand-body">
							{leagueIntroParagraphs.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
						<div className="rounded-[32px] border-2 border-black bg-black/95 p-8 text-white shadow-[18px_18px_0px_rgba(35,35,36,1)]">
							<p className="brand-caption text-sm uppercase tracking-[0.3em] text-[var(--color-volt)]">
								Launch timeline
							</p>
							<div className="mt-4 space-y-4 text-sm uppercase tracking-widest font-black">
								<p>April 2026 · Copenhagen</p>
								<p>Expanding → UK · US</p>
								<p>First cohort · 80 players</p>
							</div>
							<p className="mt-6 text-base text-white/80 brand-body">
								Eight captains. Festival gamedays. Creator-grade content lab. Everything points back to growing
								women’s football.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-black px-4 py-16 text-white sm:px-6">
				<div className="mx-auto max-w-6xl space-y-10">
					<SectionHeader eyebrow="Why we’re doing this" title="Grow the game. Own the format." subtitle="Women’s sports deserve purpose-built platforms." invert />
					<div className="space-y-6">
						{whyParagraphs.map((paragraph) => (
							<p key={paragraph} className="brand-body text-base text-white/80">
								{paragraph}
							</p>
						))}
					</div>
				</div>
			</section>
			<section className="px-4 py-16 sm:px-6">
				<div className="mx-auto max-w-6xl space-y-10">
					<SectionHeader eyebrow="You’re not just playing" title="Participate. Elevate. Reciprocate." subtitle="Players become co-creators of a new women’s football culture." />
					<div className="grid gap-10 lg:grid-cols-2">
						<div className="space-y-6 rounded-[36px] border-2 border-black bg-white p-8 shadow-[16px_16px_0px_rgba(35,35,36,0.9)]">
							{participationParagraphs.slice(0, 2).map((paragraph) => (
								<p key={paragraph} className="brand-body text-base leading-relaxed text-black/80">
									{paragraph}
								</p>
							))}
						</div>
						<div className="space-y-6">
							<div className="rounded-[28px] border border-black/20 bg-black p-8 text-white">
								<p className="brand-caption text-xs uppercase tracking-[0.35em] text-white/70">
									We know the feeling
								</p>
								<p className="mt-4 text-lg font-black uppercase tracking-[0.2em]">
									“Football is fun, giving, and electric when the stage is yours.”
								</p>
								<p className="brand-body mt-4 text-white/80">
									Participate, elevate, and reciprocate. This is a creator athlete ecosystem.
								</p>
							</div>
							<div className="rounded-[28px] border border-black bg-[var(--color-volt)] p-6 shadow-[12px_12px_0px_rgba(35,35,36,1)]">
								<p className="text-sm font-black uppercase tracking-[0.3em] text-black/70">
									Tools you get
								</p>
								<ul className="mt-4 space-y-2 text-sm font-black uppercase tracking-[0.12em] text-black">
									<li>Story lab + creator coaching</li>
									<li>Community platform + CRM access</li>
									<li>Impact scoring + spotlights</li>
								</ul>
							</div>
							<p className="brand-body text-base text-black/80">
								{participationParagraphs[2]}
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-[#D4FF00] px-4 py-16 sm:px-6">
				<div className="mx-auto max-w-6xl space-y-12">
					<SectionHeader eyebrow="Our format" title="Purpose-built 7v7" subtitle="Football + community challenge" />
					<div className="grid gap-10 md:grid-cols-2">
						{formatHighlights.slice(0, 2).map((highlight) => (
							<div key={highlight} className="rounded-[30px] border border-black bg-white/95 p-7 shadow-[10px_10px_0px_rgba(35,35,36,0.9)]">
								<p className="brand-body text-lg text-black/85">{highlight}</p>
							</div>
						))}
					</div>
					<div className="rounded-[36px] border-2 border-black bg-black p-8 text-white shadow-[18px_18px_0px_rgba(35,35,36,1)]">
						<div className="grid gap-6 md:grid-cols-2">
							{formatHighlights.slice(2).map((highlight) => (
								<p key={highlight} className="brand-body text-base text-white/80">
									{highlight}
								</p>
							))}
						</div>
					</div>
				</div>
			</section>
			<section className="px-4 py-16 sm:px-6" id="how-it-works">
				<div className="mx-auto max-w-6xl space-y-12">
					<SectionHeader eyebrow="How the player draft works" title="Four moves to join" subtitle="Deadline: January 1, 2026 — early applications reviewed weekly." />
					<div className="relative border-l-2 border-black/10 pl-6 sm:pl-10">
						{draftSteps.map((step, index) => (
							<div key={step.title} className="relative mb-10 last:mb-0">
								<div className="absolute -left-[34px] top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-sm font-black">
									{index + 1}
								</div>
								<div className="rounded-[28px] border border-black/15 bg-white/90 p-6 shadow-[8px_8px_0px_rgba(35,35,36,0.2)]">
									<h3 className="text-xl font-black uppercase tracking-[0.18em] text-black">{step.title}</h3>
									<p className="brand-body mt-3 text-sm text-black/70">{step.description}</p>
								</div>
							</div>
						))}
					</div>
					<div className="rounded-[36px] border-4 border-black bg-black p-10 text-white shadow-[16px_16px_0px_rgba(35,35,36,1)]">
						<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
							<div>
								<p className="brand-caption text-xs uppercase tracking-[0.4em] text-white/70">
									Ready to apply?
								</p>
								<h3 className="mt-2 text-3xl font-black uppercase tracking-[0.2em]">
									If you’re a female footballer ready for a new kind of league, start now.
								</h3>
							</div>
							<TypeformApplyButton
								formUrl={PLAYER_DRAFT_FORM_URL}
								className="brand-caption rounded-full border-2 border-[var(--color-volt)] bg-[var(--color-volt)] px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:translate-x-0.5"
							>
								Apply here →
							</TypeformApplyButton>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-black px-4 py-16 text-white sm:px-6">
				<div className="mx-auto max-w-6xl space-y-10">
					<SectionHeader eyebrow="FAQ" title="Player Draft 2025–26" subtitle="Answers before you hit submit." invert />
					<div className="grid gap-5 md:grid-cols-2">
						{faqItems.map((item, idx) => (
							<div
								key={item.question}
								className={`rounded-[28px] border border-white/15 p-6 ${idx % 2 === 0 ? "bg-white/5" : "bg-white/10"}`}
							>
								<h3 className="text-lg font-black uppercase tracking-[0.18em]">{item.question}</h3>
								<p className="brand-body mt-3 text-sm text-white/80">{item.answer}</p>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className="px-4 py-16 sm:px-6">
				<div className="mx-auto max-w-4xl space-y-6">
					<SectionHeader eyebrow="Contact" title="Need clarity?" subtitle="Reach out to the Sensational communications team." />
					<div className="divide-y divide-black/10 rounded-[32px] border border-black/20 bg-white">
						{contacts.map((contact) => (
							<a
								key={contact.value}
								href={contact.link}
								className="flex flex-col gap-1 px-6 py-5 transition hover:bg-black hover:text-white"
							>
								<span className="brand-caption text-[0.7rem] uppercase tracking-[0.3em] text-black/60">
									{contact.label}
								</span>
								<span className="text-base font-black uppercase tracking-[0.18em]">
									{contact.value}
								</span>
							</a>
						))}
					</div>
				</div>
			</section>
			<section className="bg-[#F7F7F7] px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-5xl space-y-6">
					<SectionHeader eyebrow="Apply" title="Typeform" subtitle="Complete the form below. Captains review weekly." />
					<TypeformWidget formId={PLAYER_DRAFT_FORM_ID} height={660} />
				</div>
			</section>
		</main>
	);
}
