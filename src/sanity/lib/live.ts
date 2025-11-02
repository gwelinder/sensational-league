// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from './client'

const token = process.env.SANITY_VIEWER_TOKEN;

if (!token) {
  console.warn('Missing SANITY_VIEWER_TOKEN - visual editing features will be limited');
}

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    token,
    perspective: 'previewDrafts',
    useCdn: false,
    stega: {
      enabled: true,
      studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio',
    },
  }),
  serverToken: token,
  browserToken: token,
});
