"use client"

import { Bot, Zap, MessageSquare, Brain, Workflow, Clock, Sparkles } from "lucide-react"
import FeatureLandingPage, { type FeatureLandingConfig } from "@/components/custom/FeatureLandingPage"

const config: FeatureLandingConfig = {
  pageName: "Automatización IA",
  kicker: "Automatización con IA",
  kickerIcon: Bot,
  title: "IA que ejecuta",
  titleAccent: "mientras tú vendes",
  subtitle:
    "Chatbots, workflows y tareas automáticas que responden, siguen y programan sin que tu equipo repita lo mismo todo el día.",
  stats: [
    { value: "-80%", label: "Tareas manuales" },
    { value: "24/7", label: "Atención activa" },
    { value: "95%", label: "Precisión en flujos" },
    { value: "3×", label: "Productividad del equipo" },
  ],
  capabilitiesHeading: "Capacidades de IA",
  capabilitiesSubheading: "Tecnología adaptada a empresas en México y Latinoamérica.",
  capabilities: [
    {
      icon: MessageSquare,
      title: "Lenguaje natural",
      description: "Comprende y responde en español con contexto de tu negocio.",
    },
    {
      icon: Brain,
      title: "Aprendizaje continuo",
      description: "Se entrena con tus FAQs, documentos y URLs públicas.",
    },
    {
      icon: Sparkles,
      title: "Contexto conversacional",
      description: "Adapta respuestas según el canal y la intención del cliente.",
    },
    {
      icon: Workflow,
      title: "Automatización inteligente",
      description: "Ejecuta procesos complejos con reglas y condiciones de negocio.",
    },
  ],
  featuresHeading: "Automatizaciones incluidas",
  featuresSubheading: "Menos trabajo repetitivo, más tiempo para cerrar y atender clientes que importan.",
  features: [
    {
      icon: Bot,
      title: "Chatbots inteligentes",
      description:
        "Atiende consultas frecuentes, reserva citas y escala a un humano cuando hace falta, en varios canales.",
      points: [
        "Facebook, Instagram y chat web",
        "Modo sugerido o respuesta automática",
        "Entrenamiento con FAQs y documentos",
        "Reserva de citas integrada",
      ],
    },
    {
      icon: Workflow,
      title: "Workflows automatizados",
      description:
        "Disparadores, condiciones y acciones para automatizar seguimientos, asignaciones y notificaciones.",
      points: [
        "Triggers: formularios, tags, estados y más",
        "Acciones: correos, tags, recordatorios",
        "Rutas If/Else personalizadas",
        "Historial de ejecución por contacto",
      ],
    },
    {
      icon: MessageSquare,
      title: "Respuestas automáticas",
      description:
        "Plantillas y contexto de negocio para contestar de forma coherente en chat y correo.",
      points: [
        "Plantillas por canal",
        "Entrenamiento con datos propios",
        "Cambio de canal según consulta",
        "Escalamiento a agente humano",
      ],
    },
    {
      icon: Brain,
      title: "Predicción de comportamiento",
      description:
        "Anticipa intención de compra, puntúa leads y activa seguimientos proactivos.",
      points: [
        "Lead scoring por interacción",
        "Acciones IA dentro de workflows",
        "Detección de intención de reserva",
        "Seguimiento por inactividad",
      ],
    },
    {
      icon: Zap,
      title: "Tareas automáticas",
      description:
        "Elimina trabajo manual: asignaciones, recordatorios y actualización de campos del CRM.",
      points: [
        "Tareas tras formulario o venta ganada",
        "Asignación automática de leads",
        "Recordatorios contextuales",
        "Sincronización de datos del contacto",
      ],
    },
    {
      icon: Clock,
      title: "Programación inteligente",
      description:
        "Optimiza citas, recordatorios y reprogramaciones según disponibilidad y prioridades.",
      points: [
        "Reservas vía bot o formulario",
        "Sincronización de calendarios",
        "Recordatorios previos a citas",
        "Gestión de no-shows",
      ],
    },
  ],
}

export default function AutomatizacionIAContent() {
  return <FeatureLandingPage config={config} />
}
