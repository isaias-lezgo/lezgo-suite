import { Metadata } from 'next'
import Script from 'next/script'
import LandingPageContent from './LandingPageContent'

// SEO Metadata
export const metadata: Metadata = {
  title: 'Lezgo Suite | Solución Empresarial de Automatización',
  description: 'Optimiza tu negocio con Lezgo Suite. Gestión de equipos, análisis avanzado y flujos de trabajo inteligentes para impulsar tu crecimiento.',
  keywords: [
    'automatización empresarial',
    'gestión de equipos',
    'análisis de datos',
    'flujos de trabajo',
    'productividad empresarial',
    'software de negocios',
    'CRM',
    'gestión de proyectos'
  ],
  authors: [{ name: 'Lezgo Suite' }],
  creator: 'Lezgo Suite',
  publisher: 'Lezgo Suite',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.lezgosuite.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lezgo Suite | La Suite Empresarial Que Transforma Organizaciones',
    description: 'Optimiza tu negocio con Lezgo Suite. Gestión de equipos, análisis avanzado y flujos de trabajo inteligentes.',
    url: 'https://www.lezgosuite.com',
    siteName: 'Lezgo Suite',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lezgo Suite - Automatización Empresarial',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lezgo Suite | Solución Empresarial de Automatización',
    description: 'Optimiza tu negocio con Lezgo Suite. Gestión de equipos, análisis avanzado y flujos de trabajo.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lezgo Suite',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  description: 'Plataforma de automatización empresarial para gestión de equipos, análisis de datos y optimización de flujos de trabajo.',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Lezgo Suite',
  url: 'https://www.lezgosuite.com',
  logo: 'https://www.lezgosuite.com/logo.png',
}

export default function LandingPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="software-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      
      {/* Main Content */}
      <LandingPageContent />
    </>
  )
}