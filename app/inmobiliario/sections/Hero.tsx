'use client'

import { motion } from "framer-motion"
import { AgendarDemoButton, VerPlanesButton } from "../BotonesInmobiliario"

const METRICS: { value: string; label: string }[] = [
  { value: "+50", label: "agencias y desarrolladoras" },
  { value: "+400 mil", label: "conversaciones gestionadas" },
  { value: "24/7", label: "atención con bots de IA" },
]

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F59B1B] mb-5">
            CRM Inmobiliario · Hecho en México
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-[1.1] text-gray-900 mb-6">
            El CRM inmobiliario que centraliza tu{" "}
            <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
              WhatsApp
            </span>{" "}
            y pone a tu equipo de ventas bajo control.
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Conecta el WhatsApp de todos tus asesores en un solo lugar, mira cada
            conversación en tiempo real y deja de perder leads. Diseñado para
            agencias, desarrolladoras y asesores inmobiliarios en México.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <AgendarDemoButton location="hero" />
            <VerPlanesButton />
          </div>

          {/* Static metrics — no animated counter (FIX-2) */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto border-t border-gray-200 pt-10">
            {METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#F59B1B]">
                  {m.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-gray-600 leading-snug">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
