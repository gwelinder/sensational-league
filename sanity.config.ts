"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { StudioLogo } from "./src/sanity/StudioLogo";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
	basePath: "/studio",
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schemaTypes' folder
	schema,
	studio: {
		components: {
			logo: StudioLogo,
		},
	},
	plugins: [
		structureTool({ structure }),
		// Presentation tool for visual editing with drag-and-drop
		presentationTool({
			previewUrl: {
				draftMode: {
					enable: "/api/draft-mode/enable",
				},
			},
			resolve: {
				mainDocuments: [
					{
						route: "/",
						filter: `_type == "homePage"`,
					},
					{
						route: "/policies/:slug",
						filter: `_type == "policy" && slug.current == $slug`,
					},
				],
				// Enable locations for better navigation
				locations: {
					homePage: {
						select: {
							title: 'title',
						},
						resolve: (doc) => ({
							locations: [
								{
									title: doc?.title || 'Home Page',
									href: '/',
								},
							],
						}),
					},
					policy: {
						select: {
							title: 'title',
							slug: 'slug.current',
						},
						resolve: (doc) => ({
							locations: [
								{
									title: doc?.title || 'Policy',
									href: `/policies/${doc?.slug}`,
								},
							],
						}),
					},
				},
			},
		}),
		// Vision is for querying with GROQ from inside the Studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
	],
});
