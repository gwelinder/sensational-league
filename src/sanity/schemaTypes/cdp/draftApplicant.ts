import { defineField, defineType } from "sanity";

/**
 * Draft Applicant - CDP Contact Profile
 * 
 * This schema represents a player who has applied through the Typeform draft.
 * SharePoint remains the source of truth; this mirrors the data for CDP functionality.
 * 
 * Key features:
 * - Synced from SharePoint via webhook
 * - Computed segment membership
 * - Email engagement tracking
 * - Flow enrollment status
 */
export const draftApplicant = defineType({
  name: "draftApplicant",
  title: "Draft Applicant",
  type: "document",
  groups: [
    { name: "profile", title: "Profile", default: true },
    { name: "football", title: "Football Background" },
    { name: "social", title: "Social Media" },
    { name: "engagement", title: "Engagement" },
    { name: "internal", title: "Internal" },
  ],
  fields: [
    // === PROFILE GROUP ===
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "profile",
      validation: (Rule) => Rule.required().email(),
      readOnly: true,
    }),
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      group: "profile",
      readOnly: true,
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      group: "profile",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      group: "profile",
      readOnly: true,
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      group: "profile",
      readOnly: true,
    }),
    defineField({
      name: "ageGroup",
      title: "Age Group",
      type: "string",
      group: "profile",
      options: {
        list: [
          { title: "16-19", value: "16-19" },
          { title: "20-25", value: "20-25" },
          { title: "26-30", value: "26-30" },
          { title: "31-35", value: "31-35" },
          { title: "36+", value: "36+" },
        ],
      },
      readOnly: true,
    }),

    // === FOOTBALL BACKGROUND GROUP ===
    defineField({
      name: "highestLevel",
      title: "Highest Playing Level",
      type: "string",
      group: "football",
      options: {
        list: [
          { title: "Professional", value: "professional" },
          { title: "Semi-Professional", value: "semi-professional" },
          { title: "Amateur/Club", value: "amateur" },
          { title: "Recreational", value: "recreational" },
          { title: "Beginner", value: "beginner" },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: "preferredPositions",
      title: "Preferred Positions",
      type: "array",
      of: [{ type: "string" }],
      group: "football",
      options: {
        list: [
          { title: "Goalkeeper", value: "goalkeeper" },
          { title: "Defender", value: "defender" },
          { title: "Midfielder", value: "midfielder" },
          { title: "Forward", value: "forward" },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: "currentlyActive",
      title: "Currently Active in Club",
      type: "boolean",
      group: "football",
      readOnly: true,
    }),
    defineField({
      name: "activeClubName",
      title: "Active Club Name",
      type: "string",
      group: "football",
      readOnly: true,
      hidden: ({ document }) => !document?.currentlyActive,
    }),
    defineField({
      name: "previouslyActive",
      title: "Previously Active in Club",
      type: "boolean",
      group: "football",
      readOnly: true,
    }),
    defineField({
      name: "pastClubNames",
      title: "Past Club Names",
      type: "text",
      group: "football",
      readOnly: true,
    }),
    defineField({
      name: "superpower",
      title: "Football Superpower",
      type: "text",
      group: "football",
      readOnly: true,
    }),
    defineField({
      name: "playerIdol",
      title: "Player Idol",
      type: "text",
      group: "football",
      readOnly: true,
    }),

    // === SOCIAL MEDIA GROUP ===
    defineField({
      name: "socialMediaActive",
      title: "Active on Social Media",
      type: "boolean",
      group: "social",
      readOnly: true,
    }),
    defineField({
      name: "socialMediaPlatforms",
      title: "Social Media Platforms",
      type: "array",
      of: [{ type: "string" }],
      group: "social",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "TikTok", value: "tiktok" },
          { title: "Facebook", value: "facebook" },
          { title: "Twitter/X", value: "twitter" },
          { title: "YouTube", value: "youtube" },
          { title: "LinkedIn", value: "linkedin" },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: "socialMediaHandles",
      title: "Social Media Handles",
      type: "text",
      group: "social",
      readOnly: true,
    }),

    // === ENGAGEMENT GROUP (Editable) ===
    defineField({
      name: "status",
      title: "Application Status",
      type: "string",
      group: "engagement",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Under Review", value: "under_review" },
          { title: "Shortlisted", value: "shortlisted" },
          { title: "Invited to Trial", value: "invited_trial" },
          { title: "Trial Completed", value: "trial_completed" },
          { title: "Selected", value: "selected" },
          { title: "Waitlisted", value: "waitlisted" },
          { title: "Not Selected", value: "not_selected" },
          { title: "Withdrawn", value: "withdrawn" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "rating",
      title: "Internal Rating",
      type: "number",
      group: "engagement",
      validation: (Rule) => Rule.min(1).max(5),
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      group: "engagement",
      rows: 4,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      group: "engagement",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "interestIfNotSelected",
      title: "Interest if Not Selected",
      type: "array",
      of: [{ type: "string" }],
      group: "engagement",
      options: {
        list: [
          { title: "Volunteer", value: "volunteer" },
          { title: "Ambassador", value: "ambassador" },
          { title: "Future Drafts", value: "future_drafts" },
          { title: "Newsletter", value: "newsletter" },
        ],
      },
      readOnly: true,
    }),

    // === INTERNAL/SYNC GROUP ===
    defineField({
      name: "sharePointId",
      title: "SharePoint Item ID",
      type: "string",
      group: "internal",
      readOnly: true,
      description: "Reference to the source record in SharePoint",
    }),
    defineField({
      name: "typeformResponseId",
      title: "Typeform Response ID",
      type: "string",
      group: "internal",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      group: "internal",
      readOnly: true,
    }),
    defineField({
      name: "lastSyncedAt",
      title: "Last Synced from SharePoint",
      type: "datetime",
      group: "internal",
      readOnly: true,
    }),

    // === COMPUTED SEGMENTS (managed by CDP engine) ===
    defineField({
      name: "segments",
      title: "Segments",
      type: "array",
      of: [{ type: "reference", to: [{ type: "cdpSegment" }] }],
      group: "engagement",
      description: "Auto-computed segment membership",
    }),

    // === EMAIL ENGAGEMENT ===
    defineField({
      name: "emailEngagement",
      title: "Email Engagement",
      type: "object",
      group: "engagement",
      fields: [
        defineField({
          name: "emailsSent",
          title: "Emails Sent",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "emailsOpened",
          title: "Emails Opened",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "emailsClicked",
          title: "Emails Clicked",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "lastEmailSentAt",
          title: "Last Email Sent",
          type: "datetime",
        }),
        defineField({
          name: "lastEmailOpenedAt",
          title: "Last Email Opened",
          type: "datetime",
        }),
        defineField({
          name: "unsubscribed",
          title: "Unsubscribed",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),

    // === FLOW ENROLLMENT ===
    defineField({
      name: "flowEnrollments",
      title: "Flow Enrollments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "flow",
              title: "Flow",
              type: "reference",
              to: [{ type: "emailFlow" }],
            }),
            defineField({
              name: "enrolledAt",
              title: "Enrolled At",
              type: "datetime",
            }),
            defineField({
              name: "currentStep",
              title: "Current Step",
              type: "number",
              initialValue: 0,
            }),
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: [
                  { title: "Active", value: "active" },
                  { title: "Completed", value: "completed" },
                  { title: "Paused", value: "paused" },
                  { title: "Exited", value: "exited" },
                ],
              },
            }),
            defineField({
              name: "nextStepAt",
              title: "Next Step Scheduled",
              type: "datetime",
            }),
          ],
          preview: {
            select: {
              flowTitle: "flow.name",
              status: "status",
              currentStep: "currentStep",
            },
            prepare({ flowTitle, status, currentStep }) {
              return {
                title: flowTitle || "Unknown Flow",
                subtitle: `Step ${currentStep || 0} - ${status || "unknown"}`,
              };
            },
          },
        },
      ],
      group: "engagement",
    }),

    // === Resend Contact ID ===
    defineField({
      name: "resendContactId",
      title: "Resend Contact ID",
      type: "string",
      group: "internal",
      readOnly: true,
      description: "Resend audience contact identifier",
    }),
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      status: "status",
      city: "city",
    },
    prepare({ firstName, lastName, email, status, city }) {
      const statusEmoji: Record<string, string> = {
        new: "🆕",
        under_review: "👀",
        shortlisted: "⭐",
        invited_trial: "📧",
        trial_completed: "✅",
        selected: "🎉",
        waitlisted: "⏳",
        not_selected: "❌",
        withdrawn: "🚫",
      };
      return {
        title: firstName && lastName ? `${firstName} ${lastName}` : email,
        subtitle: `${statusEmoji[status] || "🆕"} ${status?.replace("_", " ") || "new"} ${city ? `• ${city}` : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "firstName", direction: "asc" }],
    },
  ],
});
