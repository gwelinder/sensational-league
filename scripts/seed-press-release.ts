/**
 * Seed script to populate press release in Sanity
 * Run with: pnpm seed:press
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

const pressReleaseContent = {
	_type: "pressRelease",
	_id: "pressRelease-moonbug-investment",
	title: "Moonbug Investment Announcement 2025",
	slug: {
		_type: 'slug',
		current: 'moonbug-investment-2025',
	},
	publishDate: "2025-11-04",
	featuredImageFromSharePoint: "Bettina, Majken og Rene.jpg",
	headlineDa: "Dansk-skabt International Kvindefodboldliga får Millioninvestering fra Moonbug-stifter",
	subheadlineDa: "To danske kvindelige iværksættere lancerer professionel international kvindefodboldliga med innovativt format og kommerciel forretningsmodel",
	contentDa: [
		{
			_type: 'block',
			_key: 'intro',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'intro-text',
					text: 'KØBENHAVN, 4. november 2025',
					marks: ['strong'],
				},
				{
					_type: 'span',
					_key: 'intro-text-2',
					text: ' – Sensational League, en ny international 7v7 professionel kvindefodboldliga, lancerer i april 2026 med København som første værtsby. Ligaen er skabt af Bettina Kuperman og Majken Gilmartin fra Saga Sports Group. René Rechtman, stifter af Moonbug Entertainment (Blippi, CoComelon) er investor.',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'market',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'market-text',
					text: 'Kvindesport oplever markant vækst globalt. Kvinder står for 75% af verdensøkonomiens forbrug og udgør over 700 millioner aktive sportsfans, men modtager under 5% af sportens sponsorkroner. Det er den markedsmulighed, Sensational League går efter.',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'quote-bettina',
			style: 'blockquote',
			children: [
				{
					_type: 'span',
					_key: 'quote-text',
					text: '"Vi bygger et kommercielt økosystem omkring kvindefodbold, hvor værdi skabes for spillere, fans og brands. Momentum i kvindefodbold er massivt, og markedspotentialet er kun lige begyndt at folde sig ud." — Bettina Kuperman, CEO',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'investment-header',
			style: 'h3',
			children: [
				{
					_type: 'span',
					_key: 'inv-header-text',
					text: 'Investering fra Moonbug-stifter',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'investment-text',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'inv-text',
					text: 'René Rechtman, en af Danmarks mest succesfulde iværksættere, investerer i ligaen.',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'quote-rene',
			style: 'blockquote',
			children: [
				{
					_type: 'span',
					_key: 'quote-rene-text',
					text: '"Sensational League har alt, investorer leder efter: Et erfarent team, en skalerbar forretningsmodel og perfekt timing. Grundlæggerne ved, hvordan man bygger sportsplatforme, der kan vokse internationalt. Kvindesport er uden tvivl det næste store vækstområde" — René Rechtman',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'format-header',
			style: 'h3',
			children: [
				{
					_type: 'span',
					_key: 'format-header-text',
					text: 'Formatet',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'format-intro',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'format-intro-text',
					text: 'Ligaen kombinerer professionel sport med underholdning og digitalt engagement:',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'format-list',
			style: 'normal',
			listItem: 'bullet',
			level: 1,
			children: [
				{
					_type: 'span',
					_key: 'list-1',
					text: '8 hold med betalte spillere og influencer kaptajner',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'format-list-2',
			style: 'normal',
			listItem: 'bullet',
			level: 1,
			children: [
				{
					_type: 'span',
					_key: 'list-2',
					text: '7v7-format optimeret til live-produktion og streaming',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'format-list-3',
			style: 'normal',
			listItem: 'bullet',
			level: 1,
			children: [
				{
					_type: 'span',
					_key: 'list-3',
					text: '6 festival kampdage og finale der kombinerer sport, musik og livsstil',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'format-list-4',
			style: 'normal',
			listItem: 'bullet',
			level: 1,
			children: [
				{
					_type: 'span',
					_key: 'list-4',
					text: 'Point system baseret på sportsresultater, fan og community engagement',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'format-list-5',
			style: 'normal',
			listItem: 'bullet',
			level: 1,
			children: [
				{
					_type: 'span',
					_key: 'list-5',
					text: 'Digital platform med sports og livsstils-content',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'founders-header',
			style: 'h3',
			children: [
				{
					_type: 'span',
					_key: 'founders-header-text',
					text: 'Kvindelige iværksættere med international erfaring',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'founders-text',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'founders-text-content',
					text: 'Bettina Kuperman og Majken Gilmartin har begge en lang karriere i den internationale sportsverden bag sig. Kuperman har lukket kommercielle aftaler for over $80M USD, har arbejdet med Olympiske budkampagner, Champions League og håndteret marketing og promovering ved adskillige EM og VM\'er. Gilmartin er en verdensanerkendt pioner indenfor kvindefodbold og grundlagde den FN-anerkendte Global Goals World Cup og en fodbold specialdesignet til at mindske skader hos kvinder. Hun har blandt andet modtaget IOC\'s Women & Sport Trophy.',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'quote-majken',
			style: 'blockquote',
			children: [
				{
					_type: 'span',
					_key: 'quote-majken-text',
					text: '"Vi designer ikke en liga, der efterligner herrefodbold. Vi bygger en platform, der er skabt til, hvordan kvinder konkurrerer, netværker og forbruger. Det er her, muligheden for gennembrud er," — Majken Gilmartin, COO',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'expansion-header',
			style: 'h3',
			children: [
				{
					_type: 'span',
					_key: 'expansion-header-text',
					text: 'Ekspansion til UK og USA',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'expansion-text',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'expansion-text-content',
					text: 'Efter lancering i Norden i april 2026 ekspanderer ligaen til Storbritannien og USA.',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'announcements',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'announcements-text',
					text: 'Kommende annonceringer dækker kaptajner og spillere, advisory board, præmiepenge og partnerskaber.',
					marks: [],
				},
			],
			markDefs: [],
		},
	],
	contactPerson: {
		name: "Bettina Kuperman",
		title: "CEO, Saga Sports Group",
		phone: "",
		email: "media@sagasportsgroup.com",
	},
	aboutSectionsDa: [
		{
			_key: 'about-founders',
			title: "Om Founders",
			content: `Bettina Kuperman - CEO, Saga Sports Group

Bettina Kuperman har over 20 års international erfaring fra Europa og Mellemøsten. Hun har arbejdet med nogle af verdens største sportsbegivenheder, fra OL-bud til Champions League og FIBA Basketball mesterskaber, og har rådgivet regeringer, forbund og topledere i, hvordan sport kan bruges strategisk til at skabe kommerciel og samfundsmæssig værdi. Hun har stået bag kommercielle aftaler for mere end 80 mio. USD og er kendt for at skabe synergi og netværk på tværs af sektorer. Cand.jur. fra Københavns Universitet og erfaren iværksætter. Tidligere bosat i Bruxelles, Lausanne, Istanbul.

Majken Gilmartin - COO, Saga Sports Group

Majken Gilmartin er en internationalt anerkendt pioner inden for kvindesport og udviklingen af nye sportsformater for kvinder. Hun er grundlægger af Global Goals World Cup og står bag udviklingen af en fodbold designet til at reducere skaderisikoen for kvindelige spillere. Med en baggrund i filmproduktion – fra Hollywood til den nordiske filmbranche – har hun skabt internationale sportskoncepter og står ofte på globale scener som TED, Davos og FN's Generalforsamling. Majken har modtaget IOC Women & Sport Trophy og er blevet anerkendt af både UEFA og europæiske regeringer for sit lederskab inden for kvindesport. Tidligere bosat i Los Angeles og New York.`,
		},
		{
			_key: 'about-saga',
			title: "Om Saga Sports Group",
			content: "Saga Sports Group er en international sports- og entertainmentvirksomhed med fokus på kvindesport. Saga ejer og driver Sensational League og udvikler kommercielle sportsplatforme, der forener konkurrence, medieproduktion og partnerskaber. Saga Sports Group er støttet af erfarne investorer og ledere med baggrund i sport, medier og teknologi.",
		},
		{
			_key: 'about-sensational',
			title: "Om Sensational League",
			content: "Sensational League er en professionel 7v7-fodboldliga for kvinder. Ligaen lanceres i Norden i april 2026 og udvides derefter til Storbritannien og USA. Formatet kombinerer elitefodbold med underholdning og digitalt indhold i en skalerbar, kommerciel model.",
		},
	],
	// English Version
	headlineEn: "SENSATIONAL LEAGUE LAUNCHES: WOMEN'S FOOTBALL MEETS ENTERTAINMENT, MEDIA, AND LIFESTYLE",
	subheadlineEn: "With investor backing and a model built for scale, Sensational League positions women's football for global commercial growth",
	contentEn: [
		{
			_type: 'block',
			_key: 'intro-en',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'intro-text-en',
					text: 'COPENHAGEN, November 4th, 2025',
					marks: ['strong'],
				},
				{
					_type: 'span',
					_key: 'intro-text-2-en',
					text: ' - ',
					marks: [],
				},
				{
					_type: 'span',
					_key: 'intro-text-3-en',
					text: 'Sensational League',
					marks: ['em'],
				},
				{
					_type: 'span',
					_key: 'intro-text-4-en',
					text: ', a new international 7v7 professional women\'s football league, launches April 2026 across the Nordics -before expanding to the UK and US.',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'market-en',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'market-text-en',
					text: 'The League combines elite competition with entertainment-driven festival match days, paid athletes, and year-round digital engagement, positioning women\'s football as a commercial sports entertainment platform.',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'market2-en',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'market2-text-en',
					text: 'Women drive 75% of global consumer spending and represent over 700 million active sports fans, yet women\'s sports receive less than 5% of sports sponsorships. That\'s the opportunity ',
					marks: [],
				},
				{
					_type: 'span',
					_key: 'market2-text-em-en',
					text: 'Sensational League',
					marks: ['em'],
				},
				{
					_type: 'span',
					_key: 'market2-text-2-en',
					text: ' seizes, proving that women\'s football, when designed authentically for athletes and fans, can become one of the most valuable properties in global sports entertainment.',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'saga-intro-en',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'saga-text-en',
					text: 'Sensational League',
					marks: ['em'],
				},
				{
					_type: 'span',
					_key: 'saga-text-2-en',
					text: ' is created and owned by Saga Sports Group, an international sports & entertainment business, founded by experienced sports executives Bettina Kuperman and Majken Gilmartin.',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'quote-bettina-en',
			style: 'blockquote',
			children: [
				{
					_type: 'span',
					_key: 'quote-text-en',
					text: '"We\'re building a new ecosystem for women\'s football, designed for the network economy where players, fans, brands, and cities are active co-creators," says Bettina Kuperman, CEO and Co-Founder. "We\'re rethinking the industry to prove that women\'s football can generate real commercial value on its own terms."',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'investment-header-en',
			style: 'h3',
			children: [
				{
					_type: 'span',
					_key: 'inv-header-text-en',
					text: 'BACKED BY MOONBUG FOUNDER',
					marks: ['strong'],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'investment-text-en',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'inv-text-en',
					text: 'The League is backed by entrepreneur and investor René Rechtman, founder of Moonbug Entertainment (Blippi, CoComelon).',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'quote-rene-en',
			style: 'blockquote',
			children: [
				{
					_type: 'span',
					_key: 'quote-rene-text-en',
					text: '"The Sensational League has everything investors look for: A proven team, a scalable model, and perfect timing. The founders know how to turn sports into global entertainment IP that connects with today\'s audiences. Women\'s sports is the next growth engine of the industry," says René Rechtman.',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'experience-header-en',
			style: 'h3',
			children: [
				{
					_type: 'span',
					_key: 'experience-header-text-en',
					text: 'THE EXPERIENCE',
					marks: ['strong'],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'experience-list-en',
			style: 'normal',
			listItem: 'bullet',
			level: 1,
			children: [
				{
					_type: 'span',
					_key: 'list-1-en',
					text: 'Paid players across 8 teams led by athlete-influencer captains',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'experience-list-2-en',
			style: 'normal',
			listItem: 'bullet',
			level: 1,
			children: [
				{
					_type: 'span',
					_key: 'list-2-en',
					text: '7v7 format: fast games made for broadcast and streaming',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'experience-list-3-en',
			style: 'normal',
			listItem: 'bullet',
			level: 1,
			children: [
				{
					_type: 'span',
					_key: 'list-3-en',
					text: 'Point system rewards match performance, fan engagement, and community impact',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'experience-list-4-en',
			style: 'normal',
			listItem: 'bullet',
			level: 1,
			children: [
				{
					_type: 'span',
					_key: 'list-4-en',
					text: '6 festival-like match days',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'experience-list-5-en',
			style: 'normal',
			listItem: 'bullet',
			level: 1,
			children: [
				{
					_type: 'span',
					_key: 'list-5-en',
					text: 'League Finals - football, music, and lifestyle',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'experience-list-6-en',
			style: 'normal',
			listItem: 'bullet',
			level: 1,
			children: [
				{
					_type: 'span',
					_key: 'list-6-en',
					text: 'Year-round digital fan and content strategy',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'female-header-en',
			style: 'h3',
			children: [
				{
					_type: 'span',
					_key: 'female-header-text-en',
					text: 'FEMALE FANS AND PLAYERS',
					marks: ['strong'],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'quote-majken-en',
			style: 'blockquote',
			children: [
				{
					_type: 'span',
					_key: 'quote-majken-text-en',
					text: '"The future of women\'s sports lies in design, not imitation," says Majken Gilmartin, Co-Founder and COO. "We\'ve built a format shaped by how women compete, connect, and consume and that\'s where the next commercial breakthrough will happen."',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'announcements-en',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'announcements-text-en',
					text: 'Upcoming announcements will reveal city hosts, founding captains, expert advisory board, prize money, brand collaborations, and media partnerships ahead of the 2026 debut season.',
					marks: [],
				},
			],
			markDefs: [],
		},
		{
			_type: 'block',
			_key: 'signup-en',
			style: 'normal',
			children: [
				{
					_type: 'span',
					_key: 'signup-text-en',
					text: 'Sign up for the newsletter @ ',
					marks: [],
				},
				{
					_type: 'span',
					_key: 'signup-link-en',
					text: 'sensationalleague.com',
					marks: ['link-website'],
				},
				{
					_type: 'span',
					_key: 'signup-text-2-en',
					text: '.',
					marks: [],
				},
			],
			markDefs: [
				{
					_key: 'link-website',
					_type: 'link',
					href: 'https://sensationalleague.com',
				},
			],
		},
	],
	aboutSectionsEn: [
		{
			_key: 'about-founders-en',
			title: "ABOUT THE FOUNDERS",
			content: `Bettina Kuperman - CEO, Saga Sports Group
Over 20 years of international sports leadership across Europe and emerging markets. With a background in major events, from Olympic and UEFA Euro bids to the Champions League and FIBA Basketball Championships, she has advised governments, federations, and senior leaders on how to use sport strategically to generate commercial and societal value. Closed over $80M USD in deal value and is known for cross sector value creation. Master of Laws (LL.M), Sports Law and Economics; founder of international sports and entertainment agencies.

Majken Gilmartin - COO, Saga Sports Group
Internationally recognized pioneer in women's sport and innovative women's sports formats. Founder of the Global Goals World Cup and developer of a football designed specifically to reduce injury risk for female players. Background in film production with notable credits in Hollywood and the Nordic movie scene, creating international sports competitions, and an avid speaker on global stages including TED, Davos, and the UN General Assembly. Majken has been awarded the IOC Women & Sport Trophy and acknowledged by UEFA and European governments for her leadership in women's sports.`,
		},
		{
			_key: 'about-saga-en',
			title: "ABOUT SAGA SPORTS GROUP",
			content: "Saga Sports Group, an international sports and entertainment business specializing in women's sports, is the owner and operator of Sensational League. Saga builds sports platforms designed for women, combining competition, content, and commerce in scalable business models.\n\nSaga Sports Group proves the business case for women's football by building profitable platforms that create professional careers for athletes and turn female fans into the most valuable community in sport.\n\nThe company is backed by leading entrepreneurs and investors committed to women's sports growth. For more information: www.sagasportsgroup.com",
		},
		{
			_key: 'about-sensational-en',
			title: "ABOUT SENSATIONAL LEAGUE",
			content: "Sensational League is an international 7v7 professional women's football league launching in April 2026 across the Nordics, then UK and US. Combining elite competition, lifestyle and digital storytelling, the League is built for the network economy where performance, visibility, and community create shared growth.",
		},
	],
	seo: {
		metaTitle: "Pressemeddelelse - Sensational League | Millioninvestering fra Moonbug-stifter",
		metaDescription: "Sensational League lancerer i april 2026 med København som første værtsby. Professionel 7v7 kvindefodboldliga med investering fra René Rechtman (Moonbug). Skabt af Bettina Kuperman og Majken Gilmartin.",
		keywords: [
			"kvindefodbold",
			"women's football",
			"Sensational League",
			"Moonbug",
			"René Rechtman",
			"Bettina Kuperman",
			"Majken Gilmartin",
			"Saga Sports Group",
			"7v7 fodbold",
			"København",
			"sports innovation"
		],
	},
};

async function seed() {
	console.log("🌱 Seeding press release...");

	try {
		await client.createOrReplace(pressReleaseContent);
		console.log("✅ Created/updated: Press Release - Moonbug Investment");

		// Delete draft if exists
		try {
			await client.delete(`drafts.${pressReleaseContent._id}`);
			console.log("✅ Deleted draft (will use published version)");
		} catch {
			console.log("ℹ️  No draft to delete");
		}
	} catch (error) {
		console.error("❌ Failed to create press release:", error);
	}

	console.log("✨ Seeding complete!");
}

seed().catch(console.error);
