"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, Target, Calendar, FileText, BarChart3, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function GestionVentasPage() {

  const features = [
    {
      icon: Users,
      title: "Gestión Completa de CRM",
      description:
        "CRM robusto para manejar todos tus contactos sin límites, con comunicaciones unificadas, Smart Lists y etiquetado avanzado.",
      benefits: [
        "Contactos ilimitados",  // característica estándar en los planes pagados :contentReference[oaicite:0]{index=0}
        "Smart Lists dinámicas con filtros múltiples",  // actualizan automáticamente según comportamiento, etiquetas, campos personalizados :contentReference[oaicite:1]{index=1}
        "Feed unificado de conversaciones: , correo, llamadas, redes sociales",  // todas las interacciones en un solo lugar :contentReference[oaicite:2]{index=2}
        "Etiquetado y campos personalizados para segmentación granular"  // permite organizar y filtrar por varios criterios :contentReference[oaicite:3]{index=3}
      ],
    },
    {
      icon: TrendingUp,
      title: "Gestión de Pipelines de Ventas",
      description:
        "Visualiza y automatiza el flujo de oportunidades con pipelines personalizables, seguimiento de etapas y análisis de desempeño.",
      benefits: [
        "Pipelines visuales personalizables",  // se pueden crear pipelines con etapas definidas :contentReference[oaicite:4]{index=4}
        "Movimiento automático de oportunidades basado en acciones",  // disparadores automáticos como formulario enviado, estado de cita, pago, etc. :contentReference[oaicite:5]{index=5}
        "Visión del valor total de oportunidades y conversión por etapa",  // dashboards muestran distribución por etapa, valor de pipeline :contentReference[oaicite:6]{index=6}
        "Alertas o flujos de seguimiento para oportunidades estancadas",  // workflows permiten automatizar seguimientos y mover oportunidades según condiciones como inactividad :contentReference[oaicite:7]{index=7}
      ],
    },
    {
      icon: Target,
      title: "Herramientas de Prospección",
      description:
        "Captura y nutre leads automáticamente con flujos multicanal, scoring inteligente y seguimiento sin intervención manual constante.",
      benefits: [
        "Formularios, embudos y anuncios integrados para captación",  // formularios integrados y lead capture desde landing/funnels/anuncios :contentReference[oaicite:8]{index=8}
        "Scoring automático de leads basado en comportamiento",  // puntuación de leads según interacciones como apertura de email, actividad reciente, etc. :contentReference[oaicite:9]{index=9}
        "Nutrición mediante automatizaciones (envíos, seguimientos)",  // flujos automáticos que envían mensajes, recordatorios, etc. :contentReference[oaicite:10]{index=10}
        "Acciones automáticas según estado del lead o respuesta",  // triggers en workflows que cambian estado cuando formulario enviado, cita agendada, no show, etc. :contentReference[oaicite:11]{index=11}
      ],
    },
    {
      icon: Calendar,
      title: "Calendarios y Reservas",
      description:
        "Gestiona citas con calendarios ilimitados, diferentes tipos de servicio, sincronización, reservas automáticas y pagos anticipados.",
      benefits: [
        "Calendarios ilimitados con distintos tipos de servicio",  // se pueden tener varios calendarios para diferentes servicios o miembros del equipo :contentReference[oaicite:12]{index=12}
        "Sincronización y menú de servicios",  // tipo de calendarios de menú de servicios, Round-Robin, etc. :contentReference[oaicite:13]{index=13}
        "Reservas automáticas y recordatorios previos",  // programación automática y avisos para reducir no-shows :contentReference[oaicite:14]{index=14}
        "Pagos adelantados para asegurar citas",  // opción de pagos anticipados integrados al momento de reservar :contentReference[oaicite:15]{index=15}
      ],
    },
    {
      icon: FileText,
      title: "Generador de Propuestas y Cotizaciones",
      description:
        "Crea y envía propuestas, estimaciones y facturas desde la plataforma, incluyendo cobros, suscripciones y enlaces de pago.",
      benefits: [
        "Generador de propuestas y estimaciones profesionales",  // enviar cotizaciones/propuestas integradas :contentReference[oaicite:16]{index=16}
        "Facturación y suscripciones integradas",  // pagos recurrentes, suscripciones y facturas integradas en flujos de venta :contentReference[oaicite:17]{index=17}
        "Enlaces de pago rápidos (ej. envío por email)",  // Text2Pay u otras funciones de enlace de pago desde mensaje o factura :contentReference[oaicite:18]{index=18}
        "Plantillas personalizables de propuesta y cotización",  // uso de plantillas para acelerar generación de documentos de venta :contentReference[oaicite:19]{index=19}
      ],
    },
    {
      icon: BarChart3,
      title: "Análisis y Reportes",
      description:
        "Tableros personalizables con reportes detallados, seguimiento de métricas clave y visualización de datos de campañas publicitarias integradas.",
      benefits: [
        "Dashboard personalizable con widgets definidos por usuario",  // se pueden seleccionar qué métricas y widgets ver :contentReference[oaicite:20]{index=20}
        "Reportes a medida exportables",  // informes que se pueden extraer con criterios customizados y formatos exportables :contentReference[oaicite:21]{index=21}
        "Integración de datos de anuncios de Google, Facebook, etc.",  // visualizar datos de campañas publicitarias dentro de la plataforma :contentReference[oaicite:22]{index=22}
        "Análisis completo del rendimiento de ventas, marketing y reservas",  // métricas cruzadas entre canales, pipeline, reservas, etc. :contentReference[oaicite:23]{index=23}
      ],
    },
  ];
  

  const stats = [
    { number: "45%", label: "Aumento en conversiones" },
    { number: "60%", label: "Reducción en tiempo de cierre" },
    { number: "35%", label: "Mejora en productividad" },
    { number: "90%", label: "Satisfacción del cliente" },
  ]

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 bg-gradient-to-br from-white via-orange-50/30 to-gray-100/50 -z-10">
        <div className="absolute inset-0">
          {/* Enhanced floating background elements */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#F59B1B]/10 to-[#F59B1B]/5 rounded-full blur-xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-[#F59B1B]/15 to-[#F59B1B]/8 rounded-full blur-lg"
            animate={{
              x: [0, -25, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-[#F59B1B]/8 to-[#F59B1B]/4 rounded-full blur-md"
            animate={{
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>



      <section className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[#F59B1B]/10 rounded-full mb-6">
              <TrendingUp className="w-5 h-5 text-[#F59B1B] mr-2" />
              <span className="text-[#F59B1B] font-semibold">Gestión de Ventas</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Potencia tu
              <span className="bg-gradient-to-r from-[#F59B1B] to-[#E8890B] bg-clip-text text-transparent">
                {" "}
                Equipo de Ventas
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transforma tu proceso de ventas con herramientas inteligentes que automatizan tareas repetitivas y te
              ayudan a cerrar más ventas en menos tiempo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#F59B1B] hover:bg-[#E8890B] text-white px-8 py-3 text-lg">
                <a href="https://app.lezgosuite.com/payment-link/68ae46632ba55c5eda290d56">
                  Probar Gratis
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-[#F59B1B] text-[#F59B1B] hover:bg-[#F59B1B] hover:text-white px-8 py-3 text-lg bg-transparent"
              >
                <a href="https://app.lezgosuite.com/widget/bookings/conocelezgosuite">
                  Habla con un especialista
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#F59B1B] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Funcionalidades Completas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todo lo que necesitas para gestionar tu proceso de ventas de manera eficiente y profesional.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:border-[#F59B1B]/30 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#F59B1B] to-[#E8890B] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#F59B1B] mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
