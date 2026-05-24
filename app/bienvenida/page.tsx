import type { Metadata } from "next"
import BienvenidaContent from "./BienvenidaContent"

export const metadata: Metadata = {
  title: "Bienvenida — Lezgo Suite",
  robots: {
    index: false,
    follow: false,
  },
}

export default function BienvenidaPage() {
  return <BienvenidaContent />
}
