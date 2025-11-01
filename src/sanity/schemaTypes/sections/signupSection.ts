import { defineField, defineType } from 'sanity'
import { stylingSectionSchema, typographySectionSchema } from '../shared/styling'

export const signupSection = defineType({
  name: 'signupSection',
  title: 'Signup Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Button Text',
      initialValue: 'Join Waitlist',
    }),
    defineField({
      name: 'formStyle',
      type: 'string',
      title: 'Form Style',
      options: {
        list: [
          { title: 'Inline (Side by Side)', value: 'inline' },
          { title: 'Stacked (Vertical)', value: 'stacked' },
          { title: 'Centered with Large Input', value: 'centered-large' },
          { title: 'Minimal (Text Only)', value: 'minimal' },
        ],
      },
      initialValue: 'inline',
    }),
    defineField({
      name: 'successMessage',
      type: 'object',
      title: 'Success Message',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Success Title',
          initialValue: 'Thanks for joining!',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Success Description',
          initialValue: 'We\'ll keep you posted with updates from the League.',
          rows: 2,
        },
      ],
    }),
    stylingSectionSchema,
    typographySectionSchema,
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Signup Section',
        subtitle: subtitle ? subtitle.slice(0, 50) + '...' : 'Email signup section',
      }
    },
  },
})