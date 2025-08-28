"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#081737]/95 via-[#0a1a3a]/95 to-[#081737]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-[#081737]/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="/LOGONUEVO.png"
                alt="Lezgo Suite"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#F59B1B]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <Link
              href="/#funcionalidades"
              className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-sm tracking-wide group"
            >
              Funcionalidades
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F59B1B] to-orange-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/#caracteristicas"
              className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-sm tracking-wide group"
            >
              Carácteristicas
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F59B1B] to-orange-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/#precios"
              className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-sm tracking-wide group"
            >
              Precios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F59B1B] to-orange-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/#testimonios"
              className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-sm tracking-wide group"
            >
              Testimonios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F59B1B] to-orange-400 transition-all duration-300 group-hover:w-full" />
            </Link>
           

            <div className="flex items-center space-x-4">
              <Link
                href="/contacto"
                className="text-gray-300 hover:text-white transition-colors font-medium text-sm tracking-wide"
              >
                Contacto
              </Link>
              <Button className="relative bg-gradient-to-r from-[#F59B1B] to-orange-500 hover:from-orange-500 hover:to-[#F59B1B] text-white font-semibold mx-8 px-6 py-2.5 rounded-full shadow-lg shadow-[#F59B1B]/25 hover:shadow-[#F59B1B]/40 transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10">Comenzar Gratis</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </Button>
            </div>
          </div>

          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-6 border-t border-white/10 bg-gradient-to-b from-transparent to-[#081737]/50 backdrop-blur-sm"
          >
            <div className="flex flex-col space-y-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors font-medium py-2 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/gestion-ventas"
                className="text-gray-300 hover:text-white transition-colors font-medium py-2 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Gestión de Ventas
              </Link>
              <Link
                href="/analisis-empresarial"
                className="text-gray-300 hover:text-white transition-colors font-medium py-2 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Análisis
              </Link>
              <Link
                href="/automatizacion-ia"
                className="text-gray-300 hover:text-white transition-colors font-medium py-2 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Automatización IA
              </Link>
              <Link
                href="/integracion-total"
                className="text-gray-300 hover:text-white transition-colors font-medium py-2 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Integraciones
              </Link>
              <Link
                href="/#contacto"
                className="text-gray-300 hover:text-white transition-colors font-medium py-2 px-4 rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <Button
                className="bg-gradient-to-r from-[#F59B1B] to-orange-500 hover:from-orange-500 hover:to-[#F59B1B] text-white font-semibold rounded-full shadow-lg shadow-[#F59B1B]/25 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Comenzar Gratis
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
