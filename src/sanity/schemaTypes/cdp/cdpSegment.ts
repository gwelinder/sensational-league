import { defineField, defineType } from "sanity";

/**
 * CDP Segment - Dynamic grouping of applicants
 *
 * Segments allow targeting specific groups of applicants based on
 * criteria like position, skill level, location, engagement, etc.
 *
 * Segments can be:
 * - Rule-based (auto-computed from applicant attributes)
 * - Manual (manually curated lists)
 * - Synced to Resend Audiences for email targeting
 */
export const cdpSegment = defineType({
  name: "cdpSegment",
  title: "CDP Segment",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Segment Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., 'Goalkeepers', 'Copenhagen Players', 'High Engagement'",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { title: "Volt Yellow", value: "#D4FF00" },
          { title: "Orange", value: "#FF4400" },
          { title: "Purple", value: "#AE00FF" },
          { title: "Cyan", value: "#00FBFF" },
          { title: "Gray", value: "#6B7280" },
          { title: "Green", value: "#10B981" },
          { title: "Red", value: "#EF4444" },
          { title: "Blue", value: "#3B82F6" },
        ],
      },
      initialValue: "#D4FF00",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Users", value: "users" },
          { title: "Star", value: "star" },
          { title: "Football", value: "football" },
          { title: "Location", value: "location" },
          { title: "Trending", value: "trending" },
          { title: "Clock", value: "clock" },
          { title: "Heart", value: "heart" },
          { title: "Zap", value: "zap" },
        ],
      },
      initialValue: "users",
    }),
    defineField({
      name: "type",
      title: "Segment Type",
      type: "string",
      options: {
        list: [
          { title: "Rule-based (Auto)", value: "rule" },
          { title: "Manual", value: "manual" },
        ],
        layout: "radio",
      },
      initialValue: "rule",
    }),

    // === RULE-BASED CRITERIA ===
    defineField({
      name: "rules",
      title: "Segment Rules",
      type: "object",
      hidden: ({ document }) => document?.type !== "rule",
      description: "Applicants matching ALL rules will be included in this segment",
      fields: [
        defineField({
          name: "matchType",
          title: "Match Type",
          type: "string",
          options: {
            list: [
              { title: "Match ALL rules (AND)", value: "all" },
              { title: "Match ANY rule (OR)", value: "any" },
            ],
          },
          initialValue: "all",
        }),
        defineField({
          name: "conditions",
          title: "Conditions",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "field",
                  title: "Field",
                  type: "string",
                  options: {
                    list: [
                      { title: "Status", value: "status" },
                      { title: "Preferred Position", value: "preferredPositions" },
                      { title: "Age Group", value: "ageGroup" },
                      { title: "Highest Level", value: "highestLevel" },
                      { title: "City", value: "city" },
                      { title: "Currently Active", value: "currentlyActive" },
                      { title: "Social Media Active", value: "socialMediaActive" },
                      { title: "Interest if Not Selected", value: "interestIfNotSelected" },
                      { title: "Rating", value: "rating" },
                      { title: "Tags", value: "tags" },
                      { title: "Days Since Submission", value: "daysSinceSubmission" },
                      { title: "Emails Opened", value: "emailsOpened" },
                      { title: "Has Unsubscribed", value: "unsubscribed" },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "operator",
                  title: "Operator",
                  type: "string",
                  options: {
                    list: [
                      { title: "Equals", value: "eq" },
                      { title: "Not Equals", value: "neq" },
                      { title: "Contains", value: "contains" },
                      { title: "Not Contains", value: "notContains" },
                      { title: "Greater Than", value: "gt" },
                      { title: "Less Than", value: "lt" },
                      { title: "Is Empty", value: "empty" },
                      { title: "Is Not Empty", value: "notEmpty" },
                      { title: "Is True", value: "isTrue" },
                      { title: "Is False", value: "isFalse" },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                  description: "For multiple values, separate with commas",
                }),
              ],
              preview: {
                select: {
                  field: "field",
                  operator: "operator",
                  value: "value",
                },
                prepare({ field, operator, value }) {
                  const opLabels: Record<string, string> = {
                    eq: "=",
                    neq: "!=",
                    contains: "contains",
                    notContains: "not contains",
                    gt: ">",
                    lt: "<",
                    empty: "is empty",
                    notEmpty: "is not empty",
                    isTrue: "is true",
                    isFalse: "is false",
                  };
                  return {
                    title: `${field} ${opLabels[operator] || operator} ${value || ""}`.trim(),
                  };
                },
              },
            },
          ],
        }),
      ],
    }),

    // === RESEND SYNC ===
    defineField({
      name: "resendAudienceId",
      title: "Resend Audience ID",
      type: "string",
      description: "If set, segment members will be synced to this Resend audience",
    }),
    defineField({
      name: "syncToResend",
      title: "Sync to Resend",
      type: "boolean",
      initialValue: false,
      description: "Enable automatic sync to Resend audience",
    }),
    defineField({
      name: "lastSyncedAt",
      title: "Last Synced to Resend",
      type: "datetime",
      readOnly: true,
    }),

    // === STATISTICS ===
    defineField({
      name: "memberCount",
      title: "Member Count",
      type: "number",
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: "lastComputedAt",
      title: "Last Computed",
      type: "datetime",
      readOnly: true,
    }),

    // === ASSOCIATED FLOWS ===
    defineField({
      name: "triggerFlows",
      title: "Trigger Flows on Entry",
      type: "array",
      of: [{ type: "reference", to: [{ type: "emailFlow" }] }],
      description: "Email flows to start when an applicant enters this segment",
    }),

    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      memberCount: "memberCount",
      type: "type",
      active: "active",
    },
    prepare({ title, memberCount, type, active }) {
      return {
        title: title || "Untitled Segment",
        subtitle: `${memberCount || 0} members • ${type === "rule" ? "Auto" : "Manual"} ${active ? "" : "• Inactive"}`,
      };
    },
  },
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Most Members",
      name: "memberCountDesc",
      by: [{ field: "memberCount", direction: "desc" }],
    },
  ],
});