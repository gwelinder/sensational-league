import { defineField, defineType } from 'sanity'
import { stylingSectionSchema, typographySectionSchema } from '../shared/styling'

export const timelineSection = defineType({
  name: 'timelineSection',
  title: 'Timeline Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Section Subtitle',
      rows: 2,
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Timeline Layout',
      options: {
        list: [
          { title: 'Vertical Timeline', value: 'vertical' },
          { title: 'Horizontal Timeline', value: 'horizontal' },
          { title: 'Zigzag Timeline', value: 'zigzag' },
          { title: 'Minimal Timeline', value: 'minimal' },
        ],
      },
      initialValue: 'vertical',
    }),
    defineField({
      name: 'timelineType',
      type: 'string',
      title: 'Timeline Type',
      options: {
        list: [
          { title: 'Historical Events', value: 'history' },
          { title: 'Process Steps', value: 'process' },
          { title: 'Season Schedule', value: 'schedule' },
          { title: 'Roadmap/Future', value: 'roadmap' },
          { title: 'Achievement Milestones', value: 'milestones' },
        ],
      },
      initialValue: 'history',
    }),
    defineField({
      name: 'events',
      type: 'array',
      title: 'Timeline Events',
      of: [
        {
          type: 'object',
          title: 'Timeline Event',
          fields: [
            {
              name: 'date',
              type: 'datetime',
              title: 'Event Date',
              description: 'When this event occurred or will occur',
            },
            {
              name: 'displayDate',
              type: 'string',
              title: 'Display Date',
              description: 'Custom date text (e.g., "Spring 2024", "Coming Soon")',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Event Title',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'blockContent',
              title: 'Event Description',
            },
            {
              name: 'category',
              type: 'string',
              title: 'Event Category',
              options: {
                list: [
                  { title: 'League Milestone', value: 'league' },
                  { title: 'Season Event', value: 'season' },
                  { title: 'Community Impact', value: 'impact' },
                  { title: 'Partnership', value: 'partnership' },
                  { title: 'Achievement', value: 'achievement' },
                  { title: 'Registration', value: 'registration' },
                  { title: 'Competition', value: 'competition' },
                  { title: 'Development', value: 'development' },
                ],
              },
            },
            {
              name: 'status',
              type: 'string',
              title: 'Event Status',
              options: {
                list: [
                  { title: 'Completed', value: 'completed' },
                  { title: 'In Progress', value: 'in-progress' },
                  { title: 'Upcoming', value: 'upcoming' },
                  { title: 'Planned', value: 'planned' },
                ],
              },
              initialValue: 'completed',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Event Image',
              options: { hotspot: true },
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Event Icon',
              options: {
                list: [
                  { title: 'Trophy', value: '🏆' },
                  { title: 'Football', value: '⚽' },
                  { title: 'Star', value: '⭐' },
                  { title: 'Target', value: '🎯' },
                  { title: 'Rocket', value: '🚀' },
                  { title: 'Heart', value: '❤️' },
                  { title: 'Lightning', value: '⚡' },
                  { title: 'Globe', value: '🌍' },
                  { title: 'Calendar', value: '📅' },
                  { title: 'Megaphone', value: '📢' },
                  { title: 'Handshake', value: '🤝' },
                  { title: 'Medal', value: '🏅' },
                ],
              },
              initialValue: '⚡',
            },
            {
              name: 'featured',
              type: 'boolean',
              title: 'Featured Event',
              description: 'Highlight this event with special styling',
              initialValue: false,
            },
            {
              name: 'link',
              type: 'object',
              title: 'Related Link',
              fields: [
                {
                  name: 'text',
                  type: 'string',
                  title: 'Link Text',
                },
                {
                  name: 'url',
                  type: 'string',
                  title: 'Link URL',
                },
                {
                  name: 'external',
                  type: 'boolean',
                  title: 'External Link',
                  initialValue: false,
                },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              title: 'Event Statistics',
              description: 'Key numbers related to this event',
              of: [
                {
                  type: 'object',
                  title: 'Statistic',
                  fields: [
                    {
                      name: 'label',
                      type: 'string',
                      title: 'Stat Label',
                    },
                    {
                      name: 'value',
                      type: 'string',
                      title: 'Stat Value',
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date',
              displayDate: 'displayDate',
              status: 'status',
              icon: 'icon',
              image: 'image',
            },
            prepare({ title, date, displayDate, status, icon, image }) {
              const dateStr = displayDate || (date ? new Date(date).toLocaleDateString() : '');
              return {
                title: title || 'Untitled Event',
                subtitle: `${icon || '⚡'} ${dateStr} • ${status || 'completed'}`,
                media: image,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'showProgress',
      type: 'boolean',
      title: 'Show Progress Indicator',
      description: 'Display completion progress for process timelines',
      initialValue: false,
    }),
    defineField({
      name: 'colorScheme',
      type: 'string',
      title: 'Color Scheme',
      options: {
        list: [
          { title: 'Brand Colors', value: 'brand' },
          { title: 'Monochrome', value: 'mono' },
          { title: 'Gradient', value: 'gradient' },
          { title: 'Category Colors', value: 'category' },
        ],
      },
      initialValue: 'brand',
    }),
    stylingSectionSchema,
    typographySectionSchema,
    defineField({
      name: 'sectionId',
      type: 'slug',
      title: 'Section ID (for navigation)',
      description: 'Used for anchor links and navigation',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      timelineType: 'timelineType',
      eventCount: 'events.length',
    },
    prepare({ title, layout, timelineType, eventCount }) {
      return {
        title: title || 'Timeline Section',
        subtitle: `${layout || 'vertical'} ${timelineType || 'history'} • ${eventCount || 0} events`,
      }
    },
  },
})