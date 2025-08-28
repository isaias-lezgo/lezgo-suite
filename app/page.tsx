"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  BarChart3,
  Zap,
  CheckCircle,
  Star,
  Play,
  ArrowRight,
  Building2,
  TrendingUp,
  Target,
  Workflow,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating background elements */}

       
        <motion.div
          className="absolute w-[80%] h-[80%] bg-gradient-to-br blur-3xl from-orange-200 via-[#F59B1B] to-orange-400/50 opacity-5 rounded-2xl"
          animate={{
            x: [-200, -120, 80, -60, 100, 200, -80, -120, -200],
            y: [50, -50, 80, -200, 60],
            scale: [1, 1.1, 0.95, 1.05, 1],
            opacity: [0.15, 0.25, 0.2, 0.3, 0.18],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />



        {/* Floating particles */}
        {[
          { left: 20, top: 30, duration: 3.2, delay: 0.5, size: 'w-3 h-3', color: 'bg-amber-400', blur: false },
          { left: 80, top: 15, duration: 4.1, delay: 1.2, size: 'w-2 h-2', color: 'bg-orange-300', blur: true },
          { left: 45, top: 70, duration: 3.8, delay: 0.8, size: 'w-4 h-4', color: 'bg-yellow-400', blur: false },
          { left: 90, top: 85, duration: 3.5, delay: 1.5, size: 'w-1.5 h-1.5', color: 'bg-amber-500', blur: true },
          { left: 15, top: 60, duration: 4.3, delay: 0.3, size: 'w-3 h-3', color: 'bg-orange-400', blur: false },
          { left: 70, top: 40, duration: 3.9, delay: 1.0, size: 'w-2.5 h-2.5', color: 'bg-yellow-300', blur: true },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute ${particle.size} ${particle.color} rounded-full ${particle.blur ? 'blur-[10px]' : 'blur-[0px]'
              }`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              boxShadow: particle.blur
                ? '0 0 20px rgba(245, 155, 27, 0.3)'
                : '0 0 10px rgba(245, 155, 27, 0.2)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content with relative positioning */}
      <div className="relative">


        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="space-y-2">
                <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2 text-sm font-medium">
                  🚀 Plataforma Empresarial #1 en Latinoamérica
                </Badge>

                <h1 className="text-5xl lg:text-7xl font-bold font-heading leading-tight">
                  <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
                    Transformación
                  </span>
                  <br />
                  <span className="text-black">Empresarial</span>
                  <br />
                  <span className="text-black">Completa</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Lezgo Suite revoluciona la gestión empresarial con IA avanzada, automatizaciones inteligentes e integraciones todo-en-uno para empresas que buscan liderar el futuro.
                </p>
              </div>

              <div className="flex flex-col gap-4">

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Comienza tu prueba de 30 días GRATIS
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#F59B1B] text-[#F59B1B] hover:bg-[#F59B1B] hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  Habla con un especialista
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F59B1B]">250K+</div>
                  <div className="text-sm text-gray-600">Empresas Globales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F59B1B]">99.99%</div>
                  <div className="text-sm text-gray-600">Uptime Empresarial</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F59B1B]">150+</div>
                  <div className="text-sm text-gray-600">Países Activos</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center relative rounded-2xl overflow-hidden">
                <video
                  className="w-full h-full"
                  poster=""
                  muted
                  loop
                  autoPlay
                  playsInline
                  controls
                >
                  <source src="/VIDEOSUITE.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="funcionalidades" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2 mb-6">
                <Building2 className="w-4 h-4 mr-2" />
                Funcionalidades Empresariales
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
                  Plataforma Integral
                </span>
                <br />
                <span className="text-black">para Empresas Modernas</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Descubre cómo Lezgo Suite transforma cada aspecto de tu negocio con tecnología de vanguardia
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  category: "Gestión de Ventas",
                  features: [
                    "CRM de Contactos",
                    "Pipeline de Oportunidades",
                    "Tareas y Recordatorios",
                  ],
                  icon: <Target className="h-8 w-8" />,
                  color: "from-[#F59B1B] to-orange-600",
                  delay: 0,
                  link: "/gestion-ventas",
                },
                {
                  category: "Análisis y Reportes",
                  features: [
                    "Reportes de Conversión",
                    "Seguimiento de Embudos",
                    "Analítica de Campañas",
                  ],
                  icon: <BarChart3 className="h-8 w-8" />,
                  color: "from-orange-500 to-[#F59B1B]",
                  delay: 0.1,
                  link: "/analisis-reportes",
                },
                {
                  category: "Automatización",
                  features: [
                    "Workflows Dinámicos",
                    "Automatización de Correos y Mensajería",
                    "Respuestas Automáticas",
                  ],
                  icon: <Zap className="h-8 w-8" />,
                  color: "from-[#F59B1B] to-orange-700",
                  delay: 0.2,
                  link: "/automatizacion",
                },
                {
                  category: "Integraciones",
                  features: [
                    "Integración con Calendarios",
                    "Conexión nativa con Redes Sociales",
                    "APIs y Webhooks",
                  ],
                  icon: <Workflow className="h-8 w-8" />,
                  color: "from-orange-600 to-[#F59B1B]",
                  delay: 0.3,
                  link: "/integraciones",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: item.delay }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    <CardContent className="p-8 relative z-10">
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-6 shadow-lg`}
                      >
                        {item.icon}
                      </div>

                      <h3 className="text-xl font-bold font-heading mb-4 text-black group-hover:text-[#F59B1B] transition-colors">
                        {item.category}
                      </h3>

                      <ul className="space-y-3">
                        {item.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors"
                          >
                            <CheckCircle className="h-4 w-4 text-[#F59B1B] mr-3 flex-shrink-0" />
                            <span className="text-sm font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + item.delay }}
                        className="mt-6"
                      >
                        <Link href={item.link}>
                          <Button
                            variant="ghost"
                            className="text-[#F59B1B] cursor-pointer p-0 font-semibold"
                          >
                            Explorar más
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-12 overflow-hidden">
          {/* Liquid Glass Gradient Background */}
          <div className="justify-center h-1 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-600 rounded-full my-8"></div>
          <div className="container relative mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {[
                { value: "250K+", label: "Empresas Globales", delay: 0 },
                { value: "99.9%", label: "Uptime Empresarial", delay: 0.1 },
                { value: "50M+", label: "Contactos Procesados", delay: 0.2 },
                { value: "150+", label: "Países Activos", delay: 0.3 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg"
                >
                  <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F59B1B] to-orange-600 drop-shadow-md">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-lg font-medium text-gray-800">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="justify-center h-1 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-600 rounded-full my-8"></div>

        </section>


        <section id="caracteristicas" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2 mb-6">
                <Star className="w-4 h-4 mr-2" />
                Características Destacadas
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
                  Potencia Empresarial
                </span>
                <br />
                <span className="text-black">Sin Límites</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Descubre las capacidades que hacen de Lezgo Suite la elección preferida de empresas líderes
              </p>
            </motion.div>

            <div className="space-y-32">
              {[
                {
                  title: "Marketing Inteligente",
                  subtitle: "Campañas que Convierten",
                  description:
                    "Automatiza campañas multi-canal con IA predictiva. Segmentación avanzada, personalización en tiempo real y análisis de comportamiento para maximizar el ROI de cada campaña.",
                  features: [
                    "Segmentación IA",
                    "Automatización Multi-canal",
                    "ROI Predictivo",
                    "Personalización Dinámica",
                  ],
                  image: "/MOCKUP1.png",
                  reverse: false,
                },
                {
                  title: "CRM Inteligente",
                  subtitle: "Ventas Optimizadas",
                  description:
                    "Gestiona el ciclo completo de ventas con IA predictiva. Pipeline inteligente, scoring automático de leads y predicciones ML para cerrar más deals.",
                  features: ["Pipeline Inteligente", "Lead Scoring IA", "Predicciones ML", "360° Cliente"],
                  image: "/MOCKUP2.png",
                  reverse: true,
                },
                {
                  title: "IA en tus diferentes canales de contacto",
                  subtitle: "Comunicación Inteligente",
                  description:
                    "Integra IA conversacional en todos tus canales de comunicación. Respuestas automáticas inteligentes, chatbots avanzados y atención 24/7 en WhatsApp, Instagram, TikTok y más.",
                  features: ["WhatsApp Business", "Instagram Direct", "TikTok Messaging", "Chatbots IA"],
                  image: "/MOCKUP3.jpg",
                  reverse: false,
                },
                {
                  title: "Integraciones Empresariales",
                  subtitle: "Ecosistema Conectado",
                  description:
                    "Conecta todas tus herramientas empresariales en un ecosistema unificado. APIs robustas, conectores nativos y sincronización en tiempo real con más de 500 aplicaciones.",
                  features: ["500+ Integraciones", "APIs Empresariales", "Sync Tiempo Real", "Conectores Nativos"],
                  image: "/MOCKUP4.jpg",
                  reverse: true,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${item.reverse ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div className={`space-y-8 ${item.reverse ? "lg:col-start-2" : ""}`}>
                    <div className="space-y-4">
                      <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-3 py-1">
                        {item.subtitle}
                      </Badge>
                      <h3 className="text-3xl lg:text-4xl font-bold font-heading text-black">{item.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {item.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-[#F59B1B]/10"
                        >
                          <CheckCircle className="h-5 w-5 text-[#F59B1B] flex-shrink-0" />
                          <span className="text-sm font-medium text-black">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button className="bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white px-6 py-3 font-semibold">
                      Explorar Característica
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className={`relative ${item.reverse ? "lg:col-start-1" : ""}`}
                  >
                    <div className={`relative  ${index === 0 || index === 1 ? 'rounded-none' : 'rounded-2xl backdrop-blur-sm bg-white/80 shadow-2xl border border-[#F59B1B]/10'} overflow-hidden `}>
                      <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-auto" />

                      {index !== 0 && index !== 1 && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      )}
                    </div>

                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#F59B1B] to-orange-600 rounded-full opacity-20"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="precios" className="py-24 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2 mb-6">
                💰 Planes Empresariales
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
                  Inversión Inteligente
                </span>
                <br />
                <span className="text-black">para tu Crecimiento</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Elige el plan que se adapte a las necesidades de tu empresa
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$99",
                  period: "/mes",
                  description: "Perfecto para equipos pequeños",
                  features: [
                    "Hasta 10 usuarios",
                    "CRM básico",
                    "Reportes estándar",
                    "Soporte por email",
                    "Integraciones básicas",
                  ],
                  popular: false,
                  color: "border-gray-200",
                },
                {
                  name: "Professional",
                  price: "$299",
                  period: "/mes",
                  description: "Ideal para empresas en crecimiento",
                  features: [
                    "Hasta 100 usuarios",
                    "CRM avanzado + IA",
                    "Análisis predictivo",
                    "Soporte prioritario",
                    "Todas las integraciones",
                    "Automatización avanzada",
                  ],
                  popular: true,
                  color: "border-[#F59B1B]",
                },
                {
                  name: "Enterprise",
                  price: "Personalizado",
                  period: "",
                  description: "Para grandes organizaciones",
                  features: [
                    "Usuarios ilimitados",
                    "Personalización completa",
                    "Consultoría dedicada",
                    "SLA garantizado",
                    "Implementación guiada",
                    "Soporte 24/7",
                  ],
                  popular: false,
                  color: "border-gray-200",
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2">
                        Más Popular
                      </Badge>
                    </div>
                  )}

                  <Card
                    className={`h-full bg-white/80 backdrop-blur-sm border-2 ${plan.color} ${plan.popular ? "shadow-2xl scale-105" : "shadow-lg"} hover:shadow-2xl transition-all duration-300`}
                  >
                    <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold font-heading mb-2 text-black">{plan.name}</h3>
                        <p className="text-gray-600 mb-4">{plan.description}</p>
                        <div className="mb-6">
                          <span className="text-4xl font-bold text-[#F59B1B]">{plan.price}</span>
                          <span className="text-gray-600">{plan.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-[#F59B1B] mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full ${plan.popular
                          ? "bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white"
                          : "border-2 border-[#F59B1B] text-[#F59B1B] hover:bg-[#F59B1B] hover:text-white"
                          } font-semibold py-3 transition-all duration-300`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.name === "Enterprise" ? "Contactar Ventas" : "Comenzar Ahora"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2 mb-6">
                ⭐ Testimonios Empresariales
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
                  Líderes Confían
                </span>
                <br />
                <span className="text-black">en Lezgo Suite</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Lezgo Suite transformó completamente nuestra operación. El ROI fue del 340% en el primer año.",
                  author: "María González",
                  position: "CEO, TechCorp Latinoamérica",
                  company: "Fortune 500",
                  rating: 5,
                },
                {
                  quote: "La automatización IA nos permitió escalar 10x sin aumentar el equipo. Increíble plataforma.",
                  author: "Carlos Mendoza",
                  position: "Director de Operaciones",
                  company: "Grupo Empresarial Global",
                  rating: 5,
                },
                {
                  quote: "Implementación perfecta y soporte excepcional. Nuestras ventas aumentaron 250% en 6 meses.",
                  author: "Ana Rodríguez",
                  position: "VP de Ventas",
                  company: "Multinacional Retail",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-[#F59B1B] fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      <div>
                        <div className="font-semibold text-black">{testimonial.author}</div>
                        <div className="text-sm text-gray-600">{testimonial.position}</div>
                        <div className="text-sm text-[#F59B1B] font-medium">{testimonial.company}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 relative">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2 mb-6">
                ❓ Preguntas Frecuentes
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
                  Resolvemos
                </span>
                <br />
                <span className="text-black">tus Dudas</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  question: "¿Qué incluye la implementación empresarial?",
                  answer:
                    "Incluye migración completa de datos, configuración personalizada, capacitación del equipo, integración con sistemas existentes y soporte dedicado durante los primeros 90 días.",
                },
                {
                  question: "¿Cómo garantizan la seguridad de nuestros datos?",
                  answer:
                    "Utilizamos encriptación AES-256, certificación ISO 27001, servidores en múltiples regiones, backups automáticos y cumplimos con GDPR y regulaciones locales de protección de datos.",
                },
                {
                  question: "¿Puedo integrar Lezgo Suite con nuestros sistemas actuales?",
                  answer:
                    "Sí, ofrecemos más de 500 integraciones nativas y APIs robustas. Nuestro equipo técnico asegura una integración perfecta con ERP, contabilidad, marketing y otras herramientas empresariales.",
                },
                {
                  question: "¿Qué tipo de soporte técnico ofrecen?",
                  answer:
                    "Ofrecemos soporte 24/7 para planes Enterprise, soporte prioritario para Professional, y soporte por email para Starter. Incluye chat en vivo, llamadas técnicas y un gerente de cuenta dedicado.",
                },
                {
                  question: "¿Cómo funciona la escalabilidad de la plataforma?",
                  answer:
                    "La plataforma escala automáticamente según tus necesidades. Desde equipos pequeños hasta organizaciones con miles de usuarios, sin límites de almacenamiento o procesamiento.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <button
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-[#F59B1B]/5 transition-colors"
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      >
                        <span className="font-semibold text-black text-lg">{faq.question}</span>
                        <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="h-5 w-5 text-[#F59B1B]" />
                        </motion.div>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ height: openFaq === index ? "auto" : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed">{faq.answer}</div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-gradient-to-br from-[#F59B1B] to-orange-600 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl lg:text-6xl font-bold font-heading text-white mb-6">
                Transforma tu Empresa
                <br />
                <span className="text-orange-100">Hoy Mismo</span>
              </h2>
              <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                Únete a más de 250,000 empresas que ya confían en Lezgo Suite para impulsar su crecimiento
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a href="https://www.lezgosuite.com/payment-link/68ae46632ba55c5eda290d56" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-white text-[#F59B1B] hover:bg-orange-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Comenzar Prueba Gratuita
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>

                <a href="https://www.lezgosuite.com/widget/bookings/conocelezgosuite" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#F59B1B] px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
                  >
                    Habla con un especialista
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
