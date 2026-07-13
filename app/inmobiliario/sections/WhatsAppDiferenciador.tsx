'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { AgendarDemoButton } from "../BotonesInmobiliario"

export default function WhatsAppDiferenciador() {
  return (
    <section className="py-20 sm:py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
            Todo el WhatsApp de tu equipo, en una sola pantalla.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Combinamos la <span className="font-semibold text-gray-900">API oficial</span> para
            atención masiva con el WhatsApp de cada asesor por{" "}
            <span className="font-semibold text-gray-900">QR</span> — para que nada se pierda y
            tú tengas el control.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white"
        >
          <Image
            src="/WhatsApp_API_Y_QR.jpeg"
            alt="WhatsApp API para atención masiva con IA y conexión del WhatsApp de cada asesor mediante QR en Lezgo Suite"
            width={2000}
            height={1333}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="w-full h-auto"
            priority={false}
          />
        </motion.div>

        <div className="flex justify-center mt-10 sm:mt-12">
          <AgendarDemoButton location="whatsapp">
            Quiero ver cómo funciona
          </AgendarDemoButton>
        </div>
      </div>
    </section>
  )
}
