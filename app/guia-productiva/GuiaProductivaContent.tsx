'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, ExternalLink } from 'lucide-react'

// ── Palette (exact original) ──────────────────────────────────────────────────
const C = {
  bg:     '#16213C',   // main background
  bgAlt:  '#1a2744',   // alternating section background
  orange: '#DF7F1E',   // accent orange (original, more amber than site brand)
  hi:     '#F5F5F2',   // bright text
  mid:    '#9CA2B6',   // mid text
  muted:  '#6A7390',   // muted text
  border: 'rgba(255,255,255,0.07)',
  cardBg: 'rgba(255,255,255,0.03)',
}

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay } },
})

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={stagger(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────
const AUDIT_QUESTIONS = [
  '¿Sabes de qué canal vienen realmente tus cierres?',
  '¿Tienes etapas claras de seguimiento por las que pasa cada prospecto?',
  '¿Sabes cuánto tarda, en promedio, en madurar un prospecto?',
  '¿Tu equipo prioriza por criterio y no solo por la presión del momento?',
  '¿Tu operación deja de depender de tu memoria y de los chats?',
  '¿Tienes visibilidad real de tu pipeline en cualquier momento?',
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

// ── Sub-components ─────────────────────────────────────────────────────────────
function SectionTag({ n, label }: { n: string; label: string }) {
  return (
    <FadeUp className="flex items-center gap-3 mb-7">
      <span
        className="font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 rounded"
        style={{ color: C.orange, border: `1px solid ${C.orange}30`, background: `${C.orange}10` }}
      >
        {n}
      </span>
      <span className="text-xs font-medium tracking-wide uppercase" style={{ color: C.muted }}>{label}</span>
    </FadeUp>
  )
}

function Divider() {
  return <div style={{ borderTop: `1px solid ${C.border}` }} />
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function GuiaProductivaContent() {
  const [checked, setChecked] = useState<boolean[]>(Array(AUDIT_QUESTIONS.length).fill(false))

  const score = checked.filter(Boolean).length
  const pct = (score / AUDIT_QUESTIONS.length) * 100

  function getScoreResult() {
    if (score <= 1) return { label: 'Operación reactiva', desc: 'Tu operación depende de la memoria y la reacción. Hay mucho ruido compitiendo por tu atención.' }
    if (score <= 3) return { label: 'En transición', desc: 'Tienes algunos elementos, pero la estructura no es consistente. Falta claridad para que fluya.' }
    return { label: 'Operación con base', desc: 'Tienes una base sólida. El siguiente paso es llevarla a sistema para que escale sin depender de ti.' }
  }

  const { label: scoreLabel, desc: scoreDesc } = getScoreResult()

  return (
    <div className="-mt-16 min-h-screen" style={{ background: C.bg, color: C.hi }}>

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-24 md:pt-32 md:pb-32">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-0.5" style={{ background: C.orange }} />
          <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: C.mid }}>Guía práctica</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-[var(--font-space-grotesk)] font-light leading-[1.05] mb-8"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 8rem)', lineHeight: 1.02 }}
        >
          <span style={{ color: C.muted }}>De ocupado</span>
          <br />
          <span style={{ color: C.hi }}>a </span>
          <span style={{ color: C.orange }}>productivo.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl font-light mb-14 max-w-lg"
          style={{ color: C.mid }}
        >
          Ordena tu operación, recupera enfoque y avanza con más claridad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t pt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
          style={{ borderColor: C.border }}
        >
          <p className="text-sm" style={{ color: C.mid }}>
            Para leer en <span style={{ color: C.orange }}>10 minutos</span> y aplicar esta semana.
          </p>
          <span className="hidden sm:block" style={{ color: C.border }}>·</span>
          <p className="text-sm" style={{ color: C.muted }}>
            Iván Salazar <span className="mx-1.5" style={{ color: C.border }}>·</span> Liderazgo y productividad inmobiliaria
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* ─── INTRO ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <FadeUp>
          <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: C.mid }}>
            En la charla vimos una idea simple y a la vez incómoda:{' '}
            <strong style={{ color: C.hi }}>estar ocupado no es lo mismo que estar avanzando.</strong>
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: C.muted }}>
            Esta guía no busca que trabajes más. Busca ayudarte a ver con claridad qué te está drenando, qué sí mueve tu negocio y cómo dar el siguiente paso con criterio. Léela con calma. Marca lo que te haga sentido. Aplica una sola cosa esta semana.
          </p>
        </FadeUp>
      </section>

      <Divider />

      {/* ─── 01 QUÉ TE DRENA ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <SectionTag n="01" label="Qué te está drenando de verdad" />

        <FadeUp delay={0.05}>
          <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: C.hi }}>
            No siempre falta tiempo.{' '}
            <span style={{ color: C.mid }}>Casi siempre sobra ruido.</span>
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: C.muted }}>
            Demasiadas cosas parecen urgentes al mismo tiempo, y la operación termina dependiendo de la memoria, los chats y la reacción del momento.
          </p>
        </FadeUp>

        <ul className="space-y-4 mb-10">
          {[
            'Tu día lo marcan los mensajes que llegan, no las prioridades que definiste.',
            'Demasiadas cosas parecen urgentes a la vez, y todo compite por tu atención.',
            'El seguimiento vive en tu memoria, en notas sueltas y en conversaciones de WhatsApp.',
            'Hay mucho movimiento, pero no siempre avance en lo que de verdad mueve el negocio.',
            'Cierras el día agotado, sin tener del todo claro qué resolviste.',
          ].map((item, i) => (
            <motion.li
              key={i}
              variants={stagger(i * 0.06)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="flex items-start gap-3"
            >
              <div className="mt-2.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: C.orange }} />
              <span className="text-base leading-relaxed" style={{ color: C.mid }}>{item}</span>
            </motion.li>
          ))}
        </ul>

        <FadeUp delay={0.3}>
          <p className="text-base font-medium" style={{ color: C.hi }}>
            Si reconociste varias, no es falta de esfuerzo. Es falta de estructura.
          </p>
        </FadeUp>
      </section>

      <Divider />

      {/* ─── 02 OCUPADO VS PRODUCTIVO ──────────────────────────────────────── */}
      <section style={{ background: C.bgAlt }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <SectionTag n="02" label="Ocupado vs. productivo" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-12" style={{ color: C.hi }}>
              La diferencia no es trabajar más.{' '}
              <span style={{ color: C.mid }}>Es decidir mejor.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
              <div className="grid grid-cols-2">
                <div className="px-5 py-3.5 text-xs font-bold tracking-widest uppercase" style={{ background: 'rgba(255,255,255,0.04)', color: C.muted }}>Ocupado</div>
                <div className="px-5 py-3.5 text-xs font-bold tracking-widest uppercase border-l" style={{ background: 'rgba(255,255,255,0.04)', color: C.orange, borderColor: C.border }}>Productivo</div>
              </div>
              {[
                ['Reacciona a lo que llega',  'Diseña su día'],
                ['Responde a todo',           'Prioriza lo que importa'],
                ['Se mueve mucho',            'Avanza en lo importante'],
                ['Persigue cada lead',        'Filtra por criterio'],
                ['Termina cansado',           'Termina con progreso'],
              ].map(([left, right], i) => (
                <motion.div
                  key={i}
                  variants={stagger(0.1 + i * 0.05)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-2"
                  style={{ borderTop: `1px solid ${C.border}` }}
                >
                  <div className="px-5 py-4 text-sm" style={{ color: C.muted }}>{left}</div>
                  <div className="px-5 py-4 text-sm border-l" style={{ color: C.hi, borderColor: C.border }}>{right}</div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="mt-8 text-base italic" style={{ color: C.muted }}>
              Estar ocupado se siente como avanzar. Pocas veces lo es.
            </p>
          </FadeUp>
        </div>
      </section>

      <Divider />

      {/* ─── 03 AUDITORÍA ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <SectionTag n="03" label="Auditoría rápida" />

        <FadeUp delay={0.05}>
          <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: C.hi }}>
            ¿Qué tan estructurada está tu operación comercial?
          </h2>
          <p className="text-base mb-10" style={{ color: C.muted }}>
            Seis preguntas, dos minutos. Marca solo las que puedes responder con un sí claro y honesto.
          </p>
        </FadeUp>

        <div className="space-y-3 mb-8">
          {AUDIT_QUESTIONS.map((q, i) => (
            <motion.button
              key={i}
              variants={stagger(i * 0.07)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-30px' }}
              onClick={() => setChecked((p) => p.map((v, idx) => idx === i ? !v : v))}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.998 }}
              className="w-full flex items-start gap-4 p-4 rounded-xl text-left transition-colors duration-200"
              style={{
                background: checked[i] ? `${C.orange}12` : C.cardBg,
                border: `1px solid ${checked[i] ? `${C.orange}50` : C.border}`,
              }}
            >
              <div
                className="mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  background: checked[i] ? C.orange : 'transparent',
                  border: checked[i] ? 'none' : `1.5px solid ${C.muted}50`,
                }}
              >
                {checked[i] && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
              </div>
              <span className="text-sm leading-relaxed" style={{ color: checked[i] ? C.hi : C.mid }}>{q}</span>
            </motion.button>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="rounded-xl p-5" style={{ background: C.bgAlt, border: `1px solid ${C.border}` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: C.mid }}>Tu resultado</span>
              <span className="text-2xl font-bold font-[var(--font-space-grotesk)]" style={{ color: C.orange }}>
                {score}/{AUDIT_QUESTIONS.length}
              </span>
            </div>
            <div className="w-full rounded-full h-1 mb-5" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-1 rounded-full"
                style={{ background: C.orange }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: C.hi }}>{scoreLabel}</p>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{scoreDesc}</p>
          </div>
        </FadeUp>
      </section>

      <Divider />

      {/* ─── 04 QUICK WINS ─────────────────────────────────────────────────── */}
      <section style={{ background: C.bgAlt }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <SectionTag n="04" label="Quick wins para esta semana" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-12" style={{ color: C.hi }}>
              Siete acciones que sí puedes aplicar ya.
            </h2>
          </FadeUp>

          <ol className="space-y-6">
            {QUICK_WINS.map((item, i) => (
              <motion.li
                key={i}
                variants={stagger(i * 0.07)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-30px' }}
                className="flex gap-5"
              >
                <span className="font-mono text-xs font-bold mt-1 flex-shrink-0" style={{ color: C.orange }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base leading-relaxed" style={{ color: C.mid }}>{item}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <Divider />

      {/* ─── 05 QUÉ MEDIR ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <SectionTag n="05" label="Qué sí debes medir" />

        <FadeUp delay={0.05}>
          <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: C.hi }}>
            Lo que no se mide,{' '}
            <span style={{ color: C.mid }}>se administra por intuición.</span>
          </h2>
          <p className="text-base mb-10" style={{ color: C.muted }}>
            No necesitas un tablero complejo. Necesitas mirar pocos números, pero los correctos, de forma constante.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {METRICS.map(({ num, label }, i) => (
            <motion.div
              key={num}
              variants={stagger(i * 0.06)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-30px' }}
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: C.cardBg, border: `1px solid ${C.border}` }}
            >
              <span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: C.orange }}>{num}</span>
              <span className="text-sm" style={{ color: C.hi }}>{label}</span>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div className="pl-5 space-y-1" style={{ borderLeft: `2px solid ${C.orange}` }}>
            <p className="text-sm font-medium" style={{ color: C.hi }}>Si no mides, administras intuición.</p>
            <p className="text-sm" style={{ color: C.muted }}>Si no diseñas, dependes del caos.</p>
          </div>
        </FadeUp>
      </section>

      <Divider />

      {/* ─── 06 CLARIDAD + SISTEMA ─────────────────────────────────────────── */}
      <section style={{ background: C.bgAlt }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <SectionTag n="06" label="Cuando la claridad necesita sistema" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-6" style={{ color: C.hi }}>
              Llega un punto en que el orden ya no cabe en la cabeza.
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: C.muted }}>
              Una herramienta —un CRM— no inventa el orden. Lo sostiene. Empieza a tener sentido cuando:
            </p>
          </FadeUp>

          <ul className="space-y-3 mb-10">
            {[
              'Ya no quieres depender de tu memoria y de los chats para no perder un prospecto.',
              'Necesitas un seguimiento ordenado que no se caiga cuando estás ocupado.',
              'Quieres ver tu pipeline completo, no fragmentos sueltos.',
              'Buscas medir mejor para poder decidir mejor.',
              'Ya decidiste operar con más criterio y quieres llevarlo a sistema.',
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={stagger(i * 0.07)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-start gap-3 list-none"
              >
                <div className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: C.orange }} />
                <span className="text-base leading-relaxed" style={{ color: C.mid }}>{item}</span>
              </motion.li>
            ))}
          </ul>

          <FadeUp delay={0.4}>
            <div className="rounded-xl p-5" style={{ background: `${C.orange}08`, border: `1px solid ${C.orange}25` }}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: C.orange }}>Para ser justos</p>
              <p className="text-sm leading-relaxed" style={{ color: C.mid }}>
                Ninguna herramienta sustituye el liderazgo, el enfoque ni la estrategia. Un buen sistema potencia una operación que ya decidió ordenarse. No la ordena por ti.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <Divider />

      {/* ─── 07 VENTAJA AMII ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <SectionTag n="07" label="Siguiente paso con ventaja AMII" />

        <FadeUp delay={0.05}>
          <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: C.hi }}>
            Si ya decidiste ordenarte,{' '}
            <span style={{ color: C.orange }}>Lezgo Suite lleva ese orden a sistema.</span>
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: C.muted }}>
            No para resolver tu liderazgo, sino para dar estructura a una operación que ya quiere profesionalizarse.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              variants={stagger(i * 0.06)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: C.cardBg, border: `1px solid ${C.border}` }}
            >
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: C.orange }} />
              <span className="text-sm" style={{ color: C.hi }}>{f}</span>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.4}>
          <div className="rounded-xl p-6" style={{ background: `${C.orange}10`, border: `1px solid ${C.orange}30` }}>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: C.orange }}>Ventaja exclusiva AMII</p>
            <p className="text-base font-semibold mb-1" style={{ color: C.hi }}>20% de descuento mientras tu membresía esté activa.</p>
            <p className="text-sm" style={{ color: C.mid }}>Cupo limitado por capacidad de acompañamiento.</p>
          </div>
        </FadeUp>
      </section>

      <Divider />

      {/* ─── 08 CTA FINAL ──────────────────────────────────────────────────── */}
      <section style={{ background: C.bgAlt }}>
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <SectionTag n="08" label="El siguiente paso" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-5xl leading-tight mb-6" style={{ color: C.hi }}>
              No necesitas hacer más.{' '}
              <span style={{ color: C.mid }}>Necesitas hacerlo con claridad.</span>
            </h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: C.muted }}>
              Si este es tu momento de ordenar la operación y llevarla a sistema, da el siguiente paso desde aquí:
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <motion.a
              href="https://app.lezgosuite.com/qr/OU9oCstbzzV-"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base"
              style={{ background: C.orange, color: '#000' }}
            >
              Ordenar mi operación con Lezgo Suite
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <p className="mt-5 text-sm" style={{ color: C.muted }}>
              Aplica el beneficio AMII: 20% de descuento mientras tu membresía esté activa.
            </p>
          </FadeUp>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.35 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 flex items-center gap-2"
          >
            <span className="text-sm font-semibold tracking-wide" style={{ color: C.hi }}>LezgoSuite</span>
            <span style={{ color: C.muted }}>·</span>
            <span className="text-xs" style={{ color: C.muted }}>app.lezgosuite.com</span>
            <ExternalLink className="w-3 h-3" style={{ color: C.muted }} />
          </motion.div>
        </div>
      </section>

    </div>
  )
}
