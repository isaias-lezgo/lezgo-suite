'use client'

import { motion } from "framer-motion"
import { Bot, Check, CheckCheck, QrCode, Zap } from "lucide-react"
import { AgendarDemoButton } from "../BotonesInmobiliario"

/* Vista previa 1 — el snapshot inmobiliario que ya viene armado */
function SnapshotPreview() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col justify-center gap-3">
      <div className="grid grid-cols-2 gap-2.5">
        {["Ventas", "Rentas"].map((col) => (
          <div key={col} className="rounded-lg bg-gray-50 p-2.5">
            <div className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500">
              {col}
            </div>
            <div className="space-y-1.5">
              {[0, 1, 2].map((row) => (
                <div
                  key={row}
                  className="flex items-center gap-1.5 rounded-md bg-white p-1.5 ring-1 ring-gray-200"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F59B1B]" />
                  <span
                    className="h-1.5 rounded-full bg-gray-200"
                    style={{ width: `${70 - row * 14}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {[
          { icon: Bot, label: "Bots de IA" },
          { icon: Zap, label: "Automatizaciones" },
        ].map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 rounded-full bg-[#F59B1B]/10 px-2 py-1 text-[11px] font-medium text-[#B36F0B]"
          >
            <Icon className="h-3 w-3" />
            {label}
            <Check className="h-3 w-3" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* Vista previa 2 — cada asesor conecta su WhatsApp */
const ASESORES = [
  { initials: "AR", name: "Ana Ramírez", connected: true },
  { initials: "LM", name: "Luis Mendoza", connected: true },
  { initials: "SC", name: "Sofía Cano", connected: false },
]

function WhatsAppPreview() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col justify-center gap-2">
      {ASESORES.map((a) => (
        <div
          key={a.initials}
          className="flex items-center gap-2.5 rounded-lg bg-gray-50 px-2.5 py-2"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-gray-600 ring-1 ring-gray-200">
            {a.initials}
          </span>
          <span className="flex-1 truncate text-[12px] font-medium text-gray-700">
            {a.name}
          </span>
          {a.connected ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              <CheckCheck className="h-3 w-3" />
              Conectado
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-[#F59B1B] px-2 py-0.5 text-[10px] font-semibold text-[#B36F0B]">
              <QrCode className="h-3 w-3" />
              Escanear QR
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

/* Vista previa 3 — un trato avanzando hasta el cierre */
const ETAPAS = ["Contacto", "Visita", "Oferta", "Cerrado"]

function CierrePreview() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col justify-center gap-4">
      <div className="rounded-lg bg-gray-50 p-3">
        <div className="text-[12px] font-semibold text-gray-800">
          Depto. en Juriquilla
        </div>
        <div className="mt-0.5 text-[11px] text-gray-500">$4,200,000 · Ana Ramírez</div>
      </div>

      <div className="flex items-center gap-1">
        {ETAPAS.map((etapa, i) => {
          const done = i === ETAPAS.length - 1
          return (
            <div key={etapa} className="flex flex-1 flex-col items-center gap-1.5">
              <span
                className={`h-1.5 w-full rounded-full ${
                  done ? "bg-[#F59B1B]" : "bg-[#F59B1B]/25"
                }`}
              />
              <span
                className={`text-[10px] ${
                  done ? "font-bold text-[#B36F0B]" : "text-gray-400"
                }`}
              >
                {etapa}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const PASOS: { title: string; body: string; preview: () => React.JSX.Element }[] = [
  {
    title: "Recibes tu cuenta ya armada",
    body: "Pipelines de Ventas y Rentas, automatizaciones y bots de IA preconfigurados. Lo dejamos listo por ti.",
    preview: SnapshotPreview,
  },
  {
    title: "Conecta a tu equipo",
    body: "En el onboarding conectas el WhatsApp de cada asesor y cargas tu base de datos, con nosotros guiándote.",
    preview: WhatsAppPreview,
  },
  {
    title: "Tu equipo empieza a cerrar",
    body: "Todo centralizado y con soporte por WhatsApp, tu inmobiliaria opera desde los primeros días.",
    preview: CierrePreview,
  },
]

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900">
            Todo listo para que arranques rápido.
          </h2>
        </div>

        <ol className="grid md:grid-cols-3 gap-8 md:gap-6 max-w-6xl mx-auto">
          {PASOS.map((paso, i) => {
            const Preview = paso.preview
            return (
              <motion.li
                key={paso.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="h-52 rounded-2xl bg-white p-4 ring-1 ring-gray-200 shadow-sm">
                  <Preview />
                </div>

                <div className="relative mt-6 flex items-center">
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F59B1B] font-heading text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  {i < PASOS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden md:block absolute left-11 -right-6 top-1/2 border-t border-dashed border-gray-300"
                    />
                  )}
                </div>

                <h3 className="mt-4 text-lg font-bold font-heading text-gray-900">
                  {paso.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-gray-600">
                  {paso.body}
                </p>
              </motion.li>
            )
          })}
        </ol>

        <div className="mt-12 flex justify-center">
          <AgendarDemoButton location="como_funciona" compact>
            Agendar demo gratis
          </AgendarDemoButton>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-gray-500">
          ¿Quieres ir aún más rápido? Existen opciones de acompañamiento (Servicio Tecnico dedicado y/o
          Implementación) que puedes contratar por aparte. Estos se contratan en tu sesión de ventas.
        </p>
      </div>
    </section>
  )
}
