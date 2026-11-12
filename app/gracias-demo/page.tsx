import Link from "next/link"
import { CalendarCheck } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { WhatsAppButton } from "../inmobiliario/BotonesInmobiliario"

// Thank-you page the "Conoce Lezgo Suite" calendar redirects to after a
// booking. Loading this page IS the conversion signal: GTM fires the
// `cita_agendada` event (and the ad pixels that hang from it) from a trigger
// on this path. Do not push `cita_agendada` to dataLayer from here as well,
// or every booking would be counted twice.

const PATH = "/gracias-demo"

// The root layout applies the "%s | Lezgo Suite" title template.
export const metadata = createMetadata({
  title: "Tu demo quedó agendada",
  description: "Confirmación de tu demo de Lezgo Suite.",
  path: PATH,
  noindex: true,
})

const PREPARACION = [
  "Ten a la mano cuántas personas de tu equipo usarían la plataforma. Con ese dato te decimos qué plan te conviene.",
  "Ubica por dónde te llegan hoy los prospectos (WhatsApp, portales, redes, formularios) y en qué punto se te pierden.",
  "Si alguien más decide contigo, reenvíale la confirmación para que entre a la misma sesión.",
]

export default function GraciasDemoPage() {
  return (
    <article className="container mx-auto px-4 py-16 sm:py-24 max-w-2xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F59B1B] text-white mb-8">
        <CalendarCheck className="h-7 w-7" aria-hidden="true" />
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-6">
        Tu demo quedó agendada
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        Te enviamos la confirmación con la fecha y la hora al correo que registraste. Si no la ves
        en unos minutos, revisa la carpeta de spam.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mt-14 mb-5">
        Para aprovechar la sesión
      </h2>
      <ol className="space-y-4">
        {PREPARACION.map((texto, i) => (
          <li key={texto} className="flex gap-4 text-gray-700 leading-relaxed">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white"
            >
              {i + 1}
            </span>
            <span>{texto}</span>
          </li>
        ))}
      </ol>

      <div className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <p className="font-semibold text-gray-900 mb-2">
          ¿Necesitas cambiar la fecha o tienes una duda antes de la demo?
        </p>
        <WhatsAppButton location="gracias_demo">Escríbenos por WhatsApp</WhatsAppButton>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-x-8 gap-y-3">
        <Link href="/precios" className="text-[#F59B1B] font-semibold hover:underline">
          Ver precios y planes
        </Link>
        <Link href="/" className="text-[#F59B1B] font-semibold hover:underline">
          Volver al inicio
        </Link>
      </div>
    </article>
  )
}
