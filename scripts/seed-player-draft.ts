/**
 * Seed script for the Player Draft page singleton (playerDraftPage)
 * Run with: pnpm seed:player-draft
 */

import * as dotenv from "dotenv";
import { createClient } from "next-sanity";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
	console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local");
	process.exit(1);
}

if (!token) {
	console.error("❌ Missing SANITY_API_TOKEN in .env.local");
	process.exit(1);
}

const client = createClient({
	projectId,
	dataset,
	apiVersion: "2025-10-31",
	token,
	useCdn: false,
});

const TYPEFORM_URL = "https://form.typeform.com/to/ZmJZ6YB2";
const APPLICATION_DEADLINE = "2026-01-01T23:59:59+01:00";

const heroHighlights = [
	{ label: "Campaign window", value: "Nov 17 2025 – Jan 1 2026" },
	{ label: "Format", value: "7v7 football + community impact" },
	{ label: "Location", value: "Copenhagen, Denmark" },
];

const heroNavButtons = [
	{ label: "How it works", href: "#how-it-works" },
	{ label: "Timeline", href: "#timeline" },
	{ label: "Why Sensational?", href: "#why" },
	{ label: "FAQ", href: "#faq" },
];

const heroSnapshotItems = [
	{ label: "Player profile", value: "Female players 17+, all positions" },
	{ label: "What captains assess", value: "Football IQ, team spirit, content energy" },
	{ label: "Timeline", value: "Apps close Jan 1 • Offers out mid-Jan" },
];

const leagueIntroParagraphs = [
	"Sensational League is an international 7v7 professional women’s football league launching its first season in Copenhagen in April 2026, before expanding to the UK and the US.",
	"Eight teams. Legendary captains. High-tempo matches. Festival-style game days. A sports entertainment format built for modern players and modern audiences.",
];

const impactPillars = [
	{
		title: "Performance",
		description: "High-tempo 7v7 football fronted by legendary captains and powered by creator-grade coaching.",
	},
	{
		title: "Visibility",
		description: "Embedded media crew, live storytelling, and partnerships that put players in front of global audiences.",
	},
	{
		title: "Community",
		description: "Each team drives a Community Challenge that earns points for amplifying women’s sport beyond the pitch.",
	},
	{
		title: "Opportunity",
		description: "Paid match days and commercial spotlights.",
	},
];

const timelineMilestones = [
	{
		period: "Nov–Dec 2025",
		title: "Applications open",
		description: "Captains meet weekly to review submissions and flag talent for invites.",
	},
	{
		period: "Jan 2026",
		title: "Player invitations",
		description: "Selected players receive offers and attend the Player Placement Day.",
	},
	{
		period: "Feb–Mar 2026",
		title: "Preseason + media labs",
		description: "Football sessions plus creator training, story labs, and community planning.",
	},
	{
		period: "Apr 2026",
		title: "Season One kickoff",
		description: "Copenhagen festival gamedays launch the Sensational League era.",
	},
];

const participationParagraphs = [
	"When you join the Sensational League, you become part of the first-ever group of players in a new international format. You help define how women’s football is seen, covered, talked about, and celebrated.",
	"We train players to become powerful storytellers and digital creators, because media visibility on and off the pitch is how we grow the game. Your voice, your personality, and your story will inspire more girls to play and more fans and brands to care.",
	"How do we know this? Because we know how fun and giving playing, leading, and watching football is. Participate, elevate, and reciprocate.",
];

const draftSteps = [
	{
		title: "Complete the online application",
		description: "Fill in the player draft questionnaire—this is where captains learn your football profile, spark, and availability.",
	},
	{
		title: "Weekly captain reviews",
		description: "Applications are reviewed continuously by all eight Sensational captains together with the Saga team.",
	},
	{
		title: "Selections & invitations",
		description: "Selected players are invited to training sessions plus a Team & Player Placement Day where captains reveal the first eight teams.",
	},
	{
		title: "Community-first promise",
		description: "If you’re not selected this season, you stay in the Sensational community with access to gamedays, events, and future draft windows.",
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
		answer: "No. Club players and community footballers are equally welcome—talent, energy, and mindset are what matter most.",
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
];

const playerDraftPageDoc = {
	_id: "playerDraftPage",
	_type: "playerDraftPage",
	title: "Player Draft",
	seo: {
		metaTitle: "Player Draft | Sensational League",
		metaDescription:
			"Apply to join the Sensational League player draft and become part of the inaugural season launching in Copenhagen spring 2026.",
	},
	hero: {
		locationLabel: "Copenhagen • Spring 2026",
		headline: "Join the Sensational 80",
		description:
			"We’re recruiting 80 footballers to launch Sensational League. Captains are looking for players who can compete, create, and grow women’s football.",
		highlights: heroHighlights,
		navButtons: heroNavButtons,
		application: {
			eyebrow: "Player draft window",
			title: "Applications close Jan 1, 2026",
			deadlineLabel: "Captains review weekly",
			helperText: "Early submissions are encouraged so your profile is in the first batch.",
			ctaText: "Start application",
			ctaLink: TYPEFORM_URL,
			countdown: {
				enabled: true,
				label: "Countdown",
				deadline: APPLICATION_DEADLINE,
				timezone: "CET",
			},
			snapshotItems: heroSnapshotItems,
		},
	},
	timeline: {
		eyebrow: "Launch timeline",
		title: "Season roadmap",
		subtitle: "Everything between the application window and kickoff.",
		milestones: timelineMilestones,
	},
	about: {
		eyebrow: "About the league & player draft",
		title: "Fast. Rebellious. Female.",
		subtitle: "International 7v7 built for storyteller-athletes.",
		paragraphs: leagueIntroParagraphs,
		pillars: impactPillars,
	},
	participationSection: {
		eyebrow: "You’re not just playing",
		title: "Participate. Elevate. Reciprocate.",
		subtitle: "Players become co-creators of a new women’s football culture.",
		paragraphs: participationParagraphs,
		quoteCard: {
			eyebrow: "We know the feeling",
			quote: "Football is electric when the stage is yours.",
			body: "Every player gets the tools to perform, tell their story, and move culture forward.",
		},
		toolsCard: {
			title: "Tools you get",
			items: [
				"Story lab + creator coaching",
				"Community platform + CRM access",
				"Impact scoring + spotlights",
				"Access to gamedays & future tours",
			],
		},
	},
	draftStepsSection: {
		eyebrow: "How the player draft works",
		title: "Four moves to join",
		subtitle: "Deadline: January 1, 2026 — early applications reviewed weekly.",
		steps: draftSteps,
		cta: {
			eyebrow: "Ready to apply?",
			title: "If you’re a female footballer ready for a new kind of league, start now.",
			helper: "Women’s football is moving fast. Secure your spot in the Sensational draft before the window closes.",
			ctaText: "Apply here",
			ctaLink: TYPEFORM_URL,
		},
	},
	faqSection: {
		eyebrow: "FAQ",
		title: "FAQ",
		subtitle: "Answers before you hit submit.",
		items: faqItems,
	},
	contactSection: {
		eyebrow: "Contact",
		title: "Need clarity?",
		subtitle: "Reach out to the Sensational communications team.",
		contacts,
	},
};

async function seed() {
	console.log("🌱 Seeding player draft page...\n");

	await client.createOrReplace(playerDraftPageDoc);
	console.log("✅ Published playerDraftPage document");

	try {
		await client.delete(`drafts.${playerDraftPageDoc._id}`);
		console.log("✅ Removed existing draft");
	} catch (error) {
		console.log("ℹ️  No draft to remove", error instanceof Error ? error.message : "");
	}

	console.log("✨ Player draft page ready!\n");
}

seed().catch((error) => {
	console.error("❌ Failed to seed player draft page", error);
	process.exit(1);
});
