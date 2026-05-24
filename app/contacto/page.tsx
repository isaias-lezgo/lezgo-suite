import type { Metadata } from "next"
import { JsonLd } from "@/components/custom/JsonLd"
import { SITE_CONFIG } from "@/lib/seo"
import ContactoContent from "./ContactoContent"

export const metadata: Metadata = {
  title: "Contacto — Habla con un Especialista de Lezgo Suite",
  description:
    "Contáctanos para conocer cómo Lezgo Suite puede transformar tu empresa. Atención en español, respuesta en 24 horas. Oficina en Querétaro, México.",
  keywords: [
    "contacto Lezgo Suite",
    "hablar con especialista CRM",
    "soporte Lezgo",
    "demo Lezgo Suite",
    "contacto software empresarial México",
  ],
  openGraph: {
    title: "Contacto — Habla con un Especialista de Lezgo Suite",
    description:
      "Contáctanos para conocer cómo Lezgo Suite puede transformar tu empresa. Atención en español, respuesta en 24 horas.",
    url: `${SITE_CONFIG.url}/contacto`,
  },
}

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto — Lezgo Suite",
  description: "Formulario de contacto y datos de la oficina de Lezgo Suite en Querétaro, México.",
  url: `${SITE_CONFIG.url}/contacto`,
  isPartOf: { "@type": "WebSite", url: SITE_CONFIG.url },
  mainEntity: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
    telephone: SITE_CONFIG.telephone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
  },
}

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd} />
      <ContactoContent />
    </>
  )
}
