import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-10-31',
})

async function seedSiteSettings() {
  console.log('🌱 Seeding site settings...')

  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Sensational League',
    description: "Women's 7v7 football league combining athletic excellence with social impact.",
    navigation: {
      links: [
        { label: 'Policies', href: '/policies' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'About', href: '/#about' },
      ],
    },
    footer: {
      tagline: 'Fast. Rebellious. Female.',
      description: "Women's 7v7 football league combining athletic excellence with social impact.",
      copyrightText: `© ${new Date().getFullYear()} Sensational League`,
      additionalText: 'Built for women\'s football',
    },
  }

  try {
    const result = await client.createOrReplace(siteSettings)
    console.log('✅ Site settings created:', result._id)
  } catch (error) {
    console.error('❌ Error seeding site settings:', error)
    throw error
  }
}

seedSiteSettings()
  .then(() => {
    console.log('🎉 Site settings seeded successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Failed to seed site settings:', error)
    process.exit(1)
  })
