'use client'
import { useEffect } from 'react'
import { getAttribution } from '@/lib/attribution'

/**
 * Mounted once in the root layout: stores the first-touch attribution cookie
 * on the initial page load of any route (see lib/attribution.ts).
 */
export default function AttributionCapture() {
  useEffect(() => {
    getAttribution()
  }, [])
  return null
}
