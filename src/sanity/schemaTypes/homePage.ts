import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'This is for internal reference only',
      initialValue: 'Home Page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Title for search engines and social media',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Description for search engines and social media',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
    defineField({
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      fields: [
        {
          name: 'headline',
          type: 'styledText',
          title: 'Headline',
          description: 'Main headline - select text and apply colors from the toolbar',
        },
        {
          name: 'subline',
          type: 'text',
          title: 'Subline',
          description: 'Descriptive text below the headline',
          rows: 2,
        },
        {
          name: 'ctaText',
          type: 'string',
          title: 'CTA Button Text',
          description: 'Text for the call-to-action button',
        },
        {
          name: 'stats',
          type: 'array',
          title: 'Stats',
          description: 'Statistics displayed in the hero section',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', type: 'string', title: 'Value' },
              { name: 'label', type: 'string', title: 'Label' },
            ],
          }],
        },
      ],
    }),
    defineField({
      name: 'about',
      type: 'object',
      title: 'About Section',
      fields: [
        {
          name: 'title',
          type: 'styledText',
          title: 'Section Title',
          description: 'Main title - select text and apply colors from the toolbar',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          description: 'Main description text',
          rows: 3,
        },
        {
          name: 'pillars',
          type: 'array',
          title: 'Three Pillars',
          description: 'The three core pillars of the league',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Pillar Title' },
              { name: 'description', type: 'text', title: 'Description', rows: 2 },
            ],
          }],
          validation: (Rule) => Rule.max(3),
        },
      ],
    }),
    defineField({
      name: 'impact',
      type: 'object',
      title: 'Impact Section',
      fields: [
        {
          name: 'headline',
          type: 'styledText',
          title: 'Headline',
          description: 'Impact section headline - select text and apply colors from the toolbar',
        },
        {
          name: 'stats',
          type: 'array',
          title: 'Impact Stats',
          description: 'Statistics for the impact section',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', type: 'string', title: 'Value' },
              { name: 'label', type: 'string', title: 'Label' },
            ],
          }],
        },
        {
          name: 'quoteText',
          type: 'text',
          title: 'Quote Text',
          description: 'Featured quote',
          rows: 3,
        },
        {
          name: 'quoteAttribution',
          type: 'string',
          title: 'Quote Attribution',
          description: 'Who said the quote',
        },
      ],
    }),
    defineField({
      name: 'cta',
      type: 'object',
      title: 'Final CTA Section',
      fields: [
        {
          name: 'headline',
          type: 'string',
          title: 'Headline',
          description: 'CTA section headline',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 2,
        },
        {
          name: 'buttonText',
          type: 'string',
          title: 'Button Text',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      headline: 'hero.headline',
    },
    prepare({ title, headline }) {
      return {
        title: title || 'Home Page',
        subtitle: headline || 'Fast. Rebellious. Female.',
      }
    },
  },
})
