'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { track } from "@vercel/analytics"
import { withGAClientId } from "@/lib/utils"
import type { MouseEvent, ReactNode } from "react"

const BOOKING_URL = "https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
const WHATSAPP_URL =
  "https://wa.me/5214426702559?text=" +
  encodeURIComponent("Hola, quiero información sobre el CRM inmobiliario de Lezgo Suite.")

function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof (window as any).fbq === "function") (window as any).fbq("trackCustom", event, params)
}

export function AgendarDemoButton({
  location,
  children,
}: {
  location: string
  children?: ReactNode
}) {
  const handleClick = () => {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: "click_agendar_demo",
      button_text: "Agendar demo",
      button_location: location,
    })
    track("CTA Agendar Demo", { location })
    fbqTrack("CTA Agendar Demo", { location })
  }
  return (
    <Button
      asChild
      size="lg"
      onClick={handleClick}
      className="bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white px-8 py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all rounded-full duration-300 w-full sm:w-auto"
    >
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        {children ?? "Agendar demo gratis"}
        <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
      </a>
    </Button>
  )
}

export function VerPlanesButton() {
  return (
    <Button
      asChild
      size="lg"
      variant="outline"
      className="border-2 border-[#F59B1B] text-[#F59B1B] hover:bg-[#F59B1B] hover:text-white px-8 py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 w-full sm:w-auto bg-transparent"
    >
      <a href="#precios">Ver planes</a>
    </Button>
  )
}

export function WhatsAppButton({ location }: { location: string }) {
  const handleClick = () => {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({ event: "click_whatsapp", button_location: location })
    track("CTA WhatsApp", { location })
    fbqTrack("CTA WhatsApp", { location })
  }
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-[#F59B1B] font-semibold hover:underline"
    >
      O escríbenos directo por WhatsApp
    </a>
  )
}

export function PlanCheckoutButton({
  plan,
}: {
  plan: { name: string; link: string; popular: boolean }
}) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Carry the GA client_id into Stripe Checkout as client_reference_id.
    // Same logic as components/custom/BotonesLanding.tsx (do not change).
    const finalUrl = withGAClientId(plan.link)
    ;(e.currentTarget as unknown as HTMLAnchorElement).href = finalUrl

    const paquete = plan.name.toLowerCase().replace("lezgo ", "")
    const planMatch = plan.link.match(/[?&]plan=([^&]+)/)
    const planPeriod = planMatch ? planMatch[1] : "mensual"
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: "click_payment_link",
      paquete,
      plan: planPeriod,
      button_text: `Comenzar ${plan.name.replace("Lezgo ", "")}`,
      button_location: "precios",
    })
    track("Empezar plan", { plan_name: plan.name })
    fbqTrack("Empezar plan", { plan_name: plan.name })
  }
  return (
    <Button
      asChild
      onClick={handleClick}
      className={`w-full ${
        plan.popular
          ? "bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white"
          : "border-2 border-[#F59B1B] text-[#F59B1B] hover:bg-[#F59B1B] hover:text-white"
      } font-semibold py-3 transition-all duration-300`}
      variant={plan.popular ? "default" : "outline"}
    >
      <a href={plan.link} target="_blank" rel="noopener noreferrer">
        Comenzar ahora
      </a>
    </Button>
  )
}
