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

  const policyUrls = (policies || []).map((policy: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/policies#${policy.slug}`,
    lastModified: new Date(policy._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/policies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...policyUrls,
  ]
}
