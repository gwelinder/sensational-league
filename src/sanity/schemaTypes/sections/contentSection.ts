import { defineField, defineType } from 'sanity'
import { stylingSectionSchema, typographySectionSchema } from '../shared/styling'

export const contentSection = defineType({
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Section Subtitle',
      description: 'Optional subtitle or description',
      rows: 2,
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
      title: 'Content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Content Layout',
      options: {
        list: [
          { title: 'Single Column', value: 'single' },
          { title: 'Two Columns', value: 'two-column' },
          { title: 'Three Columns', value: 'three-column' },
          { title: 'Sidebar Left', value: 'sidebar-left' },
          { title: 'Sidebar Right', value: 'sidebar-right' },
          { title: 'Centered Narrow', value: 'centered-narrow' },
        ],
      },
      initialValue: 'single',
    }),
    defineField({
      name: 'ctaButton',
      type: 'object',
      title: 'Call-to-Action Button',
      fields: [
        {
          name: 'show',
          type: 'boolean',
          title: 'Show CTA Button',
          initialValue: false,
        },
        {
          name: 'text',
          type: 'string',
          title: 'Button Text',
          hidden: ({ parent }) => !parent?.show,
        },
        {
          name: 'url',
          type: 'url',
          title: 'Button URL',
          hidden: ({ parent }) => !parent?.show,
        },
        {
          name: 'style',
          type: 'string',
          title: 'Button Style',
          options: {
            list: [
              { title: 'Primary (Volt)', value: 'primary' },
              { title: 'Secondary (Outline)', value: 'secondary' },
              { title: 'Ghost (Text Only)', value: 'ghost' },
            ],
          },
          initialValue: 'primary',
          hidden: ({ parent }) => !parent?.show,
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
    },
    prepare({ title }) {
      return {
        title: title || 'Content Section',
        subtitle: 'Rich content section',
      }
    },
  },
})