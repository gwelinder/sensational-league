/**
 * Seed script for CDP Segments
 * Creates default segments for targeting player draft applicants
 * 
 * Segments by category:
 * 
 * BY POSITION:
 * - Goalkeepers
 * - Defenders
 * - Midfielders
 * - Forwards
 * 
 * BY STATUS:
 * - New Applicants
 * - Under Review
 * - Shortlisted
 * - Trial Invites
 * - Selected Players
 * - Waitlisted
 * 
 * BY ENGAGEMENT:
 * - High Engagement (opened emails)
 * - Low Engagement (no opens in 30+ days)
 * - Unsubscribed
 * 
 * BY EXPERIENCE:
 * - Elite/Professional Level
 * - Club Level
 * - Recreational
 * - Returning Players (was active, now returning)
 * 
 * Run with: pnpm seed:cdp-segments
 */

import { resolve } from "node:path";
import * as dotenv from "dotenv";
import { createClient } from "next-sanity";

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

// Helper to generate unique keys
let keyCounter = 0;
function generateKey(prefix: string): string {
  keyCounter++;
  return `${prefix}-${keyCounter}`;
}

// ============== SEGMENTS ==============

const segments = [
  // ========== BY POSITION ==========
  {
    _type: "cdpSegment",
    _id: "segment-goalkeepers",
    name: "Goalkeepers",
    slug: { _type: "slug", current: "goalkeepers" },
    description: "All applicants who prefer playing as goalkeeper",
    color: "#3B82F6", // Blue
    icon: "football",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Goalkeeper",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-defenders",
    name: "Defenders",
    slug: { _type: "slug", current: "defenders" },
    description: "All applicants who prefer playing in defense",
    color: "#10B981", // Green
    icon: "football",
    type: "rule",
    rules: {
      matchType: "any",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Centre Back",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Full Back",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Wing Back",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-midfielders",
    name: "Midfielders",
    slug: { _type: "slug", current: "midfielders" },
    description: "All applicants who prefer playing in midfield",
    color: "#D4FF00", // Volt Yellow
    icon: "football",
    type: "rule",
    rules: {
      matchType: "any",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Defensive Midfielder",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Central Midfielder",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Attacking Midfielder",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Wide Midfielder",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-forwards",
    name: "Forwards",
    slug: { _type: "slug", current: "forwards" },
    description: "All applicants who prefer playing as forward/striker",
    color: "#FF4400", // Orange
    icon: "football",
    type: "rule",
    rules: {
      matchType: "any",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Striker",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Winger",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Second Striker",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },

  // ========== BY STATUS ==========
  {
    _type: "cdpSegment",
    _id: "segment-new-applicants",
    name: "New Applicants",
    slug: { _type: "slug", current: "new-applicants" },
    description: "Applicants who just submitted and haven't been reviewed yet",
    color: "#00FBFF", // Cyan
    icon: "users",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "status",
          operator: "eq",
          value: "new",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-under-review",
    name: "Under Review",
    slug: { _type: "slug", current: "under-review" },
    description: "Applicants currently being reviewed",
    color: "#AE00FF", // Purple
    icon: "clock",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "status",
          operator: "eq",
          value: "under_review",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-shortlisted",
    name: "Shortlisted",
    slug: { _type: "slug", current: "shortlisted" },
    description: "Applicants who have been shortlisted for trials",
    color: "#D4FF00", // Volt Yellow
    icon: "star",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "status",
          operator: "eq",
          value: "shortlisted",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-trial-invites",
    name: "Trial Invites",
    slug: { _type: "slug", current: "trial-invites" },
    description: "Applicants invited to trial sessions",
    color: "#FF4400", // Orange
    icon: "zap",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "status",
          operator: "eq",
          value: "invited_trial",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-selected",
    name: "Selected Players",
    slug: { _type: "slug", current: "selected-players" },
    description: "Applicants who have been selected to join the league",
    color: "#10B981", // Green
    icon: "star",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "status",
          operator: "eq",
          value: "selected",
        },
      ],
    },
    syncToResend: true, // Sync selected players to Resend for player communications
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-waitlisted",
    name: "Waitlisted",
    slug: { _type: "slug", current: "waitlisted" },
    description: "Applicants on the waitlist",
    color: "#6B7280", // Gray
    icon: "clock",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "status",
          operator: "eq",
          value: "waitlisted",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },

  // ========== BY ENGAGEMENT ==========
  {
    _type: "cdpSegment",
    _id: "segment-high-engagement",
    name: "High Engagement",
    slug: { _type: "slug", current: "high-engagement" },
    description: "Applicants who have opened multiple emails",
    color: "#D4FF00", // Volt Yellow
    icon: "trending",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "emailsOpened",
          operator: "gt",
          value: "2",
        },
        {
          _key: generateKey("cond"),
          field: "unsubscribed",
          operator: "isFalse",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-low-engagement",
    name: "Low Engagement",
    slug: { _type: "slug", current: "low-engagement" },
    description:
      "Applicants who haven't engaged with emails recently - candidates for re-engagement",
    color: "#EF4444", // Red
    icon: "clock",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "emailsOpened",
          operator: "eq",
          value: "0",
        },
        {
          _key: generateKey("cond"),
          field: "daysSinceSubmission",
          operator: "gt",
          value: "14",
        },
        {
          _key: generateKey("cond"),
          field: "unsubscribed",
          operator: "isFalse",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-unsubscribed",
    name: "Unsubscribed",
    slug: { _type: "slug", current: "unsubscribed" },
    description: "Applicants who have unsubscribed from emails",
    color: "#EF4444", // Red
    icon: "users",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "unsubscribed",
          operator: "isTrue",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },

  // ========== BY EXPERIENCE ==========
  {
    _type: "cdpSegment",
    _id: "segment-elite-players",
    name: "Elite/Professional Level",
    slug: { _type: "slug", current: "elite-players" },
    description: "Applicants with professional or elite level experience",
    color: "#AE00FF", // Purple
    icon: "star",
    type: "rule",
    rules: {
      matchType: "any",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "highestLevel",
          operator: "eq",
          value: "Professional",
        },
        {
          _key: generateKey("cond"),
          field: "highestLevel",
          operator: "eq",
          value: "Elite",
        },
        {
          _key: generateKey("cond"),
          field: "highestLevel",
          operator: "eq",
          value: "Semi-Professional",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-club-level",
    name: "Club Level",
    slug: { _type: "slug", current: "club-level" },
    description: "Applicants with club/amateur level experience",
    color: "#3B82F6", // Blue
    icon: "football",
    type: "rule",
    rules: {
      matchType: "any",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "highestLevel",
          operator: "eq",
          value: "Club",
        },
        {
          _key: generateKey("cond"),
          field: "highestLevel",
          operator: "eq",
          value: "Amateur",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-recreational",
    name: "Recreational Players",
    slug: { _type: "slug", current: "recreational" },
    description: "Applicants at recreational/beginner level",
    color: "#10B981", // Green
    icon: "heart",
    type: "rule",
    rules: {
      matchType: "any",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "highestLevel",
          operator: "eq",
          value: "Recreational",
        },
        {
          _key: generateKey("cond"),
          field: "highestLevel",
          operator: "eq",
          value: "Beginner",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-returning-players",
    name: "Returning Players",
    slug: { _type: "slug", current: "returning-players" },
    description:
      "Players who were previously active but took a break and are now returning",
    color: "#00FBFF", // Cyan
    icon: "trending",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "currentlyActive",
          operator: "isFalse",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },

  // ========== SPECIAL SEGMENTS ==========
  {
    _type: "cdpSegment",
    _id: "segment-social-influencers",
    name: "Social Media Active",
    slug: { _type: "slug", current: "social-media-active" },
    description:
      "Applicants who are active on social media - potential brand ambassadors",
    color: "#FF4400", // Orange
    icon: "trending",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "socialMediaActive",
          operator: "isTrue",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-interested-alternative",
    name: "Interested in Alternatives",
    slug: { _type: "slug", current: "interested-alternatives" },
    description:
      "Applicants who expressed interest in other roles if not selected as players",
    color: "#AE00FF", // Purple
    icon: "heart",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "interestIfNotSelected",
          operator: "notEmpty",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-copenhagen",
    name: "Copenhagen Area",
    slug: { _type: "slug", current: "copenhagen-area" },
    description: "Applicants from the Copenhagen area",
    color: "#3B82F6", // Blue
    icon: "location",
    type: "rule",
    rules: {
      matchType: "any",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "city",
          operator: "contains",
          value: "Copenhagen",
        },
        {
          _key: generateKey("cond"),
          field: "city",
          operator: "contains",
          value: "København",
        },
        {
          _key: generateKey("cond"),
          field: "city",
          operator: "contains",
          value: "Frederiksberg",
        },
        {
          _key: generateKey("cond"),
          field: "city",
          operator: "contains",
          value: "Amager",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-high-rated",
    name: "High Rated",
    slug: { _type: "slug", current: "high-rated" },
    description: "Applicants with high internal ratings (4+ stars)",
    color: "#D4FF00", // Volt Yellow
    icon: "star",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "rating",
          operator: "gt",
          value: "3",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
];

async function seed() {
  console.log("🌱 Seeding CDP Segments...\n");

  let created = 0;
  let failed = 0;

  for (const segment of segments) {
    try {
      await client.createOrReplace(segment);
      console.log(`✅ Created: ${segment.name}`);
      created++;

      // Delete draft if exists
      try {
        await client.delete(`drafts.${segment._id}`);
      } catch {
        // Draft doesn't exist, that's fine
      }
    } catch (error) {
      console.error(`❌ Failed to create ${segment.name}:`, error);
      failed++;
    }
  }

  console.log("\n✨ Seeding complete!");
  console.log(`📊 Created ${created} segments${failed > 0 ? `, ${failed} failed` : ""}`);
  console.log("\nSegment categories:");
  console.log("   Position: Goalkeepers, Defenders, Midfielders, Forwards");
  console.log("   Status: New, Under Review, Shortlisted, Trial Invites, Selected, Waitlisted");
  console.log("   Engagement: High Engagement, Low Engagement, Unsubscribed");
  console.log("   Experience: Elite, Club Level, Recreational, Returning Players");
  console.log("   Special: Social Media Active, Interested in Alternatives, Copenhagen Area, High Rated");
  console.log("\nYou can manage segments in Sanity Studio:");
  console.log("   Go to /studio → CDP → Segments");
  console.log("\nNote: Run segment evaluation to populate member counts:");
  console.log("   POST /api/cdp?action=sync-segments");
}

seed().catch(console.error);
