/**
 * Seed script for Player Draft email templates
 * Creates all email templates needed for the player draft CDP flows
 * 
 * Templates:
 * 1. Thank You - Sent immediately after submission
 * 2. What to Expect - Follow-up with tips and timeline
 * 3. Under Review - Status notification
 * 4. Shortlisted - Congratulations, next steps
 * 5. Invited to Trial - Trial invitation with details
 * 6. Trial Reminder - Reminder before trial
 * 7. Selected - Congratulations, you're in!
 * 8. Waitlisted - On the waitlist, stay tuned
 * 9. Not Selected - Thank you, stay connected
 * 10. Re-engagement - Haven't heard from you
 * 
 * Run with: pnpm seed:player-draft-templates
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

// Helper to create a Portable Text block
function createBlock(
  text: string,
  key: string,
  style: "normal" | "h2" = "normal"
) {
  return {
    _type: "block",
    _key: key,
    style,
    children: [
      {
        _type: "span",
        _key: `${key}-span`,
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

// Helper to create a block with a link (reserved for future use)
function _createBlockWithLink(
  beforeText: string,
  linkText: string,
  linkUrl: string,
  afterText: string,
  key: string
) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    children: [
      { _type: "span", _key: `${key}-before`, text: beforeText, marks: [] },
      { _type: "span", _key: `${key}-link`, text: linkText, marks: [`${key}-linkdef`] },
      { _type: "span", _key: `${key}-after`, text: afterText, marks: [] },
    ],
    markDefs: [
      { _key: `${key}-linkdef`, _type: "link", href: linkUrl },
    ],
  };
}

// Helper to create bullet list
function createBulletList(items: string[], keyPrefix: string) {
  return items.map((item, index) => ({
    _type: "block",
    _key: `${keyPrefix}-${index}`,
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [
      {
        _type: "span",
        _key: `${keyPrefix}-${index}-span`,
        text: item,
        marks: [],
      },
    ],
    markDefs: [],
  }));
}

const standardSignature = "Best regards,\nSaga & the Sensational League Team";

const standardSocialLinks = {
  youtube: "https://youtube.com/@SensationalLeague",
  instagram: "https://instagram.com/sensational_league",
  facebook: "https://facebook.com/profile.php?id=61582488164825",
  tiktok: "https://tiktok.com/@Sensationalleague",
  twitter: "https://twitter.com/SensationalLG",
};

// ============== EMAIL TEMPLATES ==============

const templates = [
  // 1. THANK YOU - Immediate after submission
  {
    _type: "emailTemplate",
    _id: "emailTemplate-draft-thank-you",
    name: "Player Draft - Thank You",
    templateId: "draft-thank-you",
    subject: "Thank you for applying to the Sensational League! ⚡",
    preheader: "We received your application - here's what happens next",
    content: [
      createBlock("Hi {{firstName}},", "greeting"),
      createBlock(
        "Thank you for applying to join the Sensational League! We're thrilled that you want to be part of something truly revolutionary - women's football that drives real impact.",
        "intro"
      ),
      createBlock(
        "Your application has been received and is now in our system. We'll review it carefully and get back to you soon.",
        "confirmation"
      ),
      createBlock("What happens next:", "next-header", "h2"),
      ...createBulletList(
        [
          "Our team will review your application within the next few days",
          "You'll receive an email when your status changes",
          "Keep an eye on your inbox (and spam folder!) for updates",
        ],
        "next-steps"
      ),
      createBlock(
        "In the meantime, follow us on social media to stay connected with the Sensational League community!",
        "social-prompt"
      ),
    ],
    signature: standardSignature,
    ctaButton: {
      text: "Follow Us on Instagram",
      url: "https://instagram.com/sensational_league",
    },
    socialLinks: standardSocialLinks,
    enabled: true,
  },

  // 2. WHAT TO EXPECT - Day 2 follow-up
  {
    _type: "emailTemplate",
    _id: "emailTemplate-draft-what-to-expect",
    name: "Player Draft - What to Expect",
    templateId: "draft-what-to-expect",
    subject: "What to expect from the Sensational League draft process",
    preheader: "Here's everything you need to know about the selection process",
    content: [
      createBlock("Hi {{firstName}},", "greeting"),
      createBlock(
        "We wanted to share a bit more about what to expect during the player draft process. Whether you're a seasoned player or returning to the pitch after a break, we're looking for players who embody our values: Fast. Rebellious. Female.",
        "intro"
      ),
      createBlock("The Selection Process:", "process-header", "h2"),
      ...createBulletList(
        [
          "Application Review: Our team evaluates all applications based on experience, position preferences, and alignment with our values",
          "Shortlisting: Promising candidates are shortlisted for trials",
          "Trials: Selected players are invited to showcase their skills",
          "Team Formation: Players are drafted to teams based on skill level, position, and team chemistry",
        ],
        "process-steps"
      ),
      createBlock("Tips for a successful trial:", "tips-header", "h2"),
      ...createBulletList(
        [
          "Come prepared physically - do some warm-up exercises beforehand",
          "Bring your own boots and shin guards",
          "Show your personality - we value team players who lift others up",
          "Have fun! This is about enjoying the beautiful game",
        ],
        "tips"
      ),
      createBlock(
        "Remember: The Sensational League isn't just about football skills. We're building teams that compete not just for goals, but for positive social impact. Your passion and commitment matter as much as your technique.",
        "values"
      ),
    ],
    signature: standardSignature,
    ctaButton: {
      text: "Learn More About Us",
      url: "https://sensationalleague.com",
    },
    socialLinks: standardSocialLinks,
    enabled: true,
  },

  // 3. UNDER REVIEW - Status notification
  {
    _type: "emailTemplate",
    _id: "emailTemplate-draft-under-review",
    name: "Player Draft - Under Review",
    templateId: "draft-under-review",
    subject: "Your Sensational League application is under review",
    preheader: "We're carefully reviewing your application",
    content: [
      createBlock("Hi {{firstName}},", "greeting"),
      createBlock(
        "Good news! Your application to join the Sensational League is now being actively reviewed by our selection team.",
        "intro"
      ),
      createBlock(
        "We're looking at all aspects of your application - your football experience, your preferred positions, and your alignment with our mission of using football as a force for good.",
        "details"
      ),
      createBlock(
        "We'll be in touch within the next week with an update. In the meantime, keep training and stay ready!",
        "next"
      ),
    ],
    signature: standardSignature,
    socialLinks: standardSocialLinks,
    enabled: true,
  },

  // 4. SHORTLISTED - Congratulations
  {
    _type: "emailTemplate",
    _id: "emailTemplate-draft-shortlisted",
    name: "Player Draft - Shortlisted",
    templateId: "draft-shortlisted",
    subject: "Congratulations! You've been shortlisted ⚡",
    preheader: "You're one step closer to joining the Sensational League",
    content: [
      createBlock("Hi {{firstName}},", "greeting"),
      createBlock(
        "Congratulations! We're excited to let you know that you've been shortlisted for the Sensational League player draft!",
        "intro"
      ),
      createBlock(
        "This means your application stood out among many talented players. We loved what we saw and want to learn more about you on the pitch.",
        "details"
      ),
      createBlock("What's next:", "next-header", "h2"),
      ...createBulletList(
        [
          "We're organizing trial sessions over the coming weeks",
          "You'll receive a separate email with trial dates and locations",
          "Start preparing now - dust off your boots and get moving!",
        ],
        "next-steps"
      ),
      createBlock(
        "This is a huge step forward. We can't wait to see you play!",
        "closing"
      ),
    ],
    signature: standardSignature,
    ctaButton: {
      text: "Share the News",
      url: "https://instagram.com/sensational_league",
    },
    socialLinks: standardSocialLinks,
    enabled: true,
  },

  // 5. INVITED TO TRIAL
  {
    _type: "emailTemplate",
    _id: "emailTemplate-draft-trial-invite",
    name: "Player Draft - Trial Invitation",
    templateId: "draft-trial-invite",
    subject: "You're invited to a Sensational League trial! ⚽",
    preheader: "Time to show us what you've got",
    content: [
      createBlock("Hi {{firstName}},", "greeting"),
      createBlock(
        "This is it - you're officially invited to a Sensational League trial session!",
        "intro"
      ),
      createBlock(
        "We've been impressed with your application, and now it's time to see you in action. This is your chance to show us your skills, your team spirit, and your passion for the game.",
        "details"
      ),
      createBlock("What to bring:", "bring-header", "h2"),
      ...createBulletList(
        [
          "Football boots (studs appropriate for grass)",
          "Shin guards",
          "Water bottle",
          "Positive attitude and lots of energy!",
        ],
        "bring-list"
      ),
      createBlock("What to expect:", "expect-header", "h2"),
      ...createBulletList(
        [
          "Warm-up and fitness assessment",
          "Technical drills",
          "Small-sided games",
          "A chance to meet other players and our team",
        ],
        "expect-list"
      ),
      createBlock(
        "Trial details will be shared in a follow-up email. Make sure to confirm your attendance when you receive it.",
        "next"
      ),
      createBlock("See you on the pitch!", "closing"),
    ],
    signature: standardSignature,
    socialLinks: standardSocialLinks,
    enabled: true,
  },

  // 6. TRIAL REMINDER
  {
    _type: "emailTemplate",
    _id: "emailTemplate-draft-trial-reminder",
    name: "Player Draft - Trial Reminder",
    templateId: "draft-trial-reminder",
    subject: "Reminder: Your Sensational League trial is coming up!",
    preheader: "Don't forget - your trial is just around the corner",
    content: [
      createBlock("Hi {{firstName}},", "greeting"),
      createBlock(
        "Just a friendly reminder that your Sensational League trial is coming up soon!",
        "intro"
      ),
      createBlock("Quick checklist:", "checklist-header", "h2"),
      ...createBulletList(
        [
          "✓ Football boots packed",
          "✓ Shin guards ready",
          "✓ Water bottle filled",
          "✓ Good night's sleep before the big day",
        ],
        "checklist"
      ),
      createBlock(
        "Remember: We're not just looking for the best players - we're looking for players who will contribute to their team and community. Be yourself, support others, and have fun!",
        "reminder"
      ),
      createBlock(
        "If you have any questions or need to reschedule, please reply to this email as soon as possible.",
        "contact"
      ),
      createBlock("Good luck - you've got this!", "closing"),
    ],
    signature: standardSignature,
    socialLinks: standardSocialLinks,
    enabled: true,
  },

  // 7. SELECTED - You're in!
  {
    _type: "emailTemplate",
    _id: "emailTemplate-draft-selected",
    name: "Player Draft - Selected",
    templateId: "draft-selected",
    subject: "Welcome to the Sensational League! You're IN! ⚡🎉",
    preheader: "Congratulations - you've been selected!",
    content: [
      createBlock("Hi {{firstName}},", "greeting"),
      createBlock(
        "WE ARE THRILLED TO ANNOUNCE: You've been selected to join the Sensational League!",
        "intro"
      ),
      createBlock(
        "Your hard work, talent, and spirit have earned you a spot in our revolutionary women's football league. You're now part of a movement that's changing the game - literally.",
        "details"
      ),
      createBlock("What happens now:", "next-header", "h2"),
      ...createBulletList(
        [
          "You'll receive information about your team assignment soon",
          "Training schedules and match calendars will be shared",
          "You'll be invited to our player onboarding session",
          "Get ready to meet your teammates!",
        ],
        "next-steps"
      ),
      createBlock(
        "Remember: In the Sensational League, we play football and drive impact. Get ready to compete not just for goals, but for positive change in your community.",
        "mission"
      ),
      createBlock("Welcome to the family, {{firstName}}! ⚡", "welcome"),
    ],
    signature: standardSignature,
    ctaButton: {
      text: "Share Your News!",
      url: "https://instagram.com/sensational_league",
    },
    socialLinks: standardSocialLinks,
    enabled: true,
  },

  // 8. WAITLISTED
  {
    _type: "emailTemplate",
    _id: "emailTemplate-draft-waitlisted",
    name: "Player Draft - Waitlisted",
    templateId: "draft-waitlisted",
    subject: "You're on the Sensational League waitlist",
    preheader: "Stay tuned - you're still in the running",
    content: [
      createBlock("Hi {{firstName}},", "greeting"),
      createBlock(
        "Thank you for your patience during our selection process. We wanted to let you know that you've been placed on our waitlist.",
        "intro"
      ),
      createBlock(
        "This means you impressed us, but we have limited spots in this draft cycle. The good news? You're still in the running, and we'll reach out if a spot opens up.",
        "explanation"
      ),
      createBlock("What does this mean?", "meaning-header", "h2"),
      ...createBulletList(
        [
          "You're on our radar for upcoming opportunities",
          "If a spot opens up, waitlisted players are first in line",
          "Future draft cycles may have additional spots",
          "Stay active and keep improving your game",
        ],
        "meaning-list"
      ),
      createBlock(
        "We know this isn't the news you were hoping for, but please don't be discouraged. Keep training, stay connected, and we'll be in touch when opportunities arise.",
        "encouragement"
      ),
    ],
    signature: standardSignature,
    ctaButton: {
      text: "Stay Connected",
      url: "https://sensationalleague.com",
    },
    socialLinks: standardSocialLinks,
    enabled: true,
  },

  // 9. NOT SELECTED
  {
    _type: "emailTemplate",
    _id: "emailTemplate-draft-not-selected",
    name: "Player Draft - Not Selected",
    templateId: "draft-not-selected",
    subject: "Thank you for applying to the Sensational League",
    preheader: "An update on your application",
    content: [
      createBlock("Hi {{firstName}},", "greeting"),
      createBlock(
        "Thank you so much for your interest in joining the Sensational League and for the time you invested in the application process.",
        "intro"
      ),
      createBlock(
        "After careful consideration, we've made the difficult decision not to move forward with your application for this draft cycle. This was an incredibly competitive process with many talented players.",
        "decision"
      ),
      createBlock(
        "This decision doesn't reflect on your worth as a player or person. We had limited spots and many amazing candidates.",
        "reassurance"
      ),
      createBlock("Moving forward:", "forward-header", "h2"),
      ...createBulletList(
        [
          "Future draft cycles will open up new opportunities",
          "Keep developing your skills and stay active",
          "Follow us on social media for announcements",
          "Consider joining local women's football communities",
        ],
        "forward-list"
      ),
      createBlock(
        "We hope to see your application again in the future. Keep playing, keep pushing, and never give up on your dreams.",
        "closing"
      ),
    ],
    signature: standardSignature,
    ctaButton: {
      text: "Stay Updated",
      url: "https://sensationalleague.com",
    },
    socialLinks: standardSocialLinks,
    enabled: true,
  },

  // 10. RE-ENGAGEMENT
  {
    _type: "emailTemplate",
    _id: "emailTemplate-draft-reengagement",
    name: "Player Draft - Re-engagement",
    templateId: "draft-reengagement",
    subject: "We miss you at the Sensational League!",
    preheader: "It's been a while - here's what you've missed",
    content: [
      createBlock("Hi {{firstName}},", "greeting"),
      createBlock(
        "We noticed it's been a while since we've connected, and we wanted to reach out. The Sensational League has been growing, and we'd love for you to be part of it!",
        "intro"
      ),
      createBlock("What's been happening:", "updates-header", "h2"),
      ...createBulletList(
        [
          "New teams are forming across Denmark",
          "Our community is growing stronger every day",
          "Exciting partnerships for social impact projects",
          "More opportunities for players at all levels",
        ],
        "updates-list"
      ),
      createBlock(
        "Whether you're still interested in playing or just want to stay connected with our mission, we'd love to hear from you.",
        "closing-prompt"
      ),
    ],
    signature: standardSignature,
    ctaButton: {
      text: "Update Your Application",
      url: "https://sensationalleague.com/player-draft",
    },
    socialLinks: standardSocialLinks,
    enabled: true,
  },
];

async function seed() {
  console.log("🌱 Seeding Player Draft email templates...\n");

  for (const template of templates) {
    try {
      await client.createOrReplace(template);
      console.log(`✅ Created: ${template.name}`);

      // Delete draft if exists
      try {
        await client.delete(`drafts.${template._id}`);
      } catch {
        // Draft doesn't exist, that's fine
      }
    } catch (error) {
      console.error(`❌ Failed to create ${template.name}:`, error);
    }
  }

  console.log("\n✨ Seeding complete!");
  console.log(`📧 Created ${templates.length} email templates`);
  console.log("\nYou can edit these templates in Sanity Studio:");
  console.log("   Go to /studio → Email Templates");
}

seed().catch(console.error);
