import { defineField, defineType } from 'sanity'

export const logo = defineType({
  name: 'logo',
  title: 'Brand Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Logo Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Brief description of when and how to use this logo',
      rows: 2,
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Logo Variant',
      options: {
        list: [
          { title: 'Spark Large', value: 'spark-large' },
          { title: 'Spark Medium', value: 'spark-medium' },
          { title: 'Spark Small', value: 'spark-small' },
          { title: 'Secondary Mark', value: 'secondary-mark' },
          { title: 'Wordmark One Line', value: 'wordmark-one-line' },
          { title: 'Wordmark Centered', value: 'wordmark-centered' },
          { title: 'Wordmark Left Aligned', value: 'wordmark-left-aligned' },
          { title: 'Primary Lockup', value: 'primary-lockup' },
          { title: 'Secondary Lockup One Line', value: 'secondary-lockup-one-line' },
          { title: 'Secondary Lockup Centered', value: 'secondary-lockup-centered' },
          { title: 'Secondary Lockup Left Aligned', value: 'secondary-lockup-left-aligned' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      type: 'file',
      title: 'Logo File',
      options: {
        accept: '.svg,.png,.pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'usage',
      type: 'string',
      title: 'Usage Guidelines',
      description: 'When and where this logo variant should be used',
    }),
    defineField({
      name: 'brandGuidelines',
      type: 'object',
      title: 'Brand Guidelines',
      fields: [
        {
          name: 'clearspace',
          type: 'string',
          title: 'Required Clearspace',
          options: {
            list: [
              { title: 'Half x-height (Primary)', value: 'half-x-height' },
              { title: 'Full x-height (Secondary)', value: 'full-x-height' },
            ],
          },
          initialValue: 'half-x-height',
        },
        {
          name: 'direction',
          type: 'string',
          title: 'Movement Direction',
          options: {
            list: [
              { title: 'Right-leaning (Standard)', value: 'right-leaning' },
              { title: 'Centered', value: 'centered' },
            ],
          },
          initialValue: 'right-leaning',
        },
        {
          name: 'contrast',
          type: 'string',
          title: 'Contrast Requirements',
          options: {
            list: [
              { title: 'High Contrast', value: 'high' },
              { title: 'Medium Contrast', value: 'medium' },
              { title: 'Any Background', value: 'flexible' },
            ],
          },
          initialValue: 'high',
        },
        {
          name: 'preferredColors',
          type: 'array',
          title: 'Preferred Color Treatments',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Black on Light', value: 'black-on-light' },
                  { title: 'White on Dark', value: 'white-on-dark' },
                  { title: 'Volt on Light', value: 'volt-on-light' },
                  { title: 'Volt on Dark', value: 'volt-on-dark' },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'sizeRecommendations',
      type: 'object',
      title: 'Size Recommendations',
      fields: [
        {
          name: 'minimumWidth',
          type: 'number',
          title: 'Minimum Width (px)',
          description: 'Smallest recommended width for this variant',
        },
        {
          name: 'maximumWidth',
          type: 'number',
          title: 'Maximum Width (px)',
          description: 'Largest recommended width for this variant',
        },
        {
          name: 'optimalWidth',
          type: 'number',
          title: 'Optimal Width (px)',
          description: 'Ideal width for this variant',
        },
      ],
    }),
    defineField({
      name: 'alternativeFormats',
      type: 'array',
      title: 'Alternative Formats',
      description: 'Additional file formats for this logo',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'format',
              type: 'string',
              title: 'Format',
              options: {
                list: [
                  { title: 'PNG', value: 'png' },
                  { title: 'JPG', value: 'jpg' },
                  { title: 'PDF', value: 'pdf' },
                  { title: 'EPS', value: 'eps' },
                ],
              },
            },
            {
              name: 'file',
              type: 'file',
              title: 'File',
            },
            {
              name: 'purpose',
              type: 'string',
              title: 'Purpose',
              description: 'When to use this format',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Active Logo',
      description: 'Whether this logo is currently approved for use',
      initialValue: true,
    }),
    defineField({
      name: 'lastUpdated',
      type: 'datetime',
      title: 'Last Updated',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Variant',
      name: 'variant',
      by: [{ field: 'variant', direction: 'asc' }],
    },
    {
      title: 'Last Updated',
      name: 'lastUpdated',
      by: [{ field: 'lastUpdated', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      variant: 'variant',
      file: 'file',
      isActive: 'isActive',
    },
    prepare({ title, variant, file, isActive }) {
      const variantEmojis = {
        'spark-large': '⚡',
        'spark-medium': '⚡',
        'spark-small': '⚡',
        'secondary-mark': '💫',
        'wordmark-one-line': '📝',
        'wordmark-centered': '📄',
        'wordmark-left-aligned': '📋',
        'primary-lockup': '🎯',
        'secondary-lockup-one-line': '🔥',
        'secondary-lockup-centered': '🔥',
        'secondary-lockup-left-aligned': '🔥',
      };

      return {
        title: `${variantEmojis[variant as keyof typeof variantEmojis] || '🎨'} ${title}`,
        subtitle: `${variant} ${!isActive ? '(Inactive)' : ''}`,
        media: file,
      };
    },
  },
})