# Vercel Observability Enhancement — Design Spec

**Date:** 2026-05-24  
**Status:** Approved

## Overview

Enhance Vercel Analytics observability on the Lezgo Suite marketing site across three dimensions: conversion funnel, content engagement, and performance. The implementation centralizes the tracking abstraction and adds scroll depth, section visibility, missing funnel events, and Web Vitals forwarding.

---

## 1. Central Analytics Module

**File:** `lib/analytics.ts`

Single exported `trackEvent(name, params?)` function that fires both Vercel Analytics `track()` and Facebook Pixel `fbq("trackCustom", ...)` in one call. Replaces the three duplicate `handleTrackingAndNavigate` copies that currently exist in `navbar.tsx`, `footer.tsx`, and `components/custom/BotonesLanding.tsx`.

```ts
import { track } from "@vercel/analytics"

export function trackEvent(name: string, params?: Record<string, unknown>) {
  track(name, params)
  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
    (window as any).fbq("trackCustom", name, params)
  }
}
```

All three files drop their local copy and import `trackEvent` from `@/lib/analytics`. No event names or params change.

---

## 2. Missing Funnel Events

### Contact Form (`app/contacto/page.tsx`)

| Trigger | Event name | Params |
|---|---|---|
| Successful webhook response | `"Formulario Enviado"` | `{ industria, cargo }` |
| Catch block (network/server error) | `"Error Formulario"` | `{ error_type: "network" }` |
| Field `onBlur` with empty value | `"Campo Abandonado"` | `{ field: "<field_name>" }` |

No PII is included. `industria` and `cargo` are select-field values useful for lead segmentation.

### 404 Page (`app/not-found.tsx`)

Add a `useEffect` that fires on mount (component is already `'use client'`):

```ts
trackEvent("Página 404", { pathname: window.location.pathname })
```

### Feature Detail Pages

Each of the four feature pages (`/analisis-empresarial`, `/automatizacion-ia`, `/gestion-ventas`, `/integracion-total`) has CTA buttons that currently fire no events. Add to each CTA's `onClick`:

```ts
trackEvent("CTA Página Funcionalidad", { page: "<slug>", action: "<button_label>" })
```

---

## 3. Scroll Depth Hook

**File:** `hooks/use-scroll-depth.ts`

Fires `"Scroll Depth" { page, percent }` at 25, 50, 75, and 100% thresholds. Each threshold fires at most once per page load (guarded by a `Set`). Uses a passive scroll listener for performance.

```ts
export function useScrollDepth(page: string) {
  useEffect(() => {
    const thresholds = [25, 50, 75, 100]
    const fired = new Set<number>()
    const handleScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const pct = (window.scrollY / scrollable) * 100
      thresholds.forEach(t => {
        if (pct >= t && !fired.has(t)) {
          fired.add(t)
          trackEvent("Scroll Depth", { page, percent: t })
        }
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [page])
}
```

**Usage:** Called once at the top of `app/page.tsx` (already a client component):
```ts
useScrollDepth("landing")
```

---

## 4. Section Visibility Hook

**File:** `hooks/use-section-visibility.ts`

Returns a `ref` to attach to a section element. Fires `"Sección Vista" { section, page }` when 30% of the element enters the viewport, then disconnects the observer (fires at most once per page load).

```ts
export function useSectionVisibility(sectionName: string, page: string) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent("Sección Vista", { section: sectionName, page })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [sectionName, page])
  return ref
}
```

**Sections to instrument** in `app/page.tsx`:

The landing section components (`Hero.tsx`, `Funcionalidades.tsx`, etc.) don't use `forwardRef`, so refs go on `<div>` wrappers in `app/page.tsx` around each imported section — no changes to the section components themselves:

```tsx
// in app/page.tsx
const heroRef = useSectionVisibility("hero", "landing")
const pricingRef = useSectionVisibility("precios", "landing")
// etc.

<div ref={heroRef}><HeroSection /></div>
<div ref={pricingRef}><PreciosSection /></div>
```

| Section | `sectionName` value |
|---|---|
| Hero | `"hero"` |
| Funcionalidades | `"funcionalidades"` |
| Características | `"caracteristicas"` |
| Precios | `"precios"` |
| Testimonios | `"testimonios"` |
| FAQ | `"faq"` |

---

## 5. Web Vitals Forwarding

**File:** `components/custom/WebVitals.tsx`

A `"use client"` component that calls `useReportWebVitals` from Next.js and forwards each metric into Vercel Analytics via `trackEvent`:

```tsx
"use client"
import { useReportWebVitals } from "next/web-vitals"
import { trackEvent } from "@/lib/analytics"

export function WebVitals() {
  useReportWebVitals((metric) => {
    trackEvent(`Web Vital - ${metric.name}`, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      rating: metric.rating,
    })
  })
  return null
}
```

Metrics forwarded: CLS, FCP, LCP, INP, TTFB. The `rating` field (`"good"` | `"needs-improvement"` | `"poor"`) enables Vercel dashboard filtering.

`<WebVitals />` is added to `app/layout.tsx` alongside the existing `<Analytics />` and `<SpeedInsights />`. SpeedInsights is kept — it powers the dedicated Speed Insights tab; the Web Vitals events land in the custom Events tab with all behavioral data.

---

## Event Taxonomy Summary

| Event name | When | Key params |
|---|---|---|
| `"CTA Hero"` | Hero button click | — |
| `"Explorar funcionalidades"` | Feature explore button | `target_href` |
| `"Empezar plan - {name}"` | Pricing plan click | `plan_name` |
| `"Demo"` | Specialist booking click | — |
| `"Toggle - FAQ"` | FAQ accordion toggle | `question`, `state` |
| `"Botón Whatsapp Página"` | WhatsApp float click | — |
| `"CTA Footer"` | Footer CTA click | — |
| `"Formulario Enviado"` | Contact form success | `industria`, `cargo` |
| `"Error Formulario"` | Contact form failure | `error_type` |
| `"Campo Abandonado"` | Form field blur + empty | `field` |
| `"Página 404"` | 404 page load | `pathname` |
| `"CTA Página Funcionalidad"` | Feature page CTA click | `page`, `action` |
| `"Scroll Depth"` | 25/50/75/100% scroll | `page`, `percent` |
| `"Sección Vista"` | Section enters viewport | `section`, `page` |
| `"Web Vital - {name}"` | Web vitals report | `value`, `rating` |

---

## Files Changed

| File | Change |
|---|---|
| `lib/analytics.ts` | **New** — central trackEvent |
| `hooks/use-scroll-depth.ts` | **New** |
| `hooks/use-section-visibility.ts` | **New** |
| `components/custom/WebVitals.tsx` | **New** |
| `components/navbar.tsx` | Replace local fn with import |
| `components/footer.tsx` | Replace local fn with import |
| `components/custom/BotonesLanding.tsx` | Replace local fn with import |
| `app/layout.tsx` | Add `<WebVitals />` |
| `app/page.tsx` | Add `useScrollDepth`, section refs |
| `app/contacto/page.tsx` | Add form event tracking |
| `app/not-found.tsx` | Add 404 tracking |
| `app/analisis-empresarial/page.tsx` | Add CTA tracking |
| `app/automatizacion-ia/page.tsx` | Add CTA tracking |
| `app/gestion-ventas/page.tsx` | Add CTA tracking |
| `app/integracion-total/page.tsx` | Add CTA tracking |
| `app/landing/*.tsx` | Add section visibility refs |
