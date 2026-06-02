'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/footer'

const ROUTES_WITHOUT_FOOTER = ['/base-conocimiento', '/guia-productiva']

export default function ConditionalFooter() {
  const pathname = usePathname()
  if (ROUTES_WITHOUT_FOOTER.includes(pathname)) return null
  return <Footer />
}
