import { defineField, defineType } from "sanity";

export const player = defineType({
  name: "player",
  title: "Player",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: any) => `${doc.firstName} ${doc.lastName}`,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jerseyNumber",
      title: "Jersey Number",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(99),
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      options: {
        list: [
          { title: "Goalkeeper", value: "goalkeeper" },
          { title: "Defender", value: "defender" },
          { title: "Midfielder", value: "midfielder" },
          { title: "Forward", value: "forward" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "dateOfBirth",
      title: "Date of Birth",
      type: "date",
    }),
    defineField({
      name: "nationality",
      title: "Nationality",
      type: "string",
    }),
    defineField({
      name: "height",
      title: "Height (cm)",
      type: "number",
    }),
    defineField({
      name: "weight",
      title: "Weight (kg)",
      type: "number",
    }),
    defineField({
      name: "team",
      title: "Current Team",
      type: "reference",
      to: { type: "team" },
    }),
    defineField({
      name: "isCaptain",
      title: "Is Team Captain",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "bio",
      title: "Player Biography",
      type: "blockContent",
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media Accounts",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          title: "Instagram Handle",
          type: "string",
          description: "Without @",
        }),
        defineField({
          name: "tiktok",
          title: "TikTok Handle",
          type: "string",
          description: "Without @",
        }),
        defineField({
          name: "twitter",
          title: "Twitter Handle",
          type: "string",
          description: "Without @",
        }),
      ],
    }),
    defineField({
      name: "personalSocialMetrics",
      title: "Personal Social Media Metrics",
      type: "object",
      fields: [
        defineField({
          name: "instagramFollowers",
          title: "Instagram Followers",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "tiktokFollowers",
          title: "TikTok Followers",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "twitterFollowers",
          title: "Twitter Followers",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "totalFollowers",
          title: "Total Followers",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "engagementRate",
          title: "Average Engagement Rate (%)",
          type: "number",
        }),
        defineField({
          name: "viralPosts",
          title: "Viral Posts Count",
          type: "number",
          initialValue: 0,
        }),
      ],
    }),
    defineField({
      name: "matchStatistics",
      title: "Match Statistics",
      type: "object",
      fields: [
        defineField({
          name: "appearances",
          title: "Appearances",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "goals",
          title: "Goals",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "assists",
          title: "Assists",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "yellowCards",
          title: "Yellow Cards",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "redCards",
          title: "Red Cards",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "cleanSheets",
          title: "Clean Sheets (Goalkeepers)",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "saves",
          title: "Saves (Goalkeepers)",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "minutesPlayed",
          title: "Minutes Played",
          type: "number",
          initialValue: 0,
        }),
      ],
    }),
    defineField({
      name: "impactContributions",
      title: "Personal Impact Contributions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "activity",
              title: "Activity",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "sdgGoals",
              title: "UN SDG Goals Addressed",
              type: "array",
              of: [{ type: "string" }],
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
              name: "date",
              title: "Date",
              type: "date",
            }),
            defineField({
              name: "hoursContributed",
              title: "Hours Contributed",
              type: "number",
            }),
            defineField({
              name: "pointsEarned",
              title: "Points Earned",
              type: "number",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "achievements",
      title: "Personal Achievements",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Achievement Title",
              type: "string",
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  { title: "Match Performance", value: "match" },
                  { title: "Social Media", value: "social" },
                  { title: "Community Impact", value: "impact" },
                  { title: "Season Award", value: "season" },
                  { title: "Career Milestone", value: "career" },
                ],
              },
            }),
            defineField({
              name: "date",
              title: "Achievement Date",
              type: "date",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "badge",
              title: "Achievement Badge",
              type: "image",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "personalGoals",
      title: "Personal Season Goals",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Goal Category",
              type: "string",
              options: {
                list: [
                  { title: "Match Performance", value: "match" },
                  { title: "Social Media Growth", value: "social" },
                  { title: "Impact Contribution", value: "impact" },
                  { title: "Team Leadership", value: "leadership" },
                ],
              },
            }),
            defineField({
              name: "target",
              title: "Target Goal",
              type: "string",
            }),
            defineField({
              name: "currentProgress",
              title: "Current Progress",
              type: "number",
              initialValue: 0,
            }),
            defineField({
              name: "targetValue",
              title: "Target Value",
              type: "number",
            }),
            defineField({
              name: "deadline",
              title: "Deadline",
              type: "date",
            }),
            defineField({
              name: "completed",
              title: "Completed",
              type: "boolean",
              initialValue: false,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "injuryHistory",
      title: "Injury History",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "injuryType",
              title: "Injury Type",
              type: "string",
            }),
            defineField({
              name: "dateInjured",
              title: "Date Injured",
              type: "date",
            }),
            defineField({
              name: "dateRecovered",
              title: "Date Recovered",
              type: "date",
            }),
            defineField({
              name: "matchesMissed",
              title: "Matches Missed",
              type: "number",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "contractDetails",
      title: "Contract Details",
      type: "object",
      fields: [
        defineField({
          name: "startDate",
          title: "Contract Start Date",
          type: "date",
        }),
        defineField({
          name: "endDate",
          title: "Contract End Date",
          type: "date",
        }),
        defineField({
          name: "status",
          title: "Contract Status",
          type: "string",
          options: {
            list: [
              { title: "Active", value: "active" },
              { title: "Expired", value: "expired" },
              { title: "Terminated", value: "terminated" },
            ],
          },
          initialValue: "active",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      jerseyNumber: "jerseyNumber",
      position: "position",
      media: "profileImage",
    },
    prepare(selection) {
      const { firstName, lastName, jerseyNumber, position, media } = selection;
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `#${jerseyNumber} • ${position}`,
        media: media,
      };
    },
  },
});