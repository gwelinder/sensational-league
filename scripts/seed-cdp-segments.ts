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
 * BY AGE GROUP:
 * - 18-24 (Young Players)
 * - 25-34 (Prime Players)
 * - 35-44 (Experienced Players)
 * - 45+ (Veteran Players)
 * 
 * BY ACTIVITY STATUS:
 * - Currently Active in Club
 * - Previously Active (Not Current)
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
          value: "centre-back",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Centre-back",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "full-back",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Full-back",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Wing-back",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Sweeper",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Left centre-back",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Right centre-back",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Right full-back",
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
          value: "midfielder",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Attacking midfielder",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Central midfielder",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Defensive midfielder",
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
          value: "winger",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Forward",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Left winger",
        },
        {
          _key: generateKey("cond"),
          field: "preferredPositions",
          operator: "contains",
          value: "Right winger",
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
          value: "International",
        },
        {
          _key: generateKey("cond"),
          field: "highestLevel",
          operator: "eq",
          value: "National",
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
    name: "Club/Amateur Level",
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

  // ========== BY AGE GROUP ==========
  {
    _type: "cdpSegment",
    _id: "segment-age-18-24",
    name: "Age 18-24",
    slug: { _type: "slug", current: "age-18-24" },
    description: "Young players aged 18-24",
    color: "#00FBFF", // Cyan
    icon: "users",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "ageGroup",
          operator: "eq",
          value: "18-24",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-age-25-34",
    name: "Age 25-34",
    slug: { _type: "slug", current: "age-25-34" },
    description: "Prime age players aged 25-34",
    color: "#D4FF00", // Volt Yellow
    icon: "users",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "ageGroup",
          operator: "eq",
          value: "25-34",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-age-35-44",
    name: "Age 35-44",
    slug: { _type: "slug", current: "age-35-44" },
    description: "Experienced players aged 35-44",
    color: "#FF4400", // Orange
    icon: "users",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "ageGroup",
          operator: "eq",
          value: "35-44",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-age-45-plus",
    name: "Age 45+",
    slug: { _type: "slug", current: "age-45-plus" },
    description: "Veteran players aged 45 and above",
    color: "#AE00FF", // Purple
    icon: "users",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "ageGroup",
          operator: "eq",
          value: "45+",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },

  // ========== BY ACTIVITY STATUS ==========
  {
    _type: "cdpSegment",
    _id: "segment-currently-active",
    name: "Currently Active in Club",
    slug: { _type: "slug", current: "currently-active" },
    description: "Players who are currently active in a football club",
    color: "#10B981", // Green
    icon: "football",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "currentlyActive",
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
    _id: "segment-previously-active",
    name: "Previously Active (Not Current)",
    slug: { _type: "slug", current: "previously-active" },
    description: "Players who were previously in a club but not currently active",
    color: "#F59E0B", // Amber
    icon: "clock",
    type: "rule",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "previouslyActive",
          operator: "isTrue",
        },
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

  // ========== NEWSLETTER SEGMENTS ==========
  {
    _type: "cdpSegment",
    _id: "segment-newsletter-active",
    name: "Newsletter: Active Subscribers",
    slug: { _type: "slug", current: "newsletter-active" },
    description: "Active newsletter subscribers",
    color: "#10B981", // Green
    icon: "mail",
    type: "rule",
    documentType: "newsletterSubscriber",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "status",
          operator: "eq",
          value: "active",
        },
      ],
    },
    syncToResend: true,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-newsletter-unsubscribed",
    name: "Newsletter: Unsubscribed",
    slug: { _type: "slug", current: "newsletter-unsubscribed" },
    description: "Newsletter subscribers who have unsubscribed",
    color: "#EF4444", // Red
    icon: "mail",
    type: "rule",
    documentType: "newsletterSubscriber",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "status",
          operator: "eq",
          value: "unsubscribed",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-newsletter-homepage",
    name: "Newsletter: Homepage Signups",
    slug: { _type: "slug", current: "newsletter-homepage" },
    description: "Newsletter subscribers who signed up from the homepage",
    color: "#3B82F6", // Blue
    icon: "mail",
    type: "rule",
    documentType: "newsletterSubscriber",
    rules: {
      matchType: "any",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "source",
          operator: "eq",
          value: "homepage-hero",
        },
        {
          _key: generateKey("cond"),
          field: "source",
          operator: "eq",
          value: "homepage-header",
        },
        {
          _key: generateKey("cond"),
          field: "source",
          operator: "eq",
          value: "homepage-footer",
        },
      ],
    },
    syncToResend: false,
    memberCount: 0,
    active: true,
  },
  {
    _type: "cdpSegment",
    _id: "segment-newsletter-also-applicant",
    name: "Newsletter: Also Draft Applicants",
    slug: { _type: "slug", current: "newsletter-also-applicant" },
    description: "Newsletter subscribers who also applied for the player draft",
    color: "#AE00FF", // Purple
    icon: "mail",
    type: "rule",
    documentType: "newsletterSubscriber",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "linkedApplicant",
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
    _id: "segment-newsletter-only",
    name: "Newsletter: Newsletter Only (No Application)",
    slug: { _type: "slug", current: "newsletter-only" },
    description: "Newsletter subscribers who have NOT applied for the player draft",
    color: "#00FBFF", // Cyan
    icon: "mail",
    type: "rule",
    documentType: "newsletterSubscriber",
    rules: {
      matchType: "all",
      conditions: [
        {
          _key: generateKey("cond"),
          field: "linkedApplicant",
          operator: "empty",
        },
        {
          _key: generateKey("cond"),
          field: "status",
          operator: "eq",
          value: "active",
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
  console.log("   Age Groups: 18-24, 25-34, 35-44, 45+");
  console.log("   Activity: Currently Active, Previously Active");
  console.log("   Special: Social Media Active, Interested in Alternatives, Copenhagen Area, High Rated");
  console.log("\nYou can manage segments in Sanity Studio:");
  console.log("   Go to /studio → CDP → Segments");
  console.log("\nNote: Run segment evaluation to populate member counts:");
  console.log("   POST /api/cdp?action=sync-segments");
}

seed().catch(console.error);
