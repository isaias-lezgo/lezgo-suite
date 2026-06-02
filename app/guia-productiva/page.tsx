import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import GuiaProductivaContent from './GuiaProductivaContent'

export const metadata: Metadata = createMetadata({
  title: 'De ocupado a productivo — Guía práctica | Lezgo Suite',
  description: 'Ordena tu operación, recupera enfoque y avanza con más claridad.',
  path: '/guia-productiva',
  noindex: true,
})

export default function GuiaProductivaPage() {
  return <GuiaProductivaContent />
}
