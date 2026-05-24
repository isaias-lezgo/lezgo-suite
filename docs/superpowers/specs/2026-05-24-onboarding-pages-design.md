# Onboarding Pages — Design Spec

**Date:** 2026-05-24  
**Status:** Approved

---

## Overview

Three client onboarding pages — one per service tier — that present the terms of the service, require explicit acceptance, then reveal a GHL calendar iframe for scheduling the first session.

---

## Routes

| Plan | Route |
|---|---|
| Licencia (Estándar) | `/onboarding/licencia` |
| Servicio Técnico Dedicado | `/onboarding/servicio-tecnico` |
| Implementación | `/onboarding/implementacion` |

Links are delivered manually by Lezgo to each client depending on their plan. No routing logic needed — pages are standalone.

---

## Visual Design

- **Theme:** Light — matches `/terminos-y-condiciones` and `/bienvenida` style
- **Hero header:** Navy→blue gradient (`#1B2B4B → #2E5490`) with white text and plan badge
- **Body background:** `#F7F8FA`
- **Condition cards:** White cards with `#e2e8f0` border, icon, title, and description
- **Acceptance area:** Amber-tinted box (`#fff7ed`, `#F59B1B` border) with checkbox
- **Calendar:** Revealed below acceptance — same GHL iframe used in `/bienvenida`
- **Navbar + Footer:** Visible (standard site layout)
- **Fonts:** DM Sans (body), Space Grotesk (headings) — already loaded via `next/font/google`

---

## Page Structure (per page)

1. **Hero** — plan badge (e.g. "SERVICIO TÉCNICO DEDICADO"), "Bienvenido a Lezgo Suite" heading, subtitle prompting the client to read conditions
2. **Intro block** — free-text explanatory section (owner fills in per plan); styled as a white card with a label like "¿Qué incluye este plan?"
3. **Condition cards** — icon + bold title + description; one card per key condition
4. **Acceptance checkbox** — single checkbox: "Leí y acepto las condiciones de mi plan". Button below: "Continuar y agendar sesión" (disabled until checked)
5. **GHL Calendar** — same iframe URL for all three plans: `https://app.lezgosuite.com/widget/booking/AN1LKwpuOmHNHso08b8C`. Hidden until checkbox is checked; smooth reveal animation. Includes `<Script src="https://app.lezgosuite.com/js/form_embed.js" />` as in `/bienvenida`.

---

## Plan Content

### Licencia (Estándar)
> Analogy: "Te vendemos la casa — tú la amueblas y la mantienes."

**Conditions:**
- Acceso a la plataforma Lezgo Suite (GoHighLevel)
- Soporte general vía WhatsApp — solo respuesta a preguntas, sin configuraciones
- Horario de soporte: lunes a viernes de 9:00 a 18:00 hrs
- No incluye automatizaciones, configuraciones ni implementaciones
- El cliente es responsable de administrar y operar su plataforma

---

### Servicio Técnico Dedicado

**Conditions:**
- Asesoría técnica personalizada con un experto Lezgo Suite
- Horario de atención: lunes a viernes de 9:00 a 18:00 hrs (hora Centro de México)
- Canal de contacto: WhatsApp
- No incluye creación de automatizaciones — el servicio es de guía y resolución de dudas
- Los tiempos de respuesta aplican únicamente en horario hábil

---

### Implementación

**Conditions:**
- Primera sesión obligatoria: mapeo completo de necesidades y automatizaciones a implementar
- Plazo de implementación: 4 semanas a partir de la primera sesión
- El plazo corre independientemente del seguimiento del cliente
- El cliente debe estar disponible, responder solicitudes y proveer accesos en tiempo
- Si la implementación no concluye por falta de seguimiento del cliente, la responsabilidad es del cliente — Lezgo Suite no está obligado a extender el plazo

---

## Architecture

### Files to create

```
app/
  onboarding/
    licencia/page.tsx
    servicio-tecnico/page.tsx
    implementacion/page.tsx
components/
  custom/
    OnboardingPage.tsx   ← shared base component
```

### `OnboardingPage` component

Accepts a config object:

```ts
interface OnboardingConfig {
  planLabel: string          // e.g. "SERVICIO TÉCNICO DEDICADO"
  title: string              // e.g. "Bienvenido a Lezgo Suite"
  subtitle: string
  introTitle: string         // e.g. "¿Qué incluye este plan?"
  introText: string          // free-text paragraph(s) — owner fills in
  conditions: {
    icon: string             // emoji
    title: string
    description: string
  }[]
  calendarUrl: string        // same for all three
}
```

State:
- `accepted: boolean` — controlled by checkbox
- Calendar section is `hidden` until `accepted === true`, revealed with a smooth CSS transition

### Each route page

Each `page.tsx` is ~30 lines: imports `OnboardingPage`, passes its config, exports default. No logic in the route files.

---

## Behavior

- Checkbox toggles `accepted` state
- "Continuar y agendar sesión" button is `disabled` and visually muted until `accepted === true`
- On acceptance: calendar section fades/slides in (framer-motion, matching site animation style)
- No server-side logic, no form submission — purely client-side gate
- `'use client'` directive required (state + framer-motion)

---

## Out of Scope

- No authentication or session tracking
- No backend logging of acceptance (can be added later if needed)
- No email confirmation triggered from these pages
- Content (intro text) is hardcoded per plan — no CMS
