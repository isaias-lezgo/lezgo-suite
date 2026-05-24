import type { Metadata } from 'next'
import HomeContent from './HomeContent'

export const metadata: Metadata = {
  title: 'Lezgo Suite — CRM y Automatización Empresarial para México',
  description:
    'Gestiona ventas, automatiza procesos y conecta todos tus canales con IA. La plataforma empresarial #1 para empresas mexicanas.',
  keywords: [
    'CRM México',
    'automatización empresarial México',
    'software empresarial',
    'plataforma CRM LATAM',
    'gestión ventas México',
  ],
  alternates: { canonical: '/' },
}

export default function Page() {
  return <HomeContent />
}
