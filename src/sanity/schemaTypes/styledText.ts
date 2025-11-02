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
          { title: '⬛ Black', value: 'colorBlack' },
          { title: '🟨 Volt', value: 'colorVolt' },
          { title: '⬜ White', value: 'colorWhite' },
          { title: '🟧 Orange', value: 'colorOrange' },
          { title: '🟪 Purple', value: 'colorPurple' },
          { title: '🟦 Cyan', value: 'colorCyan' },
        ],
        annotations: [],
      },
    },
  ],
})
