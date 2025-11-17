/**
 * Seed script to populate home page content in Sanity
 * Run with: pnpm seed:home
 */

import * as dotenv from "dotenv";
import { createClient } from "next-sanity";
import { resolve } from "path";

// Load .env.local file
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
	console.error(
		"❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local",
	);
	process.exit(1);
}

if (!token) {
	console.error("❌ Missing SANITY_API_TOKEN in .env.local");
	console.error("   Get a token from https://sanity.io/manage → API → Tokens");
	process.exit(1);
}

const client = createClient({
	projectId,
	dataset,
	apiVersion: "2025-10-31",
	token,
	useCdn: false,
});

const HERO_VIDEO_CDN_BASE = "https://sensational-hero-video.generaite.workers.dev";
const HERO_VIDEO_VARIANTS = {
	wide: `${HERO_VIDEO_CDN_BASE}/hero-wide.mp4`,
	square: `${HERO_VIDEO_CDN_BASE}/hero-square.mp4`,
	vertical: `${HERO_VIDEO_CDN_BASE}/hero-vertical.mp4`,
};

const CAPTAIN_VIDEO_DEFAULTS = {
	bettina: `${HERO_VIDEO_CDN_BASE}/captains/bettina`,
	line: `${HERO_VIDEO_CDN_BASE}/captains/line`,
	theresa: `${HERO_VIDEO_CDN_BASE}/captains/theresa`,
	nina: `${HERO_VIDEO_CDN_BASE}/captains/nina`,
	nicoline: `${HERO_VIDEO_CDN_BASE}/captains/nicoline`,
	rikke: `${HERO_VIDEO_CDN_BASE}/captains/rikke`,
};

const homePageContent = {
	_type: "homePage",
	_id: "homePage",
	title: "Home Page",
	seo: {
		metaTitle: "Sensational League - Fast. Rebellious. Female.",
		metaDescription: "Women's 7v7 football league combining athletic excellence with social impact.",
	},
	hero: {
		headline: [
			{
				_type: 'block',
				_key: 'hero-headline',
				style: 'normal',
				children: [
					{
						_type: 'span',
						_key: 'span1',
						text: 'FAST. ',
						marks: ['colorBlack'],
					},
					{
						_type: 'span',
						_key: 'span2',
						text: 'REBELLIOUS. ',
						marks: ['colorBlack'],
					},
					{
						_type: 'span',
						_key: 'span3',
						text: 'FEMALE.',
						marks: ['colorVolt'],
					},
				],
				markDefs: [],
			},
		],
		subline: "Women's 7v7 football league that combines athletic excellence with social impact.",
		video: {
			url: HERO_VIDEO_VARIANTS.wide,
			credit: "Sensational League",
			variants: {
				wide: HERO_VIDEO_VARIANTS.wide,
				square: HERO_VIDEO_VARIANTS.square,
				vertical: HERO_VIDEO_VARIANTS.vertical,
			},
		},
		ctaText: "JOIN →",
		stats: [
			{ _key: 'stat-1', value: "300+", label: "Athletes" },
			{ _key: 'stat-2', value: "24", label: "Teams" },
			{ _key: 'stat-3', value: "12", label: "SDG Goals" }
		],
	},
	about: {
		title: [
			{
				_type: 'block',
				_key: 'about-title',
				style: 'normal',
				children: [
					{
						_type: 'span',
						_key: 'span1',
						text: 'PLAY FOOTBALL. ',
						marks: ['colorBlack'],
					},
					{
						_type: 'span',
						_key: 'span2',
						text: 'DRIVE IMPACT. ',
						marks: ['colorVolt'],
					},
					{
						_type: 'span',
						_key: 'span3',
						text: 'CHANGE THE WORLD.',
						marks: ['colorBlack'],
					},
				],
				markDefs: [],
			},
		],
		description: "We're building a community where female athletes can showcase their skills while making a difference. Our mission is simple: Fast. Rebellious. Female.",
		pillars: [
			{
				_key: 'pillar-1',
				title: "ELITE 7V7 COMPETITION",
				description: "Fast, high-scoring, skills focused, made for brands, broadcast and streaming."
			},
			{
				_key: 'pillar-2',
				title: "8 TEAMS",
				description: "Led by athlete-influencer Captains."
			},
			{
				_key: 'pillar-3',
				title: "6 FESTIVAL MATCHDAYS",
				description: "Football meets music, culture, and community."
			},
			{
				_key: 'pillar-4',
				title: "PROFESSIONAL PAY",
				description: "Athletes with creative control and shared value."
			}
		],
	},
	whySection: {
		eyebrow: "Why Sensational League",
		title: "Grow the game. Own the format.",
		subtitle: "Women’s sports deserve purpose-built platforms.",
		statements: [
			{
				_key: "why-visibility",
				title: "Visibility unlocks growth",
				description:
					"Women’s sports are exploding globally with record audiences, investments, and players. To unlock the full potential, we need more visibility, more media, more storytelling, and professional platforms.",
			},
			{
				_key: "why-platform",
				title: "A platform built for players",
				description:
					"Our vision is simple: grow women’s football by giving players the stage, tools, and platform they deserve while bringing fans, media, and brands with us.",
			},
			{
				_key: "why-rebellious",
				title: "Fast. Rebellious. Female.",
				description:
					"This league is designed for the future—on our own terms. Fast. Rebellious. Female. Purpose-driven, community-first, and powered by visibility.",
			},
		],
	},
	formatSection: {
		eyebrow: "Our format",
		title: "Purpose-built 7v7",
		subtitle: "Football meets a community challenge to score on and off the pitch.",
		coreConcepts: [
			"Eight teams led by Sensational captains compete in a fast, entertainment-driven 7v7 format.",
			"Each team also tackles a Community Challenge—our impact scoring that rewards amplifying women’s sport.",
			"Drafting 80 female footballers (17+) for Copenhagen 2026 with equal focus on skill, personality, and creativity.",
			"You don’t need to play at the highest level; commitment, team spirit, and the will to grow matter most.",
		],
		designedFor: {
			eyebrow: "Designed for modern players",
			description: "Football that fits real lives: fewer but bigger gamedays, broadcast visibility, and a creator lab that backs every player.",
			features: [
				"Six gamedays · broadcast + live crowd",
				"Community Challenge scoring",
				"Creator lab + content studio",
				"Impact storytelling with partners",
			],
		},
	},
	captainsSection: {
		enabled: true,
		eyebrow: "Captains",
		title: "Meet Our Captains",
		subtitle: "Legendary leaders shaping the Sensational 80.",
		intro: "Six icons of Danish football bring elite experience, cultural impact, and unstoppable energy to the league.",
		captains: [
			{
				_key: "captain-bettina",
				name: "Bettina Falk",
				tagline: "Defender • 5x Danish Champion • Brøndby Legend",
				summary: "Led club and country with grit before reshaping how cities move and play. 56 caps for Denmark plus five titles with Brøndby.",
				superpower: "Reading the game and speed",
				oneLiner: "Brøndby Legend x 56 Caps",
				videoUrl: CAPTAIN_VIDEO_DEFAULTS.bettina,
			},
			{
				_key: "captain-line",
				name: "Line Røddik Hansen",
				tagline: "Defender • Lyon, FC Barcelona & Denmark",
				summary: "From Birkerød to conquering Europe. 132 caps, EURO silver, and a career across Lyon, Barça, Ajax, and more.",
				superpower: "Calm under chaos",
				oneLiner: "132 Caps x Lyon, Barca",
				videoUrl: CAPTAIN_VIDEO_DEFAULTS.line,
			},
			{
				_key: "captain-theresa",
				name: "Theresa Eslund",
				tagline: "Right Back • 133 Caps • UEFA EURO 2017 Best XI",
				summary: "Starred across Norway, USA, Australia, and Denmark—selected for the UEFA EURO 2017 Best XI.",
				superpower: "Relentless drive",
				oneLiner: "133 Caps · UEFA EURO 2017 BEST XI",
				videoUrl: CAPTAIN_VIDEO_DEFAULTS.theresa,
			},
			{
				_key: "captain-nina",
				name: "Nina Frausing Pedersen",
				tagline: "Defender • Liverpool & Fortuna Hjørring",
				summary: "International across Denmark, Sweden, Germany, England, and Australia—while earning a PhD.",
				superpower: "Perseverance",
				oneLiner: "National Caps x Liverpool, Fortuna Hjørring, Brøndby",
				videoUrl: CAPTAIN_VIDEO_DEFAULTS.nina,
			},
			{
				_key: "captain-nicoline",
				name: "Nicoline Sørensen",
				tagline: "Forward • Everton & Brøndby • Denmark International",
				summary: "One of Denmark’s most electric attackers with 100+ club games and national TV commentary chops.",
				superpower: "Instant change of pace",
				oneLiner: "54 Caps x Everton striker",
				videoUrl: CAPTAIN_VIDEO_DEFAULTS.nicoline,
			},
			{
				_key: "captain-rikke",
				name: "Rikke Sevecke",
				tagline: "Defender • Everton & Portland Thorns",
				summary: "Modern centre-back dominating in Denmark, France, England, and the NWSL—now advocating athlete heart health.",
				superpower: "Strength with purpose",
				oneLiner: "54 Caps x Everton, Portland Thorns",
				videoUrl: CAPTAIN_VIDEO_DEFAULTS.rikke,
			},
		],
	},
	impact: {
		headline: [
			{
				_type: 'block',
				_key: 'impact-headline',
				style: 'normal',
				children: [
					{
						_type: 'span',
						_key: 'span1',
						text: 'LEAGUE ',
						marks: ['colorWhite'],
					},
					{
						_type: 'span',
						_key: 'span2',
						text: 'IMPACT',
						marks: ['colorVolt'],
					},
				],
				markDefs: [],
			},
		],
		stats: [
			{ _key: 'impact-stat-1', value: "24", label: "Teams" },
			{ _key: 'impact-stat-2', value: "300+", label: "Athletes" },
			{ _key: 'impact-stat-3', value: "50K", label: "Community" },
			{ _key: 'impact-stat-4', value: "12", label: "SDG Goals" }
		],
		quoteText: "\"This isn't just football - it's a movement.\"",
		quoteAttribution: "League Founder",
	},
	cta: {
		headline: "JOIN THE REVOLUTION",
		description: "Be notified when registration opens for the next season.",
		buttonText: "JOIN →",
	},
};

const draftHomePageContent = {
	...homePageContent,
	_id: `drafts.${homePageContent._id}`,
};

async function seed() {
	console.log("🌱 Seeding home page...");

	try {
		await client
			.transaction()
			.createOrReplace(homePageContent)
			.createOrReplace(draftHomePageContent)
			.commit();

		console.log("✅ Created/updated: Published Home Page");
		console.log("✅ Created/updated: Draft Home Page");
	} catch (error) {
		console.error("❌ Failed to create home page:", error);
	}

	console.log("✨ Seeding complete!");
}

seed().catch(console.error);
