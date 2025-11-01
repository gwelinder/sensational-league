import { defineField, defineType } from "sanity";

export const match = defineType({
  name: "match",
  title: "Match",
  type: "document",
  fields: [
    defineField({
      name: "homeTeam",
      title: "Home Team",
      type: "reference",
      to: { type: "team" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "awayTeam",
      title: "Away Team",
      type: "reference",
      to: { type: "team" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "season",
      title: "Season",
      type: "reference",
      to: { type: "season" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "reference",
      to: { type: "venue" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Match Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Match Status",
      type: "string",
      options: {
        list: [
          { title: "Scheduled", value: "scheduled" },
          { title: "Live", value: "live" },
          { title: "Completed", value: "completed" },
          { title: "Postponed", value: "postponed" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "scheduled",
    }),
    defineField({
      name: "matchType",
      title: "Match Type",
      type: "string",
      options: {
        list: [
          { title: "League Match", value: "league" },
          { title: "Cup Match", value: "cup" },
          { title: "Friendly", value: "friendly" },
          { title: "Playoff", value: "playoff" },
        ],
      },
      initialValue: "league",
    }),
    defineField({
      name: "score",
      title: "Final Score",
      type: "object",
      fields: [
        defineField({
          name: "homeGoals",
          title: "Home Team Goals",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "awayGoals",
          title: "Away Team Goals",
          type: "number",
          initialValue: 0,
        }),
      ],
    }),
    defineField({
      name: "goals",
      title: "Goals",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "player",
              title: "Goal Scorer",
              type: "reference",
              to: { type: "player" },
            }),
            defineField({
              name: "team",
              title: "Team",
              type: "reference",
              to: { type: "team" },
            }),
            defineField({
              name: "minute",
              title: "Minute",
              type: "number",
              validation: (Rule) => Rule.min(1).max(120),
            }),
            defineField({
              name: "assist",
              title: "Assist",
              type: "reference",
              to: { type: "player" },
            }),
            defineField({
              name: "goalType",
              title: "Goal Type",
              type: "string",
              options: {
                list: [
                  { title: "Regular", value: "regular" },
                  { title: "Penalty", value: "penalty" },
                  { title: "Own Goal", value: "own_goal" },
                  { title: "Free Kick", value: "free_kick" },
                ],
              },
              initialValue: "regular",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "player",
              title: "Player",
              type: "reference",
              to: { type: "player" },
            }),
            defineField({
              name: "team",
              title: "Team",
              type: "reference",
              to: { type: "team" },
            }),
            defineField({
              name: "minute",
              title: "Minute",
              type: "number",
              validation: (Rule) => Rule.min(1).max(120),
            }),
            defineField({
              name: "cardType",
              title: "Card Type",
              type: "string",
              options: {
                list: [
                  { title: "Yellow Card", value: "yellow" },
                  { title: "Red Card", value: "red" },
                ],
              },
            }),
            defineField({
              name: "reason",
              title: "Reason",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "substitutions",
      title: "Substitutions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "playerOut",
              title: "Player Substituted Out",
              type: "reference",
              to: { type: "player" },
            }),
            defineField({
              name: "playerIn",
              title: "Player Substituted In",
              type: "reference",
              to: { type: "player" },
            }),
            defineField({
              name: "team",
              title: "Team",
              type: "reference",
              to: { type: "team" },
            }),
            defineField({
              name: "minute",
              title: "Minute",
              type: "number",
              validation: (Rule) => Rule.min(1).max(120),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "startingLineups",
      title: "Starting Lineups",
      type: "object",
      fields: [
        defineField({
          name: "homeTeamLineup",
          title: "Home Team Starting XI",
          type: "array",
          of: [{ type: "reference", to: { type: "player" } }],
          validation: (Rule) => Rule.max(11),
        }),
        defineField({
          name: "awayTeamLineup",
          title: "Away Team Starting XI",
          type: "array",
          of: [{ type: "reference", to: { type: "player" } }],
          validation: (Rule) => Rule.max(11),
        }),
      ],
    }),
    defineField({
      name: "matchOfficials",
      title: "Match Officials",
      type: "object",
      fields: [
        defineField({
          name: "referee",
          title: "Referee",
          type: "string",
        }),
        defineField({
          name: "assistantReferee1",
          title: "Assistant Referee 1",
          type: "string",
        }),
        defineField({
          name: "assistantReferee2",
          title: "Assistant Referee 2",
          type: "string",
        }),
        defineField({
          name: "fourthOfficial",
          title: "Fourth Official",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "socialMediaMetrics",
      title: "Social Media Metrics",
      type: "object",
      fields: [
        defineField({
          name: "totalMentions",
          title: "Total Social Media Mentions",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "hashtags",
          title: "Trending Hashtags",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "viralMoments",
          title: "Viral Moments",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "description",
                  title: "Moment Description",
                  type: "string",
                }),
                defineField({
                  name: "minute",
                  title: "Match Minute",
                  type: "number",
                }),
                defineField({
                  name: "platform",
                  title: "Platform",
                  type: "string",
                  options: {
                    list: [
                      { title: "TikTok", value: "tiktok" },
                      { title: "Instagram", value: "instagram" },
                      { title: "Twitter", value: "twitter" },
                      { title: "YouTube", value: "youtube" },
                    ],
                  },
                }),
                defineField({
                  name: "engagementCount",
                  title: "Engagement Count",
                  type: "number",
                }),
                defineField({
                  name: "media",
                  title: "Media",
                  type: "image",
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "fanEngagementScore",
          title: "Fan Engagement Score",
          type: "number",
          description: "1-100 score based on social media activity",
        }),
        defineField({
          name: "liveViewers",
          title: "Live Stream Viewers",
          type: "number",
          initialValue: 0,
        }),
      ],
    }),
    defineField({
      name: "matchHighlights",
      title: "Match Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Highlight Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "minute",
              title: "Match Minute",
              type: "number",
            }),
            defineField({
              name: "type",
              title: "Highlight Type",
              type: "string",
              options: {
                list: [
                  { title: "Goal", value: "goal" },
                  { title: "Save", value: "save" },
                  { title: "Skill", value: "skill" },
                  { title: "Celebration", value: "celebration" },
                  { title: "Impact Moment", value: "impact" },
                ],
              },
            }),
            defineField({
              name: "media",
              title: "Highlight Media",
              type: "image",
            }),
            defineField({
              name: "videoUrl",
              title: "Video URL",
              type: "url",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "matchStats",
      title: "Match Statistics",
      type: "object",
      fields: [
        defineField({
          name: "homeTeamPossession",
          title: "Home Team Possession (%)",
          type: "number",
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: "awayTeamPossession",
          title: "Away Team Possession (%)",
          type: "number",
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: "homeTeamShots",
          title: "Home Team Total Shots",
          type: "number",
        }),
        defineField({
          name: "awayTeamShots",
          title: "Away Team Total Shots",
          type: "number",
        }),
        defineField({
          name: "homeTeamShotsOnTarget",
          title: "Home Team Shots on Target",
          type: "number",
        }),
        defineField({
          name: "awayTeamShotsOnTarget",
          title: "Away Team Shots on Target",
          type: "number",
        }),
        defineField({
          name: "attendance",
          title: "Attendance",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "pointsAwarded",
      title: "Points Awarded",
      type: "object",
      fields: [
        defineField({
          name: "homeTeamMatchPoints",
          title: "Home Team Match Points",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "awayTeamMatchPoints",
          title: "Away Team Match Points",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "homeTeamBonusPoints",
          title: "Home Team Bonus Points",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "awayTeamBonusPoints",
          title: "Away Team Bonus Points",
          type: "number",
          initialValue: 0,
        }),
        defineField({
          name: "bonusPointsBreakdown",
          title: "Bonus Points Breakdown",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "team",
                  title: "Team",
                  type: "reference",
                  to: { type: "team" },
                }),
                defineField({
                  name: "category",
                  title: "Category",
                  type: "string",
                  options: {
                    list: [
                      { title: "Social Media Milestone", value: "social" },
                      { title: "Impact Activity", value: "impact" },
                      { title: "Fan Engagement", value: "engagement" },
                      { title: "Fair Play", value: "fairplay" },
                    ],
                  },
                }),
                defineField({
                  name: "points",
                  title: "Points",
                  type: "number",
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "string",
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "weather",
      title: "Weather Conditions",
      type: "object",
      fields: [
        defineField({
          name: "temperature",
          title: "Temperature (°C)",
          type: "number",
        }),
        defineField({
          name: "conditions",
          title: "Weather Conditions",
          type: "string",
          options: {
            list: [
              { title: "Sunny", value: "sunny" },
              { title: "Cloudy", value: "cloudy" },
              { title: "Rainy", value: "rainy" },
              { title: "Windy", value: "windy" },
              { title: "Snow", value: "snow" },
            ],
          },
        }),
        defineField({
          name: "humidity",
          title: "Humidity (%)",
          type: "number",
          validation: (Rule) => Rule.min(0).max(100),
        }),
      ],
    }),
    defineField({
      name: "notes",
      title: "Match Notes",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      homeTeam: "homeTeam.name",
      awayTeam: "awayTeam.name",
      date: "date",
      status: "status",
      homeGoals: "score.homeGoals",
      awayGoals: "score.awayGoals",
    },
    prepare(selection) {
      const { homeTeam, awayTeam, date, status, homeGoals, awayGoals } = selection;
      const formattedDate = new Date(date).toLocaleDateString();
      const score = status === "completed" ? `${homeGoals || 0}-${awayGoals || 0}` : "";
      
      return {
        title: `${homeTeam} vs ${awayTeam}`,
        subtitle: `${formattedDate} • ${status} ${score}`,
      };
    },
  },
});