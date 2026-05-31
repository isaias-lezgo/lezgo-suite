'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'

const CALENDAR_URL = 'https://app.lezgosuite.com/widget/booking/AN1LKwpuOmHNHso08b8C'

interface Condition {
  icon: string
  title: string
  description: string
  highlighted?: boolean
}

export interface OnboardingConfig {
  planLabel: string
  heading: string
  subtitle: string
  conditions: Condition[]
}

export default function OnboardingPage({ config }: { config: OnboardingConfig }) {
  const [step1Done, setStep1Done] = useState(false)
  const [checkedConditions, setCheckedConditions] = useState<boolean[]>(() =>
    config.conditions.map(() => false),
  )
  const onboardingRef = useRef<HTMLDivElement>(null)

  const allConditionsChecked = checkedConditions.every(Boolean)
  const checkedCount = checkedConditions.filter(Boolean).length
  const totalConditions = config.conditions.length

  function toggleCondition(index: number, checked: boolean) {
    setCheckedConditions((prev) => {
      const next = [...prev]
      next[index] = checked
      return next
    })
  }

  function handleStep1() {
    if (!allConditionsChecked) return
    setStep1Done(true)
    setTimeout(() => {
      onboardingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 350)
  }

  return (
    <div className="min-h-screen" style={{ background: '#F3F5F8', color: '#0F172A' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <header style={{ background: 'linear-gradient(135deg, #1B2B4B 0%, #2E5490 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14">
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
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-7">

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
              Para agendar tu sesión de onboarding, marca cada aclaración del alcance de tu plan,
              confirma que las entendiste y revisa la información del proceso. El calendario se
              habilitará cuando completes ambos pasos.
            </p>
          </div>
        </motion.div>

        {/* ── PASO 1: Alcance del plan ─────────────────────────────────────────── */}
        <div className="space-y-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xs font-bold uppercase tracking-widest px-1"
            style={{ color: '#64748B' }}
          >
            Paso 1: Alcance de tu plan
          </motion.p>

          {config.conditions.map((c, i) => {
            const conditionId = `onboarding-condition-${i}`
            const isChecked = checkedConditions[i]

            return (
              <motion.div
                key={`${c.title}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                className={`rounded-2xl p-5 flex items-start gap-4 shadow-sm ${c.highlighted ? 'border-2' : 'border'}`}
                style={
                  c.highlighted
                    ? { background: '#FEE2E2', borderColor: '#DC2626' }
                    : { background: '#FBFCFE', borderColor: '#D7DEE8' }
                }
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={
                    c.highlighted
                      ? { background: '#DC2626', border: '1px solid #B91C1C' }
                      : { background: 'linear-gradient(135deg, #1B2B4B, #2E5490)' }
                  }
                  aria-hidden="true"
                >
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-sm mb-1"
                    style={{ color: c.highlighted ? '#991B1B' : '#1B2B4B' }}
                  >
                    {c.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: c.highlighted ? '#7F1D1D' : '#64748B' }}
                  >
                    {c.description}
                  </p>

                  {!step1Done ? (
                    <label
                      htmlFor={conditionId}
                      className="mt-4 pt-4 flex items-center gap-3 cursor-pointer select-none border-t"
                      style={{
                        borderColor: c.highlighted ? 'rgba(220,38,38,.25)' : '#E2E8F0',
                      }}
                    >
                      <Checkbox
                        id={conditionId}
                        checked={isChecked}
                        onCheckedChange={(checked) => toggleCondition(i, checked === true)}
                        className="mt-0.5 size-5 shrink-0 rounded-md border-2 border-[#334155] cursor-pointer pointer-events-auto focus-visible:ring-2 focus-visible:ring-[#F59B1B]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFCFE] data-[state=checked]:border-[#F59B1B] data-[state=checked]:bg-[#F59B1B]"
                      />
                      <span
                        className="text-sm font-semibold leading-snug"
                        style={{ color: c.highlighted ? '#991B1B' : '#1B2B4B' }}
                      >
                        He leído y entiendo esta aclaración
                      </span>
                    </label>
                  ) : (
                    <p
                      className="mt-4 pt-4 flex items-center gap-2 text-sm font-semibold border-t"
                      style={{
                        borderColor: c.highlighted ? 'rgba(220,38,38,.25)' : '#E2E8F0',
                        color: '#065f46',
                      }}
                    >
                      <span aria-hidden="true">✓</span>
                      Aclaración confirmada
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}

          <AnimatePresence>
            {!step1Done && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, delay: 0.15 + config.conditions.length * 0.07 }}
              >
                <p className="text-center text-xs mb-2" style={{ color: '#64748B' }}>
                  {allConditionsChecked
                    ? 'Todas las aclaraciones están marcadas. Puedes continuar.'
                    : `Marca todas las aclaraciones para continuar (${checkedCount} de ${totalConditions})`}
                </p>
                <button
                  type="button"
                  onClick={handleStep1}
                  disabled={!allConditionsChecked}
                  className="w-full rounded-2xl p-4 font-bold text-sm transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59B1B]/40 focus-visible:ring-offset-2"
                  style={{
                    background: '#F59B1B',
                    color: 'white',
                    opacity: allConditionsChecked ? 1 : 0.45,
                    cursor: allConditionsChecked ? 'pointer' : 'not-allowed',
                  }}
                >
                  Confirmo que leí y entiendo el alcance de mi plan →
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step1Done && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl p-4 flex items-center gap-3 text-sm font-semibold"
                style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' }}
              >
                <span>✓</span>
                Alcance confirmado
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── PASO 2: Información del onboarding (revealed after step 1) ──────── */}
        <AnimatePresence>
          {step1Done && (
            <motion.div
              ref={onboardingRef}
              key="onboarding-info"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
              className="space-y-4"
            >
              <p
                className="text-xs font-bold uppercase tracking-widest px-1"
                style={{ color: '#64748B' }}
              >
                Paso 2: Información de tu onboarding
              </p>

              <div
                className="rounded-2xl border overflow-hidden shadow-sm"
                style={{ background: '#FBFCFE', borderColor: '#D7DEE8' }}
              >
                {/* Header */}
                <div
                  className="px-6 py-5 border-b"
                  style={{
                    borderColor: '#D7DEE8',
                    background: 'linear-gradient(135deg, #1B2B4B 0%, #2E5490 100%)',
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: '#F59B1B' }}
                  >
                    Siguientes pasos
                  </p>
                  <p className="text-white font-bold text-lg">Onboarding Lezgo Suite</p>
                  <p className="text-sm mt-1" style={{ color: '#93c5fd' }}>
                    En esta sesión realizaremos la configuración inicial de la plataforma según
                    las necesidades de tu negocio.
                  </p>
                </div>

                <div className="px-6 py-6 space-y-6 text-sm" style={{ color: '#334155' }}>

                  {/* Qué es el onboarding */}
                  <div>
                    <p className="font-bold mb-2" style={{ color: '#1B2B4B' }}>¿Qué es el onboarding?</p>
                    <p className="leading-relaxed">
                      El onboarding es la etapa inicial de implementación en la que configuramos
                      los elementos básicos para que Lezgo Suite se adapte a la operación de tu
                      negocio.
                    </p>

                    {/* Alerta: onboarding ≠ capacitación */}
                    <div
                      className="mt-4 rounded-xl p-4 flex items-start gap-3"
                      style={{
                        background: 'rgba(245,155,27,.1)',
                        border: '1.5px solid #F59B1B',
                      }}
                    >
                      <span className="text-lg flex-shrink-0" aria-hidden="true">⚠️</span>
                      <div>
                        <p className="font-bold text-sm mb-1" style={{ color: '#B45309' }}>
                          El onboarding NO es una capacitación
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: '#92400E' }}>
                          El objetivo del onboarding es la configuración inicial de la plataforma,
                          no la capacitación de tu equipo. La formación de usuarios corresponde a
                          cada empresa, con el apoyo de los recursos y materiales que Lezgo Suite
                          pone a disposición después del onboarding.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notas importantes */}
                  <div>
                    <p className="font-bold mb-3" style={{ color: '#1B2B4B' }}>Notas importantes</p>
                    <ul className="space-y-2">
                      {[
                        'Todas las sesiones son virtuales.',
                        'Cada sesión admite un máximo de 10 participantes.',
                        'La tolerancia de espera al inicio de la sesión es de 10 minutos.',
                      ].map((note) => (
                        <li key={note} className="flex items-start gap-3">
                          <span
                            className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: '#F59B1B' }}
                          />
                          <span className="leading-relaxed" style={{ color: '#64748B' }}>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requisitos previos */}
                  <div
                    className="rounded-xl p-5"
                    style={{ background: '#F3F5F8', border: '1px solid #D7DEE8' }}
                  >
                    <p className="font-bold mb-1" style={{ color: '#1B2B4B' }}>
                      Requisitos previos para el onboarding
                    </p>
                    <p className="text-xs mb-4" style={{ color: '#64748B' }}>
                      Ten listos los siguientes elementos para una sesión ágil y efectiva:
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Computadora con conexión a internet estable.',
                        'Teléfono móvil para instalar la aplicación.',
                        'Estructura de comunicación definida (actual o deseada), por ejemplo: un WhatsApp general, uno por asesor, etc.',
                        'Lista de números telefónicos utilizados en la operación (incluidos los vinculados a WhatsApp).',
                        'Acceso a Meta Business Suite de la empresa.',
                        'Datos de cada usuario con acceso a la plataforma: nombre completo, correo electrónico, teléfono y puesto.',
                      ].map((req) => (
                        <li key={req} className="flex items-start gap-3">
                          <span
                            className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: '#2E5490' }}
                          />
                          <span className="leading-relaxed" style={{ color: '#0F172A' }}>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Step 2: link to the booking calendar (gated behind step 1) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center rounded-2xl p-4 font-bold text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B4B]/25 focus-visible:ring-offset-2"
                  style={{ background: '#1B2B4B', color: 'white' }}
                >
                  Agendar mi sesión de onboarding →
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
