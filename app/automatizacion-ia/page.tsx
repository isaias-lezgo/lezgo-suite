"use client"

import { motion } from "framer-motion"
import { Bot, Zap, MessageSquare, Brain, Workflow, Clock, CheckCircle, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function AutomatizacionIAPage() {

  const features = [
    {
      icon: Bot,
      title: "Chatbots Inteligentes",
      description:
        "Chatbots con IA que entienden el contexto y proporcionan respuestas personalizadas 24/7 en múltiples canales de comunicación.",
      benefits: [
        "Respuestas contextuales inteligentes",
        "Integración con WhatsApp, Instagram, TikTok",
        "Escalamiento automático a humanos",
        "Aprendizaje continuo de conversaciones",
      ],
    },
    {
      icon: Workflow,
      title: "Automatización de Procesos",
      description:
        "Automatiza flujos de trabajo complejos con reglas inteligentes que se adaptan y optimizan según el comportamiento de tus clientes.",
      benefits: [
        "Workflows visuales drag & drop",
        "Triggers inteligentes basados en IA",
        "Automatización de seguimientos",
        "Optimización continua de procesos",
      ],
    },
    {
      icon: MessageSquare,
      title: "Respuestas Automáticas",
      description:
        "Sistema de respuestas automáticas que aprende de tus mejores vendedores para mantener conversaciones naturales y efectivas.",
      benefits: [
        "Templates inteligentes personalizables",
        "Análisis de sentimiento en tiempo real",
        "Respuestas adaptadas al perfil del cliente",
        "A/B testing automático de mensajes",
      ],
    },
    {
      icon: Brain,
      title: "Predicción de Comportamiento",
      description:
        "IA predictiva que anticipa las necesidades del cliente y sugiere las mejores acciones para maximizar las conversiones.",
      benefits: [
        "Scoring predictivo de leads",
        "Recomendaciones de próximos pasos",
        "Detección de intención de compra",
        "Prevención de churn automática",
      ],
    },
    {
      icon: Zap,
      title: "Automatización de Tareas",
      description:
        "Elimina tareas repetitivas con automatización inteligente que aprende de tus patrones de trabajo y se mejora continuamente.",
      benefits: [
        "Creación automática de tareas",
        "Asignación inteligente de leads",
        "Recordatorios contextuales",
        "Actualización automática de datos",
      ],
    },
    {
      icon: Clock,
      title: "Programación Inteligente",
      description:
        "Sistema de programación que optimiza automáticamente horarios, citas y seguimientos basado en disponibilidad y prioridades.",
      benefits: [
        "Scheduling automático de reuniones",
        "Optimización de calendarios",
        "Recordatorios inteligentes",
        "Reprogramación automática",
      ],
    },
  ]

  const stats = [
    { number: "80%", label: "Reducción en tareas manuales" },
    { number: "24/7", label: "Disponibilidad de atención" },
    { number: "95%", label: "Precisión en automatizaciones" },
    { number: "3x", label: "Aumento en productividad" },
  ]

  const aiCapabilities = [
    {
      title: "Procesamiento de Lenguaje Natural",
      description: "Comprende y responde en español con contexto empresarial",
      icon: MessageSquare,
    },
    {
      title: "Machine Learning Adaptativo",
      description: "Aprende continuamente de tus datos y mejora automáticamente",
      icon: Brain,
    },
    {
      title: "Análisis Predictivo",
      description: "Predice tendencias y comportamientos futuros con alta precisión",
      icon: Sparkles,
    },
    {
      title: "Automatización Inteligente",
      description: "Ejecuta procesos complejos con lógica empresarial avanzada",
      icon: Workflow,
    },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-orange-50/30 to-gray-100/50 -z-10">
        <div className="absolute inset-0">
          {/* Floating background elements */}
          <motion.div
            className="absolute top-32 left-16 w-36 h-36 bg-gradient-to-r from-[#F59B1B]/10 to-[#F59B1B]/5 rounded-full blur-xl"
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-32 right-16 w-28 h-28 bg-gradient-to-r from-[#F59B1B]/15 to-[#F59B1B]/8 rounded-full blur-lg"
            animate={{
              x: [0, -35, 0],
              y: [0, 25, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 9,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-r from-[#F59B1B]/8 to-[#F59B1B]/4 rounded-full blur-md"
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




      {/* Hero Section */}
      <section className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[#F59B1B]/10 rounded-full mb-6">
              <Bot className="w-5 h-5 text-[#F59B1B] mr-2" />
              <span className="text-[#F59B1B] font-semibold">Automatización IA</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Inteligencia Artificial que
              <span className="bg-gradient-to-r from-[#F59B1B] to-[#E8890B] bg-clip-text text-transparent">
                {" "}
                Trabaja por Ti
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Automatiza procesos complejos, responde clientes 24/7 y optimiza tu operación con IA avanzada que aprende
              y se adapta a tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#F59B1B] hover:bg-[#E8890B] text-white px-8 py-3 text-lg">
                <a href="https://www.lezgosuite.com/payment-link/68ae46632ba55c5eda290d56">
                  Probar Gratis
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-[#F59B1B] text-[#F59B1B] hover:bg-[#F59B1B] hover:text-white px-8 py-3 text-lg bg-transparent"
              >
                <a href="https://www.lezgosuite.com/widget/bookings/conocelezgosuite">
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

      {/* AI Capabilities Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Capacidades de IA Avanzada</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnología de inteligencia artificial de última generación adaptada específicamente para empresas
              latinoamericanas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-[#F59B1B]/30 transition-all duration-300 hover:shadow-lg text-center group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#F59B1B] to-[#E8890B] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <capability.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{capability.title}</h3>
                <p className="text-gray-600 text-sm">{capability.description}</p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Automatizaciones Inteligentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas de automatización que transforman la manera en que tu equipo trabaja y se relaciona con los
              clientes.
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
