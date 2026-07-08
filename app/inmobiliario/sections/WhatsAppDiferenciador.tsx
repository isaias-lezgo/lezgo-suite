'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BadgeCheck, Users, Eye } from "lucide-react"
import { AgendarDemoButton } from "../BotonesInmobiliario"

export default function WhatsAppDiferenciador() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
            Todo el WhatsApp de tu equipo, en una sola pantalla.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            El mayor problema de una inmobiliaria no es la falta de leads — es
            perderlos. Cuando cada asesor lleva sus chats por su cuenta, los
            prospectos se enfrían, se olvidan o se van con la competencia. Lezgo
            Suite conecta el WhatsApp de todo tu equipo para que nada se pierda y
            tú tengas el control.
          </p>
        </motion.div>

        <p className="text-center text-base sm:text-lg font-semibold text-gray-900 max-w-3xl mx-auto mb-10">
          Trabajamos con todas las versiones de WhatsApp disponibles. La clave
          está en combinarlas para que tu operación tenga alcance y control al
          mismo tiempo.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="h-full bg-white border-2 border-gray-200 hover:border-[#F59B1B]/50 shadow-lg transition-all duration-300">
            <CardContent className="p-7">
              <div className="w-12 h-12 rounded-xl bg-[#F59B1B]/10 flex items-center justify-center mb-5">
                <BadgeCheck className="w-6 h-6 text-[#F59B1B]" />
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                WhatsApp API oficial
              </h3>
              <p className="text-gray-600 leading-relaxed">
                La conexión oficial de WhatsApp Business API: número verificado,
                envíos masivos permitidos, automatizaciones y bots de IA sin
                riesgo de bloqueo. Es el motor para atender a escala sin depender
                del celular de nadie.
              </p>
            </CardContent>
          </Card>

          <Card className="h-full bg-white border-2 border-gray-200 hover:border-[#F59B1B]/50 shadow-lg transition-all duration-300">
            <CardContent className="p-7">
              <div className="w-12 h-12 rounded-xl bg-[#F59B1B]/10 flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-[#F59B1B]" />
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                El WhatsApp de tu fuerza de ventas, centralizado
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Cada asesor conecta su WhatsApp y todas sus conversaciones se
                reflejan dentro de Lezgo Suite. Tú supervisas cada chat en tiempo
                real, mides respuestas y proteges la cartera de la empresa — sin
                que el asesor tenga que cambiar su forma de trabajar.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto mt-6 rounded-2xl bg-orange-50 border border-orange-200 p-6 sm:p-7">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold text-gray-900">La combinación más común:</span>{" "}
            WhatsApp API para atención masiva, bots y automatización + la conexión
            del WhatsApp de cada asesor para que ninguna conversación del equipo
            se quede fuera de tu vista. En la demo definimos contigo la
            combinación exacta según cómo opera tu inmobiliaria.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-6 rounded-2xl bg-gray-900 text-white p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#F59B1B] flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <p className="leading-relaxed text-gray-100">
              <span className="font-bold text-white">Para el líder del equipo:</span>{" "}
              supervisa en tiempo real qué está respondiendo cada asesor, mide
              tiempos de respuesta, detecta oportunidades abandonadas y protege la
              cartera de leads de tu empresa. Si un asesor se va, sus
              conversaciones y contactos se quedan contigo.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <AgendarDemoButton location="whatsapp">
            Quiero ver cómo funciona
          </AgendarDemoButton>
        </div>
      </div>
    </section>
  )
}
