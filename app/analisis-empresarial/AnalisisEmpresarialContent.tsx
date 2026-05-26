"use client"

import { BarChart3, TrendingUp, PieChart, LineChart, Activity, Target } from "lucide-react"
import FeatureLandingPage, { type FeatureLandingConfig } from "@/components/custom/FeatureLandingPage"

const config: FeatureLandingConfig = {
  pageName: "Análisis Empresarial",
  kicker: "Análisis empresarial",
  kickerIcon: BarChart3,
  title: "Decisiones con",
  titleAccent: "datos que puedes usar",
  subtitle:
    "Dashboards, reportes y predicciones en un solo lugar. Deja de armar hojas de cálculo y empieza a actuar con información clara.",
  stats: [
    { value: "+85%", label: "Mejor toma de decisiones" },
    { value: "-70%", label: "Tiempo en análisis" },
    { value: "95%", label: "Precisión predictiva" },
    { value: "+60%", label: "ROI medible" },
  ],
  highlightsHeading: "Análisis por área",
  highlightsSubheading: "Métricas concretas para ventas, marketing, finanzas y operaciones.",
  highlights: [
    {
      title: "Ventas",
      description: "Performance del equipo, pipeline y proyecciones de ingresos.",
      points: ["Ingresos por período", "Tasa de conversión", "Ciclo de venta promedio", "Resultados por vendedor"],
    },
    {
      title: "Marketing",
      description: "ROI de campañas, generación de leads y recorrido del cliente.",
      points: ["ROI por canal", "Costo por lead", "Valor de vida del cliente", "Atribución multicanal"],
    },
    {
      title: "Finanzas",
      description: "Flujo de caja, rentabilidad y proyecciones para planificar con seguridad.",
      points: ["Margen de ganancia", "Flujo de caja", "Burn rate", "Proyecciones financieras"],
    },
    {
      title: "Operaciones",
      description: "Eficiencia de procesos, productividad y uso de recursos.",
      points: ["Tiempo de respuesta", "Productividad del equipo", "Utilización de recursos", "Cumplimiento de SLA"],
    },
  ],
  featuresHeading: "Herramientas de análisis",
  featuresSubheading: "De datos dispersos a insights accionables, sin depender de un analista dedicado.",
  features: [
    {
      icon: BarChart3,
      title: "Dashboards interactivos",
      description: "Visualiza métricas clave en tiempo real con filtros por área, equipo o período.",
      points: [
        "Dashboards por rol",
        "Actualización en tiempo real",
        "Filtros y drill-down",
        "Exportación a varios formatos",
      ],
    },
    {
      icon: TrendingUp,
      title: "Análisis de tendencias",
      description: "Detecta patrones en datos históricos y compara períodos para anticipar cambios.",
      points: [
        "Análisis predictivo con IA",
        "Detección automática de patrones",
        "Comparativas período a período",
        "Alertas de cambios relevantes",
      ],
    },
    {
      icon: PieChart,
      title: "Segmentación avanzada",
      description: "Divide clientes, productos y mercados con criterios múltiples para insights más profundos.",
      points: [
        "Segmentación multidimensional",
        "Análisis de comportamiento",
        "Perfiles automáticos de cliente",
        "Scoring inteligente",
      ],
    },
    {
      icon: LineChart,
      title: "Reportes automáticos",
      description: "Genera y programa reportes profesionales para tu equipo sin trabajo manual recurrente.",
      points: [
        "Plantillas listas para usar",
        "Programación automática",
        "Envío por correo",
        "Reportes con tu marca",
      ],
    },
    {
      icon: Activity,
      title: "KPIs y alertas",
      description: "Monitorea indicadores clave y recibe avisos cuando se desvían de tus objetivos.",
      points: [
        "KPIs por área o equipo",
        "Alertas de desviación",
        "Benchmark con tu industria",
        "Metas trackeables",
      ],
    },
    {
      icon: Target,
      title: "Análisis predictivo",
      description: "Anticipa tendencias y evalúa escenarios para ajustar tu estrategia antes que la competencia.",
      points: [
        "Predicciones con machine learning",
        "Modelado de escenarios",
        "Recomendaciones automáticas",
        "Evaluación de riesgo y oportunidad",
      ],
    },
  ],
}

export default function AnalisisEmpresarialContent() {
  return <FeatureLandingPage config={config} />
}
