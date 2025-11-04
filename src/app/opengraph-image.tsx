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
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: '#232324',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Background subtle gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(212, 255, 0, 0.1) 0%, rgba(35, 35, 36, 1) 70%)',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Spark logo representation */}
          <div
            style={{
              fontSize: 240,
              color: '#D4FF00',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              marginBottom: '60px',
            }}
          >
            ⚡
          </div>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <div
              style={{
                fontSize: 76,
                fontWeight: 900,
                color: '#D4FF00',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              FAST. REBELLIOUS. FEMALE.
            </div>
            <div
              style={{
                fontSize: 40,
                color: '#F7F7F7',
                letterSpacing: '0.05em',
                textAlign: 'center',
              }}
            >
              Women's 7v7 Football League
            </div>
            <div
              style={{
                fontSize: 32,
                color: '#D4FF00',
                letterSpacing: '0.05em',
                textAlign: 'center',
                marginTop: '12px',
              }}
            >
              Play Football. Drive Impact. Change the World.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
