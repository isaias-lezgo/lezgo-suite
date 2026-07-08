'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "¿Qué tan rápido puedo arrancar?",
    a: "Recibes tu cuenta con el snapshot inmobiliario ya armado, así que puedes empezar a operar en pocos días. En el onboarding y con los video tutoriales aprendes a conectar tu WhatsApp y cargar tu base a tu propio ritmo. Si contratas nuestro servicio de Implementación, los tiempos dependen del alcance que definas con el equipo de ventas.",
  },
  {
    q: "¿Puedo cargar mi base de datos actual?",
    a: "Sí. Puedes subir tus contactos y oportunidades a Lezgo Suite, y en el onboarding y los video tutoriales te enseñamos paso a paso cómo hacerlo para que no pierdas información. Si prefieres que te acompañen más de cerca, existen opciones de soporte dedicado.",
  },
  {
    q: "¿Mis asesores tienen que cambiar su WhatsApp?",
    a: "No. Cada asesor conecta su WhatsApp a Lezgo Suite y sigue trabajando como siempre, mientras todas sus conversaciones se reflejan en la plataforma para que tú las supervises en tiempo real. Trabajamos con todas las versiones de WhatsApp disponibles y en la demo definimos la mejor combinación para tu equipo.",
  },
  {
    q: "¿Qué pasa con mis leads si un asesor se va de la empresa?",
    a: "Se quedan contigo. Todas las conversaciones, contactos y oportunidades viven en Lezgo Suite, no en el WhatsApp del asesor. Proteges la cartera de tu inmobiliaria.",
  },
  {
    q: "¿Tiene app móvil?",
    a: "Sí, tu equipo puede operar desde el celular estén donde estén.",
  },
  {
    q: "¿Puedo cambiar de plan después?",
    a: "Sí, puedes subir o bajar de plan cuando lo necesites sin perder tus datos.",
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "No necesitas ser técnico. La plataforma es intuitiva, recibes onboarding personalizado y tienes una comunidad con video tutoriales para cada función. Y si quieres avanzar más rápido, puedes contratar acompañamiento adicional (STD o Implementación).",
  },
  {
    q: "¿Ustedes configuran la cuenta por mí?",
    a: "La configuración estándar la realizas tú, guiado por el onboarding y los video tutoriales — así conoces tu operación a fondo desde el inicio. Si quieres apoyo extra, tenemos dos opciones con costo adicional: el Soporte Técnico Dedicado (STD), un copiloto que reduce tu curva de aprendizaje y acelera la configuración mientras tú la realizas; y el servicio de Implementación, donde nuestro equipo configura la cuenta por ti según los alcances que necesites. Nuestro equipo de ventas te da los detalles de cada opción.",
  },
  {
    q: "¿Los datos están seguros?",
    a: "Sí. Usamos encriptación AES-256, servidores en múltiples regiones, backups automáticos y cumplimiento con las regulaciones de protección de datos.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F59B1B] mb-3">
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900">
            Resolvemos tus dudas
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = open === index
            return (
              <div
                key={item.q}
                className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F59B1B]/5 transition-colors"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-900 text-base sm:text-lg">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronDown className="h-5 w-5 text-[#F59B1B]" />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
