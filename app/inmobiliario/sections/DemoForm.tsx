'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle, Loader2, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { track } from "@vercel/analytics"
import { WhatsAppButton } from "../BotonesInmobiliario"

const inputClassName =
  "border-gray-300 bg-white focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30 placeholder:text-gray-500"

const EMPTY = { nombre: "", whatsapp: "", email: "", empresa: "", equipo: "", website: "" }

export default function DemoForm() {
  const [formData, setFormData] = useState(EMPTY)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey || document.getElementById("recaptcha-v3")) return
    const s = document.createElement("script")
    s.id = "recaptcha-v3"
    s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    s.async = true
    document.head.appendChild(s)
  }, [])

  const set = (field: keyof typeof EMPTY, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const pushDataLayer = (payload: Record<string, unknown>) => {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push(payload)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot: real users never fill this hidden field.
    if (formData.website) {
      setSubmitSuccess(true)
      return
    }

    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
    if (!webhookUrl) {
      toast({
        title: "Formulario no disponible",
        description: "Configura NEXT_PUBLIC_WEBHOOK_URL para activar el envío.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    pushDataLayer({
      event: "form_submit",
      form_name: "inmobiliario_demo",
      form_location: window.location.pathname,
    })

    try {
      // reCAPTCHA v3 (only if configured)
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      if (siteKey && (window as any).grecaptcha) {
        const token: string = await (window as any).grecaptcha.execute(siteKey, { action: "demo" })
        const verify = await fetch("/api/verify-recaptcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
        const verifyData = await verify.json()
        if (!verifyData.success) {
          toast({
            title: "No pudimos verificar tu solicitud",
            description: "Recarga la página e inténtalo de nuevo.",
            variant: "destructive",
          })
          setIsSubmitting(false)
          return
        }
      }

      const { website, ...clean } = formData
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...clean,
          equipo: clean.equipo || "sin_especificar",
          timestamp: new Date().toISOString(),
          source: "Lezgo Suite Inmobiliario Landing",
        }),
      })
      if (!response.ok) throw new Error("Error al enviar")

      pushDataLayer({
        event: "form_submit_success",
        form_name: "inmobiliario_demo",
        form_location: window.location.pathname,
        // Enhanced Conversions: raw email/phone for GTM to normalize + hash.
        // GTM's Google Ads tag hashes these client-side; they are never sent in clear.
        user_data: {
          email: clean.email.trim().toLowerCase(),
          phone_number: clean.whatsapp.replace(/\s+/g, ""),
        },
      })
      track("Formulario Inmobiliario Enviado", { equipo: clean.equipo || "sin_especificar" })
      if (typeof (window as any).fbq === "function") {
        ;(window as any).fbq("track", "Lead", { content_name: "inmobiliario_demo" })
      }

      setSubmitSuccess(true)
      setFormData(EMPTY)
      toast({
        title: "Solicitud recibida",
        description: "Un especialista te contactará en menos de 24 horas.",
      })
    } catch {
      toast({
        title: "No pudimos enviar tu solicitud",
        description: "Intenta de nuevo o escríbenos directo por WhatsApp.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="demo" className="py-24 relative bg-white/50 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mb-4">
            Agenda una demo con un especialista.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Te mostramos Lezgo Suite funcionando con un caso real de inmobiliaria. Respuesta en menos
            de 24 horas. Sin compromiso.
          </p>
        </div>

        {submitSuccess ? (
          <div className="rounded-xl border border-gray-200 bg-white shadow-lg p-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto bg-[#F59B1B] mb-5">
              <CheckCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">Solicitud recibida</h3>
            <p className="text-gray-600">
              Un especialista te contactará en menos de 24 horas hábiles.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white shadow-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot — visually hidden, off-screen, not tabbable */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="website">No llenar</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => set("website", e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-gray-700 font-medium">
                    Nombre *
                  </Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => set("nombre", e.target.value)}
                    required
                    autoComplete="name"
                    className={inputClassName}
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-gray-700 font-medium">
                    WhatsApp *
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                    required
                    autoComplete="tel"
                    className={inputClassName}
                    placeholder="+52 442 000 0000"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Correo *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => set("email", e.target.value)}
                    required
                    autoComplete="email"
                    className={inputClassName}
                    placeholder="tu@empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa" className="text-gray-700 font-medium">
                    Inmobiliaria / empresa *
                  </Label>
                  <Input
                    id="empresa"
                    value={formData.empresa}
                    onChange={(e) => set("empresa", e.target.value)}
                    required
                    autoComplete="organization"
                    className={inputClassName}
                    placeholder="Nombre de tu inmobiliaria"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipo" className="text-gray-700 font-medium">
                  Tamaño del equipo (opcional)
                </Label>
                <Select value={formData.equipo} onValueChange={(v) => set("equipo", v)}>
                  <SelectTrigger id="equipo" className={`w-full text-gray-900 ${inputClassName}`}>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-gray-900 border-gray-200 [&_[data-slot=select-item]]:text-gray-900 [&_[data-slot=select-item]]:focus:bg-[#F59B1B]/10 [&_[data-slot=select-item]]:focus:text-gray-900">
                    <SelectItem value="1">1 (asesor independiente)</SelectItem>
                    <SelectItem value="2-5">2 a 5</SelectItem>
                    <SelectItem value="6-15">6 a 15</SelectItem>
                    <SelectItem value="15+">Más de 15</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F59B1B] text-white hover:bg-[#e08d18] py-6 text-base font-semibold transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden="true" />
                    Agendar mi demo
                  </>
                )}
              </Button>

              <div className="text-center pt-1">
                <WhatsAppButton location="form" />
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
