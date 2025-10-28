import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Link2, MessageSquare, Zap } from 'lucide-react'
import { motion } from "framer-motion"
import React from 'react'

const Funcionalidades = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
            <span className="text-black">El CRM que </span>
            <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
              lo tiene todo
            </span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Responde 24/7 con IA conversacional en WhatsApp, Instagram y más.",
              icon: <MessageSquare className="h-8 w-8" />,
              video: "/IA.mp4",
              color: "from-[#F59B1B] to-orange-600",
              delay: 0,
            },
            {
              title: "Reportes y analítica en tiempo real para decisiones inteligentes.",
              icon: <BarChart3 className="h-8 w-8" />,
              video: "/Informes.mp4",
              color: "from-orange-500 to-[#F59B1B]",
              delay: 0.1,
            },
            {
              title: "+200 integraciones nativas. Meta Ads, Shopify, Zapier y más.",
              icon: <Link2 className="h-8 w-8" />,
              video: "/Redes Sociales.mp4",
              color: "from-[#F59B1B] to-orange-700",
              delay: 0.2,
            },
            {
              title: "Automatiza campañas multi-canal y maximiza cierres de ventas.",
              icon: <Zap className="h-8 w-8" />,
              video: "/Workflows.mp4",
              color: "from-orange-600 to-[#F59B1B]",
              delay: 0.3,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: item.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-72 md:h-56 lg:h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <video
                      src={item.video}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`}
                    />
                  </div>
                  <div className="p-6">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4 shadow-lg`}
                    >
                      {item.icon}
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Funcionalidades