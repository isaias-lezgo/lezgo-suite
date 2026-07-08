'use client'

import Hero from "./sections/Hero"
import LogosClientes from "./sections/LogosClientes"
import WhatsAppDiferenciador from "./sections/WhatsAppDiferenciador"
import Funcionalidades from "./sections/Funcionalidades"
import ComoFunciona from "./sections/ComoFunciona"
import Testimonios from "./sections/Testimonios"
import Precios from "./sections/Precios"
import TablaComparativa from "./sections/TablaComparativa"
import FAQ from "./sections/FAQ"
import DemoForm from "./sections/DemoForm"

export default function InmobiliarioContent() {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <LogosClientes />
      <WhatsAppDiferenciador />
      <Funcionalidades />
      <ComoFunciona />
      <Testimonios />
      <Precios />
      <TablaComparativa />
      <FAQ />
      <DemoForm />
    </div>
  )
}
