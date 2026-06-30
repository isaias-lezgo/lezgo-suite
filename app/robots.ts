import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/bienvenida', '/launchpad'],
      },
    ],
    sitemap: 'https://www.lezgosuite.com/sitemap.xml',
  }
}
