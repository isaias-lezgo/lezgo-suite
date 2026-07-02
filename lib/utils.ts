import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Reads the Google Analytics client_id from the `_ga` cookie.
 * Format: `_ga=GA1.1.XXXXXXXXXX.YYYYYYYYYY` → returns `XXXXXXXXXX.YYYYYYYYYY`.
 * Returns null on the server or when the cookie is absent.
 */
export function getGAClientId(): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(/_ga=GA\d\.\d\.(\d+\.\d+)/)
  return match ? match[1] : null
}

/**
 * Appends the GA client_id to a Stripe payment link so conversions and future
 * renewals can be attributed back to the originating session.
 *
 * - `client_reference_id` → stored on the Checkout Session
 * - `subscription_data[metadata][ga_client_id]` → stored on the Subscription
 *
 * When no `_ga` cookie is present the original URL is returned unchanged.
 */
export function withGAClientId(baseUrl: string): string {
  const clientId = getGAClientId()
  if (!clientId) return baseUrl
  const separator = baseUrl.includes("?") ? "&" : "?"
  const params = new URLSearchParams()
  params.append("client_reference_id", clientId)
  params.append("subscription_data[metadata][ga_client_id]", clientId)
  return `${baseUrl}${separator}${params.toString()}`
}
