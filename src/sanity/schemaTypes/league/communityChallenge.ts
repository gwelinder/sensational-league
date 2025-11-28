import { defineField, defineType } from "sanity";

export const communityChallenge = defineType({
  name: "communityChallenge",
  title: "Community Challenge",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Challenge Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "blockContent",
      description: "Detailed description for the challenge detail page",
    }),
    defineField({
      name: "sdgGoals",
      title: "UN SDG Goals",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "1 - No Poverty", value: "sdg1" },
          { title: "2 - Zero Hunger", value: "sdg2" },
          { title: "3 - Good Health and Well-being", value: "sdg3" },
          { title: "4 - Quality Education", value: "sdg4" },
          { title: "5 - Gender Equality", value: "sdg5" },
          { title: "6 - Clean Water and Sanitation", value: "sdg6" },
          { title: "7 - Affordable and Clean Energy", value: "sdg7" },
          { title: "8 - Decent Work and Economic Growth", value: "sdg8" },
          { title: "9 - Industry, Innovation and Infrastructure", value: "sdg9" },
          { title: "10 - Reduced Inequality", value: "sdg10" },
          { title: "11 - Sustainable Cities and Communities", value: "sdg11" },
          { title: "12 - Responsible Consumption and Production", value: "sdg12" },
          { title: "13 - Climate Action", value: "sdg13" },
          { title: "14 - Life Below Water", value: "sdg14" },
          { title: "15 - Life on Land", value: "sdg15" },
          { title: "16 - Peace and Justice Strong Institutions", value: "sdg16" },
          { title: "17 - Partnerships to achieve the Goal", value: "sdg17" },
        ],
      },
      validation: (Rule) => Rule.min(1).error("Select at least one SDG goal"),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pointsAvailable",
      title: "Points Available",
      type: "number",
      description: "Maximum points teams can earn from this challenge",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Upcoming", value: "upcoming" },
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Community Service", value: "community" },
          { title: "Environmental", value: "environmental" },
          { title: "Education", value: "education" },
          { title: "Health & Wellness", value: "health" },
          { title: "Equality & Inclusion", value: "equality" },
          { title: "Economic Empowerment", value: "economic" },
        ],
      },
    }),
    defineField({
      name: "icon",
      title: "Challenge Icon",
      type: "string",
      description: "Emoji or icon to represent this challenge",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [{ type: "string" }],
      description: "List of requirements to complete this challenge",
    }),
    defineField({
      name: "howToParticipate",
      title: "How to Participate",
      type: "blockContent",
      description: "Instructions for teams on how to participate",
    }),
    defineField({
      name: "participatingTeams",
      title: "Participating Teams",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "team",
              title: "Team",
              type: "reference",
              to: [{ type: "team" }],
            }),
            defineField({
              name: "status",
              title: "Participation Status",
              type: "string",
              options: {
                list: [
                  { title: "Signed Up", value: "signed_up" },
                  { title: "In Progress", value: "in_progress" },
                  { title: "Completed", value: "completed" },
                  { title: "Verified", value: "verified" },
                ],
              },
            }),
            defineField({
              name: "pointsEarned",
              title: "Points Earned",
              type: "number",
              initialValue: 0,
            }),
            defineField({
              name: "completionDate",
              title: "Completion Date",
              type: "datetime",
            }),
            defineField({
              name: "evidence",
              title: "Evidence",
              type: "array",
              of: [
                { type: "image" },
                { type: "file" },
              ],
              description: "Photos or documents proving completion",
            }),
            defineField({
              name: "notes",
              title: "Notes",
              type: "text",
              rows: 2,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "metrics",
      title: "Impact Metrics",
      type: "object",
      fields: [
        defineField({
          name: "targetVolunteerHours",
          title: "Target Volunteer Hours",
          type: "number",
        }),
        defineField({
          name: "actualVolunteerHours",
          title: "Actual Volunteer Hours",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "targetPeopleImpacted",
          title: "Target People Impacted",
          type: "number",
        }),
        defineField({
          name: "actualPeopleImpacted",
          title: "Actual People Impacted",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "targetTeams",
          title: "Target Number of Teams",
          type: "number",
        }),
        defineField({
          name: "customMetric",
          title: "Custom Metric Name",
          type: "string",
          description: "e.g., 'Trees Planted', 'Meals Served'",
        }),
        defineField({
          name: "customMetricTarget",
          title: "Custom Metric Target",
          type: "number",
        }),
        defineField({
          name: "customMetricActual",
          title: "Custom Metric Actual",
          type: "number",
          initialValue: 0,
        }),
      ],
    }),
    defineField({
      name: "sponsor",
      title: "Challenge Sponsor",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Sponsor Name",
          type: "string",
        }),
        defineField({
          name: "logo",
          title: "Sponsor Logo",
          type: "image",
        }),
        defineField({
          name: "url",
          title: "Sponsor Website",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Challenge",
      type: "boolean",
      description: "Show prominently on the impact page",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which to display (lower = first)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      points: "pointsAvailable",
      media: "coverImage",
    },
    prepare({ title, status, points, media }) {
      const statusEmoji = {
        draft: "📝",
        upcoming: "🔜",
        active: "🟢",
        completed: "✅",
      }[status as string] || "📋";

      return {
        title: `${statusEmoji} ${title}`,
        subtitle: `${points || 0} points`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
    {
      title: "Start Date",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
});
