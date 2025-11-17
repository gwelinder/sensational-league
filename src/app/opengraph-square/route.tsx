import { ImageResponse } from 'next/og'
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Route segment config
export const runtime = 'edge'

/* eslint-disable @next/next/no-img-element */
// Note: Using <img> tags in OG image generation is required by @vercel/og
// These are not rendered in browsers but used for image generation

export async function GET() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
    apiVersion: '2025-10-31',
    useCdn: true,
  })

  let ogUrl: string | null = null
  try {
	const data = await client.fetch<{ social?: { squareOg?: SanityImageSource; defaultOg?: SanityImageSource } }>(
      `*[_type == "siteSettings"][0]{ social{ squareOg, defaultOg } }`
    )
	const hasAsset = (
		value: SanityImageSource | undefined,
	): value is SanityImageSource & { asset: unknown } =>
		Boolean(value) && typeof value === 'object' && 'asset' in value
	const squareCandidate = data?.social?.squareOg
	const defaultCandidate = data?.social?.defaultOg
	const pick = hasAsset(squareCandidate)
		? squareCandidate
		: hasAsset(defaultCandidate)
			? defaultCandidate
			: undefined
	if (pick) {
      const builder = imageUrlBuilder(client)
      ogUrl = builder.image(pick).width(1200).height(1200).fit('crop').quality(85).format('jpg').url()
    }
  } catch (e) {
    console.error('OG square fetch failed', e)
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
          <img src={ogUrl} alt="OG" width={1200} height={1200} style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            zIndex: 1,
          }}>
            <img
              src={wordmarkWhite}
              alt="Sensational League"
              width={980}
              height={240}
              style={{ objectFit: 'contain' }}
            />
            <div style={{
              fontSize: 44,
              fontWeight: 900,
              color: '#D4FF00',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>
              Fast. Rebellious. Female.
            </div>
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 1200 }
  )
}
