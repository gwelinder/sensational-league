/**
 * Seed script to populate initial captain profiles in Sanity
 * Run with: pnpm seed:captains
 * 
 * NOTE: The homepage captainsSection also contains captain data.
 * This script creates standalone captain documents for the /captains page
 * with additional detail fields (careerHighlights, teamVision, etc.)
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

// Helper to generate unique keys for Sanity arrays
function generateKey(): string {
	return Math.random().toString(36).substring(2, 10);
}

// The real 6 Sensational League captains
const captains = [
	{
		_type: "captain",
		_id: "captain-bettina-falk",
		name: "Bettina Falk",
		slug: { _type: "slug", current: "bettina-falk" },
		tagline: "Defender • 5x Danish Champion • Brøndby Legend",
		oneLiner: "Brøndby Legend x 56 Caps",
		summary:
			"Led club and country with grit before reshaping how cities move and play. 56 caps for Denmark plus five titles with Brøndby.",
		superpower: "Reading the game and speed",
		position: "defender",
		nationalCaps: 56,
		clubs: ["Brøndby IF", "Danish National Team"],
		teamVision:
			"I want to build a team that plays fearless, attacking football while maintaining a rock-solid defensive foundation. Looking for players who are hungry to learn, love the game, and want to be part of something bigger than themselves.",
		lookingFor: [
			"Committed defenders who communicate",
			"Creative midfielders with work rate",
			"Players passionate about community impact",
		],
		careerHighlights: [
			{
				_key: generateKey(),
				title: "5x Danish Champion",
				year: "2015-2020",
				description: "Won five Danish league titles with Brøndby IF",
			},
			{
				_key: generateKey(),
				title: "56 International Caps",
				year: "2008-2018",
				description: "Represented Denmark at World Cup and Euro qualifiers",
			},
		],
		quote:
			"Football gave me everything - now it's time to give back and create opportunities for the next generation.",
		videoUrl: `${HERO_VIDEO_CDN_BASE}/captains/bettina`,
		heroMediaType: "both",
		featured: true,
		order: 1,
		bio: [
			{
				_key: generateKey(),
				_type: "block",
				style: "normal",
				children: [
					{
						_key: generateKey(),
						_type: "span",
						text: "Bettina Falk is one of the most decorated defenders in Danish women's football history. Her career spanning over 15 years has seen her lift countless trophies and inspire a generation of young players.",
					},
				],
			},
		],
	},
	{
		_type: "captain",
		_id: "captain-line-roddik-hansen",
		name: "Line Røddik Hansen",
		slug: { _type: "slug", current: "line-roddik-hansen" },
		tagline: "Defender • Lyon, FC Barcelona & Denmark",
		oneLiner: "132 Caps x Lyon, Barca",
		summary:
			"From Birkerød to conquering Europe. 132 caps, EURO silver, and a career across Lyon, Barça, Ajax, and more.",
		superpower: "Calm under chaos",
		position: "defender",
		nationalCaps: 132,
		clubs: ["Olympique Lyon", "FC Barcelona", "Ajax", "Brøndby IF", "Danish National Team"],
		teamVision:
			"I believe in smart, tactical football where every player understands their role. Looking for players who can stay calm under pressure and execute when it matters.",
		lookingFor: [
			"Defenders with elite positioning",
			"Players who thrive in big moments",
			"Leaders on and off the pitch",
		],
		careerHighlights: [
			{
				_key: generateKey(),
				title: "132 International Caps",
				year: "2006-2020",
				description: "One of Denmark's most capped players ever",
			},
			{
				_key: generateKey(),
				title: "EURO 2017 Silver Medal",
				year: "2017",
				description: "Led Denmark to the European Championship final",
			},
			{
				_key: generateKey(),
				title: "Champions League Winner",
				year: "2016-2017",
				description: "Won the Champions League with Olympique Lyon",
			},
		],
		quote:
			"The bigger the game, the calmer you need to be. That's when champions are made.",
		videoUrl: `${HERO_VIDEO_CDN_BASE}/captains/line`,
		heroMediaType: "both",
		featured: true,
		order: 2,
		bio: [
			{
				_key: generateKey(),
				_type: "block",
				style: "normal",
				children: [
					{
						_key: generateKey(),
						_type: "span",
						text: "Line Røddik Hansen's journey from Birkerød to conquering Europe is the stuff of legend. With 132 caps for Denmark and a career spanning Lyon, Barcelona, and Ajax, she brings unparalleled experience to Sensational League.",
					},
				],
			},
		],
	},
	{
		_type: "captain",
		_id: "captain-theresa-eslund",
		name: "Theresa Eslund",
		slug: { _type: "slug", current: "theresa-eslund" },
		tagline: "Right Back • 133 Caps • UEFA EURO 2017 Best XI",
		oneLiner: "133 Caps · UEFA EURO 2017 BEST XI",
		summary:
			"Starred across Norway, USA, Australia, and Denmark—selected for the UEFA EURO 2017 Best XI.",
		superpower: "Relentless drive",
		position: "defender",
		nationalCaps: 133,
		clubs: ["Fortuna Hjørring", "Avaldsnes IL", "Western Sydney Wanderers", "Danish National Team"],
		teamVision:
			"I want a team that never stops running, never stops fighting. The right flank is about relentless energy and overlapping runs.",
		lookingFor: [
			"Players with exceptional stamina",
			"Wingers who track back",
			"Midfielders who support attacks",
		],
		careerHighlights: [
			{
				_key: generateKey(),
				title: "133 International Caps",
				year: "2006-2021",
				description: "Denmark's most capped female player in history",
			},
			{
				_key: generateKey(),
				title: "UEFA EURO 2017 Best XI",
				year: "2017",
				description: "Selected as the best right-back at the European Championship",
			},
		],
		quote:
			"Every sprint, every tackle, every moment matters. That's how you build a legacy.",
		videoUrl: `${HERO_VIDEO_CDN_BASE}/captains/theresa`,
		heroMediaType: "both",
		featured: true,
		order: 3,
		bio: [
			{
				_key: generateKey(),
				_type: "block",
				style: "normal",
				children: [
					{
						_key: generateKey(),
						_type: "span",
						text: "Theresa Eslund is Denmark's most capped female player ever. Her relentless drive and tactical intelligence earned her a spot in the UEFA EURO 2017 Best XI, and she's ready to bring that same energy to Sensational League.",
					},
				],
			},
		],
	},
	{
		_type: "captain",
		_id: "captain-nina-frausing-pedersen",
		name: "Nina Frausing Pedersen",
		slug: { _type: "slug", current: "nina-frausing-pedersen" },
		tagline: "Defender • Liverpool & Fortuna Hjørring",
		oneLiner: "National Caps x Liverpool, Fortuna Hjørring, Brøndby",
		summary:
			"International across Denmark, Sweden, Germany, England, and Australia—while earning a PhD.",
		superpower: "Perseverance",
		position: "defender",
		nationalCaps: 48,
		clubs: ["Liverpool FC", "Fortuna Hjørring", "Brøndby IF", "Turbine Potsdam", "Danish National Team"],
		teamVision:
			"Football is about intelligence and perseverance. I'm looking for players who think two steps ahead and never give up.",
		lookingFor: [
			"Smart, tactical players",
			"Defenders who read the game",
			"Players balancing football with life goals",
		],
		careerHighlights: [
			{
				_key: generateKey(),
				title: "International Career",
				year: "2010-2020",
				description: "Played professionally across 5 countries",
			},
			{
				_key: generateKey(),
				title: "PhD Researcher",
				year: "2023",
				description: "Earned doctorate while maintaining professional career",
			},
		],
		quote:
			"You can achieve anything if you're willing to work for it—on and off the pitch.",
		videoUrl: `${HERO_VIDEO_CDN_BASE}/captains/nina`,
		heroMediaType: "both",
		featured: true,
		order: 4,
		bio: [
			{
				_key: generateKey(),
				_type: "block",
				style: "normal",
				children: [
					{
						_key: generateKey(),
						_type: "span",
						text: "Nina Frausing Pedersen proves that elite football and academic excellence can go hand in hand. While playing for Liverpool and across Europe, she earned her PhD—embodying the Sensational League spirit of excellence in all pursuits.",
					},
				],
			},
		],
	},
	{
		_type: "captain",
		_id: "captain-nicoline-sorensen",
		name: "Nicoline Sørensen",
		slug: { _type: "slug", current: "nicoline-sorensen" },
		tagline: "Forward • Everton & Brøndby • Denmark International",
		oneLiner: "54 Caps x Everton striker",
		summary:
			"One of Denmark's most electric attackers with 100+ club games and national TV commentary chops.",
		superpower: "Instant change of pace",
		position: "forward",
		nationalCaps: 54,
		clubs: ["Everton FC", "Brøndby IF", "Linköpings FC", "Danish National Team"],
		teamVision:
			"Attack is about creativity and instinct. I want players who can unlock defenses with a single touch.",
		lookingFor: [
			"Creative forwards",
			"Players with flair and confidence",
			"Attackers who love the big stage",
		],
		careerHighlights: [
			{
				_key: generateKey(),
				title: "54 International Caps",
				year: "2015-present",
				description: "Regular starter for the Danish national team",
			},
			{
				_key: generateKey(),
				title: "Everton Career",
				year: "2020-2023",
				description: "49 appearances in the FA Women's Super League",
			},
			{
				_key: generateKey(),
				title: "TV Expert",
				year: "2023-present",
				description: "National TV football commentator and analyst",
			},
		],
		quote:
			"Football should be fun. When you play with joy, magic happens.",
		videoUrl: `${HERO_VIDEO_CDN_BASE}/captains/nicoline`,
		heroMediaType: "both",
		featured: true,
		order: 5,
		bio: [
			{
				_key: generateKey(),
				_type: "block",
				style: "normal",
				children: [
					{
						_key: generateKey(),
						_type: "span",
						text: "Nicoline Sørensen brings electric pace and creativity to every team she plays for. From Everton to the Danish national team, she's known for her ability to change games in an instant.",
					},
				],
			},
		],
	},
	{
		_type: "captain",
		_id: "captain-rikke-sevecke",
		name: "Rikke Sevecke",
		slug: { _type: "slug", current: "rikke-sevecke" },
		tagline: "Defender • Everton & Portland Thorns",
		oneLiner: "54 Caps x Everton, Portland Thorns",
		summary:
			"Modern centre-back dominating in Denmark, France, England, and the NWSL—now advocating athlete heart health.",
		superpower: "Strength with purpose",
		position: "defender",
		nationalCaps: 54,
		clubs: ["Portland Thorns", "Everton FC", "Bordeaux", "Brøndby IF", "Danish National Team"],
		teamVision:
			"Defense is about strength and intelligence. I want a backline that opponents fear.",
		lookingFor: [
			"Physical, commanding defenders",
			"Players who communicate constantly",
			"Leaders who organize the team",
		],
		careerHighlights: [
			{
				_key: generateKey(),
				title: "54 International Caps",
				year: "2014-2022",
				description: "Key defender for Danish national team",
			},
			{
				_key: generateKey(),
				title: "NWSL Career",
				year: "2022",
				description: "Played for Portland Thorns in America's top league",
			},
			{
				_key: generateKey(),
				title: "Heart Health Advocate",
				year: "2023-present",
				description: "Leading voice for athlete cardiac screening after retirement",
			},
		],
		quote:
			"True strength is using your platform for something bigger than yourself.",
		videoUrl: `${HERO_VIDEO_CDN_BASE}/captains/rikke`,
		heroMediaType: "both",
		featured: true,
		order: 6,
		bio: [
			{
				_key: generateKey(),
				_type: "block",
				style: "normal",
				children: [
					{
						_key: generateKey(),
						_type: "span",
						text: "Rikke Sevecke's career took her from Denmark to France, England, and America's NWSL. After her playing career, she's become a powerful advocate for athlete heart health, using her platform to drive real change.",
					},
				],
			},
		],
	},
];

async function seed() {
	console.log("🌱 Seeding captains...");

	for (const captain of captains) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await client.createOrReplace(captain as any);
			console.log(`✅ Created/updated: ${captain.name}`);
		} catch (error) {
			console.error(`❌ Failed to create ${captain.name}:`, error);
		}
	}

	console.log("✨ Seeding complete!");
	console.log("\n📋 Captain slugs created:");
	for (const captain of captains) {
		console.log(`   - /captains/${captain.slug.current}`);
	}
}

seed().catch(console.error);
