import { defineField, defineType, defineArrayMember } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'This is for internal reference only',
      initialValue: 'Home Page',
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
      ],
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      description: 'Drag and drop to reorder sections',
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
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sectionsCount: 'sections.length',
    },
    prepare({ title, sectionsCount }) {
      return {
        title: title || 'Home Page',
        subtitle: `${sectionsCount || 0} sections`,
      }
    },
  },
})
