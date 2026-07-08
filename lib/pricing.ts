// Shared pricing data for Lezgo Suite plans.
// Extracted so new routes (e.g. /inmobiliario) reuse the exact same Stripe
// links, base prices and billing options without duplicating URLs.
// NOTE: kept in sync with app/landing/Precios.tsx (which keeps its own copy to
// avoid modifying existing routes).

export type BillingPeriod = 'mensual' | 'trimestral' | 'semestral' | 'anual'

export const BILLING_OPTIONS: { key: BillingPeriod; label: string; discount: number }[] = [
  { key: 'mensual',     label: 'Mensual',     discount: 0 },
  { key: 'trimestral',  label: 'Trimestral',  discount: 0.05 },
  { key: 'semestral',   label: 'Semestral',   discount: 0.10 },
  { key: 'anual',       label: 'Anual',       discount: 0.20 },
]

export function applyDiscount(basePrice: number, discount: number): string {
  const discounted = Math.round(basePrice * (1 - discount))
  return '$' + discounted.toLocaleString('es-MX')
}

export const BASE_PRICES = { start: 1297, growth: 3527, pro: 5397, elite: 10567 }

export const STRIPE_LINKS: Record<string, Record<BillingPeriod, string>> = {
  start: {
    mensual:    'https://pagos.lezgosuite.com/b/9B68wQ9d06go82Z1aA3cc0x?paquete=start&plan=mensual',
    trimestral: 'https://pagos.lezgosuite.com/b/28E00k60OeMUfvr1aA3cc0y?paquete=start&plan=trimestral',
    semestral:  'https://pagos.lezgosuite.com/b/aFa8wQexkawE5UR1aA3cc0z?paquete=start&plan=semestral',
    anual:      'https://pagos.lezgosuite.com/b/aFa7sM74SfQY4QNaLa3cc0A?paquete=start&plan=anual',
  },
  growth: {
    mensual:    'https://pagos.lezgosuite.com/b/14A7sM2OC5ckfvr6uU3cc0l?paquete=growth&plan=mensual',
    trimestral: 'https://pagos.lezgosuite.com/b/eVq7sMgFs2089734mM3cc0r?paquete=growth&plan=trimestral',
    semestral:  'https://pagos.lezgosuite.com/b/dRmfZi2OC9sAcjf3iI3cc0s?paquete=growth&plan=semestral',
    anual:      'https://pagos.lezgosuite.com/b/cNi4gA4WKdIQ0Ax8D23cc0t?paquete=growth&plan=anual',
  },
  pro: {
    mensual:    'https://pagos.lezgosuite.com/b/8x24gAexkgV22IF3iI3cc0m?paquete=pro&plan=mensual',
    trimestral: 'https://pagos.lezgosuite.com/b/dRm14oah4awEdnj1aA3cc0o?paquete=pro&plan=trimestral',
    semestral:  'https://pagos.lezgosuite.com/b/bJe7sM0GueMUcjfbPe3cc0p?paquete=pro&plan=semestral',
    anual:      'https://pagos.lezgosuite.com/b/bJe14obl8dIQernaLa3cc0q?paquete=pro&plan=anual',
  },
  elite: {
    mensual:    'https://pagos.lezgosuite.com/b/dRm28sbl8gV21EB8D23cc0n?paquete=elite&plan=mensual',
    trimestral: 'https://pagos.lezgosuite.com/b/28E3cw9d0cEM82ZcTi3cc0u?paquete=elite&plan=trimestral',
    semestral:  'https://pagos.lezgosuite.com/b/fZu00k2OCbAIdnj6uU3cc0v?paquete=elite&plan=semestral',
    anual:      'https://pagos.lezgosuite.com/b/6oU28sbl8dIQdnj4mM3cc0w?paquete=elite&plan=anual',
  },
}
