"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { track } from "@vercel/analytics"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleTrackingAndNavigate = (eventName: string, link: string, params?: Record<string, any>) => {
    // Vercel Analytics
    track(eventName, params);

    // Facebook Pixel
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("trackCustom", eventName, params);
    }
  };


  // Centralized navigation links for consistency
  const navLinks = [
    { href: "/#funcionalidades", label: "Funcionalidades" },
    { href: "/#caracteristicas", label: "Características" },
    { href: "/#precios", label: "Precios" },
    { href: "/#testimonios", label: "Testimonios" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#081737]/95 via-[#0a1a3a]/95 to-[#081737]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-[#081737]/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group flex-shrink-0">
            <Link href="/" className="cursor-pointer">
              <div className="relative">
                <img
                  src="/LOGONUEVO.png"
                  alt="Lezgo Suite"
                  className="h-10 w-auto sm:h-12 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#F59B1B]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - now activates at the 'lg' breakpoint */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-sm tracking-wide group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F59B1B] to-orange-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <div className="flex items-center space-x-3 xl:space-x-4 xl:ml-8">
              <Link
                href="/contacto"
                className="text-gray-300 hover:text-white transition-colors font-medium text-sm tracking-wide whitespace-nowrap"
              >
                Contacto
              </Link>
              <Button
                asChild
                className="relative bg-gradient-to-r from-[#F59B1B] to-orange-500 hover:from-orange-500 hover:to-[#F59B1B] text-white font-semibold px-4 xl:px-6 py-2.5 rounded-full shadow-lg shadow-[#F59B1B]/25 hover:shadow-[#F59B1B]/40 transition-all duration-300 transform hover:scale-105 text-sm whitespace-nowrap"
              >
                <a href="https://app.lezgosuite.com/payment-link/68ae46632ba55c5eda290d56">
                  <span className="relative z-10">Comenzar Gratis</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border border-orange-400 bg-transparent text-white hover:bg-orange-400/10 hover:text-white text-sm whitespace-nowrap px-4 xl:px-6"
              >
                <a href="https://login.lezgosuite.com">
                  <span className="relative z-10">Iniciar Sesión</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button - now hidden starting at the 'lg' breakpoint */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - now hidden starting at the 'lg' breakpoint */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden py-6 border-t border-white/10"
          >
            <div className="flex flex-col space-y-5 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors font-medium text-center py-2 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contacto"
                className="text-gray-300 hover:text-white transition-colors font-medium text-center py-2 rounded-lg hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>

              
              <div className="pt-5 border-t border-white/10 flex flex-col space-y-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-[#F59B1B] to-orange-500 hover:from-orange-500 hover:to-[#F59B1B] text-white font-semibold rounded-full shadow-lg shadow-[#F59B1B]/25 transition-all duration-300"
                  onClick={(e) => {
                    // 1. Prevent the link from navigating immediately
                    e.preventDefault();
                    // 2. Close the menu
                    setIsMenuOpen(false);
                    // 3. Call your tracking and navigation function
                    handleTrackingAndNavigate(
                      "Prueba Gratis Navbar",
                      "https://app.lezgosuite.com/payment-link/68ae46632ba55c5eda290d56"
                    );
                  }}
                >
                  <a href="https://app.lezgosuite.com/payment-link/68ae46632ba55c5eda290d56">
                    Comenzar Gratis
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border border-orange-400 bg-transparent text-white hover:bg-orange-400/10 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <a href="https://login.lezgosuite.com">Iniciar Sesión</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}