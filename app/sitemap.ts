import { MetadataRoute } from 'next'

const BASE = 'https://www.lezgosuite.com'

type Freq = 'weekly' | 'monthly' | 'yearly'

// lastModified is the date of the last REAL content change of each page, set
// by hand: update it in the same commit that changes the page's content.
// (Never use `new Date()` here: it makes every page look modified on every
// request, and crawlers learn to ignore the field.)
const PAGES: [path: string, lastModified: string, changeFrequency: Freq, priority: number][] = [
  ['',                        '2026-09-21', 'weekly',  1.0],
  ['/landing',                '2026-09-21', 'weekly',  0.9],
  ['/inmobiliario',           '2026-11-10', 'weekly',  0.9],
  ['/precios',                '2026-11-10', 'weekly',  0.9],
  ['/comparativas/como-elegir-crm-inmobiliario-con-whatsapp', '2026-11-10', 'monthly', 0.8],
  ['/gestion-ventas',        '2026-05-25', 'monthly', 0.8],
  ['/automatizacion-ia',      '2026-05-25', 'monthly', 0.8],
  ['/analisis-empresarial',   '2026-05-25', 'monthly', 0.8],
  ['/integracion-total',      '2026-05-25', 'monthly', 0.8],
  ['/sobre-nosotros',         '2026-05-24', 'monthly', 0.5],
  ['/contacto',               '2026-11-07', 'monthly', 0.6],
  ['/aviso-privacidad',       '2026-05-24', 'yearly',  0.2],
  ['/terminos-y-condiciones', '2026-05-24', 'yearly',  0.2],
]

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(([path, lastModified, changeFrequency, priority]) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
