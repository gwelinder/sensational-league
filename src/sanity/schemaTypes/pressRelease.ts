import { defineField, defineType } from 'sanity'

export const pressRelease = defineType({
  name: 'pressRelease',
  title: 'Press Release',
  type: 'document',
  fieldsets: [
    {
      name: 'danish',
      title: '🇩🇰 Danish Version',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'english',
      title: '🇬🇧 English Version',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Internal title for reference',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly identifier (e.g., "moonbug-investment-2025")',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      type: 'date',
      title: 'Publish Date',
      description: 'Date of press release',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      description: 'Main image for social sharing and display below subtitle (upload directly)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO',
        },
      ],
    }),
    defineField({
      name: 'featuredImageFromSharePoint',
      type: 'string',
      title: 'Featured Image from SharePoint',
      description: 'Filename from SharePoint press kit (e.g., "Bettina, Majken og Rene.jpg"). Leave empty if using uploaded image above.',
    }),
    defineField({
      name: 'ogImageUrl',
      type: 'url',
      title: 'OpenGraph Image URL',
      description: 'Direct URL to image for social media sharing (Twitter/Facebook). Use a stable, publicly accessible URL.',
    }),

    // Danish Fields
    defineField({
      name: 'headlineDa',
      type: 'text',
      title: 'Headline (Danish)',
      description: 'Main headline (GT Standard L Expanded Light, 18pt)',
      rows: 3,
      fieldset: 'danish',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadlineDa',
      type: 'text',
      title: 'Subheadline (Danish)',
      description: 'Secondary headline (GT Standard L Narrow)',
      rows: 3,
      fieldset: 'danish',
    }),
    defineField({
      name: 'contentDa',
      type: 'array',
      title: 'Content (Danish)',
      description: 'Main content of the press release',
      fieldset: 'danish',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // English Fields
    defineField({
      name: 'headlineEn',
      type: 'text',
      title: 'Headline (English)',
      description: 'Main headline (GT Standard L Expanded Light, 18pt)',
      rows: 3,
      fieldset: 'english',
    }),
    defineField({
      name: 'subheadlineEn',
      type: 'text',
      title: 'Subheadline (English)',
      description: 'Secondary headline (GT Standard L Narrow)',
      rows: 3,
      fieldset: 'english',
    }),
    defineField({
      name: 'contentEn',
      type: 'array',
      title: 'Content (English)',
      description: 'Main content of the press release in English',
      fieldset: 'english',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'contactPerson',
      type: 'object',
      title: 'Contact Person',
      fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'title', type: 'string', title: 'Job Title' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'email', type: 'string', title: 'Email' },
      ],
    }),
    defineField({
      name: 'aboutSectionsDa',
      type: 'array',
      title: 'About Sections (Danish)',
      description: 'Additional context sections (Om Founders, Om Saga Sports Group, etc.)',
      fieldset: 'danish',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Section Title' },
          { name: 'content', type: 'text', title: 'Content', rows: 5 },
        ],
      }],
    }),
    defineField({
      name: 'aboutSectionsEn',
      type: 'array',
      title: 'About Sections (English)',
      description: 'Additional context sections (About Founders, About Saga Sports Group, etc.)',
      fieldset: 'english',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Section Title' },
          { name: 'content', type: 'text', title: 'Content', rows: 5 },
        ],
      }],
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
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Keywords',
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headlineDa',
      subtitle: 'publishDate',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Press Release',
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString('da-DK') : 'No date',
      }
    },
  },
})
