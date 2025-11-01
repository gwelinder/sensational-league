import { defineField, defineType } from 'sanity'

export const partnersSection = defineType({
  name: 'partnersSection',
  title: 'Partners Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      initialValue: 'Our Partners',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'partners',
      type: 'array',
      title: 'Partners',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Partner Name',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'logo',
              type: 'image',
              title: 'Logo',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'Website URL',
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'logo',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Off White', value: 'off-white' },
          { title: 'Black', value: 'black' },
          { title: 'Volt Yellow', value: 'volt' },
        ],
      },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      partnersCount: 'partners.length',
    },
    prepare({ title, partnersCount }) {
      return {
        title: title || 'Partners Section',
        subtitle: `${partnersCount || 0} partners`,
      }
    },
  },
})