import { defineType } from 'sanity'

/**
 * Custom Portable Text type for styled headlines
 * Allows content editors to apply brand colors to text selections
 */
export const styledText = defineType({
  name: 'styledText',
  title: 'Styled Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
      ],
      lists: [],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            name: 'colorBlack',
            type: 'object',
            title: 'Black',
            icon: () => '⬛',
            fields: [
              {
                name: 'color',
                type: 'string',
                initialValue: 'black',
                hidden: true,
              },
            ],
          },
          {
            name: 'colorVolt',
            type: 'object',
            title: 'Volt Yellow',
            icon: () => '🟨',
            fields: [
              {
                name: 'color',
                type: 'string',
                initialValue: 'volt',
                hidden: true,
              },
            ],
          },
          {
            name: 'colorWhite',
            type: 'object',
            title: 'White',
            icon: () => '⬜',
            fields: [
              {
                name: 'color',
                type: 'string',
                initialValue: 'white',
                hidden: true,
              },
            ],
          },
          {
            name: 'colorOrange',
            type: 'object',
            title: 'Orange',
            icon: () => '🟧',
            fields: [
              {
                name: 'color',
                type: 'string',
                initialValue: 'orange',
                hidden: true,
              },
            ],
          },
          {
            name: 'colorPurple',
            type: 'object',
            title: 'Purple',
            icon: () => '🟪',
            fields: [
              {
                name: 'color',
                type: 'string',
                initialValue: 'purple',
                hidden: true,
              },
            ],
          },
          {
            name: 'colorCyan',
            type: 'object',
            title: 'Cyan',
            icon: () => '🟦',
            fields: [
              {
                name: 'color',
                type: 'string',
                initialValue: 'cyan',
                hidden: true,
              },
            ],
          },
        ],
      },
    },
  ],
})
