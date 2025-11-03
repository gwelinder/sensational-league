import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Check if we're in a server environment
const isServer = typeof window === 'undefined';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for live updates to work properly
  perspective: 'published', // Default to published
  stega: {
    enabled: isServer ? false : true, // Only enable stega in browser for visual editing
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "/studio",
  },
})
