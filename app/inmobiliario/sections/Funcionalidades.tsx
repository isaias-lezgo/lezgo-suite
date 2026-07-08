'use client'

import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  Bot,
  Bell,
  MessageSquare,
  BarChart3,
  Contact,
  type LucideIcon,
} from "lucide-react"

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: TrendingUp,
    title: "Pipeline de ventas inteligente",
    body: "Visualiza cada oportunidad por etapa, desde el primer contacto hasta la escritura. Scoring de leads con IA para que tu equipo priorice a quien está listo para comprar.",
  },
  {
    icon: Bot,
    title: "Bots de IA 24/7",
    body: "Responde al instante en WhatsApp e Instagram aunque sea de madrugada. El bot califica al prospecto, responde dudas frecuentes y agenda citas — y le pasa al asesor solo lo que vale la pena.",
  },
  {
    icon: Bell,
    title: "Automatización de seguimiento",
    body: "Nunca más un “se me olvidó darle seguimiento”. Recordatorios automáticos, secuencias de mensajes y alertas cuando un lead lleva demasiado tiempo sin respuesta.",
  },
  {
    icon: MessageSquare,
    title: "Multicanal centralizado",
    body: "WhatsApp, Instagram, Facebook y correo — todas las conversaciones de tu inmobiliaria en una sola bandeja, con historial completo por contacto.",
  },
  {
    icon: BarChart3,
    title: "Dashboard y reportes",
    body: "Mide el desempeño de cada asesor, la conversión por canal y el estado de tu pipeline en tiempo real. Toma decisiones con datos, no con corazonadas.",
  },
  {
    icon: Contact,
    title: "Gestión de cartera y contactos",
    body: "Base de datos centralizada de todos tus prospectos y clientes. Segmenta, etiqueta y no vuelvas a perder un contacto porque estaba “en el celular de un asesor”.",
  },
]

export default function Funcionalidades() {
  return (
    <section className="py-24 relative bg-white/50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900">
            Todo lo que tu inmobiliaria necesita, en una sola plataforma.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {FEATURES.map((f) => (
            <Card
              key={f.title}
              className="h-full bg-white border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <CardContent className="p-7">
                <div className="w-12 h-12 rounded-xl bg-[#F59B1B]/10 flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-[#F59B1B]" />
                </div>
                <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
