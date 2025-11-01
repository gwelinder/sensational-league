import { defineField, defineType } from 'sanity'

// Reusable content blocks that can be used across multiple sections

export const callToActionBlock = defineType({
  name: 'callToActionBlock',
  title: 'Call to Action Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'CTA Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'CTA Description',
      rows: 2,
    }),
    defineField({
      name: 'buttons',
      type: 'array',
      title: 'Action Buttons',
      of: [
        {
          type: 'object',
          title: 'Button',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              type: 'string',
              title: 'Button URL',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'style',
              type: 'string',
              title: 'Button Style',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Ghost', value: 'ghost' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
              initialValue: 'primary',
            },
            {
              name: 'size',
              type: 'string',
              title: 'Button Size',
              options: {
                list: [
                  { title: 'Small', value: 'sm' },
                  { title: 'Medium', value: 'md' },
                  { title: 'Large', value: 'lg' },
                  { title: 'Extra Large', value: 'xl' },
                ],
              },
              initialValue: 'md',
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Button Icon',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Arrow Right', value: 'arrow-right' },
                  { title: 'Download', value: 'download' },
                  { title: 'Play', value: 'play' },
                  { title: 'External Link', value: 'external' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'phone' },
                ],
              },
            },
            {
              name: 'external',
              type: 'boolean',
              title: 'External Link',
              description: 'Opens in new tab',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              text: 'text',
              style: 'style',
              url: 'url',
            },
            prepare({ text, style, url }) {
              return {
                title: text || 'Button',
                subtitle: `${style || 'primary'} • ${url || 'No URL'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'backgroundStyle',
      type: 'string',
      title: 'Background Style',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Gradient', value: 'gradient' },
          { title: 'Solid Color', value: 'solid' },
          { title: 'Pattern', value: 'pattern' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      buttonCount: 'buttons.length',
    },
    prepare({ title, buttonCount }) {
      return {
        title: title || 'Call to Action Block',
        subtitle: `${buttonCount || 0} buttons`,
      }
    },
  },
})

export const statisticsBlock = defineType({
  name: 'statisticsBlock',
  title: 'Statistics Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Statistics Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Statistics Description',
      rows: 2,
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Statistics Layout',
      options: {
        list: [
          { title: 'Horizontal Row', value: 'horizontal' },
          { title: 'Grid Layout', value: 'grid' },
          { title: 'Vertical Stack', value: 'vertical' },
          { title: 'Circular Stats', value: 'circular' },
        ],
      },
      initialValue: 'horizontal',
    }),
    defineField({
      name: 'statistics',
      type: 'array',
      title: 'Statistics',
      of: [
        {
          type: 'object',
          title: 'Statistic',
          fields: [
            {
              name: 'number',
              type: 'string',
              title: 'Number/Value',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 2,
            },
            {
              name: 'suffix',
              type: 'string',
              title: 'Suffix',
              description: 'e.g., %, +, k, M',
            },
            {
              name: 'prefix',
              type: 'string',
              title: 'Prefix',
              description: 'e.g., $, #, ~',
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Trophy', value: '🏆' },
                  { title: 'Target', value: '🎯' },
                  { title: 'Heart', value: '❤️' },
                  { title: 'Users', value: '👥' },
                  { title: 'Globe', value: '🌍' },
                  { title: 'Lightning', value: '⚡' },
                  { title: 'Star', value: '⭐' },
                  { title: 'Rocket', value: '🚀' },
                ],
              },
            },
            {
              name: 'color',
              type: 'string',
              title: 'Accent Color',
              options: {
                list: [
                  { title: 'Brand Yellow', value: 'yellow' },
                  { title: 'Brand Orange', value: 'orange' },
                  { title: 'Brand Purple', value: 'purple' },
                  { title: 'Brand Cyan', value: 'cyan' },
                  { title: 'Default', value: 'default' },
                ],
              },
              initialValue: 'default',
            },
          ],
          preview: {
            select: {
              number: 'number',
              label: 'label',
              suffix: 'suffix',
              prefix: 'prefix',
              icon: 'icon',
            },
            prepare({ number, label, suffix, prefix, icon }) {
              const value = `${prefix || ''}${number || '0'}${suffix || ''}`;
              return {
                title: label || 'Statistic',
                subtitle: `${icon || '📊'} ${value}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'animateNumbers',
      type: 'boolean',
      title: 'Animate Numbers',
      description: 'Count up animation on scroll',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      statCount: 'statistics.length',
    },
    prepare({ title, layout, statCount }) {
      return {
        title: title || 'Statistics Block',
        subtitle: `${layout || 'horizontal'} • ${statCount || 0} stats`,
      }
    },
  },
})

export const socialProofBlock = defineType({
  name: 'socialProofBlock',
  title: 'Social Proof Block',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Proof Type',
      options: {
        list: [
          { title: 'Customer Logos', value: 'logos' },
          { title: 'Testimonial Quote', value: 'testimonial' },
          { title: 'Trust Badges', value: 'badges' },
          { title: 'Social Media', value: 'social' },
          { title: 'Press Mentions', value: 'press' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
    }),
    defineField({
      name: 'logos',
      type: 'array',
      title: 'Partner/Customer Logos',
      of: [
        {
          type: 'object',
          title: 'Logo',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Logo Image',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'Website URL',
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'logos',
    }),
    defineField({
      name: 'testimonial',
      type: 'object',
      title: 'Featured Testimonial',
      fields: [
        {
          name: 'quote',
          type: 'text',
          title: 'Quote',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'authorName',
          type: 'string',
          title: 'Author Name',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'authorTitle',
          type: 'string',
          title: 'Author Title',
        },
        {
          name: 'authorImage',
          type: 'image',
          title: 'Author Photo',
          options: { hotspot: true },
        },
        {
          name: 'rating',
          type: 'number',
          title: 'Star Rating',
          validation: (Rule) => Rule.min(1).max(5),
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'testimonial',
    }),
    defineField({
      name: 'badges',
      type: 'array',
      title: 'Trust Badges',
      of: [
        {
          type: 'object',
          title: 'Badge',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Badge Image',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              type: 'string',
              title: 'Badge Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Badge Description',
              rows: 2,
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'badges',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
    },
    prepare({ title, type }) {
      return {
        title: title || 'Social Proof Block',
        subtitle: type || 'social proof',
      }
    },
  },
})

export const newsletterSignupBlock = defineType({
  name: 'newsletterSignupBlock',
  title: 'Newsletter Signup Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Signup Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Signup Description',
      rows: 2,
    }),
    defineField({
      name: 'placeholder',
      type: 'string',
      title: 'Email Placeholder',
      initialValue: 'Enter your email address',
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Button Text',
      initialValue: 'Subscribe',
    }),
    defineField({
      name: 'style',
      type: 'string',
      title: 'Signup Style',
      options: {
        list: [
          { title: 'Inline Form', value: 'inline' },
          { title: 'Stacked Form', value: 'stacked' },
          { title: 'Modal Popup', value: 'modal' },
          { title: 'Minimal', value: 'minimal' },
        ],
      },
      initialValue: 'inline',
    }),
    defineField({
      name: 'incentive',
      type: 'object',
      title: 'Signup Incentive',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Incentive',
          initialValue: false,
        },
        {
          name: 'text',
          type: 'string',
          title: 'Incentive Text',
          description: 'e.g., "Get 10% off your first order"',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'icon',
          type: 'string',
          title: 'Incentive Icon',
          options: {
            list: [
              { title: 'Gift', value: '🎁' },
              { title: 'Discount', value: '💰' },
              { title: 'Star', value: '⭐' },
              { title: 'Lightning', value: '⚡' },
            ],
          },
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    defineField({
      name: 'privacyNote',
      type: 'string',
      title: 'Privacy Note',
      description: 'Small text about privacy/unsubscribe',
      initialValue: 'We respect your privacy. Unsubscribe at any time.',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Newsletter Tags',
      description: 'Categories or topics this signup is for',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      style: 'style',
    },
    prepare({ title, style }) {
      return {
        title: title || 'Newsletter Signup',
        subtitle: style || 'inline',
      }
    },
  },
})