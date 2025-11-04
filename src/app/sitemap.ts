import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/live'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sensationalleague.com'

  // Fetch all policy documents from Sanity
  const { data: policies } = await sanityFetch({
    query: `*[_type == "policy" && !(_id in path("drafts.**"))] | order(order asc) {
      "slug": slug.current,
      _updatedAt
    }`,
  })

  // Fetch press releases from Sanity
  const { data: pressReleases } = await sanityFetch({
    query: `*[_type == "pressRelease" && !(_id in path("drafts.**"))] | order(publishDate desc) {
      "slug": slug.current,
      _updatedAt,
      publishDate
    }`,
  })

  const policyUrls = (policies || []).map((policy: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/policies/${policy.slug}`,
    lastModified: new Date(policy._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const pressUrls = (pressReleases || []).map((pr: { slug: string; _updatedAt: string; publishDate: string }) => ({
    url: `${baseUrl}/press`,
    lastModified: new Date(pr._updatedAt || pr.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.9, // High priority for press releases
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/policies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...policyUrls,
    ...pressUrls,
  ]
}
