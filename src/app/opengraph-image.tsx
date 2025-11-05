import { ImageResponse } from 'next/og'

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
  // Use absolute URL for static assets in edge runtime
  const base = 'https://sensationalleague.com'
  const lockupUrl = new URL('/logos/SL-LOCKUP-WITH-TAGLINE.svg', base).href

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
        {/* Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 40%, rgba(212,255,0,0.12) 0%, rgba(35,35,36,1) 65%)',
          }}
        />

        {/* Hero lockup */}
        <img
          src={lockupUrl}
          alt="Sensational League"
          width={980}
          height={360}
          style={{ objectFit: 'contain', zIndex: 1 }}
        />
      </div>
    ),
    { ...size }
  )
}
