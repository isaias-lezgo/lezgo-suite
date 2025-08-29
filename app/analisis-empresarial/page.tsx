"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, PieChart, LineChart, Activity, Target, CheckCircle, Star, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useState } from "react"

export default function AnalisisEmpresarialPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features = [
    {
      icon: BarChart3,
      title: "Dashboards Interactivos",
      description:
        "Visualiza tus métricas clave en tiempo real con dashboards personalizables y filtros avanzados para cada área de tu negocio.",
      benefits: [
        "Dashboards personalizables por rol",
        "Actualización en tiempo real",
        "Filtros avanzados y drill-down",
        "Exportación a múltiples formatos",
      ],
    },
    {
      icon: TrendingUp,
      title: "Análisis de Tendencias",
      description:
        "Identifica patrones y tendencias en tus datos históricos para tomar decisiones estratégicas basadas en información sólida.",
      benefits: [
        "Análisis predictivo con IA",
        "Detección de patrones automática",
        "Comparativas período a período",
        "Alertas de cambios significativos",
      ],
    },
    {
      icon: PieChart,
      title: "Segmentación Avanzada",
      description:
        "Segmenta tus clientes, productos y mercados con criterios múltiples para obtener insights más profundos y accionables.",
      benefits: [
        "Segmentación multidimensional",
        "Análisis de comportamiento",
        "Perfiles de cliente automáticos",
        "Scoring y clasificación inteligente",
      ],
    },
    {
      icon: LineChart,
      title: "Reportes Automáticos",
      description:
        "Genera reportes profesionales automáticamente y programa su envío a stakeholders clave con la frecuencia que necesites.",
      benefits: [
        "Plantillas de reportes profesionales",
        "Programación automática",
        "Distribución por email",
        "Reportes white-label personalizados",
      ],
    },
    {
      icon: Activity,
      title: "KPIs y Métricas",
      description:
        "Monitorea los indicadores clave de rendimiento de tu empresa con alertas automáticas cuando se desvíen de los objetivos.",
      benefits: [
        "KPIs personalizables por área",
        "Alertas automáticas de desviación",
        "Benchmarking con industria",
        "Metas y objetivos trackeable",
      ],
    },
    {
      icon: Target,
      title: "Análisis Predictivo",
      description:
        "Utiliza inteligencia artificial para predecir tendencias futuras y optimizar tu estrategia empresarial.",
      benefits: [
        "Predicciones con machine learning",
        "Análisis de escenarios futuros",
        "Recomendaciones automáticas",
        "Modelado de riesgo y oportunidades",
      ],
    },
  ]

  const stats = [
    { number: "85%", label: "Mejora en toma de decisiones" },
    { number: "70%", label: "Reducción en tiempo de análisis" },
    { number: "95%", label: "Precisión en predicciones" },
    { number: "60%", label: "Aumento en ROI" },
  ]

  const analyticsTypes = [
    {
      title: "Análisis de Ventas",
      description: "Performance del equipo, conversiones, pipeline y forecasting",
      metrics: ["Revenue por período", "Tasa de conversión", "Ciclo de venta promedio", "Performance por vendedor"],
    },
    {
      title: "Análisis de Marketing",
      description: "ROI de campañas, generación de leads y customer journey",
      metrics: ["ROI por canal", "Costo por lead", "Lifetime value", "Attribution modeling"],
    },
    {
      title: "Análisis Financiero",
      description: "Cash flow, rentabilidad, costos y proyecciones financieras",
      metrics: ["Margen de ganancia", "Cash flow", "Burn rate", "Proyecciones financieras"],
    },
    {
      title: "Análisis Operacional",
      description: "Eficiencia de procesos, productividad y optimización de recursos",
      metrics: ["Tiempo de respuesta", "Productividad del equipo", "Utilización de recursos", "SLA compliance"],
    },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-[#F59B1B]/5 via-transparent to-[#F59B1B]/8"
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(245,155,27,0.5) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 80%, rgba(245,155,27,0.45) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, rgba(245,155,27,0.42) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        {/* Floating background elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#F59B1B]/10 to-orange-300/5 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-[#F59B1B]/10 rounded-full blur-lg"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-200/15 to-[#F59B1B]/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-28 h-28 bg-gradient-to-br from-[#F59B1B]/15 to-orange-400/10 rounded-full blur-xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        
      </div>

     

      {/* Hero Section */}
      <section className="pt-16 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[#F59B1B]/10 rounded-full mb-6">
              <BarChart3 className="w-5 h-5 text-[#F59B1B] mr-2" />
              <span className="text-[#F59B1B] font-semibold">Análisis Empresarial</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Decisiones Basadas en
              <span className="bg-gradient-to-r from-[#F59B1B] to-[#E8890B] bg-clip-text text-transparent">
                {" "}
                Datos Reales
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transforma datos complejos en insights accionables con nuestras herramientas de análisis empresarial
              impulsadas por inteligencia artificial.
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

      {/* Analytics Types Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tipos de Análisis</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cobertura completa de todas las áreas críticas de tu negocio con métricas específicas y actionables.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {analyticsTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:border-[#F59B1B]/30 transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <div className="space-y-2">
                  {type.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#F59B1B] mr-2 flex-shrink-0" />
                      {metric}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Herramientas Avanzadas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Potentes capacidades de análisis que transforman datos complejos en insights claros y accionables.
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
