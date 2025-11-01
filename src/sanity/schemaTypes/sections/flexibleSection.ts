import { defineField, defineType } from 'sanity'
import { stylingSectionSchema, typographySectionSchema } from '../shared/styling'

export const flexibleSection = defineType({
  name: 'flexibleSection',
  title: 'Flexible Content Section',
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
      title: 'Layout Type',
      options: {
        list: [
          { title: 'Hero Banner', value: 'hero' },
          { title: 'Split Content (50/50)', value: 'split' },
          { title: 'Feature Cards Grid', value: 'feature-grid' },
          { title: 'Image Gallery', value: 'gallery' },
          { title: 'Text + Media', value: 'text-media' },
          { title: 'Call-to-Action Block', value: 'cta-block' },
          { title: 'Quote + Stats', value: 'quote-stats' },
          { title: 'Full-Width Content', value: 'full-width' },
          { title: 'Masonry Layout', value: 'masonry' },
          { title: 'Carousel/Slider', value: 'carousel' },
          { title: 'Tabs Layout', value: 'tabs' },
          { title: 'Accordion Layout', value: 'accordion' },
          { title: 'Three Column', value: 'three-column' },
          { title: 'Four Column', value: 'four-column' },
          { title: 'Asymmetric Grid', value: 'asymmetric' },
          { title: 'Magazine Style', value: 'magazine' },
          { title: 'Sidebar Layout', value: 'sidebar' },
          { title: 'Overlap Layout', value: 'overlap' },
        ],
      },
      initialValue: 'split',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content Blocks',
      description: 'Flexible content blocks that adapt to the layout',
      of: [
        {
          type: 'object',
          title: 'Rich Text Block',
          name: 'richText',
          fields: [
            {
              name: 'content',
              type: 'blockContent',
              title: 'Content',
            },
          ],
          preview: {
            prepare() {
              return {
                title: 'Rich Text Block',
                media: '📝',
              }
            },
          },
        },
        {
          type: 'object',
          title: 'Image Block',
          name: 'imageBlock',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Important for accessibility',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'size',
              type: 'string',
              title: 'Image Size',
              options: {
                list: [
                  { title: 'Small', value: 'small' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Large', value: 'large' },
                  { title: 'Full Width', value: 'full' },
                ],
              },
              initialValue: 'medium',
            },
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Image Block',
                media: media,
              }
            },
          },
        },
        {
          type: 'object',
          title: 'Feature Card',
          name: 'featureCard',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Feature Title',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Feature Description',
              rows: 3,
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: [
                  { title: 'Lightning', value: '⚡' },
                  { title: 'Star', value: '⭐' },
                  { title: 'Heart', value: '❤️' },
                  { title: 'Trophy', value: '🏆' },
                  { title: 'Target', value: '🎯' },
                  { title: 'Globe', value: '🌍' },
                  { title: 'Rocket', value: '🚀' },
                  { title: 'Shield', value: '🛡️' },
                  { title: 'Spark Logo', value: 'spark' },
                ],
              },
              initialValue: '⚡',
            },
            {
              name: 'link',
              type: 'object',
              title: 'Optional Link',
              fields: [
                {
                  name: 'text',
                  type: 'string',
                  title: 'Link Text',
                },
                {
                  name: 'url',
                  type: 'url',
                  title: 'Link URL',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              icon: 'icon',
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: title || 'Feature Card',
                subtitle: subtitle?.slice(0, 50) + '...' || '',
                media: icon === 'spark' ? '⭐' : icon,
              }
            },
          },
        },
        {
          type: 'object',
          title: 'CTA Button',
          name: 'ctaButton',
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
                  { title: 'Large Primary', value: 'large-primary' },
                ],
              },
              initialValue: 'primary',
            },
            {
              name: 'size',
              type: 'string',
              title: 'Button Size',
              options: {
                list: [
                  { title: 'Small', value: 'sm' },
                  { title: 'Medium', value: 'md' },
                  { title: 'Large', value: 'lg' },
                  { title: 'Extra Large', value: 'xl' },
                ],
              },
              initialValue: 'md',
            },
          ],
          preview: {
            select: {
              title: 'text',
              style: 'style',
            },
            prepare({ title, style }) {
              return {
                title: title || 'CTA Button',
                subtitle: `Style: ${style || 'primary'}`,
                media: '🔘',
              }
            },
          },
        },
        {
          type: 'object',
          title: 'Video Embed',
          name: 'videoEmbed',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Video URL',
              description: 'YouTube, Vimeo, or direct video file URL',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              type: 'string',
              title: 'Video Title',
            },
            {
              name: 'thumbnail',
              type: 'image',
              title: 'Custom Thumbnail',
              description: 'Optional custom thumbnail image',
              options: { hotspot: true },
            },
            {
              name: 'aspectRatio',
              type: 'string',
              title: 'Aspect Ratio',
              options: {
                list: [
                  { title: '16:9 (Widescreen)', value: '16:9' },
                  { title: '4:3 (Standard)', value: '4:3' },
                  { title: '1:1 (Square)', value: '1:1' },
                  { title: '9:16 (Vertical)', value: '9:16' },
                ],
              },
              initialValue: '16:9',
            },
          ],
          preview: {
            select: {
              title: 'title',
              url: 'url',
            },
            prepare({ title, url }) {
              return {
                title: title || 'Video Embed',
                subtitle: url || 'No URL set',
                media: '📹',
              }
            },
          },
        },
        {
          type: 'callToActionBlock',
          title: 'Call to Action Block',
        },
        {
          type: 'statisticsBlock',
          title: 'Statistics Block',
        },
        {
          type: 'socialProofBlock',
          title: 'Social Proof Block',
        },
        {
          type: 'newsletterSignupBlock',
          title: 'Newsletter Signup Block',
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'gridSettings',
      type: 'object',
      title: 'Grid & Layout Settings',
      description: 'Configure how content blocks are arranged',
      fields: [
        {
          name: 'columns',
          type: 'string',
          title: 'Column Layout',
          options: {
            list: [
              { title: 'Auto (Responsive)', value: 'auto' },
              { title: '1 Column', value: '1' },
              { title: '2 Columns', value: '2' },
              { title: '3 Columns', value: '3' },
              { title: '4 Columns', value: '4' },
            ],
          },
          initialValue: 'auto',
          hidden: ({ parent }) => !['feature-grid', 'gallery'].includes(parent?.layout),
        },
        {
          name: 'gap',
          type: 'string',
          title: 'Spacing Between Items',
          options: {
            list: [
              { title: 'Tight', value: 'tight' },
              { title: 'Normal', value: 'normal' },
              { title: 'Loose', value: 'loose' },
              { title: 'Extra Loose', value: 'extra-loose' },
            ],
          },
          initialValue: 'normal',
        },
        {
          name: 'alignment',
          type: 'string',
          title: 'Content Alignment',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'left',
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
      contentCount: 'content.length',
    },
    prepare({ title, layout, contentCount }) {
      return {
        title: title || 'Flexible Section',
        subtitle: `${layout || 'split'} layout • ${contentCount || 0} blocks`,
      }
    },
  },
})