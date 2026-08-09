import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/bienvenida', '/launchpad', '/base-conocimiento'],
      },
    ],
    sitemap: 'https://www.lezgosuite.com/sitemap.xml',
  }
}
