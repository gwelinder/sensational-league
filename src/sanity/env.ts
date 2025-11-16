const getEnvValue = (...keys: string[]): string | undefined => {
  for (const key of keys) {
    const value = process.env[key]
    if (typeof value === 'string' && value.length > 0) {
      return value
    }
  }
  return undefined
}

const isServer = typeof window === 'undefined'

const serverPreferred = <T extends string>(keys: T[]): T[] =>
  isServer ? keys : [keys[0]]

export const apiVersion =
  getEnvValue('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') ||
  '2025-10-31'

const fallbackDataset = 'production'
const fallbackProjectId = 'j2t3xshi'

export const dataset = getEnvValue(
  ...serverPreferred([
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_DATASET',
    'SANITY_STUDIO_DATASET',
  ])
) || fallbackDataset

export const projectId = getEnvValue(
  ...serverPreferred(['NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID'])
) || fallbackProjectId

if (process.env.NODE_ENV !== 'production') {
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET && dataset === fallbackDataset) {
    console.warn(
      'NEXT_PUBLIC_SANITY_DATASET was not set. Falling back to "production". Update your .env.local if this is incorrect.'
    )
  }
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && projectId === fallbackProjectId) {
    console.warn(
      'NEXT_PUBLIC_SANITY_PROJECT_ID was not set. Falling back to "j2t3xshi". Update your .env.local if this is incorrect.'
    )
  }
}
