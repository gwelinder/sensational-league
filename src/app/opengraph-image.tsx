import { ImageResponse } from 'next/og'
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Sensational League - Fast. Rebellious. Female.'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  // Prefer Site Settings default OG image; fall back to brand lockup
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
    apiVersion: '2025-10-31',
    useCdn: true,
  })

  let ogUrl: string | null = null
  try {
    const data = await client.fetch<{ social?: { defaultOg?: any } }>(
      `*[_type == "siteSettings"][0]{ social{ defaultOg } }`
    )
    if (data?.social?.defaultOg?.asset) {
      const builder = imageUrlBuilder(client)
      ogUrl = builder
        .image(data.social.defaultOg)
        .width(1200)
        .height(630)
        .fit('crop')
        .quality(85)
        .format('jpg')
        .url()
    }
  } catch (e) {
    console.error('OG fetch failed', e)
  }

  const base = 'https://sensationalleague.com'
  const wordmarkWhite = new URL('/SL-WORDMARK-ONE LINE-WHITE.png', base).href

  return new ImageResponse(
    (
      <div
        style={{
          background: '#232324',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 40%, rgba(212,255,0,0.12) 0%, rgba(35,35,36,1) 65%)',
          }}
        />
        {ogUrl ? (
          <img src={ogUrl} alt="OG" width={1200} height={630} style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            zIndex: 1,
          }}>
            <img
              src={wordmarkWhite}
              alt="Sensational League"
              width={900}
              height={200}
              style={{ objectFit: 'contain' }}
            />
            <div style={{
              fontSize: 40,
              fontWeight: 900,
              color: '#D4FF00',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Fast. Rebellious. Female.
            </div>
          </div>
        )}
      </div>
    ),
    { ...size }
  )
}
