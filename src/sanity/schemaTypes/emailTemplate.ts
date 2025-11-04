import { defineField, defineType } from 'sanity'

export const emailTemplate = defineType({
  name: 'emailTemplate',
  title: 'Email Template',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Template Name',
      description: 'Internal name for this email template',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'templateId',
      type: 'string',
      title: 'Template ID',
      description: 'Unique identifier (e.g., "welcome-email")',
      validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/),
    }),
    defineField({
      name: 'subject',
      type: 'string',
      title: 'Email Subject',
      description: 'Subject line for the email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preheader',
      type: 'string',
      title: 'Preheader Text',
      description: 'Preview text shown in inbox (optional)',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Email Content',
      description: 'Main content of the email. Use {{email}}, {{firstName}} for personalization.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'signature',
      type: 'text',
      title: 'Email Signature',
      description: 'Closing signature (e.g., "Warm regards, Saga & the Sensational Team")',
      rows: 3,
    }),
    defineField({
      name: 'ctaButton',
      type: 'object',
      title: 'Call-to-Action Button',
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
    }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      title: 'Social Media Links',
      fields: [
        { name: 'youtube', type: 'url', title: 'YouTube URL' },
        { name: 'instagram', type: 'url', title: 'Instagram URL' },
        { name: 'facebook', type: 'url', title: 'Facebook URL' },
        { name: 'tiktok', type: 'url', title: 'TikTok URL' },
        { name: 'twitter', type: 'url', title: 'X (Twitter) URL' },
      ],
    }),
    defineField({
      name: 'enabled',
      type: 'boolean',
      title: 'Enabled',
      description: 'Enable this template for use',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'templateId',
      enabled: 'enabled',
    },
    prepare({ title, subtitle, enabled }) {
      return {
        title: title || 'Untitled Template',
        subtitle: `${subtitle} ${enabled ? '✅' : '❌ Disabled'}`,
      }
    },
  },
})
