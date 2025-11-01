import { defineField, defineType } from 'sanity'
import { stylingSectionSchema, typographySectionSchema } from '../shared/styling'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
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
      title: 'Layout Style',
      options: {
        list: [
          { title: 'Single Column', value: 'single' },
          { title: 'Two Columns', value: 'two-column' },
          { title: 'Accordion Style', value: 'accordion' },
          { title: 'Tab Style', value: 'tabs' },
        ],
      },
      initialValue: 'accordion',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'FAQ Categories',
      description: 'Group FAQs by category for better organization',
      of: [
        {
          type: 'object',
          title: 'FAQ Category',
          fields: [
            {
              name: 'categoryName',
              type: 'string',
              title: 'Category Name',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Category Description',
              rows: 2,
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Category Icon',
              options: {
                list: [
                  { title: 'General Questions', value: '❓' },
                  { title: 'Getting Started', value: '🚀' },
                  { title: 'League Info', value: '⚽' },
                  { title: 'Registration', value: '📝' },
                  { title: 'Gameplay', value: '🏆' },
                  { title: 'Technical Support', value: '🛠️' },
                  { title: 'Community', value: '👥' },
                  { title: 'Impact & Social', value: '🌍' },
                  { title: 'Pricing', value: '💰' },
                  { title: 'Safety', value: '🛡️' },
                ],
              },
              initialValue: '❓',
            },
            {
              name: 'faqs',
              type: 'array',
              title: 'Questions & Answers',
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
                    {
                      name: 'featured',
                      type: 'boolean',
                      title: 'Featured Question',
                      description: 'Highlight this as a popular question',
                      initialValue: false,
                    },
                    {
                      name: 'tags',
                      type: 'array',
                      title: 'Tags',
                      of: [{ type: 'string' }],
                      options: {
                        layout: 'tags',
                      },
                    },
                  ],
                  preview: {
                    select: {
                      question: 'question',
                      featured: 'featured',
                    },
                    prepare({ question, featured }) {
                      return {
                        title: question || 'Untitled Question',
                        subtitle: featured ? '⭐ Featured' : '',
                      }
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1),
            },
          ],
          preview: {
            select: {
              categoryName: 'categoryName',
              icon: 'icon',
              faqCount: 'faqs.length',
            },
            prepare({ categoryName, icon, faqCount }) {
              return {
                title: categoryName || 'Untitled Category',
                subtitle: `${icon || '❓'} ${faqCount || 0} questions`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'searchEnabled',
      type: 'boolean',
      title: 'Enable FAQ Search',
      description: 'Allow users to search through questions',
      initialValue: true,
    }),
    defineField({
      name: 'showContactCta',
      type: 'boolean',
      title: 'Show Contact CTA',
      description: 'Show "Still have questions?" section',
      initialValue: true,
    }),
    defineField({
      name: 'contactCta',
      type: 'object',
      title: 'Contact Call-to-Action',
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'CTA Heading',
          initialValue: 'Still have questions?',
        },
        {
          name: 'description',
          type: 'text',
          title: 'CTA Description',
          rows: 2,
          initialValue: 'Get in touch with our team for personalized support.',
        },
        {
          name: 'buttonText',
          type: 'string',
          title: 'Button Text',
          initialValue: 'Contact Us',
        },
        {
          name: 'buttonUrl',
          type: 'string',
          title: 'Button URL',
        },
      ],
      hidden: ({ parent }) => !parent?.showContactCta,
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
      categoryCount: 'categories.length',
    },
    prepare({ title, layout, categoryCount }) {
      const totalFaqs = categoryCount || 0;
      return {
        title: title || 'FAQ Section',
        subtitle: `${layout || 'accordion'} • ${categoryCount || 0} categories`,
      }
    },
  },
})