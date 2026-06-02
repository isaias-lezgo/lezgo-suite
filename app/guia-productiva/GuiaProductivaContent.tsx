'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, ExternalLink } from 'lucide-react'

// ── Palette ───────────────────────────────────────────────────────────────────
const D = {                          // DARK sections
  bg:     '#16213C',
  hi:     '#F5F5F2',
  mid:    '#9CA2B6',
  muted:  '#6A7390',
  border: 'rgba(255,255,255,0.08)',
  card:   'rgba(255,255,255,0.04)',
}
const L = {                          // LIGHT sections
  bg:     '#EDECEA',
  hi:     '#16213C',
  mid:    '#4a5570',
  muted:  '#7a849e',
  border: 'rgba(22,33,60,0.1)',
  card:   'rgba(22,33,60,0.04)',
}
const ORANGE = '#DF7F1E'

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
})

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div variants={fadeUp(delay)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className={className}>
      {children}
    </motion.div>
  )
}

// ── Section header tag ────────────────────────────────────────────────────────
function SectionTag({ n, label }: { n: string; label: string }) {
  return (
    <FadeUp className="flex items-center gap-3 mb-8">
      <span className="font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 rounded" style={{ color: ORANGE, border: `1px solid ${ORANGE}35`, background: `${ORANGE}12` }}>{n}</span>
      <span className="text-xs font-medium tracking-widest uppercase" style={{ color: ORANGE }}>{label}</span>
    </FadeUp>
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

// ── Component ─────────────────────────────────────────────────────────────────
export default function GuiaProductivaContent() {
  const [checked, setChecked] = useState<boolean[]>(Array(AUDIT_QUESTIONS.length).fill(false))
  const score = checked.filter(Boolean).length
  const pct   = (score / AUDIT_QUESTIONS.length) * 100

  function getResult() {
    if (score <= 1) return { label: 'Operación reactiva',    desc: 'Tu operación depende de la memoria y la reacción. Hay mucho ruido compitiendo por tu atención.' }
    if (score <= 3) return { label: 'En transición',         desc: 'Tienes algunos elementos, pero la estructura no es consistente. Falta claridad para que fluya.' }
    return              { label: 'Operación con base',       desc: 'Tienes una base sólida. El siguiente paso es llevarla a sistema para que escale sin depender de ti.' }
  }
  const { label: scoreLabel, desc: scoreDesc } = getResult()

  return (
    <div className="-mt-16">

      {/* ════════════════════ HERO — DARK ════════════════════ */}
      <section style={{ background: D.bg, color: D.hi }}>
        <div className="mx-auto max-w-3xl px-6 pt-24 pb-24 md:pt-36 md:pb-32">

          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-10">
            <div className="w-8 h-0.5" style={{ background: ORANGE }} />
            <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: D.mid }}>Guía práctica</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-[var(--font-space-grotesk)] font-light leading-[1.02] mb-8"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 8rem)', color: D.hi }}
          >
            <span style={{ color: D.muted }}>De ocupado</span><br />
            <span style={{ color: D.hi }}>a </span>
            <span style={{ color: ORANGE }}>productivo.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl font-light mb-14 max-w-lg" style={{ color: D.mid }}>
            Ordena tu operación, recupera enfoque y avanza con más claridad.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t pt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
            style={{ borderColor: D.border }}>
            <p className="text-sm" style={{ color: D.mid }}>
              Para leer en <span style={{ color: ORANGE }}>10 minutos</span> y aplicar esta semana.
            </p>
            <span className="hidden sm:block" style={{ color: D.border }}>·</span>
            <p className="text-sm" style={{ color: D.muted }}>
              Iván Salazar <span className="mx-1.5">·</span> Liderazgo y productividad inmobiliaria
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ INTRO — LIGHT ════════════════════ */}
      <section style={{ background: L.bg, color: L.hi }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <FadeUp>
            <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: L.mid }}>
              En la charla vimos una idea simple y a la vez incómoda:{' '}
              <strong style={{ color: L.hi }}>estar ocupado no es lo mismo que estar avanzando.</strong>
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: L.muted }}>
              Esta guía no busca que trabajes más. Busca ayudarte a ver con claridad qué te está drenando, qué sí mueve tu negocio y cómo dar el siguiente paso con criterio. Léela con calma. Marca lo que te haga sentido. Aplica una sola cosa esta semana.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════ 01 QUÉ TE DRENA — LIGHT ════════════════════ */}
      <section style={{ background: L.bg, color: L.hi, borderTop: `1px solid ${L.border}` }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <SectionTag n="01" label="Qué te está drenando de verdad" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: L.hi }}>
              No siempre falta tiempo.{' '}
              <span style={{ color: L.muted }}>Casi siempre sobra ruido.</span>
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: L.muted }}>
              Demasiadas cosas parecen urgentes al mismo tiempo, y la operación termina dependiendo de la memoria, los chats y la reacción del momento.
            </p>
          </FadeUp>

          <ul className="space-y-6 mb-10">
            {[
              'Tu día lo marcan los mensajes que llegan, no las prioridades que definiste.',
              'Demasiadas cosas parecen urgentes a la vez, y todo compite por tu atención.',
              'El seguimiento vive en tu memoria, en notas sueltas y en conversaciones de WhatsApp.',
              'Hay mucho movimiento, pero no siempre avance en lo que de verdad mueve el negocio.',
              'Cierras el día agotado, sin tener del todo claro qué resolviste.',
            ].map((item, i) => (
              <motion.li key={i} variants={fadeUp(i * 0.07)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-start gap-4">
                <div className="mt-3 w-2 h-2 rounded-full flex-shrink-0" style={{ background: ORANGE }} />
                <span className="text-xl md:text-2xl font-light leading-snug" style={{ color: L.mid }}>{item}</span>
              </motion.li>
            ))}
          </ul>

          <FadeUp delay={0.35}>
            <p className="text-base font-semibold" style={{ color: L.hi }}>
              Si reconociste varias, no es falta de esfuerzo. Es falta de estructura.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════ 02 COMPARATIVA — DARK ════════════════════ */}
      <section style={{ background: D.bg, color: D.hi }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <SectionTag n="02" label="Ocupado vs. productivo" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-12" style={{ color: D.hi }}>
              La diferencia no es trabajar más.{' '}
              <span style={{ color: D.mid }}>Es decidir mejor.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${D.border}` }}>
              <div className="grid grid-cols-2">
                <div className="px-5 py-3.5 text-xs font-bold tracking-widest uppercase" style={{ background: 'rgba(255,255,255,0.05)', color: D.muted }}>Ocupado</div>
                <div className="px-5 py-3.5 text-xs font-bold tracking-widest uppercase border-l" style={{ background: 'rgba(255,255,255,0.05)', color: ORANGE, borderColor: D.border }}>Productivo</div>
              </div>
              {[
                ['Reacciona a lo que llega',  'Diseña su día'],
                ['Responde a todo',           'Prioriza lo que importa'],
                ['Se mueve mucho',            'Avanza en lo importante'],
                ['Persigue cada lead',        'Filtra por criterio'],
                ['Termina cansado',           'Termina con progreso'],
              ].map(([left, right], i) => (
                <motion.div key={i} variants={fadeUp(0.1 + i * 0.06)} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="grid grid-cols-2" style={{ borderTop: `1px solid ${D.border}` }}>
                  <div className="px-5 py-4 text-sm" style={{ color: D.muted }}>{left}</div>
                  <div className="px-5 py-4 text-sm border-l" style={{ color: D.hi, borderColor: D.border }}>{right}</div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.45}>
            <p className="mt-8 text-base italic" style={{ color: D.muted }}>
              Estar ocupado se siente como avanzar. Pocas veces lo es.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════ 03 AUDITORÍA — LIGHT ════════════════════ */}
      <section style={{ background: L.bg, color: L.hi }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <SectionTag n="03" label="Auditoría rápida" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: L.hi }}>
              ¿Qué tan estructurada está tu operación comercial?
            </h2>
            <p className="text-base mb-10" style={{ color: L.muted }}>
              Seis preguntas, dos minutos. Marca solo las que puedes responder con un sí claro y honesto.
            </p>
          </FadeUp>

          <div className="space-y-3 mb-8">
            {AUDIT_QUESTIONS.map((q, i) => (
              <motion.button key={i} variants={fadeUp(i * 0.07)} initial="hidden" whileInView="show" viewport={{ once: true }}
                onClick={() => setChecked(p => p.map((v, idx) => idx === i ? !v : v))}
                whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.997 }}
                className="w-full flex items-start gap-4 p-4 rounded-xl text-left transition-colors duration-200"
                style={{
                  background: checked[i] ? `${ORANGE}10` : 'rgba(22,33,60,0.04)',
                  border: `1px solid ${checked[i] ? `${ORANGE}50` : L.border}`,
                }}>
                <div className="mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ background: checked[i] ? ORANGE : 'transparent', border: checked[i] ? 'none' : `1.5px solid ${L.muted}60` }}>
                  {checked[i] && <Check className="w-3 h-3 text-black" strokeWidth={3} />}
                </div>
                <span className="text-sm leading-relaxed" style={{ color: checked[i] ? L.hi : L.mid }}>{q}</span>
              </motion.button>
            ))}
          </div>

          <FadeUp delay={0.1}>
            <div className="rounded-xl p-7" style={{ background: D.bg, border: `1px solid rgba(255,255,255,0.06)` }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-medium" style={{ color: D.mid }}>Tu resultado</span>
                <span className="text-5xl font-bold font-[var(--font-space-grotesk)]" style={{ color: ORANGE }}>{score}/{AUDIT_QUESTIONS.length}</span>
              </div>
              <div className="w-full rounded-full h-1.5 mb-6" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <motion.div className="h-1.5 rounded-full" style={{ background: ORANGE }}
                  initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
              </div>
              <p className="text-xl font-semibold mb-2" style={{ color: D.hi }}>{scoreLabel}</p>
              <p className="text-base leading-relaxed" style={{ color: D.muted }}>{scoreDesc}</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════ 04 QUICK WINS — DARK ════════════════════ */}
      <section style={{ background: D.bg, color: D.hi }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <SectionTag n="04" label="Quick wins para esta semana" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-12" style={{ color: D.hi }}>
              Siete acciones que sí puedes aplicar ya.
            </h2>
          </FadeUp>

          <ol className="space-y-6">
            {QUICK_WINS.map((item, i) => (
              <motion.li key={i} variants={fadeUp(i * 0.07)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex gap-5">
                <span className="font-mono text-xs font-bold mt-1 flex-shrink-0" style={{ color: ORANGE }}>{String(i + 1).padStart(2, '0')}</span>
                <p className="text-base leading-relaxed" style={{ color: D.mid }}>{item}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════════════════════ 05 MÉTRICAS — LIGHT ════════════════════ */}
      <section style={{ background: L.bg, color: L.hi }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <SectionTag n="05" label="Qué sí debes medir" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: L.hi }}>
              Lo que no se mide,{' '}
              <span style={{ color: L.muted }}>se administra por intuición.</span>
            </h2>
            <p className="text-base mb-10" style={{ color: L.muted }}>
              No necesitas un tablero complejo. Necesitas mirar pocos números, pero los correctos, de forma constante.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {METRICS.map(({ num, label }, i) => (
              <motion.div key={num} variants={fadeUp(i * 0.06)} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: L.card, border: `1px solid ${L.border}` }}>
                <span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: ORANGE }}>{num}</span>
                <span className="text-sm" style={{ color: L.hi }}>{label}</span>
              </motion.div>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div className="pl-5 space-y-1" style={{ borderLeft: `2px solid ${ORANGE}` }}>
              <p className="text-sm font-semibold" style={{ color: L.hi }}>Si no mides, administras intuición.</p>
              <p className="text-sm" style={{ color: L.muted }}>Si no diseñas, dependes del caos.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════ 06 SISTEMA — LIGHT ════════════════════ */}
      <section style={{ background: L.bg, color: L.hi, borderTop: `1px solid ${L.border}` }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <SectionTag n="06" label="Cuando la claridad necesita sistema" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-6" style={{ color: L.hi }}>
              Llega un punto en que el orden ya no cabe en la cabeza.
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: L.muted }}>
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
              <motion.li key={i} variants={fadeUp(i * 0.07)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-start gap-3 list-none">
                <div className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: ORANGE }} />
                <span className="text-base leading-relaxed" style={{ color: L.mid }}>{item}</span>
              </motion.li>
            ))}
          </ul>

          <FadeUp delay={0.4}>
            <div className="rounded-xl p-5" style={{ background: `${ORANGE}08`, border: `1px solid ${ORANGE}25` }}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: ORANGE }}>Para ser justos</p>
              <p className="text-sm leading-relaxed" style={{ color: L.mid }}>
                Ninguna herramienta sustituye el liderazgo, el enfoque ni la estrategia. Un buen sistema potencia una operación que ya decidió ordenarse. No la ordena por ti.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════ 07 AMII — DARK ════════════════════ */}
      <section style={{ background: D.bg, color: D.hi }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <SectionTag n="07" label="Siguiente paso con ventaja AMII" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-4xl leading-tight mb-4" style={{ color: D.hi }}>
              Si ya decidiste ordenarte,{' '}
              <span style={{ color: ORANGE }}>Lezgo Suite lleva ese orden a sistema.</span>
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: D.muted }}>
              No para resolver tu liderazgo, sino para dar estructura a una operación que ya quiere profesionalizarse.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {FEATURES.map((f, i) => (
              <motion.div key={i} variants={fadeUp(i * 0.06)} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: D.card, border: `1px solid ${D.border}` }}>
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ORANGE }} />
                <span className="text-sm" style={{ color: D.hi }}>{f}</span>
              </motion.div>
            ))}
          </div>

          <FadeUp delay={0.4}>
            <div className="rounded-xl p-8" style={{ background: `${ORANGE}10`, border: `1px solid ${ORANGE}30` }}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: ORANGE }}>Ventaja exclusiva AMII</p>
              <p className="text-2xl md:text-3xl font-semibold leading-snug mb-3" style={{ color: D.hi }}>20% de descuento mientras tu membresía esté activa.</p>
              <p className="text-base" style={{ color: D.mid }}>Cupo limitado por capacidad de acompañamiento.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════ 08 CTA — LIGHT ════════════════════ */}
      <section style={{ background: L.bg, color: L.hi }}>
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <SectionTag n="08" label="El siguiente paso" />

          <FadeUp delay={0.05}>
            <h2 className="font-[var(--font-space-grotesk)] font-light text-3xl md:text-5xl leading-tight mb-6" style={{ color: L.hi }}>
              No necesitas hacer más.{' '}
              <span style={{ color: L.muted }}>Necesitas hacerlo con claridad.</span>
            </h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: L.muted }}>
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
              style={{ background: ORANGE, color: '#fff' }}
            >
              Ordenar mi operación con Lezgo Suite
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <p className="mt-5 text-sm" style={{ color: L.muted }}>
              Aplica el beneficio AMII: 20% de descuento mientras tu membresía esté activa.
            </p>
          </FadeUp>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.4 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: L.hi }}>LezgoSuite</span>
            <span style={{ color: L.muted }}>·</span>
            <span className="text-xs" style={{ color: L.muted }}>app.lezgosuite.com</span>
            <ExternalLink className="w-3 h-3" style={{ color: L.muted }} />
          </motion.div>
        </div>
      </section>

    </div>
  )
}
