"use client"

import { Users, TrendingUp, Target, Calendar, FileText, BarChart3 } from "lucide-react"
import FeatureLandingPage, { type FeatureLandingConfig } from "@/components/custom/FeatureLandingPage"

const config: FeatureLandingConfig = {
  pageName: "Gestión de Ventas",
  kicker: "Gestión de ventas",
  kickerIcon: TrendingUp,
  title: "Cierra más con un pipeline",
  titleAccent: "que no se te escapa",
  subtitle:
    "CRM, prospección, citas y cotizaciones en un solo flujo. Menos tiempo en tareas repetitivas, más tiempo cerrando.",
  stats: [
    { value: "+45%", label: "Conversiones" },
    { value: "-60%", label: "Tiempo de cierre" },
    { value: "+35%", label: "Productividad del equipo" },
    { value: "90%", label: "Satisfacción del cliente" },
  ],
  featuresHeading: "Todo el ciclo comercial",
  featuresSubheading: "Desde el primer contacto hasta el cobro, sin saltar entre herramientas.",
  features: [
    {
      icon: Users,
      title: "CRM completo",
      description:
        "Contactos ilimitados, conversaciones unificadas y segmentación avanzada para que ningún lead quede sin seguimiento.",
      points: [
        "Contactos y Smart Lists dinámicas",
        "Feed unificado: chat, correo, llamadas y redes",
        "Etiquetas y campos personalizados",
        "Historial completo por cliente",
      ],
    },
    {
      icon: TrendingUp,
      title: "Pipelines de ventas",
      description:
        "Visualiza oportunidades, automatiza movimientos entre etapas y detecta deals estancados antes de perderlos.",
      points: [
        "Pipelines personalizables por producto o equipo",
        "Automatización por acciones del cliente",
        "Valor del pipeline y conversión por etapa",
        "Alertas para oportunidades sin actividad",
      ],
    },
    {
      icon: Target,
      title: "Prospección y nutrición",
      description:
        "Captura leads desde formularios, anuncios y embudos. Nutre con flujos automáticos según comportamiento.",
      points: [
        "Captación desde landing pages y anuncios",
        "Scoring automático por interacción",
        "Secuencias de seguimiento multicanal",
        "Acciones según respuesta o inactividad",
      ],
    },
    {
      icon: Calendar,
      title: "Calendarios y reservas",
      description:
        "Agenda citas con calendarios ilimitados, recordatorios automáticos y cobros anticipados para reducir no-shows.",
      points: [
        "Varios calendarios y tipos de servicio",
        "Round-robin y menú de servicios",
        "Recordatorios antes de la cita",
        "Pagos al reservar",
      ],
    },
    {
      icon: FileText,
      title: "Propuestas y cotizaciones",
      description:
        "Genera documentos comerciales, envía enlaces de pago y cobra suscripciones sin salir de la plataforma.",
      points: [
        "Propuestas y estimaciones profesionales",
        "Facturación y suscripciones integradas",
        "Enlaces de pago por mensaje o correo",
        "Plantillas reutilizables",
      ],
    },
    {
      icon: BarChart3,
      title: "Reportes de ventas",
      description:
        "Tableros personalizables con métricas de pipeline, campañas y reservas para decidir con datos, no intuición.",
      points: [
        "Dashboards por rol o equipo",
        "Reportes exportables a medida",
        "Datos de Google y Meta Ads integrados",
        "Rendimiento cruzado ventas-marketing",
      ],
    },
  ],
}

export default function GestionVentasContent() {
  return <FeatureLandingPage config={config} />
}
