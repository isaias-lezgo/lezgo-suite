# SEO Improvements — Lezgo Suite

**Date:** 2026-05-24  
**Status:** Approved  
**Approach:** Arquitectura SEO centralizada (Opción B)

## Context

Lezgo Suite is a B2B SaaS marketing site built with Next.js 15 App Router, targeting Mexican businesses (primary) and LATAM (secondary). The site is Spanish-language only. There is no blog or new content planned — only the existing 10 routes.

A Playwright audit revealed critical SEO gaps across the site. This spec defines the centralized architecture to fix all of them in one cohesive pass.

## Goals

1. Fix all critical technical SEO issues (sitemap, robots, metadata, OG images)
2. Add per-page metadata with Mexico/LATAM-focused keywords
3. Add structured data (JSON-LD) to key pages
4. Fix LocalBusiness schema with real Querétaro office data

## Out of Scope

- Blog or new content pages
- Consolidating `/landing/` and `/` routes (risk too high)
- AggregateRating (no verified review count)
- Changes to `/landing/page.tsx` (already has solid SEO)

---

## Architecture

### New Files

| File | Purpose |
|------|---------|
| `app/sitemap.ts` | Auto-generates `/sitemap.xml` via Next.js — no manual file needed |
| `app/robots.ts` | Auto-generates `/robots.txt` pointing to the sitemap |
| `app/opengraph-image.tsx` | Dynamic OG image using `@vercel/og` — replaces missing `/og-image.jpg` |
| `lib/seo.ts` | Central SEO config: `SITE_CONFIG`, per-page metadata objects, `createMetadata()` helper |
| `components/custom/JsonLd.tsx` | Server-side reusable component to inject `<script type="application/ld+json">` |
| `public/og-image.jpg` | Static OG image fallback — fixes broken reference in `/landing/page.tsx` without touching that file |

### Modified Files

| File | Change |
|------|--------|
| `app/layout.tsx` | Add `metadataBase`, Organization JSON-LD, LocalBusiness JSON-LD |
| `app/page.tsx` | Convert to server shell; extract client logic to `app/HomeContent.tsx` |
| `app/gestion-ventas/page.tsx` | Add `export const metadata` + WebPage + BreadcrumbList JSON-LD |
| `app/automatizacion-ia/page.tsx` | Add `export const metadata` + WebPage + BreadcrumbList JSON-LD |
| `app/analisis-empresarial/page.tsx` | Add `export const metadata` + WebPage + BreadcrumbList JSON-LD |
| `app/integracion-total/page.tsx` | Add `export const metadata` + WebPage + BreadcrumbList JSON-LD |
| `app/sobre-nosotros/page.tsx` | Add `export const metadata` + AboutPage JSON-LD |
| `app/contacto/page.tsx` | Add `export const metadata` + ContactPage JSON-LD |
| `components/footer.tsx` | Update copyright © 2025 → © 2026 |

### Data Flow

```
lib/seo.ts (config + helper)
    ↓
page.tsx (export const metadata)
    ↓
Next.js (generates <head> tags)
    ↓
Googlebot (indexes correctly)

app/sitemap.ts → /sitemap.xml (served by Vercel)
app/robots.ts  → /robots.txt  (served by Vercel)
```

---

## lib/seo.ts Design

```ts
export const SITE_CONFIG = {
  name: 'Lezgo Suite',
  url: 'https://www.lezgosuite.com',
  locale: 'es_MX',
  twitterHandle: '@lezgosuite', // placeholder if not yet active
}

export function createMetadata(overrides: Partial<Metadata>): Metadata {
  // merges SITE_CONFIG defaults with page-specific overrides
  // sets canonical, openGraph, twitter, robots automatically
}
```

---

## Per-Page Metadata

| Route | Title (≤60 chars) | Description (≤160 chars) |
|-------|-------------------|--------------------------|
| `/` | Lezgo Suite — CRM y Automatización Empresarial para México | Gestiona ventas, automatiza procesos y conecta todos tus canales con IA. La plataforma empresarial #1 para empresas mexicanas. |
| `/gestion-ventas` | Gestión de Ventas y CRM \| Lezgo Suite | CRM inteligente con pipeline de oportunidades, seguimiento de contactos y automatización de tareas. Cierra más ventas en menos tiempo. |
| `/automatizacion-ia` | Automatización con IA para Empresas \| Lezgo Suite | Chatbots inteligentes, workflows automatizados y respuestas 24/7 en WhatsApp, Instagram y más. Automatiza tu empresa con IA avanzada. |
| `/analisis-empresarial` | Análisis Empresarial y Reportes \| Lezgo Suite | Dashboards interactivos, reportes de conversión y analítica de campañas en tiempo real. Toma decisiones basadas en datos con Lezgo Suite. |
| `/integracion-total` | Integraciones Empresariales 500+ Apps \| Lezgo Suite | Conecta Google Workspace, Shopify, Stripe, Make y más de 500 aplicaciones. APIs robustas y sincronización en tiempo real para tu empresa. |
| `/sobre-nosotros` | Sobre Nosotros — Quiénes Somos \| Lezgo Suite | Conoce el equipo detrás de Lezgo Suite. Más de 14 años de experiencia, 52+ especialistas y 4 empresas del grupo transformando negocios en México. |
| `/contacto` | Contacto — Habla con un Especialista \| Lezgo Suite | ¿Listo para transformar tu empresa? Agenda una llamada con nuestro equipo. Atención personalizada para empresas en México y Latinoamérica. |
| `/aviso-privacidad` | Aviso de Privacidad \| Lezgo Suite | — (robots: noindex) |
| `/terminos-y-condiciones` | Términos y Condiciones \| Lezgo Suite | — (robots: noindex) |
| `/bienvenida` | Bienvenida \| Lezgo Suite | — (robots: noindex) |

---

## JSON-LD Structured Data

### app/layout.tsx (all pages inherit)

```json
{
  "@type": "Organization",
  "name": "Lezgo Suite",
  "url": "https://www.lezgosuite.com",
  "logo": "https://www.lezgosuite.com/LOGONUEVO.png"
}
```

```json
{
  "@type": "LocalBusiness",
  "name": "Lezgo Suite",
  "telephone": "+52 1 442 454 7818",
  "email": "contacto@lezgosuite.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Lic. Manuel Gómez Morin 3960-Torre 100 Oficina 7A",
    "addressLocality": "Santiago de Querétaro",
    "addressRegion": "Qro.",
    "postalCode": "76090",
    "addressCountry": "MX"
  },
  "openingHours": "Mo-Fr 09:00-18:00"
}
```

### / (Homepage)

- `SoftwareApplication` — name, category "BusinessApplication", pricing from $3,527 MXN/month
- `FAQPage` — 3 FAQ items from the homepage FAQ section

### Feature pages (/gestion-ventas, /automatizacion-ia, /analisis-empresarial, /integracion-total)

- `WebPage` — name, description, url, isPartOf → lezgosuite.com
- `BreadcrumbList` — Inicio → [Page Name]

### /sobre-nosotros

- `AboutPage` — name, description, url, connects to Organization

### /contacto

- `ContactPage` — url, name

---

## app/page.tsx Refactor

`app/page.tsx` is currently `'use client'` — Next.js App Router cannot export `metadata` from client components. Solution:

```
app/page.tsx        ← Server Component: exports metadata, renders <HomeContent />
app/HomeContent.tsx ← 'use client': all current animation/interaction logic (moved as-is)
```

This mirrors the existing `/landing/` pattern (`landing/page.tsx` + `landing/LandingPageContent.tsx`).

---

## Sitemap Routes

```ts
// app/sitemap.ts
const routes = [
  '/',
  '/landing',
  '/gestion-ventas',
  '/automatizacion-ia',
  '/analisis-empresarial',
  '/integracion-total',
  '/sobre-nosotros',
  '/contacto',
  '/aviso-privacidad',
  '/terminos-y-condiciones',
]
```

Priority: `/` = 1.0, feature pages = 0.8, company pages = 0.5. Change frequency: weekly for `/`, monthly for others.

---

## OG Image

`app/opengraph-image.tsx` — dynamic image generated at build time using `@vercel/og`:
- Background: dark theme matching site (`#0a0a0a`)
- Lezgo Suite logo + brand orange `#F59B1B`
- Title and tagline in Space Grotesk font
- Dimensions: 1200×630px

Replaces the currently broken `/og-image.jpg` and `/twitter-image.jpg` references.

Additionally, export the same image as `public/og-image.jpg` (static file) so that `/landing/page.tsx`'s hardcoded `url: '/og-image.jpg'` reference resolves — without touching that file.

---

## What Is NOT Changed

- `/landing/page.tsx` — already has complete metadata, JSON-LD, and OG config
- All animation logic, visual design, component structure
- Route names/URLs
- Font loading, Tailwind config, theme
- Pixel tracking, Analytics, WhatsApp widget
