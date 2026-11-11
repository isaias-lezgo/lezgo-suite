import Link from "next/link"
import { createMetadata, SITE_CONFIG } from "@/lib/seo"
import { JsonLd } from "@/components/custom/JsonLd"
import { AgendarDemoButton } from "../../inmobiliario/BotonesInmobiliario"

// Server component on purpose: all the text below must be in the HTML the
// server sends, so search engines and AI assistants can read and cite it
// without running JavaScript.

const PATH = "/comparativas/como-elegir-crm-inmobiliario-con-whatsapp"
const URL = `${SITE_CONFIG.url}${PATH}`
const H1 = "Cómo elegir un CRM inmobiliario con WhatsApp para tu equipo en México"
const DESCRIPTION =
  "Las 6 preguntas que debes hacerle a cualquier CRM inmobiliario antes de contratar, y cómo las responde Lezgo Suite: WhatsApp de cada asesor, reparto de leads, soporte en México y precio en pesos."

// The root layout applies the "%s | Lezgo Suite" title template.
export const metadata = createMetadata({
  title: "Cómo elegir un CRM inmobiliario con WhatsApp",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "cómo elegir CRM inmobiliario",
    "CRM inmobiliario con WhatsApp",
    "mejor CRM inmobiliario México",
    "CRM para asesores inmobiliarios",
  ],
})

// Visible FAQ and FAQPage schema are generated from this same list.
const FAQ: { q: string; a: string }[] = [
  {
    q: "¿Mis asesores tienen que cambiar de número?",
    a: "No. Cada asesor conecta su WhatsApp por código QR y sigue trabajando igual.",
  },
  { q: "¿Hay plazo forzoso?", a: "No. Se contrata mes a mes." },
  {
    q: "¿Lezgo Suite es solo para inmobiliarias?",
    a: "No. Está pensado para inmobiliarias, pero lo usan equipos de venta de otros giros.",
  },
  {
    q: "¿Cuántos usuarios incluye?",
    a: "Start 1, Growth 3, Pro 10 y Elite ilimitados. Usuario adicional en Growth y Pro: $450 MXN + IVA al mes.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: H1,
  description: DESCRIPTION,
  inLanguage: "es-MX",
  datePublished: "2026-11-10",
  dateModified: "2026-11-10",
  mainEntityOfPage: URL,
  author: { "@type": "Organization", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
  publisher: {
    "@type": "Organization",
    name: SITE_CONFIG.name,
    logo: { "@type": "ImageObject", url: SITE_CONFIG.logoUrl },
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_CONFIG.url },
    { "@type": "ListItem", position: 2, name: "Cómo elegir un CRM inmobiliario con WhatsApp", item: URL },
  ],
}

const h2 = "text-2xl sm:text-3xl font-bold font-heading text-gray-900 mt-12 mb-4"
const p = "text-gray-700 leading-relaxed"
const list = "list-disc pl-6 space-y-2 text-gray-700 leading-relaxed"
const link = "text-[#F59B1B] font-semibold hover:underline"

export default function ComoElegirCrmPage() {
  return (
    <>
      <JsonLd data={[articleJsonLd, faqJsonLd, breadcrumbJsonLd]} />
      <article className="container mx-auto px-4 py-16 sm:py-20 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-bold font-heading text-gray-900 mb-4">{H1}</h1>
        <p className="text-sm text-gray-500 mb-8">
          <time dateTime="2026-11">Actualizado en noviembre de 2026.</time>
        </p>
        <p className={`${p} text-lg`}>
          Si tu equipo de 3 asesores o más atiende prospectos por WhatsApp, el CRM que elijas tiene
          que resolver una cosa antes que todo: que tú puedas ver qué pasa con cada lead. Estas son
          las preguntas que conviene hacerle a cualquier proveedor.
        </p>

        <h2 className={h2}>1. ¿Cómo se conecta el WhatsApp de mis asesores?</h2>
        <p className={p}>
          Muchas plataformas trabajan con una sola forma de conexión. Lezgo Suite conecta las
          cuatro:
        </p>
        <ul className={`${list} mt-4`}>
          <li>WhatsApp API oficial para atención masiva y bots.</li>
          <li>
            WhatsApp Coexistence, para usar la API sin dejar de usar la app de WhatsApp en el
            celular.
          </li>
          <li>WhatsApp Business del negocio.</li>
          <li>WhatsApp de cada asesor por código QR, con su propio número, sin cambiarlo.</li>
        </ul>
        <p className={`${p} mt-4`}>
          Todas las conversaciones quedan en una sola pantalla y el dueño ve qué contestó cada
          asesor y cuándo.
        </p>

        <h2 className={h2}>2. ¿Cómo se reparten los leads de pauta?</h2>
        <p className={p}>
          Lezgo Suite reparte los leads entre tus asesores en automático (ruleta o round robin) y,
          si un asesor no contacta a tiempo, avisa o reasigna el lead según la regla que tú pongas.
        </p>

        <h2 className={h2}>3. ¿Quién me ayuda cuando algo no funciona?</h2>
        <p className={p}>
          En Lezgo Suite el soporte es por WhatsApp, con una persona de nuestro equipo en español.
          Todos los planes incluyen onboarding de 2 horas, seguimiento semanal el primer mes, una
          sesión mensual de Customer Success y videotutoriales.
        </p>

        <h2 className={h2}>4. ¿Cómo se cobra?</h2>
        <p className={p}>
          Precio fijo por plan, en pesos y con factura mexicana, mes a mes y sin plazo forzoso.
          Growth incluye 3 usuarios y Pro 10; no pagas por cada usuario desde el primero. Escribir
          desde el WhatsApp de cada asesor no tiene costo; la IA, las plantillas de WhatsApp oficial
          y las llamadas se cobran según uso, con{" "}
          <Link href="/precios" className={link}>
            tabla publicada
          </Link>
          .
        </p>

        <h2 className={h2}>5. ¿Qué pasa con mi información si cambio de CRM?</h2>
        <p className={p}>
          Puedes importar tus contactos y oportunidades a Lezgo Suite. No se migran las
          automatizaciones ni el historial de conversaciones de otra plataforma.
        </p>

        <h2 className={h2}>6. ¿La IA va a hablar por mis asesores?</h2>
        <p className={p}>
          En Lezgo Suite la IA se usa para el primer contacto: responde de inmediato, filtra y le
          pasa al asesor los prospectos que valen la pena. La venta la cierra una persona.
        </p>

        <h2 className={h2}>Para quién es Lezgo Suite</h2>
        <p className={p}>
          Inmobiliarias, desarrolladoras y equipos de venta de 3 asesores o más que ya reciben leads
          (de pauta, portales o redes) por WhatsApp y necesitan ordenarlos. Si eres asesor
          independiente y tu reto principal es conseguir prospectos, un CRM no lo resuelve por sí
          solo.
        </p>

        <h2 className={h2}>Preguntas frecuentes</h2>
        <dl className="space-y-5">
          {FAQ.map((item) => (
            <div key={item.q}>
              <dt className="font-semibold text-gray-900">{item.q}</dt>
              <dd className={`${p} mt-1`}>{item.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 flex flex-col sm:flex-row items-center gap-5">
          <AgendarDemoButton location="guia_elegir_crm" />
          <Link href="/precios" className={link}>
            Ver precios
          </Link>
          <Link href="/inmobiliario" className={link}>
            Conocer el CRM inmobiliario
          </Link>
        </div>
      </article>
    </>
  )
}
