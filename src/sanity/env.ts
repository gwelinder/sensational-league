const getEnvValue = (...keys: string[]): string | undefined => {
  for (const key of keys) {
    const value = process.env[key]
    if (typeof value === 'string' && value.length > 0) {
      return value
    }
  }
  return undefined
}

export const apiVersion =
  getEnvValue('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') ||
  '2025-10-31'

export const dataset = assertValue(
  getEnvValue(
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_DATASET',
    'SANITY_STUDIO_DATASET'
  ),
  'Missing Sanity dataset. Set NEXT_PUBLIC_SANITY_DATASET or SANITY_DATASET.'
)

export const projectId = assertValue(
  getEnvValue('NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID'),
  'Missing Sanity projectId. Set NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID.'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
