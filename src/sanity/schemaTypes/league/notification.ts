import { defineField, defineType } from 'sanity'

export const notification = defineType({
  name: 'notification',
  title: 'Notification',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Notification Title',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'message',
      type: 'text',
      title: 'Message',
      rows: 3,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Notification Type',
      options: {
        list: [
          { title: 'Match Reminder', value: 'match-reminder' },
          { title: 'Match Result', value: 'match-result' },
          { title: 'Social Media Milestone', value: 'social-milestone' },
          { title: 'Impact Activity Alert', value: 'impact-alert' },
          { title: 'League Announcement', value: 'announcement' },
          { title: 'Team News', value: 'team-news' },
          { title: 'Achievement Unlock', value: 'achievement' },
          { title: 'Season Update', value: 'season-update' },
          { title: 'Training Reminder', value: 'training' },
          { title: 'Event Invitation', value: 'event' },
          { title: 'System Alert', value: 'system' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priority',
      type: 'string',
      title: 'Priority Level',
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
      name: 'recipients',
      type: 'object',
      title: 'Recipients',
      fields: [
        {
          name: 'targetType',
          type: 'string',
          title: 'Send To',
          options: {
            list: [
              { title: 'All Users', value: 'all' },
              { title: 'Specific Teams', value: 'teams' },
              { title: 'Specific Players', value: 'players' },
              { title: 'League Admins', value: 'admins' },
              { title: 'Team Captains', value: 'captains' },
              { title: 'Active Players Only', value: 'active-players' },
              { title: 'Season Participants', value: 'season-participants' },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'teams',
          type: 'array',
          title: 'Specific Teams',
          of: [{ type: 'reference', to: [{ type: 'team' }] }],
          hidden: ({ parent }) => parent?.targetType !== 'teams',
        },
        {
          name: 'players',
          type: 'array',
          title: 'Specific Players',
          of: [{ type: 'reference', to: [{ type: 'player' }] }],
          hidden: ({ parent }) => parent?.targetType !== 'players',
        },
        {
          name: 'season',
          type: 'reference',
          title: 'Season',
          to: [{ type: 'season' }],
          hidden: ({ parent }) => parent?.targetType !== 'season-participants',
        },
      ],
    }),
    defineField({
      name: 'channels',
      type: 'array',
      title: 'Notification Channels',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'In-App Notification', value: 'in-app' },
              { title: 'Push Notification', value: 'push' },
              { title: 'Email', value: 'email' },
              { title: 'SMS', value: 'sms' },
              { title: 'Team WhatsApp', value: 'whatsapp' },
              { title: 'Social Media Post', value: 'social' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'scheduling',
      type: 'object',
      title: 'Scheduling',
      fields: [
        {
          name: 'sendNow',
          type: 'boolean',
          title: 'Send Immediately',
          initialValue: true,
        },
        {
          name: 'scheduledTime',
          type: 'datetime',
          title: 'Scheduled Send Time',
          hidden: ({ parent }) => parent?.sendNow,
        },
        {
          name: 'recurring',
          type: 'boolean',
          title: 'Recurring Notification',
          initialValue: false,
        },
        {
          name: 'recurrencePattern',
          type: 'string',
          title: 'Recurrence Pattern',
          options: {
            list: [
              { title: 'Daily', value: 'daily' },
              { title: 'Weekly', value: 'weekly' },
              { title: 'Match Days', value: 'match-days' },
              { title: 'Training Days', value: 'training-days' },
              { title: 'Monthly', value: 'monthly' },
            ],
          },
          hidden: ({ parent }) => !parent?.recurring,
        },
      ],
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
          name: 'team',
          type: 'reference',
          title: 'Related Team',
          to: [{ type: 'team' }],
        },
        {
          name: 'player',
          type: 'reference',
          title: 'Related Player',
          to: [{ type: 'player' }],
        },
        {
          name: 'season',
          type: 'reference',
          title: 'Related Season',
          to: [{ type: 'season' }],
        },
        {
          name: 'actionUrl',
          type: 'string',
          title: 'Action URL',
          description: 'Deep link or URL for notification action',
        },
        {
          name: 'actionText',
          type: 'string',
          title: 'Action Button Text',
          description: 'Text for action button (e.g., "View Match", "Check Stats")',
        },
      ],
    }),
    defineField({
      name: 'customization',
      type: 'object',
      title: 'Customization',
      fields: [
        {
          name: 'icon',
          type: 'string',
          title: 'Notification Icon',
          options: {
            list: [
              { title: 'Soccer Ball ⚽', value: '⚽' },
              { title: 'Trophy 🏆', value: '🏆' },
              { title: 'Fire 🔥', value: '🔥' },
              { title: 'Star ⭐', value: '⭐' },
              { title: 'Lightning ⚡', value: '⚡' },
              { title: 'Heart ❤️', value: '❤️' },
              { title: 'Megaphone 📢', value: '📢' },
              { title: 'Bell 🔔', value: '🔔' },
              { title: 'Spark 💫', value: '💫' },
              { title: 'Clock ⏰', value: '⏰' },
            ],
          },
        },
        {
          name: 'color',
          type: 'string',
          title: 'Theme Color',
          options: {
            list: [
              { title: 'Volt Yellow', value: 'volt' },
              { title: 'Black', value: 'black' },
              { title: 'Orange', value: 'orange' },
              { title: 'Purple', value: 'purple' },
              { title: 'Cyan', value: 'cyan' },
              { title: 'Success Green', value: 'green' },
              { title: 'Warning Red', value: 'red' },
            ],
          },
          initialValue: 'volt',
        },
        {
          name: 'sound',
          type: 'string',
          title: 'Notification Sound',
          options: {
            list: [
              { title: 'Default', value: 'default' },
              { title: 'Goal Horn', value: 'goal-horn' },
              { title: 'Whistle', value: 'whistle' },
              { title: 'Chime', value: 'chime' },
              { title: 'Volt Buzz', value: 'volt-buzz' },
              { title: 'Silent', value: 'silent' },
            ],
          },
          initialValue: 'default',
        },
      ],
    }),
    defineField({
      name: 'automationTriggers',
      type: 'object',
      title: 'Automation Triggers',
      description: 'Automatic notification triggers based on events',
      fields: [
        {
          name: 'matchReminder',
          type: 'object',
          title: 'Match Reminder Settings',
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enable Match Reminders',
              initialValue: false,
            },
            {
              name: 'timeBefore',
              type: 'number',
              title: 'Hours Before Match',
              description: 'Send reminder X hours before match',
              validation: (Rule) => Rule.min(1).max(168),
              initialValue: 24,
            },
          ],
        },
        {
          name: 'socialMilestone',
          type: 'object',
          title: 'Social Media Milestone Alerts',
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enable Milestone Alerts',
              initialValue: false,
            },
            {
              name: 'followerThresholds',
              type: 'array',
              title: 'Follower Milestones',
              of: [{ type: 'number' }],
              description: 'Alert when team reaches these follower counts',
            },
            {
              name: 'viralThreshold',
              type: 'number',
              title: 'Viral Post Threshold',
              description: 'Alert when post reaches this many interactions',
              initialValue: 10000,
            },
          ],
        },
        {
          name: 'achievementUnlock',
          type: 'object',
          title: 'Achievement Notifications',
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enable Achievement Alerts',
              initialValue: true,
            },
            {
              name: 'celebrateAchievements',
              type: 'boolean',
              title: 'Celebrate Team Achievements',
              description: 'Send congratulatory messages for team milestones',
              initialValue: true,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Scheduled', value: 'scheduled' },
          { title: 'Sent', value: 'sent' },
          { title: 'Failed', value: 'failed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'deliveryStats',
      type: 'object',
      title: 'Delivery Statistics',
      readOnly: true,
      fields: [
        {
          name: 'sentAt',
          type: 'datetime',
          title: 'Sent At',
        },
        {
          name: 'totalRecipients',
          type: 'number',
          title: 'Total Recipients',
        },
        {
          name: 'delivered',
          type: 'number',
          title: 'Successfully Delivered',
        },
        {
          name: 'opened',
          type: 'number',
          title: 'Opened/Read',
        },
        {
          name: 'clicked',
          type: 'number',
          title: 'Action Clicked',
        },
        {
          name: 'failed',
          type: 'number',
          title: 'Failed Deliveries',
        },
        {
          name: 'deliveryRate',
          type: 'number',
          title: 'Delivery Rate (%)',
        },
        {
          name: 'engagementRate',
          type: 'number',
          title: 'Engagement Rate (%)',
        },
      ],
    }),
    defineField({
      name: 'createdBy',
      type: 'string',
      title: 'Created By',
      initialValue: ({ currentUser }) => currentUser?.name || currentUser?.email,
      readOnly: true,
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
      title: 'Created Date (Newest)',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Priority',
      name: 'priority',
      by: [
        { field: 'priority', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
    {
      title: 'Send Time',
      name: 'scheduledTime',
      by: [{ field: 'scheduling.scheduledTime', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      priority: 'priority',
      status: 'status',
      icon: 'customization.icon',
      scheduledTime: 'scheduling.scheduledTime',
    },
    prepare({ title, type, priority, status, icon, scheduledTime }) {
      const priorityEmoji = {
        urgent: '🚨',
        high: '❗',
        normal: '📝',
        low: '💬',
      };

      const statusEmoji = {
        draft: '✏️',
        scheduled: '⏰',
        sent: '✅',
        failed: '❌',
        cancelled: '🚫',
      };

      const typeLabels = {
        'match-reminder': 'Match Reminder',
        'match-result': 'Match Result',
        'social-milestone': 'Social Milestone',
        'impact-alert': 'Impact Alert',
        'announcement': 'Announcement',
        'team-news': 'Team News',
        'achievement': 'Achievement',
        'season-update': 'Season Update',
        'training': 'Training',
        'event': 'Event',
        'system': 'System',
      };

      const subtitle = [
        statusEmoji[status as keyof typeof statusEmoji] || '',
        typeLabels[type as keyof typeof typeLabels] || type,
        priorityEmoji[priority as keyof typeof priorityEmoji] || '',
        scheduledTime ? `Scheduled: ${new Date(scheduledTime).toLocaleDateString()}` : '',
      ]
        .filter(Boolean)
        .join(' • ');

      return {
        title: `${icon || '📢'} ${title}`,
        subtitle,
        media: icon || '📢',
      };
    },
  },
})