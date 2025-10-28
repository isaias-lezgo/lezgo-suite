import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link2, Rocket, Settings, TrendingUp } from 'lucide-react'
import { motion } from "framer-motion"

import React from 'react'

const Pasos = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
          <span className="text-black">¿Cómo </span>
          <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
            funciona?
          </span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {[
          {
            step: "Paso 1:",
            title: "Conecta tus apps en minutos.",
            icon: <Link2 className="h-10 w-10" />,
            color: "from-[#F59B1B] to-orange-600",
            delay: 0,
          },
          {
            step: "Paso 2:",
            title: "Activa automatizaciones inteligentes y crea chatbots.",
            icon: <Settings className="h-10 w-10" />,
            color: "from-orange-500 to-[#F59B1B]",
            delay: 0.1,
          },
          {
            step: "Paso 3:",
            title: "Analiza resultados en un dashboard unificado.",
            icon: <TrendingUp className="h-10 w-10" />,
            color: "from-[#F59B1B] to-orange-700",
            delay: 0.2,
          },
          {
            step: "Paso 4:",
            title: "¡Listo! Tienes todo centralizado para eficientar tu forma de trabajo.",
            icon: <Rocket className="h-10 w-10" />,
            color: "from-orange-600 to-[#F59B1B]",
            delay: 0.3,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: item.delay }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl" />
            <Card className="relative h-full bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-6 shadow-lg mx-auto`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#F59B1B] mb-3">
                  {item.step}
                </h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  {item.title}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Button asChild className="bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
          <a href="https://app.lezgosuite.com/payment-link/68ae46632ba55c5eda290d56">
            Actívalo ahora, primer mes gratis
          </a>
        </Button>
      </motion.div>
    </div>
  </section>
  )
}

export default Pasos