import CountdownTicker from "@/components/CountdownTicker";
import { Logo } from "@/components/Logo";
import TypeformApplyButton from "@/components/TypeformApplyButton";

const DEFAULT_FORM_ID = "ZmJZ6YB2";
const PLAYER_DRAFT_FORM_URL =
	process.env.NEXT_PUBLIC_TYPEFORM_PLAYERDRAFT_URL ||
	`https://form.typeform.com/to/${DEFAULT_FORM_ID}`;
const APPLICATION_DEADLINE = "2026-01-01T23:59:59+01:00";

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

const heroHighlights = [
	{ label: "Campaign window", value: "Nov 17 2025 – Jan 1 2026" },
	{ label: "Format", value: "7v7 football + community impact" },
	{ label: "Location", value: "Copenhagen, Denmark" },
];

const applicationSnapshot = [
	{ label: "Player profile", value: "Female players 17+, all positions" },
	{
		label: "What captains assess",
		value: "Football IQ, team spirit, content energy",
	},
	{ label: "Timeline", value: "Apps close Jan 1 • Offers out mid-Jan" },
];

const timelineMilestones = [
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

const impactPillars = [
	{
		title: "Performance",
		description:
			"High-tempo 7v7 football fronted by eight legendary captains and creator-grade coaching.",
	},
	{
		title: "Visibility",
		description:
			"Embedded media crew, live storytelling, and partnerships that put players in front of global audiences.",
	},
	{
		title: "Community",
		description:
			"Each team drives a Community Challenge that earns points for uplifting women’s sport beyond the pitch.",
	},
	{
		title: "Opportunity",
		description:
			"Paid match days, commercial spotlights, and future tours across Europe and the US.",
	},
];

const whyStatements = [
	{
		title: "Visibility unlocks growth",
		description: whyParagraphs[0],
	},
	{
		title: "A platform built for players",
		description: whyParagraphs[1],
	},
	{
		title: "Fast. Rebellious. Female.",
		description: whyParagraphs[2],
	},
];

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

export default function PlayerDraftPage() {
	return (
		<main className="bg-[#F7F7F7] text-black">
			<section className="relative isolate overflow-hidden bg-white px-4 pb-24 pt-20 text-black shadow-[0_35px_120px_rgba(0,0,0,0.08)]">
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
							Copenhagen • Spring 2026
						</p>

						<h1 className="text-4xl font-black uppercase leading-tight tracking-[0.08em] text-black sm:text-6xl">
							Join the Sensational 80
						</h1>
						<p className="brand-body text-lg text-black/75">
							We’re recruiting 80 footballers to launch Sensational League.
							Captains are looking for players who can compete, create, and grow
							women’s football. Submit your application, share your story, and
							play in front of the world.
						</p>
						<div className="mt-8 grid gap-4 sm:grid-cols-3">
							{heroHighlights.map((item) => (
								<div
									key={item.label}
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
							<a
								href="#how-it-works"
								className="inline-flex items-center justify-center rounded-full border border-black px-7 py-3 text-xs font-black uppercase tracking-[0.3em] text-black transition-colors hover:bg-black hover:text-white"
							>
								How it works
							</a>
							<a
								href="#timeline"
								className="inline-flex items-center justify-center rounded-full border border-black px-7 py-3 text-xs font-black uppercase tracking-[0.3em] text-black/70 transition-colors hover:bg-black hover:text-white"
							>
								Timeline
							</a>
							<a
								href="#why"
								className="inline-flex items-center justify-center rounded-full border border-black px-7 py-3 text-xs font-black uppercase tracking-[0.3em] text-black/70 transition-colors hover:bg-black hover:text-white"
							>
								Why Sensational?
							</a>
							<a
								href="#faq"
								className="inline-flex items-center justify-center rounded-full border border-black px-7 py-3 text-xs font-black uppercase tracking-[0.3em] text-black/70 transition-colors hover:bg-black hover:text-white"
							>
								FAQ
							</a>
						</div>
					</div>
					<div className="rounded-[32px] border-2 border-black bg-white p-8 shadow-[18px_18px_0px_rgba(35,35,36,0.85)]">
						<p className="brand-caption text-xs uppercase tracking-[0.4em] text-black/60">
							Player draft window
						</p>
						<h3 className="mt-2 text-3xl font-black uppercase tracking-[0.2em] text-black">
							Applications close Jan 1, 2026
						</h3>
						<CountdownTicker
							deadline={APPLICATION_DEADLINE}
							label="Countdown"
							timezone="CET"
							variant="light"
							className="mt-6"
						/>
						<ul className="mt-6 space-y-4">
							{applicationSnapshot.map((item) => (
								<li key={item.label} className="flex flex-col gap-1">
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
							formUrl={PLAYER_DRAFT_FORM_URL}
							className="brand-caption mt-8 w-full rounded-2xl border-2 border-black bg-[var(--color-volt)] px-6 py-4 text-center text-xs font-black uppercase tracking-[0.3em] text-black transition-all hover:-translate-y-0.5 hover:translate-x-0.5"
						>
							Start application →
						</TypeformApplyButton>
						<p className="brand-body mt-4 text-sm text-black/65">
							Captains review weekly. Early submissions are encouraged so your
							profile is in the first batch.
						</p>
					</div>
				</div>
			</section>
			<section className="bg-[#F2F2EC] px-4 pb-16 pt-20 sm:px-6" id="timeline">
				<div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
					<div className="order-1 space-y-8">
						<p className="flex items-center gap-3 brand-caption text-sm uppercase tracking-[0.3em] text-black/55">
							<span aria-hidden="true">
								<Logo
									variant="spark-small"
									color="black"
									width={120}
									height={48}
									className="p-0"
								/>
							</span>
							<span>Launch timeline</span>
						</p>
						<div className="relative rounded-[32px] border border-black/10 bg-white p-6">
							<div className="absolute left-10 top-14 bottom-10 w-px bg-black/10" aria-hidden />
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
					<div className="order-2 space-y-10">
						<SectionHeader
							eyebrow="About the league & player draft"
							title="Fast. Rebellious. Female."
							subtitle="International 7v7 built for storyteller-athletes."
						/>
						<div className="space-y-6 text-lg leading-relaxed text-black/80 brand-body">
							{leagueIntroParagraphs.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
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
			<section id="why" className="bg-black px-4 py-16 text-white sm:px-6">
				<div className="mx-auto max-w-6xl space-y-10">
					<SectionHeader
						eyebrow="Why Sensational League"
						title="Grow the game. Own the format."
						subtitle="Women’s sports deserve purpose-built platforms."
						invert
					/>
					<div className="divide-y divide-white/15 border-t border-white/15">
						{whyStatements.map((statement) => (
							<div
								key={statement.title}
								className="grid gap-6 py-6 md:grid-cols-[0.4fr_1fr]"
							>
								<p className="text-sm font-black uppercase tracking-[0.35em] text-[var(--color-volt)]">
									{statement.title}
								</p>
								<p className="brand-body text-base text-white/80">
									{statement.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className="bg-[#FDFDF5] px-4 py-16 sm:px-6" id="participate">
				<div className="mx-auto max-w-6xl space-y-10">
					<SectionHeader
						eyebrow="You’re not just playing"
						title="Participate. Elevate. Reciprocate."
						subtitle="Players become co-creators of a new women’s football culture."
					/>
					<div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
						<div className="space-y-6 text-lg leading-relaxed text-black/80 brand-body">
							{participationParagraphs.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
						<div className="space-y-6">
							<div className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
								<p className="brand-caption text-xs uppercase tracking-[0.35em] text-black/55">
									We know the feeling
								</p>
								<p className="mt-4 text-lg font-black uppercase tracking-[0.18em]">
									“Football is electric when the stage is yours.”
								</p>
								<p className="brand-body mt-4 text-black/70">
									Every player gets the tools to perform, tell their story, and
									move culture forward.
								</p>
							</div>
							<div className="rounded-3xl border-2 border-black bg-[var(--color-volt)] p-7 shadow-[12px_12px_0px_rgba(35,35,36,0.85)]">
								<div className="flex items-center justify-between">
									<p className="text-sm font-black uppercase tracking-[0.3em] text-black/70">
										Tools you get
									</p>
									<span aria-hidden="true" className="-mr-2">
										<Logo
											variant="secondary-mark"
											color="black"
											width={120}
											height={40}
											className="p-0"
										/>
									</span>
								</div>
								<ul className="mt-4 space-y-2 text-sm font-black uppercase tracking-[0.12em] text-black">
									<li>Story lab + creator coaching</li>
									<li>Community platform + CRM access</li>
									<li>Impact scoring + spotlights</li>
									<li>Access to gamedays & future tours</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id="format" className="px-4 py-16 sm:px-6">
				<div className="mx-auto max-w-6xl space-y-12">
					<SectionHeader
						eyebrow="Our format"
						title="Purpose-built 7v7"
						subtitle="Football meets a community challenge to score on and off the pitch."
					/>
					<div className="grid gap-6 md:grid-cols-3">
						{formatHighlights.slice(0, 3).map((highlight, index) => (
							<div
								key={highlight}
								className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
							>
								<span className="brand-caption text-[0.65rem] uppercase tracking-[0.35em] text-black/50">
									Core concept {index + 1}
								</span>
								<p className="brand-body mt-2 text-base text-black/85">
									{highlight}
								</p>
							</div>
						))}
					</div>
					<div className="rounded-[36px] border border-black/10 bg-black p-8 text-white shadow-[18px_18px_0px_rgba(35,35,36,1)]">
						<p className="text-sm font-black uppercase tracking-[0.35em] text-white/70">
							Designed for modern players
						</p>
						<p className="brand-body mt-4 text-base text-white/80">
							{formatHighlights[3]}
						</p>
						<ul className="mt-6 grid gap-3 text-sm font-black uppercase tracking-[0.15em] md:grid-cols-2">
							<li>Six gamedays · broadcast + live crowd</li>
							<li>Community Challenge scoring</li>
							<li>Creator lab + content studio</li>
							<li>Impact storytelling with partners</li>
						</ul>
					</div>
				</div>
			</section>
			<section className="px-4 py-16 sm:px-6" id="how-it-works">
				<div className="mx-auto max-w-6xl space-y-12">
					<SectionHeader
						eyebrow="How the player draft works"
						title="Four moves to join"
						subtitle="Deadline: January 1, 2026 — early applications reviewed weekly."
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
								<p className="brand-caption text-xs uppercase tracking-[0.4em] text-white/70">
									Ready to apply?
								</p>
								<h3 className="mt-2 text-3xl font-black uppercase tracking-[0.2em]">
									If you’re a female footballer ready for a new kind of league,
									start now.
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
			<section id="faq" className="bg-black px-4 py-16 text-white sm:px-6">
				<div className="mx-auto max-w-6xl space-y-10">
					<SectionHeader
						eyebrow="FAQ"
						title="Player Draft 2025–26"
						subtitle="Answers before you hit submit."
						invert
					/>
					<div className="grid gap-5 md:grid-cols-2">
						{faqItems.map((item, idx) => (
							<div
								key={item.question}
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
			<section className="px-4 py-16 sm:px-6">
				<div className="mx-auto max-w-4xl space-y-6">
					<SectionHeader
						eyebrow="Contact"
						title="Need clarity?"
						subtitle="Reach out to the Sensational communications team."
					/>
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
		</main>
	);
}
