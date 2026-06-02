import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import BaseConocimientoContent from './BaseConocimientoContent'

export const metadata: Metadata = createMetadata({
  title: 'Base de Conocimiento — Lezgo Suite',
  description:
    'Tutoriales en video para dominar cada módulo de Lezgo Suite: Contactos, Oportunidades, Calendarios y Tareas. Aprende a tu ritmo.',
  path: '/base-conocimiento',
  noindex: true,
})

export default function BaseConocimientoPage() {
  return <BaseConocimientoContent />
}
