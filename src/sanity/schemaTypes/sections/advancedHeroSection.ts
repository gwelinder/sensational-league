import { defineField, defineType } from 'sanity'

export const advancedHeroSection = defineType({
  name: 'advancedHeroSection',
  title: 'Advanced Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout Style',
      options: {
        list: [
          { title: 'Full Screen Impact', value: 'fullscreen' },
          { title: 'Split Screen', value: 'split' },
          { title: 'Centered Classic', value: 'centered' },
          { title: 'Video Background', value: 'video' },
          { title: 'Logo Showcase', value: 'logo-showcase' },
        ],
      },
      initialValue: 'fullscreen',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      type: 'object',
      title: 'Headline',
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Headline Text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'style',
          type: 'string',
          title: 'Headline Style',
          options: {
            list: [
              { title: 'Brand Headline (Large)', value: 'brand-headline' },
              { title: 'Display XL', value: 'display-xl' },
              { title: 'Impact Statement', value: 'impact' },
              { title: 'Animated Typewriter', value: 'typewriter' },
            ],
          },
          initialValue: 'brand-headline',
        },
        {
          name: 'color',
          type: 'string',
          title: 'Text Color',
          options: {
            list: [
              { title: 'White', value: 'white' },
              { title: 'Black', value: 'black' },
              { title: 'Volt Yellow', value: 'volt' },
              { title: 'Auto (Smart Contrast)', value: 'auto' },
            ],
          },
          initialValue: 'auto',
        },
      ],
    }),
    defineField({
      name: 'subheadline',
      type: 'object',
      title: 'Subheadline',
      fields: [
        {
          name: 'text',
          type: 'text',
          title: 'Subheadline Text',
          rows: 3,
        },
        {
          name: 'emphasis',
          type: 'array',
          title: 'Emphasized Words',
          description: 'Words to highlight in volt yellow',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'logoDisplay',
      type: 'object',
      title: 'Logo Display',
      fields: [
        {
          name: 'show',
          type: 'boolean',
          title: 'Show Logo',
          initialValue: true,
        },
        {
          name: 'variant',
          type: 'string',
          title: 'Logo Variant',
          options: {
            list: [
              { title: 'Spark Large (Hero)', value: 'spark-large' },
              { title: 'Spark Medium', value: 'spark-medium' },
              { title: 'Primary Lockup', value: 'primary-lockup' },
              { title: 'Secondary Lockup', value: 'secondary-lockup' },
              { title: 'Wordmark Only', value: 'wordmark' },
            ],
          },
          initialValue: 'spark-large',
          hidden: ({ parent }) => !parent?.show,
        },
        {
          name: 'position',
          type: 'string',
          title: 'Logo Position',
          options: {
            list: [
              { title: 'Above Headline', value: 'above' },
              { title: 'Below Headline', value: 'below' },
              { title: 'Side by Side', value: 'side' },
              { title: 'Background Watermark', value: 'watermark' },
            ],
          },
          initialValue: 'above',
          hidden: ({ parent }) => !parent?.show,
        },
        {
          name: 'animation',
          type: 'string',
          title: 'Logo Animation',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Fade In', value: 'fade' },
              { title: 'Spark Effect', value: 'spark' },
              { title: 'Right Motion', value: 'motion-right' },
              { title: 'Scale Pulse', value: 'pulse' },
            ],
          },
          initialValue: 'spark',
          hidden: ({ parent }) => !parent?.show,
        },
      ],
    }),
    defineField({
      name: 'ctaButtons',
      type: 'array',
      title: 'Call-to-Action Buttons',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'Button URL',
              validation: (Rule) => Rule.required(),
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
                  { title: 'Video Play', value: 'video' },
                ],
              },
              initialValue: 'primary',
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: [
                  { title: 'None', value: 'none' },
                  { title: 'Arrow Right', value: 'arrow-right' },
                  { title: 'Play', value: 'play' },
                  { title: 'Download', value: 'download' },
                  { title: 'External Link', value: 'external' },
                ],
              },
              initialValue: 'none',
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'style',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'background',
      type: 'object',
      title: 'Background',
      fields: [
        {
          name: 'type',
          type: 'string',
          title: 'Background Type',
          options: {
            list: [
              { title: 'Solid Color', value: 'solid' },
              { title: 'Gradient', value: 'gradient' },
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' },
              { title: 'Pattern', value: 'pattern' },
            ],
          },
          initialValue: 'solid',
        },
        {
          name: 'color',
          type: 'string',
          title: 'Background Color',
          options: {
            list: [
              { title: 'Black', value: 'black' },
              { title: 'White', value: 'white' },
              { title: 'Off White', value: 'off-white' },
              { title: 'Volt Yellow', value: 'volt' },
              { title: 'Custom Gradient', value: 'gradient' },
            ],
          },
          initialValue: 'black',
          hidden: ({ parent }) => parent?.type !== 'solid',
        },
        {
          name: 'image',
          type: 'image',
          title: 'Background Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'overlay',
              type: 'string',
              title: 'Overlay',
              options: {
                list: [
                  { title: 'None', value: 'none' },
                  { title: 'Dark (50%)', value: 'dark-50' },
                  { title: 'Dark (70%)', value: 'dark-70' },
                  { title: 'Brand Gradient', value: 'brand-gradient' },
                ],
              },
              initialValue: 'dark-50',
            },
            {
              name: 'position',
              type: 'string',
              title: 'Image Position',
              options: {
                list: [
                  { title: 'Center', value: 'center' },
                  { title: 'Top', value: 'top' },
                  { title: 'Bottom', value: 'bottom' },
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
              },
              initialValue: 'center',
            },
          ],
          hidden: ({ parent }) => parent?.type !== 'image',
        },
        {
          name: 'video',
          type: 'object',
          title: 'Background Video',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Video URL (MP4)',
              description: 'Optimized MP4 video file',
            },
            {
              name: 'poster',
              type: 'image',
              title: 'Video Poster Image',
              options: { hotspot: true },
            },
            {
              name: 'muted',
              type: 'boolean',
              title: 'Muted by Default',
              initialValue: true,
            },
          ],
          hidden: ({ parent }) => parent?.type !== 'video',
        },
      ],
    }),
    defineField({
      name: 'animations',
      type: 'object',
      title: 'Animations & Effects',
      fields: [
        {
          name: 'parallax',
          type: 'boolean',
          title: 'Enable Parallax Scrolling',
          initialValue: false,
        },
        {
          name: 'fadeIn',
          type: 'string',
          title: 'Fade In Animation',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Fade Up', value: 'fade-up' },
              { title: 'Fade Down', value: 'fade-down' },
              { title: 'Fade Left', value: 'fade-left' },
              { title: 'Fade Right', value: 'fade-right' },
            ],
          },
          initialValue: 'fade-up',
        },
        {
          name: 'motion',
          type: 'boolean',
          title: 'Enable Brand Motion (Right-leaning)',
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: 'dimensions',
      type: 'object',
      title: 'Section Dimensions',
      fields: [
        {
          name: 'height',
          type: 'string',
          title: 'Section Height',
          options: {
            list: [
              { title: 'Auto (Content Based)', value: 'auto' },
              { title: 'Half Screen', value: '50vh' },
              { title: 'Full Screen', value: '100vh' },
              { title: 'Extra Large', value: '80vh' },
              { title: 'Large', value: '60vh' },
            ],
          },
          initialValue: '80vh',
        },
        {
          name: 'padding',
          type: 'string',
          title: 'Vertical Padding',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
              { title: 'Extra Large', value: 'xl' },
            ],
          },
          initialValue: 'large',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline.text',
      subtitle: 'layout',
      media: 'background.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Advanced Hero Section',
        subtitle: `Layout: ${subtitle || 'fullscreen'}`,
        media: media || undefined,
      }
    },
  },
})