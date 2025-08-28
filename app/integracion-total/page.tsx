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
      description: "Conecta todos tus canales de comunicación en una sola plataforma",
      integrations: ["WhatsApp Business", "Instagram Direct", "Facebook Messenger", "TikTok", "Telegram", "LinkedIn"],
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Sincroniza tus campañas de email con tu CRM automáticamente",
      integrations: ["Mailchimp", "SendGrid", "Constant Contact", "Campaign Monitor", "ActiveCampaign", "ConvertKit"],
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Integra tu tienda online con gestión de clientes y ventas",
      integrations: ["Shopify", "WooCommerce", "Magento", "PrestaShop", "Mercado Libre", "Amazon"],
    },
    {
      icon: CreditCard,
      title: "Pagos y Facturación",
      description: "Procesa pagos y genera facturas automáticamente",
      integrations: ["Stripe", "PayPal", "MercadoPago", "Wompi", "PayU", "Conekta"],
    },
    {
      icon: Cloud,
      title: "Productividad",
      description: "Sincroniza con tus herramientas de trabajo diarias",
      integrations: ["Google Workspace", "Microsoft 365", "Slack", "Zoom", "Calendly", "Trello"],
    },
    {
      icon: Database,
      title: "Bases de Datos",
      description: "Conecta con sistemas existentes y bases de datos empresariales",
      integrations: ["MySQL", "PostgreSQL", "MongoDB", "Salesforce", "HubSpot", "Pipedrive"],
    },
  ]

  const features = [
    {
      icon: Plug,
      title: "API Robusta",
      description:
        "API RESTful completa que permite integraciones personalizadas con cualquier sistema o aplicación empresarial.",
      benefits: [
        "Documentación completa y ejemplos",
        "Webhooks en tiempo real",
        "Rate limiting inteligente",
        "Autenticación OAuth 2.0",
      ],
    },
    {
      icon: Zap,
      title: "Sincronización en Tiempo Real",
      description: "Datos sincronizados instantáneamente entre todas tus aplicaciones sin demoras ni inconsistencias.",
      benefits: [
        "Sincronización bidireccional",
        "Resolución automática de conflictos",
        "Backup y recuperación automática",
        "Monitoreo de estado en tiempo real",
      ],
    },
    {
      icon: Globe,
      title: "Integraciones Nativas",
      description:
        "Más de 200 integraciones pre-construidas con las herramientas más populares del mercado latinoamericano.",
      benefits: [
        "Configuración en un clic",
        "Mapeo automático de campos",
        "Plantillas predefinidas",
        "Soporte técnico especializado",
      ],
    },
  ]

  const stats = [
    { number: "200+", label: "Integraciones disponibles" },
    { number: "99.9%", label: "Uptime garantizado" },
    { number: "< 100ms", label: "Tiempo de respuesta API" },
    { number: "24/7", label: "Monitoreo automático" },
  ]

  const popularIntegrations = [
    { name: "WhatsApp Business", logo: "/whatsapp-logo.png", category: "Mensajería" },
    { name: "Shopify", logo: "/shopify-logo.png", category: "E-commerce" },
    { name: "Google Workspace", logo: "/google-workspace-logo.png", category: "Productividad" },
    { name: "Stripe", logo: "/stylized-stripe-logo.png", category: "Pagos" },
    { name: "Mailchimp", logo: "/mailchimp-logo.png", category: "Email" },
    { name: "Zoom", logo: "/zoom-logo.png", category: "Videoconferencia" },
    { name: "Salesforce", logo: "/salesforce-logo.png", category: "CRM" },
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
