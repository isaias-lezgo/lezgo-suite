'use client'
import { useState, useEffect, useRef } from 'react'
import { X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { track } from '@vercel/analytics'

export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' })
  const hasShown = useRef(false)

  useEffect(() => {
    if (sessionStorage.getItem('leadPopupShown')) return

    const target = document.getElementById('precios')
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0 && !hasShown.current) {
          hasShown.current = true
          sessionStorage.setItem('leadPopupShown', 'true')
          setIsVisible(true)
          track('Popup Funcionalidades - Abierto')
          if (typeof (window as any).fbq === 'function') {
            ;(window as any).fbq('trackCustom', 'Popup Funcionalidades - Abierto')
          }
        }
      },
      { threshold: 0 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
    if (!webhookUrl) {
      setError('Formulario no disponible en este momento.')
      return
    }
    setIsSubmitting(true)
    setError('')
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'popup-funcionalidades',
        }),
      })
      if (!response.ok) throw new Error('Error al enviar')
      track('Popup Funcionalidades - Submit')
      if (typeof (window as any).fbq === 'function') {
        ;(window as any).fbq('trackCustom', 'Popup Funcionalidades - Submit')
      }
      setSubmitted(true)
    } catch {
      setError('No pudimos enviar tu información. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#F59B1B] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">¡Listo!</h3>
            <p className="text-white/60">Un especialista te contactará pronto.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold font-heading text-white mb-2">
              ¿Te interesa lo que viste?
            </h2>
            <p className="text-white/60 mb-6 leading-relaxed">
              Habla con un especialista y descubre cómo Lezgo Suite puede transformar tu negocio.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="popup-nombre" className="text-white/70">Nombre *</Label>
                <Input
                  id="popup-nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                  required
                  placeholder="Tu nombre"
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="popup-email" className="text-white/70">Email *</Label>
                <Input
                  id="popup-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="tu@empresa.com"
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="popup-telefono" className="text-white/70">Teléfono *</Label>
                <Input
                  id="popup-telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                  required
                  placeholder="+52 442 000 0000"
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus-visible:border-[#F59B1B] focus-visible:ring-[#F59B1B]/30"
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white font-semibold py-3 transition-all duration-300"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Enviando...</>
                ) : (
                  'Quiero más información'
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
