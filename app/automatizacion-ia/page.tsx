import type { Metadata } from "next"
import { JsonLd } from "@/components/custom/JsonLd"
import { SITE_CONFIG } from "@/lib/seo"
import AutomatizacionIAContent from "./AutomatizacionIAContent"

export const metadata: Metadata = {
  title: "Automatización con IA — Chatbots y Flujos Inteligentes para Empresas",
  description:
    "Automatiza procesos, responde clientes 24/7 con chatbots con IA y elimina tareas manuales. Diseñado para empresas mexicanas que quieren crecer sin contratar más.",
  keywords: [
    "automatización IA México",
    "chatbots empresariales",
    "automatización procesos",
    "inteligencia artificial empresarial",
    "chatbot WhatsApp",
    "flujos de trabajo automáticos",
    "automatización CRM",
  ],
  openGraph: {
    title: "Automatización con IA — Chatbots y Flujos Inteligentes para Empresas",
    description:
      "Automatiza procesos, responde clientes 24/7 con chatbots con IA y elimina tareas manuales. Diseñado para empresas mexicanas que quieren crecer sin contratar más.",
    url: `${SITE_CONFIG.url}/automatizacion-ia`,
  },
}

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Automatización con IA — Chatbots y Flujos Inteligentes para Empresas",
  description:
    "Automatiza procesos, responde clientes 24/7 con chatbots con IA y elimina tareas manuales.",
  url: `${SITE_CONFIG.url}/automatizacion-ia`,
  isPartOf: { "@type": "WebSite", url: SITE_CONFIG.url },
}

export default function AutomatizacionIAPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <AutomatizacionIAContent />
    </>
  )
}
