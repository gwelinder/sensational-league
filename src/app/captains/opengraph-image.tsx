import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Captains | Sensational League'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  const base = 'https://sensationalleague.com'
  const wordmarkWhite = new URL('/SL-WORDMARK-ONE LINE-WHITE.png', base).href
  const sparkLogo = new URL('/SENSATIONAL-LEAGUE-PRIMARY-MARK-WHITE.png', base).href

  return new ImageResponse(
    (
      <div
        style={{
          background: '#232324',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 30% 30%, rgba(212,255,0,0.15) 0%, rgba(35,35,36,1) 50%), radial-gradient(circle at 70% 70%, rgba(174,0,255,0.12) 0%, transparent 50%)',
          }}
        />
        
        {/* Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          zIndex: 1,
        }}>
          {/* Spark logo */}
          <img
            src={sparkLogo}
            alt="Spark"
            width={100}
            height={100}
            style={{ objectFit: 'contain' }}
          />
          
          {/* Title */}
          <div style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#F7F7F7',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Meet the Captains
          </div>
          
          {/* Tagline */}
          <div style={{
            fontSize: 32,
            fontWeight: 500,
            color: '#D4FF00',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Leaders of Change
          </div>
          
          {/* Wordmark */}
          <img
            src={wordmarkWhite}
            alt="Sensational League"
            width={400}
            height={60}
            style={{ objectFit: 'contain', marginTop: 20, opacity: 0.7 }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
