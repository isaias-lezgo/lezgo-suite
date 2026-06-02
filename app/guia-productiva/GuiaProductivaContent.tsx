'use client'

import { useState } from 'react'
import { Check, ArrowRight, ExternalLink } from 'lucide-react'

const AUDIT_QUESTIONS = [
  '¿Sabes de qué canal vienen realmente tus cierres?',
  '¿Tienes etapas claras de seguimiento por las que pasa cada prospecto?',
  '¿Sabes cuánto tarda, en promedio, en madurar un prospecto?',
  '¿Tu equipo prioriza por criterio y no solo por la presión del momento?',
  '¿Tu operación deja de depender de tu memoria y de los chats?',
  '¿Tienes visibilidad real de tu pipeline en cualquier momento?',
]

const METRICS = [
  { num: '01', label: 'Origen de tus leads' },
  { num: '02', label: 'Tasa de contacto' },
  { num: '03', label: 'Tasa de cita' },
  { num: '04', label: 'Tasa de seguimiento' },
  { num: '05', label: 'Tiempo de maduración' },
  { num: '06', label: 'Conversión por asesor' },
  { num: '07', label: 'Conversión por canal' },
]

const FEATURES = [
  'Centralización de contactos',
  'Seguimiento ordenado',
  'Visibilidad del pipeline',
  'Medición más clara',
  'Automatización de tareas repetitivas',
  'Mejor trazabilidad comercial',
]

const QUICK_WINS = [
  'Define 3 prioridades comerciales reales para la semana. No diez. Tres.',
  'Clasifica tus leads por intención: listos, en proceso y fríos. No todos merecen la misma energía.',
  'Establece las etapas mínimas de seguimiento por las que pasa todo prospecto, de contacto a cierre.',
  'Reserva un bloque diario de trabajo profundo, sin notificaciones, para lo que de verdad mueve el negocio.',
  'Separa las urgencias reales del ruido que solo parece urgente. Pregúntate qué pasa si no lo atiendes hoy.',
  'Identifica qué tareas no deberían vivir en un chat para no perderse entre mensajes.',
  'Ordena una visibilidad comercial mínima: qué tienes, en qué etapa está y qué sigue.',
]

function SectionNumber({ n }: { n: string }) {
  return (
    <span className="font-mono text-xs font-bold tracking-widest text-[#F59B1B]/60 border border-[#F59B1B]/20 rounded px-2 py-0.5">
      {n}
    </span>
  )
}

function Divider() {
  return <div className="border-t border-white/5 my-0" />
}

export default function GuiaProductivaContent() {
  const [checked, setChecked] = useState<boolean[]>(Array(AUDIT_QUESTIONS.length).fill(false))

  const score = checked.filter(Boolean).length

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  function getScoreLabel() {
    if (score <= 1) return { label: 'Operación reactiva', desc: 'Tu operación depende de la memoria y la reacción. Hay mucho ruido compitiendo por tu atención.' }
    if (score <= 3) return { label: 'En transición', desc: 'Tienes algunos elementos, pero la estructura no es consistente. Falta claridad para que fluya.' }
    return { label: 'Operación con base', desc: 'Tienes una base sólida. El siguiente paso es llevarla a sistema para que escale sin depender de ti.' }
  }

  const { label: scoreLabel, desc: scoreDesc } = getScoreLabel()

  return (
    <div className="-mt-16 min-h-screen" style={{ background: '#16213C', color: '#F5F5F2' }}>

      {/* ─── HERO ─── */}
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-0.5 bg-[#F59B1B]" />
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#9CA2B6]">Guía práctica</span>
        </div>

        <h1 className="font-[var(--font-space-grotesk)] font-light leading-[1.05] mb-6" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: '#F5F5F2' }}>
          <span style={{ color: '#6A7390' }}>De ocupado</span>
          <br />
          a{' '}
          <span style={{ color: '#F59B1B' }}>productivo.</span>
        </h1>

        <p className="text-lg md:text-xl font-light mb-12 max-w-lg" style={{ color: '#9CA2B6' }}>
          Ordena tu operación, recupera enfoque y avanza con más claridad.
        </p>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-sm" style={{ color: '#9CA2B6' }}>
            Para leer en <span style={{ color: '#F59B1B' }}>10 minutos</span> y aplicar esta semana.
          </p>
          <span className="hidden sm:block text-white/20">·</span>
          <p className="text-sm font-medium" style={{ color: '#9CA2B6' }}>
            Iván Salazar <span className="text-white/20 mx-1">·</span> Liderazgo y productividad inmobiliaria
          </p>
        </div>
      </section>

      <Divider />

      {/* ─── INTRO ─── */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: '#9CA2B6' }}>
          En la charla vimos una idea simple y a la vez incómoda:{' '}
          <strong style={{ color: '#F5F5F2' }}>estar ocupado no es lo mismo que estar avanzando.</strong>
        </p>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: '#6A7390' }}>
          Esta guía no busca que trabajes más. Busca ayudarte a ver con claridad qué te está drenando, qué sí mueve tu negocio y cómo dar el siguiente paso con criterio. Léela con calma. Marca lo que te haga sentido. Aplica una sola cosa esta semana.
        </p>
      </section>

      <Divider />

      {/* ─── 01 QUÉ TE DRENA ─── */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-3 mb-6">
          <SectionNumber n="01" />
          <span className="text-sm font-medium" style={{ color: '#6A7390' }}>Qué te está drenando de verdad</span>
        </div>

        <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: '#F5F5F2' }}>
          No siempre falta tiempo.{' '}
          <span style={{ color: '#9CA2B6' }}>Casi siempre sobra ruido.</span>
        </h2>

        <p className="text-base leading-relaxed mb-8" style={{ color: '#6A7390' }}>
          Demasiadas cosas parecen urgentes al mismo tiempo, y la operación termina dependiendo de la memoria, los chats y la reacción del momento.
        </p>

        <ul className="space-y-4 mb-8">
          {[
            'Tu día lo marcan los mensajes que llegan, no las prioridades que definiste.',
            'Demasiadas cosas parecen urgentes a la vez, y todo compite por tu atención.',
            'El seguimiento vive en tu memoria, en notas sueltas y en conversaciones de WhatsApp.',
            'Hay mucho movimiento, pero no siempre avance en lo que de verdad mueve el negocio.',
            'Cierras el día agotado, sin tener del todo claro qué resolviste.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#F59B1B' }} />
              <span className="text-base leading-relaxed" style={{ color: '#9CA2B6' }}>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-base font-medium" style={{ color: '#F5F5F2' }}>
          Si reconociste varias, no es falta de esfuerzo. Es falta de estructura.
        </p>
      </section>

      <Divider />

      {/* ─── 02 OCUPADO VS PRODUCTIVO ─── */}
      <section style={{ background: '#0f172a' }}>
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="flex items-center gap-3 mb-6">
            <SectionNumber n="02" />
            <span className="text-sm font-medium" style={{ color: '#6A7390' }}>Ocupado vs. productivo</span>
          </div>

          <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-10" style={{ color: '#F5F5F2' }}>
            La diferencia no es trabajar más.{' '}
            <span style={{ color: '#9CA2B6' }}>Es decidir mejor.</span>
          </h2>

          <div className="rounded-xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-2">
              <div className="px-5 py-3 text-sm font-bold tracking-wide" style={{ background: '#1e293b', color: '#6A7390' }}>Ocupado</div>
              <div className="px-5 py-3 text-sm font-bold tracking-wide border-l border-white/10" style={{ background: '#1e293b', color: '#F59B1B' }}>Productivo</div>
            </div>
            {[
              ['Reacciona a lo que llega', 'Diseña su día'],
              ['Responde a todo', 'Prioriza lo que importa'],
              ['Se mueve mucho', 'Avanza en lo importante'],
              ['Persigue cada lead', 'Filtra por criterio'],
              ['Termina cansado', 'Termina con progreso'],
            ].map(([left, right], i) => (
              <div key={i} className="grid grid-cols-2 border-t border-white/5">
                <div className="px-5 py-3.5 text-sm" style={{ color: '#6A7390' }}>{left}</div>
                <div className="px-5 py-3.5 text-sm border-l border-white/5" style={{ color: '#F5F5F2' }}>{right}</div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-base italic" style={{ color: '#6A7390' }}>
            Estar ocupado se siente como avanzar. Pocas veces lo es.
          </p>
        </div>
      </section>

      <Divider />

      {/* ─── 03 AUDITORÍA ─── */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-3 mb-6">
          <SectionNumber n="03" />
          <span className="text-sm font-medium" style={{ color: '#6A7390' }}>Auditoría rápida</span>
        </div>

        <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: '#F5F5F2' }}>
          ¿Qué tan estructurada está tu operación comercial?
        </h2>
        <p className="text-base mb-8" style={{ color: '#6A7390' }}>
          Seis preguntas, dos minutos. Marca solo las que puedes responder con un sí claro y honesto.
        </p>

        <div className="space-y-3 mb-8">
          {AUDIT_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-200 border"
              style={{
                background: checked[i] ? 'rgba(245,155,27,0.08)' : 'rgba(255,255,255,0.03)',
                borderColor: checked[i] ? 'rgba(245,155,27,0.4)' : 'rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  background: checked[i] ? '#F59B1B' : 'transparent',
                  border: checked[i] ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                }}
              >
                {checked[i] && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
              </div>
              <span className="text-sm leading-relaxed" style={{ color: checked[i] ? '#F5F5F2' : '#9CA2B6' }}>{q}</span>
            </button>
          ))}
        </div>

        {/* Score */}
        <div className="rounded-xl p-5 border border-white/10" style={{ background: '#0f172a' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium" style={{ color: '#9CA2B6' }}>Tu resultado</span>
            <span className="text-2xl font-bold font-[var(--font-space-grotesk)]" style={{ color: '#F59B1B' }}>
              {score}/{AUDIT_QUESTIONS.length}
            </span>
          </div>
          <div className="w-full rounded-full h-1.5 mb-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(score / AUDIT_QUESTIONS.length) * 100}%`, background: '#F59B1B' }}
            />
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: '#F5F5F2' }}>{scoreLabel}</p>
          <p className="text-sm leading-relaxed" style={{ color: '#6A7390' }}>{scoreDesc}</p>
        </div>
      </section>

      <Divider />

      {/* ─── 04 QUICK WINS ─── */}
      <section style={{ background: '#0f172a' }}>
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="flex items-center gap-3 mb-6">
            <SectionNumber n="04" />
            <span className="text-sm font-medium" style={{ color: '#6A7390' }}>Quick wins para esta semana</span>
          </div>

          <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-10" style={{ color: '#F5F5F2' }}>
            Siete acciones que sí puedes aplicar ya.
          </h2>

          <ol className="space-y-5">
            {QUICK_WINS.map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-xs font-bold mt-1 flex-shrink-0 w-6" style={{ color: '#F59B1B' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base leading-relaxed" style={{ color: '#9CA2B6' }}>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Divider />

      {/* ─── 05 QUÉ MEDIR ─── */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-3 mb-6">
          <SectionNumber n="05" />
          <span className="text-sm font-medium" style={{ color: '#6A7390' }}>Qué sí debes medir</span>
        </div>

        <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: '#F5F5F2' }}>
          Lo que no se mide,{' '}
          <span style={{ color: '#9CA2B6' }}>se administra por intuición.</span>
        </h2>
        <p className="text-base mb-10" style={{ color: '#6A7390' }}>
          No necesitas un tablero complejo. Necesitas mirar pocos números, pero los correctos, de forma constante.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {METRICS.map(({ num, label }) => (
            <div
              key={num}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/5"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: '#F59B1B' }}>{num}</span>
              <span className="text-sm" style={{ color: '#F5F5F2' }}>{label}</span>
            </div>
          ))}
        </div>

        <div className="border-l-2 pl-5 space-y-1" style={{ borderColor: '#F59B1B' }}>
          <p className="text-sm font-medium" style={{ color: '#F5F5F2' }}>Si no mides, administras intuición.</p>
          <p className="text-sm" style={{ color: '#6A7390' }}>Si no diseñas, dependes del caos.</p>
        </div>
      </section>

      <Divider />

      {/* ─── 06 CLARIDAD + SISTEMA ─── */}
      <section style={{ background: '#0f172a' }}>
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="flex items-center gap-3 mb-6">
            <SectionNumber n="06" />
            <span className="text-sm font-medium" style={{ color: '#6A7390' }}>Cuando la claridad necesita sistema</span>
          </div>

          <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-6" style={{ color: '#F5F5F2' }}>
            Llega un punto en que el orden ya no cabe en la cabeza.
          </h2>

          <p className="text-base leading-relaxed mb-8" style={{ color: '#6A7390' }}>
            Una herramienta —un CRM— no inventa el orden. Lo sostiene. Empieza a tener sentido cuando:
          </p>

          <ul className="space-y-3 mb-10">
            {[
              'Ya no quieres depender de tu memoria y de los chats para no perder un prospecto.',
              'Necesitas un seguimiento ordenado que no se caiga cuando estás ocupado.',
              'Quieres ver tu pipeline completo, no fragmentos sueltos.',
              'Buscas medir mejor para poder decidir mejor.',
              'Ya decidiste operar con más criterio y quieres llevarlo a sistema.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#F59B1B' }} />
                <span className="text-base leading-relaxed" style={{ color: '#9CA2B6' }}>{item}</span>
              </li>
            ))}
          </ul>

          {/* Callout */}
          <div className="rounded-xl p-5 border" style={{ background: 'rgba(245,155,27,0.05)', borderColor: 'rgba(245,155,27,0.15)' }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#F59B1B' }}>Para ser justos</p>
            <p className="text-sm leading-relaxed" style={{ color: '#9CA2B6' }}>
              Ninguna herramienta sustituye el liderazgo, el enfoque ni la estrategia. Un buen sistema potencia una operación que ya decidió ordenarse. No la ordena por ti.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── 07 SIGUIENTE PASO AMII ─── */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-3 mb-6">
          <SectionNumber n="07" />
          <span className="text-sm font-medium" style={{ color: '#6A7390' }}>Siguiente paso con ventaja AMII</span>
        </div>

        <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: '#F5F5F2' }}>
          Si ya decidiste ordenarte,{' '}
          <span style={{ color: '#F59B1B' }}>Lezgo Suite lleva ese orden a sistema.</span>
        </h2>

        <p className="text-base leading-relaxed mb-10" style={{ color: '#6A7390' }}>
          No para resolver tu liderazgo, sino para dar estructura a una operación que ya quiere profesionalizarse.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#F59B1B' }} />
              <span className="text-sm" style={{ color: '#F5F5F2' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* AMII benefit */}
        <div className="rounded-xl p-6 border" style={{ background: 'rgba(245,155,27,0.07)', borderColor: 'rgba(245,155,27,0.25)' }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#F59B1B' }}>Ventaja exclusiva AMII</p>
          <p className="text-base font-semibold mb-1" style={{ color: '#F5F5F2' }}>20% de descuento mientras tu membresía esté activa.</p>
          <p className="text-sm" style={{ color: '#9CA2B6' }}>Cupo limitado por capacidad de acompañamiento.</p>
        </div>
      </section>

      <Divider />

      {/* ─── 08 CTA FINAL ─── */}
      <section style={{ background: '#0f172a' }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <SectionNumber n="08" />
            <span className="text-sm font-medium" style={{ color: '#6A7390' }}>El siguiente paso</span>
          </div>

          <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-5xl leading-tight mb-6" style={{ color: '#F5F5F2' }}>
            No necesitas hacer más.{' '}
            <span style={{ color: '#9CA2B6' }}>Necesitas hacerlo con claridad.</span>
          </h2>

          <p className="text-base leading-relaxed mb-10" style={{ color: '#6A7390' }}>
            Si este es tu momento de ordenar la operación y llevarla a sistema, da el siguiente paso desde aquí:
          </p>

          <a
            href="https://app.lezgosuite.com/qr/OU9oCstbzzV-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90 hover:gap-4"
            style={{ background: '#F59B1B', color: '#000' }}
          >
            Ordenar mi operación con Lezgo Suite
            <ArrowRight className="w-4 h-4" />
          </a>

          <p className="mt-6 text-sm" style={{ color: '#6A7390' }}>
            Aplica el beneficio AMII: 20% de descuento mientras tu membresía esté activa.
          </p>

          {/* Footer brand */}
          <div className="mt-20 flex items-center gap-2 opacity-40">
            <span className="text-sm font-semibold tracking-wide" style={{ color: '#F5F5F2' }}>LezgoSuite</span>
            <span style={{ color: '#6A7390' }}>·</span>
            <span className="text-xs" style={{ color: '#6A7390' }}>app.lezgosuite.com</span>
            <ExternalLink className="w-3 h-3" style={{ color: '#6A7390' }} />
          </div>
        </div>
      </section>

    </div>
  )
}
