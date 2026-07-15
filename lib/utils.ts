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

/**
 * Normalizes a user-typed phone number to E.164, defaulting to Mexico (+52).
 * Mexican mobiles are returned as `+52` + 10 digits (the legacy WhatsApp "1"
 * trunk prefix is stripped, since Google matches better against `+52##########`).
 * Numbers the user typed with an explicit "+" keep their country code.
 * Returns "" when there are no digits.
 */
export function toE164Mx(raw: string): string {
  if (!raw) return ""
  const startedWithPlus = raw.trim().startsWith("+")
  let digits = raw.replace(/\D/g, "")
  if (!digits) return ""
  // WhatsApp-style Mexican mobile: 52 + 1 + 10 digits → drop the trunk "1".
  if (digits.startsWith("521") && digits.length === 13) digits = "52" + digits.slice(3)
  // Already carries the 52 country code.
  if (digits.startsWith("52") && digits.length >= 12) return "+" + digits
  // Explicit international number: trust the country code the user typed.
  if (startedWithPlus) return "+" + digits
  // Bare national number: assume Mexico.
  return "+52" + digits
}

/**
 * Builds the `user_data` object for Enhanced Conversions dataLayer pushes.
 * Email is trimmed + lowercased; phone is normalized to E.164 (see toE164Mx).
 * GTM's Google Ads tag normalizes + hashes these client-side; they are never
 * sent in clear. Empty fields are omitted so partial data still matches.
 */
export function buildUserData(email?: string, phone?: string): Record<string, string> {
  const user_data: Record<string, string> = {}
  const cleanEmail = (email || "").trim().toLowerCase()
  const cleanPhone = toE164Mx(phone || "")
  if (cleanEmail) user_data.email = cleanEmail
  if (cleanPhone) user_data.phone_number = cleanPhone
  return user_data
}
