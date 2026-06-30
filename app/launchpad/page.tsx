import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import LaunchpadContent from './LaunchpadContent'

export const metadata: Metadata = createMetadata({
  title: 'Launchpad — Configura tu Lezgo Suite paso a paso',
  description: 'Guía interna para configurar tu cuenta de Lezgo Suite paso a paso, con videos.',
  path: '/launchpad',
  noindex: true,
})

export default function LaunchpadPage() {
  return <LaunchpadContent />
}
