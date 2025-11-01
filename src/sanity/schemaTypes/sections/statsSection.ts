import { defineField, defineType } from 'sanity'

export const statsSection = defineType({
  name: 'statsSection',
  title: 'Statistics & Impact Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      initialValue: 'Our Impact',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Section Description',
      rows: 3,
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout Style',
      options: {
        list: [
          { title: '4-Column Grid', value: 'grid-4' },
          { title: '3-Column Grid', value: 'grid-3' },
          { title: '2-Column Grid', value: 'grid-2' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Split Layout', value: 'split' },
          { title: 'Timeline', value: 'timeline' },
        ],
      },
      initialValue: 'grid-4',
    }),
    defineField({
      name: 'stats',
      type: 'array',
      title: 'Statistics',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              type: 'string',
              title: 'Number/Value',
              description: 'e.g., "1,000+" or "£50K" or "100%"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              description: 'What this number represents',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              description: 'Additional context (optional)',
              rows: 2,
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon Type',
              options: {
                list: [
                  { title: 'None', value: 'none' },
                  { title: 'Players', value: 'players' },
                  { title: 'Money Raised', value: 'money' },
                  { title: 'Games Played', value: 'games' },
                  { title: 'Communities', value: 'communities' },
                  { title: 'Impact', value: 'impact' },
                  { title: 'Growth', value: 'growth' },
                  { title: 'Trophy', value: 'trophy' },
                  { title: 'Heart', value: 'heart' },
                  { title: 'Star', value: 'star' },
                  { title: 'Lightning', value: 'lightning' },
                  { title: 'Spark Logo', value: 'spark' },
                ],
              },
              initialValue: 'none',
            },
            {
              name: 'color',
              type: 'string',
              title: 'Accent Color',
              options: {
                list: [
                  { title: 'Volt Yellow', value: 'volt' },
                  { title: 'Black', value: 'black' },
                  { title: 'White', value: 'white' },
                  { title: 'Auto', value: 'auto' },
                ],
              },
              initialValue: 'volt',
            },
            {
              name: 'animation',
              type: 'string',
              title: 'Number Animation',
              options: {
                list: [
                  { title: 'Count Up', value: 'count-up' },
                  { title: 'Fade In', value: 'fade' },
                  { title: 'Scale In', value: 'scale' },
                  { title: 'None', value: 'none' },
                ],
              },
              initialValue: 'count-up',
            },
          ],
          preview: {
            select: {
              title: 'number',
              subtitle: 'label',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Statistic',
                subtitle: subtitle || 'Label',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(8),
    }),
    defineField({
      name: 'showSparkLogos',
      type: 'boolean',
      title: 'Show Spark Logos as Decorative Elements',
      description: 'Add small Spark logos as visual accents',
      initialValue: true,
    }),
    defineField({
      name: 'testimonialQuote',
      type: 'object',
      title: 'Featured Quote',
      description: 'Optional quote to accompany statistics',
      fields: [
        {
          name: 'text',
          type: 'text',
          title: 'Quote',
          rows: 3,
        },
        {
          name: 'author',
          type: 'string',
          title: 'Author',
        },
        {
          name: 'role',
          type: 'string',
          title: 'Author Role',
        },
        {
          name: 'photo',
          type: 'image',
          title: 'Author Photo',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'ctaSection',
      type: 'object',
      title: 'Call to Action',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'CTA Title',
        },
        {
          name: 'description',
          type: 'text',
          title: 'CTA Description',
          rows: 2,
        },
        {
          name: 'buttonText',
          type: 'string',
          title: 'Button Text',
        },
        {
          name: 'buttonUrl',
          type: 'url',
          title: 'Button URL',
        },
        {
          name: 'style',
          type: 'string',
          title: 'CTA Style',
          options: {
            list: [
              { title: 'Inline with Stats', value: 'inline' },
              { title: 'Separate Section Below', value: 'separate' },
              { title: 'Overlay on Background', value: 'overlay' },
            ],
          },
          initialValue: 'separate',
        },
      ],
    }),
    defineField({
      name: 'styling',
      type: 'object',
      title: 'Section Styling',
      fields: [
        {
          name: 'backgroundColor',
          type: 'string',
          title: 'Background Color',
          options: {
            list: [
              { title: 'White', value: 'white' },
              { title: 'Off White', value: 'off-white' },
              { title: 'Black', value: 'black' },
              { title: 'Volt Yellow', value: 'volt' },
              { title: 'Gradient (Brand)', value: 'gradient' },
            ],
          },
          initialValue: 'off-white',
        },
        {
          name: 'spacing',
          type: 'string',
          title: 'Section Spacing',
          options: {
            list: [
              { title: 'Compact', value: 'compact' },
              { title: 'Normal', value: 'normal' },
              { title: 'Spacious', value: 'spacious' },
            ],
          },
          initialValue: 'normal',
        },
        {
          name: 'borderStyle',
          type: 'string',
          title: 'Border Style',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Top Border', value: 'top' },
              { title: 'Bottom Border', value: 'bottom' },
              { title: 'Full Border', value: 'full' },
              { title: 'Volt Accent', value: 'volt-accent' },
            ],
          },
          initialValue: 'none',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      statsCount: 'stats.length',
      layout: 'layout',
    },
    prepare({ title, statsCount, layout }) {
      return {
        title: title || 'Statistics Section',
        subtitle: `${statsCount || 0} stats • Layout: ${layout || 'grid-4'}`,
      }
    },
  },
})