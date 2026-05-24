# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint via next lint
npm run start     # Start production server
```

> Note: `next.config.mjs` has `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true`, so CI builds won't fail on type errors.

## Architecture

This is a **Next.js 15 (App Router) marketing site** for Lezgo Suite — a B2B SaaS platform targeting Mexican businesses. The site is primarily Spanish-language.

### Route structure

| Route | Purpose |
|---|---|
| `/` | Main landing page (`app/page.tsx`) — large single-file component with animations |
| `/landing/` | Modular landing sections (FAQ, Hero, Funcionalidades, Pasos, Precios) |
| `/contacto/` | Contact form that POSTs to `NEXT_PUBLIC_WEBHOOK_URL` (see `WEBHOOK_SETUP.md`) |
| `/analisis-empresarial/`, `/automatizacion-ia/`, `/gestion-ventas/`, `/integracion-total/` | Feature detail pages |
| `/sobre-nosotros/`, `/bienvenida/`, `/terminos-y-condiciones/`, `/aviso-privacidad/` | Company pages |

### Component layers

- **`components/ui/`** — shadcn/ui primitives (don't modify directly; re-generate via `shadcn` CLI)
- **`components/custom/`** — site-specific components:
  - `BotonesLanding.tsx` — centralized CTA buttons used across landing pages (HeroButtons, PricingButton, ContactSpecialistButton, etc.)
  - `FloatingWhatsapp.tsx` — floating WhatsApp chat bubble
  - `Pixel/PixelPrincipal.tsx` — injects Meta Pixel (ID: 798232442657226) on initial load
  - `Pixel/PixelRouter.tsx` — fires `fbq('track', 'PageView')` on client-side route changes (must be wrapped in `<Suspense>`)
- **`components/navbar.tsx`** / **`components/footer.tsx`** — shared layout components; both fire Vercel Analytics + Facebook Pixel events via a `handleTrackingAndNavigate` pattern

### Analytics & tracking

All user-facing interaction events are dual-tracked:
1. Vercel Analytics (`track()` from `@vercel/analytics`)
2. Facebook Pixel (`window.fbq('trackCustom', ...)`)

When adding new CTAs or navigation, mirror both calls using the existing pattern in `navbar.tsx`.

### Styling

- Tailwind CSS v4 with `tw-animate-css`
- Design tokens defined in `app/globals.css` as CSS custom properties
- Brand accent color: `#F59B1B` (orange) — maps to `--accent` / `--secondary`
- Dark background theme only (no light mode toggle); `globals.css` defines matching `:root` and `.dark` blocks with identical values
- Fonts: `DM Sans` (body) and `Space Grotesk` (headings) via `next/font/google`

### External integrations

- **Contact form webhook** — requires `NEXT_PUBLIC_WEBHOOK_URL` env var (see `WEBHOOK_SETUP.md` for payload schema and webhook service options)
- **Vercel Analytics + Speed Insights** — imported in layout, no config needed
