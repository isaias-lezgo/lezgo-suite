import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      icon: '/favicon-32x32.png',   // single favicon
      apple: '/favicon-32x32.png',  // use the same for Apple devices
    }
  }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased global-bg">
        
        <Navbar />
        <main className="pt-16">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  )
}
