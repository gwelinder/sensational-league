/**
 * Seed script to populate welcome email template in Sanity
 * Run with: pnpm seed:email
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

const welcomeEmailTemplate = {
	_type: "emailTemplate",
	_id: "emailTemplate-welcome",
	name: "Welcome Email",
	templateId: "welcome-email",
	subject: "Welcome to the Sensational League ⚡",
	preheader: "We're so happy you're here",
	content: [
		{
			_type: 'block',
			_key: 'welcome-greeting',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'greeting-text',
					text: 'Welcome to the Sensational League ⚡',
					marks: ['strong'],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'welcome-intro',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'intro-text',
					text: "We're so happy you're here. Stay tuned for announcements about our captains, player-drafts and teams, venues and community reveals - and how you can become more part of the Sensational League.",
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'social-prompt',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'social-text-1',
					text: 'You can also follow us on our social platforms - ',
					marks: [],
				},
				{
					_type: 'span',
					_key: 'social-yt',
					text: 'YouTube',
					marks: ['link-youtube'],
				},
				{
					_type: 'span',
					_key: 'comma-1',
					text: ', ',
					marks: [],
				},
				{
					_type: 'span',
					_key: 'social-ig',
					text: 'Instagram',
					marks: ['link-instagram'],
				},
				{
					_type: 'span',
					_key: 'comma-2',
					text: ', ',
					marks: [],
				},
				{
					_type: 'span',
					_key: 'social-fb',
					text: 'Facebook',
					marks: ['link-facebook'],
				},
				{
					_type: 'span',
					_key: 'comma-3',
					text: ', ',
					marks: [],
				},
				{
					_type: 'span',
					_key: 'social-tt',
					text: 'TikTok',
					marks: ['link-tiktok'],
				},
				{
					_type: 'span',
					_key: 'and',
					text: ' & ',
					marks: [],
				},
				{
					_type: 'span',
					_key: 'social-x',
					text: 'X',
					marks: ['link-twitter'],
				},
				{
					_type: 'span',
					_key: 'period',
					text: '.',
					marks: [],
				},
			],
			markDefs: [
				{
					_key: 'link-youtube',
					_type: 'link',
					href: 'https://youtube.com/@SensationalLeague',
				},
				{
					_key: 'link-instagram',
					_type: 'link',
					href: 'https://instagram.com/sensational_league',
				},
				{
					_key: 'link-facebook',
					_type: 'link',
					href: 'https://facebook.com/SensationalLeague',
				},
				{
					_key: 'link-tiktok',
					_type: 'link',
					href: 'https://tiktok.com/@Sensationalleague',
				},
				{
					_key: 'link-twitter',
					_type: 'link',
					href: 'https://twitter.com/SensationalLG',
				},
			],
		},
	],
	signature: "Warm regards,\nSaga & the Sensational Team",
	ctaButton: {
		text: "Visit Our Website",
		url: "https://sensationalleague.com",
	},
	socialLinks: {
		youtube: "https://youtube.com/@SensationalLeague",
		instagram: "https://instagram.com/sensational_league",
		facebook: "https://facebook.com/SensationalLeague",
		tiktok: "https://tiktok.com/@Sensationalleague",
		twitter: "https://twitter.com/SensationalLG",
	},
	enabled: true,
};

async function seed() {
	console.log("🌱 Seeding email template...");

	try {
		await client.createOrReplace(welcomeEmailTemplate);
		console.log("✅ Created/updated: Welcome Email Template");

		// Delete draft if exists
		try {
			await client.delete(`drafts.${welcomeEmailTemplate._id}`);
			console.log("✅ Deleted draft (will use published version)");
		} catch {
			console.log("ℹ️  No draft to delete");
		}
	} catch (error) {
		console.error("❌ Failed to create email template:", error);
	}

	console.log("✨ Seeding complete!");
	console.log("\n📧 You can now edit the welcome email in Sanity Studio:");
	console.log("   Go to /studio → Email Template → Welcome Email");
}

seed().catch(console.error);
