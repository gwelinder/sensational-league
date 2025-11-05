import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    }),
    defineField({
      name: 'navigation',
      type: 'object',
      title: 'Header Navigation',
      fields: [
        defineField({
          name: 'sparkLogo',
          type: 'image',
          title: 'Spark Logo',
          description: 'The spark icon logo for the header',
          options: {hotspot: true},
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
              description: 'Custom width. Leave empty for default (40px).',
            },
            {
              name: 'height',
              type: 'number',
              title: 'Height (pixels)',
              description: 'Custom height. Leave empty for default (40px).',
            },
            {
              name: 'objectFit',
              type: 'string',
              title: 'Image Fit',
              options: {
                list: [
                  { title: 'Cover', value: 'cover' },
                  { title: 'Contain', value: 'contain' },
                  { title: 'Fill', value: 'fill' },
                ],
              },
              initialValue: 'contain',
            },
          ],
        }),
        defineField({
          name: 'wordmarkLogo',
          type: 'image',
          title: 'Wordmark Logo',
          description: 'The wordmark logo for the header (desktop)',
          options: {hotspot: true},
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
              description: 'Custom height. Leave empty for default (24px).',
            },
            {
              name: 'objectFit',
              type: 'string',
              title: 'Image Fit',
              options: {
                list: [
                  { title: 'Cover', value: 'cover' },
                  { title: 'Contain', value: 'contain' },
                  { title: 'Fill', value: 'fill' },
                ],
              },
              initialValue: 'contain',
            },
          ],
        }),
        defineField({
          name: 'links',
          type: 'array',
          title: 'Navigation Links',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'label', type: 'string', title: 'Label'}),
                defineField({name: 'href', type: 'string', title: 'Link'}),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      type: 'object',
      title: 'Footer',
      fields: [
        defineField({
          name: 'sparkLogo',
          type: 'image',
          title: 'Spark Logo',
          description: 'The spark icon logo for the footer',
          options: {hotspot: true},
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
              description: 'Custom width. Leave empty for default (80px).',
            },
            {
              name: 'height',
              type: 'number',
              title: 'Height (pixels)',
              description: 'Custom height. Leave empty for default (80px).',
            },
            {
              name: 'objectFit',
              type: 'string',
              title: 'Image Fit',
              options: {
                list: [
                  { title: 'Cover', value: 'cover' },
                  { title: 'Contain', value: 'contain' },
                  { title: 'Fill', value: 'fill' },
                ],
              },
              initialValue: 'contain',
            },
          ],
        }),
        defineField({
          name: 'wordmarkLogo',
          type: 'image',
          title: 'Wordmark Logo',
          description: 'The wordmark logo for the footer',
          options: {hotspot: true},
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
              description: 'Custom height. Leave empty for default (40px).',
            },
            {
              name: 'objectFit',
              type: 'string',
              title: 'Image Fit',
              options: {
                list: [
                  { title: 'Cover', value: 'cover' },
                  { title: 'Contain', value: 'contain' },
                  { title: 'Fill', value: 'fill' },
                ],
              },
              initialValue: 'contain',
            },
          ],
        }),
        defineField({
          name: 'tagline',
          type: 'string',
          title: 'Tagline',
          description: 'e.g., "Fast. Rebellious. Female."',
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        }),
        defineField({
          name: 'copyrightText',
          type: 'string',
          title: 'Copyright Text',
        }),
        defineField({
          name: 'additionalText',
          type: 'string',
          title: 'Additional Text',
          description: 'Secondary footer text',
        }),
        defineField({
          name: 'socialLinks',
          type: 'object',
          title: 'Social Media Links',
          description: 'Links to social media profiles',
          fields: [
            {
              name: 'twitter',
              type: 'url',
              title: 'Twitter/X URL',
              description: 'Full URL to Twitter/X profile',
            },
            {
              name: 'instagram',
              type: 'url',
              title: 'Instagram URL',
              description: 'Full URL to Instagram profile',
            },
            {
              name: 'facebook',
              type: 'url',
              title: 'Facebook URL',
              description: 'Full URL to Facebook profile',
            },
            {
              name: 'tiktok',
              type: 'url',
              title: 'TikTok URL',
              description: 'Full URL to TikTok profile',
            },
            {
              name: 'youtube',
              type: 'url',
              title: 'YouTube URL',
              description: 'Full URL to YouTube channel',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'logo'},
  },
})
