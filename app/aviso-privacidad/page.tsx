import type { Metadata } from "next"
import { SITE_CONFIG } from "@/lib/seo"
import AvisoPrivacidadContent from "./AvisoPrivacidadContent"

export const metadata: Metadata = {
  title: "Aviso de Privacidad — Lezgo Suite",
  description:
    "Conoce cómo Lezgo Suite recopila, usa y protege tu información personal. Aviso de privacidad conforme a la legislación mexicana.",
  openGraph: {
    title: "Aviso de Privacidad — Lezgo Suite",
    url: `${SITE_CONFIG.url}/aviso-privacidad`,
  },
}

export default function AvisoPrivacidadPage() {
  return <AvisoPrivacidadContent />
}
