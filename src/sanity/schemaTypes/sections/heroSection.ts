import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
      title: 'Headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      type: 'text',
      title: 'Subheadline',
      rows: 3,
    }),
    defineField({
      name: 'ctaText',
      type: 'string',
      title: 'CTA Button Text',
    }),
    defineField({
      name: 'ctaUrl',
      type: 'url',
      title: 'CTA Button URL',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle ? subtitle.slice(0, 50) + '...' : 'Hero section content',
      }
    },
  },
})