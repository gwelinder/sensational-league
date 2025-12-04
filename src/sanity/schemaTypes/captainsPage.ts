import { defineField, defineType } from 'sanity'

/**
 * Captains Page Schema
 *
 * This controls the /captains overview page content.
 * Individual captain profiles are edited in the 'captain' document type.
 */
export const captainsPage = defineType({
  name: 'captainsPage',
  title: 'Captains Page',
  type: 'document',
  groups: [
    {
      name: 'hero',
      title: '🎬 Hero',
      default: true,
    },
    {
      name: 'display',
      title: '📋 Display Settings',
    },
    {
      name: 'cta',
      title: '📣 Call to Action',
    },
    {
      name: 'seo',
      title: '🔍 SEO',
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════════
    // HERO SECTION
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow Text',
      description: 'Small text above the title (e.g., "The Sensational Six")',
      initialValue: 'The Sensational Six',
      group: 'hero',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'Main headline on the page',
      initialValue: 'Meet Our Captains',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Subtitle',
      description: 'Descriptive text below the title',
      rows: 3,
      initialValue: 'Six icons of Danish football bring elite experience, cultural impact, and unstoppable energy to the league. These legendary leaders are turning the Sensational 80 into a movement.',
      group: 'hero',
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // DISPLAY SETTINGS
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'displayStyle',
      type: 'string',
      title: 'Display Style',
      description: 'How to show the captains grid',
      options: {
        list: [
          { title: 'Grid (2-3 columns)', value: 'grid' },
          { title: 'Large cards (2 columns)', value: 'large' },
          { title: 'List view', value: 'list' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
      group: 'display',
    }),
    defineField({
      name: 'showStats',
      type: 'boolean',
      title: 'Show Stats Badge',
      description: 'Display national caps badge on captain cards',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'showVideo',
      type: 'boolean',
      title: 'Enable Video Preview',
      description: 'Allow video preview on hover (if captain has video)',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'emptyStateTitle',
      type: 'string',
      title: 'Empty State Title',
      description: 'Message when no captains are published',
      initialValue: 'Captain profiles coming soon...',
      group: 'display',
    }),
    defineField({
      name: 'emptyStateSubtitle',
      type: 'string',
      title: 'Empty State Subtitle',
      initialValue: 'Check back after the team captains are announced.',
      group: 'display',
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // CTA SECTION
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'ctaEnabled',
      type: 'boolean',
      title: 'Show CTA Section',
      description: 'Display the call-to-action section at the bottom',
      initialValue: true,
      group: 'cta',
    }),
    defineField({
      name: 'ctaTitle',
      type: 'string',
      title: 'CTA Title',
      initialValue: 'Want to Play for a Captain?',
      group: 'cta',
    }),
    defineField({
      name: 'ctaDescription',
      type: 'text',
      title: 'CTA Description',
      rows: 2,
      initialValue: 'Submit your player draft application and get noticed by our legendary captains.',
      group: 'cta',
    }),
    defineField({
      name: 'ctaButtonText',
      type: 'string',
      title: 'CTA Button Text',
      initialValue: 'Start Application',
      group: 'cta',
    }),
    defineField({
      name: 'ctaButtonLink',
      type: 'string',
      title: 'CTA Button Link',
      description: 'Where the button links to',
      initialValue: '/player-draft',
      group: 'cta',
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // SEO
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO Settings',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Title for search engines (defaults to page title if empty)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Description for search engines',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Captains Page',
        subtitle: 'Captains overview page content',
      }
    },
  },
})
