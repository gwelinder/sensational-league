import { defineField, defineType } from 'sanity'

export const mediaSection = defineType({
  name: 'mediaSection',
  title: 'Media Section',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout Type',
      options: {
        list: [
          { title: 'Image Gallery', value: 'gallery' },
          { title: 'Video Showcase', value: 'video' },
          { title: 'Split Media & Text', value: 'split' },
          { title: 'Before & After', value: 'before-after' },
          { title: 'Testimonial with Media', value: 'testimonial' },
          { title: 'Logo Wall', value: 'logo-wall' },
        ],
      },
      initialValue: 'gallery',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Section Subtitle',
      rows: 2,
    }),
    defineField({
      name: 'gallery',
      type: 'object',
      title: 'Image Gallery',
      fields: [
        {
          name: 'images',
          type: 'array',
          title: 'Images',
          of: [
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
                },
                {
                  name: 'credit',
                  type: 'string',
                  title: 'Photo Credit',
                },
              ],
            },
          ],
          validation: (Rule) => Rule.min(1).max(12),
        },
        {
          name: 'style',
          type: 'string',
          title: 'Gallery Style',
          options: {
            list: [
              { title: 'Grid (Equal Heights)', value: 'grid' },
              { title: 'Masonry (Pinterest Style)', value: 'masonry' },
              { title: 'Carousel', value: 'carousel' },
              { title: 'Lightbox Grid', value: 'lightbox' },
            ],
          },
          initialValue: 'grid',
        },
        {
          name: 'columns',
          type: 'number',
          title: 'Number of Columns',
          validation: (Rule) => Rule.min(1).max(6),
          initialValue: 3,
        },
      ],
      hidden: ({ parent }) => parent?.layout !== 'gallery',
    }),
    defineField({
      name: 'video',
      type: 'object',
      title: 'Video Content',
      fields: [
        {
          name: 'type',
          type: 'string',
          title: 'Video Type',
          options: {
            list: [
              { title: 'YouTube', value: 'youtube' },
              { title: 'Vimeo', value: 'vimeo' },
              { title: 'Direct MP4', value: 'mp4' },
              { title: 'Embedded', value: 'embed' },
            ],
          },
          initialValue: 'youtube',
        },
        {
          name: 'url',
          type: 'url',
          title: 'Video URL',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'thumbnail',
          type: 'image',
          title: 'Custom Thumbnail',
          options: { hotspot: true },
        },
        {
          name: 'autoplay',
          type: 'boolean',
          title: 'Autoplay (Muted)',
          initialValue: false,
        },
        {
          name: 'controls',
          type: 'boolean',
          title: 'Show Controls',
          initialValue: true,
        },
      ],
      hidden: ({ parent }) => parent?.layout !== 'video',
    }),
    defineField({
      name: 'splitContent',
      type: 'object',
      title: 'Split Layout Content',
      fields: [
        {
          name: 'mediaPosition',
          type: 'string',
          title: 'Media Position',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'left',
        },
        {
          name: 'media',
          type: 'image',
          title: 'Media',
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'content',
          type: 'blockContent',
          title: 'Text Content',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'cta',
          type: 'object',
          title: 'Call to Action',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
            },
            {
              name: 'url',
              type: 'url',
              title: 'Button URL',
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.layout !== 'split',
    }),
    defineField({
      name: 'testimonial',
      type: 'object',
      title: 'Testimonial Content',
      fields: [
        {
          name: 'quote',
          type: 'text',
          title: 'Quote',
          rows: 4,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'author',
          type: 'object',
          title: 'Author',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title/Position',
            },
            {
              name: 'photo',
              type: 'image',
              title: 'Photo',
              options: { hotspot: true },
            },
            {
              name: 'logo',
              type: 'image',
              title: 'Company/Team Logo',
              options: { hotspot: true },
            },
          ],
        },
        {
          name: 'media',
          type: 'image',
          title: 'Supporting Media',
          options: { hotspot: true },
        },
      ],
      hidden: ({ parent }) => parent?.layout !== 'testimonial',
    }),
    defineField({
      name: 'logoWall',
      type: 'object',
      title: 'Logo Wall',
      fields: [
        {
          name: 'logos',
          type: 'array',
          title: 'Logos',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'logo',
                  type: 'image',
                  title: 'Logo',
                  options: { hotspot: true },
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'name',
                  type: 'string',
                  title: 'Organization Name',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'url',
                  type: 'url',
                  title: 'Website URL',
                },
                {
                  name: 'tier',
                  type: 'string',
                  title: 'Partnership Tier',
                  options: {
                    list: [
                      { title: 'Title Sponsor', value: 'title' },
                      { title: 'Premier Partner', value: 'premier' },
                      { title: 'Official Partner', value: 'official' },
                      { title: 'Community Partner', value: 'community' },
                    ],
                  },
                  initialValue: 'official',
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'tier',
                  media: 'logo',
                },
              },
            },
          ],
        },
        {
          name: 'style',
          type: 'string',
          title: 'Display Style',
          options: {
            list: [
              { title: 'Equal Size Grid', value: 'grid' },
              { title: 'Tiered by Partnership', value: 'tiered' },
              { title: 'Carousel/Slider', value: 'carousel' },
              { title: 'Floating Animation', value: 'floating' },
            ],
          },
          initialValue: 'tiered',
        },
      ],
      hidden: ({ parent }) => parent?.layout !== 'logo-wall',
    }),
    defineField({
      name: 'styling',
      type: 'object',
      title: 'Section Styling',
      fields: [
        {
          name: 'backgroundColor',
          type: 'string',
          title: 'Background Color',
          options: {
            list: [
              { title: 'White', value: 'white' },
              { title: 'Off White', value: 'off-white' },
              { title: 'Black', value: 'black' },
              { title: 'Volt Yellow', value: 'volt' },
              { title: 'Transparent', value: 'transparent' },
            ],
          },
          initialValue: 'white',
        },
        {
          name: 'spacing',
          type: 'string',
          title: 'Section Spacing',
          options: {
            list: [
              { title: 'Compact', value: 'compact' },
              { title: 'Normal', value: 'normal' },
              { title: 'Spacious', value: 'spacious' },
              { title: 'Extra Spacious', value: 'xl' },
            ],
          },
          initialValue: 'normal',
        },
        {
          name: 'animation',
          type: 'string',
          title: 'Entrance Animation',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Fade In', value: 'fade' },
              { title: 'Slide Up', value: 'slide-up' },
              { title: 'Scale In', value: 'scale' },
              { title: 'Brand Motion', value: 'brand-motion' },
            ],
          },
          initialValue: 'fade',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'layout',
      media: 'gallery.images.0',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Media Section',
        subtitle: `Layout: ${subtitle || 'gallery'}`,
        media: media || undefined,
      }
    },
  },
})