import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'LinkedIn Post Pro - Generador de posts para LinkedIn con IA en español'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A66C2',
          backgroundImage: 'linear-gradient(135deg, #0A66C2 0%, #004182 100%)',
        }}
      >
        {/* Logo/Brand mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              backgroundColor: 'white',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
            }}
          >
            <span style={{ fontSize: 48, fontWeight: 'bold', color: '#0A66C2' }}>in</span>
          </div>
          <span
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            LinkedIn Post Pro
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            Genera posts de LinkedIn
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#7FC15E',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            que conectan
          </span>
        </div>

        {/* Subtitle */}
        <span
          style={{
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.9)',
            marginTop: 30,
            textAlign: 'center',
          }}
        >
          IA en español nativo • 3 variaciones • Sin sonar a robot
        </span>

        {/* CTA badge */}
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            backgroundColor: 'white',
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 16,
            paddingBottom: 16,
            borderRadius: 50,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 'bold', color: '#0A66C2' }}>
            Empieza gratis →
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
