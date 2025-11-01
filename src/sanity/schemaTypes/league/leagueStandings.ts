import { defineField, defineType } from 'sanity'

export const leagueStandings = defineType({
  name: 'leagueStandings',
  title: 'League Standings',
  type: 'document',
  fields: [
    defineField({
      name: 'season',
      type: 'reference',
      title: 'Season',
      to: [{ type: 'season' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      type: 'datetime',
      title: 'Last Updated',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'standings',
      type: 'array',
      title: 'Team Standings',
      of: [
        {
          type: 'object',
          title: 'Team Standing',
          fields: [
            {
              name: 'position',
              type: 'number',
              title: 'Position',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'team',
              type: 'reference',
              title: 'Team',
              to: [{ type: 'team' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'matchStats',
              type: 'object',
              title: 'Match Statistics',
              fields: [
                {
                  name: 'played',
                  type: 'number',
                  title: 'Matches Played',
                  initialValue: 0,
                },
                {
                  name: 'won',
                  type: 'number',
                  title: 'Wins',
                  initialValue: 0,
                },
                {
                  name: 'drawn',
                  type: 'number',
                  title: 'Draws',
                  initialValue: 0,
                },
                {
                  name: 'lost',
                  type: 'number',
                  title: 'Losses',
                  initialValue: 0,
                },
                {
                  name: 'goalsFor',
                  type: 'number',
                  title: 'Goals For',
                  initialValue: 0,
                },
                {
                  name: 'goalsAgainst',
                  type: 'number',
                  title: 'Goals Against',
                  initialValue: 0,
                },
                {
                  name: 'goalDifference',
                  type: 'number',
                  title: 'Goal Difference',
                  initialValue: 0,
                  readOnly: true,
                },
                {
                  name: 'matchPoints',
                  type: 'number',
                  title: 'Match Points',
                  description: 'Points from win/draw/loss results',
                  initialValue: 0,
                },
              ],
            },
            {
              name: 'socialMediaStats',
              type: 'object',
              title: 'Social Media Performance',
              fields: [
                {
                  name: 'totalFollowerGrowth',
                  type: 'number',
                  title: 'Total Follower Growth (Season)',
                  initialValue: 0,
                },
                {
                  name: 'averageEngagementRate',
                  type: 'number',
                  title: 'Average Engagement Rate (%)',
                  validation: (Rule) => Rule.min(0).max(100),
                  initialValue: 0,
                },
                {
                  name: 'viralMoments',
                  type: 'number',
                  title: 'Viral Moments Count',
                  initialValue: 0,
                },
                {
                  name: 'totalReach',
                  type: 'number',
                  title: 'Total Social Media Reach',
                  initialValue: 0,
                },
                {
                  name: 'socialMediaPoints',
                  type: 'number',
                  title: 'Social Media Points',
                  initialValue: 0,
                },
                {
                  name: 'platformBreakdown',
                  type: 'object',
                  title: 'Platform Breakdown',
                  fields: [
                    {
                      name: 'instagram',
                      type: 'object',
                      title: 'Instagram',
                      fields: [
                        {
                          name: 'followerGrowth',
                          type: 'number',
                          title: 'Follower Growth',
                          initialValue: 0,
                        },
                        {
                          name: 'avgEngagement',
                          type: 'number',
                          title: 'Average Engagement (%)',
                          initialValue: 0,
                        },
                        {
                          name: 'viralPosts',
                          type: 'number',
                          title: 'Viral Posts',
                          initialValue: 0,
                        },
                      ],
                    },
                    {
                      name: 'tiktok',
                      type: 'object',
                      title: 'TikTok',
                      fields: [
                        {
                          name: 'followerGrowth',
                          type: 'number',
                          title: 'Follower Growth',
                          initialValue: 0,
                        },
                        {
                          name: 'totalViews',
                          type: 'number',
                          title: 'Total Views',
                          initialValue: 0,
                        },
                        {
                          name: 'viralVideos',
                          type: 'number',
                          title: 'Viral Videos',
                          initialValue: 0,
                        },
                      ],
                    },
                    {
                      name: 'twitter',
                      type: 'object',
                      title: 'Twitter',
                      fields: [
                        {
                          name: 'followerGrowth',
                          type: 'number',
                          title: 'Follower Growth',
                          initialValue: 0,
                        },
                        {
                          name: 'impressions',
                          type: 'number',
                          title: 'Total Impressions',
                          initialValue: 0,
                        },
                        {
                          name: 'retweetCount',
                          type: 'number',
                          title: 'Total Retweets',
                          initialValue: 0,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'impactStats',
              type: 'object',
              title: 'Social Impact Performance',
              fields: [
                {
                  name: 'totalVolunteerHours',
                  type: 'number',
                  title: 'Total Volunteer Hours',
                  initialValue: 0,
                },
                {
                  name: 'communityEventsHosted',
                  type: 'number',
                  title: 'Community Events Hosted',
                  initialValue: 0,
                },
                {
                  name: 'fundsRaised',
                  type: 'number',
                  title: 'Funds Raised ($)',
                  initialValue: 0,
                },
                {
                  name: 'sdgGoalsSupported',
                  type: 'array',
                  title: 'SDG Goals Supported',
                  of: [{ type: 'string' }],
                },
                {
                  name: 'impactPoints',
                  type: 'number',
                  title: 'Impact Points Earned',
                  initialValue: 0,
                },
                {
                  name: 'impactActivities',
                  type: 'array',
                  title: 'Impact Activities',
                  of: [
                    {
                      type: 'object',
                      title: 'Impact Activity',
                      fields: [
                        {
                          name: 'activity',
                          type: 'string',
                          title: 'Activity Name',
                        },
                        {
                          name: 'date',
                          type: 'date',
                          title: 'Date',
                        },
                        {
                          name: 'participants',
                          type: 'number',
                          title: 'Participants',
                        },
                        {
                          name: 'pointsEarned',
                          type: 'number',
                          title: 'Points Earned',
                        },
                        {
                          name: 'description',
                          type: 'text',
                          title: 'Description',
                          rows: 2,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'additionalMetrics',
              type: 'object',
              title: 'Additional Performance Metrics',
              fields: [
                {
                  name: 'fairPlayPoints',
                  type: 'number',
                  title: 'Fair Play Points',
                  description: 'Points for good sportsmanship',
                  initialValue: 0,
                },
                {
                  name: 'creativityPoints',
                  type: 'number',
                  title: 'Creativity & Innovation Points',
                  description: 'Points for creative content and celebrations',
                  initialValue: 0,
                },
                {
                  name: 'sustainabilityPoints',
                  type: 'number',
                  title: 'Sustainability Points',
                  description: 'Points for eco-friendly practices',
                  initialValue: 0,
                },
                {
                  name: 'mentorshipPoints',
                  type: 'number',
                  title: 'Youth Mentorship Points',
                  description: 'Points for mentoring young players',
                  initialValue: 0,
                },
                {
                  name: 'attendanceBonus',
                  type: 'number',
                  title: 'Fan Attendance Bonus',
                  description: 'Points for drawing crowds',
                  initialValue: 0,
                },
                {
                  name: 'mediaEngagementPoints',
                  type: 'number',
                  title: 'Media Engagement Points',
                  description: 'Points for press and media participation',
                  initialValue: 0,
                },
              ],
            },
            {
              name: 'totalPoints',
              type: 'object',
              title: 'Total Points Breakdown',
              fields: [
                {
                  name: 'matchPoints',
                  type: 'number',
                  title: 'Match Points',
                  initialValue: 0,
                  readOnly: true,
                },
                {
                  name: 'socialMediaPoints',
                  type: 'number',
                  title: 'Social Media Points',
                  initialValue: 0,
                  readOnly: true,
                },
                {
                  name: 'impactPoints',
                  type: 'number',
                  title: 'Impact Points',
                  initialValue: 0,
                  readOnly: true,
                },
                {
                  name: 'bonusPoints',
                  type: 'number',
                  title: 'Bonus Points',
                  description: 'Fair play, creativity, sustainability, etc.',
                  initialValue: 0,
                  readOnly: true,
                },
                {
                  name: 'grandTotal',
                  type: 'number',
                  title: 'Grand Total Points',
                  initialValue: 0,
                  readOnly: true,
                },
              ],
            },
            {
              name: 'streaks',
              type: 'object',
              title: 'Current Streaks',
              fields: [
                {
                  name: 'winStreak',
                  type: 'number',
                  title: 'Current Win Streak',
                  initialValue: 0,
                },
                {
                  name: 'unbeatenStreak',
                  type: 'number',
                  title: 'Current Unbeaten Streak',
                  initialValue: 0,
                },
                {
                  name: 'socialGrowthStreak',
                  type: 'number',
                  title: 'Social Growth Streak (weeks)',
                  initialValue: 0,
                },
                {
                  name: 'impactActivityStreak',
                  type: 'number',
                  title: 'Impact Activity Streak (weeks)',
                  initialValue: 0,
                },
              ],
            },
            {
              name: 'form',
              type: 'array',
              title: 'Recent Form (Last 5 Matches)',
              of: [
                {
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Win', value: 'W' },
                      { title: 'Draw', value: 'D' },
                      { title: 'Loss', value: 'L' },
                    ],
                  },
                },
              ],
              validation: (Rule) => Rule.max(5),
            },
            {
              name: 'achievements',
              type: 'array',
              title: 'Season Achievements',
              of: [
                {
                  type: 'object',
                  title: 'Achievement',
                  fields: [
                    {
                      name: 'type',
                      type: 'string',
                      title: 'Achievement Type',
                      options: {
                        list: [
                          { title: 'Most Goals Scored', value: 'most-goals' },
                          { title: 'Best Defense', value: 'best-defense' },
                          { title: 'Fair Play Award', value: 'fair-play' },
                          { title: 'Social Media Champions', value: 'social-media' },
                          { title: 'Impact Champions', value: 'impact' },
                          { title: 'Community Favorites', value: 'community' },
                          { title: 'Sustainability Leaders', value: 'sustainability' },
                          { title: 'Innovation Award', value: 'innovation' },
                          { title: 'Mentorship Excellence', value: 'mentorship' },
                          { title: 'Fan Engagement', value: 'fan-engagement' },
                        ],
                      },
                    },
                    {
                      name: 'title',
                      type: 'string',
                      title: 'Achievement Title',
                    },
                    {
                      name: 'description',
                      type: 'text',
                      title: 'Description',
                      rows: 2,
                    },
                    {
                      name: 'dateEarned',
                      type: 'date',
                      title: 'Date Earned',
                    },
                    {
                      name: 'icon',
                      type: 'string',
                      title: 'Achievement Icon',
                      options: {
                        list: [
                          { title: 'Trophy', value: '🏆' },
                          { title: 'Medal', value: '🏅' },
                          { title: 'Star', value: '⭐' },
                          { title: 'Fire', value: '🔥' },
                          { title: 'Lightning', value: '⚡' },
                          { title: 'Heart', value: '❤️' },
                          { title: 'Globe', value: '🌍' },
                          { title: 'Handshake', value: '🤝' },
                          { title: 'Rocket', value: '🚀' },
                          { title: 'Shield', value: '🛡️' },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'nextMatch',
              type: 'reference',
              title: 'Next Match',
              to: [{ type: 'match' }],
            },
            {
              name: 'positionChange',
              type: 'object',
              title: 'Position Change',
              fields: [
                {
                  name: 'lastPosition',
                  type: 'number',
                  title: 'Previous Position',
                },
                {
                  name: 'change',
                  type: 'number',
                  title: 'Position Change',
                  description: 'Positive = moved up, Negative = moved down',
                },
                {
                  name: 'trend',
                  type: 'string',
                  title: 'Trend',
                  options: {
                    list: [
                      { title: 'Rising', value: 'rising' },
                      { title: 'Falling', value: 'falling' },
                      { title: 'Stable', value: 'stable' },
                    ],
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              position: 'position',
              teamName: 'team.name',
              played: 'matchStats.played',
              won: 'matchStats.won',
              lost: 'matchStats.lost',
              totalPoints: 'totalPoints.grandTotal',
              impactPoints: 'totalPoints.impactPoints',
            },
            prepare({ position, teamName, played, won, lost, totalPoints, impactPoints }) {
              const record = `${played}P ${won}W ${lost}L`;
              const points = `${totalPoints || 0}pts (${impactPoints || 0} impact)`;
              
              return {
                title: `${position}. ${teamName || 'Unknown Team'}`,
                subtitle: `${record} • ${points}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'leagueStats',
      type: 'object',
      title: 'League-Wide Statistics',
      fields: [
        {
          name: 'totalMatches',
          type: 'number',
          title: 'Total Matches Played',
          initialValue: 0,
          readOnly: true,
        },
        {
          name: 'totalGoals',
          type: 'number',
          title: 'Total Goals Scored',
          initialValue: 0,
          readOnly: true,
        },
        {
          name: 'averageGoalsPerMatch',
          type: 'number',
          title: 'Average Goals Per Match',
          initialValue: 0,
          readOnly: true,
        },
        {
          name: 'totalSocialMediaGrowth',
          type: 'number',
          title: 'Total Social Media Growth',
          initialValue: 0,
          readOnly: true,
        },
        {
          name: 'totalImpactPoints',
          type: 'number',
          title: 'Total Impact Points Earned',
          initialValue: 0,
          readOnly: true,
        },
        {
          name: 'totalVolunteerHours',
          type: 'number',
          title: 'Total Volunteer Hours',
          initialValue: 0,
          readOnly: true,
        },
        {
          name: 'totalFundsRaised',
          type: 'number',
          title: 'Total Funds Raised ($)',
          initialValue: 0,
          readOnly: true,
        },
        {
          name: 'mostActiveSDG',
          type: 'string',
          title: 'Most Supported SDG Goal',
          readOnly: true,
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'weeklyHighlights',
      type: 'array',
      title: 'Weekly Highlights',
      of: [
        {
          type: 'object',
          title: 'Weekly Highlight',
          fields: [
            {
              name: 'week',
              type: 'string',
              title: 'Week',
            },
            {
              name: 'highlight',
              type: 'string',
              title: 'Highlight',
            },
            {
              name: 'team',
              type: 'reference',
              title: 'Featured Team',
              to: [{ type: 'team' }],
            },
            {
              name: 'category',
              type: 'string',
              title: 'Category',
              options: {
                list: [
                  { title: 'Match Performance', value: 'match' },
                  { title: 'Social Media', value: 'social' },
                  { title: 'Impact Activity', value: 'impact' },
                  { title: 'Community Engagement', value: 'community' },
                  { title: 'Innovation', value: 'innovation' },
                ],
              },
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      seasonName: 'season.name',
      lastUpdated: 'lastUpdated',
      teamCount: 'standings.length',
    },
    prepare({ seasonName, lastUpdated, teamCount }) {
      const date = lastUpdated ? new Date(lastUpdated).toLocaleDateString() : '';
      
      return {
        title: `${seasonName || 'Unknown Season'} Standings`,
        subtitle: `${teamCount || 0} teams • Updated: ${date}`,
      }
    },
  },
})