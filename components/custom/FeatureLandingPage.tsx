"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { track } from "@vercel/analytics"

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const DEMO_URL = "https://app.lezgosuite.com/widget/bookings/conocelezgosuite"

export type FeatureStat = { value: string; label: string }

export type FeatureListItem = {
  icon: LucideIcon
  title: string
  description: string
  points: string[]
}

export type FeatureHighlight = {
  title: string
  description: string
  points: string[]
}

export type FeatureCapability = {
  icon: LucideIcon
  title: string
  description: string
}

export type IntegrationLogo = {
  name: string
  logo: string
  category: string
}

export type TagCategory = {
  icon: LucideIcon
  title: string
  description: string
  tags: string[]
}

export interface FeatureLandingConfig {
  pageName: string
  kicker: string
  kickerIcon: LucideIcon
  title: string
  titleAccent: string
  subtitle: string
  stats: FeatureStat[]
  highlights?: FeatureHighlight[]
  highlightsHeading?: string
  highlightsSubheading?: string
  capabilities?: FeatureCapability[]
  capabilitiesHeading?: string
  capabilitiesSubheading?: string
  integrationLogos?: IntegrationLogo[]
  integrationLogosHeading?: string
  integrationLogosSubheading?: string
  tagCategories?: TagCategory[]
  tagCategoriesHeading?: string
  tagCategoriesSubheading?: string
  features: FeatureListItem[]
  featuresHeading?: string
  featuresSubheading?: string
}

function trackCta(eventName: string, href: string) {
  track(eventName, { href })
  if (typeof window !== "undefined" && typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === "function") {
    ;(window as unknown as { fbq: (...args: unknown[]) => void }).fbq("trackCustom", eventName, { href })
  }
}

const fadeUp = (reduced: boolean, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay, ease: EASE_OUT },
      }

const fadeInView = (reduced: boolean, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.45, delay, ease: EASE_OUT },
      }

function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="max-w-2xl mb-10 lg:mb-12">
      {kicker ? (
        <p className="text-sm font-semibold uppercase tracking-widest text-[#F59B1B] mb-3">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900 mb-3">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-gray-600 leading-relaxed">{subtitle}</p>
      ) : null}
    </div>
  )
}

export default function FeatureLandingPage({ config }: { config: FeatureLandingConfig }) {
  const reducedMotion = useReducedMotion()
  const KickerIcon = config.kickerIcon
  const demoEvent = `CTA Especialista - ${config.pageName}`

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <div className="absolute w-[45%] h-[40%] top-[5%] right-[-8%] rounded-full blur-3xl bg-[#F59B1B]/5" />
      </div>

      <section className="relative py-14 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.header {...fadeUp(!!reducedMotion)} className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#F59B1B] mb-5">
              <KickerIcon className="w-4 h-4" aria-hidden="true" />
              {config.kicker}
            </p>
            <h1 className="text-4xl lg:text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold font-heading leading-[1.1] text-gray-900 mb-5">
              {config.title}{" "}
              <span className="text-[#F59B1B]">{config.titleAccent}</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-8">
              {config.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#F59B1B] text-white hover:bg-[#e08d18] font-semibold"
              >
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCta(demoEvent, DEMO_URL)}
                >
                  Hablar con un especialista
                </a>
              </Button>
            </div>
          </motion.header>

          <motion.div
            {...fadeUp(!!reducedMotion, 0.1)}
            className="mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-gray-200 border-y border-gray-200 py-8"
          >
            {config.stats.map((stat) => (
              <div key={stat.label} className="text-center lg:px-6 first:lg:pl-0 last:lg:pr-0">
                <p className="text-2xl lg:text-3xl font-bold text-[#F59B1B] tabular-nums">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {config.highlights && config.highlights.length > 0 ? (
        <section className="relative py-14 lg:py-16 bg-slate-50/80 border-y border-gray-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeader
              title={config.highlightsHeading ?? "Áreas que cubrimos"}
              subtitle={config.highlightsSubheading}
            />
            <div className="grid md:grid-cols-2 gap-6">
              {config.highlights.map((item, index) => (
                <motion.article
                  key={item.title}
                  {...fadeInView(!!reducedMotion, index * 0.05)}
                  className="rounded-xl border border-gray-200 bg-white p-6 lg:p-8 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-5 text-sm leading-relaxed">{item.description}</p>
                  <ul className="space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#F59B1B] shrink-0 mt-0.5" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {config.capabilities && config.capabilities.length > 0 ? (
        <section className="relative py-14 lg:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeader
              title={config.capabilitiesHeading ?? "Capacidades de IA"}
              subtitle={config.capabilitiesSubheading}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {config.capabilities.map((cap, index) => {
                const Icon = cap.icon
                return (
                  <motion.div
                    key={cap.title}
                    {...fadeInView(!!reducedMotion, index * 0.04)}
                    className="rounded-lg border border-gray-200 bg-white p-5"
                  >
                    <Icon className="w-5 h-5 text-[#F59B1B] mb-3" aria-hidden="true" />
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{cap.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{cap.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      {config.integrationLogos && config.integrationLogos.length > 0 ? (
        <section className="relative py-14 lg:py-16 bg-slate-50/80 border-y border-gray-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeader
              title={config.integrationLogosHeading ?? "Integraciones populares"}
              subtitle={config.integrationLogosSubheading}
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {config.integrationLogos.map((item, index) => (
                <motion.div
                  key={item.name}
                  {...fadeInView(!!reducedMotion, index * 0.03)}
                  className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4 text-center"
                >
                  <div className="w-10 h-10 relative mb-2">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <p className="text-xs font-semibold text-gray-900">{item.name}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{item.category}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {config.tagCategories && config.tagCategories.length > 0 ? (
        <section className="relative py-14 lg:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeader
              title={config.tagCategoriesHeading ?? "Por categoría"}
              subtitle={config.tagCategoriesSubheading}
            />
            <div className="grid md:grid-cols-2 gap-6">
              {config.tagCategories.map((cat, index) => {
                const Icon = cat.icon
                return (
                  <motion.article
                    key={cat.title}
                    {...fadeInView(!!reducedMotion, index * 0.05)}
                    className="rounded-xl border border-gray-200 bg-white p-6 lg:p-8 shadow-sm"
                  >
                    <div className="flex gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#F59B1B]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#F59B1B]" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{cat.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{cat.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative py-14 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeader
            title={config.featuresHeading ?? "Qué incluye"}
            subtitle={config.featuresSubheading}
          />
          <div className="space-y-0 divide-y divide-gray-200 border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
            {config.features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.article
                  key={feature.title}
                  {...fadeInView(!!reducedMotion, index * 0.04)}
                  className="p-6 lg:p-8 lg:flex lg:gap-8 lg:items-start"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#F59B1B]/10 flex items-center justify-center shrink-0 mb-4 lg:mb-0">
                    <Icon className="w-5 h-5 text-[#F59B1B]" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {feature.points.map((point) => (
                        <li key={point} className="flex gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#F59B1B] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <motion.div
            {...fadeInView(!!reducedMotion, 0.15)}
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-xl border border-gray-200 bg-slate-50/80 p-6 lg:p-8"
          >
            <div>
              <p className="font-bold text-gray-900 text-lg">¿Listo para verlo en tu operación?</p>
              <p className="text-gray-600 text-sm mt-1">
                Prueba la plataforma o agenda una llamada con un especialista.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button asChild className="bg-[#F59B1B] text-white hover:bg-[#e08d18] font-semibold">
                <a href="/contacto">Contactar ventas</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
