# Onboarding Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three client-facing onboarding pages (licencia, servicio-técnico, implementación) that present service conditions, gate a GHL calendar behind a checkbox acceptance, and share a single base component.

**Architecture:** A single `OnboardingPage` client component accepts a typed config object and handles all state (checkbox + calendar reveal). Each route file is a server component that passes a plan-specific config. No shared state, no API calls — purely client-side gate.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, framer-motion, `next/script` for GHL embed.

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `components/custom/OnboardingPage.tsx` | Base component — hero, intro, conditions, checkbox, calendar reveal |
| Create | `app/onboarding/licencia/page.tsx` | Licencia config + render |
| Create | `app/onboarding/servicio-tecnico/page.tsx` | Servicio Técnico config + render |
| Create | `app/onboarding/implementacion/page.tsx` | Implementación config + render |

---

## Task 1: Base `OnboardingPage` component

**Files:**
- Create: `components/custom/OnboardingPage.tsx`

- [ ] **Step 1: Create the component file**

```tsx
// components/custom/OnboardingPage.tsx
'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Script from 'next/script'

const GHL_SCRIPT = 'https://app.lezgosuite.com/js/form_embed.js'
const CALENDAR_URL = 'https://app.lezgosuite.com/widget/booking/AN1LKwpuOmHNHso08b8C'

interface Condition {
  icon: string
  title: string
  description: string
}

export interface OnboardingConfig {
  planLabel: string
  heading: string
  subtitle: string
  introTitle: string
  introText: string
  conditions: Condition[]
}

export default function OnboardingPage({ config }: { config: OnboardingConfig }) {
  const [accepted, setAccepted] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAccepted(e.target.checked)
    if (e.target.checked) {
      setTimeout(() => {
        calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 350)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#F7F8FA', color: '#1A202C' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <header style={{ background: 'linear-gradient(135deg, #1B2B4B 0%, #2E5490 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <span
              className="self-start px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border"
              style={{
                background: 'rgba(245,155,27,.15)',
                borderColor: 'rgba(245,155,27,.4)',
                color: '#F59B1B',
              }}
            >
              {config.planLabel}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {config.heading}
            </h1>
            <p style={{ color: '#93c5fd' }} className="text-base">
              {config.subtitle}
            </p>
          </motion.div>
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 space-y-6">

        {/* ── Intro block ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border p-6 shadow-sm"
          style={{ background: 'white', borderColor: '#E2E8F0' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#64748B' }}
          >
            {config.introTitle}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            {config.introText}
          </p>
        </motion.div>

        {/* ── Conditions ──────────────────────────────────────────────────────── */}
        <div className="space-y-3">
          {config.conditions.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              className="rounded-2xl border p-5 flex items-start gap-4 shadow-sm"
              style={{ background: 'white', borderColor: '#E2E8F0' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #1B2B4B, #2E5490)' }}
                aria-hidden="true"
              >
                {c.icon}
              </div>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#1B2B4B' }}>
                  {c.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                  {c.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Acceptance ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="rounded-2xl border p-6 shadow-sm"
          style={{ background: '#fff7ed', borderColor: '#F59B1B' }}
        >
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={accepted}
              onChange={handleChange}
              className="mt-0.5 w-5 h-5 flex-shrink-0 cursor-pointer accent-[#F59B1B]"
            />
            <span className="text-sm font-semibold leading-relaxed" style={{ color: '#92400E' }}>
              Leí y acepto las condiciones de mi plan
            </span>
          </label>
        </motion.div>

        {/* ── Calendar reveal ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {accepted && (
            <motion.div
              ref={calendarRef}
              key="calendar"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div
                className="rounded-2xl overflow-hidden border shadow-sm"
                style={{ borderColor: '#E2E8F0' }}
              >
                <div
                  className="p-5 text-center border-b"
                  style={{ background: 'white', borderColor: '#E2E8F0' }}
                >
                  <p className="font-bold text-base" style={{ color: '#1B2B4B' }}>
                    Agenda tu sesión de onboarding
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#64748B' }}>
                    Selecciona el horario que mejor te funcione
                  </p>
                </div>
                <iframe
                  src={CALENDAR_URL}
                  title="Agendar sesión de onboarding"
                  className="w-full border-none block"
                  style={{ minHeight: '600px', height: '100%' }}
                  allow="clipboard-write"
                  loading="lazy"
                />
              </div>
              <Script src={GHL_SCRIPT} strategy="afterInteractive" />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify the file has no TypeScript errors**

```bash
cd /Users/isaiasrios/Software/Lezgo_Suite && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors related to `OnboardingPage.tsx` (there may be pre-existing errors elsewhere — those are fine to ignore).

- [ ] **Step 3: Commit**

```bash
git add components/custom/OnboardingPage.tsx
git commit -m "feat: add OnboardingPage base component

Shared component for all three onboarding plan pages. Accepts a config object,
renders hero, intro, conditions, checkbox gate, and GHL calendar reveal.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 2: Licencia page

**Files:**
- Create: `app/onboarding/licencia/page.tsx`

- [ ] **Step 1: Create the directory and page file**

```tsx
// app/onboarding/licencia/page.tsx
import OnboardingPage, { type OnboardingConfig } from '@/components/custom/OnboardingPage'

const config: OnboardingConfig = {
  planLabel: 'LICENCIA ESTÁNDAR',
  heading: 'Bienvenido a Lezgo Suite',
  subtitle: 'Lee las condiciones de tu plan antes de agendar tu primera sesión.',
  introTitle: '¿Qué incluye tu plan?',
  introText:
    'Texto introductorio — reemplaza este párrafo con tu propia explicación de lo que es el plan Licencia: qué acceso tienen, qué pueden esperar y el espíritu del servicio.',
  conditions: [
    {
      icon: '🏠',
      title: 'Acceso a la plataforma',
      description:
        'Tienes acceso completo a Lezgo Suite (GoHighLevel). La plataforma es tuya para administrar y operar a tu ritmo.',
    },
    {
      icon: '💬',
      title: 'Soporte vía WhatsApp',
      description:
        'Puedes escribirnos por WhatsApp para resolver dudas puntuales. El soporte es únicamente para responder preguntas — no incluye configuraciones ni implementaciones.',
    },
    {
      icon: '🕘',
      title: 'Horario de atención',
      description:
        'Lunes a viernes de 9:00 a 18:00 hrs (hora del centro de México). Mensajes fuera de horario serán atendidos el siguiente día hábil.',
    },
    {
      icon: '🚫',
      title: 'No incluye implementaciones',
      description:
        'Este plan no contempla la creación de automatizaciones, flujos ni configuraciones adicionales por parte de Lezgo Suite. Tú eres responsable de administrar y operar tu plataforma.',
    },
  ],
}

export default function LicenciaOnboarding() {
  return <OnboardingPage config={config} />
}
```

- [ ] **Step 2: Start dev server and open the page**

```bash
npm run dev
```

Open `http://localhost:3000/onboarding/licencia` in the browser.

Expected:
- Hero gradient with "LICENCIA ESTÁNDAR" badge and heading
- Intro block with placeholder text
- 4 condition cards with icons
- Checkbox at the bottom
- Calendar hidden until checkbox is checked

- [ ] **Step 3: Check checkbox and verify calendar reveals**

Click the checkbox. Expected:
- Acceptance box turns checked
- Calendar section animates into view (smooth fade + slide)
- Page scrolls to the calendar
- GHL iframe loads

- [ ] **Step 4: Commit**

```bash
git add app/onboarding/licencia/page.tsx
git commit -m "feat: add /onboarding/licencia page

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 3: Servicio Técnico Dedicado page

**Files:**
- Create: `app/onboarding/servicio-tecnico/page.tsx`

- [ ] **Step 1: Create the page file**

```tsx
// app/onboarding/servicio-tecnico/page.tsx
import OnboardingPage, { type OnboardingConfig } from '@/components/custom/OnboardingPage'

const config: OnboardingConfig = {
  planLabel: 'SERVICIO TÉCNICO DEDICADO',
  heading: 'Bienvenido a Lezgo Suite',
  subtitle: 'Lee las condiciones de tu plan antes de agendar tu primera sesión.',
  introTitle: '¿Qué incluye tu plan?',
  introText:
    'Texto introductorio — reemplaza este párrafo con tu propia explicación de lo que es el Servicio Técnico Dedicado: qué tipo de asesoría ofrece, cómo se diferencia de la licencia y qué puede esperar el cliente.',
  conditions: [
    {
      icon: '👨‍💻',
      title: 'Asesoría técnica personalizada',
      description:
        'Tienes acceso a un experto de Lezgo Suite que te guía en el uso de la plataforma, resuelve dudas técnicas y te orienta en las mejores prácticas.',
    },
    {
      icon: '🕘',
      title: 'Horario de atención',
      description:
        'Lunes a viernes de 9:00 a 18:00 hrs (hora del centro de México). Los mensajes fuera de horario serán atendidos el siguiente día hábil.',
    },
    {
      icon: '💬',
      title: 'Canal de contacto',
      description:
        'La atención se brinda vía WhatsApp. Los tiempos de respuesta dependen de la carga del equipo y la complejidad de la consulta.',
    },
    {
      icon: '🚫',
      title: 'No incluye creación de automatizaciones',
      description:
        'El Servicio Técnico es de asesoría y guía. No incluye que Lezgo Suite construya, configure ni implemente automatizaciones o flujos en tu cuenta.',
    },
    {
      icon: '✅',
      title: 'Resolución de dudas y orientación',
      description:
        'Puedes consultar cómo usar funcionalidades, entender errores, y recibir recomendaciones — siempre dentro del horario establecido.',
    },
  ],
}

export default function ServicioTecnicoOnboarding() {
  return <OnboardingPage config={config} />
}
```

- [ ] **Step 2: Open the page in the browser**

With the dev server running, open `http://localhost:3000/onboarding/servicio-tecnico`.

Expected:
- "SERVICIO TÉCNICO DEDICADO" badge in the hero
- 5 condition cards rendered with staggered animation
- Checkbox and calendar behavior identical to licencia page

- [ ] **Step 3: Commit**

```bash
git add app/onboarding/servicio-tecnico/page.tsx
git commit -m "feat: add /onboarding/servicio-tecnico page

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 4: Implementación page

**Files:**
- Create: `app/onboarding/implementacion/page.tsx`

- [ ] **Step 1: Create the page file**

```tsx
// app/onboarding/implementacion/page.tsx
import OnboardingPage, { type OnboardingConfig } from '@/components/custom/OnboardingConfig'

const config: OnboardingConfig = {
  planLabel: 'IMPLEMENTACIÓN',
  heading: 'Bienvenido a Lezgo Suite',
  subtitle: 'Lee las condiciones de tu plan antes de agendar tu primera sesión.',
  introTitle: '¿Qué incluye tu plan?',
  introText:
    'Texto introductorio — reemplaza este párrafo con tu propia explicación de cómo funciona el proceso de implementación: qué construimos juntos, cómo trabajamos y qué necesitas tener listo.',
  conditions: [
    {
      icon: '🗺️',
      title: 'Primera sesión: mapeo de necesidades',
      description:
        'La primera sesión está dedicada a definir con precisión qué automatizaciones e integraciones se implementarán. Es obligatorio llegar con tus procesos identificados.',
    },
    {
      icon: '📅',
      title: 'Plazo de implementación: 4 semanas',
      description:
        'El proceso de implementación tiene una duración fija de 4 semanas a partir de la primera sesión. Este plazo no se extiende.',
    },
    {
      icon: '⏱️',
      title: 'El plazo corre independientemente del seguimiento',
      description:
        'Si el cliente no asiste a sesiones, no entrega información o no responde en tiempo, el plazo de 4 semanas sigue corriendo. No hay pausas.',
    },
    {
      icon: '🤝',
      title: 'Tu participación es clave',
      description:
        'Para completar la implementación en tiempo, el cliente debe estar disponible, responder solicitudes y proveer accesos cuando Lezgo Suite los necesite.',
    },
    {
      icon: '⚠️',
      title: 'Responsabilidad por incumplimiento',
      description:
        'Si la implementación no concluye dentro de las 4 semanas por falta de seguimiento, información o disponibilidad del cliente, la responsabilidad es exclusiva del cliente. Lezgo Suite no está obligado a extender el plazo.',
    },
  ],
}

export default function ImplementacionOnboarding() {
  return <OnboardingPage config={config} />
}
```

> **Note:** The import path above has a typo on purpose to catch — it should be `from '@/components/custom/OnboardingPage'`, not `OnboardingConfig`. Fix it if copy-pasting.

Actually, use this corrected version:

```tsx
// app/onboarding/implementacion/page.tsx
import OnboardingPage, { type OnboardingConfig } from '@/components/custom/OnboardingPage'

const config: OnboardingConfig = {
  planLabel: 'IMPLEMENTACIÓN',
  heading: 'Bienvenido a Lezgo Suite',
  subtitle: 'Lee las condiciones de tu plan antes de agendar tu primera sesión.',
  introTitle: '¿Qué incluye tu plan?',
  introText:
    'Texto introductorio — reemplaza este párrafo con tu propia explicación de cómo funciona el proceso de implementación: qué construimos juntos, cómo trabajamos y qué necesitas tener listo.',
  conditions: [
    {
      icon: '🗺️',
      title: 'Primera sesión: mapeo de necesidades',
      description:
        'La primera sesión está dedicada a definir con precisión qué automatizaciones e integraciones se implementarán. Es obligatorio llegar con tus procesos identificados.',
    },
    {
      icon: '📅',
      title: 'Plazo de implementación: 4 semanas',
      description:
        'El proceso de implementación tiene una duración fija de 4 semanas a partir de la primera sesión. Este plazo no se extiende.',
    },
    {
      icon: '⏱️',
      title: 'El plazo corre independientemente del seguimiento',
      description:
        'Si el cliente no asiste a sesiones, no entrega información o no responde en tiempo, el plazo de 4 semanas sigue corriendo. No hay pausas.',
    },
    {
      icon: '🤝',
      title: 'Tu participación es clave',
      description:
        'Para completar la implementación en tiempo, el cliente debe estar disponible, responder solicitudes y proveer accesos cuando Lezgo Suite los necesite.',
    },
    {
      icon: '⚠️',
      title: 'Responsabilidad por incumplimiento',
      description:
        'Si la implementación no concluye dentro de las 4 semanas por falta de seguimiento, información o disponibilidad del cliente, la responsabilidad es exclusiva del cliente. Lezgo Suite no está obligado a extender el plazo.',
    },
  ],
}

export default function ImplementacionOnboarding() {
  return <OnboardingPage config={config} />
}
```

- [ ] **Step 2: Open the page in the browser**

With the dev server running, open `http://localhost:3000/onboarding/implementacion`.

Expected:
- "IMPLEMENTACIÓN" badge in the hero
- 5 condition cards, the last one with a warning tone (`⚠️`)
- Same checkbox + calendar behavior

- [ ] **Step 3: Commit**

```bash
git add app/onboarding/implementacion/page.tsx
git commit -m "feat: add /onboarding/implementacion page

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 5: Final cross-browser verification

- [ ] **Step 1: Verify all three routes load cleanly**

Open each URL in the browser and confirm:

| URL | Expected badge |
|---|---|
| `http://localhost:3000/onboarding/licencia` | `LICENCIA ESTÁNDAR` |
| `http://localhost:3000/onboarding/servicio-tecnico` | `SERVICIO TÉCNICO DEDICADO` |
| `http://localhost:3000/onboarding/implementacion` | `IMPLEMENTACIÓN` |

- [ ] **Step 2: Verify checkbox + calendar on each page**

On each page: check the checkbox → calendar should animate in → iframe should load the GHL booking widget.

- [ ] **Step 3: Verify navbar and footer render correctly**

Scroll to top and bottom on each page. Navbar and footer from the global layout should appear as on the rest of the site.

- [ ] **Step 4: Run build to catch any type or compilation errors**

```bash
npm run build 2>&1 | tail -20
```

Expected: successful build (note: `next.config.mjs` has `typescript.ignoreBuildErrors: true`, so type errors won't fail the build — TypeScript errors would only show up in the `tsc --noEmit` check from Task 1).

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: onboarding pages — all three plans complete

/onboarding/licencia, /onboarding/servicio-tecnico, /onboarding/implementacion
Each page presents plan conditions and reveals a GHL calendar on acceptance.
Intro text sections are left as placeholders for owner to fill in.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Owner checklist (post-implementation)

After the pages are live, Isaias needs to replace the `introText` placeholder in each of the three page files:

- `app/onboarding/licencia/page.tsx` — explain what licencia is in your own words
- `app/onboarding/servicio-tecnico/page.tsx` — explain what servicio técnico means
- `app/onboarding/implementacion/page.tsx` — explain the implementation process

Each file has a comment `Texto introductorio — reemplaza este párrafo...` marking exactly where to edit.
