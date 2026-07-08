'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Play, MessageCircle } from "lucide-react"
import {
  BILLING_OPTIONS,
  BASE_PRICES,
  STRIPE_LINKS,
  applyDiscount,
  type BillingPeriod,
} from "@/lib/pricing"
import { PlanCheckoutButton, AgendarDemoButton } from "../BotonesInmobiliario"

type Plan = {
  key: keyof typeof BASE_PRICES
  name: string
  description: string
  features: string[]
  popular: boolean
  cta: "checkout" | "ventas"
}

const PLANS: Plan[] = [
  {
    key: "start",
    name: "Lezgo Start",
    description: "Para el asesor independiente",
    features: ["Snapshot inmobiliario (Ventas + Rentas)", "1 usuario asesor", "100 contactos"],
    popular: false,
    cta: "checkout",
  },
  {
    key: "growth",
    name: "Lezgo Growth",
    description: "Para el equipo pequeño en crecimiento",
    features: ["Todo lo de Start", "3 usuarios", "1,000 contactos"],
    popular: false,
    cta: "checkout",
  },
  {
    key: "pro",
    name: "Lezgo Pro",
    description: "Para la agencia consolidada",
    features: ["Todo lo de Growth", "10 usuarios", "15,000 contactos"],
    popular: true,
    cta: "checkout",
  },
  {
    key: "elite",
    name: "Lezgo Elite",
    description: "Para la desarrolladora / operación grande",
    features: ["Todo lo de Pro", "Usuarios ilimitados", "Contactos ilimitados", "20 conexiones WhatsApp QR"],
    popular: false,
    cta: "ventas",
  },
]

export default function Precios() {
  // Anual selected by default — best offer for the customer.
  const [billing, setBilling] = useState<BillingPeriod>("anual")
  const selected = BILLING_OPTIONS.find((o) => o.key === billing)!

  return (
    <section id="precios" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
            Planes que crecen con tu inmobiliaria.
          </h2>
          <p className="text-sm text-gray-500 italic">Precios en pesos mexicanos (MXN) + IVA</p>

          {/* Billing period tabs */}
          <div className="mt-8 inline-flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
            {BILLING_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setBilling(opt.key)}
                className={`relative px-2.5 py-1.5 sm:px-5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  billing === opt.key ? "bg-white text-black shadow-md" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {opt.label}
                {opt.discount > 0 && (
                  <span
                    className={`hidden sm:inline ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                      billing === opt.key
                        ? "bg-gradient-to-r from-[#F59B1B] to-orange-500 text-white"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    -{opt.discount * 100}%
                  </span>
                )}
              </button>
            ))}
          </div>
          {billing === "anual" && (
            <p className="mt-4">
              <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-3 py-1">
                Ahorra 20% con el plan anual
              </Badge>
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {PLANS.map((plan) => {
            const link = STRIPE_LINKS[plan.key][billing]
            return (
              <div key={plan.key} className="relative">
                {plan.popular && (
                  <div className="absolute z-20 -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2">
                      Más Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full bg-white border-2 ${
                    plan.popular ? "border-[#F59B1B] shadow-2xl lg:scale-105" : "border-gray-200 shadow-lg"
                  } hover:shadow-2xl transition-all duration-300`}
                >
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="text-center mb-5">
                      <h3 className="text-lg font-bold font-heading mb-1 text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 min-h-[40px]">{plan.description}</p>
                      <div className="mb-1">
                        <span className="text-3xl font-bold text-[#F59B1B]">
                          {applyDiscount(BASE_PRICES[plan.key], selected.discount)}
                        </span>
                        <span className="text-gray-600 text-sm">/mes</span>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-[#F59B1B] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.cta === "checkout" ? (
                      <PlanCheckoutButton plan={{ name: plan.name, link, popular: plan.popular }} />
                    ) : (
                      <AgendarDemoButton location="precios_elite">Hablar con ventas</AgendarDemoButton>
                    )}
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Included in every plan */}
        <div className="mt-14 max-w-3xl mx-auto text-center">
          <p className="text-gray-700 leading-relaxed">
            Todos los planes incluyen: onboarding personalizado, snapshot inmobiliario listo para usar
            (pipelines de Ventas y Rentas), 11 automatizaciones, 2 bots de IA, dashboard de 7 widgets y
            soporte por WhatsApp. Precios + IVA.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F59B1B]" /> Onboarding personalizado
            </span>
            <span className="flex items-center gap-2">
              <Play className="w-4 h-4 text-[#F59B1B]" /> Comunidad con video tutoriales
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#F59B1B]" /> Soporte por WhatsApp
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
