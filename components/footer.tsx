'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {

  return (
    <footer className="bg-[#081737] text-white">
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

              <Button
                asChild
                size="lg"
                className="bg-white text-[#F59B1B] hover:bg-orange-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href="https://app.lezgosuite.com/payment-link/68ae46632ba55c5eda290d56" target="_blank" rel="noopener noreferrer">
                  Comenzar Prueba Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>



              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#F59B1B] px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
              >
                <a href="https://app.lezgosuite.com/widget/bookings/conocelezgosuite" target="_blank" rel="noopener noreferrer">
                  Habla con un especialista
                </a>
              </Button>

            </div>
          </motion.div>
        </div>
      </section>


      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <img src="/LOGONUEVO.png" alt="Lezgo Suite" className="h-8 w-auto" />
            <p className="text-gray-300 leading-relaxed">
              La plataforma empresarial más avanzada para transformar tu negocio con IA y automatizaciones.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#F59B1B]">Producto</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#funcionalidades" className="hover:text-white transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="/#caracteristicas" className="hover:text-white transition-colors">
                  Carácteristicas
                </Link>
              </li>
              <li>
                <Link href="#precios" className="hover:text-white transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#testimonios" className="hover:text-white transition-colors">
                  Testimonios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#F59B1B]">Empresa</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>

              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#F59B1B]">Soporte</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Centro de Ayuda - PROXIMAMENTE
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Documentación - PROXIMAMENTE
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Comunidad - PROXIMAMENTE
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Lezgo Suite. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacidad
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
