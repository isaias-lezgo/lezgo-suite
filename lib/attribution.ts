/**
 * First-touch marketing attribution.
 *
 * On the visitor's first page load we read the campaign params from the URL,
 * plus the landing URL and document.referrer, and keep them in a first-party
 * cookie for 30 days. The cookie is never overwritten while it exists, so a
 * lead keeps the channel that first brought them in even if they browse other
 * pages (or come back days later) before converting.
 *
 * The stored values are then attached to the webhook payload of every lead
 * form, to the demo booking links and to the WhatsApp message.
 *
 * Browser-only: every function returns null / the untouched input on the server.
 */

export const ATTRIBUTION_COOKIE = "lz_attribution"
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30

/** Params read from the landing URL. Also forwarded to the booking links. */
export const URL_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "oppref",
  "gclid",
  "fbclid",
] as const

type UrlParamKey = (typeof URL_PARAM_KEYS)[number]
export type Attribution = Record<UrlParamKey | "landing_url" | "referrer", string>

const ALL_KEYS = [...URL_PARAM_KEYS, "landing_url", "referrer"] as const

// Keeps the cookie well under the 4 KB browser limit even with long URLs.
const MAX_PARAM_LENGTH = 200
const MAX_URL_LENGTH = 500

export const BOOKING_URL = "https://app.lezgosuite.com/widget/bookings/conocelezgosuite"

export const WHATSAPP_PHONE = "5214426702559"
export const WHATSAPP_BASE_MESSAGE =
  "¡Hola! Me interesa más información de Lezgo Suite. Vengo de la Página Web."

// Survives within the page session even when cookies are blocked, so a later
// client-side navigation never re-captures the wrong page as the landing URL.
let cached: Attribution | null = null

function normalize(raw: Record<string, unknown>): Attribution {
  const out = {} as Attribution
  for (const key of ALL_KEYS) {
    const value = raw[key]
    const max = key === "landing_url" || key === "referrer" ? MAX_URL_LENGTH : MAX_PARAM_LENGTH
    out[key] = typeof value === "string" ? value.trim().slice(0, max) : ""
  }
  return out
}

function readCookie(): Attribution | null {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${ATTRIBUTION_COOKIE}=([^;]*)`))
  if (!match) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]))
    return parsed && typeof parsed === "object" ? normalize(parsed) : null
  } catch {
    return null
  }
}

function writeCookie(data: Attribution) {
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie =
    `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(data))}` +
    `; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`
}

function captureFromLocation(): Attribution {
  const params = new URLSearchParams(window.location.search)
  const raw: Record<string, string> = {
    landing_url: window.location.href,
    referrer: document.referrer,
  }
  for (const key of URL_PARAM_KEYS) raw[key] = params.get(key) || ""
  return normalize(raw)
}

/**
 * Returns the stored first-touch attribution, capturing it from the current
 * URL if none exists yet. Safe to call repeatedly; it only writes once.
 * Call it from effects or event handlers, never during server render.
 */
export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null
  if (cached) return cached
  cached = readCookie()
  if (!cached) {
    cached = captureFromLocation()
    writeCookie(cached)
  }
  return cached
}

/**
 * Fields merged into every lead form's webhook JSON. All keys are always
 * present (empty string when unknown) so Make sees a stable data structure.
 */
export function getAttributionPayload(): Attribution {
  return getAttribution() ?? normalize({})
}

/** Appends the stored URL params (only the ones with a value) to `baseUrl`. */
export function withAttributionParams(baseUrl: string): string {
  const data = getAttribution()
  if (!data) return baseUrl
  const url = new URL(baseUrl)
  for (const key of URL_PARAM_KEYS) {
    if (data[key] && !url.searchParams.has(key)) url.searchParams.set(key, data[key])
  }
  return url.toString()
}

/** WhatsApp message, tagged with " (ref: <utm_source>)" when a source is stored. */
export function getWhatsAppMessage(): string {
  const source = getAttribution()?.utm_source
  return source ? `${WHATSAPP_BASE_MESSAGE} (ref: ${source})` : WHATSAPP_BASE_MESSAGE
}

export function getWhatsAppUrl(phone: string = WHATSAPP_PHONE): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(getWhatsAppMessage())}`
}
