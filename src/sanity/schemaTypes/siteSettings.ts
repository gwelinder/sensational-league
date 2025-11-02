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
      ],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'logo'},
  },
})
