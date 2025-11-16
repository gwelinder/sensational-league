/**
 * Seed script for the "About the League & Player Draft" page
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

let keyCounter = 0;
const key = () => `block-${keyCounter++}`;

const block = (text: string, style: "normal" | "h2" | "h3" = "normal") => ({
	_type: "block",
	_key: key(),
	style,
	markDefs: [] as { _key: string; _type: "link"; href: string }[],
	children: [
		{
			_type: "span",
			_key: key(),
			text,
			marks: [],
		},
	],
});

const bullet = (text: string) => ({
	...block(text),
	listItem: "bullet",
});

const linkBlock = (parts: Array<{ text: string; href?: string }>) => {
	const markDefs: Array<{ _key: string; _type: "link"; href: string }> = [];
	const children = parts.map((part, index) => {
		let marks: string[] = [];
		if (part.href) {
			const markKey = key();
			markDefs.push({ _key: markKey, _type: "link", href: part.href });
			marks = [markKey];
		}

		return {
			_type: "span",
			_key: `${key()}-${index}`,
			text: part.text,
			marks,
		};
	});

	return {
		_type: "block",
		_key: key(),
		style: "normal",
		markDefs,
		children,
	};
};

const TYPEFORM_URL = "https://form.typeform.com/to/ZmJZ6YB2";

const playerDraftPage = {
	_id: "page-about-the-league-player-draft",
	_type: "page",
	title: "About the League & Player Draft",
	slug: { current: "about-the-league-player-draft" },
	pageType: "landing",
	seo: {
		metaTitle: "About the League & Player Draft | Sensational League",
		metaDescription:
			"Learn how the Sensational League 7v7 player draft works, who can apply, and what makes this format Fast. Rebellious. Female.",
	},
	hero: {
		enabled: true,
		style: "split",
		headline: "About the League & Player Draft",
		subtitle:
			"Sensational League is an international 7v7 professional women’s football league launching April 2026 in Copenhagen before expanding to the UK and the US.",
		cta: {
			text: "Apply now",
			url: TYPEFORM_URL,
			style: "primary",
		},
	},
	sections: [
		{
			_type: "contentSection",
			_key: "intro",
			title: "Sensational League is here",
			subtitle: "Fast. Rebellious. Female.",
			layout: "single",
			content: [
				block(
					"Sensational League is an international 7v7 professional women’s football league launching its first season in Copenhagen in April 2026, before expanding to the UK and the US.",
				),
				block(
					"Eight teams. Eight captains. High-tempo matches. Festival-style game days. A sports entertainment format built for modern players and modern audiences.",
				),
			],
			ctaButton: {
				show: true,
				text: "Apply to play",
				url: TYPEFORM_URL,
				style: "primary",
			},
		},
		{
			_type: "contentSection",
			_key: "why",
			title: "Why we’re doing this",
			layout: "single",
			content: [
				block(
					"Women’s sports are exploding globally: record audiences, record investments, world-class players, and a cultural shift we’ve never seen before. To unlock the full potential, we need more visibility, more media, more storytelling, and more professional platforms.",
				),
				block(
					"The Sensational vision is simple: grow women’s football by giving players the stage, the tools, and the platform they deserve while bringing fans, media, and brands with us.",
				),
				block(
					"This league is designed for the future—on our own terms. Fast. Rebellious. Female. Purpose-driven and community-first. Powered by content and visibility.",
				),
			],
		},
		{
			_type: "contentSection",
			_key: "participate",
			title: "You’re not just playing. You’re participating.",
			layout: "single",
			content: [
				block(
					"When you join the Sensational League, you become part of the first-ever group of players in a new international format. You help define how women’s football is seen, covered, talked about, and celebrated.",
				),
				block(
					"We train players to become powerful storytellers and digital creators, because media visibility on and off the pitch is how we grow the game. Your voice, your personality, and your story will inspire more girls to play and more fans and brands to care.",
				),
			],
		},
		{
			_type: "contentSection",
			_key: "format",
			title: "Our Format",
			layout: "single",
			content: [
				block(
					"The league features eight teams each led by a Sensational captain, competing in a fast, entertainment-driven 7v7 format.",
				),
				block(
					"Alongside the football, each team also competes in a Community Challenge—our unique impact element where players earn points by amplifying women’s sport. This is where sport and purpose meet.",
				),
				block(
					"We have opened the draft to select 80 female footballers (17+) to join our inaugural season. All positions are welcome—we’re building teams with skill, creativity, balance, and personality.",
				),
			],
		},
		{
			_type: "contentSection",
			_key: "eligibility",
			title: "What we’re looking for",
			layout: "single",
			content: [
				block(
					"You don’t need to play at the highest level; what matters is commitment, love for the game, team spirit, and the will to grow.",
				),
			],
		},
		{
			_type: "contentSection",
			_key: "draftProcess",
			title: "How the Player Draft Works",
			layout: "single",
			content: [
				block("Complete the online application and fill in our player draft questionnaire—this is where captains get to know your football profile.", "h3"),
				bullet("Weekly reviews by the captains. Applications are reviewed continuously by all eight Sensational captains."),
				bullet("Selection & invitations: Selected players will be contacted and invited to training sessions and a Team & Player Placement Day."),
				bullet("Placement Day is where captains reveal the first eight Sensational teams and players learn more about the League and meet their teammates."),
				block(
					"If you are not selected this season, you’ll still be part of the Sensational community and can join gameday activities, community events, and future draft opportunities.",
				),
				block("Deadline: January 1, 2026 – but early applications are encouraged as captains review weekly."),
			],
		},
		{
			_type: "contentSection",
			_key: "cta",
			title: "Ready for a new kind of league?",
			layout: "single",
			content: [
				block(
					"If you’re a female footballer ready for a new kind of league, start your application today.",
				),
			],
			ctaButton: {
				show: true,
				text: "Start your application",
				url: TYPEFORM_URL,
				style: "primary",
			},
		},
		{
			_type: "faqSection",
			_key: "faq",
			title: "Player Draft FAQ 2025–26",
			layout: "accordion",
			categories: [
				{
					_key: "faq-category",
					categoryName: "Player Draft",
					description: "Everything you need to know before applying",
					icon: "⚽",
					faqs: [
						{
							_key: "faq-1",
							question: "Who can apply?",
							answer: [
								block(
									"Female football players aged 17 and up. We focus on Danish and Nordic players who are living in close proximity to Copenhagen. All positions and talents are welcome as long as you’re serious about the game and ready to grow.",
								),
							],
						},
						{
							_key: "faq-2",
							question: "Do I need to play in a club?",
							answer: [
								block(
									"No. We welcome players from both club and community football—what matters most is your talent, energy, and mindset.",
								),
							],
						},
						{
							_key: "faq-3",
							question: "Is this a paid league?",
							answer: [
								block(
									"Yes. The Sensational League is a professional 7v7 format where all players are paid for the six game days. Players can earn additional opportunities through content, events, and partnerships.",
								),
							],
						},
						{
							_key: "faq-4",
							question: "What’s the timeline?",
							answer: [
								block("Applications close January 1, 2026."),
								block("Captains review applicants on an ongoing basis."),
								block("Selected players will be invited to preseason activities, football and media days in February/March 2026."),
								block("The League kicks off in Copenhagen, April 2026."),
							],
						},
						{
							_key: "faq-5",
							question: "How are players selected?",
							answer: [
								block(
									"Applications go directly to our eight team captains and the Sensational staff. Together they assess every applicant and create eight equally strong teams.",
								),
							],
						},
						{
							_key: "faq-6",
							question: "Can I study or work while playing?",
							answer: [
								block(
									"Yes. The league format is built for modern players—fewer but longer game days and flexible schedules that allow you to combine football with study or work.",
								),
							],
						},
						{
							_key: "faq-7",
							question: "What happens if I’m not selected?",
							answer: [
								block(
									"You’ll still be part of the Sensational community and can take part in gamedays, community work, sports bar events, and future draft opportunities. There will be more chances to join.",
								),
							],
						},
					],
				},
			],
			searchEnabled: true,
			showContactCta: true,
			contactCta: {
				heading: "Still have questions?",
				description: "Reach out to our communications team at Saga Sports Group.",
				buttonText: "Email comms@sagasportsgroup.com",
				buttonUrl: "mailto:comms@sagasportsgroup.com",
			},
		},
		{
			_type: "contentSection",
			_key: "contact",
			title: "Contact",
			layout: "single",
			content: [
				linkBlock([
					{ text: "If you have questions, reach out to our communications team at " },
					{ text: "comms@sagasportsgroup.com", href: "mailto:comms@sagasportsgroup.com" },
				]),
				linkBlock([
					{ text: "Mette Bom, Head of Communications: " },
					{ text: "mbom@sagasportsgroup.com", href: "mailto:mbom@sagasportsgroup.com" },
				]),
				linkBlock([
					{ text: "Elvira Meyer, Communications Manager: " },
					{ text: "emeyer@sagasportsgroup.com", href: "mailto:emeyer@sagasportsgroup.com" },
				]),
			],
		},
	],
};

async function seed() {
	console.log("🌱 Seeding player draft page...");

	await client.createOrReplace(playerDraftPage);
	console.log("✅ Published page document");

	try {
		await client.delete(`drafts.${playerDraftPage._id}`);
		console.log("✅ Removed existing draft");
	} catch (error) {
		console.log("ℹ️  No draft to remove", error instanceof Error ? error.message : "");
	}

	console.log("✨ Player draft page ready!");
}

seed().catch((error) => {
	console.error("❌ Failed to seed player draft page", error);
	process.exit(1);
});
