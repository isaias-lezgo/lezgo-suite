'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Users, Zap, Target, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Script from 'next/script';

export default function BienvenidaPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Welcome Section */}
      <section className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-[#31f51b] to-green-500 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r  from-[#9aff8f] to-green-100 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>

          {/* Welcome Message */}
          <Badge className="bg-gradient-to-r from-[#31f51b] to-green-500 text-white px-6 py-3 text-base font-medium">
            <Gift className="w-4 h-4 mr-2" />
            ¡Compra Exitosa!
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[#F59B1B] to-orange-500 bg-clip-text text-transparent">
              ¡Bienvenido a
            </span>
            <br />
            <span className="text-black">Lezgo Suite!</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Gracias por confiar en nosotros. Estás a un paso de modernizar completamente tu operación empresarial con la plataforma de gestión más avanzada de Latinoamérica.
          </p>
        </motion.div>
      </section>

      {/* Next Steps Cards */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-black">Próximos Pasos</span>
          </h2>
          <p className="text-lg text-gray-600">
            Te guiaremos para que aproveches al máximo tu nueva plataforma
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: "1",
              title: "Sesión de onboarding personalizada",
              description: "Nuestro equipo te contactará en las próximas 24 horas para configurar tu cuenta personalizada",
              icon: <Users className="h-8 w-8" />,
              color: "from-[#F59B1B] to-orange-600",
              delay: 0.3,
            },
            {
              step: "2",
              title: "Acceso a comunidad con video tutoriales",
              description: "Recibirás entrenamiento completo para dominar todas las funcionalidades de la plataforma. Recibirás un correo con acceso a esta comunidad de manera automática.",
              icon: <Target className="h-8 w-8" />,
              color: "from-[#F59B1B] to-orange-600",
              delay: 0.4,
            },
            {
              step: "3",
              title: "Soporte a través de WhatsApp",
              description: "Puedes contactarnos en el número especial de soporte que encontrarás en tu correo de bienvenida.",
              icon: <Zap className="h-8 w-8" />,
              color: "from-[#F59B1B] to-orange-600",
              delay: 0.5,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: item.delay }}
              className="group"
            >
              <Card className="h-full bg-white border-2 border-orange-100 hover:border-orange-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-2xl font-bold shadow-lg`}>
                      {item.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-black">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Agenda tu onboarding */}
      <section className='p-4 text-center'>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-[#F59B1B] to-orange-500 bg-clip-text text-transparent">
            Agenda tu onboarding
          </span>
          <br />
        </h1>

        <iframe
          src="https://app.lezgosuite.com/widget/booking/AN1LKwpuOmHNHso08b8C"
          style={{ width: "100%", border: "none", overflow: "hidden" }}
          scrolling="no"
          id="xp0MKw05UApkNIuu37jG_1758655720794"
        />
        <Script
          src="https://app.lezgosuite.com/js/form_embed.js"
          strategy="lazyOnload"
        />
      </section>


      {/* CTA Section */}
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-[#F59B1B] to-orange-500 rounded-3xl p-12 text-white shadow-2xl max-w-4xl mx-auto"
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Inicia sesión
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Revisa tu correo con la información enviada e inicia sesión para empezar a explorar Lezgo Suite
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-4 text-lg font-semibold bg-transparent"
            >
              <Link href="https://login.lezgosuite.com" target="_blank" rel="noopener noreferrer">
                Acceder a mi Cuenta
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}