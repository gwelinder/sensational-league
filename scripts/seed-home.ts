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
	hero: {
		headline: "Play Football. Drive Impact. Change the World.",
		subheadline:
			"Join the next season of Sensational League—where every match, every goal, and every team action fuels real-world change for the UN Global Goals.",
		ctaText: "Join the Waitlist",
		ctaUrl: "#home-signup",
	},
	signupSection: {
		title: "Be First in Line for Next Season",
		description:
			"We\u2019re building the future of purpose-driven sport. Drop your email to get exclusive early access to player registration, team formation updates, and season launch announcements.",
		buttonText: "Count Me In",
	},
	aboutSection: {
		title: "Football as a Force for Good",
		content: [
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Sensational League isn\u2019t just football—it\u2019s a movement. Born from 20+ years of championing women in sport and informed by 7,800+ players across 17 countries, we\u2019ve created a completely new category of competitive play.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Here, your team\u2019s success is measured not just by goals scored, but by the positive actions you take toward all 17 UN Sustainable Development Goals. Every week, you\u2019re playing for something bigger than the scoreboard.",
					},
				],
			},
		],
	},
	howWePlaySection: {
		title: "How It Works",
		content: [
			{
				_type: "block",
				style: "h3",
				children: [
					{
						_type: "span",
						text: "On the Pitch + Off the Pitch = Total Impact",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Teams compete in weekly 5v5 matches with traditional scoring. But here\u2019s the twist: your team also earns impact points for actions you take toward the Global Goals—from sustainability initiatives to community service to policy advocacy.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "You\u2019ll connect with a global network of athlete activists, participate in empowering game day experiences, and discover how your passion for football can create tangible change in your community and beyond.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "This is sport reimagined. This is where competition meets purpose. This is Sensational League.",
					},
				],
			},
		],
	},
	partners: [],
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
