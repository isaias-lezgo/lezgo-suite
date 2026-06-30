'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/navbar'

const ROUTES_WITHOUT_NAVBAR = ['/guia-productiva', '/launchpad']

export default function ConditionalNavbar() {
  const pathname = usePathname()
  if (ROUTES_WITHOUT_NAVBAR.includes(pathname)) return null
  return <Navbar />
}
