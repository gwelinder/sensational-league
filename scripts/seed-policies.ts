/**
 * Seed script to populate initial policies in Sanity
 * Run with: pnpm seed:policies
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

const policies = [
	{
		_type: "policy",
		_id: "release-of-liability",
		title: "Release of Liability",
		slug: { _type: "slug", current: "release-of-liability" },
		order: 1,
		content: [
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "When you play in the Sensational League you agree to the following:",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "I hereby acknowledge that the activities in which I voluntarily have chosen to participate are primarily athletic in nature. I certify that I have no known medical or other conditions that could interfere with my participation in Eir Org.'s activities.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "I understand and acknowledge that sports, both indoor and outdoor, involve inherent risks of physical injury (including, but not limited to, injuries), and I hereby assume those risks.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Therefore, in consideration for being permitted to participate in EIR Org.'s activities, I, individually, and each of my respective family, heirs, assigns, guardians, executors, administrators and representatives of any kind, voluntarily release, waive, hold harmless, discharge, and covenant not to sue Eir Org. or its respective parent, subsidiary, and/or affiliated companies (including not limited to Eir Coach Program, Sensational League, Global Goals World Cup and Country Host), or any of its Eir officers, directors or trustees, agents, representatives, employees, successors, assignees, designees, vendors, licensors and licensees (individually, collectively, and together with Eir Org, referred to herein as the \"Released Parties\") from any and all claims, demands, actions and causes of action whatsoever, liabilities, costs and expenses of any kind (including, but not limited to attorneys' fees) that I have, might have or may acquire in the future, arising out of or related to participating in Eir Org.'s activities, for any and all injury, risk of illness, damages or losses, including death or damage to any property belonging to me, whether caused by the acts or omissions (whether negligent or not and including any alleged breach of the duty of care), of any, each and all of the Released Parties.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [{ _type: "span", text: "Image rights" }],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: 'EIR Org. may record your image, photograph, and voice by any technology or means at the event ("Recording") and use it in various media for promotional or marketing purpose, and I release EIR Org. from any claims resulting from such use of the Recording.',
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [{ _type: "span", text: "No Compensation" }],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "I understand that I will not receive any compensation for my participation in activities, other than the enjoyment and experience of the activities themselves.",
					},
				],
			},
		],
	},
	{
		_type: "policy",
		_id: "terms-and-conditions",
		title: "Terms & Conditions",
		slug: { _type: "slug", current: "terms-and-conditions" },
		order: 2,
		content: [
			{
				_type: "block",
				style: "h2",
				children: [{ _type: "span", text: "Welcome to Sensational League!" }],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "These terms and conditions outline the rules and regulations for the use of Eir Org's Website, located at https://sensational-league.com/.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "By accessing this website we assume you accept these terms and conditions. Do not continue to use Sensational League if you do not agree to take all of the terms and conditions stated on this page.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: 'The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company\'s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client\'s needs in respect of provision of the Company\'s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.',
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [{ _type: "span", text: "Cookies" }],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "We employ the use of cookies. By accessing Sensational League, you agreed to use cookies in agreement with the Eir Org's Privacy Policy.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [{ _type: "span", text: "License" }],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Unless otherwise stated, Eir Org and/or its licensors own the intellectual property rights for all material on Sensational League. All intellectual property rights are reserved. You may access this from Sensational League for your own personal use subjected to restrictions set in these terms and conditions.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [{ _type: "span", text: "You must not:" }],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Republish material from sensational-league.com",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Sell, rent or sub-license material from sensational-league.com",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Reproduce, duplicate or copy material from sensational-league.com",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Redistribute content from sensational-league.com",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "This Agreement shall begin on the date hereof.",
					},
				],
			},
		],
	},
	{
		_type: "policy",
		_id: "data-protection-policy",
		title: "Data Protection Policy",
		slug: { _type: "slug", current: "data-protection-policy" },
		order: 3,
		content: [
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Sensational-league.com is run by EIR Soccer, a non-profit sports Association under Danish Law. We are what is called a data owner, because we collect the data that our players, volunteers and followers submit to us. We are committed to protecting your privacy and we take our responsibility regarding the security of your information very seriously. We will be clear and transparent about the information we are collecting and what we will do with that information. We are continuously working to update our data protection processes.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [{ _type: "span", text: "What personal data we collect" }],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Personal data means any information relating to you which allows us to identify you, such as your name, contact details, and preferences eg. for one of the UN Global Goals.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "We may collect personal data from you when you register for a newsletter, a tournament, a program or an event.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Specifically, we may collect the following categories of information:",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Name, home address, e-mail address, telephone number",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Personal details such as your nationality, birthdate and gender.",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Information you provide about yourself and your team.",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Information about your use of our website and/or our Global Goals Action Lab (Under construction)",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "The communications you exchange with us or direct to us via letters, emails, chat service, calls, and social media.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [{ _type: "span", text: "Security of your personal data" }],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "To protect the personal data of our users and to comply with the new European rules on data protection, all suppliers to EIR Soccer that are processing and controlling personal data from us have signed data processor agreements.",
					},
				],
			},
		],
	},
	{
		_type: "policy",
		_id: "child-protection-policy",
		title: "Child Protection Policy",
		slug: { _type: "slug", current: "child-protection-policy" },
		order: 4,
		content: [
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Sensational-league.com by Eir Org recognises that football/sport can have a powerful and positive influence on communities, including children. It provides great friendships, a strong sense of belonging, it can develop valuable life skills like self-esteem, leadership and teamwork. These positive effects can only take place when football programs are safe places for children and organized by people who place the wellbeing of children first and adopt practices that support, protect and empower them.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [
					{
						_type: "span",
						text: "The purpose of our Child Protecting Safeguarding Policy",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Promote and prioritize the safety and wellbeing of all children.",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Provide staff, coaches, partners and volunteers with the right understanding and training to be playful responsible role models and leaders. Talk about how we recognise, identify and respond to safeguarding concerns relating to children.",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Ensure that appropriate action is taken in the event of incidents or concerns and that support is provided to those who raise or disclose the concern.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [{ _type: "span", text: "Policy statement" }],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "We are fully committed to the safeguarding of all children from all forms of violence and abuse. We work to ensure that we, as an organization, as well as anyone who represents us, does not in any way harm, abuse or commit any other act of violence against children or place them at risk. We will challenge and do not tolerate inequality, discrimination or exclusion.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [{ _type: "span", text: "Reporting and responding" }],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "In the event, an incident arises or a situation occurs which may create cause for concern, all Covered People are obligated to immediately report breaches or suspicions of breaches of this Policy to Eir Org at mh@eirsoccer.com in order for them to be investigated immediately.",
					},
				],
			},
		],
	},
	{
		_type: "policy",
		_id: "guidelines-for-playing",
		title: "Guidelines for Playing",
		slug: { _type: "slug", current: "guidelines-for-playing" },
		order: 5,
		content: [
			{
				_type: "block",
				style: "h2",
				children: [
					{ _type: "span", text: "Guidelines for playing in the league" },
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Everywhere we play, we strive to create a space where individuals can come together, build friendships, and foster a sense of community.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "To ensure that our league remains safe, inclusive, and respectful, we have established the following guidelines:",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [
					{ _type: "span", text: "1. Treat others with kindness and respect" },
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Be considerate and supportive towards fellow members, regardless of their background, beliefs, or opinions.",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Avoid discriminatory or derogatory language. Personal attacks, threats, or harassment of any kind (on or off the fields) will not be tolerated.",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "The teams you will play, might have different football experiences than your team. Always play at a level that will allow everyone to be the best player they can be.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [
					{
						_type: "span",
						text: "2. Foster an inclusive environment at all times",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Embrace diversity and inclusivity in all interactions. Everyone is welcome in this league and are encouraged to play and feel valued.",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Engage in open-minded conversations, appreciating different perspectives without judgment or prejudice.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [{ _type: "span", text: "3. Maintain personal boundaries" }],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Respect the privacy and consent of others. Do not share personal information or pictures without permission.",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Refrain from intrusive or overly personal questions or comments.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [{ _type: "span", text: "4. Be mindful of your language" }],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Keep discussions and conversations appropriate and free from offensive, explicit, or explicit content.",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Refrain from using strong language or profanity that may cause discomfort or offense to others.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [
					{ _type: "span", text: "5. Seek resolution through dialogue" },
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "In the event of a disagreement or conflict, approach discussions with a constructive and understanding mindset.",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Communicate openly and calmly, striving to find common ground and create a positive outcome.",
					},
				],
			},
			{
				_type: "block",
				style: "h3",
				children: [{ _type: "span", text: "6. Report inappropriate behavior" }],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "If you witness or experience any behavior that violates our guidelines, promptly report it to the League Managers.",
					},
				],
			},
			{
				_type: "block",
				listItem: "bullet",
				children: [
					{
						_type: "span",
						text: "Do not attempt to resolve issues personally; let our team handle the situation to ensure a fair and unbiased resolution.",
					},
				],
			},
			{
				_type: "block",
				style: "normal",
				children: [
					{
						_type: "span",
						text: "Remember, our collective efforts are vital in maintaining a safe, inclusive, and respectful space within the league. Let us work together to create an environment where our global network and friendships can flourish.",
					},
				],
			},
		],
	},
];

async function seed() {
	console.log("🌱 Seeding policies...");

	for (const policy of policies) {
		try {
			await client.createOrReplace(policy);
			console.log(`✅ Created/updated: ${policy.title}`);
		} catch (error) {
			console.error(`❌ Failed to create ${policy.title}:`, error);
		}
	}

	console.log("✨ Seeding complete!");
}

seed().catch(console.error);
