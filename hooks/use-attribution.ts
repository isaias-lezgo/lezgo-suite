"use client"

import { useEffect, useState } from "react"
import {
  BOOKING_URL,
  WHATSAPP_BASE_MESSAGE,
  WHATSAPP_PHONE,
  getWhatsAppUrl,
  withAttributionParams,
} from "@/lib/attribution"

/**
 * Demo booking URL with the stored attribution params appended. Renders the
 * plain URL on the server / first paint and swaps it in after mount, so there
 * is no hydration mismatch.
 */
export function useBookingUrl(): string {
  const [url, setUrl] = useState(BOOKING_URL)
  useEffect(() => {
    setUrl(withAttributionParams(BOOKING_URL))
  }, [])
  return url
}

/** wa.me link carrying the shared message (+ " (ref: <utm_source>)" when known). */
export function useWhatsAppUrl(phone: string = WHATSAPP_PHONE): string {
  const [url, setUrl] = useState(
    () => `https://wa.me/${phone}?text=${encodeURIComponent(WHATSAPP_BASE_MESSAGE)}`
  )
  useEffect(() => {
    setUrl(getWhatsAppUrl(phone))
  }, [phone])
  return url
}
