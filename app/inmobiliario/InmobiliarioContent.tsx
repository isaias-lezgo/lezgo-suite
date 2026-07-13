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
import CTABanner from "./sections/CTABanner"

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

      {/* CTA de cierre — última llamada al final de la página */}
      <CTABanner
        variant="dark"
        eyebrow="Empieza hoy"
        title="¿Listo para dejar de perder leads en WhatsApp?"
        subtitle="Agenda una demo gratis y descubre cómo agencias y desarrolladoras en México venden más con Lezgo Suite."
        location="cta_final"
        note="Demo sin costo · Sin tarjeta · Sin permanencia"
      />
    </div>
  )
}
