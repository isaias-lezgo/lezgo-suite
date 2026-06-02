# Base de Conocimiento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public `/base-conocimiento` page with four stacked video sections (Contactos, Oportunidades, Calendarios, Tareas), sticky anchor navigation, and a YouTube modal.

**Architecture:** Two files under `app/base-conocimiento/` — a thin server `page.tsx` with metadata, and a `'use client'` component `BaseConocimientoContent.tsx` that owns all state and rendering. Data is a static array defined inside the content component — no CMS, no API.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, Framer Motion, Lucide React, `createMetadata` from `@/lib/seo`.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `app/base-conocimiento/page.tsx` | Create | Server component — exports metadata, renders content |
| `app/base-conocimiento/BaseConocimientoContent.tsx` | Create | Client component — data, Hero, nav, sections, modal |

---

### Task 1: Scaffold the route files

**Files:**
- Create: `app/base-conocimiento/page.tsx`
- Create: `app/base-conocimiento/BaseConocimientoContent.tsx`

- [ ] **Step 1: Create the shell `page.tsx`**

```tsx
// app/base-conocimiento/page.tsx
import BaseConocimientoContent from './BaseConocimientoContent'

export default function BaseConocimientoPage() {
  return <BaseConocimientoContent />
}
```

- [ ] **Step 2: Create the shell `BaseConocimientoContent.tsx`**

```tsx
// app/base-conocimiento/BaseConocimientoContent.tsx
'use client'

export default function BaseConocimientoContent() {
  return <main className="min-h-screen">Base de Conocimiento</main>
}
```

- [ ] **Step 3: Verify the route renders**

Run: `npm run dev`
Open: http://localhost:3000/base-conocimiento
Expected: page loads with text "Base de Conocimiento", no console errors.

- [ ] **Step 4: Commit**

```bash
git add app/base-conocimiento/page.tsx app/base-conocimiento/BaseConocimientoContent.tsx
git commit -m "feat: scaffold /base-conocimiento route"
```

---

### Task 2: Define types and placeholder data

**Files:**
- Modify: `app/base-conocimiento/BaseConocimientoContent.tsx`

- [ ] **Step 1: Replace the shell with types + data**

Replace the entire file content with:

```tsx
// app/base-conocimiento/BaseConocimientoContent.tsx
'use client'

import type { LucideIcon } from 'lucide-react'
import { Users, Target, Calendar, CheckSquare } from 'lucide-react'

interface Video {
  id: string
  title: string
  description: string
  duration: string
}

interface Section {
  id: string
  label: string
  icon: LucideIcon
  videos: Video[]
}

const SECTIONS: Section[] = [
  {
    id: 'contactos',
    label: 'Contactos',
    icon: Users,
    videos: [
      {
        id: 'PLACEHOLDER_1',
        title: 'Cómo crear un contacto',
        description: 'Aprende a agregar contactos manualmente y por importación.',
        duration: '0:00',
      },
      {
        id: 'PLACEHOLDER_2',
        title: 'Filtros y segmentación',
        description: 'Organiza tus contactos con etiquetas y filtros avanzados.',
        duration: '0:00',
      },
      {
        id: 'PLACEHOLDER_3',
        title: 'Automatizaciones en contactos',
        description: 'Configura flujos automáticos al añadir nuevos contactos.',
        duration: '0:00',
      },
    ],
  },
  {
    id: 'oportunidades',
    label: 'Oportunidades',
    icon: Target,
    videos: [
      {
        id: 'PLACEHOLDER_4',
        title: 'Crear una oportunidad',
        description: 'Registra y gestiona oportunidades de negocio en tu pipeline.',
        duration: '0:00',
      },
      {
        id: 'PLACEHOLDER_5',
        title: 'Mover oportunidades en el pipeline',
        description: 'Aprende a avanzar oportunidades por las etapas de venta.',
        duration: '0:00',
      },
      {
        id: 'PLACEHOLDER_6',
        title: 'Reportes de oportunidades',
        description: 'Analiza tus resultados y proyecciones de ventas.',
        duration: '0:00',
      },
    ],
  },
  {
    id: 'calendarios',
    label: 'Calendarios',
    icon: Calendar,
    videos: [
      {
        id: 'PLACEHOLDER_7',
        title: 'Configurar tu calendario',
        description: 'Ajusta disponibilidad, horarios y tipos de cita.',
        duration: '0:00',
      },
      {
        id: 'PLACEHOLDER_8',
        title: 'Agendar una cita',
        description: 'Crea y asigna citas a contactos o miembros del equipo.',
        duration: '0:00',
      },
      {
        id: 'PLACEHOLDER_9',
        title: 'Recordatorios automáticos',
        description: 'Configura notificaciones automáticas para tus citas.',
        duration: '0:00',
      },
    ],
  },
  {
    id: 'tareas',
    label: 'Tareas',
    icon: CheckSquare,
    videos: [
      {
        id: 'PLACEHOLDER_10',
        title: 'Crear y asignar tareas',
        description: 'Administra tareas individuales y del equipo.',
        duration: '0:00',
      },
      {
        id: 'PLACEHOLDER_11',
        title: 'Seguimiento de tareas',
        description: 'Revisa el estado y progreso de tareas pendientes.',
        duration: '0:00',
      },
      {
        id: 'PLACEHOLDER_12',
        title: 'Tareas recurrentes',
        description: 'Automatiza tareas que se repiten periódicamente.',
        duration: '0:00',
      },
    ],
  },
]

export default function BaseConocimientoContent() {
  return <main className="min-h-screen">Base de Conocimiento — {SECTIONS.length} secciones</main>
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/base-conocimiento/BaseConocimientoContent.tsx
git commit -m "feat: add knowledge base data types and placeholder sections"
```

---

### Task 3: Build Hero and sticky anchor navigation

**Files:**
- Modify: `app/base-conocimiento/BaseConocimientoContent.tsx`

- [ ] **Step 1: Replace the component body with Hero + sticky nav**

Replace only the `BaseConocimientoContent` function (keep the types and `SECTIONS` array above it unchanged):

```tsx
export default function BaseConocimientoContent() {
  const [activeSection, setActiveSection] = useState('contactos')

  function scrollToSection(id: string) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#F59B1B0d_0%,_transparent_70%)]" />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F59B1B]/40 bg-[#F59B1B]/10 px-3 py-1 text-xs text-[#F59B1B] mb-4">
              <BookOpen className="h-3.5 w-3.5" /> Base de Conocimiento
            </span>
            <h1 className="font-[var(--font-space-grotesk)] text-3xl font-bold tracking-tight md:text-5xl mb-4">
              Aprende a usar Lezgo Suite
            </h1>
            <p className="text-[var(--muted-foreground)] text-base md:text-lg max-w-xl mx-auto">
              Tutoriales en video para dominar cada módulo de tu plataforma. Aprende a tu ritmo y saca el máximo provecho.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky anchor nav */}
      <div className="sticky top-16 z-20 bg-[var(--background)]/95 backdrop-blur border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-3 flex gap-2 flex-wrap">
          {SECTIONS.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-[#F59B1B]/20 border border-[#F59B1B] text-[#F59B1B]'
                    : 'bg-white/5 border border-white/10 text-[var(--muted-foreground)] hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {section.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sections placeholder */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-[var(--muted-foreground)]">Secciones van aquí — active: {activeSection}</p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Update imports at the top of the file**

After `'use client'`, add the React and framer-motion imports, and add `BookOpen` to the existing lucide import. The top of the file should look like this:

```tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Users, Target, Calendar, CheckSquare, BookOpen } from 'lucide-react'
```

(Replace the two existing lucide lines with the two lucide lines above — `LucideIcon` type import stays, and `BookOpen` is added to the named imports.)

- [ ] **Step 3: Verify in browser**

Open: http://localhost:3000/base-conocimiento
Expected: hero with title visible, 4 pill buttons in sticky nav, active pill turns orange on click, page scrolls.

- [ ] **Step 4: Commit**

```bash
git add app/base-conocimiento/BaseConocimientoContent.tsx
git commit -m "feat: add knowledge base hero and sticky anchor navigation"
```

---

### Task 4: Build sections and video cards

**Files:**
- Modify: `app/base-conocimiento/BaseConocimientoContent.tsx`

- [ ] **Step 1: Replace the `{/* Sections placeholder */}` block with real section rendering**

Replace:
```tsx
      {/* Sections placeholder */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-[var(--muted-foreground)]">Secciones van aquí — active: {activeSection}</p>
      </div>
```

With:
```tsx
      {/* Sections */}
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-16">
        {SECTIONS.map((section, sectionIndex) => {
          const Icon = section.icon
          return (
            <section key={section.id} id={section.id}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-[#F59B1B] rounded-full" />
                <Icon className="h-5 w-5 text-[#F59B1B]" />
                <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold">{section.label}</h2>
                <span className="bg-white/5 border border-white/10 text-[var(--muted-foreground)] text-xs px-2.5 py-0.5 rounded-full">
                  {section.videos.length} videos
                </span>
              </div>

              {/* Video grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => openModal(video)}
                    className="group text-left bg-[var(--card)] border border-white/5 rounded-xl overflow-hidden hover:border-[#F59B1B]/40 hover:bg-white/5 transition-all duration-200"
                  >
                    {/* Thumbnail */}
                    <div className="relative bg-white/5 aspect-video flex items-center justify-center">
                      <div className="w-10 h-10 bg-[#F59B1B] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-black text-sm ml-0.5">▶</span>
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {video.duration}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="p-4">
                      <p className="font-semibold text-sm mb-1 group-hover:text-[#F59B1B] transition-colors">
                        {video.title}
                      </p>
                      <p className="text-[var(--muted-foreground)] text-xs leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {sectionIndex < SECTIONS.length - 1 && (
                <div className="mt-16 border-t border-white/5" />
              )}
            </section>
          )
        })}
      </div>
```

- [ ] **Step 2: Add `openModal` stub inside the component (before the return)**

Add after `function scrollToSection`:
```tsx
  function openModal(_video: Video) {
    // modal implemented in Task 5
  }
```

- [ ] **Step 3: Verify all 4 sections render in browser**

Open: http://localhost:3000/base-conocimiento
Expected: 4 sections with headers and 3 video cards each (12 total). Cards highlight orange on hover. Anchor nav pills scroll to sections.

- [ ] **Step 4: Commit**

```bash
git add app/base-conocimiento/BaseConocimientoContent.tsx
git commit -m "feat: add knowledge base sections and video cards"
```

---

### Task 5: Build YouTube modal

**Files:**
- Modify: `app/base-conocimiento/BaseConocimientoContent.tsx`

- [ ] **Step 1: Add modal state**

Add `selectedVideo` state after the `activeSection` state line:

```tsx
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
```

- [ ] **Step 2: Replace the `openModal` stub with real implementation**

Replace:
```tsx
  function openModal(_video: Video) {
    // modal implemented in Task 5
  }
```

With:
```tsx
  function openModal(video: Video) {
    setSelectedVideo(video)
  }

  function closeModal() {
    setSelectedVideo(null)
  }
```

- [ ] **Step 3: Add Escape key listener**

Add after the `closeModal` function:

```tsx
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])
```

- [ ] **Step 4: Add `useEffect` to the imports line**

Change:
```tsx
import { useState } from 'react'
```
To:
```tsx
import { useState, useEffect } from 'react'
```

- [ ] **Step 5: Add `X` to the lucide imports**

Change:
```tsx
import { Users, Target, Calendar, CheckSquare, BookOpen } from 'lucide-react'
```
To:
```tsx
import { Users, Target, Calendar, CheckSquare, BookOpen, X } from 'lucide-react'
```

- [ ] **Step 6: Add modal JSX before the closing `</main>` tag**

Add this block right before `</main>`:

```tsx
      {/* YouTube Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              aria-label="Cerrar video"
            >
              <X className="h-6 w-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
              title={selectedVideo.title}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
```

- [ ] **Step 7: Verify modal in browser**

Open: http://localhost:3000/base-conocimiento
Click any video card.
Expected: dark overlay appears with centered iframe. Clicking the × button or outside the iframe closes it. Pressing Escape also closes it. (The iframe will show a YouTube error since IDs are placeholders — that's expected.)

- [ ] **Step 8: Commit**

```bash
git add app/base-conocimiento/BaseConocimientoContent.tsx
git commit -m "feat: add YouTube modal to knowledge base"
```

---

### Task 6: Add metadata and finalize page.tsx

**Files:**
- Modify: `app/base-conocimiento/page.tsx`

- [ ] **Step 1: Replace the shell `page.tsx` with full metadata**

Replace the entire file with:

```tsx
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import BaseConocimientoContent from './BaseConocimientoContent'

export const metadata: Metadata = createMetadata({
  title: 'Base de Conocimiento — Lezgo Suite',
  description:
    'Tutoriales en video para dominar cada módulo de Lezgo Suite: Contactos, Oportunidades, Calendarios y Tareas. Aprende a tu ritmo.',
  path: '/base-conocimiento',
  keywords: [
    'tutoriales Lezgo Suite',
    'base de conocimiento',
    'videos CRM',
    'aprende Lezgo Suite',
    'guías plataforma',
  ],
})

export default function BaseConocimientoPage() {
  return <BaseConocimientoContent />
}
```

- [ ] **Step 2: Verify production build succeeds**

Run: `npm run build`
Expected: build completes with no errors. The `/base-conocimiento` route appears in the output.

- [ ] **Step 3: Commit**

```bash
git add app/base-conocimiento/page.tsx
git commit -m "feat: add metadata to /base-conocimiento page"
```

---

### Task 7: Add page to sitemap

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Read the current sitemap**

Open `app/sitemap.ts` and find the array of URLs.

- [ ] **Step 2: Add the new route**

Add `'/base-conocimiento'` to the list of routes in the sitemap, following the same pattern as the other entries.

- [ ] **Step 3: Verify sitemap includes the new route**

Run: `npm run dev`
Open: http://localhost:3000/sitemap.xml
Expected: `https://www.lezgosuite.com/base-conocimiento` appears in the output.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: add /base-conocimiento to sitemap"
```
