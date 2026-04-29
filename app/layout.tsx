import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import FloatingWhatsApp from "@/components/custom/FloatingWhatsapp"
import Script from "next/script"
import PixelPrincipal from "@/components/custom/Pixel/PixelPrincipal"
import PixelRouter from "@/components/custom/Pixel/PixelRouter" // Corrected import path
import { Suspense } from "react"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Lezgo Suite - La Suite Empresarial que Transforma Organizaciones",
  description:
    "Potencia tu empresa con la plataforma integral más avanzada del mercado. Gestión completa de CRM, automatización inteligente y analytics empresariales en una sola solución escalable y segura.",
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/favicon-32x32.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69f26a5a1913345eeb7ba164"
          data-source="WEB_USER"
          strategy="afterInteractive"
        />
        <PixelPrincipal />
        <Suspense>
          <PixelRouter />
        </Suspense>
        <Navbar />
        <main className="pt-16">
          {children}
          <Analytics />
          <SpeedInsights />
          <FloatingWhatsApp />
          
        </main>
        <Footer />
      </body>
    </html>
  )
}