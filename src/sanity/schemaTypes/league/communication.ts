import { defineField, defineType } from 'sanity'

export const communication = defineType({
  name: 'communication',
  title: 'Team Communication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Message Title/Subject',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
      title: 'Message Content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Communication Type',
      options: {
        list: [
          { title: 'Team Chat Message', value: 'team-chat' },
          { title: 'Captain Update', value: 'captain-update' },
          { title: 'Coach Message', value: 'coach-message' },
          { title: 'Match Coordination', value: 'match-coordination' },
          { title: 'Impact Project Update', value: 'impact-update' },
          { title: 'Social Media Coordination', value: 'social-coordination' },
          { title: 'Training Schedule', value: 'training-schedule' },
          { title: 'League Announcement Response', value: 'announcement-response' },
          { title: 'Emergency Message', value: 'emergency' },
          { title: 'Celebration/Achievement', value: 'celebration' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sender',
      type: 'object',
      title: 'Sender',
      fields: [
        {
          name: 'senderType',
          type: 'string',
          title: 'Sender Type',
          options: {
            list: [
              { title: 'Player', value: 'player' },
              { title: 'Team Captain', value: 'captain' },
              { title: 'Coach', value: 'coach' },
              { title: 'League Admin', value: 'admin' },
              { title: 'System', value: 'system' },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'player',
          type: 'reference',
          title: 'Player',
          to: [{ type: 'player' }],
          hidden: ({ parent }) => parent?.senderType !== 'player' && parent?.senderType !== 'captain',
        },
        {
          name: 'adminName',
          type: 'string',
          title: 'Admin Name',
          hidden: ({ parent }) => parent?.senderType !== 'admin',
        },
      ],
    }),
    defineField({
      name: 'recipients',
      type: 'object',
      title: 'Recipients',
      fields: [
        {
          name: 'scope',
          type: 'string',
          title: 'Message Scope',
          options: {
            list: [
              { title: 'Team Only', value: 'team' },
              { title: 'Team + Coaches', value: 'team-coaches' },
              { title: 'Leadership Only', value: 'leadership' },
              { title: 'Specific Players', value: 'specific' },
              { title: 'All Teams in Season', value: 'season' },
              { title: 'League-Wide', value: 'league' },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'team',
          type: 'reference',
          title: 'Team',
          to: [{ type: 'team' }],
          hidden: ({ parent }) => !['team', 'team-coaches', 'leadership'].includes(parent?.scope),
        },
        {
          name: 'specificPlayers',
          type: 'array',
          title: 'Specific Players',
          of: [{ type: 'reference', to: [{ type: 'player' }] }],
          hidden: ({ parent }) => parent?.scope !== 'specific',
        },
        {
          name: 'season',
          type: 'reference',
          title: 'Season',
          to: [{ type: 'season' }],
          hidden: ({ parent }) => parent?.scope !== 'season',
        },
      ],
    }),
    defineField({
      name: 'thread',
      type: 'object',
      title: 'Thread Information',
      fields: [
        {
          name: 'isReply',
          type: 'boolean',
          title: 'Is Reply to Another Message',
          initialValue: false,
        },
        {
          name: 'parentMessage',
          type: 'reference',
          title: 'Parent Message',
          to: [{ type: 'communication' }],
          hidden: ({ parent }) => !parent?.isReply,
        },
        {
          name: 'threadId',
          type: 'string',
          title: 'Thread ID',
          description: 'Groups related messages together',
        },
      ],
    }),
    defineField({
      name: 'priority',
      type: 'string',
      title: 'Message Priority',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Normal', value: 'normal' },
          { title: 'High', value: 'high' },
          { title: 'Urgent', value: 'urgent' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'relatedContent',
      type: 'object',
      title: 'Related Content',
      fields: [
        {
          name: 'match',
          type: 'reference',
          title: 'Related Match',
          to: [{ type: 'match' }],
        },
        {
          name: 'impactProject',
          type: 'object',
          title: 'Impact Project Reference',
          fields: [
            {
              name: 'projectName',
              type: 'string',
              title: 'Project Name',
            },
            {
              name: 'sdgGoal',
              type: 'string',
              title: 'SDG Goal',
            },
            {
              name: 'status',
              type: 'string',
              title: 'Project Status',
              options: {
                list: [
                  { title: 'Planning', value: 'planning' },
                  { title: 'In Progress', value: 'in-progress' },
                  { title: 'Completed', value: 'completed' },
                  { title: 'Needs Help', value: 'needs-help' },
                ],
              },
            },
          ],
        },
        {
          name: 'socialMediaContent',
          type: 'object',
          title: 'Social Media Content',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Facebook', value: 'facebook' },
                ],
              },
            },
            {
              name: 'contentType',
              type: 'string',
              title: 'Content Type',
              options: {
                list: [
                  { title: 'Match Highlights', value: 'match-highlights' },
                  { title: 'Training Content', value: 'training' },
                  { title: 'Impact Story', value: 'impact-story' },
                  { title: 'Behind the Scenes', value: 'bts' },
                  { title: 'Player Spotlight', value: 'player-spotlight' },
                ],
              },
            },
            {
              name: 'scheduledPost',
              type: 'datetime',
              title: 'Scheduled Post Time',
            },
          ],
        },
        {
          name: 'attachments',
          type: 'array',
          title: 'Attachments',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'file',
                  type: 'file',
                  title: 'File',
                },
                {
                  name: 'image',
                  type: 'image',
                  title: 'Image',
                },
                {
                  name: 'description',
                  type: 'string',
                  title: 'Description',
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'interaction',
      type: 'object',
      title: 'Message Interactions',
      fields: [
        {
          name: 'requiresResponse',
          type: 'boolean',
          title: 'Requires Response',
          initialValue: false,
        },
        {
          name: 'responseDeadline',
          type: 'datetime',
          title: 'Response Deadline',
          hidden: ({ parent }) => !parent?.requiresResponse,
        },
        {
          name: 'pollOptions',
          type: 'array',
          title: 'Poll Options',
          description: 'Create a poll for team decisions',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'option',
                  type: 'string',
                  title: 'Option Text',
                },
                {
                  name: 'votes',
                  type: 'number',
                  title: 'Vote Count',
                  initialValue: 0,
                  readOnly: true,
                },
              ],
            },
          ],
        },
        {
          name: 'actions',
          type: 'array',
          title: 'Quick Actions',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  type: 'string',
                  title: 'Action Label',
                },
                {
                  name: 'action',
                  type: 'string',
                  title: 'Action Type',
                  options: {
                    list: [
                      { title: 'Confirm Attendance', value: 'confirm-attendance' },
                      { title: 'Join Activity', value: 'join-activity' },
                      { title: 'Share Content', value: 'share-content' },
                      { title: 'View Details', value: 'view-details' },
                      { title: 'Add to Calendar', value: 'add-calendar' },
                    ],
                  },
                },
                {
                  name: 'url',
                  type: 'string',
                  title: 'Action URL',
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'visibility',
      type: 'object',
      title: 'Message Visibility',
      fields: [
        {
          name: 'isPublic',
          type: 'boolean',
          title: 'Public Message',
          description: 'Can be shared outside the team',
          initialValue: false,
        },
        {
          name: 'isPinned',
          type: 'boolean',
          title: 'Pin Message',
          description: 'Pin to top of team chat',
          initialValue: false,
        },
        {
          name: 'expiresAt',
          type: 'datetime',
          title: 'Message Expires',
          description: 'Auto-delete message after this date',
        },
        {
          name: 'readBy',
          type: 'array',
          title: 'Read By',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'player',
                  type: 'reference',
                  title: 'Player',
                  to: [{ type: 'player' }],
                },
                {
                  name: 'readAt',
                  type: 'datetime',
                  title: 'Read At',
                },
              ],
            },
          ],
          readOnly: true,
        },
      ],
    }),
    defineField({
      name: 'reactions',
      type: 'array',
      title: 'Message Reactions',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'emoji',
              type: 'string',
              title: 'Emoji',
              options: {
                list: [
                  { title: '⚽ Soccer', value: '⚽' },
                  { title: '🔥 Fire', value: '🔥' },
                  { title: '💪 Strong', value: '💪' },
                  { title: '❤️ Love', value: '❤️' },
                  { title: '🏆 Trophy', value: '🏆' },
                  { title: '⭐ Star', value: '⭐' },
                  { title: '💫 Spark', value: '💫' },
                  { title: '👏 Clap', value: '👏' },
                  { title: '🎯 Target', value: '🎯' },
                  { title: '⚡ Lightning', value: '⚡' },
                ],
              },
            },
            {
              name: 'players',
              type: 'array',
              title: 'Reacted Players',
              of: [{ type: 'reference', to: [{ type: 'player' }] }],
            },
            {
              name: 'count',
              type: 'number',
              title: 'Reaction Count',
              initialValue: 0,
            },
          ],
        },
      ],
      readOnly: true,
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Message Status',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Sent', value: 'sent' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Read', value: 'read' },
          { title: 'Archived', value: 'archived' },
          { title: 'Deleted', value: 'deleted' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'metadata',
      type: 'object',
      title: 'Message Metadata',
      readOnly: true,
      fields: [
        {
          name: 'sentAt',
          type: 'datetime',
          title: 'Sent At',
        },
        {
          name: 'deliveredAt',
          type: 'datetime',
          title: 'Delivered At',
        },
        {
          name: 'readReceipts',
          type: 'number',
          title: 'Read Receipts',
          description: 'Number of recipients who read the message',
        },
        {
          name: 'responseCount',
          type: 'number',
          title: 'Response Count',
          description: 'Number of replies to this message',
        },
        {
          name: 'engagementScore',
          type: 'number',
          title: 'Engagement Score',
          description: 'Based on reactions, replies, and actions taken',
        },
      ],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  orderings: [
    {
      title: 'Latest Messages',
      name: 'latest',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'By Priority',
      name: 'priority',
      by: [
        { field: 'priority', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
    {
      title: 'By Team',
      name: 'team',
      by: [
        { field: 'recipients.team', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      senderType: 'sender.senderType',
      senderName: 'sender.player.name',
      teamName: 'recipients.team.name',
      priority: 'priority',
      status: 'status',
    },
    prepare({ title, type, senderType, senderName, teamName, priority, status }) {
      const typeEmojis = {
        'team-chat': '💬',
        'captain-update': '🎯',
        'coach-message': '📋',
        'match-coordination': '⚽',
        'impact-update': '💫',
        'social-coordination': '📱',
        'training-schedule': '🏃',
        'announcement-response': '📢',
        'emergency': '🚨',
        'celebration': '🎉',
      };

      const priorityEmojis = {
        urgent: '🚨',
        high: '❗',
        normal: '',
        low: '',
      };

      const statusEmojis = {
        draft: '✏️',
        sent: '📤',
        delivered: '✅',
        read: '👁️',
        archived: '📦',
        deleted: '🗑️',
      };

      const sender = senderName || senderType;
      const subtitle = [
        statusEmojis[status as keyof typeof statusEmojis],
        `${sender} → ${teamName || 'Multiple recipients'}`,
        priorityEmojis[priority as keyof typeof priorityEmojis],
      ]
        .filter(Boolean)
        .join(' ');

      return {
        title: `${typeEmojis[type as keyof typeof typeEmojis] || '💬'} ${title}`,
        subtitle,
      };
    },
  },
})