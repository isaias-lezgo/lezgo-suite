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
        "Chatbots con IA que manejan consultas frecuentes, reservaciones y soporte a través de distintos canales de comunicación.",
      benefits: [
        "Respuestas automáticas en canales como Facebook, Instagram, Web Chat",  // soportado en Conversation AI Bot. :contentReference[oaicite:0]{index=0}
        "Modo sugerido o auto-piloto para que responda automáticamente o que proponga respuesta al agente",  // modos Suggestive y Auto-Pilot. :contentReference[oaicite:1]{index=1}
        "Capacidad de entrenarlo con preguntas frecuentes, URLs públicas o documentos",  // entrenamiento desde FAQs, URLs, Google Docs. :contentReference[oaicite:2]{index=2}
        "Reserva de citas integrada (cuando el contexto lo requiere)",  // Booking appointments como parte del bot. :contentReference[oaicite:3]{index=3}
      ],
    },
    {
      icon: Workflow,
      title: "Automatización de Procesos",
      description:
        "Flujos de trabajo robustos con disparadores, condiciones y acciones para automatizar tareas operativas, seguimientos y notificaciones.",
      benefits: [
        "Disparadores múltiples: creación de contacto, envío de formularios, cambio de estado, acción de tag, entrega de documento, etc.",  // triggers muy variados. :contentReference[oaicite:4]{index=4}
        "Acciones automatizadas: emails, asignaciones, tags, recordatorios, etc.",  // acciones disponibles en workflows. :contentReference[oaicite:5]{index=5}
        "Condiciones If/Else y filtros para personalizar rutas del flujo",  // workflows permiten rutas condicionales. :contentReference[oaicite:6]{index=6}
        "Registro histórico de ejecución del workflow para seguimiento y análisis",  // logs / historial de workflows. :contentReference[oaicite:7]{index=7}
      ],
    },
    {
      icon: MessageSquare,
      title: "Respuestas Automáticas",
      description:
        "Sistema que utiliza plantillas, inteligencia contextual y respuestas predefinidas para contestar de forma coherente y rápida.",
      benefits: [
        "Plantillas configurables para email/respuestas de chatbot",  // templates se pueden usar. :contentReference[oaicite:8]{index=8}
        "Bot entrenado con datos propios de negocio para mayor personalización",  // entrenamiento con FAQs o documentos propios. :contentReference[oaicite:9]{index=9}
        "Cambiar el canal según respuesta del usuario o tipo de consulta",  // bot puede operar en distintos canales y se puede configurar por canal. :contentReference[oaicite:10]{index=10}
        "Transición automática a intervención humana si es necesario",  // auto escalamiento cuando límite de mensajes o canal humano requerido. :contentReference[oaicite:11]{index=11}
      ],
    },
    {
      icon: Brain,
      title: "Predicción de Comportamiento",
      description:
        "Funciones basadas en IA para prever necesidades del cliente, optimizar puntuaciones de leads y anticipar acciones relevantes.",
      benefits: [
        "Lead scoring basado en interacciones y comportamiento",  // puntuación de leads. :contentReference[oaicite:12]{index=12}
        "Recomendaciones automáticas en workflows usando acciones AI",  // Workflow AI permite acciones basadas en prompts. :contentReference[oaicite:13]{index=13}
        "Intención de reserva o compra mediante contexto de conversación",  // bot de conversación con intención ‘Appointment Booking’. :contentReference[oaicite:14]{index=14}
        "Prevención de abandono o seguimiento proactivo según inactividad",  // triggers de contacto que no responde, workflows que actúan tras cierto tiempo. :contentReference[oaicite:15]{index=15}
      ],
    },
    {
      icon: Zap,
      title: "Automatización de Tareas",
      description:
        "Elimina trabajo manual con tareas automáticas: asignaciones, recordatorios, seguimiento y sincronización de datos.",
      benefits: [
        "Creación automática de tareas tras eventos como formulario enviado o oportunidad ganada",  // acción tras triggers. :contentReference[oaicite:16]{index=16}
        "Asignación automática de leads o contactos según reglas definidas",  // workflows permiten asignación automática. :contentReference[oaicite:17]{index=17}
        "Recordatorios automáticos orientados al contexto del cliente o cita",  // recordatorios de cita, seguimiento. :contentReference[oaicite:18]{index=18}
        "Sincronización u actualización de campos del CRM según actividad",  // acciones que modifican datos del contacto. :contentReference[oaicite:19]{index=19}
      ],
    },
    {
      icon: Clock,
      title: "Programación Inteligente",
      description:
        "Funciones que optimizan horarios, citas y seguimientos automáticamente según disponibilidad y prioridades.",
      benefits: [
        "Programación automática de citas mediante el bot o formularios",  // Conversation AI bot puede reservar citas automáticamente. :contentReference[oaicite:20]{index=20}
        "Sincronización de calendario con diferentes servicios o recursos",  // múltiples calendarios, tipo de servicio, equipo, etc. :contentReference[oaicite:21]{index=21}
        "Recordatorios programados previos a citas",  // workflows con triggers basados en cita reservada + recordatorios. :contentReference[oaicite:22]{index=22}
        "Reprogramación o cancelación automática según cambios o no-asistencia",  // aunque reprogramación automática específica puede estar sujeta a configuración del workflow/recordatorio. :contentReference[oaicite:23]{index=23}
      ],
    },
  ];
  

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
      title: "Machine Learning con bases de datos",
      description: "Aprende con una base de datos",
      icon: Brain,
    },
    {
      title: "Análisis contextual",
      description: "Se adapta al contexto de las conversaciones y del negocio",
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
