import { defineType, defineField } from 'sanity'

// Reusable image type with sensible defaults and progressive disclosure
export const logoImage = defineType({
  name: 'logoImage',
  title: 'Logo Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
      description: 'Alternative text for accessibility',
    }),
    defineField({
      name: 'overrideSize',
      type: 'boolean',
      title: 'Custom size',
      description: 'Enable to set explicit width/height',
      initialValue: false,
    }),
    defineField({
      name: 'width',
      type: 'number',
      title: 'Width (px)',
      hidden: ({ parent }) => !parent?.overrideSize,
    }),
    defineField({
      name: 'height',
      type: 'number',
      title: 'Height (px)',
      hidden: ({ parent }) => !parent?.overrideSize,
    }),
    defineField({
      name: 'objectFit',
      type: 'string',
      title: 'Image Fit',
      options: {
        list: [
          { title: 'Cover', value: 'cover' },
          { title: 'Contain', value: 'contain' },
          { title: 'Fill', value: 'fill' },
          { title: 'Scale down', value: 'scale-down' },
          { title: 'None', value: 'none' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'contain',
    }),
  ],
})

