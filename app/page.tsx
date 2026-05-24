import type { Metadata } from 'next'
import HomeContent from './HomeContent'
import { JsonLd } from '@/components/custom/JsonLd'

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

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lezgo Suite',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  description:
    'Plataforma de CRM, automatización empresarial e integraciones todo-en-uno para empresas mexicanas.',
  offers: {
    '@type': 'Offer',
    price: '3527',
    priceCurrency: 'MXN',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '3527',
      priceCurrency: 'MXN',
      unitText: 'MONTH',
    },
  },
  url: 'https://www.lezgosuite.com',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo garantizan la seguridad de nuestros datos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Utilizamos encriptación AES-256, certificación ISO 27001, servidores en múltiples regiones, backups automáticos y cumplimos con GDPR y regulaciones locales de protección de datos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo integrar Lezgo Suite con nuestros sistemas actuales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, ofrecemos más de 500 integraciones nativas y APIs robustas. Nuestro equipo técnico asegura una integración perfecta con ERP, contabilidad, marketing y otras herramientas empresariales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo funciona la escalabilidad de la plataforma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La plataforma escala automáticamente según tus necesidades. Desde equipos pequeños hasta organizaciones con miles de usuarios, sin límites de almacenamiento o procesamiento.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <JsonLd data={softwareAppJsonLd} />
      <JsonLd data={faqJsonLd} />
      <HomeContent />
    </>
  )
}
