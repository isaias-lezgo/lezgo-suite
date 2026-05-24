import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Lezgo Suite — CRM y Automatización Empresarial para México'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            color: '#F59B1B',
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: '-2px',
            marginBottom: 28,
          }}
        >
          Lezgo Suite
        </div>
        <div
          style={{
            color: '#ffffff',
            fontSize: 36,
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
            opacity: 0.9,
          }}
        >
          CRM y Automatización Empresarial para México
        </div>
        <div
          style={{
            marginTop: 48,
            background: '#F59B1B',
            color: '#000',
            fontSize: 22,
            fontWeight: 600,
            padding: '14px 36px',
            borderRadius: 8,
          }}
        >
          lezgosuite.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
