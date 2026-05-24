import type { Metadata } from "next"
import { SITE_CONFIG } from "@/lib/seo"
import TerminosCondicionesContent from "./TerminosCondicionesContent"

export const metadata: Metadata = {
  title: "Términos y Condiciones — Lezgo Suite",
  description:
    "Lee los términos y condiciones de uso de Lezgo Suite. Condiciones del servicio, responsabilidades y derechos de los usuarios.",
  openGraph: {
    title: "Términos y Condiciones — Lezgo Suite",
    url: `${SITE_CONFIG.url}/terminos-y-condiciones`,
  },
}

export default function TerminosYCondicionesPage() {
  return <TerminosCondicionesContent />
}
