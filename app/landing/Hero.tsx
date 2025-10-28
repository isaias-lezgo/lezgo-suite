import React from 'react'
import { motion } from "framer-motion"

import { HeroButtons } from '@/components/custom/BotonesLanding'
import { Badge } from '@/components/ui/badge'

const HeroSection = () => {
  return (
    <section className=" flex md:py-16 px-2 justify-center ">
          <div className="container mx-auto  whitespace-normal gap-8 flex flex-col lg:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ willChange: "transform, opacity" }}
              className="space-y-6 sm:space-y-8 lg:space-y-10"
            >
              <div className="space-y-3">
                <Badge className="hidden lg:block bg-gradient-to-r from-[#F59B1B] to-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
                  🚀 Plataforma Empresarial #1 en Latinoamérica
                </Badge>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative px-4 md: block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Video Movil */}
                  <div className="aspect-video bg-gradient-to-br lg:hidden from-gray-900 to-gray-800 flex relative rounded-2xl overflow-hidden">
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
                <div>
                  <h1 className="text-3xl text-center lg:text-left  md:text-3xl lg:text-4xl xl:text-5xl font-bold font-heading py-8 leading-tight">
                    <span className="bg-gradient-to-r from-[#F59B1B] to-orange-600 bg-clip-text text-transparent">
                      Gestiona tu negocio
                    </span>
                    <br />
                    <span className="text-black">con este CRM</span>
                    <br />
                    <span className="text-black">implementado con IA</span>
                  </h1>
                  <p className="text-center lg:text-left sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    Estás a un clic de probar Lezgo Suite, la plataforma todo en uno de marketing digital y ventas que te ayudará a crecer tu negecio y tus ventas de manera acelerada
                  </p>
                </div>
              </div>
              <HeroButtons />
            </motion.div>

            {/* Video Compu */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative px-4 hidden lg:block"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex relative rounded-2xl overflow-hidden">
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

  )
}

export default HeroSection


