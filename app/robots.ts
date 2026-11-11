import { MetadataRoute } from 'next'

const DISALLOW = ['/bienvenida', '/launchpad', '/base-conocimiento']

// Named explicitly so there is no doubt that AI search/assistant crawlers are
// welcome. They get the same rules as everyone else.
const AI_CRAWLERS = [
  'OAI-SearchBot',
  'GPTBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Google-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ['*', ...AI_CRAWLERS].map((userAgent) => ({
      userAgent,
      allow: '/',
      disallow: DISALLOW,
    })),
    sitemap: 'https://www.lezgosuite.com/sitemap.xml',
  }
}
