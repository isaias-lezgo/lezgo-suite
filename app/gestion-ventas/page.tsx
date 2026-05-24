import type { Metadata } from "next"
import { JsonLd } from "@/components/custom/JsonLd"
import { SITE_CONFIG } from "@/lib/seo"
import GestionVentasContent from "./GestionVentasContent"

export const metadata: Metadata = {
  title: "Gestión de Ventas — CRM y Pipeline para Empresas Mexicanas",
  description:
    "Gestiona contactos ilimitados, pipelines de ventas, propuestas y reportes con Lezgo Suite. El CRM más completo para cerrar más ventas en menos tiempo.",
  keywords: [
    "CRM México",
    "gestión de ventas",
    "pipeline de ventas",
    "CRM empresarial México",
    "software ventas México",
    "CRM contactos",
    "automatización ventas",
  ],
  openGraph: {
    title: "Gestión de Ventas — CRM y Pipeline para Empresas Mexicanas",
    description:
      "Gestiona contactos ilimitados, pipelines de ventas, propuestas y reportes con Lezgo Suite. El CRM más completo para cerrar más ventas en menos tiempo.",
    url: `${SITE_CONFIG.url}/gestion-ventas`,
  },
}

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Gestión de Ventas — CRM y Pipeline para Empresas Mexicanas",
  description:
    "Gestiona contactos ilimitados, pipelines de ventas, propuestas y reportes con Lezgo Suite.",
  url: `${SITE_CONFIG.url}/gestion-ventas`,
  isPartOf: { "@type": "WebSite", url: SITE_CONFIG.url },
}

export default function GestionVentasPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <GestionVentasContent />
    </>
  )
}
