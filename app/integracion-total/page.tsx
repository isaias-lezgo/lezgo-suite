"use client"

import { motion } from "framer-motion"
import {
  Plug,
  Globe,
  Smartphone,
  Mail,
  ShoppingCart,
  CreditCard,
  Cloud,
  Database,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function IntegracionTotalPage() {

  const integrationCategories = [
    {
      icon: Smartphone,
      title: "Redes Sociales y Mensajería",
      description: "Unifica tus canales de comunicación para gestionar mensajes y leads desde una sola interfaz",
      integrations: [
        "Facebook / Instagram Messenger",  // FB/IG Messenger integrados en Conversations API :contentReference[oaicite:0]{index=0}
        "WhatsApp Business",               // canales soportados en comunicaciones multicanal :contentReference[oaicite:1]{index=1}
        "SMS y llamadas",                  // manejados vía Messaging & Conversations APIs :contentReference[oaicite:2]{index=2}
        "Widgets de chat web",             // webs integrables con chat widget según marketplace/integrations list :contentReference[oaicite:3]{index=3}
        "Instagram Direct",                // incluido en los canales soportados por redes sociales integradas :contentReference[oaicite:4]{index=4}
        "Facebook Messenger",               // como parte de integración de redes sociales conversacionales :contentReference[oaicite:5]{index=5}
      ],
    },
    {
      icon: Mail,
      title: "Email Marketing & Automatización",
      description: "Integra campañas de email con CRM, contactos, segmentaciones, workflows y seguimiento de resultados",
      integrations: [
        "Email builder interno",           // plataforma incluye generación de campañas de email propias :contentReference[oaicite:6]{index=6}
        "Mailchimp",                        // se puede conectar usando herramientas de integración o plataformas tipo n8n :contentReference[oaicite:7]{index=7}
        "ActiveCampaign",                   // mencionados en integraciones externas / listas de integraciones sugeridas :contentReference[oaicite:8]{index=8}
        "SendGrid",                         // posible vía APIs externas / integraciones de email transactional :contentReference[oaicite:9]{index=9}
        "OptiMonk",                         // integración específica para campañas / captación de leads por formularios / encuestas :contentReference[oaicite:10]{index=10}
        "Segmentación dinámica / Smart Lists",  // aunque no es una “herramienta externa”, se integra con el email/campañas internamente como parte del CRM y workflows :contentReference[oaicite:11]{index=11}
      ],
    },
    {
      icon: ShoppingCart,
      title: "Tiendas / Comercio Electrónico",
      description: "Sincroniza ventas, productos, clientes y comportamientos de compra con tus pipelines y automatizaciones",
      integrations: [
        "Shopify",                         // integraciones comunes de e-commerce con workflows externamente :contentReference[oaicite:12]{index=12}
        "WooCommerce",                     // usualmente como plugins o conexiones desde la tienda al CRM externamente :contentReference[oaicite:13]{index=13}
        "Formularios / Funnels de venta internos", // la plataforma tiene su propio funnel/form builder que conecta con pagos y contacto :contentReference[oaicite:14]{index=14}
        "Mercado Libre / Marketplaces",     // plataformas externas podrían integrarse mediante API / webhook / sync tools (no siempre nativa) — menos documentado como integración oficial :contentReference[oaicite:15]{index=15}
        "Aviso de carritos / recuperación",  // posibilidad de automatizar recordatorios de compra basados en comportamiento dentro de funnels/workflows :contentReference[oaicite:16]{index=16}
        "Seguimiento de pedidos / transacciones", // vinculaciones con pagos / historial de clientes mediante la API de ventas / payments :contentReference[oaicite:17]{index=17}
      ],
    },
    {
      icon: CreditCard,
      title: "Pagos y Facturación",
      description: "Gestiona pagos, suscripciones y eventos financieros dentro de la plataforma con integración segura",
      integrations: [
        "Pagos integrados internos",        // API Payments permite procesar pagos, manejar transacciones, suscripciones :contentReference[oaicite:18]{index=18}
        "Suscripciones / facturación recurrente", // parte del módulo de payments/subscriptions API :contentReference[oaicite:19]{index=19}
        "Webhooks de facturación",           // eventos de facturación notificables vía webhooks :contentReference[oaicite:20]{index=20}
        "Integraciones con processors externos", // conectores posibles mediante API/Marketplace para usar Stripe u otros si está disponible externamente :contentReference[oaicite:21]{index=21}
        "Informes de pagos y transacciones",   // datos accesibles en API de pagos y dashboards contractuales :contentReference[oaicite:22]{index=22}
        "Pagos anticipados / enlaces de pago", // enlaces de cobro/link payment que se incluyen en workflows/formularios/propuestas internas :contentReference[oaicite:23]{index=23}
      ],
    },
    {
      icon: Cloud,
      title: "Productividad y Colaboración",
      description: "Integra tus herramientas de trabajo para mejorar la coordinación, asignación de tareas y accesos compartidos",
      integrations: [
        "Google Workspace",                 // usuarios conectan calendarios/correo externos mediante OAuth / integraciones posibles :contentReference[oaicite:24]{index=24}
        "Microsoft 365",                   // similar al punto anterior para correo, calendarios, etc. (posible mediante integraciones externas / workflows) :contentReference[oaicite:25]{index=25}
        "Zapier / make.com / n8n",         // permite conectar con miles de apps mediante el API / OAuth / workflows externos :contentReference[oaicite:26]{index=26}
        "Calendarios externos",            // Calendar API permite manejo de eventos, disponibilidad, reservas externas :contentReference[oaicite:27]{index=27}
        "Herramientas de comunicación (Slack u otras)", // integración posible vía API / workflows para notificaciones, etc. :contentReference[oaicite:28]{index=28}
        "Gestión de tareas internas",       // asignación de tareas, seguimiento dentro CRM y workflows internos :contentReference[oaicite:29]{index=29}
      ],
    },
    {
      icon: Database,
      title: "Bases de Datos & API",
      description: "Conecta tus datos internos, CRM personalizado y otros sistemas mediante API y Webhooks",
      integrations: [
        "REST API completa (Contacts, Conversations, Calendar, Payments, etc.)",   // cobertura completa de API docs :contentReference[oaicite:30]{index=30}
        "Webhooks en tiempo real para eventos clave",                             // >50 eventos disponibles :contentReference[oaicite:31]{index=31}
        "OAuth 2.0 / Tokens privados para autenticación segura",                  // autenticación vía OAuth 2.0 o token de integración privada :contentReference[oaicite:32]{index=32}
        "Sincronización de campos personalizados y tags",                         // API permite CRUD en campos personalizados, etiquetas, custom fields :contentReference[oaicite:33]{index=33}
        "Rate limits y control de uso para integraciones externas",               // límites de llamada a API documentados para evitar abuso :contentReference[oaicite:34]{index=34}
      ],
    }
  ];
  
  const features = [
    {
      icon: Plug,
      title: "API Robusta",
      description:
        "Interfaz REST completa que te permite acceder, crear, modificar y eliminar casi todos los datos clave y construir integraciones customizadas.",
      benefits: [
        "Operaciones CRUD para contactos, conversaciones, oportunidades, calendarios, pagos ...",  // cobertura de múltiples APIs REST :contentReference[oaicite:36]{index=36}
        "Campos personalizados, etiquetas y filtros avanzados",                                 // custom fields / tags API endpoints :contentReference[oaicite:37]{index=37}
        "Documentación interactiva y SDKs",                                                    // docs del Developer Portal con ejemplos interactivos :contentReference[oaicite:38]{index=38}
        "Autenticación segura con OAuth 2.0 o token privado",                                   // métodos de autenticación documentados :contentReference[oaicite:39]{index=39}
      ],
    },
    {
      icon: Zap,
      title: "Sincronización en Tiempo Real y Webhooks",
      description: "Detecta eventos al instante en tu cuenta para activar acciones, flujos o integraciones externas sin retardos.",
      benefits: [
        "Webhooks para más de 50 eventos distintos",           // evento/webhook docs indican >50 eventos disponibles :contentReference[oaicite:40]{index=40}
        "Payloads bien documentados para cada evento",           // documentación de payloads JSON y campos :contentReference[oaicite:41]{index=41}
        "Verificación de autenticidad de los webhooks",           // medidas de seguridad en docs de webhooks (verificación pública/claves) :contentReference[oaicite:42]{index=42}
        "Triggers automáticos basados en eventos: formulario enviado, contacto nuevo, pago recibido, cita reservada, etc.",  // disparadores varios en workflows integrados con API/webhooks :contentReference[oaicite:43]{index=43}
      ],
    },
    {
      icon: Globe,
      title: "Integraciones Nativas y Marketplace",
      description:
        "Acceso a apps integradas oficialmente mediante marketplace, plus la posibilidad de conectar herramientas populares rápidamente",
      benefits: [
        "Marketplace con apps oficiales y comunidad",           // Marketplace/API docs tienen sección de integraciones/apps :contentReference[oaicite:44]{index=44}
        "Integraciones prediseñadas listas para usar",          // apps que ya vienen preparadas para tours/lead sources/form integrations etc. :contentReference[oaicite:45]{index=45}
        "Mapeo automático de campos comunes",                   // al conectar formularios o apps, los campos mapean a campos de contacto en la plataforma :contentReference[oaicite:46]{index=46}
        "Soporte técnico/documentación para desarrolladores",    // docs, ejemplos, guías en Developer Portal :contentReference[oaicite:47]{index=47}
      ],
    },
  ];
  

  const stats = [
    { number: "200+", label: "Integraciones disponibles" },
    { number: "99.9%", label: "Uptime garantizado" },
    { number: "< 100ms", label: "Tiempo de respuesta API" },
    { number: "24/7", label: "Monitoreo automático" },
  ]

  const popularIntegrations = [
    { name: "WhatsApp", logo: "/whatsapp-logo.png", category: "Mensajería" },
    { name: "Shopify", logo: "/shopify-logo.png", category: "E-commerce" },
    { name: "Google Workspace", logo: "/google-workspace-logo.png", category: "Productividad" },
    { name: "Make.com", logo: "/make-logo.png", category: "Conexiones" },
    { name: "n8n", logo: "/n8n.png", category: "Conexiones" },
    { name: "Stripe", logo: "/stripe-logo.png", category: "Pagos" },
    { name: "Zoom", logo: "/zoom-logo.png", category: "Videoconferencia" },
    { name: "MercadoPago", logo: "/mercadopago-logo.png", category: "Pagos" },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-orange-50/30 to-gray-100/50 -z-10">
        <div className="absolute inset-0">
          {/* Enhanced floating background elements */}
          <motion.div
            className="absolute top-24 right-12 w-44 h-44 bg-gradient-to-r from-[#F59B1B]/8 to-[#F59B1B]/4 rounded-full blur-xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 14,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-24 left-12 w-32 h-32 bg-gradient-to-r from-[#F59B1B]/12 to-[#F59B1B]/6 rounded-full blur-lg"
            animate={{
              x: [0, 35, 0],
              y: [0, -25, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-[#F59B1B]/6 to-[#F59B1B]/3 rounded-full blur-md"
            animate={{
              x: [0, 25, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 12,
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
              <Plug className="w-5 h-5 text-[#F59B1B] mr-2" />
              <span className="text-[#F59B1B] font-semibold">Integración Total</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Conecta Todo tu
              <span className="bg-gradient-to-r from-[#F59B1B] to-[#E8890B] bg-clip-text text-transparent">
                {" "}
                Ecosistema Digital
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Unifica todas tus herramientas, aplicaciones y sistemas en una sola plataforma. Más de 200 integraciones
              nativas y API robusta para conexiones personalizadas.
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

      {/* Popular Integrations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Integraciones Más Populares</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conecta instantáneamente con las herramientas que ya usas en tu empresa.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-16">
            {popularIntegrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 hover:border-[#F59B1B]/30 transition-all duration-300 hover:shadow-lg group text-center"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={integration.logo || "/placeholder.svg"}
                    alt={integration.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{integration.name}</h3>
                <p className="text-xs text-gray-500">{integration.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Categorías de Integración</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cobertura completa de todas las áreas críticas de tu negocio con integraciones especializadas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrationCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:border-[#F59B1B]/30 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#F59B1B] to-[#E8890B] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.integrations.map((integration, integrationIndex) => (
                    <span
                      key={integrationIndex}
                      className="px-3 py-1 bg-[#F59B1B]/10 text-[#F59B1B] rounded-full text-sm font-medium"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tecnología de Integración</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Infraestructura robusta y confiable que garantiza conexiones estables y seguras.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
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
