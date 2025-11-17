import { defineField, defineType } from 'sanity'

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
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      fields: [
        {
          name: 'logo',
          type: 'image',
          title: 'Hero Logo',
          description: 'Large logo displayed at the top of the hero section',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Alternative text for accessibility',
            },
            {
              name: 'width',
              type: 'number',
              title: 'Width (pixels)',
              description: 'Custom width in pixels (e.g., 200). Leave empty for responsive default.',
            },
            {
              name: 'height',
              type: 'number',
              title: 'Height (pixels)',
              description: 'Custom height in pixels (e.g., 200). Leave empty for responsive default.',
            },
            {
              name: 'objectFit',
              type: 'string',
              title: 'Image Fit',
              description: 'How the image should fit within its container',
              options: {
                list: [
                  { title: 'Cover (fill container, may crop)', value: 'cover' },
                  { title: 'Contain (fit within container, no crop)', value: 'contain' },
                  { title: 'Fill (stretch to fit)', value: 'fill' },
                  { title: 'None (original size)', value: 'none' },
                  { title: 'Scale Down (smaller of contain or none)', value: 'scale-down' },
                ],
              },
              initialValue: 'cover',
            },
          ],
        },
        {
          name: 'headline',
          type: 'styledText',
          title: 'Headline',
          description: 'Main headline - select text and apply colors from the toolbar',
        },
        {
          name: 'video',
          type: 'object',
          title: 'Hero Video',
          description: 'Optional autoplay hero video (MP4, WebM, Vimeo, or direct CDN URL)',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Video URL',
              description: 'Direct video file URL (MP4/WebM) or embeddable link',
            },
            {
              name: 'poster',
              type: 'image',
              title: 'Poster Image',
              description: 'Fallback image when the video cannot autoplay',
              options: { hotspot: true },
              fields: [
                { name: 'alt', type: 'string', title: 'Alt text' },
              ],
            },
            {
              name: 'credit',
              type: 'string',
              title: 'Video Credit',
              description: 'Optional credit line (e.g., "Film by Foldager")',
            },
            {
              name: 'variants',
              type: 'object',
              title: 'Video Variants',
              description: 'Optional device-specific URLs (desktop/tablet/mobile) for MP4/WebM sources',
              fields: [
                { name: 'wide', type: 'url', title: 'Desktop / Wide URL' },
                { name: 'square', type: 'url', title: 'Tablet / Square URL' },
                { name: 'vertical', type: 'url', title: 'Mobile / Vertical URL' },
              ],
            },
          ],
        },
        {
          name: 'subline',
          type: 'text',
          title: 'Subline',
          description: 'Descriptive text below the headline',
          rows: 2,
        },
        {
          name: 'ctaText',
          type: 'string',
          title: 'CTA Button Text',
          description: 'Text for the call-to-action button',
        },
        {
          name: 'ctaLink',
          type: 'url',
          title: 'CTA Button Link',
          description: 'URL opened when the CTA button is clicked (e.g., Typeform application)',
        },
        {
          name: 'ctaDescription',
          type: 'text',
          title: 'CTA Helper Copy',
          description: 'Short description that appears inside the application card',
          rows: 3,
        },
        {
          name: 'stats',
          type: 'array',
          title: 'Stats',
          description: 'Statistics displayed in the hero section',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', type: 'string', title: 'Value' },
              { name: 'label', type: 'string', title: 'Label' },
            ],
          }],
        },
        {
          name: 'images',
          type: 'array',
          title: 'Hero Images',
          description: 'Gallery images displayed below the stats (4 images recommended)',
          of: [{
            type: 'image',
            options: {
              hotspot: true,
            },
            fields: [
              {
                name: 'alt',
                type: 'string',
                title: 'Alt Text',
                description: 'Alternative text for accessibility',
              },
              {
                name: 'width',
                type: 'number',
                title: 'Width (pixels)',
                description: 'Custom width. Leave empty for responsive default.',
              },
              {
                name: 'height',
                type: 'number',
                title: 'Height (pixels)',
                description: 'Custom height. Leave empty for responsive default.',
              },
              {
                name: 'objectFit',
                type: 'string',
                title: 'Image Fit',
                description: 'How the image should fit',
                options: {
                  list: [
                    { title: 'Cover (fill, may crop)', value: 'cover' },
                    { title: 'Contain (fit, no crop)', value: 'contain' },
                    { title: 'Fill (stretch)', value: 'fill' },
                  ],
                },
                initialValue: 'cover',
              },
            ],
          }],
          validation: (Rule) => Rule.max(8),
        },
        {
          name: 'countdown',
          type: 'object',
          title: 'Countdown Timer',
          description: 'Display a live countdown for key deadlines',
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Show Countdown',
              initialValue: true,
            },
            {
              name: 'label',
              type: 'string',
              title: 'Countdown Label',
              description: 'e.g., "Applications close"',
            },
            {
              name: 'deadline',
              type: 'datetime',
              title: 'Deadline',
              description: 'Cutoff date and time (e.g., 2026-01-01T23:59:00+01:00)',
            },
            {
              name: 'timezone',
              type: 'string',
              title: 'Timezone Label',
              description: 'Optional timezone descriptor (e.g., CET)',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'pressCta',
      type: 'object',
      title: 'Press CTA',
      fields: [
        { name: 'label', type: 'string', title: 'Label', initialValue: 'Press release' },
        { name: 'emoji', type: 'string', title: 'Emoji/Icon', description: 'Optional emoji or short label to prepend' },
        { name: 'href', type: 'url', title: 'Link URL', initialValue: '/press' },
        { name: 'buttonText', type: 'string', title: 'Button text', initialValue: 'Press release' }
      ],
    }),
    defineField({
      name: 'application',
      type: 'object',
      title: 'Player Draft Application',
      fields: [
        defineField({
          name: 'card',
          type: 'object',
          title: 'Hero Application Card',
          fields: [
            { name: 'badge', type: 'string', title: 'Badge', initialValue: 'Player Draft 2025–26' },
            { name: 'title', type: 'string', title: 'Card Title', initialValue: 'We’re looking for 80 football players' },
            { name: 'description', type: 'text', rows: 3, title: 'Description' },
            { name: 'ctaText', type: 'string', title: 'CTA Text', initialValue: 'Apply now' },
            { name: 'ctaLink', type: 'url', title: 'CTA Link / Typeform URL' },
            { name: 'helperText', type: 'string', title: 'Helper text', description: 'Appears below the countdown helper copy' },
            { name: 'countdownLabel', type: 'string', title: 'Countdown helper label', initialValue: 'Applications close Jan 1, 2026' },
            { name: 'formId', type: 'string', title: 'Typeform Form ID Override' },
            { name: 'resourceEyebrow', type: 'string', title: 'Resource Eyebrow', initialValue: 'Need more info?' },
            { name: 'resourceLinkLabel', type: 'string', title: 'Resource Link Label', initialValue: 'Read about the league & player draft' },
            { name: 'resourceLinkHref', type: 'url', title: 'Resource Link URL', initialValue: '/about-the-league-player-draft' },
          ],
        }),
        defineField({
          name: 'embed',
          type: 'object',
          title: 'Inline Typeform Section',
          fields: [
            { name: 'enabled', type: 'boolean', title: 'Show inline Typeform', initialValue: false },
            { name: 'badge', type: 'string', title: 'Badge', initialValue: 'Apply to play' },
            { name: 'title', type: 'string', title: 'Headline', initialValue: 'Start your Sensational League Player Draft application' },
            { name: 'description', type: 'text', rows: 3, title: 'Description' },
            {
              name: 'bulletPoints',
              type: 'array',
              title: 'Bullet Points',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            },
            { name: 'deadlineNote', type: 'string', title: 'Deadline Note' },
            { name: 'formId', type: 'string', title: 'Typeform Form ID Override' },
            { name: 'height', type: 'number', title: 'Embed Height (px)', initialValue: 760 },
          ],
        }),
      ],
    }),
    defineField({
      name: 'about',
      type: 'object',
      title: 'About Section',
      fields: [
        {
          name: 'title',
          type: 'styledText',
          title: 'Section Title',
          description: 'Main title - select text and apply colors from the toolbar',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          description: 'Main description text',
          rows: 3,
        },
        {
          name: 'pillars',
          type: 'array',
          title: 'Key Features',
          description: 'The key features/pillars of the league (4 recommended for grid layout)',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Feature Title' },
              { name: 'description', type: 'text', title: 'Description', rows: 2 },
            ],
          }],
          validation: (Rule) => Rule.min(1).max(8),
        },
        {
          name: 'infoCard',
          type: 'object',
          title: 'Highlight Card',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'body', type: 'text', rows: 3, title: 'Body' },
          ],
        },
      ],
    }),
    defineField({
      name: 'whySection',
      type: 'object',
      title: 'Why Sensational Section',
      fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow' },
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'subtitle', type: 'text', title: 'Subtitle', rows: 3 },
        defineField({
          name: 'statements',
          type: 'array',
          title: 'Statements',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description', rows: 3 },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'formatSection',
      type: 'object',
      title: 'Format Section',
      fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow' },
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'subtitle', type: 'text', title: 'Subtitle', rows: 3 },
        defineField({
          name: 'coreConcepts',
          type: 'array',
          title: 'Core Concepts',
          of: [{ type: 'text' }],
        }),
        defineField({
          name: 'designedFor',
          type: 'object',
          title: 'Designed For Card',
          fields: [
            { name: 'eyebrow', type: 'string', title: 'Eyebrow', initialValue: 'Designed for modern players' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
            defineField({
              name: 'features',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'captainsSection',
      type: 'object',
      title: 'Captains Section',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show captains section',
          description: 'Toggle to display or hide the captains spotlight on the homepage and navigation.',
          initialValue: false,
        },
        { name: 'eyebrow', type: 'string', title: 'Eyebrow', initialValue: 'Captains' },
        { name: 'title', type: 'string', title: 'Title', initialValue: 'Meet Our Captains' },
        { name: 'subtitle', type: 'text', title: 'Subtitle', rows: 3 },
        { name: 'intro', type: 'text', title: 'Intro text', rows: 3 },
        defineField({
          name: 'captains',
          type: 'array',
          title: 'Captains',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', type: 'string', title: 'Name' },
                { name: 'tagline', type: 'string', title: 'Tagline' },
                { name: 'summary', type: 'text', title: 'Summary', rows: 3 },
                { name: 'superpower', type: 'string', title: 'Superpower' },
                { name: 'oneLiner', type: 'string', title: 'One-sentence highlight' },
                { name: 'bio', type: 'text', title: 'Longer bio', rows: 4 },
                {
                  name: 'photo',
                  type: 'image',
                  title: 'Photo',
                  options: { hotspot: true },
                  fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
                },
                {
                  name: 'videoUrl',
                  type: 'url',
                  title: 'Intro Video URL',
                  description: 'MP4 or CDN URL served via Cloudflare R2/Worker',
                },
              ],
            },
          ],
          validation: (Rule) => Rule.min(1),
        }),
      ],
    }),
    defineField({
      name: 'impact',
      type: 'object',
      title: 'Impact Section',
      fields: [
        {
          name: 'headline',
          type: 'array',
          title: 'Headline',
          of: [{ type: 'block' }],
        },
        {
          name: 'stats',
          type: 'array',
          title: 'Stats',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', type: 'string', title: 'Value' },
                { name: 'label', type: 'string', title: 'Label' },
              ],
            },
          ],
        },
        { name: 'quoteText', type: 'text', title: 'Quote Text', rows: 4 },
        { name: 'quoteAttribution', type: 'string', title: 'Quote Attribution' },
      ],
    }),
    defineField({
      name: 'cta',
      type: 'object',
      title: 'Call To Action',
      fields: [
        { name: 'headline', type: 'string', title: 'Headline' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'buttonText', type: 'string', title: 'Button Text' },
      ],
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Additional Homepage Sections',
      description: 'Add flexible sections for galleries, explainers, or player draft content',
      of: [
        { type: 'flexibleSection' },
        { type: 'contentSection' },
        { type: 'mediaSection' },
        { type: 'statsSection' },
        { type: 'partnersSection' },
        { type: 'faqSection' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Home Page',
        subtitle: 'Homepage content',
      }
    },
  },
})
