import type { Metadata } from 'next'

export const SITE_CONFIG = {
  name: 'Lezgo Suite',
  url: 'https://www.lezgosuite.com',
  locale: 'es_MX',
  logoUrl: 'https://www.lezgosuite.com/LOGONUEVO.png',
  telephone: '+52 1 442 454 7818',
  email: 'contacto@lezgosuite.com',
  address: {
    streetAddress: 'Lic. Manuel Gómez Morin 3960-Torre 100 Oficina 7A',
    addressLocality: 'Santiago de Querétaro',
    addressRegion: 'Qro.',
    postalCode: '76090',
    addressCountry: 'MX',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
}

export function createMetadata(overrides: {
  title: string
  description: string
  path: string
  keywords?: string[]
  noindex?: boolean
}): Metadata {
  const { title, description, path, keywords = [], noindex = false } = overrides

  return {
    title,
    description,
    keywords,
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}${path}`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}
