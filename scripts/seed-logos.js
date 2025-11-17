import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { join } from 'path'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-10-01',
  useCdn: false,
})

const logos = [
  {
    filename: 'SL-SPARK-LARGE.svg',
    title: 'Sensational League Spark - Large',
    description: 'Primary spark logo for 400px+ applications',
    variant: 'spark-large',
    usage: 'Hero sections, large displays',
  },
  {
    filename: 'SL-SPARK-MEDIUM.svg',
    title: 'Sensational League Spark - Medium',
    description: 'Primary spark logo for 200-400px applications',
    variant: 'spark-medium',
    usage: 'Standard sections, medium displays',
  },
  {
    filename: 'SL-SPARK-SMALL.svg',
    title: 'Sensational League Spark - Small',
    description: 'Primary spark logo for 75-150px applications',
    variant: 'spark-small',
    usage: 'Headers, small displays, mobile',
  },
  {
    filename: 'SL-SECONDARY MARK.svg',
    title: 'Sensational League Secondary Mark',
    description: 'Enhanced speed/sharpness illusion mark',
    variant: 'secondary-mark',
    usage: 'When enhanced motion emphasis is needed',
  },
  {
    filename: 'SL-WORDMARK-ONE LINE.svg',
    title: 'Sensational League Wordmark - One Line',
    description: 'Single line wordmark layout',
    variant: 'wordmark-one-line',
    usage: 'Horizontal layouts, headers',
  },
  {
    filename: 'SL-WORDMARK-CENTERED.svg',
    title: 'Sensational League Wordmark - Centered',
    description: 'Centered wordmark layout',
    variant: 'wordmark-centered',
    usage: 'Centered compositions, squared spaces',
  },
  {
    filename: 'SL-WORDMARK-LEFT ALIGNED.svg',
    title: 'Sensational League Wordmark - Left Aligned',
    description: 'Left-aligned wordmark layout',
    variant: 'wordmark-left-aligned',
    usage: 'Left-aligned compositions, text blocks',
  },
  {
    filename: 'SL-PRIMARY LOCKUP.svg',
    title: 'Sensational League Primary Lockup',
    description: 'Primary spark with wordmark combination',
    variant: 'primary-lockup',
    usage: 'Official documents, formal presentations',
  },
  {
    filename: 'SL-SECONDARY LOCKUP-ONE LINE.svg',
    title: 'Sensational League Secondary Lockup - One Line',
    description: 'Secondary mark with one-line wordmark',
    variant: 'secondary-lockup-one-line',
    usage: 'Horizontal layouts with motion emphasis',
  },
  {
    filename: 'SL-SECONDARY LOCKUP-CENTERED.svg',
    title: 'Sensational League Secondary Lockup - Centered',
    description: 'Secondary mark with centered wordmark',
    variant: 'secondary-lockup-centered',
    usage: 'Centered compositions with motion emphasis',
  },
  {
    filename: 'SL-SECONDARY LOCKUP-LEFT ALIGNED.svg',
    title: 'Sensational League Secondary Lockup - Left Aligned',
    description: 'Secondary mark with left-aligned wordmark',
    variant: 'secondary-lockup-left-aligned',
    usage: 'Left-aligned compositions with motion emphasis',
  },
]

async function uploadLogo(logoInfo) {
  try {
    const logoPath = join(process.cwd(), 'public', 'logos', logoInfo.filename)
    const logoBuffer = readFileSync(logoPath)
    
    // Upload the SVG file as an asset
    const asset = await client.assets.upload('file', logoBuffer, {
      filename: logoInfo.filename,
      contentType: 'image/svg+xml',
    })

    // Create the logo document
    const logoDoc = {
      _type: 'logo',
      title: logoInfo.title,
      description: logoInfo.description,
      variant: logoInfo.variant,
      usage: logoInfo.usage,
      file: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
      brandGuidelines: {
        clearspace: logoInfo.variant.includes('secondary') ? 'full-x-height' : 'half-x-height',
        direction: 'right-leaning',
        contrast: 'high',
      },
    }

    const result = await client.create(logoDoc)
    console.log(`✅ Uploaded ${logoInfo.title}`)
    return result
  } catch (error) {
    console.error(`❌ Failed to upload ${logoInfo.title}:`, error)
    return null
  }
}

async function seedLogos() {
  console.log('🎨 Starting logo seeding process...')
  
  // Check if we have the required environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('❌ Missing required environment variables')
    console.error('Please ensure NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are set')
    process.exit(1)
  }

  // Check if logos already exist
  const existingLogos = await client.fetch(`*[_type == "logo"]`)
  if (existingLogos.length > 0) {
    console.log(`⚠️  Found ${existingLogos.length} existing logos. Skipping upload.`)
    console.log('To re-seed, delete existing logos from Sanity Studio first.')
    return
  }

  console.log(`📁 Uploading ${logos.length} logo variants...`)
  
  const results = []
  for (const logo of logos) {
    const result = await uploadLogo(logo)
    if (result) {
      results.push(result)
    }
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log(`✨ Logo seeding complete! Uploaded ${results.length}/${logos.length} logos`)
  
  if (results.length < logos.length) {
    console.log('⚠️  Some logos failed to upload. Check the errors above.')
  } else {
    console.log('🎉 All logos uploaded successfully!')
    console.log('You can now use the Logo components and manage logos in Sanity Studio.')
  }
}

// Run the seeding process
seedLogos().catch(console.error)