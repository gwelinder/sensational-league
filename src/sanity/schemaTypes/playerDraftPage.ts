import { defineField, defineType } from "sanity";

export const playerDraftPage = defineType({
	name: "playerDraftPage",
	title: "Player Draft Page",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Page Title",
			description: "Internal label for editors",
			initialValue: "Player Draft",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "seo",
			type: "object",
			title: "SEO",
			fields: [
				{ name: "metaTitle", type: "string", title: "Meta title", validation: (Rule) => Rule.max(60) },
				{ name: "metaDescription", type: "text", title: "Meta description", rows: 3, validation: (Rule) => Rule.max(160) },
			],
		}),
		defineField({
			name: "hero",
			type: "object",
			title: "Hero",
			fields: [
				{ name: "locationLabel", type: "string", title: "Location label", description: "Short label above the headline, e.g. Copenhagen • Spring 2026" },
				{ name: "headline", type: "string", title: "Headline" },
				{ name: "description", type: "text", title: "Intro copy", rows: 4 },
				defineField({
					name: "highlights",
					type: "array",
					title: "Highlights",
					description: "Quick facts displayed under the hero copy",
					of: [
						{
							type: "object",
							fields: [
								{ name: "label", type: "string", title: "Label" },
								{ name: "value", type: "string", title: "Value" },
							],
						},
					],
					validation: (Rule) => Rule.max(4),
				}),
				defineField({
					name: "navButtons",
					type: "array",
					title: "Navigation buttons",
					description: "Buttons displayed under the hero copy (anchors or full URLs)",
					of: [
						{
							type: "object",
							fields: [
								{ name: "label", type: "string", title: "Label" },
								{ name: "href", type: "string", title: "Link / Anchor", description: "Supports #section anchors or full URLs" },
							],
						},
					],
					validation: (Rule) => Rule.max(4),
				}),
				defineField({
					name: "application",
					type: "object",
					title: "Application card",
					fields: [
						{ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "Player draft window" },
						{ name: "title", type: "string", title: "Card title" },
						{ name: "deadlineLabel", type: "string", title: "Deadline label", description: "Shown above the countdown" },
						{ name: "helperText", type: "text", title: "Helper text", rows: 2 },
						{ name: "ctaText", type: "string", title: "Button text", initialValue: "Start application" },
						{ name: "ctaLink", type: "url", title: "Button link (Typeform URL)", description: "Full URL to open when clicking the button" },
						defineField({
							name: "countdown",
							type: "object",
							title: "Countdown",
							fields: [
								{ name: "enabled", type: "boolean", title: "Show countdown", initialValue: true },
								{ name: "label", type: "string", title: "Countdown label", initialValue: "Countdown" },
								{ name: "deadline", type: "datetime", title: "Deadline" },
								{ name: "timezone", type: "string", title: "Timezone label", description: "e.g. CET" },
							],
						}),
						defineField({
							name: "snapshotItems",
							type: "array",
							title: "Snapshot items",
							of: [
								{
									type: "object",
									fields: [
										{ name: "label", type: "string", title: "Label" },
										{ name: "value", type: "string", title: "Value" },
									],
								},
							],
							validation: (Rule) => Rule.max(4),
						}),
					],
				}),
			],
		}),
		defineField({
			name: "timeline",
			type: "object",
			title: "Timeline",
			fields: [
				{ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "Launch timeline" },
				{ name: "title", type: "string", title: "Title", initialValue: "The path to kickoff" },
				{ name: "subtitle", type: "text", title: "Subtitle", rows: 3 },
				defineField({
					name: "milestones",
					type: "array",
					title: "Timeline milestones",
					of: [
						{
							type: "object",
							fields: [
								{ name: "period", type: "string", title: "Period" },
								{ name: "title", type: "string", title: "Title" },
								{ name: "description", type: "text", title: "Description", rows: 3 },
							],
						},
					],
					validation: (Rule) => Rule.min(2),
				}),
			],
		}),
		defineField({
			name: "about",
			type: "object",
			title: "About the league",
			fields: [
				{ name: "eyebrow", type: "string", title: "Eyebrow" },
				{ name: "title", type: "string", title: "Title" },
				{ name: "subtitle", type: "text", title: "Subtitle", rows: 3 },
				defineField({
					name: "paragraphs",
					type: "array",
					title: "Paragraphs",
					of: [{ type: "text" }],
					validation: (Rule) => Rule.min(1),
				}),
				defineField({
					name: "pillars",
					type: "array",
					title: "Impact pillars",
					of: [
						{
							type: "object",
							fields: [
								{ name: "title", type: "string", title: "Title" },
								{ name: "description", type: "text", title: "Description", rows: 3 },
							],
						},
					],
					validation: (Rule) => Rule.min(2).max(4),
				}),
			],
		}),
		defineField({
			name: "participationSection",
			type: "object",
			title: "Participation",
			fields: [
				{ name: "eyebrow", type: "string", title: "Eyebrow" },
				{ name: "title", type: "string", title: "Title" },
				{ name: "subtitle", type: "text", title: "Subtitle", rows: 3 },
				defineField({
					name: "paragraphs",
					type: "array",
					of: [{ type: "text" }],
				}),
				defineField({
					name: "quoteCard",
					type: "object",
					title: "Quote card",
					fields: [
						{ name: "eyebrow", type: "string", title: "Eyebrow" },
						{ name: "quote", type: "text", title: "Quote", rows: 3 },
						{ name: "body", type: "text", title: "Body", rows: 3 },
					],
				}),
				defineField({
					name: "toolsCard",
					type: "object",
					title: "Tools card",
					fields: [
						{ name: "title", type: "string", title: "Title", initialValue: "Tools you get" },
						defineField({
							name: "items",
							type: "array",
							of: [{ type: "string" }],
						}),
					],
				}),
			],
		}),
		defineField({
			name: "draftStepsSection",
			type: "object",
			title: "Draft steps",
			fields: [
				{ name: "eyebrow", type: "string", title: "Eyebrow" },
				{ name: "title", type: "string", title: "Title" },
				{ name: "subtitle", type: "text", title: "Subtitle", rows: 3 },
				defineField({
					name: "steps",
					type: "array",
					of: [
						{
							type: "object",
							fields: [
								{ name: "title", type: "string", title: "Title" },
								{ name: "description", type: "text", title: "Description", rows: 3 },
							],
						},
					],
				}),
				defineField({
					name: "cta",
					type: "object",
					title: "CTA card",
					fields: [
						{ name: "eyebrow", type: "string", title: "Eyebrow" },
						{ name: "title", type: "string", title: "Title" },
						{ name: "helper", type: "text", title: "Helper text", rows: 3 },
						{ name: "ctaText", type: "string", title: "Button text", initialValue: "Apply here" },
						{ name: "ctaLink", type: "url", title: "Button link" },
					],
				}),
			],
		}),
		defineField({
			name: "faqSection",
			type: "object",
			title: "FAQ",
			fields: [
				{ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "FAQ" },
				{ name: "title", type: "string", title: "Title" },
				{ name: "subtitle", type: "text", title: "Subtitle", rows: 3 },
				defineField({
					name: "items",
					type: "array",
					of: [
						{
							type: "object",
							fields: [
								{ name: "question", type: "string", title: "Question" },
								{ name: "answer", type: "text", title: "Answer", rows: 4 },
							],
						},
					],
				}),
			],
		}),
		defineField({
			name: "contactSection",
			type: "object",
			title: "Contacts",
			fields: [
				{ name: "eyebrow", type: "string", title: "Eyebrow" },
				{ name: "title", type: "string", title: "Title" },
				{ name: "subtitle", type: "text", title: "Subtitle", rows: 3 },
				defineField({
					name: "contacts",
					type: "array",
					 of: [
						{
							type: "object",
							fields: [
								{ name: "label", type: "string", title: "Label" },
								{ name: "value", type: "string", title: "Value" },
								{ name: "link", type: "string", title: "Link", description: "mailto: or https:// URL" },
							],
						},
					],
				}),
			],
		}),
	],
	preview: {
		select: { title: "title" },
		prepare({ title }) {
			return {
				title: title || "Player Draft Page",
				subtitle: "Player draft content",
			};
		},
	},
});
