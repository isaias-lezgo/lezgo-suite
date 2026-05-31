
'use client'
import { useState, useEffect, useMemo, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  BarChart3,
  Zap,
  CheckCircle,
  Star,
  Play,
  Target,
  Workflow,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"

import {
  HeroButtons,
  ExploreFeatureButton,
  PricingButton,
  ContactSpecialistButton,
} from "@/components/custom/BotonesLanding"
import { FaqSection } from "./landing/FAQ"

type OdometerPart = { type: 'digit'; target: number } | { type: 'char'; value: string }

function parseOdometerParts(str: string): OdometerPart[] {
  const result: OdometerPart[] = []
  for (let i = 0; i < str.length; i++) {
    const d = parseInt(str[i], 10)
    if (!isNaN(d)) {
      result.push({ type: 'digit', target: d })
    } else {
      const last = result[result.length - 1]
      if (last?.type === 'char') last.value += str[i]
      else result.push({ type: 'char', value: str[i] })
    }
  }
  return result
}

function OdometerDigitColumn({ target, progress }: { target: number; progress: number }) {
  const rows = useMemo(() => Array.from({ length: target + 1 }, (_, i) => i), [target])
  return (
    <span className="inline-block overflow-hidden" style={{ height: '1em', lineHeight: 1 }}>
      <span
        className="flex flex-col"
        style={{ transform: `translateY(${-(progress * target)}em)`, willChange: 'transform' }}
      >
        {rows.map((d) => (
          <span
            key={d}
            style={{ height: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

function useCountProgress(durationMs: number, trigger: boolean): number {
  const [progress, setProgress] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!trigger) return
    if (prefersReduced) { setProgress(1); return }
    const start = performance.now()
    let raf: number
    const step = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1)
      setProgress(1 - Math.pow(1 - t, 4))
      if (t < 1) raf = requestAnimationFrame(step)
      else setProgress(1)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [trigger, durationMs, prefersReduced])

  return progress
}

function useOdometerProgress(ref: React.RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) { setProgress(1); return }
    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when section top hits 80% of viewport; 1 when it reaches 30%
      const p = (vh * 0.8 - rect.top) / (vh * 0.5)
      setProgress(Math.max(0, Math.min(1, p)))
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [prefersReduced])

  return progress
}

function HeroStatItem({ value, label, trigger }: { value: string; label: string; trigger: boolean }) {
  const parts = useMemo(() => parseOdometerParts(value), [value])
  const heroProgress = useCountProgress(1400, trigger)

  return (
    <motion.div
      className="text-center"
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <div
        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F59B1B] flex justify-center items-center"
        style={{ lineHeight: 1 }}
      >
        {parts.map((part, i) =>
          part.type === 'digit' ? (
            <OdometerDigitColumn key={i} target={part.target} progress={heroProgress} />
          ) : (
            <span key={i}>{part.value}</span>
          )
        )}
      </div>
      <div className="text-xs sm:text-sm text-gray-600 max-w-[120px] mt-1">
        {label}
      </div>
    </motion.div>
  )
}

function ScrollOdometerStat({ value, label, delay, progress }: { value: string; label: string; delay: number; progress: number }) {
  const parts = useMemo(() => parseOdometerParts(value), [value])
  const staggerOffset = delay * 0.15
  const staggeredProgress = Math.max(0, Math.min(1, (progress - staggerOffset) / (1 - staggerOffset || 1)))
  const fadeIn = Math.min(1, staggeredProgress * 8)

  return (
    <motion.div
      className="text-center cursor-default"
      style={{ opacity: fadeIn }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.15 }}
    >
      <dt
        className="text-4xl lg:text-6xl font-extrabold text-[#F59B1B] flex justify-center items-center"
        style={{ lineHeight: 1 }}
      >
        {parts.map((part, i) =>
          part.type === 'digit' ? (
            <OdometerDigitColumn key={i} target={part.target} progress={staggeredProgress} />
          ) : (
            <span key={i}>{part.value}</span>
          )
        )}
      </dt>
      <dd className="mt-3 text-lg font-medium text-gray-800">
        {label}
      </dd>
    </motion.div>
  )
}

export default function HomeContent() {
  const [heroReady, setHeroReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 900)
    return () => clearTimeout(t)
  }, [])

  const statsSectionRef = useRef<HTMLElement>(null)
  const odometerProgress = useOdometerProgress(statsSectionRef)

  return (
    <div className="relative overflow-hidden pt-8">
      {/* Single subtle background glow — no particles */}
      <div className="fixed inset-0 pointer-events-none hidden lg:block">
        <div className="absolute w-[60%] h-[60%] top-[10%] left-[20%] bg-[#F59B1B]/4 blur-3xl rounded-full" />
      </div>

      <div className="relative">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="min-h-[90vh] flex items-center justify-center">
          <div className="container mx-auto whitespace-normal px-4 flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ willChange: "transform, opacity" }}
              className="space-y-6 sm:space-y-8 lg:space-y-10"
            >
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm font-semibold text-[#F59B1B] uppercase tracking-widest">
                  Plataforma Empresarial #1 en Latinoamérica
                </p>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative px-4 md: block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Video Movil */}
                  <div className="aspect-video bg-gradient-to-br lg:hidden from-gray-900 to-gray-800 flex relative rounded-2xl overflow-hidden">
                    <video
                      className="w-full h-full"
                      poster=""
                      muted
                      loop
                      autoPlay
                      playsInline
                      controls
                    >
                      <source src="/VIDEOSUITE.mp4" type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
                </motion.div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading leading-tight sm:text-center md:text-justify">
                  <span className="text-[#F59B1B]">El CRM que</span>
                  <br />
                  <span className="text-gray-900">impulsa</span>
                  <br />
                  <span className="text-gray-900">tu negocio</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl sm:text-center md:text-justify">
                  Lezgo Suite es el CRM todo en uno con IA para empresas mexicanas.
                  Gestiona contactos, automatiza ventas y conecta todos tus canales
                  desde un solo lugar.
                </p>
              </div>
              <HeroButtons />
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6 sm:gap-8 lg:gap-10 pt-6 sm:pt-8 lg:pt-10">
                <HeroStatItem value="+40%" label="Tiempo ahorrado" trigger={heroReady} />
                <div className="hidden sm:block w-px h-7 bg-[#F59B1B]/25 shrink-0" aria-hidden="true" />
                <HeroStatItem value="+60%" label="Cierres de ventas" trigger={heroReady} />
                <div className="hidden sm:block w-px h-7 bg-[#F59B1B]/25 shrink-0" aria-hidden="true" />
                <HeroStatItem value="10+" label="Canales juntos" trigger={heroReady} />
              </div>
            </motion.div>

            {/* Video Compu */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative px-4 hidden lg:block"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex relative rounded-2xl overflow-hidden">
                <video
                  className="w-full h-full"
                  poster=""
                  muted
                  loop
                  autoPlay
                  playsInline
                  controls
                >
                  <source src="/VIDEOSUITE.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Funcionalidades ───────────────────────────────── */}
        <section id="funcionalidades" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
              style={{ willChange: "transform, opacity" }}
            >
              <p className="text-sm font-semibold text-[#F59B1B] uppercase tracking-widest mb-4">
                Funcionalidades Empresariales
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6 max-w-xl">
                <span className="text-[#F59B1B]">Plataforma Integral</span>
                <br />
                <span className="text-gray-900">para Empresas Modernas</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Descubre cómo Lezgo Suite transforma cada aspecto de tu negocio
                con tecnología de vanguardia
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-4">
              {[
                {
                  category: "Gestión de Ventas",
                  features: [
                    "CRM de Contactos",
                    "Pipeline de Oportunidades",
                    "Tareas y Recordatorios",
                  ],
                  icon: <Target className="h-6 w-6" />,
                  delay: 0,
                  link: "/gestion-ventas",
                },
                {
                  category: "Análisis y Reportes",
                  features: [
                    "Reportes de Conversión",
                    "Seguimiento de Embudos",
                    "Analítica de Campañas",
                  ],
                  icon: <BarChart3 className="h-6 w-6" />,
                  delay: 0.05,
                  link: "/analisis-empresarial",
                },
                {
                  category: "Automatización",
                  features: [
                    "Workflows Dinámicos",
                    "Automatización de Correos y Mensajería",
                    "Respuestas Automáticas",
                  ],
                  icon: <Zap className="h-6 w-6" />,
                  delay: 0.1,
                  link: "/automatizacion-ia",
                },
                {
                  category: "Integraciones",
                  features: [
                    "Integración con Calendarios",
                    "Conexión nativa con Redes Sociales",
                    "APIs y Webhooks",
                  ],
                  icon: <Workflow className="h-6 w-6" />,
                  delay: 0.15,
                  link: "/integracion-total",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  viewport={{ once: true }}
                  style={{ willChange: "transform, opacity" }}
                  className="group grid grid-cols-[3rem_1fr] gap-6 p-6 rounded-2xl border border-gray-100 bg-white hover:border-[#F59B1B]/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="text-5xl font-black text-gray-100 group-hover:text-[#F59B1B]/15 transition-colors leading-none select-none pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-[#F59B1B]">{item.icon}</div>
                      <h3 className="text-xl font-bold font-heading text-gray-900 group-hover:text-[#F59B1B] transition-colors">
                        {item.category}
                      </h3>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {item.features.map((feature, fi) => (
                        <li key={fi} className="flex items-center text-gray-600">
                          <CheckCircle className="h-4 w-4 text-[#F59B1B] mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <ExploreFeatureButton href={item.link} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────── */}
        <section ref={statsSectionRef} className="relative py-16 sm:py-20 overflow-hidden">
          <div className="container relative mx-auto px-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
              <ScrollOdometerStat value="50+" label="Clientes Atendidos" delay={0} progress={odometerProgress} />
              <ScrollOdometerStat value="99.9%" label="Tiempo de Servicio Activo" delay={0.1} progress={odometerProgress} />
              <ScrollOdometerStat value="400K+" label="Contactos Procesados" delay={0.2} progress={odometerProgress} />
              <ScrollOdometerStat value="1000+" label="Horas Ahorradas" delay={0.3} progress={odometerProgress} />
            </dl>
          </div>
        </section>

        {/* ── Características ───────────────────────────────── */}
        <section id="caracteristicas" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ willChange: "transform, opacity" }}
              className="mb-12 text-center"
            >
              <p className="text-sm font-semibold text-[#F59B1B] uppercase tracking-widest mb-4">
                Características Destacadas
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                <span className="text-[#F59B1B]">Potencia Empresarial</span>
                <br />
                <span className="text-gray-900">Sin Límites</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Descubre las capacidades que hacen de Lezgo Suite la elección
                preferida de empresas líderes
              </p>
            </motion.div>
            <div className="space-y-12">
              {[
                {
                  title: "Plataforma Inteligente",
                  subtitle: "Campañas que Convierten",
                  description:
                    "Crea flujos de trabajo automáticos que disparan acciones según el comportamiento de tus contactos. Seguimientos por distintos canales como WhatsApp, Instagram, Facebook, etc. sin intervención manual.",
                  features: [
                    "Segmentación IA",
                    "Automatización Multi-canal",
                  ],
                  image: "/ImagenF1.jpeg",
                  reverse: false,
                },
                {
                  title: "Visión completa",
                  subtitle: "Ventas Optimizadas",
                  description:
                    "Gestiona el ciclo completo de ventas con IA predictiva. Pipeline inteligente, scoring automático de leads y predicciones ML para cerrar más deals.",
                  features: [
                    "Pipeline Inteligente",
                    "Lead Scoring IA",
                    "360° Cliente",
                  ],
                  image: "/ImagenF2.jpeg",
                  reverse: true,
                },
                {
                  title: "IA en tus diferentes canales de contacto",
                  subtitle: "Comunicación Inteligente",
                  description:
                    "Integra IA conversacional en todos tus canales de comunicación. Respuestas automáticas inteligentes, chatbots avanzados y atención 24/7 en WhatsApp, Instagram, TikTok y más.",
                  features: [
                    "WhatsApp Business",
                    "Instagram Direct",
                    "Chatbots IA",
                  ],
                  image: "/ImagenF3.jpeg",
                  reverse: false,
                },
                {
                  title: "Integraciones Empresariales",
                  subtitle: "Ecosistema Conectado",
                  description:
                    "Conecta todas tus herramientas empresariales en un ecosistema unificado. APIs robustas, conectores nativos y sincronización en tiempo real con más de 500 aplicaciones.",
                  features: [
                    "500+ Integraciones",
                    "APIs Empresariales",
                    "Sync Tiempo Real",
                    "Conectores Nativos",
                  ],
                  image: "/ImagenF4.jpeg",
                  reverse: true,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{ willChange: "transform, opacity" }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${
                    item.reverse ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  <div
                    className={`space-y-8 ${
                      item.reverse ? "lg:col-start-2" : ""
                    }`}
                  >
                    <div className="space-y-4">
                      <p className="text-sm font-semibold text-[#F59B1B] uppercase tracking-widest">
                        {item.subtitle}
                      </p>
                      <h3 className="text-3xl lg:text-4xl font-bold font-heading text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {item.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.2 + featureIndex * 0.1,
                          }}
                          viewport={{ once: true }}
                          style={{ willChange: "transform, opacity" }}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <CheckCircle className="h-5 w-5 text-[#F59B1B] flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-900">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    style={{ willChange: "transform, opacity" }}
                    className={`relative ${
                      item.reverse ? "lg:col-start-1" : ""
                    }`}
                  >
                    <div className="relative rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={500}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      style={{ willChange: "transform" }}
                      transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="absolute -top-4 -right-4 w-8 h-8 bg-[#F59B1B] rounded-full opacity-20"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────────────── */}
        <section id="precios" className="py-24 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
              style={{ willChange: "transform, opacity" }}
            >
              <p className="text-sm font-semibold text-[#F59B1B] uppercase tracking-widest mb-4">
                Planes Empresariales
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                <span className="text-[#F59B1B]">Inversión Inteligente</span>
                <br />
                <span className="text-gray-900">para tu Crecimiento</span>
              </h2>
              <div className="pb-8 flex justify-center">
                <Image
                  src="/tablafeatures.png"
                  alt="Tabla de Features"
                  width={800}
                  height={1000}
                />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Elige el plan que se adapte a las necesidades de tu empresa
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Lezgo Growth",
                  price: "$3,527",
                  period: "/mes",
                  description: "Perfecto para equipos pequeños",
                  features: [
                    "ACCESO A TODAS LAS FUNCIONALIDADES",
                    "Equipo de 3 usuarios",
                    "1000 contactos",
                  ],
                  popular: false,
                  color: "border-gray-200",
                  link: "https://app.lezgosuite.com/payment-link/698fa8069577be2fe0b6c9a4",
                },
                {
                  name: "Lezgo Pro",
                  price: "$5,397",
                  period: "/mes",
                  description: "Ideal para empresas en crecimiento",
                  features: [
                    "ACCESO A TODAS LAS FUNCIONALIDADES",
                    "Equipo de 10 usuarios",
                    "15,000 contactos",
                  ],
                  link: "https://app.lezgosuite.com/payment-link/69deb4ce557558e89e51fe1d",
                  popular: true,
                  color: "border-[#F59B1B]",
                },
                {
                  name: "Lezgo Elite",
                  price: "$10,567",
                  period: "/mes",
                  description: "Para grandes organizaciones",
                  features: [
                    "ACCESO A TODAS LAS FUNCIONALIDADES",
                    "Usuarios ilímitados",
                    "Contactos ilímitados",
                  ],
                  link: "https://app.lezgosuite.com/payment-link/69deb5fb80425dc02fbc82e1",
                  popular: false,
                  color: "border-gray-200",
                  note: "Limitado a 20 conexiones por WhatsApp QR",
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{ willChange: "transform, opacity" }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute z-20 -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="inline-block bg-[#F59B1B] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                        Más Popular
                      </span>
                    </div>
                  )}
                  <Card
                    className={`h-full bg-white border-2 ${plan.color} ${
                      plan.popular ? "shadow-2xl scale-105" : "shadow-lg"
                    } hover:shadow-2xl transition-all duration-300`}
                  >
                    <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold font-heading mb-2 text-gray-900">
                          {plan.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{plan.description}</p>
                        <div className="mb-6">
                          <span className="text-4xl font-bold text-[#F59B1B]">
                            {plan.price}
                          </span>
                          <span className="text-gray-600">{plan.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-[#F59B1B] mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {plan.note && (
                        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-xs text-amber-800 text-center font-medium">
                            {plan.note}
                          </p>
                        </div>
                      )}
                      <PricingButton plan={plan} />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-6 mb-4">
              <p className="text-sm text-gray-600 italic">
                * Precios en pesos mexicanos (MXN) + IVA
              </p>
            </div>
            <div className="mt-8 p-8">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Todo plan incluye:
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span>Sesión de onboarding personalizada</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span>Acceso a comunidad con video tutoriales</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span>Soporte a través de WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center py-12">
              <div className="w-24 h-24 bg-[#F59B1B] rounded-full mx-auto flex items-center justify-center shadow-lg">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 font-medium text-4xl mb-2">
                ¿Tienes dudas?
              </p>
              <ContactSpecialistButton />
            </div>
            <div className="h-1 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-600 rounded-full my-8" />
          </div>
        </section>

        {/* ── Testimonios ───────────────────────────────────── */}
        <section id="testimonios" className="relative overflow-hidden py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
              style={{ willChange: "transform, opacity" }}
            >
              <p className="text-sm font-semibold text-[#F59B1B] uppercase tracking-widest mb-4">
                Testimonios Empresariales
              </p>
              <h2 className="text-4xl lg:text-6xl font-bold font-heading mb-8 leading-tight max-w-xl">
                <span className="text-[#F59B1B]">Líderes Confían</span>
                <br />
                <span className="text-gray-900">en Lezgo Suite</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Empresas líderes han transformado sus operaciones con
                resultados extraordinarios
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative w-full px-4">
                <Image
                  src="/empresas.png"
                  alt="Empresas que confían en Lezgo Suite"
                  width={500}
                  height={700}
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto h-auto mb-8 sm:mb-12 md:mb-16 rounded-xl sm:rounded-2xl transition-all duration-500 transform hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {[
                  {
                    quote:
                      "Lezgo Suite transformó completamente nuestra operación. El ROI fue del 340% en el primer año.",
                    author: "Jerry Medina",
                    position: "Dueño",
                    company: "Soy Jerry Medina",
                    rating: 5,
                    highlight: "340% ROI",
                  },
                  {
                    quote:
                      "Con Lezgo Suite logramos organizar nuestros procesos y escalar más rápido de lo esperado. La eficiencia en el equipo mejoró un 70%.",
                    author: "Evelyn",
                    position: "Directora de Operaciones",
                    company: "Yconia",
                    rating: 5,
                    highlight: "70% más eficiencia",
                  },
                  {
                    quote:
                      "La automatización IA nos permitió escalar 10x sin aumentar el equipo. Increíble plataforma.",
                    author: "Fernanda Villafana",
                    position: "Directora de Operaciones",
                    company: "Tiempo Cero",
                    rating: 5,
                    highlight: "10x Escalabilidad",
                  },
                  {
                    quote:
                      "Implementación perfecta y soporte excepcional. Nuestra productividad aumentó 250% en 6 meses.",
                    author: "Líder de Ventas",
                    position: "VP de Ventas",
                    company: "Cellarium",
                    rating: 5,
                    highlight: "250% Productividad",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    style={{ willChange: "transform, opacity" }}
                    className="group"
                  >
                    <Card className="h-full bg-white border border-gray-100 shadow-md hover:shadow-xl hover:border-[#F59B1B]/20 transition-all duration-500 rounded-2xl overflow-hidden">
                      <CardContent className="p-8 relative flex flex-col gap-4">
                        <div className="flex justify-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-[#F59B1B] fill-current mx-1"
                            />
                          ))}
                        </div>
                        <div className="text-center">
                          <span className="inline-block bg-[#F59B1B]/10 text-[#F59B1B] px-4 py-1.5 rounded-full text-sm font-bold">
                            {testimonial.highlight}
                          </span>
                        </div>
                        <blockquote className="text-gray-700 italic leading-relaxed text-center">
                          {testimonial.quote}
                        </blockquote>
                        <div className="text-center border-t border-gray-100 pt-4 mt-auto">
                          <div className="font-bold text-gray-900 text-lg mb-1">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            {testimonial.position}
                          </div>
                          <div className="text-sm font-semibold text-[#F59B1B]">
                            {testimonial.company}
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[#F59B1B]/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700" />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#F59B1B]/5 rounded-full -translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F59B1B]/5 rounded-full translate-x-48 translate-y-48" />
        </section>

        <FaqSection />
      </div>
    </div>
  )
}
