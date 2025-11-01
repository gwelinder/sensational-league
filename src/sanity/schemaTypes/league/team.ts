import { defineField, defineType } from "sanity";

export const team = defineType({
  name: "team",
  title: "Team",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Team Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Team Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "colors",
      title: "Team Colors",
      type: "object",
      fields: [
        defineField({
          name: "primary",
          title: "Primary Color",
          type: "string",
          description: "Hex color code (e.g., #FF0000)",
        }),
        defineField({
          name: "secondary",
          title: "Secondary Color",
          type: "string",
          description: "Hex color code (e.g., #0000FF)",
        }),
      ],
    }),
    defineField({
      name: "foundedYear",
      title: "Founded Year",
      type: "number",
    }),
    defineField({
      name: "homeVenue",
      title: "Home Venue",
      type: "reference",
      to: { type: "venue" },
    }),
    defineField({
      name: "captain",
      title: "Team Captain",
      type: "reference",
      to: { type: "player" },
    }),
    defineField({
      name: "manager",
      title: "Team Manager",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Manager Name",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Manager Email",
          type: "email",
        }),
        defineField({
          name: "phone",
          title: "Manager Phone",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "players",
      title: "Squad",
      type: "array",
      of: [{ type: "reference", to: { type: "player" } }],
    }),
    defineField({
      name: "description",
      title: "Team Description",
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
        defineField({
          name: "youtube",
          title: "YouTube Channel",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "socialMetrics",
      title: "Social Media Metrics",
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
          name: "youtubeSubscribers",
          title: "YouTube Subscribers",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "totalEngagementRate",
          title: "Total Engagement Rate (%)",
          type: "number",
          description: "Average engagement rate across all platforms",
        }),
        defineField({
          name: "viralContent",
          title: "Viral Content Count",
          type: "number",
          description: "Number of posts that reached viral status",
          initialValue: 0,
        }),
        defineField({
          name: "lastUpdated",
          title: "Last Updated",
          type: "datetime",
        }),
      ],
    }),
    defineField({
      name: "impactActivities",
      title: "Social Impact Activities",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Activity Title",
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
              title: "Activity Date",
              type: "date",
            }),
            defineField({
              name: "volunteerHours",
              title: "Volunteer Hours",
              type: "number",
            }),
            defineField({
              name: "peopleImpacted",
              title: "People Impacted",
              type: "number",
            }),
            defineField({
              name: "pointsAwarded",
              title: "Points Awarded",
              type: "number",
            }),
            defineField({
              name: "media",
              title: "Activity Media",
              type: "array",
              of: [{ type: "image" }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "achievements",
      title: "Team Achievements",
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
      name: "statistics",
      title: "Team Statistics",
      type: "object",
      fields: [
        defineField({
          name: "matchesPlayed",
          title: "Matches Played",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "wins",
          title: "Wins",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "draws",
          title: "Draws",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "losses",
          title: "Losses",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "goalsFor",
          title: "Goals For",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "goalsAgainst",
          title: "Goals Against",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "matchPoints",
          title: "Match Points",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "bonusPoints",
          title: "Bonus Points",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "totalPoints",
          title: "Total Points",
          type: "number",
          initialValue: 0,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
      totalPoints: "statistics.totalPoints",
    },
    prepare(selection) {
      const { title, media, totalPoints } = selection;
      return {
        title: title,
        subtitle: `${totalPoints || 0} points`,
        media: media,
      };
    },
  },
});