import { defineField, defineType } from "sanity";

/**
 * Global Design Settings
 *
 * Allows non-technical maintainers to customize colors, typography,
 * and styling across the site without touching code.
 */
export const designSettings = defineType({
  name: "designSettings",
  title: "Design Settings",
  type: "document",
  groups: [
    { name: "colors", title: "Colors", default: true },
    { name: "captains", title: "Captain Pages" },
    { name: "typography", title: "Typography" },
    { name: "buttons", title: "Buttons & CTAs" },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════
    // BRAND COLORS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: "brandColors",
      title: "Brand Colors",
      type: "object",
      group: "colors",
      description: "Primary brand colors used across the site",
      fields: [
        defineField({
          name: "primary",
          title: "Primary (Volt Yellow)",
          type: "string",
          description: "Main accent color. Default: #D4FF00",
          initialValue: "#D4FF00",
        }),
        defineField({
          name: "background",
          title: "Background",
          type: "string",
          description: "Main background color. Default: #000000",
          initialValue: "#000000",
        }),
        defineField({
          name: "backgroundAlt",
          title: "Background Alt",
          type: "string",
          description: "Secondary background. Default: #0a0a0a",
          initialValue: "#0a0a0a",
        }),
        defineField({
          name: "text",
          title: "Text Color",
          type: "string",
          description: "Primary text color. Default: #FFFFFF",
          initialValue: "#FFFFFF",
        }),
        defineField({
          name: "textMuted",
          title: "Muted Text",
          type: "string",
          description: "Secondary text color. Default: rgba(255,255,255,0.6)",
          initialValue: "rgba(255,255,255,0.6)",
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // CAPTAIN PAGE STYLES
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: "captainStyles",
      title: "Captain Page Styles",
      type: "object",
      group: "captains",
      description: "Styling for all captain pages (overview and profiles)",
      fields: [
        defineField({
          name: "heroOverlay",
          title: "Hero Overlay",
          type: "string",
          description: "Gradient overlay on hero images",
          options: {
            list: [
              { title: "Dark (default)", value: "dark" },
              { title: "Light", value: "light" },
              { title: "Brand Tint", value: "brand" },
              { title: "None", value: "none" },
            ],
          },
          initialValue: "dark",
        }),
        defineField({
          name: "nameColor",
          title: "Captain Name Color",
          type: "string",
          description: "Color for captain names. Leave empty for default (white)",
        }),
        defineField({
          name: "taglineColor",
          title: "Tagline/One-liner Color",
          type: "string",
          description: "Color for taglines. Leave empty for default (volt yellow)",
        }),
        defineField({
          name: "cardStyle",
          title: "Card Style",
          type: "string",
          description: "Style for captain cards on overview page",
          options: {
            list: [
              { title: "Glassmorphism (default)", value: "glass" },
              { title: "Solid Dark", value: "solid" },
              { title: "Bordered", value: "bordered" },
              { title: "Minimal", value: "minimal" },
            ],
          },
          initialValue: "glass",
        }),
        defineField({
          name: "cardBorderRadius",
          title: "Card Border Radius",
          type: "string",
          options: {
            list: [
              { title: "Rounded (32px)", value: "32px" },
              { title: "Medium (16px)", value: "16px" },
              { title: "Small (8px)", value: "8px" },
              { title: "Square (0)", value: "0" },
            ],
          },
          initialValue: "32px",
        }),
        defineField({
          name: "showStats",
          title: "Show Stats Badge",
          type: "boolean",
          description: "Show national caps badge on cards",
          initialValue: true,
        }),
        defineField({
          name: "statsPosition",
          title: "Stats Badge Position",
          type: "string",
          options: {
            list: [
              { title: "Top Right", value: "top-right" },
              { title: "Top Left", value: "top-left" },
              { title: "Bottom Right", value: "bottom-right" },
              { title: "Bottom Left", value: "bottom-left" },
            ],
          },
          initialValue: "top-right",
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // TYPOGRAPHY
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: "typography",
      title: "Typography Settings",
      type: "object",
      group: "typography",
      fields: [
        defineField({
          name: "headingStyle",
          title: "Heading Style",
          type: "string",
          options: {
            list: [
              { title: "All Caps (default)", value: "uppercase" },
              { title: "Title Case", value: "capitalize" },
              { title: "Normal", value: "none" },
            ],
          },
          initialValue: "uppercase",
        }),
        defineField({
          name: "headingWeight",
          title: "Heading Weight",
          type: "string",
          options: {
            list: [
              { title: "Black (900)", value: "900" },
              { title: "Bold (700)", value: "700" },
              { title: "Semi-bold (600)", value: "600" },
            ],
          },
          initialValue: "900",
        }),
        defineField({
          name: "headingTracking",
          title: "Heading Letter Spacing",
          type: "string",
          options: {
            list: [
              { title: "Wide (0.15em)", value: "0.15em" },
              { title: "Medium (0.08em)", value: "0.08em" },
              { title: "Normal (0)", value: "0" },
            ],
          },
          initialValue: "0.15em",
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // BUTTONS & CTAs
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: "buttons",
      title: "Button Styles",
      type: "object",
      group: "buttons",
      fields: [
        defineField({
          name: "primaryStyle",
          title: "Primary Button Style",
          type: "string",
          options: {
            list: [
              { title: "Filled (default)", value: "filled" },
              { title: "Outline", value: "outline" },
              { title: "Ghost", value: "ghost" },
            ],
          },
          initialValue: "filled",
        }),
        defineField({
          name: "borderRadius",
          title: "Button Border Radius",
          type: "string",
          options: {
            list: [
              { title: "Pill (full)", value: "9999px" },
              { title: "Rounded (12px)", value: "12px" },
              { title: "Small (6px)", value: "6px" },
              { title: "Square (0)", value: "0" },
            ],
          },
          initialValue: "9999px",
        }),
        defineField({
          name: "hoverEffect",
          title: "Hover Effect",
          type: "string",
          options: {
            list: [
              { title: "Lift (default)", value: "lift" },
              { title: "Glow", value: "glow" },
              { title: "Scale", value: "scale" },
              { title: "None", value: "none" },
            ],
          },
          initialValue: "lift",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Design Settings",
        subtitle: "Global site styling",
      };
    },
  },
});
