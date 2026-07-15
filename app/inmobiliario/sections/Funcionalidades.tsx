'use client'

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  Bot,
  Bell,
  MessageSquare,
  BarChart3,
  Contact,
  Check,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react"

type Feature = {
  icon: LucideIcon
  title: string
  body: string
  visual: React.ReactNode
}

/* ----------------------------- Mini-visuals ----------------------------- */

function PipelineVisual() {
  const cols = [
    { label: "Nuevo", bars: 3, tint: "bg-gray-300" },
    { label: "Cita", bars: 2, tint: "bg-[#F59B1B]/50" },
    { label: "Cierre", bars: 1, tint: "bg-[#F59B1B]" },
  ]
  return (
    <div className="flex gap-2 h-full items-end">
      {cols.map((c) => (
        <div key={c.label} className="flex-1 flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold text-gray-400 mb-0.5">{c.label}</span>
          {Array.from({ length: c.bars }).map((_, i) => (
            <div key={i} className="rounded-md bg-white shadow-sm border border-gray-100 p-1.5 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${c.tint}`} />
              <span className="h-1 flex-1 rounded-full bg-gray-100" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function BotVisual() {
  return (
    <div className="flex flex-col justify-center gap-2 h-full">
      <div className="self-start max-w-[70%] rounded-2xl rounded-bl-sm bg-gray-100 px-3 py-1.5">
        <span className="block h-1.5 w-16 rounded-full bg-gray-300" />
      </div>
      <div className="self-end max-w-[75%] rounded-2xl rounded-br-sm bg-[#F59B1B] px-3 py-1.5">
        <span className="block h-1.5 w-20 rounded-full bg-white/70" />
        <span className="mt-1 block h-1.5 w-12 rounded-full bg-white/70" />
      </div>
      <div className="self-start rounded-2xl rounded-bl-sm bg-gray-100 px-3 py-2 flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
      </div>
    </div>
  )
}

function SeguimientoVisual() {
  const steps = ["Día 1 · Bienvenida", "Día 3 · Recordatorio", "Día 7 · Alerta asesor"]
  return (
    <div className="flex flex-col justify-center gap-2.5 h-full">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2.5">
          <span
            className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
              i < 2 ? "bg-[#F59B1B]" : "bg-[#F59B1B]/15"
            }`}
          >
            {i < 2 ? (
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            ) : (
              <Bell className="w-2.5 h-2.5 text-[#F59B1B]" />
            )}
          </span>
          <div className="flex-1 rounded-md bg-white shadow-sm border border-gray-100 px-2.5 py-1.5">
            <span className="text-[10px] font-medium text-gray-500">{s}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function MulticanalVisual() {
  const channels = [
    { label: "WhatsApp", color: "#25D366", d: "M12.04 2a9.9 9.9 0 00-8.4 15.16L2 22l4.95-1.3A9.9 9.9 0 1012.04 2zm0 1.8a8.1 8.1 0 11-4.2 15.03l-.3-.18-2.94.77.78-2.87-.2-.3A8.1 8.1 0 0112.04 3.8zm4.62 10.2c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.13-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.12-.15.16-.25.24-.42.09-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.23.25-.86.85-.86 2.07 0 1.22.88 2.4 1 2.56.13.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.4.52.6.19 1.14.16 1.56.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" },
    { label: "Instagram", color: "#E1306C", d: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-10.16a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" },
    { label: "Facebook", color: "#1877F2", d: "M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" },
    { label: "Correo", color: "#F59B1B", d: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v.4l8 5 8-5V6H4zm16 2.87l-7.47 4.67a1 1 0 01-1.06 0L4 8.87V18h16V8.87z" },
  ]
  return (
    <div className="grid grid-cols-2 gap-2 h-full content-center">
      {channels.map((ch) => (
        <div key={ch.label} className="flex items-center gap-2 rounded-lg bg-white shadow-sm border border-gray-100 px-2.5 py-1.5">
          <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" style={{ fill: ch.color }}>
            <path d={ch.d} />
          </svg>
          <span className="text-[10px] font-semibold text-gray-600 truncate">{ch.label}</span>
        </div>
      ))}
    </div>
  )
}

function DashboardVisual() {
  const bars = [45, 70, 55, 90, 65, 100]
  return (
    <div className="flex items-end gap-2 h-full pt-2">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end h-full">
          <div
            className={`w-full rounded-t-md ${i === bars.length - 1 ? "bg-[#F59B1B]" : "bg-[#F59B1B]/25"}`}
            style={{ height: `${h}%` }}
          />
        </div>
      ))}
    </div>
  )
}

function CarteraVisual() {
  const rows = [
    { initials: "MG", tag: "Caliente", tint: "text-[#F59B1B] bg-[#F59B1B]/10" },
    { initials: "JR", tag: "Tibio", tint: "text-amber-600 bg-amber-100" },
    { initials: "AL", tag: "Nuevo", tint: "text-gray-500 bg-gray-100" },
  ]
  return (
    <div className="flex flex-col justify-center gap-2 h-full">
      {rows.map((r) => (
        <div key={r.initials} className="flex items-center gap-2 rounded-lg bg-white shadow-sm border border-gray-100 px-2 py-1.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F59B1B]/15 text-[10px] font-bold text-[#F59B1B] shrink-0">
            {r.initials}
          </span>
          <span className="h-1.5 flex-1 rounded-full bg-gray-100" />
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${r.tint}`}>{r.tag}</span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------- Features ------------------------------- */

const FEATURES: Feature[] = [
  {
    icon: TrendingUp,
    title: "Pipeline de ventas inteligente",
    body: "Visualiza cada oportunidad por etapa, desde el primer contacto hasta la escritura. Scoring de leads con IA para priorizar a quien está listo para comprar.",
    visual: <PipelineVisual />,
  },
  {
    icon: Bot,
    title: "Bots de IA 24/7",
    body: "Responde al instante en WhatsApp e Instagram aunque sea de madrugada. Califica al prospecto, agenda citas y le pasa al asesor solo lo que vale la pena.",
    visual: <BotVisual />,
  },
  {
    icon: Bell,
    title: "Automatización de seguimiento",
    body: "Nunca más un “se me olvidó darle seguimiento”. Recordatorios automáticos, secuencias de mensajes y alertas cuando un lead lleva demasiado tiempo sin respuesta.",
    visual: <SeguimientoVisual />,
  },
  {
    icon: MessageSquare,
    title: "Multicanal centralizado",
    body: "WhatsApp, Instagram, Facebook y correo — todas las conversaciones de tu inmobiliaria en una sola bandeja, con historial completo por contacto.",
    visual: <MulticanalVisual />,
  },
  {
    icon: BarChart3,
    title: "Dashboard y reportes",
    body: "Mide el desempeño de cada asesor, la conversión por canal y el estado de tu pipeline en tiempo real. Decisiones con datos, no con corazonadas.",
    visual: <DashboardVisual />,
  },
  {
    icon: Contact,
    title: "Gestión de cartera y contactos",
    body: "Base de datos centralizada de todos tus prospectos y clientes. Segmenta, etiqueta y no vuelvas a perder un contacto en “el celular de un asesor”.",
    visual: <CarteraVisual />,
  },
]

// Triple the list so the carousel can loop seamlessly in both directions.
const LOOP = [...FEATURES, ...FEATURES, ...FEATURES]

export default function Funcionalidades() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const copyW = useRef(0) // width of one full copy of the list
  const paused = useRef(false)
  const rafId = useRef<number | null>(null) // in-flight programmatic animation
  const animating = useRef(false) // true only while our rAF drives scrollLeft
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Measure one copy's width and park the scroll in the middle copy.
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined
      const second = el.children[FEATURES.length] as HTMLElement | undefined
      if (first && second) {
        copyW.current = second.offsetLeft - first.offsetLeft
        el.scrollLeft = copyW.current
      }
    }
    const raf = requestAnimationFrame(measure)
    window.addEventListener("resize", measure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", measure)
    }
  }, [])

  // Seamless infinite reset: when drifted out of the middle copy, jump back by
  // exactly one copy. Copies are pixel-identical, so the jump is invisible — but
  // ONLY when the scroller is at rest. Reassigning scrollLeft mid-fling fights
  // the browser's momentum and causes the visible glitch, so we never do it
  // while a scroll is in flight (see handleScroll / animateBy).
  const wrap = () => {
    const el = scrollerRef.current
    const w = copyW.current
    if (!el || !w) return
    if (el.scrollLeft <= w * 0.5) el.scrollLeft += w
    else if (el.scrollLeft >= w * 1.5) el.scrollLeft -= w
  }

  const cancelAnim = () => {
    if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    rafId.current = null
    animating.current = false
  }

  // Drive the scroll ourselves with rAF instead of native `behavior:"smooth"`.
  // Native smooth-scroll fights CSS scroll-snap on iOS Safari (the snap undoes
  // the move, so the arrows appear dead). A per-frame scrollLeft set doesn't.
  const animateBy = (delta: number) => {
    const el = scrollerRef.current
    if (!el) return
    cancelAnim()
    animating.current = true
    const start = el.scrollLeft
    const target = start + delta
    const t0 = performance.now()
    const duration = 450
    const ease = (t: number) => 1 - Math.pow(1 - t, 3) // easeOutCubic
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      el.scrollLeft = start + (target - start) * ease(p)
      if (p < 1) {
        rafId.current = requestAnimationFrame(tick)
      } else {
        rafId.current = null
        animating.current = false
        wrap() // wrap once the animation settles, never during it
      }
    }
    rafId.current = requestAnimationFrame(tick)
  }

  // Free (touch/trackpad) scrolling: wrap only after motion settles, so we never
  // reassign scrollLeft while momentum is still running.
  const handleScroll = () => {
    if (animating.current) return // our own animation wraps itself at the end
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      if (!animating.current) wrap()
    }, 140)
  }

  const step = (dir: 1 | -1) => {
    if (!copyW.current) return
    animateBy(dir * (copyW.current / FEATURES.length))
  }

  // Autoplay — advances one card, pauses on hover/touch.
  useEffect(() => {
    const id = setInterval(() => {
      if (paused.current || animating.current) return
      if (!copyW.current) return
      animateBy(copyW.current / FEATURES.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  // Stop any in-flight animation when the component unmounts.
  useEffect(() => cancelAnim, [])

  return (
    <section id="funcionalidades" className="py-24 relative bg-white/50 border-y border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#F59B1B] mb-3">
            Funcionalidades
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900 max-w-2xl">
            Todo lo que tu inmobiliaria necesita, en una sola plataforma.
          </h2>
        </div>
      </div>

      {/* Horizontal carousel — only horizontal scroll, infinite loop */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onPointerDown={() => {
          cancelAnim() // hand control to the user's finger, don't fight it
          paused.current = true
        }}
        onPointerUp={() => (paused.current = false)}
        onPointerCancel={() => (paused.current = false)}
        className="flex gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x px-4 sm:px-[max(1rem,calc((100vw-72rem)/2))] pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {LOOP.map((f, i) => (
          <Card
            key={`${f.title}-${i}`}
            className="snap-start shrink-0 w-[300px] sm:w-[330px] bg-white border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <CardContent className="p-6 flex flex-col h-full">
              {/* Visual header */}
              <div className="relative rounded-xl bg-gradient-to-br from-gray-50 to-[#F59B1B]/5 border border-gray-100 h-32 p-3 mb-5 overflow-hidden">
                {f.visual}
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#F59B1B]/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-[#F59B1B]" />
              </div>
              <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-[14px]">{f.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Controls — anchored to the container, not floating in whitespace */}
      <div className="container mx-auto px-4 mt-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <span className="text-xs text-gray-400 sm:hidden">Desliza para ver más →</span>
          <span className="hidden sm:block text-sm text-gray-400">
            Explora todas las funcionalidades
          </span>
          <div className="flex gap-2 ml-auto">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Anterior"
              className="w-11 h-11 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:border-[#F59B1B] hover:text-[#F59B1B] hover:shadow-md transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Siguiente"
              className="w-11 h-11 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:border-[#F59B1B] hover:text-[#F59B1B] hover:shadow-md transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
