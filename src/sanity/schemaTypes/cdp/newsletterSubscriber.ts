import { defineField, defineType } from "sanity";

/**
 * Newsletter Subscriber - CDP Contact Profile
 * 
 * This schema represents a newsletter subscriber from the website.
 * SharePoint remains the source of truth; this mirrors the data for CDP functionality.
 * 
 * Key features:
 * - Synced from SharePoint newsletter list
 * - Can be linked to draftApplicant if same email exists
 * - Email engagement tracking
 * - Source tracking (homepage, footer, etc.)
 */
export const newsletterSubscriber = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscriber",
  type: "document",
  groups: [
    { name: "profile", title: "Profile", default: true },
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
      name: "status",
      title: "Subscription Status",
      type: "string",
      group: "profile",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Unsubscribed", value: "unsubscribed" },
          { title: "Bounced", value: "bounced" },
          { title: "Complained", value: "complained" },
        ],
        layout: "radio",
      },
      initialValue: "active",
    }),
    defineField({
      name: "source",
      title: "Signup Source",
      type: "string",
      group: "profile",
      options: {
        list: [
          { title: "Homepage Header", value: "homepage-header" },
          { title: "Homepage Footer", value: "homepage-footer" },
          { title: "Footer", value: "footer" },
          { title: "Player Draft Page", value: "player-draft" },
          { title: "Press Page", value: "press" },
          { title: "Manual Import", value: "manual" },
          { title: "Unknown", value: "unknown" },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      group: "profile",
      readOnly: true,
    }),
    defineField({
      name: "unsubscribedAt",
      title: "Unsubscribed At",
      type: "datetime",
      group: "profile",
      readOnly: true,
      hidden: ({ document }) => document?.status !== "unsubscribed",
    }),

    // === ENGAGEMENT GROUP ===
    defineField({
      name: "consentGiven",
      title: "Consent Given",
      type: "boolean",
      group: "engagement",
      readOnly: true,
      initialValue: false,
    }),
    defineField({
      name: "consentTimestamp",
      title: "Consent Timestamp",
      type: "datetime",
      group: "engagement",
      readOnly: true,
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
      name: "notes",
      title: "Internal Notes",
      type: "text",
      group: "engagement",
      rows: 3,
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
      ],
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

    // === LINKED APPLICANT ===
    defineField({
      name: "linkedApplicant",
      title: "Linked Draft Applicant",
      type: "reference",
      to: [{ type: "draftApplicant" }],
      group: "engagement",
      description: "If this subscriber also applied for the draft",
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
      name: "lastSyncedAt",
      title: "Last Synced from SharePoint",
      type: "datetime",
      group: "internal",
      readOnly: true,
    }),
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
      email: "email",
      status: "status",
      source: "source",
      subscribedAt: "subscribedAt",
    },
    prepare({ email, status, source, subscribedAt }) {
      const statusEmoji: Record<string, string> = {
        active: "✅",
        unsubscribed: "🚫",
        bounced: "⚠️",
        complained: "❌",
      };
      const date = subscribedAt ? new Date(subscribedAt).toLocaleDateString() : "";
      return {
        title: email,
        subtitle: `${statusEmoji[status] || "❓"} ${status || "unknown"} • ${source || "unknown source"} ${date ? `• ${date}` : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "subscribedAtDesc",
      by: [{ field: "subscribedAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
    {
      title: "Email A-Z",
      name: "emailAsc",
      by: [{ field: "email", direction: "asc" }],
    },
  ],
});
