'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { FAQ_ITEMS } from "../faq-data"

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
