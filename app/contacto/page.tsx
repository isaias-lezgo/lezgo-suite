"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Building2,
  Users,
  MessageSquare,
  Globe,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    cargo: "",
    industria: "",
    mensaje: "",
    newsletter: false,
    contacto: "email",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Webhook URL - replace with your actual webhook endpoint
      const webhookUrl = "https://hook.us1.make.com/18p4tna5wx6g3qfhj7du7q7k1inouh2g"
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "Lezgo Suite Contact Form",
        }),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        toast({
          title: "¡Mensaje enviado exitosamente!",
          description: "Nos pondremos en contacto contigo pronto.",
        })
        // Reset form
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          empresa: "",
          cargo: "",
          industria: "",
          mensaje: "",
          newsletter: false,
          contacto: "email",
        })
      } else {
        throw new Error("Error al enviar el mensaje")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error al enviar el mensaje",
        description: "Por favor, intenta nuevamente o contáctanos directamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F59B1B]/5 to-orange-600/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-[#F59B1B] to-orange-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">¡Mensaje Enviado!</h1>
          <p className="text-xl text-gray-600 max-w-md">
            Gracias por contactarnos. Uno de nuestros especialistas se pondrá en contacto contigo en las próximas 24 horas.
          </p>
          <Button
            onClick={() => setSubmitSuccess(false)}
            className="bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white"
          >
            Enviar otro mensaje
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <Badge className="bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-4 py-2 mb-6">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contacto Directo
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
                  Conectemos
                </span>
                <br />
                <span className="text-black">y Transformemos tu Negocio</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                ¿Listo para llevar tu empresa al siguiente nivel? Nuestro equipo de especialistas está aquí para ayudarte a implementar la solución perfecta para tu negocio.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold font-heading mb-6 text-gray-900">
                      Envíanos tu mensaje
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre" className="text-gray-700 font-medium">
                            Nombre completo *
                          </Label>
                          <Input
                            id="nombre"
                            value={formData.nombre}
                            onChange={(e) => handleInputChange("nombre", e.target.value)}
                            required
                            className="border-gray-300 focus:border-[#F59B1B] focus:ring-[#F59B1B] placeholder-gray-500"
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-700 font-medium">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            className="border-gray-300 focus:border-[#F59B1B] focus:ring-[#F59B1B] placeholder-gray-500"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefono" className="text-gray-700 font-medium">
                            Teléfono
                          </Label>
                          <Input
                            id="telefono"
                            type="tel"
                            value={formData.telefono}
                            onChange={(e) => handleInputChange("telefono", e.target.value)}
                            className="border-gray-300 focus:border-[#F59B1B] focus:ring-[#F59B1B] placeholder-gray-500"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="empresa" className="text-gray-700 font-medium">
                            Empresa
                          </Label>
                          <Input
                            id="empresa"
                            value={formData.empresa}
                            onChange={(e) => handleInputChange("empresa", e.target.value)}
                            className="border-gray-300 focus:border-[#F59B1B] focus:ring-[#F59B1B] placeholder-gray-500"
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cargo" className="text-gray-700 font-medium">
                            Cargo
                          </Label>
                          <Input
                            id="cargo"
                            value={formData.cargo}
                            onChange={(e) => handleInputChange("cargo", e.target.value)}
                            className="border-gray-300 focus:border-[#F59B1B] focus:ring-[#F59B1B] placeholder-gray-500"
                            placeholder="CEO, Director, etc."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="industria" className="text-gray-700 font-medium">
                            Industria
                          </Label>
                          <Select value={formData.industria} onValueChange={(value) => handleInputChange("industria", value)}>
                            <SelectTrigger className="border-gray-300 focus:border-[#F59B1B] focus:ring-[#F59B1B] text-black placeholder-gray-500">
                              <SelectValue placeholder="Selecciona tu industria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tecnologia">Tecnología</SelectItem>
                              <SelectItem value="finanzas">Finanzas</SelectItem>
                              <SelectItem value="salud">Salud</SelectItem>
                              <SelectItem value="educacion">Educación</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="manufactura">Manufactura</SelectItem>
                              <SelectItem value="servicios">Servicios</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mensaje" className="text-gray-700 font-medium">
                          Mensaje *
                        </Label>
                        <Textarea
                          id="mensaje"
                          value={formData.mensaje}
                          onChange={(e) => handleInputChange("mensaje", e.target.value)}
                          required
                          rows={4}
                          className="border-gray-300 focus:border-[#F59B1B] focus:ring-[#F59B1B] resize-none placeholder-gray-500"
                          placeholder="Cuéntanos sobre tu proyecto, necesidades o cualquier consulta que tengas..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contacto" className="text-gray-700 font-medium">
                          Preferencia de contacto
                        </Label>
                        <Select value={formData.contacto} onValueChange={(value) => handleInputChange("contacto", value)}>
                          <SelectTrigger className="border-gray-300 focus:border-[#F59B1B] focus:ring-[#F59B1B] text-black placeholder-gray-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="telefono">Teléfono</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                          className="border-gray-300 data-[state=checked]:bg-[#F59B1B] data-[state=checked]:border-[#F59B1B]"
                        />
                        <Label htmlFor="newsletter" className="text-sm text-gray-600">
                          Suscribirme al newsletter para recibir actualizaciones y tips empresariales
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Enviando...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Send className="w-5 h-5" />
                            <span>Enviar mensaje</span>
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-heading text-gray-900">
                    Información de contacto
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Nuestro equipo está disponible para ayudarte con cualquier consulta sobre Lezgo Suite y cómo puede transformar tu empresa.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#F59B1B] to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">contacto@lezgosuite.com</p>
                      <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#F59B1B] to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Lun-Vie 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#F59B1B] to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Oficina</h4>
                      <p className="text-gray-600">Miami, FL - Estados Unidos</p>
                      <p className="text-sm text-gray-500">Sede principal</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 relative">
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

            <div className="space-y-6">
              {[
                {
                  question: "¿Cuánto tiempo toma implementar Lezgo Suite?",
                  answer: "La implementación básica toma entre 24-48 horas. Para configuraciones más complejas, nuestro equipo puede completar la implementación en 1-2 semanas, dependiendo de tus necesidades específicas.",
                },
                {
                  question: "¿Ofrecen soporte técnico en español?",
                  answer: "Sí, nuestro equipo de soporte técnico habla español nativo y está disponible 24/7 para ayudarte con cualquier consulta o problema técnico que puedas tener.",
                },
                {
                  question: "¿Puedo probar la plataforma antes de comprar?",
                  answer: "¡Absolutamente! Ofrecemos una prueba gratuita de 30 días sin compromiso. Puedes explorar todas las funcionalidades y ver cómo Lezgo Suite puede transformar tu negocio.",
                },
                {
                  question: "¿Qué incluye el soporte técnico?",
                  answer: "Nuestro soporte técnico incluye asistencia por chat en vivo, llamadas telefónicas, videollamadas, documentación completa, videos tutoriales y un gerente de cuenta dedicado para empresas Enterprise.",
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
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 text-lg mb-3">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
                ¿Listo para Transformar
                <br />
                <span className="text-orange-100">tu Empresa?</span>
              </h2>
              <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                Únete a miles de empresas que ya confían en Lezgo Suite para impulsar su crecimiento y eficiencia operativa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-[#F59B1B] hover:bg-orange-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Comenzar Prueba Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#F59B1B] px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  Agendar Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
