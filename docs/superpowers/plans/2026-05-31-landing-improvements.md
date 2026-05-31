# Landing Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve conversion and clarity on the Lezgo Suite homepage by rewriting the hero copy, adding lead-capture touchpoints (popup + footer form), improving floating buttons, updating the footer, and reordering sections.

**Architecture:** All changes are in five files — no new routes, no schema changes. The one new file is `LeadPopup.tsx`, a self-contained client component that mounts in `HomeContent.tsx` and manages its own scroll observer, form state, and webhook submission. The footer gains internal `useState` for its compact form. All other changes are cosmetic edits to existing components.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, Tailwind CSS v4, framer-motion, lucide-react, `@vercel/analytics`, `NEXT_PUBLIC_WEBHOOK_URL` env var (same as `/contacto` form)

---

## File Map

| File | Change |
|------|--------|
| `app/HomeContent.tsx` | Hero text + reorder testimonials + mount `<LeadPopup />` |
| `components/navbar.tsx` | "Contacto" → "**Contáctanos**" (desktop + mobile) |
| `components/footer.tsx` | "Contacto" → "**Contáctanos**" + social icons + compact lead form |
| `components/custom/FloatingWhatsapp.tsx` | Enlarge WA icon + add "Hablar con un asesor" pill button |
| `components/custom/LeadPopup.tsx` | **New** — scroll-triggered popup with form |

---

## Task 1: Hero text rewrite

**Files:**
- Modify: `app/HomeContent.tsx:72-83`

- [ ] **Step 1: Replace the H1 and subtitle**

In `app/HomeContent.tsx`, find the `<h1>` block (currently reads "Transformación / Empresarial / Completa") and replace both the H1 and the paragraph that follows:

```tsx
// BEFORE (lines ~72-83)
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading leading-tight sm:text-center md:text-justify">
  <span className="text-[#F59B1B]">Transformación</span>
  <br />
  <span className="text-gray-900">Empresarial</span>
  <br />
  <span className="text-gray-900">Completa</span>
</h1>
<p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl sm:text-center md:text-justify">
  Lezgo Suite revoluciona la gestión empresarial con IA
  avanzada, automatizaciones inteligentes e integraciones
  todo-en-uno para empresas que buscan liderar el futuro.
</p>

// AFTER
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading leading-tight sm:text-center md:text-justify">
  <span className="text-[#F59B1B]">El CRM que</span>
  <br />
  <span className="text-gray-900">impulsa</span>
  <br />
  <span className="text-gray-900">tu negocio</span>
</h1>
<p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl sm:text-center md:text-justify">
  Lezgo Suite es el CRM todo en uno con IA para empresas mexicanas.
  Gestiona contactos, automatiza ventas y conecta todos tus canales
  desde un solo lugar.
</p>
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add app/HomeContent.tsx
git commit -m "feat: rewrite hero copy to lead with CRM value prop"
```

---

## Task 2: Rename "Contacto" → "Contáctanos"

**Files:**
- Modify: `components/navbar.tsx:67` (desktop link) and `components/navbar.tsx:123` (mobile link)
- Modify: `components/footer.tsx:132` (footer "Empresa" column)

- [ ] **Step 1: Update navbar desktop link**

In `components/navbar.tsx`, find the desktop link (~line 64-69):

```tsx
// BEFORE
<Link
  href="/contacto"
  className="text-gray-300 hover:text-white transition-colors font-medium text-sm tracking-wide whitespace-nowrap"
>
  Contacto
</Link>

// AFTER
<Link
  href="/contacto"
  className="text-gray-300 hover:text-white transition-colors font-semibold text-sm tracking-wide whitespace-nowrap"
>
  Contáctanos
</Link>
```

- [ ] **Step 2: Update navbar mobile link**

In `components/navbar.tsx`, find the mobile menu link (~line 119-126):

```tsx
// BEFORE
<Link
  href="/contacto"
  className="text-gray-300 hover:text-white transition-colors font-medium text-center py-2 rounded-lg hover:bg-white/5"
  onClick={() => setIsMenuOpen(false)}
>
  Contacto
</Link>

// AFTER
<Link
  href="/contacto"
  className="text-gray-300 hover:text-white transition-colors font-semibold text-center py-2 rounded-lg hover:bg-white/5"
  onClick={() => setIsMenuOpen(false)}
>
  Contáctanos
</Link>
```

- [ ] **Step 3: Update footer "Empresa" column link**

In `components/footer.tsx`, find the "Contacto" link inside the Empresa list (~line 130-134):

```tsx
// BEFORE
<li>
  <Link href="/contacto" className="hover:text-white transition-colors">
    Contacto
  </Link>
</li>

// AFTER
<li>
  <Link href="/contacto" className="hover:text-white transition-colors font-semibold">
    Contáctanos
  </Link>
</li>
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Commit**

```bash
git add components/navbar.tsx components/footer.tsx
git commit -m "feat: rename Contacto to Contáctanos in navbar and footer"
```

---

## Task 3: Floating buttons — enlarge WhatsApp + add advisor button

**Files:**
- Modify: `components/custom/FloatingWhatsapp.tsx`

- [ ] **Step 1: Rewrite FloatingWhatsapp.tsx**

Replace the entire file content with:

```tsx
'use client'
import { track } from "@vercel/analytics";
import { Calendar } from "lucide-react";
import React from "react";

const FloatingWhatsApp = () => {
  const phoneNumber = "5214426702559";
  const message =
    "¡Hola! Me interesa más información de Lezgo Suite. Vengo de la Página Web.";

  const handleWhatsAppClick = () => {
    track("Botón Whatsapp Página");
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Contact');
    }
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const handleAdvisorClick = () => {
    track("Botón Asesor Flotante");
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('trackCustom', 'Botón Asesor Flotante');
    }
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex flex-col items-start gap-3">
      {/* Advisor button — stacked above WhatsApp */}
      <a
        href="https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleAdvisorClick}
        className="flex items-center gap-2 bg-[#F59B1B] hover:bg-orange-600 transition-all duration-300 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 px-4 py-3"
      >
        <Calendar className="w-5 h-5 flex-shrink-0" />
        <span className="hidden sm:inline text-sm whitespace-nowrap">Hablar con un asesor</span>
      </a>

      {/* WhatsApp button — enlarged */}
      <div
        className="relative cursor-pointer group"
        onClick={handleWhatsAppClick}
      >
        <div className="bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-full p-4 sm:p-5 shadow-lg hover:shadow-xl transform hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
          >
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
        <div className="hidden md:block absolute bottom-full left-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          ¡Chatea con nosotros!
          <div className="absolute top-full left-4 w-2 h-2 bg-gray-800 transform rotate-45 translate-y-[-50%]" />
        </div>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add components/custom/FloatingWhatsapp.tsx
git commit -m "feat: enlarge WhatsApp button and add floating advisor CTA"
```

---

## Task 4: Create LeadPopup component

**Files:**
- Create: `components/custom/LeadPopup.tsx`

- [ ] **Step 1: Create the file**

Create `components/custom/LeadPopup.tsx` with the following content:

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { track } from '@vercel/analytics'

export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' })
  const hasShown = useRef(false)

  useEffect(() => {
    if (sessionStorage.getItem('leadPopupShown')) return

    const target = document.getElementById('funcionalidades')
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0 && !hasShown.current) {
          hasShown.current = true
          sessionStorage.setItem('leadPopupShown', 'true')
          setIsVisible(true)
          track('Popup Funcionalidades - Abierto')
          if (typeof (window as any).fbq === 'function') {
            ;(window as any).fbq('trackCustom', 'Popup Funcionalidades - Abierto')
          }
        }
      },
      { threshold: 0 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
    if (!webhookUrl) {
      setError('Formulario no disponible en este momento.')
      return
    }
    setIsSubmitting(true)
    setError('')
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'popup-funcionalidades',
        }),
      })
      if (!response.ok) throw new Error('Error al enviar')
      track('Popup Funcionalidades - Submit')
      if (typeof (window as any).fbq === 'function') {
        ;(window as any).fbq('trackCustom', 'Popup Funcionalidades - Submit')
      }
      setSubmitted(true)
    } catch {
      setError('No pudimos enviar tu información. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#F59B1B] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">¡Listo!</h3>
            <p className="text-gray-600">Un especialista te contactará pronto.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
              ¿Te interesa lo que viste?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Habla con un especialista y descubre cómo Lezgo Suite puede transformar tu negocio.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="popup-nombre">Nombre *</Label>
                <Input
                  id="popup-nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                  required
                  placeholder="Tu nombre"
                  className="border-gray-300 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="popup-email">Email *</Label>
                <Input
                  id="popup-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="tu@empresa.com"
                  className="border-gray-300 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="popup-telefono">Teléfono *</Label>
                <Input
                  id="popup-telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                  required
                  placeholder="+52 442 000 0000"
                  className="border-gray-300 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white font-semibold py-3 transition-all duration-300"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Enviando...</>
                ) : (
                  'Quiero más información'
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add components/custom/LeadPopup.tsx
git commit -m "feat: add scroll-triggered lead capture popup"
```

---

## Task 5: Mount LeadPopup in HomeContent

**Files:**
- Modify: `app/HomeContent.tsx`

- [ ] **Step 1: Add import at the top of HomeContent.tsx**

Add this import alongside the existing custom component imports (after the BotonesLanding import):

```tsx
import LeadPopup from "@/components/custom/LeadPopup"
```

- [ ] **Step 2: Render LeadPopup inside the component**

Inside the `return` of `HomeContent`, add `<LeadPopup />` as the last child of the outermost `<div className="relative overflow-hidden pt-8">`, just before its closing tag:

```tsx
// BEFORE
      <FaqSection />
    </div>
  </div>
)

// AFTER
      <FaqSection />
    </div>
    <LeadPopup />
  </div>
)
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add app/HomeContent.tsx
git commit -m "feat: mount LeadPopup in HomeContent"
```

---

## Task 6: Add compact lead form above footer

**Files:**
- Modify: `components/footer.tsx`

- [ ] **Step 1: Add new imports to footer.tsx**

Update the import lines at the top of `components/footer.tsx`:

```tsx
// BEFORE
'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { track } from "@vercel/analytics"

// AFTER
'use client'
import Link from "next/link"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ArrowRight, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { track } from "@vercel/analytics"
```

- [ ] **Step 2: Add state and submit handler inside Footer()**

Add these at the top of the `Footer` function body, before the `handleTrackingAndNavigate` function:

```tsx
const [footerForm, setFooterForm] = useState({ nombre: '', email: '', telefono: '' })
const [footerFormSubmitting, setFooterFormSubmitting] = useState(false)
const [footerFormSubmitted, setFooterFormSubmitted] = useState(false)

const handleFooterFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
  if (!webhookUrl) return
  setFooterFormSubmitting(true)
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...footerForm,
        timestamp: new Date().toISOString(),
        source: 'formulario-footer',
      }),
    })
    if (!response.ok) throw new Error('Error al enviar')
    track('Formulario Footer - Submit')
    if (typeof (window as any).fbq === 'function') {
      ;(window as any).fbq('trackCustom', 'Formulario Footer - Submit')
    }
    setFooterFormSubmitted(true)
  } catch {
    // silent fail — form stays visible
  } finally {
    setFooterFormSubmitting(false)
  }
}
```

- [ ] **Step 3: Insert the compact form section**

Inside the `return`, add a new `<section>` as the first child of `<footer>`, before the existing orange CTA `<section className="py-24 bg-gradient-to-br...">`:

```tsx
{/* Compact lead form */}
<section className="bg-[#081737] py-16 border-b border-white/10">
  <div className="container mx-auto px-4 max-w-4xl">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold font-heading text-white mb-2">
        ¿Listo para transformar tu empresa?
      </h2>
      <p className="text-gray-300">Déjanos tus datos y un especialista te contactará.</p>
    </div>
    {footerFormSubmitted ? (
      <p className="text-center text-[#F59B1B] font-semibold text-lg">
        ¡Gracias! Te contactaremos pronto.
      </p>
    ) : (
      <form
        onSubmit={handleFooterFormSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          value={footerForm.nombre}
          onChange={(e) => setFooterForm(prev => ({ ...prev, nombre: e.target.value }))}
          required
          placeholder="Nombre"
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
        />
        <Input
          type="email"
          value={footerForm.email}
          onChange={(e) => setFooterForm(prev => ({ ...prev, email: e.target.value }))}
          required
          placeholder="Email"
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
        />
        <Input
          type="tel"
          value={footerForm.telefono}
          onChange={(e) => setFooterForm(prev => ({ ...prev, telefono: e.target.value }))}
          required
          placeholder="Teléfono"
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
        />
        <Button
          type="submit"
          disabled={footerFormSubmitting}
          className="bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white font-semibold px-8 whitespace-nowrap shrink-0 transition-all duration-300"
        >
          {footerFormSubmitting
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : 'Enviar'}
        </Button>
      </form>
    )}
  </div>
</section>
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 5: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: add compact lead capture form above footer CTA"
```

---

## Task 7: Add social icons to footer

**Files:**
- Modify: `components/footer.tsx`

- [ ] **Step 1: Add Facebook and Instagram to lucide-react import**

Update the existing lucide-react import in `components/footer.tsx`:

```tsx
// BEFORE
import { ArrowRight, Loader2 } from "lucide-react"

// AFTER
import { ArrowRight, Loader2, Facebook, Instagram } from "lucide-react"
```

- [ ] **Step 2: Add social icons block inside the first footer column**

Find the first grid column in `components/footer.tsx` (the one with the logo and description):

```tsx
// BEFORE
<div className="space-y-4">
  <img src="/LOGONUEVO.png" alt="Lezgo Suite" className="h-8 w-auto" />
  <p className="text-gray-300 leading-relaxed">
    La plataforma empresarial más avanzada para transformar tu negocio con IA y automatizaciones.
  </p>
</div>

// AFTER
<div className="space-y-4">
  <img src="/LOGONUEVO.png" alt="Lezgo Suite" className="h-8 w-auto" />
  <p className="text-gray-300 leading-relaxed">
    La plataforma empresarial más avanzada para transformar tu negocio con IA y automatizaciones.
  </p>
  <div className="flex gap-4 pt-2">
    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
      className="text-gray-400 hover:text-white transition-colors">
      <Facebook className="w-5 h-5" />
    </a>
    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
      className="text-gray-400 hover:text-white transition-colors">
      <Instagram className="w-5 h-5" />
    </a>
    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
      className="text-gray-400 hover:text-white transition-colors">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
      </svg>
    </a>
  </div>
</div>
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: add Facebook, Instagram, TikTok icons to footer"
```

---

## Task 8: Reorder testimonials section

**Files:**
- Modify: `app/HomeContent.tsx`

The testimonials section (`{/* ── Testimonios ── */}`) currently lives after the Pricing section. It must move to after the Stats section and before the Características section. The `id="testimonios"` attribute must be preserved.

- [ ] **Step 1: Cut the testimonials section**

In `app/HomeContent.tsx`, locate the comment `{/* ── Testimonios ── */}` and its entire `<section id="testimonios" ...>` block (runs from roughly `<section id="testimonios" className="relative overflow-hidden py-16">` to its closing `</section>`, including the two absolute decorative divs after it).

Cut this entire block — from `{/* ── Testimonios ── */}` through the closing `</section>` of that section.

- [ ] **Step 2: Paste the testimonials section after Stats**

Paste the cut block immediately after the Stats section closes. The Stats section ends with `</section>` after the closing `</dl>` and `</div>` of the grid. The result should be:

```tsx
{/* ── Stats ── */}
<section className="relative py-16 sm:py-20 overflow-hidden">
  ...
</section>

{/* ── Testimonios ── */}   {/* <-- pasted here */}
<section id="testimonios" className="relative overflow-hidden py-16">
  ...
</section>

{/* ── Características ── */}
<section id="caracteristicas" className="py-24 relative overflow-hidden">
  ...
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Verify /#testimonios anchor still works**

Start dev server and navigate to `http://localhost:3000/#testimonios`. The page should scroll to the testimonials section (now above Características).

```bash
npm run dev
```

Open browser → `http://localhost:3000/#testimonios`

- [ ] **Step 5: Commit**

```bash
git add app/HomeContent.tsx
git commit -m "feat: move testimonials section above características for earlier social proof"
```

---

## Task 9: Final lint + build check

- [ ] **Step 1: Run lint**

```bash
npm run lint 2>&1 | tail -30
```

Expected: no errors (warnings are OK — `next.config.mjs` ignores them during build).

- [ ] **Step 2: Run production build**

```bash
npm run build 2>&1 | tail -30
```

Expected: `✓ Compiled successfully` and all routes listed without errors.

- [ ] **Step 3: Smoke test in browser**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:

1. Hero shows "El CRM que impulsa tu negocio"
2. Navbar shows "Contáctanos" (bold) instead of "Contacto"
3. Bottom-left: larger WhatsApp button + orange "Hablar con un asesor" pill above it
4. Scrolling past Funcionalidades triggers the lead popup (clear sessionStorage first: DevTools → Application → Session Storage → clear)
5. Testimonials appear after Stats and before Características
6. Footer has Facebook/Instagram/TikTok icons
7. Compact form appears above the orange CTA section in the footer
8. Footer "Empresa" column shows "Contáctanos" (bold)
