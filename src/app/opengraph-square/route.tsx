import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

export async function GET() {
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
          padding: '80px',
        }}
      >
        {/* Spark logo representation */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 280,
            color: '#D4FF00',
            fontWeight: 900,
            letterSpacing: '-0.05em',
          }}
        >
          ⚡
        </div>

        {/* Tagline */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            width: '100%',
            padding: '0 60px',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: '#D4FF00',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            FAST.
            <br />
            REBELLIOUS.
            <br />
            FEMALE.
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#F7F7F7',
              letterSpacing: '0.05em',
              textAlign: 'center',
            }}
          >
            Women's 7v7 Football League
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 1200,
    }
  )
}
