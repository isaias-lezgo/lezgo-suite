"use client"

import {
  Plug,
  Globe,
  Smartphone,
  Mail,
  ShoppingCart,
  CreditCard,
  Cloud,
  Database,
  Zap,
} from "lucide-react"
import FeatureLandingPage, { type FeatureLandingConfig } from "@/components/custom/FeatureLandingPage"

const config: FeatureLandingConfig = {
  pageName: "Integración Total",
  kicker: "Integración total",
  kickerIcon: Plug,
  title: "Conecta tu",
  titleAccent: "ecosistema digital",
  subtitle:
    "Más de 200 integraciones nativas, API REST y webhooks en tiempo real. Un solo lugar para tus canales, pagos y herramientas.",
  stats: [
    { value: "200+", label: "Integraciones" },
    { value: "99.9%", label: "Uptime" },
    { value: "<100ms", label: "Respuesta API" },
    { value: "24/7", label: "Monitoreo" },
  ],
  integrationLogosHeading: "Herramientas que ya usas",
  integrationLogosSubheading: "Conexiones listas con las plataformas más usadas en México.",
  integrationLogos: [
    { name: "WhatsApp", logo: "/whatsapp-logo.png", category: "Mensajería" },
    { name: "Shopify", logo: "/shopify-logo.png", category: "E-commerce" },
    { name: "Google Workspace", logo: "/google-workspace-logo.png", category: "Productividad" },
    { name: "Make.com", logo: "/make-logo.png", category: "Automatización" },
    { name: "n8n", logo: "/n8n.png", category: "Automatización" },
    { name: "Stripe", logo: "/stripe-logo.png", category: "Pagos" },
    { name: "Zoom", logo: "/zoom-logo.png", category: "Videollamadas" },
    { name: "MercadoPago", logo: "/mercadopago-logo.png", category: "Pagos" },
  ],
  tagCategoriesHeading: "Integraciones por categoría",
  tagCategoriesSubheading: "Cobertura de comunicación, ventas, pagos y desarrollo.",
  tagCategories: [
    {
      icon: Smartphone,
      title: "Redes y mensajería",
      description: "Unifica conversaciones y leads desde todos tus canales.",
      tags: [
        "Facebook / Instagram",
        "WhatsApp Business",
        "SMS y llamadas",
        "Chat web",
        "Instagram Direct",
      ],
    },
    {
      icon: Mail,
      title: "Email y automatización",
      description: "Campañas conectadas al CRM, segmentación y workflows.",
      tags: [
        "Email builder",
        "Mailchimp",
        "ActiveCampaign",
        "SendGrid",
        "Smart Lists",
      ],
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Sincroniza ventas, productos y comportamiento de compra.",
      tags: [
        "Shopify",
        "WooCommerce",
        "Funnels internos",
        "Recuperación de carrito",
        "Historial de pedidos",
      ],
    },
    {
      icon: CreditCard,
      title: "Pagos y facturación",
      description: "Cobros, suscripciones y eventos financieros integrados.",
      tags: [
        "Pagos nativos",
        "Suscripciones",
        "Webhooks de facturación",
        "Stripe / MercadoPago",
        "Enlaces de pago",
      ],
    },
    {
      icon: Cloud,
      title: "Productividad",
      description: "Coordina calendarios, correo y herramientas de trabajo.",
      tags: [
        "Google Workspace",
        "Microsoft 365",
        "Zapier / Make / n8n",
        "Calendarios externos",
        "Slack",
      ],
    },
    {
      icon: Database,
      title: "API y datos",
      description: "Conecta sistemas propios con API REST y webhooks.",
      tags: [
        "REST API completa",
        "50+ webhooks",
        "OAuth 2.0",
        "Campos personalizados",
        "Rate limits documentados",
      ],
    },
  ],
  featuresHeading: "Infraestructura de integración",
  featuresSubheading: "Conexiones estables, seguras y documentadas para tu equipo técnico o partners.",
  features: [
    {
      icon: Plug,
      title: "API REST completa",
      description:
        "Accede, crea y modifica contactos, conversaciones, calendarios, pagos y más desde tu propio sistema.",
      points: [
        "CRUD en entidades clave del CRM",
        "Campos personalizados y tags",
        "Documentación interactiva",
        "OAuth 2.0 y tokens privados",
      ],
    },
    {
      icon: Zap,
      title: "Webhooks en tiempo real",
      description:
        "Recibe eventos al instante para activar flujos externos sin polling ni retrasos.",
      points: [
        "Más de 50 eventos disponibles",
        "Payloads JSON documentados",
        "Verificación de autenticidad",
        "Triggers: formulario, pago, cita y más",
      ],
    },
    {
      icon: Globe,
      title: "Marketplace de integraciones",
      description:
        "Apps oficiales listas para conectar, con mapeo automático de campos y soporte para desarrolladores.",
      points: [
        "Apps oficiales y de comunidad",
        "Integraciones prediseñadas",
        "Mapeo automático de campos",
        "Guías en Developer Portal",
      ],
    },
  ],
}

export default function IntegracionTotalContent() {
  return <FeatureLandingPage config={config} />
}
