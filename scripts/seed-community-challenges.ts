/**
 * Seed script to populate initial community challenges in Sanity
 * Run with: pnpm seed:community-challenges
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
    "❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local"
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

// Community challenges aligned with Sensational League's mission
const challenges = [
  {
    _type: "communityChallenge",
    _id: "challenge-beach-cleanup",
    title: "Beach Cleanup Day",
    slug: { _type: "slug", current: "beach-cleanup-day" },
    description:
      "Teams compete to clean the most beach area and collect recyclable materials. Making our coastlines cleaner while building team spirit.",
    sdgGoals: ["sdg14", "sdg13", "sdg12"],
    startDate: "2025-06-01",
    endDate: "2025-09-30",
    pointsAvailable: 500,
    status: "upcoming",
    category: "environmental",
    icon: "🌊",
    featured: true,
    order: 1,
    requirements: [
      "Organize a team beach cleanup event",
      "Document the cleanup with photos",
      "Track the amount of waste collected (kg)",
      "Share on social media with #SensationalImpact",
    ],
    metrics: {
      targetVolunteerHours: 200,
      targetPeopleImpacted: 50,
      targetTeams: 6,
      customMetric: "Kg of Waste Collected",
      customMetricTarget: 500,
    },
  },
  {
    _type: "communityChallenge",
    _id: "challenge-youth-coaching",
    title: "Youth Coaching Sessions",
    slug: { _type: "slug", current: "youth-coaching-sessions" },
    description:
      "Lead football training sessions for local youth programs and schools. Inspire the next generation of women footballers.",
    sdgGoals: ["sdg4", "sdg5", "sdg3", "sdg10"],
    startDate: "2025-05-01",
    endDate: "2025-12-31",
    pointsAvailable: 750,
    status: "active",
    category: "education",
    icon: "⚽",
    featured: true,
    order: 2,
    requirements: [
      "Conduct at least 3 coaching sessions",
      "Minimum 10 participants per session",
      "Submit feedback forms from participants",
      "Complete the league's coaching certification",
    ],
    metrics: {
      targetVolunteerHours: 300,
      targetPeopleImpacted: 200,
      targetTeams: 6,
      customMetric: "Youth Players Coached",
      customMetricTarget: 150,
    },
  },
  {
    _type: "communityChallenge",
    _id: "challenge-social-amplification",
    title: "Social Media Amplification",
    slug: { _type: "slug", current: "social-media-amplification" },
    description:
      "Create and share content promoting women's sports and the league. Use your voice to drive visibility and inspire change.",
    sdgGoals: ["sdg5", "sdg10", "sdg17"],
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    pointsAvailable: 250,
    status: "active",
    category: "equality",
    icon: "📱",
    featured: false,
    order: 3,
    requirements: [
      "Create original content about women in sports",
      "Use hashtags #SensationalLeague #WomenInFootball",
      "Engage with community responses",
      "Minimum 3 posts per month",
    ],
    metrics: {
      targetPeopleImpacted: 10000,
      targetTeams: 6,
      customMetric: "Total Engagement",
      customMetricTarget: 50000,
    },
  },
  {
    _type: "communityChallenge",
    _id: "challenge-charity-match",
    title: "Charity Match Day",
    slug: { _type: "slug", current: "charity-match-day" },
    description:
      "Organize community events that raise awareness and funds for local causes. Football brings people together for good.",
    sdgGoals: ["sdg1", "sdg11", "sdg17", "sdg8"],
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    pointsAvailable: 1000,
    status: "upcoming",
    category: "community",
    icon: "❤️",
    featured: true,
    order: 4,
    requirements: [
      "Partner with a local charity or nonprofit",
      "Organize a fundraising match or event",
      "Minimum 50 attendees",
      "Document the event with photos and video",
      "Submit financial report of funds raised",
    ],
    metrics: {
      targetVolunteerHours: 150,
      targetPeopleImpacted: 300,
      targetTeams: 4,
      customMetric: "Funds Raised (DKK)",
      customMetricTarget: 50000,
    },
  },
  {
    _type: "communityChallenge",
    _id: "challenge-equality-workshop",
    title: "Equality & Inclusion Workshop",
    slug: { _type: "slug", current: "equality-inclusion-workshop" },
    description:
      "Host or participate in workshops focused on gender equality and inclusion in sports. Education drives lasting change.",
    sdgGoals: ["sdg5", "sdg10", "sdg4", "sdg16"],
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    pointsAvailable: 600,
    status: "upcoming",
    category: "equality",
    icon: "🌈",
    featured: false,
    order: 5,
    requirements: [
      "Host or attend at least 2 workshops",
      "Minimum 15 participants per workshop",
      "Cover topics: unconscious bias, inclusive language, allyship",
      "Distribute feedback surveys and compile results",
    ],
    metrics: {
      targetVolunteerHours: 100,
      targetPeopleImpacted: 150,
      targetTeams: 6,
      customMetric: "Workshop Attendees",
      customMetricTarget: 100,
    },
  },
  {
    _type: "communityChallenge",
    _id: "challenge-green-match",
    title: "Green Match Initiative",
    slug: { _type: "slug", current: "green-match-initiative" },
    description:
      "Make your match days carbon-neutral. Reduce waste, use sustainable transport, and offset emissions.",
    sdgGoals: ["sdg13", "sdg12", "sdg11", "sdg7"],
    startDate: "2025-06-01",
    endDate: "2025-11-30",
    pointsAvailable: 400,
    status: "upcoming",
    category: "environmental",
    icon: "🌱",
    featured: false,
    order: 6,
    requirements: [
      "Implement waste separation at match events",
      "Encourage sustainable transport (cycling, public transit, carpooling)",
      "Use reusable or compostable materials",
      "Calculate and offset carbon footprint",
    ],
    metrics: {
      targetTeams: 6,
      customMetric: "CO2 Offset (kg)",
      customMetricTarget: 1000,
    },
  },
];

async function seed() {
  console.log("🌱 Seeding community challenges...");

  for (const challenge of challenges) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await client.createOrReplace(challenge as any);
      console.log(`✅ Created/updated: ${challenge.title}`);
    } catch (error) {
      console.error(`❌ Failed to create ${challenge.title}:`, error);
    }
  }

  console.log("✨ Seeding complete!");
  console.log("\n📋 Community challenges created:");
  for (const challenge of challenges) {
    console.log(
      `   - ${challenge.title} (${challenge.status}) - ${challenge.pointsAvailable} pts`
    );
  }
}

seed().catch(console.error);
