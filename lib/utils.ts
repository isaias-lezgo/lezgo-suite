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
 * Rewrites a Stripe payment link so it carries the GA client_id as the sole
 * `client_reference_id`, dropping any pre-existing query params. `paquete`,
 * `plan` and `subscription_data[metadata][ga_client_id]` are no longer needed
 * on the Stripe side (they stay in the source link only for the client-side
 * GA4 dataLayer push).
 *
 * Stripe Payment Links silently reject a `client_reference_id` that contains a
 * dot, so the GA client_id (e.g. `922793244.1778021346`) has its dot swapped
 * for an underscore (`922793244_1778021346`).
 *
 * When no `_ga` cookie is present the cleaned base URL is returned unchanged.
 */
export function withGAClientId(baseUrl: string): string {
  const cleanUrl = baseUrl.split("?")[0]
  const clientId = getGAClientId()
  if (!clientId) return cleanUrl
  const clientIdSafe = clientId.replace(".", "_")
  return `${cleanUrl}?client_reference_id=${clientIdSafe}`
}
