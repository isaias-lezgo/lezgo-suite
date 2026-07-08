# Landing `/inmobiliario` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `lezgosuite.com/inmobiliario`, a standalone Google-Ads conversion landing for real-estate agencies, driving toward "Agendar demo", without touching the home or any existing route.

**Architecture:** Next.js 15 App Router. A server component (`page.tsx`) sets SEO metadata + JSON-LD and renders a client component (`InmobiliarioContent.tsx`) that composes focused section files under `app/inmobiliario/sections/`. CTAs live in `BotonesInmobiliario.tsx` and push `dataLayer` events. A new API route verifies reCAPTCHA v3 server-side. Pricing data lives in a shared `lib/pricing.ts` consumed by the new components (existing routes untouched).

**Tech Stack:** Next.js 15, React 18, TypeScript, Tailwind v4, framer-motion, shadcn/ui primitives, `@vercel/analytics`, Google Tag Manager (already global), Google reCAPTCHA v3.

## Global Constraints

- **Do NOT modify the home (`app/page.tsx`) or any existing route/component.** New code only. (Reusing exported helpers like `withGAClientId` by import is fine.)
- **No test framework exists** (`package.json` has no test script). Verification = `npm run build` + dev-server browser checks of rendering and `window.dataLayer`. Do not add a test runner.
- **GTM `GTM-P8333HV6` is already loaded globally** in `app/layout.tsx`. Do not add another container.
- **Copy is authoritative in the spec:** `docs/superpowers/specs/2026-07-07-inmobiliario-landing-design.md`. Paste copy verbatim from the referenced spec section.
- **Do NOT mention "Coexistence" by name** in public copy.
- **Brand accent:** `#F59B1B`. Fonts/tokens already global. Match existing Tailwind idioms.
- **client_reference_id logic must not change:** reuse `withGAClientId()` from `lib/utils.ts` (`.`→`_`, drops other params).
- **`form_submit_success` fires only after the webhook responds OK**, with `form_name:'inmobiliario_demo'` + `form_location`.
- **No commits to a new branch** — user asked to work on `main`. Commit directly to `main` at each task.
- Pricing (base + IVA): Start $1,297 · Growth $3,527 · Pro $5,397 (popular) · Elite $10,567. Discounts: Trimestral −5%, Semestral −10%, Anual −20% (default).
- Metrics (hero, static): `+50` agencias y desarrolladoras · `+400 mil` conversaciones gestionadas · `24/7` atención con bots de IA.
- Contacts (comparison table): Start 100 · Growth 1,000 · Pro 15,000 · Elite ilimitados.

---

### Task 1: Route scaffold + shared pricing module + SEO shell

**Files:**
- Create: `lib/pricing.ts`
- Create: `app/inmobiliario/page.tsx`
- Create: `app/inmobiliario/InmobiliarioContent.tsx`
- Modify: `app/sitemap.ts:17` (add `/inmobiliario` entry)

**Interfaces:**
- Produces: `lib/pricing.ts` exports:
  - `type BillingPeriod = 'mensual' | 'trimestral' | 'semestral' | 'anual'`
  - `BILLING_OPTIONS: { key: BillingPeriod; label: string; discount: number }[]`
  - `BASE_PRICES: { start: number; growth: number; pro: number; elite: number }`
  - `STRIPE_LINKS: Record<'start'|'growth'|'pro'|'elite', Record<BillingPeriod, string>>`
  - `applyDiscount(basePrice: number, discount: number): string`
- Produces: default export `InmobiliarioContent` (client component) consumed by `page.tsx`.

- [ ] **Step 1: Create `lib/pricing.ts`** — copy `BillingPeriod`, `BILLING_OPTIONS`, `BASE_PRICES`, `STRIPE_LINKS`, and `applyDiscount` **verbatim** from `app/landing/Precios.tsx:11-52` into this new module and `export` each. (Do not edit `app/landing/Precios.tsx`; the duplication is intentional to avoid touching existing routes.)

- [ ] **Step 2: Create `app/inmobiliario/InmobiliarioContent.tsx`** — minimal client shell:

```tsx
'use client'

export default function InmobiliarioContent() {
  return (
    <div className="relative overflow-hidden">
      {/* sections wired in later tasks */}
      <div className="container mx-auto px-4 py-24 text-center text-black">
        Landing inmobiliario — en construcción
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `app/inmobiliario/page.tsx`** — server component with SEO + JSON-LD (spec §SEO). Use `createMetadata` from `lib/seo`:

```tsx
import { createMetadata } from "@/lib/seo"
import { SITE_CONFIG } from "@/lib/seo"
import { JsonLd } from "@/components/custom/JsonLd"
import InmobiliarioContent from "./InmobiliarioContent"

export const metadata = createMetadata({
  title: "CRM Inmobiliario | Lezgo Suite",
  description:
    "El CRM inmobiliario con WhatsApp nativo que usan agencias y desarrolladoras en México para centralizar leads, supervisar a su equipo de ventas y cerrar más rápido. Agenda una demo.",
  path: "/inmobiliario",
})

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Lezgo Suite — CRM Inmobiliario",
  description:
    "CRM inmobiliario con WhatsApp centralizado para agencias, desarrolladoras y asesores en México.",
  brand: { "@type": "Organization", name: SITE_CONFIG.name },
  url: `${SITE_CONFIG.url}/inmobiliario`,
}

export default function InmobiliarioPage() {
  return (
    <>
      <JsonLd data={productJsonLd} />
      <InmobiliarioContent />
    </>
  )
}
```

- [ ] **Step 4: Add sitemap entry** — in `app/sitemap.ts`, add after the `/landing` line:

```ts
    { url: `${BASE}/inmobiliario`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
```

- [ ] **Step 5: Verify build + render** — Run: `npm run build`. Expected: compiles, `/inmobiliario` appears in the route list, no new errors. Then `npm run dev` and load `http://localhost:3000/inmobiliario`: navbar + footer show, placeholder text renders, no console errors.

- [ ] **Step 6: Commit**

```bash
git add lib/pricing.ts app/inmobiliario/page.tsx app/inmobiliario/InmobiliarioContent.tsx app/sitemap.ts docs/superpowers/specs/2026-07-07-inmobiliario-landing-design.md docs/superpowers/plans/2026-07-07-inmobiliario-landing.md
git commit -m "feat(inmobiliario): scaffold route, SEO shell and shared pricing module"
```

---

### Task 2: CTA buttons with dataLayer tracking

**Files:**
- Create: `app/inmobiliario/BotonesInmobiliario.tsx`

**Interfaces:**
- Consumes: `withGAClientId` from `@/lib/utils`; `BillingPeriod` from `@/lib/pricing`.
- Produces exported components:
  - `AgendarDemoButton({ location, variant?, children? }: { location: string; variant?: 'primary'|'section'; children?: React.ReactNode })` — pushes `{event:'click_agendar_demo', button_text, button_location: location}`, opens booking widget `https://app.lezgosuite.com/widget/bookings/conocelezgosuite` in new tab.
  - `VerPlanesButton()` — outline CTA, anchor to `#precios` (no event; smooth scroll).
  - `WhatsAppButton({ location }: { location: string })` — pushes `{event:'click_whatsapp', button_location: location}`, opens WhatsApp link.
  - `PlanCheckoutButton({ plan }: { plan: { name: string; link: string; popular: boolean } })` — pushes `{event:'click_payment_link', paquete, plan, button_text, button_location:'precios'}` and rewrites href via `withGAClientId(plan.link)` on click (same logic as existing `PricingButton`).

- [ ] **Step 1: Implement the four components.** Mirror the existing pattern in `components/custom/BotonesLanding.tsx` (dual Vercel `track()` + `fbq` optional, plus `dataLayer.push`). Full `PlanCheckoutButton` click logic (copy the href-rewrite approach from `BotonesLanding.tsx:92-113`):

```tsx
'use client'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { track } from "@vercel/analytics"
import { withGAClientId } from "@/lib/utils"
import type { MouseEvent, ReactNode } from "react"

const BOOKING_URL = "https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
const WHATSAPP_URL = "https://wa.me/5214424547818" // reuse the site's WhatsApp number

function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof (window as any).fbq === "function") (window as any).fbq("trackCustom", event, params)
}

export function AgendarDemoButton({ location, variant = "primary", children }: { location: string; variant?: "primary" | "section"; children?: ReactNode }) {
  const handleClick = () => {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({ event: "click_agendar_demo", button_text: "Agendar demo", button_location: location })
    track("CTA Agendar Demo", { location })
    fbqTrack("CTA Agendar Demo", { location })
  }
  return (
    <Button asChild size="lg" onClick={handleClick}
      className="bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white px-8 py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all rounded-full duration-300 w-full sm:w-auto">
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
        {children ?? "Agendar demo gratis"}
        <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
      </a>
    </Button>
  )
}

export function VerPlanesButton() {
  return (
    <Button asChild size="lg" variant="outline"
      className="border-2 border-[#F59B1B] text-[#F59B1B] hover:bg-[#F59B1B] hover:text-white px-8 py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 w-full sm:w-auto">
      <a href="#precios">Ver planes</a>
    </Button>
  )
}

export function WhatsAppButton({ location }: { location: string }) {
  const handleClick = () => {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({ event: "click_whatsapp", button_location: location })
    track("CTA WhatsApp", { location })
    fbqTrack("CTA WhatsApp", { location })
  }
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={handleClick}
      className="inline-flex items-center gap-2 text-[#F59B1B] font-semibold hover:underline">
      O escríbenos directo por WhatsApp
    </a>
  )
}

export function PlanCheckoutButton({ plan }: { plan: { name: string; link: string; popular: boolean } }) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const finalUrl = withGAClientId(plan.link)
    ;(e.currentTarget as unknown as HTMLAnchorElement).href = finalUrl
    const paquete = plan.name.toLowerCase().replace("lezgo ", "")
    const planMatch = plan.link.match(/[?&]plan=([^&]+)/)
    const planPeriod = planMatch ? planMatch[1] : "mensual"
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({ event: "click_payment_link", paquete, plan: planPeriod, button_text: `Comenzar ${plan.name.replace("Lezgo ", "")}`, button_location: "precios" })
    track("Empezar plan", { plan_name: plan.name })
    fbqTrack("Empezar plan", { plan_name: plan.name })
  }
  return (
    <Button asChild onClick={handleClick}
      className={`w-full ${plan.popular ? "bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white" : "border-2 border-[#F59B1B] text-[#F59B1B] hover:bg-[#F59B1B] hover:text-white"} font-semibold py-3 transition-all duration-300`}
      variant={plan.popular ? "default" : "outline"}>
      <a href={plan.link} target="_blank" rel="noopener noreferrer">Comenzar ahora</a>
    </Button>
  )
}
```

Confirm the WhatsApp number matches `components/custom/FloatingWhatsapp.tsx`; if it differs, use that one.

- [ ] **Step 2: Verify build** — Run: `npm run build`. Expected: compiles clean.

- [ ] **Step 3: Commit**

```bash
git add app/inmobiliario/BotonesInmobiliario.tsx
git commit -m "feat(inmobiliario): CTA buttons with dataLayer tracking"
```

---

### Task 3: Hero section (FIX-1, FIX-2, FIX-5)

**Files:**
- Create: `app/inmobiliario/sections/Hero.tsx`
- Modify: `app/inmobiliario/InmobiliarioContent.tsx` (import + render `<Hero />`)

**Interfaces:**
- Consumes: `AgendarDemoButton`, `VerPlanesButton` from `../BotonesInmobiliario`.
- Produces: default export `Hero`.

- [ ] **Step 1: Implement `Hero.tsx`** — client component. Copy verbatim from spec §Hero: eyebrow, H1, subtitle. CTAs: `<AgendarDemoButton location="hero" />` + `<VerPlanesButton />`. Metrics row: three **static** stat blocks (no animated counter) — `+50` / `+400 mil` / `24/7` with their labels. Use existing hero visual idiom (gradient accent, `font-heading`), mobile-first (`flex-col` on mobile, `sm:flex-row`).

- [ ] **Step 2: Wire into content** — in `InmobiliarioContent.tsx`, replace the placeholder div with `<Hero />` (import from `./sections/Hero`).

- [ ] **Step 3: Verify render** — `npm run dev`, load `/inmobiliario` at mobile width (~390px) and desktop: H1 mentions "CRM inmobiliario", 3 static metrics show final values (no `+012340%` glitch), both CTAs visible and tappable.

- [ ] **Step 4: Verify demo event** — In browser console run `window.dataLayer=[]`, click "Agendar demo gratis", then check `window.dataLayer.find(e=>e.event==='click_agendar_demo')` is defined with `button_location:'hero'`.

- [ ] **Step 5: Commit**

```bash
git add app/inmobiliario/sections/Hero.tsx app/inmobiliario/InmobiliarioContent.tsx
git commit -m "feat(inmobiliario): hero with static metrics and hierarchized CTAs"
```

---

### Task 4: Client logos bar (swap-ready)

**Files:**
- Create: `app/inmobiliario/sections/LogosClientes.tsx`
- Modify: `app/inmobiliario/InmobiliarioContent.tsx`

**Interfaces:**
- Produces: default export `LogosClientes`.

- [ ] **Step 1: Implement `LogosClientes.tsx`** — heading "Agencias y desarrolladoras que ya operan con Lezgo Suite". A responsive row of client names rendered as styled text badges in grayscale that colorize on hover (`grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition`). Use real client names: Yconia, Plaza Bosques, Muratta, Condesa, Vaeo, Grand Center. Add a code comment: `{/* SWAP: replace text with <Image> grayscale PNGs when Iván provides logos */}`. Wraps on mobile.

- [ ] **Step 2: Wire in** after `<Hero />` in `InmobiliarioContent.tsx`.

- [ ] **Step 3: Verify render** — logos row wraps cleanly on mobile, greyscale→color on hover on desktop.

- [ ] **Step 4: Commit**

```bash
git add app/inmobiliario/sections/LogosClientes.tsx app/inmobiliario/InmobiliarioContent.tsx
git commit -m "feat(inmobiliario): client logos bar (swap-ready placeholders)"
```

---

### Task 5: WhatsApp differentiator (star section)

**Files:**
- Create: `app/inmobiliario/sections/WhatsAppDiferenciador.tsx`
- Modify: `app/inmobiliario/InmobiliarioContent.tsx`

**Interfaces:**
- Consumes: `AgendarDemoButton` from `../BotonesInmobiliario`.
- Produces: default export `WhatsAppDiferenciador`.

- [ ] **Step 1: Implement section** — copy verbatim from spec §WhatsApp: section title, intro, the "todas las versiones" heading, Card 1 (WhatsApp API oficial), Card 2 (fuerza de ventas centralizado), the "La combinación más común" block, and the "Para el líder del equipo" block. Section CTA: `<AgendarDemoButton location="whatsapp" >Quiero ver cómo funciona</AgendarDemoButton>`. Two cards side-by-side on desktop, stacked on mobile. **Must not contain the word "Coexistence".**

- [ ] **Step 2: Wire in** after `<LogosClientes />`.

- [ ] **Step 3: Verify** — `npm run dev`: cards stack on mobile; grep the built copy for "Coexistence" returns nothing: `grep -ri coexistence app/inmobiliario` → no matches. Click the section CTA → `click_agendar_demo` with `button_location:'whatsapp'` in dataLayer.

- [ ] **Step 4: Commit**

```bash
git add app/inmobiliario/sections/WhatsAppDiferenciador.tsx app/inmobiliario/InmobiliarioContent.tsx
git commit -m "feat(inmobiliario): WhatsApp differentiator section"
```

---

### Task 6: Features grid (6 cards)

**Files:**
- Create: `app/inmobiliario/sections/Funcionalidades.tsx`
- Modify: `app/inmobiliario/InmobiliarioContent.tsx`

**Interfaces:**
- Produces: default export `Funcionalidades`.

- [ ] **Step 1: Implement** — title "Todo lo que tu inmobiliaria necesita, en una sola plataforma." Grid of 6 cards (copy verbatim from spec §Funcionalidades): Pipeline de ventas inteligente, Bots de IA 24/7, Automatización de seguimiento, Multicanal centralizado, Dashboard y reportes, Gestión de cartera y contactos. Each card: `lucide-react` icon + title + body. Grid `sm:grid-cols-2 lg:grid-cols-3`, 1 col on mobile.

- [ ] **Step 2: Wire in** after `<WhatsAppDiferenciador />`.

- [ ] **Step 3: Verify** — 6 cards render, 1 column on mobile, 3 on desktop.

- [ ] **Step 4: Commit**

```bash
git add app/inmobiliario/sections/Funcionalidades.tsx app/inmobiliario/InmobiliarioContent.tsx
git commit -m "feat(inmobiliario): features grid"
```

---

### Task 7: Cómo funciona (3 steps)

**Files:**
- Create: `app/inmobiliario/sections/ComoFunciona.tsx`
- Modify: `app/inmobiliario/InmobiliarioContent.tsx`

**Interfaces:**
- Produces: default export `ComoFunciona`.

- [ ] **Step 1: Implement** — title "Todo listo para que arranques rápido." 3 numbered steps, copy verbatim from spec §"Cómo funciona". Enforce positioning: the client executes their own setup guided by snapshot + onboarding + video tutorials. **Do not** use verbs "conectamos / migramos / configuramos por ti". Numbered layout (1-2-3), stacked on mobile.

- [ ] **Step 2: Wire in** after `<Funcionalidades />`.

- [ ] **Step 3: Verify** — 3 steps render in order; re-read copy to confirm no "por ti" phrasing.

- [ ] **Step 4: Commit**

```bash
git add app/inmobiliario/sections/ComoFunciona.tsx app/inmobiliario/InmobiliarioContent.tsx
git commit -m "feat(inmobiliario): cómo funciona 3-step section"
```

---

### Task 8: Testimonials (initials-avatar placeholders)

**Files:**
- Create: `app/inmobiliario/sections/Testimonios.tsx`
- Modify: `app/inmobiliario/InmobiliarioContent.tsx`

**Interfaces:**
- Produces: default export `Testimonios`.

- [ ] **Step 1: Implement** — 3–4 testimonial cards from spec §Testimonios (Jerry Medina, Evelyn/Yconia, plus two `[Cliente]` placeholders). Each card: initials avatar in a brand-color circle (derive initials from name), name bold, role+company in gray, quote. Add comment `{/* SWAP: replace initials avatar with real photo when confirmed */}` and `{/* PENDIENTE IVÁN: confirmar textos/clientes antes de publicar */}`. Grid stacks on mobile.

- [ ] **Step 2: Wire in** after `<ComoFunciona />`.

- [ ] **Step 3: Verify** — cards render with initials avatars (no generic stock avatar), stack on mobile.

- [ ] **Step 4: Commit**

```bash
git add app/inmobiliario/sections/Testimonios.tsx app/inmobiliario/InmobiliarioContent.tsx
git commit -m "feat(inmobiliario): testimonials with initials-avatar placeholders"
```

---

### Task 9: Pricing (Anual default, checkout)

**Files:**
- Create: `app/inmobiliario/sections/Precios.tsx`
- Modify: `app/inmobiliario/InmobiliarioContent.tsx`

**Interfaces:**
- Consumes: `BILLING_OPTIONS`, `BASE_PRICES`, `STRIPE_LINKS`, `applyDiscount`, `BillingPeriod` from `@/lib/pricing`; `PlanCheckoutButton`, `AgendarDemoButton` from `../BotonesInmobiliario`.
- Produces: default export `Precios`.

- [ ] **Step 1: Implement** — adapt `app/landing/Precios.tsx` structure but: (a) import pricing data from `@/lib/pricing` (do not redefine); (b) `useState<BillingPeriod>('anual')` — **Anual selected by default**; (c) show an "Ahorra 20%" badge on the Anual toggle; (d) title "Planes que crecen con tu inmobiliaria."; (e) 4 plans Start/Growth/Pro(popular)/Elite with the spec's "para quién" descriptions; (f) Start/Growth/Pro use `<PlanCheckoutButton plan={...} />`; **Elite uses `<AgendarDemoButton location="precios_elite">Hablar con ventas</AgendarDemoButton>`** instead of checkout; (g) below the grid, the "Todos los planes incluyen…" note (spec §Precios) — **do NOT** render `tablafeatures.png` (the HTML table is Task 10). Section wrapper `id="precios"`.

- [ ] **Step 2: Wire in** after `<Testimonios />`.

- [ ] **Step 3: Verify default + checkout** — `npm run dev`, `/inmobiliario#precios`: Anual is preselected with "Ahorra 20%". Set a fake `_ga` cookie in console: `document.cookie='_ga=GA1.1.1234567890.1111111111'`. Click Start's "Comenzar ahora"; before navigation, inspect the anchor `href` — it must be the Stripe base URL with `?client_reference_id=1234567890_1111111111` (dot→underscore). Confirm `window.dataLayer` has `click_payment_link` with `paquete:'start'` and `plan:'anual'`. Click Elite → `click_agendar_demo` with `button_location:'precios_elite'`.

- [ ] **Step 4: Commit**

```bash
git add app/inmobiliario/sections/Precios.tsx app/inmobiliario/InmobiliarioContent.tsx
git commit -m "feat(inmobiliario): pricing with annual default and checkout tracking"
```

---

### Task 10: Comparison table (FIX-3, responsive)

**Files:**
- Create: `app/inmobiliario/sections/TablaComparativa.tsx`
- Modify: `app/inmobiliario/InmobiliarioContent.tsx`

**Interfaces:**
- Produces: default export `TablaComparativa`.

- [ ] **Step 1: Implement** — real HTML table (`<table>`) with the rows from spec §"Tabla comparativa" (Usuarios 1/3/10/Ilimitados; Contactos 100/1,000/15,000/Ilimitados; Pipelines ✓; Conexión WhatsApp ✓; Bots de IA 2/2/2/2; Automatizaciones 11×4; Dashboard ✓; Conexiones WhatsApp QR —/—/—/20; Soporte WhatsApp×3/Prioritario). Desktop: full table inside `<div className="overflow-x-auto">`. Mobile (`lg:hidden`): render one **card per plan** listing each feature/value pair (so nothing is an image and nothing overflows). Use `✓` / `—` glyphs, not images.

- [ ] **Step 2: Wire in** after `<Precios />`.

- [ ] **Step 3: Verify** — desktop shows the table with no horizontal page scroll (table scrolls inside its container if needed); mobile shows 4 stacked plan cards; values match the spec exactly.

- [ ] **Step 4: Commit**

```bash
git add app/inmobiliario/sections/TablaComparativa.tsx app/inmobiliario/InmobiliarioContent.tsx
git commit -m "feat(inmobiliario): responsive HTML comparison table"
```

---

### Task 11: FAQ (8 questions)

**Files:**
- Create: `app/inmobiliario/sections/FAQ.tsx`
- Modify: `app/inmobiliario/InmobiliarioContent.tsx`

**Interfaces:**
- Produces: default export `FAQ`.

- [ ] **Step 1: Implement** — accordion (follow the `ContactoContent.tsx:469-513` framer-motion accordion pattern, or shadcn `Accordion`). 8 items, copy verbatim from spec §FAQ, including the mobile-app answer "Sí, tu equipo opera desde el celular estén donde estén." Each toggle updates open state; only one open at a time is fine.

- [ ] **Step 2: Wire in** after `<TablaComparativa />`.

- [ ] **Step 3: Verify** — 8 questions render; tapping expands/collapses; readable on mobile.

- [ ] **Step 4: Commit**

```bash
git add app/inmobiliario/sections/FAQ.tsx app/inmobiliario/InmobiliarioContent.tsx
git commit -m "feat(inmobiliario): 8-question FAQ accordion"
```

---

### Task 12: reCAPTCHA v3 verification API route (FIX-4)

**Files:**
- Create: `app/api/verify-recaptcha/route.ts`
- Modify: `.env.local` (add placeholder keys — do NOT commit real secrets)

**Interfaces:**
- Produces: `POST /api/verify-recaptcha` accepting `{ token: string }`, returning `{ success: boolean; score?: number }`. Reads `RECAPTCHA_SECRET_KEY` from env.

- [ ] **Step 1: Implement route:**

```ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    // Fail open in local dev when unconfigured; log for visibility.
    console.warn("RECAPTCHA_SECRET_KEY not set — skipping verification")
    return NextResponse.json({ success: true, score: 1, skipped: true })
  }
  let token: string | undefined
  try {
    ;({ token } = await req.json())
  } catch {
    return NextResponse.json({ success: false, error: "bad_request" }, { status: 400 })
  }
  if (!token) return NextResponse.json({ success: false, error: "missing_token" }, { status: 400 })

  const params = new URLSearchParams({ secret, response: token })
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  })
  const data = (await res.json()) as { success: boolean; score?: number }
  const ok = data.success && (data.score ?? 0) >= 0.5
  return NextResponse.json({ success: ok, score: data.score }, { status: ok ? 200 : 400 })
}
```

- [ ] **Step 2: Add env placeholders** — append to `.env.local` (already gitignored):

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

- [ ] **Step 3: Verify route** — `npm run dev`, then: `curl -s -X POST localhost:3000/api/verify-recaptcha -H 'Content-Type: application/json' -d '{"token":"x"}'`. With no secret set, expect `{"success":true,"score":1,"skipped":true}`. Missing token → `curl ... -d '{}'` returns 400.

- [ ] **Step 4: Commit** (route only, not `.env.local`):

```bash
git add app/api/verify-recaptcha/route.ts
git commit -m "feat(inmobiliario): reCAPTCHA v3 server-side verification route"
```

---

### Task 13: Demo form (reCAPTCHA + honeypot + webhook + form_submit_success)

**Files:**
- Create: `app/inmobiliario/sections/DemoForm.tsx`
- Modify: `app/inmobiliario/InmobiliarioContent.tsx`

**Interfaces:**
- Consumes: `POST /api/verify-recaptcha`; `NEXT_PUBLIC_WEBHOOK_URL`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`; `WhatsAppButton` from `../BotonesInmobiliario`.
- Produces: default export `DemoForm`.

- [ ] **Step 1: Implement form** — client component. Title "Agenda una demo con un especialista." + subtitle (spec §Formulario). Fields: `nombre`, `whatsapp`, `email`, `empresa` (Nombre de tu inmobiliaria/empresa), optional `equipo` select [1 / 2-5 / 6-15 / 15+]. Add a visually-hidden honeypot input named `website` (label off-screen, `tabIndex={-1}`, `autoComplete="off"`). Submit button "Agendar mi demo". Below: `<WhatsAppButton location="form" />`.

  Load reCAPTCHA v3 script (only in this component) when `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set:

```tsx
useEffect(() => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey || document.getElementById("recaptcha-v3")) return
  const s = document.createElement("script")
  s.id = "recaptcha-v3"
  s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
  s.async = true
  document.head.appendChild(s)
}, [])
```

  Submit handler:
  1. `e.preventDefault()`. If honeypot `website` is non-empty → silently `setSubmitSuccess(true)` and return (drop bot, no webhook).
  2. `setIsSubmitting(true)`; push `{event:'form_submit', form_name:'inmobiliario_demo', form_location: window.location.pathname}`.
  3. If site key present, get token: `const token = await (window as any).grecaptcha.execute(siteKey, { action: 'demo' })`; `POST /api/verify-recaptcha` with `{token}`; if `!success`, toast error and abort (do not hit webhook, do not fire success event).
  4. `POST` form data to `NEXT_PUBLIC_WEBHOOK_URL` (JSON: fields + `timestamp` + `source:'Lezgo Suite Inmobiliario Landing'`).
  5. On webhook OK: push `{event:'form_submit_success', form_name:'inmobiliario_demo', form_location: window.location.pathname}`; show success state; also `track('Formulario Inmobiliario Enviado', {...})` + optional `fbq('track','Lead')` mirroring `ContactoContent.tsx:72-77`.
  6. On any failure: toast error, `setIsSubmitting(false)`.

  Reuse `useToast` from `@/hooks/use-toast` and shadcn `Input`/`Label`/`Select`/`Button` as in `ContactoContent.tsx`. Give the section `id="demo"` so hero/section CTAs could also anchor to it if needed.

- [ ] **Step 2: Wire in** after `<FAQ />` in `InmobiliarioContent.tsx`.

- [ ] **Step 3: Verify happy path** — With `NEXT_PUBLIC_WEBHOOK_URL` set (or temporarily point to a request-bin) and no reCAPTCHA key (route fails open): fill the form, submit. Confirm order in `window.dataLayer`: `form_submit` fires on click, then `form_submit_success` fires only after the webhook response — with `form_name:'inmobiliario_demo'`. Success UI shows.

- [ ] **Step 4: Verify honeypot** — Fill the hidden `website` field via console (`document.querySelector('[name=website]').value='bot'`), submit: no webhook request in the Network tab, no `form_submit_success` event.

- [ ] **Step 5: Commit**

```bash
git add app/inmobiliario/sections/DemoForm.tsx app/inmobiliario/InmobiliarioContent.tsx
git commit -m "feat(inmobiliario): demo form with reCAPTCHA v3, honeypot and success tracking"
```

---

### Task 14: Full-page QA pass + SEO polish

**Files:**
- Modify: any section file needing alt text / mobile fixes found during QA.

- [ ] **Step 1: Production build** — Run: `npm run build`. Expected: clean compile, `/inmobiliario` + `/api/verify-recaptcha` in the route list.

- [ ] **Step 2: Mobile QA (~390px)** — walk the whole page: no horizontal page scroll anywhere; hero metrics show final values; WhatsApp cards stack; comparison table shows plan cards (not an overflowing table); form is usable. Fix any overflow with `max-w-full`/`overflow-x-auto` on the offending block.

- [ ] **Step 3: Alt text** — every `<Image>`/`<img>` added (screenshots/mockups) has a descriptive Spanish `alt`. Decorative-only images get `alt=""`.

- [ ] **Step 4: Event smoke test** — in console `window.dataLayer=[]`, then exercise: demo CTA (hero + whatsapp section), a plan checkout, WhatsApp link, form submit. Confirm all four events (`click_agendar_demo`, `click_payment_link`, `click_whatsapp`, `form_submit_success`) appear with correct payloads. This is the acceptance gate for the GTM checklist (Task 15).

- [ ] **Step 5: Commit** (only if QA required changes)

```bash
git add -A
git commit -m "fix(inmobiliario): mobile QA and alt-text polish"
```

---

### Task 15: Google Ads / GTM conversion checklist (deliverable doc)

**Files:**
- Create: `docs/inmobiliario-google-ads-checklist.md`

- [ ] **Step 1: Write the checklist** — transcribe spec §"Entregable" / brief §6 into an actionable doc: (a) remove the 2 junk conversions ("Compra", "Lead - Formulario sitio") via Objetivos→Conversiones→⋮→Quitar; (b) create the 4 conversion actions (Lead-Demo agendada ⇐ `click_agendar_demo`; Lead-Formulario enviado ⇐ `form_submit_success`; Contacto-WhatsApp ⇐ `click_whatsapp`; Intención-Payment link ⇐ `click_payment_link`) with category/"No usar valor"/count per brief; (c) GTM (`GTM-P8333HV6`): ensure a Conversion Linker tag, then one Google Ads Conversion Tracking tag per action triggered by its Custom Event; (d) enable Enhanced Conversions for Leads (current `user_data` structure); (e) validate in GTM Preview, publish; (f) explicit note: **do NOT** create a `purchase` conversion. Note that the four events are already verified firing (Task 14 Step 4).

- [ ] **Step 2: Commit**

```bash
git add docs/inmobiliario-google-ads-checklist.md
git commit -m "docs(inmobiliario): Google Ads + GTM conversion setup checklist"
```

---

## Self-Review Notes

- **Spec coverage:** Hero/FIX-1,2,5 → T3; logos → T4; WhatsApp → T5; features → T6; cómo funciona → T7; testimonials → T8; pricing → T9; comparison table/FIX-3 → T10; FAQ → T11; reCAPTCHA/FIX-4 → T12–13; form + tracking §5 → T13; SEO (metadata, JSON-LD, sitemap, alt) → T1+T14; Ads §6 → T15. Chrome (standard navbar/footer) requires no task (default behavior). All spec sections mapped.
- **client_reference_id** verified in T9 Step 3 with an explicit cookie→URL assertion.
- **Interface consistency:** `AgendarDemoButton`/`WhatsAppButton`/`PlanCheckoutButton` signatures defined in T2 are used unchanged in T3/T5/T9/T13. Pricing exports named in T1 are consumed in T9.
- **Pending Iván items** (testimonial text, logo PNGs, table ✓/✗ confirmation) are flagged in-code and in the spec; they block publish, not implementation.
