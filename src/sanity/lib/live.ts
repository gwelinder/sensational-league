// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from './client'

const token = process.env.SANITY_VIEWER_TOKEN;

if (!token) {
  console.warn('Missing SANITY_VIEWER_TOKEN - visual editing features will be limited');
}

// Create a client configured for draft content when using Live API
// This ensures editors see their draft changes immediately in the presentation tool
const liveClient = client.withConfig({
  perspective: 'previewDrafts', // Use previewDrafts for live editing
  useCdn: false, // Never use CDN for draft content
  stega: {
    enabled: true, // Enable stega for visual editing overlays
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "/studio",
  },
});

export const { sanityFetch, SanityLive } = defineLive({
  client: liveClient,
  serverToken: token,
  browserToken: token,
});
