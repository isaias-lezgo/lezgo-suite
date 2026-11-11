import type { ReactNode } from "react"
import Link from "next/link"
import { createMetadata, SITE_CONFIG } from "@/lib/seo"
import { JsonLd } from "@/components/custom/JsonLd"
import { BASE_PRICES } from "@/lib/pricing"
import { AgendarDemoButton } from "../inmobiliario/BotonesInmobiliario"

// Server component on purpose: all the text and tables below must be in the
// HTML the server sends, so search engines and AI assistants can read and
// cite them without running JavaScript.

const PATH = "/precios"
const URL = `${SITE_CONFIG.url}${PATH}`

const IVA = 0.16
const EXTRA_USER_PRICE = 450

const mxn = (n: number) => "$" + n.toLocaleString("es-MX")
const mxnConIva = (n: number) =>
  "$" +
  (n * (1 + IVA)).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// The root layout applies the "%s | Lezgo Suite" title template.
export const metadata = createMetadata({
  title: "Precios y planes en pesos (MXN)",
  description: `Planes de Lezgo Suite en pesos: Start ${mxn(BASE_PRICES.start)}, Growth ${mxn(BASE_PRICES.growth)}, Pro ${mxn(BASE_PRICES.pro)} y Elite ${mxn(BASE_PRICES.elite)} al mes + IVA, mes a mes y sin plazo forzoso. Escribir desde el WhatsApp de cada asesor no tiene costo; el consumo de IA y plantillas se paga según uso.`,
  path: PATH,
  keywords: [
    "precios Lezgo Suite",
    "cuánto cuesta Lezgo Suite",
    "precio CRM inmobiliario",
    "CRM con WhatsApp precio México",
  ],
})

const PLANS = [
  { key: "start", name: "Lezgo Start", users: "1", audience: "Asesor independiente" },
  { key: "growth", name: "Lezgo Growth", users: "3", audience: "Equipo pequeño" },
  { key: "pro", name: "Lezgo Pro", users: "10", audience: "Equipo mediano" },
  { key: "elite", name: "Lezgo Elite", users: "Ilimitados", audience: "Desarrolladora u operación grande" },
] as const

const SERVICIOS: [string, string, string][] = [
  [
    "Servicio Estándar",
    "Incluido",
    "Onboarding de 2 horas, seguimiento semanal el primer mes, soporte por WhatsApp con una persona de nuestro equipo en México, sesión mensual de Customer Success y videotutoriales.",
  ],
  [
    "Servicio Técnico Dedicado",
    "$6,700 + IVA al mes",
    "Mes a mes. Nuestro equipo configura y opera la plataforma contigo.",
  ],
  ["Implementación llave en mano", "A la medida", "Se cotiza según el alcance."],
]

const CONSUMO: [string, string][] = [
  ["Escribir desde el WhatsApp de cada asesor (conexión por QR)", "Sin costo"],
  ["Respuesta de IA, nivel ligero", "~$0.001 por respuesta"],
  ["Respuesta de IA, nivel estándar", "~$0.002–0.004 por respuesta"],
  ["Respuesta de IA, nivel avanzado", "~$0.009 por respuesta"],
  ["Respuesta de IA, máxima capacidad", "~$0.021 por respuesta"],
  ["WhatsApp oficial: respuestas dentro de 24 h", "1,000 al mes por número sin costo; después ~$0.021"],
  ["WhatsApp oficial: plantilla de utilidad (confirmaciones, recordatorios)", "~$0.021 por mensaje"],
  ["WhatsApp oficial: plantilla de marketing", "~$0.099 por mensaje"],
  ["Conversaciones que llegan de un anuncio Click to WhatsApp", "Sin costo durante 72 h"],
  ["Correo electrónico", "$1.69 por cada 1,000"],
  ["Llamada saliente a celular, con grabación", "~$0.14 por minuto"],
  ["Llamada entrante, con grabación", "~$0.04 por minuto"],
  ["Acción premium en automatizaciones", "$0.025 por ejecución"],
]

const CONSUMO_POR_VOLUMEN: [string, string][] = [
  ["100", "~$4 USD"],
  ["300", "~$12 USD"],
  ["600", "~$25 USD"],
  ["1,000", "~$41 USD"],
]

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lezgo Suite",
  description:
    "CRM con WhatsApp centralizado para inmobiliarias y equipos de venta en México.",
  url: URL,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "CRM",
  operatingSystem: "Web, iOS, Android",
  inLanguage: "es-MX",
  provider: { "@type": "Organization", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
  // Precio mensual de lista por plan, en MXN, sin IVA. Ver lib/pricing.ts.
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    description: `${plan.audience}. Usuarios incluidos: ${plan.users.toLowerCase()}. Contactos ilimitados.`,
    price: String(BASE_PRICES[plan.key]),
    priceCurrency: "MXN",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(BASE_PRICES[plan.key]),
      priceCurrency: "MXN",
      unitText: "MONTH",
      valueAddedTaxIncluded: false,
    },
    url: URL,
  })),
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_CONFIG.url },
    { "@type": "ListItem", position: 2, name: "Precios", item: URL },
  ],
}

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
      <table className="w-full border-collapse bg-white text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-900 text-white">
            {head.map((h) => (
              <th key={h} scope="col" className="text-left p-4 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>tr:nth-child(even)]:bg-gray-50">{children}</tbody>
      </table>
    </div>
  )
}

const td = "p-4 text-gray-700 align-top"
const th = "p-4 text-left font-semibold text-gray-900 align-top"
const h2 = "text-2xl sm:text-3xl font-bold font-heading text-gray-900 mt-16 mb-5"
const p = "text-gray-700 leading-relaxed"
const list = "list-disc pl-6 space-y-2 text-gray-700 leading-relaxed"

export default function PreciosPage() {
  const growthMas2 = BASE_PRICES.growth + 2 * EXTRA_USER_PRICE

  return (
    <>
      <JsonLd data={[softwareJsonLd, breadcrumbJsonLd]} />
      <article className="container mx-auto px-4 py-16 sm:py-20 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-6">
          Precios de Lezgo Suite
        </h1>
        <p className={`${p} text-lg`}>
          Lezgo Suite es un CRM con WhatsApp centralizado para inmobiliarias y equipos de venta en
          México. Las licencias son en pesos mexicanos (MXN) más IVA y se facturan cada mes. No hay
          plazo forzoso y tu base de datos es tuya.
        </p>

        <h2 className={h2}>Licencias</h2>
        <Table head={["Plan", "Precio mensual", "Con IVA", "Usuarios incluidos", "Para quién"]}>
          {PLANS.map((plan) => (
            <tr key={plan.key}>
              <th scope="row" className={th}>
                {plan.name}
              </th>
              <td className={`${td} whitespace-nowrap`}>{mxn(BASE_PRICES[plan.key])} + IVA</td>
              <td className={`${td} whitespace-nowrap`}>{mxnConIva(BASE_PRICES[plan.key])}</td>
              <td className={td}>{plan.users}</td>
              <td className={td}>{plan.audience}</td>
            </tr>
          ))}
        </Table>
        <p className={`${p} mt-6`}>
          Todas las herramientas vienen en todos los planes. Lo que cambia es el número de usuarios
          y el acompañamiento.
        </p>
        <ul className={`${list} mt-4`}>
          <li>
            Usuario adicional: {mxn(EXTRA_USER_PRICE)} + IVA al mes, en Growth y Pro. Start es para
            una sola persona; con 2 o más, el plan es Growth.
          </li>
          <li>
            Elite incluye 20 conexiones de WhatsApp por código QR; de la 21 en adelante, $150 + IVA
            al mes cada una.
          </li>
          <li>Contactos ilimitados en todos los planes.</li>
          <li>Descuento por prepago (opcional): 5% trimestral, 10% semestral, 20% anual.</li>
        </ul>

        <h2 className={h2}>Acompañamiento</h2>
        <Table head={["Servicio", "Precio", "Qué incluye"]}>
          {SERVICIOS.map(([servicio, precio, incluye]) => (
            <tr key={servicio}>
              <th scope="row" className={th}>
                {servicio}
              </th>
              <td className={`${td} whitespace-nowrap`}>{precio}</td>
              <td className={td}>{incluye}</td>
            </tr>
          ))}
        </Table>

        <h2 className={h2}>Consumo (se paga según uso)</h2>
        <p className={`${p} mb-5`}>
          El consumo se descuenta de un saldo que se recarga en automático. Precios en dólares
          (USD) con IVA incluido.
        </p>
        <Table head={["Concepto", "Precio"]}>
          {CONSUMO.map(([concepto, precio]) => (
            <tr key={concepto}>
              <th scope="row" className={`${th} font-medium`}>
                {concepto}
              </th>
              <td className={td}>{precio}</td>
            </tr>
          ))}
        </Table>
        <p className={`${p} mt-6`}>
          Sin costo adicional: usuarios incluidos en la licencia, automatizaciones estándar,
          pipelines, formularios, calendarios y base de conocimiento.
        </p>
        <p className={`${p} mt-4`}>
          Las tarifas de WhatsApp oficial las fija Meta y pueden cambiar; a otros países se cobra
          la tarifa de Meta de ese país.
        </p>

        <h2 className={h2}>Ejemplos de consumo</h2>
        <p className={p}>Inmobiliaria de 4 asesores con ~100 prospectos al mes:</p>
        <ul className={`${list} mt-4`}>
          <li>
            IA respondiendo el primer contacto (100 prospectos × 6 respuestas, nivel estándar):
            ~$2.50 USD.
          </li>
          <li>Dos envíos de correo a una base de 3,000 contactos: ~$10 USD.</li>
          <li>
            Total: ~$12.50 USD al mes, además de la licencia. Escribir desde el WhatsApp de cada
            asesor no cuesta.
          </li>
        </ul>
        <p className={`${p} mt-6 mb-5`}>
          Según volumen de prospectos (6 respuestas de IA + 1 confirmación de cita por WhatsApp
          oficial, ~$0.04 USD por prospecto):
        </p>
        <Table head={["Prospectos al mes", "Consumo aproximado"]}>
          {CONSUMO_POR_VOLUMEN.map(([prospectos, consumo]) => (
            <tr key={prospectos}>
              <th scope="row" className={`${th} font-medium`}>
                {prospectos}
              </th>
              <td className={td}>{consumo}</td>
            </tr>
          ))}
        </Table>

        <h2 className={h2}>¿Qué plan me conviene?</h2>
        <ul className={list}>
          <li>1 asesor: Start, {mxn(BASE_PRICES.start)} + IVA.</li>
          <li>3 asesores: Growth, {mxn(BASE_PRICES.growth)} + IVA.</li>
          <li>5 asesores: Growth + 2 usuarios, {mxn(growthMas2)} + IVA.</li>
          <li>8 asesores: Pro, {mxn(BASE_PRICES.pro)} + IVA (hasta 10 usuarios).</li>
          <li>25 o más: Elite, usuarios ilimitados.</li>
        </ul>

        <div className="mt-14 flex flex-col sm:flex-row items-center gap-5">
          <AgendarDemoButton location="precios_pagina" />
          <Link href="/inmobiliario#precios" className="text-[#F59B1B] font-semibold hover:underline">
            Contratar un plan en línea
          </Link>
          <Link
            href="/comparativas/como-elegir-crm-inmobiliario-con-whatsapp"
            className="text-[#F59B1B] font-semibold hover:underline"
          >
            Cómo elegir un CRM inmobiliario
          </Link>
        </div>
      </article>
    </>
  )
}
