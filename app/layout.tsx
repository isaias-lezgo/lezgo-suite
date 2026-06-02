import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"
import ConditionalNavbar from "@/components/custom/ConditionalNavbar"
import ConditionalFooter from "@/components/custom/ConditionalFooter"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import FloatingWhatsApp from "@/components/custom/FloatingWhatsapp"
import PixelPrincipal from "@/components/custom/Pixel/PixelPrincipal"
import PixelRouter from "@/components/custom/Pixel/PixelRouter"
import GtmRouter from "@/components/custom/Pixel/GtmRouter"
import { GoogleTagManager } from "@next/third-parties/google"
import { Suspense } from "react"
import { JsonLd } from "@/components/custom/JsonLd"
import { SITE_CONFIG } from "@/lib/seo"

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
  title: {
    default: "Lezgo Suite — CRM y Automatización Empresarial para México",
    template: "%s | Lezgo Suite",
  },
  description:
    "Gestiona ventas, automatiza procesos y conecta todos tus canales con IA. La plataforma empresarial #1 para empresas mexicanas.",
  metadataBase: new URL("https://www.lezgosuite.com"),
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/favicon-32x32.png",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: SITE_CONFIG.logoUrl,
  email: SITE_CONFIG.email,
  telephone: SITE_CONFIG.telephone,
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.telephone,
  email: SITE_CONFIG.email,
  openingHours: SITE_CONFIG.openingHours,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address.streetAddress,
    addressLocality: SITE_CONFIG.address.addressLocality,
    addressRegion: SITE_CONFIG.address.addressRegion,
    postalCode: SITE_CONFIG.address.postalCode,
    addressCountry: SITE_CONFIG.address.addressCountry,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <GoogleTagManager gtmId="GTM-P8333HV6" />
      <body>
        <JsonLd data={[organizationJsonLd, localBusinessJsonLd]} />
        <PixelPrincipal />
        <Suspense>
          <PixelRouter />
        </Suspense>
        <Suspense>
          <GtmRouter />
        </Suspense>
        <ConditionalNavbar />
        <main className="pt-16">
          {children}
          <Analytics />
          <SpeedInsights />
          <FloatingWhatsApp />
        </main>
        <ConditionalFooter />
      </body>
    </html>
  )
}
