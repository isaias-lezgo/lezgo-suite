'use client'
import { useEffect } from 'react'
import { getAttribution } from '@/lib/attribution'

/**
 * Mounted once in the root layout: on the initial page load of any route,
 * stores the attribution cookie if the URL carries campaign params
 * (see lib/attribution.ts).
 */
export default function AttributionCapture() {
  useEffect(() => {
    getAttribution()
  }, [])
  return null
}
