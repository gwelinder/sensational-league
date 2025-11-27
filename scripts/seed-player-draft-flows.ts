/**
 * Seed script for CDP Email Flows
 * Creates automated email sequences for the player draft journey
 * 
 * Flows:
 * 1. Welcome Sequence - Triggered on new submission (thank you + what to expect)
 * 2. Under Review Notification - Status change to under_review
 * 3. Shortlisted Sequence - Status change to shortlisted
 * 4. Trial Invitation Flow - Status change to invited_trial
 * 5. Selected Celebration - Status change to selected
 * 6. Waitlist Communication - Status change to waitlisted
 * 7. Not Selected (Graceful) - Status change to not_selected
 * 8. Re-engagement Campaign - Scheduled for inactive applicants
 * 
 * Run with: pnpm seed:player-draft-flows
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

// Template reference IDs (must match seed-player-draft-templates.ts)
const TEMPLATES = {
  thankYou: "emailTemplate-draft-thank-you",
  whatToExpect: "emailTemplate-draft-what-to-expect",
  underReview: "emailTemplate-draft-under-review",
  shortlisted: "emailTemplate-draft-shortlisted",
  trialInvite: "emailTemplate-draft-trial-invite",
  trialReminder: "emailTemplate-draft-trial-reminder",
  selected: "emailTemplate-draft-selected",
  waitlisted: "emailTemplate-draft-waitlisted",
  notSelected: "emailTemplate-draft-not-selected",
  reengagement: "emailTemplate-draft-reengagement",
};

// ============== EMAIL FLOWS ==============

const flows = [
  // 1. WELCOME SEQUENCE - Triggered on new submission
  {
    _type: "emailFlow",
    _id: "emailFlow-welcome-sequence",
    name: "Welcome Sequence",
    slug: { _type: "slug", current: "welcome-sequence" },
    description:
      "Automated sequence for new player draft applicants. Sends immediate thank you, followed by tips email after 2 days.",
    active: true,
    category: "welcome",
    trigger: {
      type: "new_submission",
    },
    enrollmentSettings: {
      allowReenrollment: false,
      exitOnUnsubscribe: true,
      exitOnStatusChange: ["not_selected", "withdrawn"],
    },
    steps: [
      // Step 1: Immediate thank you
      {
        _type: "emailStep",
        _key: generateKey("welcome-step"),
        stepName: "Send Thank You Email",
        delay: { value: 0, unit: "minutes" },
        emailTemplate: { _ref: TEMPLATES.thankYou, _type: "reference" },
        condition: { field: "none" },
      },
      // Step 2: Add tag
      {
        _type: "tagStep",
        _key: generateKey("welcome-tag"),
        action: "add",
        tag: "welcome-sent",
      },
      // Step 3: Wait 2 days
      {
        _type: "waitStep",
        _key: generateKey("welcome-wait"),
        waitType: "duration",
        duration: { value: 2, unit: "days" },
      },
      // Step 4: What to expect email
      {
        _type: "emailStep",
        _key: generateKey("welcome-expect"),
        stepName: "Send What to Expect Email",
        delay: { value: 0, unit: "minutes" },
        emailTemplate: { _ref: TEMPLATES.whatToExpect, _type: "reference" },
        condition: { field: "none" },
      },
      // Step 5: Add tag
      {
        _type: "tagStep",
        _key: generateKey("welcome-tag2"),
        action: "add",
        tag: "tips-sent",
      },
    ],
    stats: {
      totalEnrolled: 0,
      currentlyActive: 0,
      completed: 0,
      exited: 0,
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
    },
  },

  // 2. UNDER REVIEW NOTIFICATION
  {
    _type: "emailFlow",
    _id: "emailFlow-under-review",
    name: "Under Review Notification",
    slug: { _type: "slug", current: "under-review-notification" },
    description:
      "Notifies applicant when their application status changes to Under Review.",
    active: true,
    category: "status",
    trigger: {
      type: "status_change",
      statusTrigger: {
        fromStatus: ["any", "new"],
        toStatus: ["under_review"],
      },
    },
    enrollmentSettings: {
      allowReenrollment: false,
      exitOnUnsubscribe: true,
    },
    steps: [
      {
        _type: "emailStep",
        _key: generateKey("review-step"),
        stepName: "Send Under Review Email",
        delay: { value: 0, unit: "minutes" },
        emailTemplate: { _ref: TEMPLATES.underReview, _type: "reference" },
        condition: { field: "none" },
      },
      {
        _type: "tagStep",
        _key: generateKey("review-tag"),
        action: "add",
        tag: "under-review-notified",
      },
    ],
    stats: {
      totalEnrolled: 0,
      currentlyActive: 0,
      completed: 0,
      exited: 0,
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
    },
  },

  // 3. SHORTLISTED SEQUENCE
  {
    _type: "emailFlow",
    _id: "emailFlow-shortlisted",
    name: "Shortlisted Sequence",
    slug: { _type: "slug", current: "shortlisted-sequence" },
    description:
      "Congratulates applicant on being shortlisted and prepares them for trials.",
    active: true,
    category: "status",
    trigger: {
      type: "status_change",
      statusTrigger: {
        fromStatus: ["any", "under_review"],
        toStatus: ["shortlisted"],
      },
    },
    enrollmentSettings: {
      allowReenrollment: false,
      exitOnUnsubscribe: true,
      exitOnStatusChange: ["not_selected", "withdrawn"],
    },
    steps: [
      {
        _type: "emailStep",
        _key: generateKey("shortlist-step"),
        stepName: "Send Shortlisted Congratulations",
        delay: { value: 0, unit: "minutes" },
        emailTemplate: { _ref: TEMPLATES.shortlisted, _type: "reference" },
        condition: { field: "none" },
      },
      {
        _type: "tagStep",
        _key: generateKey("shortlist-tag"),
        action: "add",
        tag: "shortlisted-notified",
      },
    ],
    stats: {
      totalEnrolled: 0,
      currentlyActive: 0,
      completed: 0,
      exited: 0,
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
    },
  },

  // 4. TRIAL INVITATION FLOW
  {
    _type: "emailFlow",
    _id: "emailFlow-trial-invitation",
    name: "Trial Invitation Flow",
    slug: { _type: "slug", current: "trial-invitation-flow" },
    description:
      "Sends trial invitation and a reminder 1 day before the trial.",
    active: true,
    category: "status",
    trigger: {
      type: "status_change",
      statusTrigger: {
        fromStatus: ["any", "shortlisted"],
        toStatus: ["invited_trial"],
      },
    },
    enrollmentSettings: {
      allowReenrollment: false,
      exitOnUnsubscribe: true,
      exitOnStatusChange: ["selected", "not_selected", "withdrawn"],
    },
    steps: [
      // Step 1: Trial invitation
      {
        _type: "emailStep",
        _key: generateKey("trial-invite-step"),
        stepName: "Send Trial Invitation",
        delay: { value: 0, unit: "minutes" },
        emailTemplate: { _ref: TEMPLATES.trialInvite, _type: "reference" },
        condition: { field: "none" },
      },
      {
        _type: "tagStep",
        _key: generateKey("trial-tag1"),
        action: "add",
        tag: "trial-invited",
      },
      // Step 2: Wait 5 days (assuming trial is ~6-7 days out)
      {
        _type: "waitStep",
        _key: generateKey("trial-wait"),
        waitType: "duration",
        duration: { value: 5, unit: "days" },
      },
      // Step 3: Trial reminder
      {
        _type: "emailStep",
        _key: generateKey("trial-remind-step"),
        stepName: "Send Trial Reminder",
        delay: { value: 0, unit: "minutes" },
        emailTemplate: { _ref: TEMPLATES.trialReminder, _type: "reference" },
        condition: {
          field: "status",
          value: "invited_trial",
        },
      },
      {
        _type: "tagStep",
        _key: generateKey("trial-tag2"),
        action: "add",
        tag: "trial-reminded",
      },
    ],
    stats: {
      totalEnrolled: 0,
      currentlyActive: 0,
      completed: 0,
      exited: 0,
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
    },
  },

  // 5. SELECTED CELEBRATION
  {
    _type: "emailFlow",
    _id: "emailFlow-selected",
    name: "Selected Celebration",
    slug: { _type: "slug", current: "selected-celebration" },
    description:
      "Congratulates player on being selected and welcomes them to the league.",
    active: true,
    category: "status",
    trigger: {
      type: "status_change",
      statusTrigger: {
        fromStatus: ["any"],
        toStatus: ["selected"],
      },
    },
    enrollmentSettings: {
      allowReenrollment: false,
      exitOnUnsubscribe: true,
    },
    steps: [
      {
        _type: "emailStep",
        _key: generateKey("selected-step"),
        stepName: "Send Selection Congratulations",
        delay: { value: 0, unit: "minutes" },
        emailTemplate: { _ref: TEMPLATES.selected, _type: "reference" },
        condition: { field: "none" },
      },
      {
        _type: "tagStep",
        _key: generateKey("selected-tag"),
        action: "add",
        tag: "selected-welcomed",
      },
      // Remove from nurture segments
      {
        _type: "tagStep",
        _key: generateKey("selected-tag2"),
        action: "remove",
        tag: "needs-nurture",
      },
    ],
    stats: {
      totalEnrolled: 0,
      currentlyActive: 0,
      completed: 0,
      exited: 0,
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
    },
  },

  // 6. WAITLIST COMMUNICATION
  {
    _type: "emailFlow",
    _id: "emailFlow-waitlisted",
    name: "Waitlist Communication",
    slug: { _type: "slug", current: "waitlist-communication" },
    description:
      "Communicates waitlist status to applicant with encouragement.",
    active: true,
    category: "status",
    trigger: {
      type: "status_change",
      statusTrigger: {
        fromStatus: ["any"],
        toStatus: ["waitlisted"],
      },
    },
    enrollmentSettings: {
      allowReenrollment: false,
      exitOnUnsubscribe: true,
      exitOnStatusChange: ["selected", "not_selected"],
    },
    steps: [
      {
        _type: "emailStep",
        _key: generateKey("waitlist-step"),
        stepName: "Send Waitlist Notification",
        delay: { value: 0, unit: "minutes" },
        emailTemplate: { _ref: TEMPLATES.waitlisted, _type: "reference" },
        condition: { field: "none" },
      },
      {
        _type: "tagStep",
        _key: generateKey("waitlist-tag"),
        action: "add",
        tag: "waitlisted-notified",
      },
      {
        _type: "tagStep",
        _key: generateKey("waitlist-tag2"),
        action: "add",
        tag: "needs-nurture",
      },
    ],
    stats: {
      totalEnrolled: 0,
      currentlyActive: 0,
      completed: 0,
      exited: 0,
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
    },
  },

  // 7. NOT SELECTED (GRACEFUL)
  {
    _type: "emailFlow",
    _id: "emailFlow-not-selected",
    name: "Not Selected (Graceful)",
    slug: { _type: "slug", current: "not-selected-graceful" },
    description:
      "Gracefully communicates rejection while keeping door open for future.",
    active: true,
    category: "status",
    trigger: {
      type: "status_change",
      statusTrigger: {
        fromStatus: ["any"],
        toStatus: ["not_selected"],
      },
    },
    enrollmentSettings: {
      allowReenrollment: false,
      exitOnUnsubscribe: true,
    },
    steps: [
      {
        _type: "emailStep",
        _key: generateKey("notselected-step"),
        stepName: "Send Not Selected Email",
        delay: { value: 0, unit: "minutes" },
        emailTemplate: { _ref: TEMPLATES.notSelected, _type: "reference" },
        condition: { field: "none" },
      },
      {
        _type: "tagStep",
        _key: generateKey("notselected-tag"),
        action: "add",
        tag: "not-selected-notified",
      },
    ],
    stats: {
      totalEnrolled: 0,
      currentlyActive: 0,
      completed: 0,
      exited: 0,
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
    },
  },

  // 8. RE-ENGAGEMENT CAMPAIGN (Manual trigger - for now)
  {
    _type: "emailFlow",
    _id: "emailFlow-reengagement",
    name: "Re-engagement Campaign",
    slug: { _type: "slug", current: "reengagement-campaign" },
    description:
      "Reach out to applicants who haven't engaged in a while. Manually triggered or scheduled.",
    active: false, // Disabled by default - enable when ready
    category: "reengagement",
    trigger: {
      type: "manual",
    },
    enrollmentSettings: {
      allowReenrollment: true,
      reenrollmentDelay: 60, // 60 days between re-engagements
      exitOnUnsubscribe: true,
      exitOnStatusChange: ["selected"],
    },
    steps: [
      // Branch: Check if they've opened recent emails
      {
        _type: "branchStep",
        _key: generateKey("reengage-branch"),
        branchName: "Check Recent Engagement",
        condition: {
          field: "opened_email",
          operator: "isFalse",
        },
        ifTrueAction: "continue", // Not engaged - continue with re-engagement
        ifFalseAction: "exit", // Has engaged - don't bother them
      },
      {
        _type: "emailStep",
        _key: generateKey("reengage-step"),
        stepName: "Send Re-engagement Email",
        delay: { value: 0, unit: "minutes" },
        emailTemplate: { _ref: TEMPLATES.reengagement, _type: "reference" },
        condition: { field: "none" },
      },
      {
        _type: "tagStep",
        _key: generateKey("reengage-tag"),
        action: "add",
        tag: "reengagement-sent",
      },
      // Wait and check response
      {
        _type: "waitStep",
        _key: generateKey("reengage-wait"),
        waitType: "event",
        waitForEvent: "email_opened",
        maxWait: 14, // Wait up to 14 days
      },
      // Branch: Did they re-engage?
      {
        _type: "branchStep",
        _key: generateKey("reengage-check"),
        branchName: "Check Re-engagement",
        condition: {
          field: "opened_email",
          operator: "isTrue",
        },
        ifTrueAction: "continue",
        ifFalseAction: "exit",
      },
      // They re-engaged - tag them
      {
        _type: "tagStep",
        _key: generateKey("reengage-success"),
        action: "add",
        tag: "re-engaged",
      },
      {
        _type: "tagStep",
        _key: generateKey("reengage-remove"),
        action: "remove",
        tag: "reengagement-sent",
      },
    ],
    stats: {
      totalEnrolled: 0,
      currentlyActive: 0,
      completed: 0,
      exited: 0,
      emailsSent: 0,
      emailsOpened: 0,
      emailsClicked: 0,
    },
  },
];

async function seed() {
  console.log("🌱 Seeding CDP Email Flows...\n");

  // First, verify templates exist
  console.log("📋 Verifying email templates...");
  const templateIds = Object.values(TEMPLATES);
  const existingTemplates = await client.fetch(
    `*[_type == "emailTemplate" && _id in $ids]._id`,
    { ids: templateIds }
  );

  const missingTemplates = templateIds.filter(
    (id) => !existingTemplates.includes(id)
  );
  if (missingTemplates.length > 0) {
    console.warn(
      `\n⚠️  Warning: ${missingTemplates.length} email templates not found.`
    );
    console.warn("   Run 'pnpm seed:player-draft-templates' first.");
    console.warn("   Missing:", missingTemplates.join(", "));
    console.warn("\n   Continuing anyway - flows will reference templates.\n");
  } else {
    console.log("✅ All email templates found!\n");
  }

  // Create flows
  for (const flow of flows) {
    try {
      await client.createOrReplace(flow);
      console.log(
        `✅ Created: ${flow.name} ${flow.active ? "(Active)" : "(Inactive)"}`
      );

      // Delete draft if exists
      try {
        await client.delete(`drafts.${flow._id}`);
      } catch {
        // Draft doesn't exist, that's fine
      }
    } catch (error) {
      console.error(`❌ Failed to create ${flow.name}:`, error);
    }
  }

  console.log("\n✨ Seeding complete!");
  console.log(`📧 Created ${flows.length} email flows`);
  console.log("\nFlow summary:");
  console.log("   - Welcome Sequence (new_submission) ✅ Active");
  console.log("   - Under Review Notification (status_change) ✅ Active");
  console.log("   - Shortlisted Sequence (status_change) ✅ Active");
  console.log("   - Trial Invitation Flow (status_change) ✅ Active");
  console.log("   - Selected Celebration (status_change) ✅ Active");
  console.log("   - Waitlist Communication (status_change) ✅ Active");
  console.log("   - Not Selected (status_change) ✅ Active");
  console.log("   - Re-engagement Campaign (manual) ⏸️  Inactive");
  console.log("\nYou can manage flows in Sanity Studio:");
  console.log("   Go to /studio → CDP → Email Flows");
}

seed().catch(console.error);
