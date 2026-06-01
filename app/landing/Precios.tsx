"use client"

import { ContactSpecialistButton, PricingButton } from '@/components/custom/BotonesLanding'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, MessageCircle, Play, Users } from 'lucide-react'
import { motion } from "framer-motion"
import Image from 'next/image'
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'

type BillingPeriod = 'mensual' | 'trimestral' | 'semestral' | 'anual'

const BILLING_OPTIONS: { key: BillingPeriod; label: string; discount: number }[] = [
  { key: 'mensual',     label: 'Mensual',     discount: 0 },
  { key: 'trimestral',  label: 'Trimestral',  discount: 0.05 },
  { key: 'semestral',   label: 'Semestral',   discount: 0.10 },
  { key: 'anual',       label: 'Anual',       discount: 0.20 },
]

function applyDiscount(basePrice: number, discount: number): string {
  const discounted = Math.round(basePrice * (1 - discount))
  return '$' + discounted.toLocaleString('es-MX')
}

const BASE_PRICES = { growth: 3527, pro: 5397, elite: 10567 }

const Precios = () => {
  const [billing, setBilling] = useState<BillingPeriod>('mensual')
  const selectedOption = BILLING_OPTIONS.find(o => o.key === billing)!

  return (
    <section id="precios" className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
        style={{ willChange: "transform, opacity" }}
      >
        <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2 mb-6">
          💰 Planes Empresariales
        </Badge>
        <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
          <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
            Inversión Inteligente
          </span>
          <br />
          <span className="text-black">para tu Crecimiento</span>
        </h2>
        <div className="pb-8 flex justify-center">
          <Image
            src="/tablafeatures.png"
            alt="Tabla de Features"
            width={800}
            height={1000}
          />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Elige el plan que se adapte a las necesidades de tu empresa
        </p>
        <p className="text-sm text-gray-500 mt-4 italic">
          Precios en pesos mexicanos (MXN) + IVA
        </p>

        {/* Billing period tabs */}
        <div className="mt-8 inline-flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
          {BILLING_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setBilling(opt.key)}
              className={`relative px-2.5 py-1.5 sm:px-5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                billing === opt.key
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {opt.label}
              {opt.discount > 0 && (
                <span className={`hidden sm:inline ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  billing === opt.key
                    ? 'bg-gradient-to-r from-[#F59B1B] to-orange-500 text-white'
                    : 'bg-orange-100 text-orange-600'
                }`}>
                  -{opt.discount * 100}%
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            name: "Lezgo Growth",
            price: applyDiscount(BASE_PRICES.growth, selectedOption.discount),
            period: "/mes",
            description: "Perfecto para equipos pequeños",
            features: [
              "ACCESO A TODAS LAS FUNCIONALIDADES",
              "Equipo de 3 usuarios",
              "1000 contactos",
            ],
            popular: false,
            color: "border-gray-200",
            link: "https://app.lezgosuite.com/payment-link/698fa8069577be2fe0b6c9a4",
          },
          {
            name: "Lezgo Pro",
            price: applyDiscount(BASE_PRICES.pro, selectedOption.discount),
            period: "/mes",
            description: "Ideal para empresas en crecimiento",
            features: [
              "ACCESO A TODAS LAS FUNCIONALIDADES",
              "Equipo de 10 usuarios",
              "15,000 contactos",
            ],
            link: "https://app.lezgosuite.com/payment-link/69deb4ce557558e89e51fe1d",
            popular: true,
            color: "border-[#F59B1B]",
          },
          {
            name: "Lezgo Elite",
            price: applyDiscount(BASE_PRICES.elite, selectedOption.discount),
            period: "/mes",
            description: "Para grandes organizaciones",
            features: [
              "ACCESO A TODAS LAS FUNCIONALIDADES",
              "Usuarios ilímitados",
              "Contactos ilímitados",
            ],
            note: "Limitado a 20 conexiones por WhatsApp QR",
            link: "https://app.lezgosuite.com/payment-link/69deb5fb80425dc02fbc82e1",
            popular: false,
            color: "border-gray-200",
          },
        ].map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{ willChange: "transform, opacity" }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute z-20 -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2">
                  Más Popular
                </Badge>
              </div>
            )}
            <Card
              className={`h-full bg-white/80 backdrop-blur-sm border-2 ${plan.color
                } ${plan.popular ? "shadow-2xl scale-105" : "shadow-lg"
                } hover:shadow-2xl transition-all duration-300`}
            >
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold font-heading mb-2 text-black">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#F59B1B]">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#F59B1B] mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.note && (
                  <div className="mb-6 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800 text-center">
                      {plan.note}
                    </p>
                  </div>
                )}
                <PricingButton plan={plan} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {/*seccion onboarding, etc*/}
      <div className="mt-8 p-8 ">
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 mb-3">
            Todo plan incluye:
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>Sesión de onboarding personalizada</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Play className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>Acceso a comunidad con video tutoriales</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MessageCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>Soporte a través de WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center py-12">
        <div className="">
          <div className="w-24 h-24 bg-gradient-to-br from-[#F59B1B] to-orange-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        </div>
        <p className="text-gray-700 font-medium text-4xl mb-2">
          ¿Tienes dudas?
        </p>
        <ContactSpecialistButton />
      </div>
      <div className="justify-center h-1 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-600 rounded-full my-8"></div>
    </div>
  </section>
  )
}

export default Precios