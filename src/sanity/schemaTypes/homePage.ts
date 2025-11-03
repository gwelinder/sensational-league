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
          name: 'logo',
          type: 'image',
          title: 'Hero Logo',
          description: 'Large logo displayed at the top of the hero section',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Alternative text for accessibility',
            },
            {
              name: 'width',
              type: 'number',
              title: 'Width (pixels)',
              description: 'Custom width in pixels (e.g., 200). Leave empty for responsive default.',
            },
            {
              name: 'height',
              type: 'number',
              title: 'Height (pixels)',
              description: 'Custom height in pixels (e.g., 200). Leave empty for responsive default.',
            },
            {
              name: 'objectFit',
              type: 'string',
              title: 'Image Fit',
              description: 'How the image should fit within its container',
              options: {
                list: [
                  { title: 'Cover (fill container, may crop)', value: 'cover' },
                  { title: 'Contain (fit within container, no crop)', value: 'contain' },
                  { title: 'Fill (stretch to fit)', value: 'fill' },
                  { title: 'None (original size)', value: 'none' },
                  { title: 'Scale Down (smaller of contain or none)', value: 'scale-down' },
                ],
              },
              initialValue: 'cover',
            },
          ],
        },
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
        {
          name: 'images',
          type: 'array',
          title: 'Hero Images',
          description: 'Gallery images displayed below the stats (4 images recommended)',
          of: [{
            type: 'image',
            options: {
              hotspot: true,
            },
            fields: [
              {
                name: 'alt',
                type: 'string',
                title: 'Alt Text',
                description: 'Alternative text for accessibility',
              },
              {
                name: 'width',
                type: 'number',
                title: 'Width (pixels)',
                description: 'Custom width. Leave empty for responsive default.',
              },
              {
                name: 'height',
                type: 'number',
                title: 'Height (pixels)',
                description: 'Custom height. Leave empty for responsive default.',
              },
              {
                name: 'objectFit',
                type: 'string',
                title: 'Image Fit',
                description: 'How the image should fit',
                options: {
                  list: [
                    { title: 'Cover (fill, may crop)', value: 'cover' },
                    { title: 'Contain (fit, no crop)', value: 'contain' },
                    { title: 'Fill (stretch)', value: 'fill' },
                  ],
                },
                initialValue: 'cover',
              },
            ],
          }],
          validation: (Rule) => Rule.max(8),
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
          title: 'Key Features',
          description: 'The key features/pillars of the league (4 recommended for grid layout)',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Feature Title' },
              { name: 'description', type: 'text', title: 'Description', rows: 2 },
            ],
          }],
          validation: (Rule) => Rule.min(1).max(8),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Home Page',
        subtitle: 'Homepage content',
      }
    },
  },
})
