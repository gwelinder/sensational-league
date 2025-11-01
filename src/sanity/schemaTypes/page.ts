import { defineField, defineType, defineArrayMember } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Page Slug',
      description: 'The URL path for this page (e.g., "about-us")',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      type: 'string',
      title: 'Page Type',
      description: 'Define the purpose and structure of this page',
      options: {
        list: [
          { title: 'Standard Page', value: 'standard' },
          { title: 'Landing Page', value: 'landing' },
          { title: 'Event Page', value: 'event' },
          { title: 'Team Profile', value: 'team' },
          { title: 'News Article', value: 'news' },
          { title: 'Resource Hub', value: 'resource' },
          { title: 'Contact Page', value: 'contact' },
        ],
      },
      initialValue: 'standard',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Title for search engines and social media',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Description for search engines and social media',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Media Image',
          description: 'Image for social media sharing',
          options: { hotspot: true },
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Keywords',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: 'hero',
      type: 'object',
      title: 'Page Hero Section',
      description: 'Optional hero section for the page',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Enable Hero Section',
          initialValue: true,
        },
        {
          name: 'style',
          type: 'string',
          title: 'Hero Style',
          options: {
            list: [
              { title: 'Minimal', value: 'minimal' },
              { title: 'Full Height', value: 'full' },
              { title: 'Split Layout', value: 'split' },
              { title: 'Video Background', value: 'video' },
              { title: 'Image Background', value: 'image' },
            ],
          },
          initialValue: 'minimal',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'headline',
          type: 'string',
          title: 'Hero Headline',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'subtitle',
          type: 'text',
          title: 'Hero Subtitle',
          rows: 2,
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'backgroundImage',
          type: 'image',
          title: 'Background Image',
          options: { hotspot: true },
          hidden: ({ parent }) => !parent?.enabled || parent?.style !== 'image',
        },
        {
          name: 'backgroundVideo',
          type: 'url',
          title: 'Background Video URL',
          hidden: ({ parent }) => !parent?.enabled || parent?.style !== 'video',
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
              type: 'string',
              title: 'Button URL',
            },
            {
              name: 'style',
              type: 'string',
              title: 'Button Style',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Ghost', value: 'ghost' },
                ],
              },
              initialValue: 'primary',
            },
          ],
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      description: 'Build your page with flexible sections',
      of: [
        defineArrayMember({
          type: 'heroSection',
          title: 'Simple Hero Section',
        }),
        defineArrayMember({
          type: 'advancedHeroSection',
          title: 'Advanced Hero Section',
        }),
        defineArrayMember({
          type: 'contentSection',
          title: 'Content Section',
        }),
        defineArrayMember({
          type: 'mediaSection',
          title: 'Media Section',
        }),
        defineArrayMember({
          type: 'statsSection',
          title: 'Statistics & Impact Section',
        }),
        defineArrayMember({
          type: 'signupSection',
          title: 'Signup Section',
        }),
        defineArrayMember({
          type: 'partnersSection',
          title: 'Partners Section',
        }),
        defineArrayMember({
          type: 'flexibleSection',
          title: 'Flexible Content Section',
        }),
        defineArrayMember({
          type: 'testimonialSection',
          title: 'Testimonials Section',
        }),
        defineArrayMember({
          type: 'faqSection',
          title: 'FAQ Section',
        }),
        defineArrayMember({
          type: 'timelineSection',
          title: 'Timeline Section',
        }),
        defineArrayMember({
          type: 'pricingSection',
          title: 'Pricing Section',
        }),
        defineArrayMember({
          type: 'contactSection',
          title: 'Contact Section',
        }),
        defineArrayMember({
          type: 'teamSection',
          title: 'Team Section',
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'When this page was published',
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Publication Status',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
      status: 'status',
      media: 'seo.ogImage',
    },
    prepare({ title, pageType, status, media }) {
      return {
        title: title || 'Untitled Page',
        subtitle: `${pageType || 'standard'} • ${status || 'draft'}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Publication Date',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Page Type',
      name: 'pageTypeAsc',
      by: [{ field: 'pageType', direction: 'asc' }],
    },
  ],
})