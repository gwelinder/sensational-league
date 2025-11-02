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
		ctaText: "JOIN →",
		stats: [
			{ value: "300+", label: "Athletes" },
			{ value: "24", label: "Teams" },
			{ value: "12", label: "SDG Goals" }
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
				title: "Elite Competition",
				description: "7v7 format with professional standards and innovative scoring systems."
			},
			{
				title: "Social Impact",
				description: "Teams earn points for community engagement and UN SDG contributions."
			},
			{
				title: "Digital Innovation",
				description: "Multi-metric tracking including social media growth and viral moments."
			}
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
			{ value: "24", label: "Teams" },
			{ value: "300+", label: "Athletes" },
			{ value: "50K", label: "Community" },
			{ value: "12", label: "SDG Goals" }
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

async function seed() {
	console.log("🌱 Seeding home page...");

	try {
		await client.createOrReplace(homePageContent);
		console.log("✅ Created/updated: Home Page");
	} catch (error) {
		console.error("❌ Failed to create home page:", error);
	}

	console.log("✨ Seeding complete!");
}

seed().catch(console.error);
