import { defineField, defineType } from "sanity";

export const captain = defineType({
  name: "captain",
  title: "Captain",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[æå]/g, "a")
            .replace(/[ø]/g, "o")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "E.g., 'Defender • 5x Danish Champion • Brøndby Legend'",
    }),
    defineField({
      name: "oneLiner",
      title: "One-Liner Stats",
      type: "string",
      description: "E.g., '56 Caps x Brøndby Legend'",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Brief career summary (2-3 sentences)",
    }),
    defineField({
      name: "superpower",
      title: "Superpower",
      type: "string",
      description: "What makes this captain unique?",
    }),
    defineField({
      name: "photo",
      title: "Profile Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "videoUrl",
      title: "Captain Video URL",
      type: "url",
      description: "CDN URL for the captain's intro video",
    }),
    defineField({
      name: "heroMediaType",
      title: "Hero Display",
      type: "string",
      description: "What to show in the hero section",
      options: {
        list: [
          { title: "Photo only", value: "photo" },
          { title: "Video only (with play button)", value: "video" },
          { title: "Photo with video play button", value: "both" },
        ],
        layout: "radio",
      },
      initialValue: "photo",
    }),
    defineField({
      name: "photoGallery",
      title: "Photo Gallery",
      type: "array",
      description: "Additional photos for the expanded section below the hero",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "videoGallery",
      title: "Video Gallery (Deprecated)",
      type: "array",
      description: "Not currently used - each captain has max 1 video via videoUrl field",
      hidden: true,
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Video Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Video URL",
              type: "url",
              description: "CDN URL or YouTube link",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "thumbnail",
              title: "Custom Thumbnail",
              type: "image",
              description: "Optional custom thumbnail (auto-generated if empty)",
            }),
            defineField({
              name: "duration",
              title: "Duration",
              type: "string",
              description: "E.g., '2:45'",
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  { title: "Intro", value: "intro" },
                  { title: "Highlights", value: "highlights" },
                  { title: "Interview", value: "interview" },
                  { title: "Behind the Scenes", value: "bts" },
                  { title: "Match Footage", value: "match" },
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: "title",
              category: "category",
              media: "thumbnail",
            },
            prepare({ title, category, media }) {
              return {
                title: title || "Untitled Video",
                subtitle: category || "Video",
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Full Biography",
      type: "blockContent",
      description: "Detailed biography for the captain's landing page",
    }),
    defineField({
      name: "teamVision",
      title: "Team Vision Statement",
      type: "text",
      rows: 4,
      description: "What kind of team do they want to build?",
    }),
    defineField({
      name: "lookingFor",
      title: "Looking For",
      type: "array",
      of: [{ type: "string" }],
      description: "Types of players this captain is seeking",
    }),
    defineField({
      name: "careerHighlights",
      title: "Career Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Achievement",
              type: "string",
            }),
            defineField({
              name: "year",
              title: "Year",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "clubs",
      title: "Notable Clubs",
      type: "array",
      of: [{ type: "string" }],
      description: "List of clubs played for",
    }),
    defineField({
      name: "nationalCaps",
      title: "National Team Caps",
      type: "number",
      description: "Total international appearances",
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          title: "Instagram Handle",
          type: "string",
          description: "Without @",
        }),
        defineField({
          name: "twitter",
          title: "Twitter Handle",
          type: "string",
          description: "Without @",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "quote",
      title: "Featured Quote",
      type: "text",
      rows: 2,
      description: "A memorable quote from the captain",
    }),
    defineField({
      name: "position",
      title: "Playing Position",
      type: "string",
      options: {
        list: [
          { title: "Goalkeeper", value: "goalkeeper" },
          { title: "Defender", value: "defender" },
          { title: "Midfielder", value: "midfielder" },
          { title: "Forward", value: "forward" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order to display on captain grid (lower = first)",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Featured Captain",
      type: "boolean",
      description: "Show prominently on homepage",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "photo",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
