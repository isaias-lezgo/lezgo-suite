import type { Metadata } from "next"
import { JsonLd } from "@/components/custom/JsonLd"
import { SITE_CONFIG } from "@/lib/seo"
import IntegracionTotalContent from "./IntegracionTotalContent"

export const metadata: Metadata = {
  title: "Integración Total — Conecta todas tus Herramientas Digitales",
  description:
    "Conecta WhatsApp, email, e-commerce, pagos y más de 200 herramientas con Lezgo Suite. API REST robusta y webhooks en tiempo real para empresas en México.",
  keywords: [
    "integraciones CRM México",
    "WhatsApp Business CRM",
    "API REST CRM",
    "integración WhatsApp empresas",
    "automatización integraciones",
    "conectar herramientas empresariales",
    "webhooks empresariales",
  ],
  openGraph: {
    title: "Integración Total — Conecta todas tus Herramientas Digitales",
    description:
      "Conecta WhatsApp, email, e-commerce, pagos y más de 200 herramientas con Lezgo Suite. API REST robusta y webhooks en tiempo real para empresas en México.",
    url: `${SITE_CONFIG.url}/integracion-total`,
  },
}

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Integración Total — Conecta todas tus Herramientas Digitales",
  description:
    "Conecta WhatsApp, email, e-commerce, pagos y más de 200 herramientas con Lezgo Suite.",
  url: `${SITE_CONFIG.url}/integracion-total`,
  isPartOf: { "@type": "WebSite", url: SITE_CONFIG.url },
}

export default function IntegracionTotalPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <IntegracionTotalContent />
    </>
  )
}
