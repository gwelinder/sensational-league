import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  title: 'Home Page',
  seo: {
    metaTitle: 'Sensational League - Fast. Rebellious. Female.',
    metaDescription: 'Women\'s 7v7 football league combining athletic excellence with social impact. Join the movement.',
  },
  sections: [
    {
      _key: 'hero-1',
      _type: 'heroSection',
      headline: 'Next Season Waitlist Now Open',
      subheadline: 'Sensational League is returning with a new season. Reserve your spot to play for purpose and be the first to hear the kickoff date.',
      ctaText: 'Join Waitlist',
      ctaUrl: '#signup',
    },
    {
      _key: 'signup-1',
      _type: 'signupSection',
      title: 'Reserve Your Spot',
      description: 'Drop your email and we\'ll invite you to the player briefing with all the details about the next Sensational League season.',
      buttonText: 'Join Waitlist',
      backgroundColor: 'off-white',
    },
    {
      _key: 'about-1',
      _type: 'contentSection',
      title: 'About Sensational League',
      backgroundColor: 'white',
      sectionId: {
        current: 'about',
      },
      content: [
        {
          _type: 'block',
          _key: 'about-block-1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'about-span-1',
              text: 'Sensational League is a women\'s 7v7 football league that combines athletic excellence with social impact. We\'re building a community where female athletes can showcase their skills while making a difference.',
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _key: 'howweplay-1',
      _type: 'contentSection',
      title: 'How We Play',
      backgroundColor: 'off-white',
      sectionId: {
        current: 'how-we-play',
      },
      content: [
        {
          _type: 'block',
          _key: 'play-block-1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'play-span-1',
              text: 'Each season features competitive 7v7 matches played with purpose. Teams compete not just for victory, but to raise funds and awareness for causes they care about.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          _key: 'play-block-2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'play-span-2',
              text: 'Games are fast-paced, skill-focused, and designed to showcase the incredible talent of female athletes. Join us and be part of something bigger than the game.',
              marks: [],
            },
          ],
        },
      ],
    },
  ],
}

async function seedHomePage() {
  try {
    console.log('🌱 Seeding homepage with new section-based structure...')
    
    const result = await client.createOrReplace(homePage)
    console.log('✅ Homepage seeded successfully:', result._id)
    
    console.log('\n📖 To use the new drag-and-drop functionality:')
    console.log('1. Go to your Sanity Studio')
    console.log('2. Open the Home Page document')
    console.log('3. Use the Presentation tool to see the drag-and-drop interface')
    console.log('4. Drag sections to reorder them')
    console.log('5. Add new sections using the + button')
    
  } catch (error) {
    console.error('❌ Error seeding homepage:', error)
    process.exit(1)
  }
}

seedHomePage()