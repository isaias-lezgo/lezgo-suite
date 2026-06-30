'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink, Check, MessageCircle, ChevronDown } from 'lucide-react'
import LiteYoutube from '@/components/custom/LiteYoutube'

// ── Palette ─────────────────────────────────────────────────────────────────
const D = {
  bg: '#16213C',
  hi: '#F5F5F2',
  mid: '#9CA2B6',
  muted: '#6A7390',
  border: 'rgba(255,255,255,0.08)',
  card: 'rgba(255,255,255,0.04)',
}
const ORANGE = '#DF7F1E'

const APP_URL = 'https://app.lezgosuite.com'
const WHATSAPP_URL = 'https://wa.me/5214424547818?text=Hola,%20necesito%20ayuda%20configurando%20mi%20Lezgo%20Suite'

// ── Data: pasos del Launchpad ─────────────────────────────────────────────────
// Para activar un video, pega el ID de YouTube (lo que va después de "watch?v=")
// en `videoId`. Si se deja vacío, el paso muestra "Próximamente".
type Step = {
  n: string
  title: string
  desc: string
  videoId?: string
  tasks: string[]
  link?: string
  linkLabel?: string
}

type Phase = {
  tag: string
  title: string
  subtitle: string
  steps: Step[]
}

const PHASES: Phase[] = [
  {
    tag: 'Fase 1',
    title: 'Fundamentos',
    subtitle: 'Tu primer acceso y los datos base de tu negocio.',
    steps: [
      {
        n: '01',
        title: 'Bienvenida y acceso',
        desc: 'Inicia sesión en Lezgo Suite desde la web y descarga la app móvil para gestionar todo desde tu celular.',
        videoId: '',
        tasks: [
          'Entra a app.lezgosuite.com con el correo y contraseña que te enviamos.',
          'Haz un recorrido general por el menú lateral.',
          'Configura tu contraseña personal y tu foto de perfil.',
        ],
        link: APP_URL,
        linkLabel: 'Abrir Lezgo Suite',
      },
      {
        n: '02',
        title: 'Perfil del negocio',
        desc: 'Carga el logo, los datos de contacto, los horarios y la zona horaria de tu empresa.',
        videoId: '',
        tasks: [
          'Sube el logo y el nombre de tu negocio.',
          'Configura dirección, teléfono y correo de contacto.',
          'Define la zona horaria (Ciudad de México) y tus horarios de atención.',
        ],
      },
    ],
  },
  {
    tag: 'Fase 2',
    title: 'Canales de comunicación',
    subtitle: 'Conecta todos tus canales para recibir y responder desde un solo lugar.',
    steps: [
      {
        n: '03',
        title: 'Conectar WhatsApp',
        desc: 'Vincula tu número de WhatsApp para enviar y recibir mensajes dentro de Lezgo Suite.',
        videoId: '',
        tasks: [
          'Abre Configuración → WhatsApp.',
          'Sigue el asistente para vincular tu número.',
          'Envía un mensaje de prueba para confirmar la conexión.',
        ],
      },
      {
        n: '04',
        title: 'Conectar Facebook & Instagram',
        desc: 'Recibe los mensajes de Messenger y los DM de Instagram directo en tu bandeja.',
        videoId: '',
        tasks: [
          'Conecta tu página de Facebook desde Configuración → Integraciones.',
          'Autoriza Instagram vinculado a esa página.',
          'Verifica que lleguen los mensajes a Conversaciones.',
        ],
      },
      {
        n: '05',
        title: 'Conectar correo',
        desc: 'Configura tu dominio de envío para mandar correos desde tu propia dirección.',
        videoId: '',
        tasks: [
          'Agrega tu dominio en Configuración → Email.',
          'Copia los registros DNS y pégalos en tu proveedor de dominio.',
          'Envía un correo de prueba.',
        ],
      },
      {
        n: '06',
        title: 'Teléfono y SMS',
        desc: 'Activa un número para llamadas y mensajes de texto desde la plataforma.',
        videoId: '',
        tasks: [
          'Solicita o vincula un número en Configuración → Teléfono.',
          'Completa la verificación requerida.',
          'Realiza una llamada y un SMS de prueba.',
        ],
      },
      {
        n: '07',
        title: 'Perfil de Google del negocio',
        desc: 'Conecta tu Perfil de Negocio de Google para responder mensajes y gestionar reseñas.',
        videoId: '',
        tasks: [
          'Vincula tu cuenta de Google desde Integraciones.',
          'Selecciona la ubicación de tu negocio.',
          'Confirma que aparezcan tus reseñas.',
        ],
      },
      {
        n: '08',
        title: 'Bandeja unificada de conversaciones',
        desc: 'Aprende a usar la bandeja donde se centralizan todos tus canales.',
        videoId: '',
        tasks: [
          'Familiarízate con la vista de Conversaciones.',
          'Aprende a filtrar por canal y por estado.',
          'Asigna conversaciones a tu equipo.',
        ],
        link: `${APP_URL}/`,
        linkLabel: 'Ir a Conversaciones',
      },
    ],
  },
  {
    tag: 'Fase 3',
    title: 'Ventas y agenda',
    subtitle: 'Organiza prospectos, citas y tu proceso comercial.',
    steps: [
      {
        n: '09',
        title: 'Calendario y agendas',
        desc: 'Crea tus calendarios de citas y conéctalos con Google Calendar para evitar empalmes.',
        videoId: '',
        tasks: [
          'Crea un calendario y define su disponibilidad.',
          'Conecta tu Google Calendar.',
          'Comparte tu link de agendamiento.',
        ],
      },
      {
        n: '10',
        title: 'Contactos',
        desc: 'Importa tu base de contactos y organízala con etiquetas y campos personalizados.',
        videoId: '',
        tasks: [
          'Importa tus contactos desde un archivo CSV.',
          'Crea etiquetas para segmentar.',
          'Define los campos personalizados que necesites.',
        ],
      },
      {
        n: '11',
        title: 'Pipeline de ventas',
        desc: 'Configura las etapas por las que pasa cada oportunidad, de contacto a cierre.',
        videoId: '',
        tasks: [
          'Crea tu pipeline y nombra sus etapas.',
          'Arrastra una oportunidad de prueba entre etapas.',
          'Define qué significa cada etapa para tu equipo.',
        ],
      },
      {
        n: '12',
        title: 'Formularios, sitios y widget de chat',
        desc: 'Captura leads con formularios y agrega el chat de tu sitio web.',
        videoId: '',
        tasks: [
          'Crea un formulario de captura.',
          'Instala el widget de chat en tu sitio.',
          'Verifica que los leads entren a Contactos.',
        ],
      },
    ],
  },
  {
    tag: 'Fase 4',
    title: 'Automatización y cobros',
    subtitle: 'Pon tu operación en piloto automático y empieza a cobrar.',
    steps: [
      {
        n: '13',
        title: 'Automatizaciones',
        desc: 'Activa los flujos base para responder y dar seguimiento sin esfuerzo manual.',
        videoId: '',
        tasks: [
          'Revisa los workflows que dejamos preconfigurados.',
          'Activa el flujo de respuesta a nuevos leads.',
          'Prueba el flujo con un contacto de ejemplo.',
        ],
      },
      {
        n: '14',
        title: 'Reseñas y reputación',
        desc: 'Solicita reseñas de Google automáticamente y gestiona tu reputación.',
        videoId: '',
        tasks: [
          'Activa la solicitud automática de reseñas.',
          'Personaliza el mensaje de invitación.',
          'Aprende a responder reseñas desde la plataforma.',
        ],
      },
      {
        n: '15',
        title: 'Pagos',
        desc: 'Conecta Stripe o MercadoPago para cobrar y enviar links de pago.',
        videoId: '',
        tasks: [
          'Conecta tu cuenta de Stripe o MercadoPago.',
          'Crea un producto o servicio.',
          'Envía un link de pago de prueba.',
        ],
      },
      {
        n: '16',
        title: 'App móvil Lezgo Suite',
        desc: 'Descarga la app para llevar tu CRM en el bolsillo y no perder ningún mensaje.',
        videoId: '',
        tasks: [
          'Descarga la app Lezgo Suite (iOS / Android).',
          'Inicia sesión con tus mismas credenciales.',
          'Activa las notificaciones push.',
        ],
      },
    ],
  },
]

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
})

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div variants={fadeUp(delay)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className={className}>
      {children}
    </motion.div>
  )
}

// ── Step card (menú desplegable) ───────────────────────────────────────────────
function StepCard({ step }: { step: Step }) {
  const [open, setOpen] = useState(false)

  return (
    <FadeUp className="scroll-mt-24">
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: D.card, border: `1px solid ${open ? `${ORANGE}40` : D.border}`, transition: 'border-color 0.3s' }}
      >
        {/* Cabecera clickeable */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full flex items-center gap-4 p-5 md:p-6 text-left"
        >
          <span
            className="font-mono text-sm font-bold tracking-widest px-2.5 py-1 rounded flex-shrink-0"
            style={{ color: ORANGE, border: `1px solid ${ORANGE}35`, background: `${ORANGE}12` }}
          >
            {step.n}
          </span>
          <h3 className="flex-1 font-[var(--font-space-grotesk)] font-light text-lg md:text-2xl leading-tight" style={{ color: D.hi }}>
            {step.title}
          </h3>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
            <ChevronDown className="w-5 h-5" style={{ color: open ? ORANGE : D.mid }} />
          </motion.span>
        </button>

        {/* Cuerpo desplegable */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 px-5 md:px-6 pb-6 pt-2"
                style={{ borderTop: `1px solid ${D.border}` }}
              >
                {/* Texto */}
                <div className="flex flex-col pt-4">
                  <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: D.mid }}>
                    {step.desc}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {step.tasks.map((t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full"
                          style={{ background: `${ORANGE}18`, border: `1px solid ${ORANGE}40` }}
                        >
                          <Check className="w-3 h-3" style={{ color: ORANGE }} />
                        </span>
                        <span className="text-sm leading-relaxed" style={{ color: D.hi }}>{t}</span>
                      </li>
                    ))}
                  </ul>

                  {step.link && (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold w-fit"
                      style={{ color: ORANGE }}
                    >
                      {step.linkLabel ?? 'Abrir en Lezgo Suite'}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Video */}
                <div className="lg:self-center pt-4 lg:pt-0">
                  <LiteYoutube videoId={step.videoId} title={`${step.n} · ${step.title}`} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function LaunchpadContent() {
  const totalSteps = PHASES.reduce((acc, p) => acc + p.steps.length, 0)

  return (
    <div className="-mt-16" style={{ background: D.bg, color: D.hi }}>
      {/* ════════════════════ HERO ════════════════════ */}
      <section>
        <div className="mx-auto max-w-5xl px-6 pt-28 pb-16 md:pt-36 md:pb-20">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-0.5" style={{ background: ORANGE }} />
            <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: D.mid }}>
              Launchpad · Configuración guiada
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-[var(--font-space-grotesk)] font-light leading-[1.04] mb-6"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 5.5rem)', color: D.hi }}
          >
            Configura tu <span style={{ color: ORANGE }}>Lezgo Suite</span> paso a paso.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl"
            style={{ color: D.mid }}
          >
            Sigue esta guía de {totalSteps} pasos, con videos cortos, para dejar tu cuenta lista y
            funcionando. Avanza a tu ritmo: cada bloque te lleva de la mano.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="#fase-1"
            className="mt-10 inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-base"
            style={{ background: ORANGE, color: '#fff' }}
          >
            Empezar
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      {/* ════════════════════ FASES ════════════════════ */}
      {PHASES.map((phase, pIdx) => (
        <section key={phase.tag} id={`fase-${pIdx + 1}`} className="scroll-mt-20">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <FadeUp className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 rounded uppercase"
                  style={{ color: ORANGE, border: `1px solid ${ORANGE}35`, background: `${ORANGE}12` }}
                >
                  {phase.tag}
                </span>
                <span className="text-xs font-medium tracking-widest uppercase" style={{ color: ORANGE }}>
                  {phase.title}
                </span>
              </div>
              <p className="text-base md:text-lg" style={{ color: D.mid }}>
                {phase.subtitle}
              </p>
            </FadeUp>

            <div className="space-y-6">
              {phase.steps.map((step) => (
                <StepCard key={step.n} step={step} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ════════════════════ SOPORTE ════════════════════ */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <FadeUp>
            <div
              className="rounded-2xl p-8 md:p-12 text-center"
              style={{ background: `${ORANGE}10`, border: `1px solid ${ORANGE}30` }}
            >
              <h2 className="font-[var(--font-space-grotesk)] font-light text-2xl md:text-4xl leading-tight mb-4" style={{ color: D.hi }}>
                ¿Te atoraste en algún paso?
              </h2>
              <p className="text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: D.mid }}>
                Estamos para ayudarte. Escríbenos por WhatsApp y un especialista de Lezgo Suite te
                acompaña hasta dejar todo funcionando.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-base"
                style={{ background: ORANGE, color: '#fff' }}
              >
                <MessageCircle className="w-4 h-4" />
                Hablar con un especialista
              </a>
            </div>
          </FadeUp>

          <div className="mt-16 flex items-center justify-center gap-2 opacity-40">
            <span className="text-sm font-semibold" style={{ color: D.hi }}>Lezgo Suite</span>
            <span style={{ color: D.muted }}>·</span>
            <span className="text-xs" style={{ color: D.muted }}>app.lezgosuite.com</span>
            <ExternalLink className="w-3 h-3" style={{ color: D.muted }} />
          </div>
        </div>
      </section>
    </div>
  )
}
