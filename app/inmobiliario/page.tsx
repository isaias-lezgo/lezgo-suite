import { createMetadata, SITE_CONFIG } from "@/lib/seo"
import { JsonLd } from "@/components/custom/JsonLd"
import { BASE_PRICES } from "@/lib/pricing"
import { FAQ_ITEMS } from "./faq-data"
import InmobiliarioContent from "./InmobiliarioContent"

const PATH = "/inmobiliario"
const URL = `${SITE_CONFIG.url}${PATH}`

// The root layout applies the "%s | Lezgo Suite" title template, so the brand
// must NOT be repeated here.
export const metadata = createMetadata({
  title: "CRM Inmobiliario con WhatsApp Centralizado",
  description:
    "CRM inmobiliario con WhatsApp nativo para agencias, desarrolladoras y asesores en México. Centraliza tus leads, supervisa a tu equipo y cierra más rápido.",
  path: PATH,
  keywords: [
    "CRM inmobiliario",
    "CRM para inmobiliarias",
    "software inmobiliario México",
    "CRM con WhatsApp",
    "CRM para agencias inmobiliarias",
    "CRM para desarrolladoras",
    "software para asesores inmobiliarios",
    "gestión de leads inmobiliarios",
    "WhatsApp multiagente inmobiliaria",
  ],
})

const prices = Object.values(BASE_PRICES)

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lezgo Suite — CRM Inmobiliario",
  description:
    "CRM inmobiliario con WhatsApp centralizado para agencias, desarrolladoras y asesores en México. Centraliza los leads de todo el equipo, supervisa las conversaciones en tiempo real y automatiza el seguimiento con IA.",
  url: URL,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "CRM",
  operatingSystem: "Web, iOS, Android",
  inLanguage: "es-MX",
  brand: { "@type": "Organization", name: SITE_CONFIG.name },
  provider: { "@type": "Organization", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Agencias inmobiliarias, desarrolladoras y asesores inmobiliarios",
    geographicArea: { "@type": "Country", name: "México" },
  },
  featureList: [
    "WhatsApp centralizado para todo el equipo de asesores",
    "Supervisión de conversaciones en tiempo real",
    "Embudo de ventas inmobiliario",
    "Automatización y bots de IA 24/7",
    "Gestión de contactos y oportunidades",
    "App móvil para asesores en campo",
  ],
  // Precios de lista mensuales (MXN, + IVA). Ver lib/pricing.ts.
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "MXN",
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    offerCount: prices.length,
    url: `${URL}#precios`,
  },
  // NOTA: no añadir aggregateRating/review hasta tener testimonios reales
  // confirmados (ver sections/Testimonios.tsx). Inventar reseñas viola las
  // políticas de datos estructurados de Google.
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_CONFIG.url },
    { "@type": "ListItem", position: 2, name: "CRM Inmobiliario", item: URL },
  ],
}

export default function InmobiliarioPage() {
  return (
    <>
      <JsonLd data={[softwareJsonLd, faqJsonLd, breadcrumbJsonLd]} />
      <InmobiliarioContent />
    </>
  )
}
