# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add centralized SEO architecture to Lezgo Suite — sitemap, robots, per-page metadata, JSON-LD structured data, and a dynamic OG image — covering all 10 routes.

**Architecture:** A central `lib/seo.ts` exports `SITE_CONFIG` and `createMetadata()`. Each page imports and calls it to produce its own `export const metadata`. JSON-LD is injected via a server-only `<JsonLd>` component. Sitemap and robots are generated automatically by Next.js via `app/sitemap.ts` and `app/robots.ts`.

**Tech Stack:** Next.js 16 App Router, TypeScript, `next/og` (built-in ImageResponse), Schema.org JSON-LD

---

## File Map

| Status | File | What it does |
|--------|------|-------------|
| CREATE | `lib/seo.ts` | Central config (`SITE_CONFIG`) + `createMetadata()` helper |
| CREATE | `components/custom/JsonLd.tsx` | Server component that injects `<script type="application/ld+json">` |
| CREATE | `app/sitemap.ts` | Generates `/sitemap.xml` automatically via Next.js |
| CREATE | `app/robots.ts` | Generates `/robots.txt` automatically via Next.js |
| CREATE | `app/opengraph-image.tsx` | Dynamic 1200×630 OG image served at `/opengraph-image` |
| CREATE | `app/HomeContent.tsx` | All current `app/page.tsx` client-side logic (moved as-is) |
| MODIFY | `app/page.tsx` | Thin server shell: exports `metadata`, renders `<HomeContent />` |
| MODIFY | `app/layout.tsx` | Add `metadataBase`, inject Organization + LocalBusiness JSON-LD |
| MODIFY | `app/gestion-ventas/page.tsx` | Add `export const metadata` + WebPage + BreadcrumbList JSON-LD |
| MODIFY | `app/automatizacion-ia/page.tsx` | Add `export const metadata` + WebPage + BreadcrumbList JSON-LD |
| MODIFY | `app/analisis-empresarial/page.tsx` | Add `export const metadata` + WebPage + BreadcrumbList JSON-LD |
| MODIFY | `app/integracion-total/page.tsx` | Add `export const metadata` + WebPage + BreadcrumbList JSON-LD |
| MODIFY | `app/sobre-nosotros/page.tsx` | Add `export const metadata` + AboutPage JSON-LD |
| MODIFY | `app/contacto/page.tsx` | Add `export const metadata` + ContactPage JSON-LD |
| MODIFY | `app/aviso-privacidad/page.tsx` | Add `export const metadata` with `robots: noindex` |
| MODIFY | `app/terminos-y-condiciones/page.tsx` | Add `export const metadata` with `robots: noindex` |
| MODIFY | `app/bienvenida/page.tsx` | Add `export const metadata` with `robots: noindex` |
| MODIFY | `components/footer.tsx` | Fix copyright © 2025 → © 2026 |

---

## Task 1: Create lib/seo.ts

**Files:**
- Create: `lib/seo.ts`

- [ ] **Step 1: Create the file**

```ts
// lib/seo.ts
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors on `lib/seo.ts`

- [ ] **Step 3: Commit**

```bash
git add lib/seo.ts
git commit -m "feat(seo): add central SEO config and createMetadata helper"
```

---

## Task 2: Create components/custom/JsonLd.tsx

**Files:**
- Create: `components/custom/JsonLd.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/custom/JsonLd.tsx
type JsonLdData = Record<string, unknown> | Record<string, unknown>[]

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

Note: No `'use client'` — this is intentionally a server component so JSON-LD is always in the initial HTML.

- [ ] **Step 2: Commit**

```bash
git add components/custom/JsonLd.tsx
git commit -m "feat(seo): add reusable JsonLd server component"
```

---

## Task 3: Update app/layout.tsx — metadataBase + Organization + LocalBusiness

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update the file**

Replace the current `metadata` export and `RootLayout` body with:

```tsx
// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import FloatingWhatsApp from "@/components/custom/FloatingWhatsapp"
import PixelPrincipal from "@/components/custom/Pixel/PixelPrincipal"
import PixelRouter from "@/components/custom/Pixel/PixelRouter"
import { Suspense } from "react"
import { JsonLd } from "@/components/custom/JsonLd"
import { SITE_CONFIG } from "@/lib/seo"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: {
    default: "Lezgo Suite — CRM y Automatización Empresarial para México",
    template: "%s | Lezgo Suite",
  },
  description:
    "Gestiona ventas, automatiza procesos y conecta todos tus canales con IA. La plataforma empresarial #1 para empresas mexicanas.",
  metadataBase: new URL("https://www.lezgosuite.com"),
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/favicon-32x32.png",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: SITE_CONFIG.logoUrl,
  email: SITE_CONFIG.email,
  telephone: SITE_CONFIG.telephone,
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.telephone,
  email: SITE_CONFIG.email,
  openingHours: SITE_CONFIG.openingHours,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address.streetAddress,
    addressLocality: SITE_CONFIG.address.addressLocality,
    addressRegion: SITE_CONFIG.address.addressRegion,
    postalCode: SITE_CONFIG.address.postalCode,
    addressCountry: SITE_CONFIG.address.addressCountry,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body>
        <JsonLd data={[organizationJsonLd, localBusinessJsonLd]} />
        <PixelPrincipal />
        <Suspense>
          <PixelRouter />
        </Suspense>
        <Navbar />
        <main className="pt-16">
          {children}
          <Analytics />
          <SpeedInsights />
          <FloatingWhatsApp />
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify dev server still works**

```bash
curl -s http://localhost:3000 | grep -o 'application/ld+json' | head -3
```

Expected: at least two matches (Organization + LocalBusiness)

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(seo): add metadataBase and Organization/LocalBusiness JSON-LD to layout"
```

---

## Task 4: Refactor app/page.tsx → server shell + app/HomeContent.tsx

**Files:**
- Create: `app/HomeContent.tsx`
- Modify: `app/page.tsx`

`app/page.tsx` is currently a 930-line `'use client'` component. Next.js cannot export `metadata` from client components, so we split it.

- [ ] **Step 1: Create app/HomeContent.tsx**

Copy the ENTIRE content of `app/page.tsx` into `app/HomeContent.tsx` as-is, then rename the exported function to `HomeContent`:

```bash
cp app/page.tsx app/HomeContent.tsx
```

Then edit `app/HomeContent.tsx`: change the last export line from:
```tsx
export default function LandingPage() {
```
to:
```tsx
export default function HomeContent() {
```

The `'use client'` directive at the top stays in place.

- [ ] **Step 2: Replace app/page.tsx with server shell**

```tsx
// app/page.tsx
import type { Metadata } from 'next'
import HomeContent from './HomeContent'

export const metadata: Metadata = {
  title: 'Lezgo Suite — CRM y Automatización Empresarial para México',
  description:
    'Gestiona ventas, automatiza procesos y conecta todos tus canales con IA. La plataforma empresarial #1 para empresas mexicanas.',
  keywords: [
    'CRM México',
    'automatización empresarial México',
    'software empresarial',
    'plataforma CRM LATAM',
    'gestión ventas México',
  ],
  alternates: { canonical: '/' },
}

export default function Page() {
  return <HomeContent />
}
```

- [ ] **Step 3: Verify homepage still renders**

Open http://localhost:3000 — the page should look identical to before.

- [ ] **Step 4: Verify metadata is present**

```bash
curl -s http://localhost:3000 | grep -o 'content="[^"]*CRM[^"]*"'
```

Expected: output contains the new description with "CRM México"

- [ ] **Step 5: Commit**

```bash
git add app/HomeContent.tsx app/page.tsx
git commit -m "refactor(seo): split app/page.tsx into server shell + HomeContent client component"
```

---

## Task 5: Homepage JSON-LD — SoftwareApplication + FAQPage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add JSON-LD to app/page.tsx**

```tsx
// app/page.tsx
import type { Metadata } from 'next'
import HomeContent from './HomeContent'
import { JsonLd } from '@/components/custom/JsonLd'

export const metadata: Metadata = {
  title: 'Lezgo Suite — CRM y Automatización Empresarial para México',
  description:
    'Gestiona ventas, automatiza procesos y conecta todos tus canales con IA. La plataforma empresarial #1 para empresas mexicanas.',
  keywords: [
    'CRM México',
    'automatización empresarial México',
    'software empresarial',
    'plataforma CRM LATAM',
    'gestión ventas México',
  ],
  alternates: { canonical: '/' },
}

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lezgo Suite',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  description:
    'Plataforma de CRM, automatización empresarial e integraciones todo-en-uno para empresas mexicanas.',
  offers: {
    '@type': 'Offer',
    price: '3527',
    priceCurrency: 'MXN',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '3527',
      priceCurrency: 'MXN',
      unitText: 'MONTH',
    },
  },
  url: 'https://www.lezgosuite.com',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo garantizan la seguridad de nuestros datos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Utilizamos encriptación AES-256, certificación ISO 27001, servidores en múltiples regiones, backups automáticos y cumplimos con GDPR y regulaciones locales de protección de datos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo integrar Lezgo Suite con nuestros sistemas actuales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, ofrecemos más de 500 integraciones nativas y APIs robustas. Nuestro equipo técnico asegura una integración perfecta con ERP, contabilidad, marketing y otras herramientas empresariales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo funciona la escalabilidad de la plataforma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La plataforma escala automáticamente según tus necesidades. Desde equipos pequeños hasta organizaciones con miles de usuarios, sin límites de almacenamiento o procesamiento.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <JsonLd data={softwareAppJsonLd} />
      <JsonLd data={faqJsonLd} />
      <HomeContent />
    </>
  )
}
```

- [ ] **Step 2: Verify JSON-LD appears**

```bash
curl -s http://localhost:3000 | grep -o 'FAQPage\|SoftwareApplication'
```

Expected: both strings appear in output

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(seo): add SoftwareApplication and FAQPage JSON-LD to homepage"
```

---

## Task 6: Create app/sitemap.ts + app/robots.ts

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Create app/sitemap.ts**

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'

const BASE = 'https://www.lezgosuite.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE,                                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/landing`,                       lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/gestion-ventas`,                lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/automatizacion-ia`,             lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/analisis-empresarial`,          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/integracion-total`,             lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/sobre-nosotros`,                lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contacto`,                      lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/aviso-privacidad`,              lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/terminos-y-condiciones`,        lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
```

- [ ] **Step 2: Create app/robots.ts**

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/bienvenida'],
      },
    ],
    sitemap: 'https://www.lezgosuite.com/sitemap.xml',
  }
}
```

- [ ] **Step 3: Verify both routes are served**

```bash
curl -s http://localhost:3000/sitemap.xml | head -20
```
Expected: XML with `<urlset>` and `<loc>https://www.lezgosuite.com</loc>`

```bash
curl -s http://localhost:3000/robots.txt
```
Expected:
```
User-Agent: *
Allow: /
Disallow: /bienvenida
Sitemap: https://www.lezgosuite.com/sitemap.xml
```

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat(seo): add auto-generated sitemap.xml and robots.txt"
```

---

## Task 7: Create app/opengraph-image.tsx + public/og-image.jpg

**Files:**
- Create: `app/opengraph-image.tsx`
- Create: `public/og-image.jpg` (generated from running server)

- [ ] **Step 1: Create app/opengraph-image.tsx**

```tsx
// app/opengraph-image.tsx
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
```

- [ ] **Step 2: Verify the image is served**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/opengraph-image
```

Expected: `200`

- [ ] **Step 3: Save it as public/og-image.jpg**

This creates the static fallback that `/landing/page.tsx` references (hardcoded as `/og-image.jpg`):

```bash
curl -s http://localhost:3000/opengraph-image -o public/og-image.jpg
```

Verify it's a valid image file:
```bash
file public/og-image.jpg
```
Expected: output contains "PNG image data" or "image data" (the extension is .jpg but the content is PNG — browsers and crawlers handle this fine)

- [ ] **Step 4: Commit**

```bash
git add app/opengraph-image.tsx public/og-image.jpg
git commit -m "feat(seo): add dynamic OG image and static fallback for /landing/"
```

---

## Task 8: Feature pages — server shell split + metadata + WebPage + BreadcrumbList JSON-LD

**Files:**
- Create: `app/gestion-ventas/GestionVentasContent.tsx`
- Modify: `app/gestion-ventas/page.tsx`
- Create: `app/automatizacion-ia/AutomatizacionIAContent.tsx`
- Modify: `app/automatizacion-ia/page.tsx`
- Create: `app/analisis-empresarial/AnalisisEmpresarialContent.tsx`
- Modify: `app/analisis-empresarial/page.tsx`
- Create: `app/integracion-total/IntegracionTotalContent.tsx`
- Modify: `app/integracion-total/page.tsx`

Each feature page is `'use client'` — Next.js **cannot** export `metadata` from client components. Use the same server shell pattern as Task 4: move the client logic to a `*Content.tsx` file, replace `page.tsx` with a thin server component that exports metadata and renders the content + JSON-LD.

- [ ] **Step 1: Split app/gestion-ventas**

```bash
cp app/gestion-ventas/page.tsx app/gestion-ventas/GestionVentasContent.tsx
```

In `app/gestion-ventas/GestionVentasContent.tsx`, rename the default export:
```tsx
// change:
export default function GestionVentasPage() {
// to:
export default function GestionVentasContent() {
```

Replace `app/gestion-ventas/page.tsx` entirely with:

```tsx
// app/gestion-ventas/page.tsx
import type { Metadata } from 'next'
import { JsonLd } from '@/components/custom/JsonLd'
import GestionVentasContent from './GestionVentasContent'

export const metadata: Metadata = {
  title: 'Gestión de Ventas y CRM',
  description:
    'CRM inteligente con pipeline de oportunidades, seguimiento de contactos y automatización de tareas. Cierra más ventas en menos tiempo.',
  keywords: ['CRM ventas México', 'gestión de ventas', 'pipeline ventas', 'software CRM', 'seguimiento clientes'],
  alternates: { canonical: '/gestion-ventas' },
  openGraph: {
    title: 'Gestión de Ventas y CRM | Lezgo Suite',
    description:
      'CRM inteligente con pipeline de oportunidades, seguimiento de contactos y automatización de tareas. Cierra más ventas en menos tiempo.',
    url: 'https://www.lezgosuite.com/gestion-ventas',
    siteName: 'Lezgo Suite',
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Gestión de Ventas y CRM',
    description: 'CRM inteligente con pipeline de oportunidades, seguimiento de contactos y automatización de tareas.',
    url: 'https://www.lezgosuite.com/gestion-ventas',
    isPartOf: { '@type': 'WebSite', url: 'https://www.lezgosuite.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.lezgosuite.com' },
      { '@type': 'ListItem', position: 2, name: 'Gestión de Ventas', item: 'https://www.lezgosuite.com/gestion-ventas' },
    ],
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <GestionVentasContent />
    </>
  )
}
```

- [ ] **Step 2: Verify /gestion-ventas has its own title**

```bash
curl -s http://localhost:3000/gestion-ventas | grep -o '<title>[^<]*</title>'
```

Expected: `<title>Gestión de Ventas y CRM | Lezgo Suite</title>`

- [ ] **Step 3: Commit gestion-ventas**

```bash
git add app/gestion-ventas/
git commit -m "feat(seo): add metadata and JSON-LD to /gestion-ventas"
```

- [ ] **Step 4: Split app/automatizacion-ia**

```bash
cp app/automatizacion-ia/page.tsx app/automatizacion-ia/AutomatizacionIAContent.tsx
```

In `AutomatizacionIAContent.tsx`, rename:
```tsx
// change:
export default function AutomatizacionIAPage() {
// to:
export default function AutomatizacionIAContent() {
```

Replace `app/automatizacion-ia/page.tsx` with:

```tsx
// app/automatizacion-ia/page.tsx
import type { Metadata } from 'next'
import { JsonLd } from '@/components/custom/JsonLd'
import AutomatizacionIAContent from './AutomatizacionIAContent'

export const metadata: Metadata = {
  title: 'Automatización con IA para Empresas',
  description:
    'Chatbots inteligentes, workflows automatizados y respuestas 24/7 en WhatsApp, Instagram y más. Automatiza tu empresa con IA avanzada.',
  keywords: ['automatización IA empresarial', 'chatbot IA México', 'workflows automáticos', 'automatización WhatsApp'],
  alternates: { canonical: '/automatizacion-ia' },
  openGraph: {
    title: 'Automatización con IA para Empresas | Lezgo Suite',
    description:
      'Chatbots inteligentes, workflows automatizados y respuestas 24/7 en WhatsApp, Instagram y más.',
    url: 'https://www.lezgosuite.com/automatizacion-ia',
    siteName: 'Lezgo Suite',
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
}
```

Complete the `app/automatizacion-ia/page.tsx` replacement (continuing from Step 4):

```tsx
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Automatización con IA para Empresas',
    description: 'Chatbots inteligentes, workflows automatizados y respuestas 24/7 para empresas.',
    url: 'https://www.lezgosuite.com/automatizacion-ia',
    isPartOf: { '@type': 'WebSite', url: 'https://www.lezgosuite.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.lezgosuite.com' },
      { '@type': 'ListItem', position: 2, name: 'Automatización IA', item: 'https://www.lezgosuite.com/automatizacion-ia' },
    ],
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <AutomatizacionIAContent />
    </>
  )
}
```

- [ ] **Step 5: Commit automatizacion-ia**

```bash
git add app/automatizacion-ia/
git commit -m "feat(seo): add metadata and JSON-LD to /automatizacion-ia"
```

- [ ] **Step 6: Split app/analisis-empresarial**

```bash
cp app/analisis-empresarial/page.tsx app/analisis-empresarial/AnalisisEmpresarialContent.tsx
```

In `AnalisisEmpresarialContent.tsx`, rename:
```tsx
// change:
export default function AnalisisEmpresarialPage() {
// to:
export default function AnalisisEmpresarialContent() {
```

Replace `app/analisis-empresarial/page.tsx` with:

```tsx
// app/analisis-empresarial/page.tsx
import type { Metadata } from 'next'
import { JsonLd } from '@/components/custom/JsonLd'
import AnalisisEmpresarialContent from './AnalisisEmpresarialContent'

export const metadata: Metadata = {
  title: 'Análisis Empresarial y Reportes',
  description:
    'Dashboards interactivos, reportes de conversión y analítica de campañas en tiempo real. Toma decisiones basadas en datos con Lezgo Suite.',
  keywords: ['análisis empresarial México', 'reportes ventas', 'dashboards empresariales', 'analítica CRM'],
  alternates: { canonical: '/analisis-empresarial' },
  openGraph: {
    title: 'Análisis Empresarial y Reportes | Lezgo Suite',
    description: 'Dashboards interactivos, reportes de conversión y analítica de campañas en tiempo real.',
    url: 'https://www.lezgosuite.com/analisis-empresarial',
    siteName: 'Lezgo Suite',
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Análisis Empresarial y Reportes',
    description: 'Dashboards interactivos y analítica de campañas en tiempo real.',
    url: 'https://www.lezgosuite.com/analisis-empresarial',
    isPartOf: { '@type': 'WebSite', url: 'https://www.lezgosuite.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.lezgosuite.com' },
      { '@type': 'ListItem', position: 2, name: 'Análisis Empresarial', item: 'https://www.lezgosuite.com/analisis-empresarial' },
    ],
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <AnalisisEmpresarialContent />
    </>
  )
}
```

- [ ] **Step 7: Commit analisis-empresarial**

```bash
git add app/analisis-empresarial/
git commit -m "feat(seo): add metadata and JSON-LD to /analisis-empresarial"
```

- [ ] **Step 8: Split app/integracion-total**

```bash
cp app/integracion-total/page.tsx app/integracion-total/IntegracionTotalContent.tsx
```

In `IntegracionTotalContent.tsx`, rename:
```tsx
// change:
export default function IntegracionTotalPage() {
// to:
export default function IntegracionTotalContent() {
```

Replace `app/integracion-total/page.tsx` with:

```tsx
// app/integracion-total/page.tsx
import type { Metadata } from 'next'
import { JsonLd } from '@/components/custom/JsonLd'
import IntegracionTotalContent from './IntegracionTotalContent'

export const metadata: Metadata = {
  title: 'Integraciones Empresariales 500+ Apps',
  description:
    'Conecta Google Workspace, Shopify, Stripe, Make y más de 500 aplicaciones. APIs robustas y sincronización en tiempo real para tu empresa.',
  keywords: ['integraciones empresariales México', 'conectar apps empresa', 'API empresarial', 'integración CRM'],
  alternates: { canonical: '/integracion-total' },
  openGraph: {
    title: 'Integraciones Empresariales 500+ Apps | Lezgo Suite',
    description: 'Conecta Google Workspace, Shopify, Stripe, Make y más de 500 aplicaciones.',
    url: 'https://www.lezgosuite.com/integracion-total',
    siteName: 'Lezgo Suite',
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Integraciones Empresariales 500+ Apps',
    description: 'Conecta más de 500 aplicaciones con APIs robustas y sincronización en tiempo real.',
    url: 'https://www.lezgosuite.com/integracion-total',
    isPartOf: { '@type': 'WebSite', url: 'https://www.lezgosuite.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.lezgosuite.com' },
      { '@type': 'ListItem', position: 2, name: 'Integraciones', item: 'https://www.lezgosuite.com/integracion-total' },
    ],
  },
]

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <IntegracionTotalContent />
    </>
  )
}
```

- [ ] **Step 9: Commit integracion-total**

```bash
git add app/integracion-total/
git commit -m "feat(seo): add metadata and JSON-LD to /integracion-total"
```

---

## Task 9: /sobre-nosotros — server shell + metadata + AboutPage JSON-LD

**Files:**
- Create: `app/sobre-nosotros/SobreNosotrosContent.tsx`
- Modify: `app/sobre-nosotros/page.tsx`

- [ ] **Step 1: Split sobre-nosotros**

```bash
cp app/sobre-nosotros/page.tsx app/sobre-nosotros/SobreNosotrosContent.tsx
```

In `SobreNosotrosContent.tsx`, rename:
```tsx
// change:
export default function SobreNosotrosPage() {
// to:
export default function SobreNosotrosContent() {
```

Replace `app/sobre-nosotros/page.tsx` with:

```tsx
// app/sobre-nosotros/page.tsx
import type { Metadata } from 'next'
import { JsonLd } from '@/components/custom/JsonLd'
import SobreNosotrosContent from './SobreNosotrosContent'

export const metadata: Metadata = {
  title: 'Sobre Nosotros — Quiénes Somos',
  description:
    'Conoce el equipo detrás de Lezgo Suite. Más de 14 años de experiencia, 52+ especialistas y 4 empresas del grupo transformando negocios en México.',
  keywords: ['Lezgo Suite empresa México', 'quiénes somos', 'equipo empresarial'],
  alternates: { canonical: '/sobre-nosotros' },
  openGraph: {
    title: 'Sobre Nosotros — Quiénes Somos | Lezgo Suite',
    description:
      'Más de 14 años de experiencia, 52+ especialistas y 4 empresas del grupo transformando negocios en México.',
    url: 'https://www.lezgosuite.com/sobre-nosotros',
    siteName: 'Lezgo Suite',
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Sobre Nosotros — Lezgo Suite',
  description:
    'Más de 14 años de experiencia, 52+ especialistas y 4 empresas del grupo transformando negocios en México.',
  url: 'https://www.lezgosuite.com/sobre-nosotros',
}

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SobreNosotrosContent />
    </>
  )
}
```

- [ ] **Step 2: Verify title**

```bash
curl -s http://localhost:3000/sobre-nosotros | grep -o '<title>[^<]*</title>'
```

Expected: `<title>Sobre Nosotros — Quiénes Somos | Lezgo Suite</title>`

- [ ] **Step 3: Commit**

```bash
git add app/sobre-nosotros/
git commit -m "feat(seo): add metadata and AboutPage JSON-LD to /sobre-nosotros"
```

---

## Task 10: /contacto — server shell + metadata + ContactPage JSON-LD

**Files:**
- Create: `app/contacto/ContactoContent.tsx`
- Modify: `app/contacto/page.tsx`

- [ ] **Step 1: Split contacto**

```bash
cp app/contacto/page.tsx app/contacto/ContactoContent.tsx
```

In `ContactoContent.tsx`, rename:
```tsx
// change:
export default function ContactPage() {
// to:
export default function ContactoContent() {
```

Replace `app/contacto/page.tsx` with:

```tsx
// app/contacto/page.tsx
import type { Metadata } from 'next'
import { JsonLd } from '@/components/custom/JsonLd'
import ContactoContent from './ContactoContent'

export const metadata: Metadata = {
  title: 'Contacto — Habla con un Especialista',
  description:
    '¿Listo para transformar tu empresa? Agenda una llamada con nuestro equipo. Atención personalizada para empresas en México y Latinoamérica.',
  keywords: ['contacto Lezgo Suite', 'demo CRM México', 'agenda llamada empresa'],
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: 'Contacto — Habla con un Especialista | Lezgo Suite',
    description:
      'Agenda una llamada con nuestro equipo. Atención personalizada para empresas en México y Latinoamérica.',
    url: 'https://www.lezgosuite.com/contacto',
    siteName: 'Lezgo Suite',
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contacto — Lezgo Suite',
  url: 'https://www.lezgosuite.com/contacto',
}

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ContactoContent />
    </>
  )
}
```

- [ ] **Step 2: Verify**

```bash
curl -s http://localhost:3000/contacto | grep -o '<title>[^<]*</title>'
```

Expected: `<title>Contacto — Habla con un Especialista | Lezgo Suite</title>`

- [ ] **Step 3: Commit**

```bash
git add app/contacto/
git commit -m "feat(seo): add metadata and ContactPage JSON-LD to /contacto"
```

---

## Task 11: Legal and utility pages — noindex metadata

**Files:**
- Modify: `app/aviso-privacidad/page.tsx`
- Modify: `app/terminos-y-condiciones/page.tsx`
- Modify: `app/bienvenida/page.tsx`

These pages should not appear in search results.

- [ ] **Step 1: Add to app/aviso-privacidad/page.tsx**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad',
  robots: { index: false, follow: false },
}
```

- [ ] **Step 2: Add to app/terminos-y-condiciones/page.tsx**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  robots: { index: false, follow: false },
}
```

- [ ] **Step 3: Add to app/bienvenida/page.tsx**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bienvenida',
  robots: { index: false, follow: false },
}
```

- [ ] **Step 4: Verify noindex on aviso-privacidad**

```bash
curl -s http://localhost:3000/aviso-privacidad | grep -o 'noindex'
```

Expected: `noindex`

- [ ] **Step 5: Commit**

```bash
git add app/aviso-privacidad/page.tsx app/terminos-y-condiciones/page.tsx app/bienvenida/page.tsx
git commit -m "feat(seo): add noindex metadata to legal and utility pages"
```

---

## Task 12: Fix footer copyright year

**Files:**
- Modify: `components/footer.tsx:173`

- [ ] **Step 1: Update the copyright line**

Find and replace in `components/footer.tsx`:

```tsx
// Before:
<p className="text-gray-400 text-sm">© 2025 Lezgo Suite. Todos los derechos reservados.</p>

// After:
<p className="text-gray-400 text-sm">© 2026 Lezgo Suite. Todos los derechos reservados.</p>
```

- [ ] **Step 2: Verify**

```bash
curl -s http://localhost:3000 | grep -o '© [0-9]*'
```

Expected: `© 2026`

- [ ] **Step 3: Commit**

```bash
git add components/footer.tsx
git commit -m "fix: update footer copyright year to 2026"
```

---

## Final Verification

- [ ] **Run full build to catch any TypeScript issues**

```bash
npm run build 2>&1 | tail -20
```

Expected: build completes, no errors (warnings from existing code are OK)

- [ ] **Spot-check all pages have unique titles**

```bash
for path in "" gestion-ventas automatizacion-ia analisis-empresarial integracion-total sobre-nosotros contacto; do
  title=$(curl -s "http://localhost:3000/$path" | grep -o '<title>[^<]*</title>')
  echo "$path → $title"
done
```

Expected: 7 different titles, none repeating "La Suite Empresarial que Transforma Organizaciones"

- [ ] **Validate JSON-LD with Google Rich Results Test**

Open https://search.google.com/test/rich-results and test:
- `https://www.lezgosuite.com` — should show FAQPage and SoftwareApplication results
- `https://www.lezgosuite.com/gestion-ventas` — should show BreadcrumbList result

(Use the production URL after deploying, or use the URL inspection tool in Google Search Console)

- [ ] **Final commit**

```bash
git add -A
git status  # confirm nothing unexpected
git commit -m "feat(seo): complete SEO architecture — sitemap, robots, metadata, JSON-LD, OG image" --allow-empty-if-no-changes
```
