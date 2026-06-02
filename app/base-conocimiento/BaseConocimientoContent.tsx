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
