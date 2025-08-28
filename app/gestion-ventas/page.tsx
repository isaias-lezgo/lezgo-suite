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
        "Sistema integral para administrar todos los aspectos de la relación con clientes con contactos ilimitados y listas inteligentes.",
      benefits: [
        "Contactos ilimitados",
        "Listas inteligentes de contactos y etiquetado",
        "Feed de conversaciones unificado",
        "Segmentación avanzada automática",
      ],
    },
    {
      icon: TrendingUp,
      title: "Gestión de Pipelines de Ventas",
      description:
        "Seguimiento visual del progreso de ventas con gestión completa de oportunidades y análisis de rendimiento.",
      benefits: [
        "Pipelines de ventas visuales",
        "Seguimiento de oportunidades detallado",
        "Análisis de rendimiento de campañas",
        "Métricas de engagement de clientes",
      ],
    },
    {
      icon: Target,
      title: "Herramientas de Prospección",
      description:
        "Identificación y captación de leads potenciales con automatización de seguimiento y nutrición automática.",
      benefits: [
        "Herramientas de prospección avanzadas",
        "Automatización de seguimiento de leads",
        "Nutrición automática de prospects",
        "Scoring automático de leads",
      ],
    },
    {
      icon: Calendar,
      title: "Calendarios y Reservas",
      description: "Calendarios ilimitados con múltiples tipos, programación automática de citas y pagos anticipados.",
      benefits: [
        "Calendarios ilimitados",
        "Múltiples tipos de calendario",
        "Programación automática de citas",
        "Pagos anticipados para citas",
      ],
    },
    {
      icon: FileText,
      title: "Generador de Propuestas",
      description:
        "Documentos comerciales automatizados con generador de propuestas, estimaciones y creador de precios de suscripción.",
      benefits: [
        "Generador de propuestas y estimaciones",
        "Creador de precios de suscripción",
        "Generador de cupones",
        "Formularios de pago optimizados",
      ],
    },
    {
      icon: BarChart3,
      title: "Análisis y Reportes",
      description:
        "Panel de control personalizable con reportes detallados y visualización de datos publicitarios integrados.",
      benefits: [
        "Panel de control personalizable",
        "Reportes personalizados",
        "Visualización de datos de Google y Facebook",
        "Análisis de rendimiento completo",
      ],
    },
  ]

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
              ayudan a cerrar más deals en menos tiempo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#F59B1B] hover:bg-[#E8890B] text-white px-8 py-3 text-lg">
                Comenzar Prueba Gratuita
              </Button>
              <Button
                variant="outline"
                className="border-[#F59B1B] text-[#F59B1B] hover:bg-[#F59B1B] hover:text-white px-8 py-3 text-lg bg-transparent"
              >
                Ver Demo
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

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#F59B1B] to-[#E8890B] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10 rounded-3xl" />
            <div className="relative z-10">
              <Star className="w-12 h-12 mx-auto mb-6 text-white/90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para Revolucionar tus Ventas?</h2>
              <p className="text-xl mb-8 text-white/90">
                Únete a más de 10,000 empresas que ya confían en Lezgo Suite para gestionar sus ventas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#F59B1B] hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  Comenzar Ahora
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#F59B1B] px-8 py-3 text-lg bg-transparent"
                >
                  Hablar con Ventas
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
