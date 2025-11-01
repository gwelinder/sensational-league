import { defineField, defineType } from "sanity";

export const season = defineType({
  name: "season",
  title: "Season",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Season Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().min(2024),
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
      name: "status",
      title: "Season Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "teams",
      title: "Teams",
      type: "array",
      of: [{ type: "reference", to: { type: "team" } }],
    }),
    defineField({
      name: "pointsSystem",
      title: "Points System Configuration",
      type: "object",
      fields: [
        defineField({
          name: "matchWin",
          title: "Points for Match Win",
          type: "number",
          initialValue: 3,
        }),
        defineField({
          name: "matchDraw",
          title: "Points for Match Draw",
          type: "number",
          initialValue: 1,
        }),
        defineField({
          name: "matchLoss",
          title: "Points for Match Loss",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "socialMediaBonus",
          title: "Social Media Bonus Points (per milestone)",
          type: "number",
          initialValue: 1,
        }),
        defineField({
          name: "impactBonus",
          title: "Impact Activity Bonus Points",
          type: "number",
          initialValue: 2,
        }),
        defineField({
          name: "communityBonus",
          title: "Community Engagement Bonus Points",
          type: "number",
          initialValue: 1,
        }),
      ],
    }),
    defineField({
      name: "socialGoals",
      title: "Season Social Impact Goals",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "sdgGoal",
              title: "UN SDG Goal",
              type: "string",
              options: {
                list: [
                  { title: "No Poverty", value: "sdg1" },
                  { title: "Zero Hunger", value: "sdg2" },
                  { title: "Good Health and Well-being", value: "sdg3" },
                  { title: "Quality Education", value: "sdg4" },
                  { title: "Gender Equality", value: "sdg5" },
                  { title: "Clean Water and Sanitation", value: "sdg6" },
                  { title: "Affordable and Clean Energy", value: "sdg7" },
                  { title: "Decent Work and Economic Growth", value: "sdg8" },
                  { title: "Industry, Innovation and Infrastructure", value: "sdg9" },
                  { title: "Reduced Inequality", value: "sdg10" },
                  { title: "Sustainable Cities and Communities", value: "sdg11" },
                  { title: "Responsible Consumption and Production", value: "sdg12" },
                  { title: "Climate Action", value: "sdg13" },
                  { title: "Life Below Water", value: "sdg14" },
                  { title: "Life on Land", value: "sdg15" },
                  { title: "Peace and Justice Strong Institutions", value: "sdg16" },
                  { title: "Partnerships to achieve the Goal", value: "sdg17" },
                ],
              },
            }),
            defineField({
              name: "target",
              title: "Season Target",
              type: "string",
            }),
            defineField({
              name: "pointValue",
              title: "Points Value",
              type: "number",
              initialValue: 5,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "year",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      return {
        title: title,
        subtitle: `${subtitle} • ${status}`,
      };
    },
  },
});