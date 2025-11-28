/**
 * Seed script to populate initial captain profiles in Sanity
 * Run with: pnpm seed:captains
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

// Example captain data - replace with actual captain information
const captains = [
	{
		_type: "captain",
		_id: "captain-bettina-sorensen",
		name: "Bettina Sørensen",
		slug: { _type: "slug", current: "bettina-sorensen" },
		tagline: "Defender • 5x Danish Champion • Brøndby Legend",
		oneLiner: "56 Caps × Brøndby Legend",
		summary:
			"A cornerstone of Danish women's football for over a decade, Bettina brings unmatched tactical intelligence and leadership to the field. Her journey from grassroots to international glory embodies the spirit of Sensational League.",
		superpower: "Reading the game three moves ahead",
		position: "defender",
		nationalCaps: 56,
		clubs: ["Brøndby IF", "FC Nordsjælland", "Danish National Team"],
		teamVision:
			"I want to build a team that plays fearless, attacking football while maintaining a rock-solid defensive foundation. Looking for players who are hungry to learn, love the game, and want to be part of something bigger than themselves.",
		lookingFor: [
			"Committed defenders who communicate",
			"Creative midfielders with work rate",
			"Players passionate about community impact",
		],
		careerHighlights: [
			{
				title: "5x Danish Champion",
				year: "2015-2020",
				description:
					"Won five consecutive Danish league titles with Brøndby IF",
			},
			{
				title: "World Cup Qualifier",
				year: "2019",
				description:
					"Key player in Denmark's qualification campaign",
			},
			{
				title: "UEFA License Coach",
				year: "2022",
				description: "Completed UEFA B coaching license",
			},
		],
		quote:
			"Football gave me everything - now it's time to give back and create opportunities for the next generation.",
		socialMedia: {
			instagram: "bettina_sorensen",
		},
		featured: true,
		order: 1,
		bio: [
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Bettina Sørensen is one of the most decorated defenders in Danish women's football history. Her career spanning over 15 years has seen her lift countless trophies and inspire a generation of young players.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Beyond her achievements on the pitch, Bettina has been a vocal advocate for gender equality in sports and has worked extensively with youth development programs across Denmark.",
					},
				],
			},
		],
	},
	{
		_type: "captain",
		_id: "captain-majken-nielsen",
		name: "Majken Nielsen",
		slug: { _type: "slug", current: "majken-nielsen" },
		tagline: "Midfielder • Playmaker • Youth Academy Director",
		oneLiner: "42 Caps × Technical Maestro",
		summary:
			"Known for her exceptional vision and passing range, Majken has orchestrated some of the most memorable moments in Danish football. Now she's ready to orchestrate something even bigger.",
		superpower: "The perfect through ball",
		position: "midfielder",
		nationalCaps: 42,
		clubs: ["FC Rosengård", "Fortuna Hjørring", "Danish National Team"],
		teamVision:
			"Football should be beautiful, and I believe in building from the back with purpose. I'm looking for technically gifted players who aren't afraid to take risks and express themselves on the ball.",
		lookingFor: [
			"Ball-playing goalkeeper",
			"Technical center-backs comfortable on the ball",
			"Creative forwards who link play",
		],
		careerHighlights: [
			{
				title: "Champions League Quarter-finalist",
				year: "2018",
				description:
					"Led FC Rosengård to the Champions League quarter-finals",
			},
			{
				title: "Player of the Year",
				year: "2017",
				description: "Named Danish Women's Player of the Year",
			},
			{
				title: "Youth Academy Founder",
				year: "2021",
				description:
					"Founded a youth academy focused on technical development",
			},
		],
		quote:
			"The most beautiful football comes from players who are free to express themselves.",
		socialMedia: {
			instagram: "majken_nielsen",
			twitter: "majken14",
		},
		featured: true,
		order: 2,
		bio: [
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Majken Nielsen has been described as one of the most technically gifted players to emerge from Denmark. Her ability to control the tempo of a game and find impossible passes has made her a fan favorite everywhere she has played.",
					},
				],
			},
		],
	},
	{
		_type: "captain",
		_id: "captain-rene-christensen",
		name: "René Christensen",
		slug: { _type: "slug", current: "rene-christensen" },
		tagline: "Forward • Goal Machine • Entrepreneur",
		oneLiner: "78 Goals × Serial Winner",
		summary:
			"Denmark's all-time leading scorer in women's football, René brings an unmatched winning mentality and clinical finishing ability. Her entrepreneurial spirit extends beyond football into community development.",
		superpower: "Finding the net from anywhere",
		position: "forward",
		nationalCaps: 65,
		clubs: ["LSK Kvinner", "Brøndby IF", "Danish National Team"],
		teamVision:
			"Attack, attack, attack. I want to build the most exciting team in the league - one that fans can't take their eyes off. We'll press high, move fast, and score goals.",
		lookingFor: [
			"Speedy wingers who love to run at defenders",
			"Physical strikers who can hold the ball up",
			"Energetic midfielders for pressing",
		],
		careerHighlights: [
			{
				title: "All-time Top Scorer",
				year: "2020",
				description:
					"Became Denmark's all-time leading scorer in women's football with 78 goals",
			},
			{
				title: "Golden Boot",
				year: "2016",
				description:
					"Won the Norwegian league Golden Boot with LSK Kvinner",
			},
			{
				title: "Social Enterprise Founder",
				year: "2023",
				description:
					"Founded a sports-focused social enterprise supporting women in business",
			},
		],
		quote: "Goals win games, but impact wins hearts.",
		socialMedia: {
			instagram: "rene_christensen9",
			linkedin: "https://linkedin.com/in/rene-christensen",
		},
		featured: true,
		order: 3,
		bio: [
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "René Christensen needs no introduction to fans of Danish football. Her incredible goal-scoring record speaks for itself, but it's her leadership qualities and determination that truly set her apart.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Off the pitch, René has become a successful entrepreneur and advocate for women in sports business, launching initiatives that combine her love of football with social impact.",
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
