import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Live API handles CDN switching automatically
  perspective: 'published', // Default to published
  stega: {
    enabled: true, // Enable stega for visual editing overlays
    studioUrl: "/studio", // Always use relative path for stega
  },
})
