import { defineField, defineType } from 'sanity'
import { stylingSectionSchema, typographySectionSchema } from '../shared/styling'

export const pricingSection = defineType({
  name: 'pricingSection',
  title: 'Pricing Section',
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
      title: 'Pricing Layout',
      options: {
        list: [
          { title: 'Cards Grid', value: 'cards' },
          { title: 'Table Format', value: 'table' },
          { title: 'Feature Comparison', value: 'comparison' },
          { title: 'Simple List', value: 'list' },
        ],
      },
      initialValue: 'cards',
    }),
    defineField({
      name: 'pricingPlans',
      type: 'array',
      title: 'Pricing Plans',
      of: [
        {
          type: 'object',
          title: 'Pricing Plan',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Plan Name',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Plan Description',
              rows: 2,
            },
            {
              name: 'price',
              type: 'object',
              title: 'Pricing',
              fields: [
                {
                  name: 'amount',
                  type: 'number',
                  title: 'Price Amount',
                  validation: (Rule) => Rule.min(0),
                },
                {
                  name: 'currency',
                  type: 'string',
                  title: 'Currency',
                  options: {
                    list: [
                      { title: 'USD ($)', value: 'USD' },
                      { title: 'EUR (€)', value: 'EUR' },
                      { title: 'GBP (£)', value: 'GBP' },
                      { title: 'CAD (C$)', value: 'CAD' },
                    ],
                  },
                  initialValue: 'USD',
                },
                {
                  name: 'period',
                  type: 'string',
                  title: 'Billing Period',
                  options: {
                    list: [
                      { title: 'One-time', value: 'one-time' },
                      { title: 'Per Season', value: 'season' },
                      { title: 'Per Month', value: 'month' },
                      { title: 'Per Year', value: 'year' },
                      { title: 'Per Game', value: 'game' },
                    ],
                  },
                  initialValue: 'season',
                },
                {
                  name: 'originalPrice',
                  type: 'number',
                  title: 'Original Price (for discounts)',
                  description: 'Show strikethrough price',
                },
              ],
            },
            {
              name: 'features',
              type: 'array',
              title: 'Plan Features',
              of: [
                {
                  type: 'object',
                  title: 'Feature',
                  fields: [
                    {
                      name: 'text',
                      type: 'string',
                      title: 'Feature Text',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'included',
                      type: 'boolean',
                      title: 'Feature Included',
                      initialValue: true,
                    },
                    {
                      name: 'highlight',
                      type: 'boolean',
                      title: 'Highlight Feature',
                      description: 'Make this feature stand out',
                      initialValue: false,
                    },
                    {
                      name: 'tooltip',
                      type: 'text',
                      title: 'Feature Tooltip',
                      description: 'Additional explanation for this feature',
                      rows: 2,
                    },
                  ],
                  preview: {
                    select: {
                      text: 'text',
                      included: 'included',
                      highlight: 'highlight',
                    },
                    prepare({ text, included, highlight }) {
                      const prefix = included ? '✅' : '❌';
                      const suffix = highlight ? ' ⭐' : '';
                      return {
                        title: `${prefix} ${text}${suffix}`,
                      }
                    },
                  },
                },
              ],
            },
            {
              name: 'featured',
              type: 'boolean',
              title: 'Featured Plan',
              description: 'Highlight this as the recommended plan',
              initialValue: false,
            },
            {
              name: 'badge',
              type: 'string',
              title: 'Plan Badge',
              description: 'Optional badge text (e.g., "Most Popular", "Best Value")',
            },
            {
              name: 'cta',
              type: 'object',
              title: 'Call to Action',
              fields: [
                {
                  name: 'text',
                  type: 'string',
                  title: 'Button Text',
                  initialValue: 'Join Now',
                },
                {
                  name: 'url',
                  type: 'string',
                  title: 'Button URL',
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
                    ],
                  },
                  initialValue: 'primary',
                },
              ],
            },
            {
              name: 'additionalInfo',
              type: 'array',
              title: 'Additional Information',
              description: 'Fine print, terms, or additional details',
              of: [{ type: 'string' }],
            },
          ],
          preview: {
            select: {
              name: 'name',
              amount: 'price.amount',
              currency: 'price.currency',
              period: 'price.period',
              featured: 'featured',
            },
            prepare({ name, amount, currency, period, featured }) {
              const price = amount ? `${currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency + ' '}${amount}` : 'Free';
              const periodText = period ? `/${period}` : '';
              return {
                title: name || 'Untitled Plan',
                subtitle: `${price}${periodText}${featured ? ' ⭐' : ''}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'faq',
      type: 'object',
      title: 'Pricing FAQ',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Pricing FAQ',
          initialValue: false,
        },
        {
          name: 'title',
          type: 'string',
          title: 'FAQ Title',
          initialValue: 'Frequently Asked Questions',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'questions',
          type: 'array',
          title: 'FAQ Questions',
          of: [
            {
              type: 'object',
              title: 'FAQ Item',
              fields: [
                {
                  name: 'question',
                  type: 'string',
                  title: 'Question',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'answer',
                  type: 'blockContent',
                  title: 'Answer',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'guarantees',
      type: 'array',
      title: 'Money-Back Guarantees',
      description: 'Trust signals and guarantees',
      of: [
        {
          type: 'object',
          title: 'Guarantee',
          fields: [
            {
              name: 'icon',
              type: 'string',
              title: 'Guarantee Icon',
              options: {
                list: [
                  { title: 'Money Back', value: '💰' },
                  { title: 'Shield/Security', value: '🛡️' },
                  { title: 'Clock/Time', value: '⏰' },
                  { title: 'Check/Quality', value: '✅' },
                  { title: 'Heart/Satisfaction', value: '❤️' },
                ],
              },
            },
            {
              name: 'title',
              type: 'string',
              title: 'Guarantee Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Guarantee Description',
              rows: 2,
            },
          ],
        },
      ],
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
      planCount: 'pricingPlans.length',
    },
    prepare({ title, layout, planCount }) {
      return {
        title: title || 'Pricing Section',
        subtitle: `${layout || 'cards'} layout • ${planCount || 0} plans`,
      }
    },
  },
})