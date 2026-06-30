'use client'
import Link from "next/link"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ArrowRight, Loader2, Facebook, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { track } from "@vercel/analytics"

export default function Footer() {
  const [footerForm, setFooterForm] = useState({ nombre: '', email: '', telefono: '' })
  const [footerFormSubmitting, setFooterFormSubmitting] = useState(false)
  const [footerFormSubmitted, setFooterFormSubmitted] = useState(false)

  const handleFooterFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
    if (!webhookUrl) return
    setFooterFormSubmitting(true)
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...footerForm,
          timestamp: new Date().toISOString(),
          source: 'formulario-footer',
        }),
      })
      if (!response.ok) throw new Error('Error al enviar')
      track('Formulario Footer - Submit')
      if (typeof (window as any).fbq === 'function') {
        ;(window as any).fbq('trackCustom', 'Formulario Footer - Submit')
      }
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({
        event: 'form_submit_success',
        form_name: 'contacto_final_pagina',
        form_location: window.location.pathname,
      })
      setFooterFormSubmitted(true)
    } catch {
      // silent fail — form stays visible
    } finally {
      setFooterFormSubmitting(false)
    }
  }

  const handleTrackingAndNavigate = (eventName: string, link: string, params?: Record<string, any>) => {
    track(eventName, params);
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("trackCustom", eventName, params);
    }
  };

  return (
    <footer className="bg-[#081737] text-white">
      <section className="py-20 bg-gradient-to-br from-[#F59B1B] to-orange-600 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
                Transforma tu Empresa
                <br />
                <span className="text-orange-100">Hoy Mismo</span>
              </h2>
              <p className="text-lg text-orange-100 mb-8 leading-relaxed">
                Únete a más de 50 empresas que ya confían en Lezgo Suite para impulsar su crecimiento
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#F59B1B] hover:bg-orange-50 px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() =>
                    handleTrackingAndNavigate(
                      "CTA Footer",
                      "https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
                    )
                  }
                >
                  <a href="/#precios">
                    Comenzar ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() =>
                    handleTrackingAndNavigate(
                      "Demo Footer",
                      "https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
                    )
                  }>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
                  >
                    Agenda una llamada
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Right: Lead form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#081737] rounded-2xl p-8 border border-[#0a1f4a]"
            >
              <h3 className="text-xl font-bold font-heading text-white mb-1">
                ¿Listo para transformar tu empresa?
              </h3>
              <p className="text-gray-400 text-sm mb-6">Déjanos tus datos y un especialista te contactará.</p>
              {footerFormSubmitted ? (
                <p className="text-center text-[#F59B1B] font-semibold text-lg py-8">
                  ¡Gracias! Te contactaremos pronto.
                </p>
              ) : (
                <form onSubmit={handleFooterFormSubmit} className="flex flex-col gap-3">
                  <Input
                    value={footerForm.nombre}
                    onChange={(e) => setFooterForm(prev => ({ ...prev, nombre: e.target.value }))}
                    required
                    placeholder="Nombre"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
                    style={{ color: 'white', WebkitTextFillColor: 'white' }}
                  />
                  <Input
                    type="email"
                    value={footerForm.email}
                    onChange={(e) => setFooterForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    placeholder="Email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
                    style={{ color: 'white', WebkitTextFillColor: 'white' }}
                  />
                  <Input
                    type="tel"
                    value={footerForm.telefono}
                    onChange={(e) => setFooterForm(prev => ({ ...prev, telefono: e.target.value }))}
                    required
                    placeholder="Teléfono"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
                    style={{ color: 'white', WebkitTextFillColor: 'white' }}
                  />
                  <Button
                    type="submit"
                    disabled={footerFormSubmitting}
                    className="bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white font-semibold mt-1 transition-all duration-300"
                  >
                    {footerFormSubmitting
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : 'Enviar'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="space-y-4">
            <img src="/LOGONUEVO.png" alt="Lezgo Suite" className="h-8 w-auto" />
            <p className="text-gray-300 leading-relaxed">
              La plataforma empresarial más avanzada para transformar tu negocio con IA y automatizaciones.
            </p>
            {/* Social media icons hidden temporarily */}
            {/* <div className="flex gap-4 pt-2">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
                </svg>
              </a>
            </div> */}
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#F59B1B]">Producto</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#funcionalidades" className="hover:text-white transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="/#caracteristicas" className="hover:text-white transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#precios" className="hover:text-white transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#testimonios" className="hover:text-white transition-colors">
                  Testimonios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#F59B1B]">Empresa</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/sobre-nosotros" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors font-semibold">
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link href="/terminos-y-condiciones" className="hover:text-white transition-colors">
                  Terminos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/aviso-privacidad" className="hover:text-white transition-colors">
                  Aviso de privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2026 Lezgo Suite. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/aviso-privacidad" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacidad
            </Link>
            <Link href="/terminos-y-condiciones" className="text-gray-400 hover:text-white transition-colors text-sm">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
