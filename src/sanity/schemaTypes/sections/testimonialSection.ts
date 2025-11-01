import { defineField, defineType } from 'sanity'
import { stylingSectionSchema, typographySectionSchema } from '../shared/styling'

export const testimonialSection = defineType({
  name: 'testimonialSection',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
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
      name: 'layout',
      type: 'string',
      title: 'Layout Style',
      options: {
        list: [
          { title: 'Single Feature', value: 'single' },
          { title: 'Two Column Grid', value: 'grid-2' },
          { title: 'Three Column Grid', value: 'grid-3' },
          { title: 'Carousel/Slider', value: 'carousel' },
          { title: 'Masonry Layout', value: 'masonry' },
        ],
      },
      initialValue: 'grid-3',
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      title: 'Testimonials',
      of: [
        {
          type: 'object',
          title: 'Testimonial',
          fields: [
            {
              name: 'quote',
              type: 'text',
              title: 'Testimonial Quote',
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
                  title: 'Author Name',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'title',
                  type: 'string',
                  title: 'Author Title/Position',
                },
                {
                  name: 'company',
                  type: 'string',
                  title: 'Company/Organization',
                },
                {
                  name: 'image',
                  type: 'image',
                  title: 'Author Photo',
                  options: { hotspot: true },
                },
                {
                  name: 'location',
                  type: 'string',
                  title: 'Location',
                },
              ],
            },
            {
              name: 'rating',
              type: 'number',
              title: 'Star Rating (1-5)',
              validation: (Rule) => Rule.min(1).max(5),
              options: {
                range: { min: 1, max: 5, step: 0.5 },
              },
            },
            {
              name: 'featured',
              type: 'boolean',
              title: 'Featured Testimonial',
              description: 'Highlight this testimonial',
              initialValue: false,
            },
            {
              name: 'videoUrl',
              type: 'url',
              title: 'Video Testimonial URL',
              description: 'Optional video version of the testimonial',
            },
          ],
          preview: {
            select: {
              quote: 'quote',
              authorName: 'author.name',
              authorImage: 'author.image',
              rating: 'rating',
            },
            prepare({ quote, authorName, authorImage, rating }) {
              return {
                title: authorName || 'Anonymous',
                subtitle: `${rating ? '⭐'.repeat(Math.floor(rating)) : ''} "${quote?.slice(0, 60)}..."`,
                media: authorImage,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'showRatings',
      type: 'boolean',
      title: 'Show Star Ratings',
      initialValue: true,
    }),
    defineField({
      name: 'backgroundStyle',
      type: 'string',
      title: 'Background Style',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Branded Gradient', value: 'gradient' },
          { title: 'Light Background', value: 'light' },
          { title: 'Dark Background', value: 'dark' },
        ],
      },
      initialValue: 'default',
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
      layout: 'layout',
      testimonialCount: 'testimonials.length',
    },
    prepare({ title, layout, testimonialCount }) {
      return {
        title: title || 'Testimonials Section',
        subtitle: `${layout || 'grid-3'} layout • ${testimonialCount || 0} testimonials`,
      }
    },
  },
})