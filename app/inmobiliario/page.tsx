import { createMetadata, SITE_CONFIG } from "@/lib/seo"
import { JsonLd } from "@/components/custom/JsonLd"
import InmobiliarioContent from "./InmobiliarioContent"

export const metadata = createMetadata({
  title: "CRM Inmobiliario | Lezgo Suite",
  description:
    "El CRM inmobiliario con WhatsApp nativo que usan agencias y desarrolladoras en México para centralizar leads, supervisar a su equipo de ventas y cerrar más rápido. Agenda una demo.",
  path: "/inmobiliario",
})

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Lezgo Suite — CRM Inmobiliario",
  description:
    "CRM inmobiliario con WhatsApp centralizado para agencias, desarrolladoras y asesores en México.",
  brand: { "@type": "Organization", name: SITE_CONFIG.name },
  url: `${SITE_CONFIG.url}/inmobiliario`,
}

export default function InmobiliarioPage() {
  return (
    <>
      <JsonLd data={productJsonLd} />
      <InmobiliarioContent />
    </>
  )
}
