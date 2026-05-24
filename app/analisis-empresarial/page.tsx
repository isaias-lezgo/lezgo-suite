import type { Metadata } from "next"
import { JsonLd } from "@/components/custom/JsonLd"
import { SITE_CONFIG } from "@/lib/seo"
import AnalisisEmpresarialContent from "./AnalisisEmpresarialContent"

export const metadata: Metadata = {
  title: "Análisis Empresarial — Dashboards e Insights para tu Negocio",
  description:
    "Toma decisiones basadas en datos con dashboards interactivos, reportes automáticos y análisis predictivo con IA. Business Intelligence para empresas mexicanas.",
  keywords: [
    "análisis empresarial México",
    "dashboards empresariales",
    "Business Intelligence México",
    "reportes automáticos",
    "KPIs empresariales",
    "análisis predictivo",
    "inteligencia de negocios",
  ],
  openGraph: {
    title: "Análisis Empresarial — Dashboards e Insights para tu Negocio",
    description:
      "Toma decisiones basadas en datos con dashboards interactivos, reportes automáticos y análisis predictivo con IA. Business Intelligence para empresas mexicanas.",
    url: `${SITE_CONFIG.url}/analisis-empresarial`,
  },
}

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Análisis Empresarial — Dashboards e Insights para tu Negocio",
  description:
    "Toma decisiones basadas en datos con dashboards interactivos, reportes automáticos y análisis predictivo.",
  url: `${SITE_CONFIG.url}/analisis-empresarial`,
  isPartOf: { "@type": "WebSite", url: SITE_CONFIG.url },
}

export default function AnalisisEmpresarialPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <AnalisisEmpresarialContent />
    </>
  )
}
