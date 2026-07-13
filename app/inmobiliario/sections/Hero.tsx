'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { AgendarDemoButton, VerPlanesButton } from "../BotonesInmobiliario"

const METRICS: { value: string; label: string }[] = [
  { value: "+50", label: "agencias y desarrolladoras" },
  { value: "+400 mil", label: "conversaciones gestionadas" },
  { value: "24/7", label: "atención con bots de IA" },
]

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 sm:pt-20 sm:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center lg:text-left"
          >
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F59B1B] mb-5">
              CRM Inmobiliario · Hecho en México
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold font-heading leading-[1.08] text-gray-900 mb-5">
              El CRM inmobiliario que centraliza el{" "}
              <span className="text-[#F59B1B]">WhatsApp</span> de tu equipo.
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
              Cada conversación de tus asesores en una sola pantalla, en tiempo real.
              Para agencias, desarrolladoras y asesores en México.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <AgendarDemoButton location="hero" />
              <VerPlanesButton />
            </div>
          </motion.div>

          {/* El producto real: el dashboard en escritorio y en el celular del asesor */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="relative w-full max-w-xl mx-auto lg:max-w-none"
          >
            <Image
              src="/hero-laptop-inmobiliario.png"
              alt="Dashboard de Lezgo Suite en una laptop: contactos, oportunidades, ingreso ganado y el embudo de ventas de una inmobiliaria"
              width={2400}
              height={1482}
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 60vw, 560px"
              priority
              className="w-full h-auto"
            />
            <Image
              src="/hero-phone-inmobiliario.png"
              alt="La misma información en el celular del asesor: estado del negocio y distribución por fases"
              width={900}
              height={1858}
              sizes="(max-width: 640px) 22vw, 150px"
              className="absolute right-[3%] -bottom-[9%] w-[24%] h-auto drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Static metrics — no animated counter (FIX-2) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto border-t border-gray-200 mt-16 sm:mt-20 pt-10"
        >
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
        </motion.div>
      </div>
    </section>
  )
}
