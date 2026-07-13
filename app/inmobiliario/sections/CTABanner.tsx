'use client'

import { AgendarDemoButton, WhatsAppButton } from "../BotonesInmobiliario"
import { CalendarCheck } from "lucide-react"

type CTABannerProps = {
  variant?: "dark" | "light"
  eyebrow?: string
  title: string
  subtitle?: string
  location: string
  note?: string
}

export default function CTABanner({
  variant = "dark",
  eyebrow,
  title,
  subtitle,
  location,
  note,
}: CTABannerProps) {
  const isDark = variant === "dark"

  return (
    <section className={isDark ? "py-20 sm:py-24" : "py-16 sm:py-20 bg-white/50 border-y border-gray-200"}>
      <div className="container mx-auto px-4">
        <div
          className={`relative max-w-5xl mx-auto rounded-3xl overflow-hidden px-6 py-12 sm:px-14 sm:py-16 text-center ${
            isDark
              ? "bg-gradient-to-br from-[#0d1b2a] to-[#132a44] border border-white/10"
              : "bg-gradient-to-br from-[#F59B1B]/10 to-orange-50 border border-[#F59B1B]/20"
          }`}
        >
          {/* Decorative orange glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-[#F59B1B]/20 blur-3xl"
          />

          <div className="relative">
            {eyebrow && (
              <span
                className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-4 ${
                  isDark ? "text-[#F59B1B]" : "text-[#F59B1B]"
                }`}
              >
                <CalendarCheck className="w-4 h-4" />
                {eyebrow}
              </span>
            )}

            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-heading leading-tight mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h2>

            {subtitle && (
              <p
                className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-9 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AgendarDemoButton location={location} />
              <WhatsAppButton location={location} />
            </div>

            {note && (
              <p className={`mt-6 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
