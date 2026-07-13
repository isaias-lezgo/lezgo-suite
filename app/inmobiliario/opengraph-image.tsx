import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Lezgo Suite — CRM Inmobiliario con WhatsApp centralizado'
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
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: '-2px',
            marginBottom: 24,
          }}
        >
          Lezgo Suite
        </div>
        <div
          style={{
            color: '#ffffff',
            fontSize: 40,
            fontWeight: 600,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          El CRM inmobiliario que centraliza el WhatsApp de tu equipo
        </div>
        <div
          style={{
            color: '#ffffff',
            fontSize: 26,
            textAlign: 'center',
            maxWidth: 800,
            marginTop: 20,
            opacity: 0.7,
          }}
        >
          Para agencias, desarrolladoras y asesores en México
        </div>
        <div
          style={{
            marginTop: 44,
            background: '#F59B1B',
            color: '#000',
            fontSize: 22,
            fontWeight: 600,
            padding: '14px 36px',
            borderRadius: 8,
          }}
        >
          lezgosuite.com/inmobiliario
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
