import type { Metadata } from "next"
import { JsonLd } from "@/components/custom/JsonLd"
import { SITE_CONFIG } from "@/lib/seo"
import SobreNosotrosContent from "./SobreNosotrosContent"

export const metadata: Metadata = {
  title: "Sobre Nosotros — Grupo Lezgo y Lezgo Suite",
  description:
    "Conoce al equipo detrás de Lezgo Suite. Grupo Lezgo es un grupo empresarial con más de 14 años de experiencia en el sector inmobiliario y tecnología para empresas en México.",
  keywords: [
    "Grupo Lezgo",
    "Lezgo Suite empresa",
    "quiénes somos",
    "empresa CRM México",
    "software empresarial Querétaro",
    "equipo Lezgo",
  ],
  openGraph: {
    title: "Sobre Nosotros — Grupo Lezgo y Lezgo Suite",
    description:
      "Conoce al equipo detrás de Lezgo Suite. Grupo Lezgo es un grupo empresarial con más de 14 años de experiencia en el sector inmobiliario y tecnología para empresas en México.",
    url: `${SITE_CONFIG.url}/sobre-nosotros`,
  },
}

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre Nosotros — Grupo Lezgo",
  description:
    "Grupo Lezgo es un grupo empresarial con más de 14 años en el sector inmobiliario, operando con tecnología propia.",
  url: `${SITE_CONFIG.url}/sobre-nosotros`,
  isPartOf: { "@type": "WebSite", url: SITE_CONFIG.url },
  about: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    foundingDate: "2010",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 52 },
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

export default function SobreNosotrosPage() {
  return (
    <>
      <JsonLd data={aboutPageJsonLd} />
      <SobreNosotrosContent />
    </>
  )
}
