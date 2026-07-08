'use client'

import Hero from "./sections/Hero"
import LogosClientes from "./sections/LogosClientes"
import WhatsAppDiferenciador from "./sections/WhatsAppDiferenciador"
import Funcionalidades from "./sections/Funcionalidades"
import ComoFunciona from "./sections/ComoFunciona"
import Testimonios from "./sections/Testimonios"

export default function InmobiliarioContent() {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <LogosClientes />
      <WhatsAppDiferenciador />
      <Funcionalidades />
      <ComoFunciona />
      <Testimonios />
      {/* Precios, TablaComparativa, FAQ, DemoForm wired in later tasks */}
    </div>
  )
}
