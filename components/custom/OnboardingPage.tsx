'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Script from 'next/script'

const GHL_SCRIPT = 'https://app.lezgosuite.com/js/form_embed.js'
const CALENDAR_URL = 'https://app.lezgosuite.com/widget/booking/AN1LKwpuOmHNHso08b8C'

interface Condition {
  icon: string
  title: string
  description: string
}

export interface OnboardingConfig {
  planLabel: string
  heading: string
  subtitle: string
  introTitle: string
  introText: string
  conditions: Condition[]
}

export default function OnboardingPage({ config }: { config: OnboardingConfig }) {
  const [accepted, setAccepted] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAccepted(e.target.checked)
    if (e.target.checked) {
      setTimeout(() => {
        calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 350)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#F7F8FA', color: '#1A202C' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <header style={{ background: 'linear-gradient(135deg, #1B2B4B 0%, #2E5490 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <span
              className="self-start px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border"
              style={{
                background: 'rgba(245,155,27,.15)',
                borderColor: 'rgba(245,155,27,.4)',
                color: '#F59B1B',
              }}
            >
              {config.planLabel}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {config.heading}
            </h1>
            <p style={{ color: '#93c5fd' }} className="text-base">
              {config.subtitle}
            </p>
          </motion.div>
        </div>
      </header>

      {/* ── Body ──────────────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 space-y-6">

        {/* ── Required-reading notice ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="rounded-2xl border-2 p-6 flex items-start gap-5"
          style={{ background: 'linear-gradient(135deg, #1B2B4B 0%, #2E5490 100%)', borderColor: '#F59B1B' }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: 'rgba(245,155,27,.2)', border: '1px solid rgba(245,155,27,.4)' }}
            aria-hidden="true"
          >
            🔒
          </div>
          <div>
            <p className="font-extrabold text-lg leading-snug text-white mb-1">
              Antes de continuar, lee con atención
            </p>
            <p style={{ color: '#93c5fd' }} className="text-sm leading-relaxed">
              Para poder agendar tu sesión de onboarding deberás leer y confirmar que entiendes
              las condiciones de tu plan. El calendario se habilitará únicamente una vez que
              aceptes los términos a continuación.
            </p>
          </div>
        </motion.div>

        {/* ── Intro block ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border p-6 shadow-sm"
          style={{ background: 'white', borderColor: '#E2E8F0' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#64748B' }}
          >
            {config.introTitle}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            {config.introText}
          </p>
        </motion.div>

        {/* ── Onboarding info ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="rounded-2xl border overflow-hidden shadow-sm"
          style={{ background: 'white', borderColor: '#E2E8F0' }}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b" style={{ borderColor: '#E2E8F0', background: 'linear-gradient(135deg, #1B2B4B 0%, #2E5490 100%)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#F59B1B' }}>
              Siguientes pasos
            </p>
            <p className="text-white font-bold text-lg">Onboarding Lezgo Suite</p>
            <p className="text-sm mt-1" style={{ color: '#93c5fd' }}>
              Tendrás una sesión de onboarding con el objetivo de hacer una configuración inicial de la plataforma.
            </p>
          </div>

          <div className="px-6 py-6 space-y-6 text-sm" style={{ color: '#374151' }}>

            {/* Bienvenida */}
            <div>
              <p className="font-bold mb-2" style={{ color: '#1B2B4B' }}>Bienvenida</p>
              <p className="leading-relaxed">
                ¡Bienvenido a Lezgo Suite! Estamos muy contentos de que formes parte de nuestra comunidad.
                Esta guía te ayudará a dar tus primeros pasos dentro de la plataforma para que aproveches
                todas sus funciones.
              </p>
            </div>

            {/* Qué es el onboarding */}
            <div>
              <p className="font-bold mb-2" style={{ color: '#1B2B4B' }}>¿Qué es el onboarding?</p>
              <p className="leading-relaxed">
                El onboarding es el proceso de implementación inicial y adaptación que vive una empresa
                (y sus usuarios) cuando comienza a usar un sistema de gestión de relaciones con clientes
                como Lezgo Suite. Básicamente, es la fase de arranque donde se prepara todo lo básico para
                que el CRM se ajuste a las necesidades del negocio y los equipos aprendan a usarlo correctamente.
              </p>
            </div>

            {/* Notas importantes */}
            <div>
              <p className="font-bold mb-3" style={{ color: '#1B2B4B' }}>Notas importantes</p>
              <ul className="space-y-2">
                {[
                  'Las sesiones serán siempre virtuales.',
                  'No habrá sesiones de más de 10 personas; si son más de 10, se dividirán las sesiones.',
                  'Si después de acordar el alcance de una implementación se agregan nuevos pendientes, quedan fuera del alcance original.',
                  'A sesión y todas las futuras sesiones tenemos una tolerancia de 10 minutos de espera.',
                ].map((note) => (
                  <li key={note} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#F59B1B' }} />
                    <span className="leading-relaxed" style={{ color: '#64748B' }}>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requisitos previos */}
            <div className="rounded-xl p-5" style={{ background: '#F7F8FA', border: '1px solid #E2E8F0' }}>
              <p className="font-bold mb-1" style={{ color: '#1B2B4B' }}>Requisitos previos para el onboarding</p>
              <p className="text-xs mb-4" style={{ color: '#64748B' }}>
                Para tu sesión de onboarding es importante contar con lo siguiente para asegurar una
                implementación ágil y efectiva:
              </p>
              <ul className="space-y-2">
                {[
                  'Computadora con conexión a internet disponible.',
                  'Teléfono disponible para instalar la aplicación.',
                  'Definición de la estructura de comunicación de la empresa actual, o la deseada (ejemplo: un WhatsApp general, un WhatsApp por asesor, etc.).',
                  'Lista de los números telefónicos utilizados en la operación (ejemplo: los números en las cuentas de WhatsApp).',
                  'Acceso a Meta Business Suite de la empresa.',
                  'Nombre completo, correo electrónico, número telefónico y puesto de las personas que tendrán acceso a la plataforma.',
                ].map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#2E5490' }} />
                    <span className="leading-relaxed" style={{ color: '#374151' }}>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </motion.div>

        {/* ── Conditions ──────────────────────────────────────────────────────── */}
        <div className="space-y-3">
          {config.conditions.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              className="rounded-2xl border p-5 flex items-start gap-4 shadow-sm"
              style={{ background: 'white', borderColor: '#E2E8F0' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #1B2B4B, #2E5490)' }}
                aria-hidden="true"
              >
                {c.icon}
              </div>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#1B2B4B' }}>
                  {c.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                  {c.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Acceptance ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="rounded-2xl border p-6 shadow-sm"
          style={{ background: '#fff7ed', borderColor: '#F59B1B' }}
        >
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={accepted}
              onChange={handleChange}
              className="mt-0.5 w-5 h-5 flex-shrink-0 cursor-pointer accent-[#F59B1B]"
            />
            <span className="text-sm font-semibold leading-relaxed" style={{ color: '#92400E' }}>
              Leí y acepto las condiciones de mi plan
            </span>
          </label>
        </motion.div>

        {/* ── Calendar reveal ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {accepted && (
            <motion.div
              ref={calendarRef}
              key="calendar"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div
                className="rounded-2xl overflow-hidden border shadow-sm"
                style={{ borderColor: '#E2E8F0' }}
              >
                <div
                  className="p-5 text-center border-b"
                  style={{ background: 'white', borderColor: '#E2E8F0' }}
                >
                  <p className="font-bold text-base" style={{ color: '#1B2B4B' }}>
                    Agenda tu sesión de onboarding
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#64748B' }}>
                    Selecciona el horario que mejor te funcione
                  </p>
                </div>
                <iframe
                  src={CALENDAR_URL}
                  title="Agendar sesión de onboarding"
                  className="w-full border-none block"
                  style={{ minHeight: '600px', height: '100%' }}
                  allow="clipboard-write"
                  loading="lazy"
                />
              </div>
              <Script src={GHL_SCRIPT} strategy="afterInteractive" />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
