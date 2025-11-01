import { defineField } from 'sanity'

// Brand colors exactly as defined in brand guidelines PDF
export const brandColors = [
  // Primary Palette
  { title: 'Black (#232324)', value: 'black' },
  { title: 'Off White (#F7F7F7)', value: 'off-white' },
  { title: 'Pure White (#FFFFFF)', value: 'white' },
  { title: 'Pure Black (#000000)', value: 'pure-black' },
  { title: 'Light Gray (#D9D9D9)', value: 'light-gray' },
  { title: 'Medium Gray (#878787)', value: 'medium-gray' },
  { title: 'Volt Yellow (#D4FF00)', value: 'volt' },
  // Secondary Palette - used when volt lacks contrast
  { title: 'Orange (#FF4400)', value: 'orange' },
  { title: 'Purple (#AE00FF)', value: 'purple' },
  { title: 'Cyan (#00FBFF)', value: 'cyan' },
  { title: 'Custom Gradient', value: 'gradient' },
  { title: 'Auto (Smart Contrast)', value: 'auto' },
]

// Advanced background options
export const backgroundOptions = [
  { title: 'Solid Color', value: 'solid' },
  { title: 'Gradient', value: 'gradient' },
  { title: 'Image', value: 'image' },
  { title: 'Video', value: 'video' },
  { title: 'Pattern', value: 'pattern' },
]

// Spacing options following brand guidelines
export const spacingOptions = [
  { title: 'None', value: 'none' },
  { title: 'Extra Small', value: 'xs' },
  { title: 'Small', value: 'sm' },
  { title: 'Medium', value: 'md' },
  { title: 'Large', value: 'lg' },
  { title: 'Extra Large', value: 'xl' },
  { title: 'Double Extra Large', value: '2xl' },
]

// Layout options
export const layoutOptions = [
  { title: 'Full Width', value: 'full' },
  { title: 'Contained (Max Width)', value: 'contained' },
  { title: 'Narrow (2/3 Width)', value: 'narrow' },
  { title: 'Wide (5/6 Width)', value: 'wide' },
]

// Animation options
export const animationOptions = [
  { title: 'None', value: 'none' },
  { title: 'Fade In', value: 'fade-in' },
  { title: 'Fade Up', value: 'fade-up' },
  { title: 'Fade Down', value: 'fade-down' },
  { title: 'Fade Left', value: 'fade-left' },
  { title: 'Fade Right', value: 'fade-right' },
  { title: 'Scale In', value: 'scale-in' },
  { title: 'Slide Up', value: 'slide-up' },
]

// Reusable styling schema
export const stylingSectionSchema = defineField({
  name: 'styling',
  type: 'object',
  title: 'Section Styling',
  description: 'Customize the visual appearance of this section',
  fields: [
    defineField({
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      options: {
        list: brandColors,
      },
      initialValue: 'off-white',
    }),
    defineField({
      name: 'backgroundType',
      type: 'string',
      title: 'Background Type',
      options: {
        list: backgroundOptions,
      },
      initialValue: 'solid',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'overlay',
          type: 'string',
          title: 'Image Overlay',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Dark (30%)', value: 'dark-30' },
              { title: 'Dark (50%)', value: 'dark-50' },
              { title: 'Dark (70%)', value: 'dark-70' },
              { title: 'Brand Gradient', value: 'brand-gradient' },
              { title: 'Volt Glow', value: 'volt-glow' },
            ],
          },
          initialValue: 'dark-50',
        },
        {
          name: 'position',
          type: 'string',
          title: 'Image Position',
          options: {
            list: [
              { title: 'Center', value: 'center' },
              { title: 'Top', value: 'top' },
              { title: 'Bottom', value: 'bottom' },
              { title: 'Left', value: 'left' },
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'center',
        },
      ],
      hidden: ({ parent }) => parent?.backgroundType !== 'image',
    }),
    defineField({
      name: 'gradientDirection',
      type: 'string',
      title: 'Gradient Direction',
      options: {
        list: [
          { title: 'Top to Bottom', value: 'to-b' },
          { title: 'Bottom to Top', value: 'to-t' },
          { title: 'Left to Right', value: 'to-r' },
          { title: 'Right to Left', value: 'to-l' },
          { title: 'Top-Right to Bottom-Left', value: 'to-bl' },
          { title: 'Top-Left to Bottom-Right', value: 'to-br' },
        ],
      },
      initialValue: 'to-br',
      hidden: ({ parent }) => parent?.backgroundType !== 'gradient',
    }),
    defineField({
      name: 'spacing',
      type: 'object',
      title: 'Section Spacing',
      fields: [
        {
          name: 'top',
          type: 'string',
          title: 'Top Padding',
          options: { list: spacingOptions },
          initialValue: 'lg',
        },
        {
          name: 'bottom',
          type: 'string',
          title: 'Bottom Padding',
          options: { list: spacingOptions },
          initialValue: 'lg',
        },
        {
          name: 'sides',
          type: 'string',
          title: 'Side Padding',
          options: { list: spacingOptions },
          initialValue: 'md',
        },
      ],
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Content Layout',
      options: {
        list: layoutOptions,
      },
      initialValue: 'contained',
    }),
    defineField({
      name: 'borders',
      type: 'object',
      title: 'Borders & Dividers',
      fields: [
        {
          name: 'top',
          type: 'boolean',
          title: 'Top Border',
          initialValue: false,
        },
        {
          name: 'bottom',
          type: 'boolean',
          title: 'Bottom Border',
          initialValue: false,
        },
        {
          name: 'style',
          type: 'string',
          title: 'Border Style',
          options: {
            list: [
              { title: 'Solid', value: 'solid' },
              { title: 'Dashed', value: 'dashed' },
              { title: 'Volt Accent', value: 'volt-accent' },
              { title: 'Gradient', value: 'gradient' },
            ],
          },
          initialValue: 'solid',
          hidden: ({ parent }) => !parent?.top && !parent?.bottom,
        },
      ],
    }),
    defineField({
      name: 'animations',
      type: 'object',
      title: 'Animations & Effects',
      fields: [
        {
          name: 'entrance',
          type: 'string',
          title: 'Entrance Animation',
          options: { list: animationOptions },
          initialValue: 'fade-up',
        },
        {
          name: 'delay',
          type: 'number',
          title: 'Animation Delay (ms)',
          description: 'Delay before animation starts',
          initialValue: 0,
          validation: (Rule) => Rule.min(0).max(2000),
        },
        {
          name: 'parallax',
          type: 'boolean',
          title: 'Enable Parallax Scrolling',
          initialValue: false,
        },
        {
          name: 'brandMotion',
          type: 'boolean',
          title: 'Enable Brand Motion (Right-leaning)',
          description: 'Adds subtle right-leaning movement on hover',
          initialValue: true,
        },
      ],
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
})

// Typography styling schema
export const typographySectionSchema = defineField({
  name: 'typography',
  type: 'object',
  title: 'Typography Settings',
  description: 'Customize text appearance and hierarchy',
  fields: [
    defineField({
      name: 'headlineStyle',
      type: 'string',
      title: 'Headline Style',
      options: {
        list: [
          { title: 'Brand Headline Large', value: 'brand-headline-large' },
          { title: 'Brand Headline Medium', value: 'brand-headline' },
          { title: 'Brand Headline Small', value: 'brand-headline-small' },
          { title: 'Brand Subhead', value: 'brand-subhead' },
          { title: 'Brand Subhead Light', value: 'brand-subhead-light' },
        ],
      },
      initialValue: 'brand-headline',
    }),
    defineField({
      name: 'textAlign',
      type: 'string',
      title: 'Text Alignment',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'textColor',
      type: 'string',
      title: 'Text Color Override',
      description: 'Override default text color based on background',
      options: {
        list: [
          { title: 'Auto (Smart Contrast)', value: 'auto' },
          { title: 'Black', value: 'black' },
          { title: 'White', value: 'white' },
          { title: 'Volt Yellow', value: 'volt' },
          { title: 'Orange', value: 'orange' },
          { title: 'Purple', value: 'purple' },
          { title: 'Cyan', value: 'cyan' },
        ],
      },
      initialValue: 'auto',
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
})