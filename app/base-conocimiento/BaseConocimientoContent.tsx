'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Users, Target, Calendar, CheckSquare, BookOpen } from 'lucide-react'

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
