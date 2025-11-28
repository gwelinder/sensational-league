import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Impact | Sensational League'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// SDG Colors for visual variety
const SDG_COLORS = [
  '#E5243B', // No Poverty
  '#DDA63A', // Zero Hunger
  '#4C9F38', // Good Health
  '#C5192D', // Education
  '#FF3A21', // Gender Equality
  '#26BDE2', // Clean Water
  '#FCC30B', // Energy
  '#A21942', // Decent Work
  '#FD6925', // Innovation
  '#DD1367', // Reduced Inequalities
]

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
          overflow: 'hidden',
        }}
      >
        {/* Background gradient with multiple SDG color accents */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 20%, rgba(76,159,56,0.2) 0%, transparent 30%), radial-gradient(circle at 80% 30%, rgba(38,189,226,0.2) 0%, transparent 30%), radial-gradient(circle at 50% 80%, rgba(212,255,0,0.15) 0%, transparent 40%)',
          }}
        />
        
        {/* Decorative SDG dots */}
        <div style={{
          position: 'absolute',
          top: 40,
          left: 40,
          display: 'flex',
          gap: 12,
        }}>
          {SDG_COLORS.slice(0, 5).map((color, i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: color,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
        <div style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          display: 'flex',
          gap: 12,
        }}>
          {SDG_COLORS.slice(5).map((color, i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: color,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
        
        {/* Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          zIndex: 1,
        }}>
          {/* Spark logo */}
          <img
            src={sparkLogo}
            alt="Spark"
            width={80}
            height={80}
            style={{ objectFit: 'contain' }}
          />
          
          {/* Title */}
          <div style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#F7F7F7',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Impact Leaderboard
          </div>
          
          {/* Tagline */}
          <div style={{
            fontSize: 28,
            fontWeight: 500,
            color: '#D4FF00',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Play Football. Drive Impact. Change the World.
          </div>
          
          {/* UN SDG reference */}
          <div style={{
            fontSize: 20,
            color: '#F7F7F7',
            opacity: 0.7,
            letterSpacing: '0.05em',
          }}>
            Aligned with UN Sustainable Development Goals
          </div>
          
          {/* Wordmark */}
          <img
            src={wordmarkWhite}
            alt="Sensational League"
            width={350}
            height={50}
            style={{ objectFit: 'contain', marginTop: 16, opacity: 0.6 }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
