import { defineField, defineType } from 'sanity'
import { stylingSectionSchema, typographySectionSchema } from '../shared/styling'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
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
      title: 'Contact Layout',
      options: {
        list: [
          { title: 'Form + Info', value: 'form-info' },
          { title: 'Form Only', value: 'form-only' },
          { title: 'Contact Cards', value: 'cards' },
          { title: 'Split Layout', value: 'split' },
          { title: 'Map + Form', value: 'map-form' },
        ],
      },
      initialValue: 'form-info',
    }),
    defineField({
      name: 'contactForm',
      type: 'object',
      title: 'Contact Form',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Contact Form',
          initialValue: true,
        },
        {
          name: 'formTitle',
          type: 'string',
          title: 'Form Title',
          initialValue: 'Get in Touch',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'formDescription',
          type: 'text',
          title: 'Form Description',
          rows: 2,
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'fields',
          type: 'array',
          title: 'Form Fields',
          of: [
            {
              type: 'object',
              title: 'Form Field',
              fields: [
                {
                  name: 'label',
                  type: 'string',
                  title: 'Field Label',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'name',
                  type: 'string',
                  title: 'Field Name',
                  description: 'Technical name for form processing',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'type',
                  type: 'string',
                  title: 'Field Type',
                  options: {
                    list: [
                      { title: 'Text', value: 'text' },
                      { title: 'Email', value: 'email' },
                      { title: 'Phone', value: 'tel' },
                      { title: 'Number', value: 'number' },
                      { title: 'Textarea', value: 'textarea' },
                      { title: 'Select', value: 'select' },
                      { title: 'Checkbox', value: 'checkbox' },
                      { title: 'Radio', value: 'radio' },
                    ],
                  },
                  initialValue: 'text',
                },
                {
                  name: 'placeholder',
                  type: 'string',
                  title: 'Placeholder Text',
                },
                {
                  name: 'required',
                  type: 'boolean',
                  title: 'Required Field',
                  initialValue: false,
                },
                {
                  name: 'options',
                  type: 'array',
                  title: 'Options (for select/radio)',
                  of: [{ type: 'string' }],
                  hidden: ({ parent }) => !['select', 'radio'].includes(parent?.type),
                },
                {
                  name: 'validation',
                  type: 'string',
                  title: 'Validation Pattern',
                  description: 'Regex pattern for validation',
                },
              ],
              preview: {
                select: {
                  label: 'label',
                  type: 'type',
                  required: 'required',
                },
                prepare({ label, type, required }) {
                  return {
                    title: label || 'Untitled Field',
                    subtitle: `${type || 'text'}${required ? ' (required)' : ''}`,
                  }
                },
              },
            },
          ],
          initialValue: [
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Email', name: 'email', type: 'email', required: true },
            { label: 'Subject', name: 'subject', type: 'text', required: true },
            { label: 'Message', name: 'message', type: 'textarea', required: true },
          ],
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'submitButton',
          type: 'object',
          title: 'Submit Button',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
              initialValue: 'Send Message',
            },
            {
              name: 'style',
              type: 'string',
              title: 'Button Style',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                ],
              },
              initialValue: 'primary',
            },
          ],
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'successMessage',
          type: 'text',
          title: 'Success Message',
          description: 'Message shown after form submission',
          rows: 2,
          initialValue: 'Thank you for your message! We\'ll get back to you soon.',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: 'contactInfo',
      type: 'array',
      title: 'Contact Information',
      of: [
        {
          type: 'object',
          title: 'Contact Method',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Contact Type',
              options: {
                list: [
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'phone' },
                  { title: 'Address', value: 'address' },
                  { title: 'Social Media', value: 'social' },
                  { title: 'Office Hours', value: 'hours' },
                  { title: 'General Info', value: 'info' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: [
                  { title: 'Email', value: '📧' },
                  { title: 'Phone', value: '📞' },
                  { title: 'Location', value: '📍' },
                  { title: 'Clock', value: '🕐' },
                  { title: 'Instagram', value: '📷' },
                  { title: 'Twitter', value: '🐦' },
                  { title: 'LinkedIn', value: '💼' },
                  { title: 'Facebook', value: '👥' },
                  { title: 'Info', value: 'ℹ️' },
                ],
              },
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              type: 'text',
              title: 'Contact Value',
              description: 'Email address, phone number, address, etc.',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              type: 'string',
              title: 'Link URL',
              description: 'Optional clickable link (mailto:, tel:, maps link, etc.)',
            },
            {
              name: 'featured',
              type: 'boolean',
              title: 'Featured Contact',
              description: 'Highlight this contact method',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              label: 'label',
              type: 'type',
              icon: 'icon',
              value: 'value',
            },
            prepare({ label, type, icon, value }) {
              return {
                title: label || 'Untitled Contact',
                subtitle: `${icon || '📧'} ${type || 'info'}: ${value?.slice(0, 50) || ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'officeLocations',
      type: 'array',
      title: 'Office Locations',
      description: 'Multiple office or facility locations',
      of: [
        {
          type: 'object',
          title: 'Location',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Location Name',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'type',
              type: 'string',
              title: 'Location Type',
              options: {
                list: [
                  { title: 'Headquarters', value: 'headquarters' },
                  { title: 'Office', value: 'office' },
                  { title: 'Training Facility', value: 'training' },
                  { title: 'Match Venue', value: 'venue' },
                  { title: 'Community Center', value: 'community' },
                ],
              },
              initialValue: 'office',
            },
            {
              name: 'address',
              type: 'text',
              title: 'Address',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'coordinates',
              type: 'object',
              title: 'Map Coordinates',
              fields: [
                {
                  name: 'lat',
                  type: 'number',
                  title: 'Latitude',
                },
                {
                  name: 'lng',
                  type: 'number',
                  title: 'Longitude',
                },
              ],
            },
            {
              name: 'phone',
              type: 'string',
              title: 'Phone Number',
            },
            {
              name: 'email',
              type: 'string',
              title: 'Email Address',
            },
            {
              name: 'hours',
              type: 'text',
              title: 'Operating Hours',
              rows: 3,
            },
            {
              name: 'image',
              type: 'image',
              title: 'Location Image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: {
              name: 'name',
              type: 'type',
              address: 'address',
              image: 'image',
            },
            prepare({ name, type, address, image }) {
              return {
                title: name || 'Untitled Location',
                subtitle: `${type || 'office'} • ${address?.slice(0, 50) || ''}`,
                media: image,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'mapSettings',
      type: 'object',
      title: 'Map Settings',
      fields: [
        {
          name: 'showMap',
          type: 'boolean',
          title: 'Show Interactive Map',
          initialValue: false,
        },
        {
          name: 'mapStyle',
          type: 'string',
          title: 'Map Style',
          options: {
            list: [
              { title: 'Standard', value: 'standard' },
              { title: 'Satellite', value: 'satellite' },
              { title: 'Terrain', value: 'terrain' },
              { title: 'Dark Mode', value: 'dark' },
            ],
          },
          initialValue: 'standard',
          hidden: ({ parent }) => !parent?.showMap,
        },
        {
          name: 'zoom',
          type: 'number',
          title: 'Map Zoom Level',
          validation: (Rule) => Rule.min(1).max(20),
          initialValue: 14,
          hidden: ({ parent }) => !parent?.showMap,
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
      contactInfoCount: 'contactInfo.length',
      locationsCount: 'officeLocations.length',
    },
    prepare({ title, layout, contactInfoCount, locationsCount }) {
      const info = [];
      if (contactInfoCount) info.push(`${contactInfoCount} contacts`);
      if (locationsCount) info.push(`${locationsCount} locations`);
      
      return {
        title: title || 'Contact Section',
        subtitle: `${layout || 'form-info'} • ${info.join(', ') || 'contact form'}`,
      }
    },
  },
})