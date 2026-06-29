"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { track } from "@vercel/analytics"
import { SITE_CONFIG } from "@/lib/seo"

const OFFICE_LINE = `Coorporativo High Park, ${SITE_CONFIG.address.streetAddress}, Centro Sur, ${SITE_CONFIG.address.postalCode} ${SITE_CONFIG.address.addressLocality}, ${SITE_CONFIG.address.addressRegion}`

const FAQ_ITEMS = [
  {
    question: "¿Cuánto tarda la implementación?",
    answer:
      "La configuración inicial suele completarse en 24 a 48 horas. Proyectos con integraciones o migraciones de datos pueden tomar hasta 4 semanas, según el alcance acordado.",
  },
  {
    question: "¿El soporte es en español?",
    answer:
      "Sí. Todo el equipo de implementación y soporte atiende en español, con horario de oficina en zona centro de México y canales de chat y videollamada.",
  },
  {
    question: "¿Qué incluye el acompañamiento?",
    answer:
      "Onboarding guiado, documentación, sesiones de capacitación y un canal directo con tu especialista asignado durante la implementación.",
  },
]

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const inputClassName =
  "border-gray-300 bg-white focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30 placeholder:text-gray-500"

const fadeUp = (reduced: boolean, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay, ease: EASE_OUT },
      }

function trackFaqToggle(question: string, isOpen: boolean) {
  const params = { question, state: isOpen ? "closed" : "opened" }
  track("Toggle - FAQ", params)
  if (typeof window !== "undefined" && typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === "function") {
    ;(window as unknown as { fbq: (...args: unknown[]) => void }).fbq("trackCustom", "Toggle - FAQ", params)
  }
}

function trackFormSubmit(params: Record<string, string | boolean>) {
  track("Formulario Contacto Enviado", params)
  if (typeof window !== "undefined" && typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === "function") {
    ;(window as unknown as { fbq: (...args: unknown[]) => void }).fbq("track", "Lead", params)
  }
}

export default function ContactoContent() {
  const reducedMotion = useReducedMotion()
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    cargo: "",
    industria: "",
    mensaje: "",
    newsletter: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "Lezgo Suite Contact Form",
        }),
      })

      if (!response.ok) throw new Error("Error al enviar")

      trackFormSubmit({
        industria: formData.industria || "sin_especificar",
        newsletter: formData.newsletter,
      })

      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({
        event: 'form_submit_success',
        form_name: 'contacto_principal',
        form_location: window.location.pathname,
      })

      setSubmitSuccess(true)
      toast({
        title: "Mensaje recibido",
        description: "Un especialista te contactará en las próximas 24 horas.",
      })
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        empresa: "",
        cargo: "",
        industria: "",
        mensaje: "",
        newsletter: false,
      })
    } catch {
      toast({
        title: "No pudimos enviar tu mensaje",
        description: "Intenta de nuevo o escríbenos directamente por correo o teléfono.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          {...fadeUp(!!reducedMotion)}
          className="max-w-md text-center space-y-6"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto bg-[#F59B1B]"
            aria-hidden="true"
          >
            <CheckCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold font-heading text-gray-900">
              Mensaje recibido
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Revisaremos tu solicitud y te responderemos en un máximo de 24 horas hábiles.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setSubmitSuccess(false)}
            className="bg-[#F59B1B] text-white hover:bg-[#e08d18] font-semibold"
          >
            Enviar otro mensaje
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden="true"
      >
        <div className="absolute w-[50%] h-[45%] top-[8%] right-[-10%] rounded-full blur-3xl bg-[#F59B1B]/5" />
      </div>

      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.header
            {...fadeUp(!!reducedMotion)}
            className="max-w-2xl mb-14 lg:mb-20"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[#F59B1B] mb-4">
              Contacto
            </p>
            <h1 className="text-4xl lg:text-[clamp(2.5rem,5vw,3.75rem)] font-bold font-heading leading-[1.1] text-gray-900 mb-5">
              Cuéntanos sobre tu{" "}
              <span className="text-[#F59B1B]">operación</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Agenda una conversación con un especialista. Respondemos en español y en menos de 24 horas.
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
            <motion.div {...fadeUp(!!reducedMotion, 0.08)}>
              <div className="rounded-xl border border-gray-200 bg-white shadow-lg p-6 sm:p-8">
                <h2 className="text-xl font-bold font-heading text-gray-900 mb-6">
                  Envíanos tu mensaje
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-gray-700 font-medium">
                        Nombre completo *
                      </Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                        required
                        autoComplete="name"
                        className={inputClassName}
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Correo electrónico *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        autoComplete="email"
                        className={inputClassName}
                        placeholder="tu@empresa.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-gray-700 font-medium">
                        Teléfono
                      </Label>
                      <Input
                        id="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange("telefono", e.target.value)}
                        autoComplete="tel"
                        className={inputClassName}
                        placeholder="+52 442 000 0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa" className="text-gray-700 font-medium">
                        Empresa
                      </Label>
                      <Input
                        id="empresa"
                        value={formData.empresa}
                        onChange={(e) => handleInputChange("empresa", e.target.value)}
                        autoComplete="organization"
                        className={inputClassName}
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cargo" className="text-gray-700 font-medium">
                        Cargo
                      </Label>
                      <Input
                        id="cargo"
                        value={formData.cargo}
                        onChange={(e) => handleInputChange("cargo", e.target.value)}
                        autoComplete="organization-title"
                        className={inputClassName}
                        placeholder="Director, dueño, gerente…"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industria" className="text-gray-700 font-medium">
                        Industria
                      </Label>
                      <Select
                        value={formData.industria}
                        onValueChange={(value) => handleInputChange("industria", value)}
                      >
                        <SelectTrigger id="industria" className={`w-full text-gray-900 ${inputClassName}`}>
                          <SelectValue placeholder="Selecciona tu sector" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-900 border-gray-200 [&_[data-slot=select-item]]:text-gray-900 [&_[data-slot=select-item]]:focus:bg-[#F59B1B]/10 [&_[data-slot=select-item]]:focus:text-gray-900">
                          <SelectItem value="tecnologia">Tecnología</SelectItem>
                          <SelectItem value="finanzas">Finanzas</SelectItem>
                          <SelectItem value="salud">Salud</SelectItem>
                          <SelectItem value="educacion">Educación</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufactura">Manufactura</SelectItem>
                          <SelectItem value="servicios">Servicios</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-gray-700 font-medium">
                      Mensaje *
                    </Label>
                    <Textarea
                      id="mensaje"
                      value={formData.mensaje}
                      onChange={(e) => handleInputChange("mensaje", e.target.value)}
                      required
                      rows={4}
                      className={`${inputClassName} resize-none`}
                      placeholder="¿Qué procesos quieres automatizar o qué resultado buscas?"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) =>
                        handleInputChange("newsletter", checked === true)
                      }
                      className="mt-0.5 border-gray-300 data-[state=checked]:bg-[#F59B1B] data-[state=checked]:border-[#F59B1B]"
                    />
                    <Label
                      htmlFor="newsletter"
                      className="text-sm text-gray-600 leading-snug font-normal cursor-pointer"
                    >
                      Quiero recibir novedades y recursos para empresas en crecimiento
                    </Label>
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
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.aside
              {...fadeUp(!!reducedMotion, 0.16)}
              className="space-y-10 lg:pt-2"
            >
              <div className="space-y-4">
                <h2 className="text-xl font-bold font-heading text-gray-900">
                  Habla con el equipo
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Preferimos una conversación directa antes de proponerte un plan. Elige el canal que te convenga.
                </p>
              </div>

              <ul className="space-y-8">
                <li className="flex gap-4">
                  <Mail
                    className="w-5 h-5 shrink-0 mt-0.5 text-[#F59B1B]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Correo</p>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-gray-600 hover:text-[#F59B1B] transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Respuesta en 24 h</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone
                    className="w-5 h-5 shrink-0 mt-0.5 text-[#F59B1B]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Teléfono</p>
                    <a
                      href={`tel:${SITE_CONFIG.telephone.replace(/\s/g, "")}`}
                      className="text-gray-600 hover:text-[#F59B1B] transition-colors"
                    >
                      {SITE_CONFIG.telephone}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Lun–Vie, 9:00–18:00</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin
                    className="w-5 h-5 shrink-0 mt-0.5 text-[#F59B1B]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Oficina</p>
                    <p className="text-gray-600 leading-relaxed">{OFFICE_LINE}</p>
                    <p className="text-sm text-gray-500 mt-1">Sede en Querétaro</p>
                  </div>
                </li>
              </ul>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="relative border-t border-gray-200 bg-slate-50/80 py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp(!!reducedMotion)} className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#F59B1B] mb-3">
              Preguntas frecuentes
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900">
              Antes de escribirnos
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: EASE_OUT }}
                className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F59B1B]/5 transition-colors"
                  onClick={() => {
                    const nextOpen = openFaq === index ? null : index
                    trackFaqToggle(faq.question, openFaq === index)
                    setOpenFaq(nextOpen)
                  }}
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-gray-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.2, ease: EASE_OUT }}
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronDown className="h-5 w-5 text-[#F59B1B]" />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? "auto" : 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.28, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
