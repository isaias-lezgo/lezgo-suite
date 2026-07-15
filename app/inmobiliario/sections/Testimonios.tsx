'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

// PENDIENTE IVÁN: confirmar textos/clientes antes de publicar.
// SWAP: replace the initials avatar with a real photo (<Image> rounded-full)
// once Iván provides testimonial photos. Keep name/role/company structure.
const TESTIMONIOS: {
  quote: string
  name: string
  role: string
  company: string
  logo?: string
  logoH?: number
}[] = [
  {
    quote:
      "Antes teníamos los leads regados entre el WhatsApp personal de cada asesor. Con Lezgo Suite centralizamos todo y por fin vemos qué pasa con cada prospecto. El retorno de la inversión fue del 340% en el primer año.",
    name: "Jerry Medina",
    role: "Dueño",
    company: "",
    logo: "/logos-clientes/jerry-medina.png",
    logoH: 24,
  },
  {
    quote:
      "La automatización con IA nos permitió organizar nuestros procesos y escalar más rápido de lo que esperábamos. Nuestro tiempo de respuesta mejoró un 70%.",
    name: "Evelyn",
    role: "Directora de Operaciones",
    company: "Yconia",
    logo: "/logos-clientes/yconia-user.png",
    logoH: 34,
  },
  {
    quote:
      "Lo que más me convenció fue poder ver en tiempo real las conversaciones de todo mi equipo de ventas. Como dueño, por fin tengo visibilidad de lo que pasa con cada oportunidad, sin tener que pedir reportes.",
    name: "Charlie Herrera",
    role: "Dueño",
    company: "Herrera Real Estate",
    logo: "/logos-clientes/herrera.png",
    logoH: 40,
  },
  {
    quote:
      "Manejamos varios desarrollos al mismo tiempo y necesitábamos control. Con Lezgo Suite supervisamos a todos los asesores desde un solo lugar y dejamos de perder prospectos por falta de seguimiento.",
    name: "Mariana",
    role: "Directora de Operaciones",
    company: "Domus",
    logo: "/logos-clientes/domus.png",
    logoH: 36,
  },
]

function initials(name: string): string {
  const clean = name.replace(/[[\]]/g, "").trim()
  const parts = clean.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase()
}

export default function Testimonios() {
  return (
    <section id="testimonios" className="py-24 relative bg-white/50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900">
            Lo que dicen quienes ya operan con Lezgo Suite
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {TESTIMONIOS.map((t, i) => (
            <Card key={i} className="h-full bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-7 flex flex-col h-full">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-[#F59B1B] text-[#F59B1B]" />
                    ))}
                  </div>
                  {t.logo && (
                    <img
                      src={t.logo}
                      alt={t.company}
                      draggable={false}
                      loading="lazy"
                      style={{ height: t.logoH ?? 32 }}
                      className="w-auto max-w-[130px] object-contain shrink-0 self-start select-none"
                    />
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed flex-1">“{t.quote}”</p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F59B1B] to-orange-600 text-white font-bold font-heading flex items-center justify-center flex-shrink-0">
                    {initials(t.name)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 leading-tight">{t.name}</p>
                    <p className="text-sm text-gray-500">
                      {[t.role, t.company].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
