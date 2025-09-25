// components/FaqSection.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FaqToggleButton } from "@/components/custom/BotonesLanding"

// FAQ data is co-located with the component for better organization
const faqData = [
  {
    question: "¿Cómo garantizan la seguridad de nuestros datos?",
    answer:
      "Utilizamos encriptación AES-256, certificación ISO 27001, servidores en múltiples regiones, backups automáticos y cumplimos con GDPR y regulaciones locales de protección de datos.",
  },
  {
    question: "¿Puedo integrar Lezgo Suite con nuestros sistemas actuales?",
    answer:
      "Sí, ofrecemos más de 500 integraciones nativas y APIs robustas. Nuestro equipo técnico asegura una integración perfecta con ERP, contabilidad, marketing y otras herramientas empresariales.",
  },
  {
    question: "¿Cómo funciona la escalabilidad de la plataforma?",
    answer:
      "La plataforma escala automáticamente según tus necesidades. Desde equipos pequeños hasta organizaciones con miles de usuarios, sin límites de almacenamiento o procesamiento.",
  },
]

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          style={{ willChange: "transform, opacity" }}
        >
          <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2 mb-6">
            ❓ Preguntas Frecuentes
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
            <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
              Resolvemos
            </span>
            <br />
            <span className="text-black">tus Dudas</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ willChange: "transform, opacity" }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <FaqToggleButton
                    isOpen={openFaq === index}
                    question={faq.question}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  />
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === index ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}