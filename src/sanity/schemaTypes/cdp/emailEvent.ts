import { defineField, defineType } from "sanity";

/**
 * Email Event - Tracks email engagement events
 * 
 * Stores individual email events (sent, opened, clicked, bounced, etc.)
 * for analytics and flow condition evaluation.
 */
export const emailEvent = defineType({
  name: "emailEvent",
  title: "Email Event",
  type: "document",
  fields: [
    defineField({
      name: "applicant",
      title: "Applicant",
      type: "reference",
      to: [{ type: "draftApplicant" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Sent", value: "sent" },
          { title: "Delivered", value: "delivered" },
          { title: "Opened", value: "opened" },
          { title: "Clicked", value: "clicked" },
          { title: "Bounced", value: "bounced" },
          { title: "Complained", value: "complained" },
          { title: "Unsubscribed", value: "unsubscribed" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emailTemplate",
      title: "Email Template",
      type: "reference",
      to: [{ type: "emailTemplate" }],
    }),
    defineField({
      name: "flow",
      title: "Flow",
      type: "reference",
      to: [{ type: "emailFlow" }],
    }),
    defineField({
      name: "flowStep",
      title: "Flow Step",
      type: "number",
    }),
    defineField({
      name: "resendEmailId",
      title: "Resend Email ID",
      type: "string",
      description: "Resend's unique email identifier",
    }),
    defineField({
      name: "subject",
      title: "Email Subject",
      type: "string",
    }),
    defineField({
      name: "occurredAt",
      title: "Occurred At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metadata",
      title: "Event Metadata",
      type: "object",
      fields: [
        defineField({
          name: "userAgent",
          title: "User Agent",
          type: "string",
        }),
        defineField({
          name: "ip",
          title: "IP Address",
          type: "string",
        }),
        defineField({
          name: "clickedUrl",
          title: "Clicked URL",
          type: "url",
        }),
        defineField({
          name: "bounceType",
          title: "Bounce Type",
          type: "string",
          options: {
            list: [
              { title: "Hard", value: "hard" },
              { title: "Soft", value: "soft" },
            ],
          },
        }),
        defineField({
          name: "bounceReason",
          title: "Bounce Reason",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      applicantName: "applicant.firstName",
      applicantEmail: "applicant.email",
      eventType: "eventType",
      subject: "subject",
      occurredAt: "occurredAt",
    },
    prepare({ applicantName, applicantEmail, eventType, subject, occurredAt }) {
      const eventEmojis: Record<string, string> = {
        sent: "📤",
        delivered: "📬",
        opened: "👀",
        clicked: "🖱️",
        bounced: "⚠️",
        complained: "🚨",
        unsubscribed: "🚫",
      };
      return {
        title: `${eventEmojis[eventType] || "📧"} ${eventType} - ${applicantName || applicantEmail || "Unknown"}`,
        subtitle: subject
          ? `"${subject}" • ${new Date(occurredAt).toLocaleDateString()}`
          : new Date(occurredAt).toLocaleDateString(),
      };
    },
  },
  orderings: [
    {
      title: "Most Recent",
      name: "occurredAtDesc",
      by: [{ field: "occurredAt", direction: "desc" }],
    },
  ],
});
