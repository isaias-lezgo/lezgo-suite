import { MetadataRoute } from 'next'

const BASE = 'https://www.lezgosuite.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE,                             lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/landing`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/gestion-ventas`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/automatizacion-ia`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/analisis-empresarial`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/integracion-total`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/base-conocimiento`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/sobre-nosotros`,         lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contacto`,               lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/aviso-privacidad`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/terminos-y-condiciones`, lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
