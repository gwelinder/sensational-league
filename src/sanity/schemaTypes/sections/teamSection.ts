import { defineField, defineType } from 'sanity'
import { stylingSectionSchema, typographySectionSchema } from '../shared/styling'

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Team Section',
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
      title: 'Team Layout',
      options: {
        list: [
          { title: 'Grid Layout', value: 'grid' },
          { title: 'Card Layout', value: 'cards' },
          { title: 'List Layout', value: 'list' },
          { title: 'Organizational Chart', value: 'org-chart' },
          { title: 'Feature Spotlight', value: 'spotlight' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'teamCategories',
      type: 'array',
      title: 'Team Categories',
      description: 'Group team members by department or role',
      of: [
        {
          type: 'object',
          title: 'Team Category',
          fields: [
            {
              name: 'categoryName',
              type: 'string',
              title: 'Category Name',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Category Description',
              rows: 2,
            },
            {
              name: 'members',
              type: 'array',
              title: 'Team Members',
              of: [
                {
                  type: 'object',
                  title: 'Team Member',
                  fields: [
                    {
                      name: 'name',
                      type: 'string',
                      title: 'Full Name',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'role',
                      type: 'string',
                      title: 'Job Title/Role',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'bio',
                      type: 'text',
                      title: 'Biography',
                      description: 'Brief professional bio',
                      rows: 4,
                    },
                    {
                      name: 'image',
                      type: 'image',
                      title: 'Profile Photo',
                      options: { hotspot: true },
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'experience',
                      type: 'string',
                      title: 'Years of Experience',
                    },
                    {
                      name: 'specialties',
                      type: 'array',
                      title: 'Specialties/Skills',
                      of: [{ type: 'string' }],
                      options: {
                        layout: 'tags',
                      },
                    },
                    {
                      name: 'education',
                      type: 'array',
                      title: 'Education',
                      of: [
                        {
                          type: 'object',
                          title: 'Education',
                          fields: [
                            {
                              name: 'institution',
                              type: 'string',
                              title: 'Institution',
                            },
                            {
                              name: 'degree',
                              type: 'string',
                              title: 'Degree/Certificate',
                            },
                            {
                              name: 'year',
                              type: 'string',
                              title: 'Year',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: 'achievements',
                      type: 'array',
                      title: 'Key Achievements',
                      of: [{ type: 'string' }],
                    },
                    {
                      name: 'socialLinks',
                      type: 'array',
                      title: 'Social Media Links',
                      of: [
                        {
                          type: 'object',
                          title: 'Social Link',
                          fields: [
                            {
                              name: 'platform',
                              type: 'string',
                              title: 'Platform',
                              options: {
                                list: [
                                  { title: 'LinkedIn', value: 'linkedin' },
                                  { title: 'Twitter', value: 'twitter' },
                                  { title: 'Instagram', value: 'instagram' },
                                  { title: 'Facebook', value: 'facebook' },
                                  { title: 'Email', value: 'email' },
                                  { title: 'Website', value: 'website' },
                                ],
                              },
                            },
                            {
                              name: 'url',
                              type: 'url',
                              title: 'Profile URL',
                              validation: (Rule) => Rule.required(),
                            },
                            {
                              name: 'username',
                              type: 'string',
                              title: 'Username/Handle',
                            },
                          ],
                          preview: {
                            select: {
                              platform: 'platform',
                              username: 'username',
                              url: 'url',
                            },
                            prepare({ platform, username, url }) {
                              return {
                                title: platform || 'Social Link',
                                subtitle: username || url,
                              }
                            },
                          },
                        },
                      ],
                    },
                    {
                      name: 'quote',
                      type: 'text',
                      title: 'Personal Quote',
                      description: 'Inspirational or personal quote from the team member',
                      rows: 2,
                    },
                    {
                      name: 'funFacts',
                      type: 'array',
                      title: 'Fun Facts',
                      description: 'Interesting personal facts to humanize the profile',
                      of: [{ type: 'string' }],
                    },
                    {
                      name: 'status',
                      type: 'string',
                      title: 'Employment Status',
                      options: {
                        list: [
                          { title: 'Full-time', value: 'full-time' },
                          { title: 'Part-time', value: 'part-time' },
                          { title: 'Consultant', value: 'consultant' },
                          { title: 'Volunteer', value: 'volunteer' },
                          { title: 'Advisor', value: 'advisor' },
                          { title: 'Former', value: 'former' },
                        ],
                      },
                      initialValue: 'full-time',
                    },
                    {
                      name: 'featured',
                      type: 'boolean',
                      title: 'Featured Team Member',
                      description: 'Highlight this person prominently',
                      initialValue: false,
                    },
                    {
                      name: 'startDate',
                      type: 'date',
                      title: 'Start Date',
                      description: 'When they joined the team',
                    },
                    {
                      name: 'location',
                      type: 'string',
                      title: 'Location',
                      description: 'City, state/country where they work',
                    },
                  ],
                  preview: {
                    select: {
                      name: 'name',
                      role: 'role',
                      image: 'image',
                      featured: 'featured',
                      status: 'status',
                    },
                    prepare({ name, role, image, featured, status }) {
                      return {
                        title: name || 'Untitled Member',
                        subtitle: `${role || 'No role'}${featured ? ' ⭐' : ''} • ${status || 'full-time'}`,
                        media: image,
                      }
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1),
            },
          ],
          preview: {
            select: {
              categoryName: 'categoryName',
              memberCount: 'members.length',
            },
            prepare({ categoryName, memberCount }) {
              return {
                title: categoryName || 'Untitled Category',
                subtitle: `${memberCount || 0} members`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'showFilters',
      type: 'boolean',
      title: 'Show Category Filters',
      description: 'Allow users to filter team members by category',
      initialValue: true,
    }),
    defineField({
      name: 'showSearch',
      type: 'boolean',
      title: 'Show Search Function',
      description: 'Allow users to search team members',
      initialValue: false,
    }),
    defineField({
      name: 'displayOptions',
      type: 'object',
      title: 'Display Options',
      fields: [
        {
          name: 'showBio',
          type: 'boolean',
          title: 'Show Member Bios',
          initialValue: true,
        },
        {
          name: 'showSocialLinks',
          type: 'boolean',
          title: 'Show Social Media Links',
          initialValue: true,
        },
        {
          name: 'showSpecialties',
          type: 'boolean',
          title: 'Show Specialties/Skills',
          initialValue: true,
        },
        {
          name: 'showStartDate',
          type: 'boolean',
          title: 'Show Join Date',
          initialValue: false,
        },
        {
          name: 'showLocation',
          type: 'boolean',
          title: 'Show Location',
          initialValue: false,
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'joinTeamCta',
      type: 'object',
      title: 'Join Team Call-to-Action',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Join Team CTA',
          initialValue: false,
        },
        {
          name: 'title',
          type: 'string',
          title: 'CTA Title',
          initialValue: 'Want to Join Our Team?',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'description',
          type: 'text',
          title: 'CTA Description',
          rows: 2,
          initialValue: 'We\'re always looking for passionate people to join our mission.',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'buttonText',
          type: 'string',
          title: 'Button Text',
          initialValue: 'View Open Positions',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'buttonUrl',
          type: 'string',
          title: 'Button URL',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
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
      categoryCount: 'teamCategories.length',
    },
    prepare({ title, layout, categoryCount }) {
      return {
        title: title || 'Team Section',
        subtitle: `${layout || 'grid'} layout • ${categoryCount || 0} categories`,
      }
    },
  },
})