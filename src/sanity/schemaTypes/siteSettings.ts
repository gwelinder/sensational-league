import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Organize into tabs (built-in field groups)
  groups: [
    { name: 'brand', title: 'Brand & Basics', default: true },
    { name: 'header', title: 'Header' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site title',
      validation: (rule) => rule.required(),
      group: 'brand',
    }),
    defineField({
      name: 'logo',
      type: 'logoImage',
      title: 'Primary Logo',
      description: 'Default site logo used for generic contexts',
      group: 'brand',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
      group: 'brand',
    }),
    defineField({
      name: 'navigation',
      type: 'object',
      title: 'Header Navigation',
      group: 'header',
      options: { collapsible: true, collapsed: false },
      fieldsets: [
        { name: 'navLogos', title: 'Logos', options: { collapsible: true, collapsed: false } },
        { name: 'navLinks', title: 'Links', options: { collapsible: true, collapsed: true } },
      ],
      fields: [
        defineField({
          name: 'sparkLogo',
          type: 'logoImage',
          title: 'Spark Logo',
          description: 'The spark icon logo for the header',
          fieldset: 'navLogos',
        }),
        defineField({
          name: 'wordmarkLogo',
          type: 'logoImage',
          title: 'Wordmark Logo',
          description: 'The wordmark logo for the header (desktop)',
          fieldset: 'navLogos',
        }),
        defineField({
          name: 'links',
          type: 'array',
          title: 'Navigation Links',
          fieldset: 'navLinks',
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
      group: 'footer',
      options: { collapsible: true, collapsed: false },
      fieldsets: [
        { name: 'footerLogos', title: 'Logos', options: { collapsible: true, collapsed: false } },
        { name: 'footerCopy', title: 'Text Content', options: { collapsible: true, collapsed: false } },
        { name: 'footerSocial', title: 'Social Links', options: { collapsible: true, collapsed: true } },
      ],
      fields: [
        defineField({
          name: 'sparkLogo',
          type: 'logoImage',
          title: 'Spark Logo',
          description: 'The spark icon logo for the footer',
          fieldset: 'footerLogos',
        }),
        defineField({
          name: 'wordmarkLogo',
          type: 'logoImage',
          title: 'Wordmark Logo',
          description: 'The wordmark logo for the footer',
          fieldset: 'footerLogos',
        }),
        defineField({
          name: 'tagline',
          type: 'string',
          title: 'Tagline',
          description: 'e.g., "Fast. Rebellious. Female."',
          fieldset: 'footerCopy',
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          fieldset: 'footerCopy',
        }),
        defineField({
          name: 'copyrightText',
          type: 'string',
          title: 'Copyright Text',
          fieldset: 'footerCopy',
        }),
        defineField({
          name: 'additionalText',
          type: 'string',
          title: 'Additional Text',
          description: 'Secondary footer text',
          fieldset: 'footerCopy',
        }),
        defineField({
          name: 'socialLinks',
          type: 'object',
          title: 'Social Media Links',
          description: 'Links to social media profiles',
          fieldset: 'footerSocial',
          options: { columns: 2 },
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
