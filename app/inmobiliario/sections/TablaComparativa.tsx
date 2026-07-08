'use client'

// FIX-3: real HTML table (desktop) + stacked plan cards (mobile). No images.
const PLANS = ["Start", "Growth", "Pro", "Elite"] as const

type Row = { label: string; values: [string, string, string, string] }

const ROWS: Row[] = [
  { label: "Usuarios", values: ["1", "3", "10", "Ilimitados"] },
  { label: "Contactos", values: ["100", "1,000", "15,000", "Ilimitados"] },
  { label: "Pipelines (Ventas + Rentas)", values: ["✓", "✓", "✓", "✓"] },
  { label: "Conexión WhatsApp (todas las versiones)", values: ["✓", "✓", "✓", "✓"] },
  { label: "Bots de IA", values: ["2", "2", "2", "2"] },
  { label: "Automatizaciones", values: ["11", "11", "11", "11"] },
  { label: "Dashboard (7 widgets)", values: ["✓", "✓", "✓", "✓"] },
  { label: "Conexiones WhatsApp QR", values: ["—", "—", "—", "20"] },
  { label: "Soporte", values: ["WhatsApp", "WhatsApp", "WhatsApp", "Prioritario"] },
]

function Cell({ value }: { value: string }) {
  if (value === "✓") return <span className="text-[#F59B1B] font-bold">✓</span>
  if (value === "—") return <span className="text-gray-300">—</span>
  return <span className="text-gray-700">{value}</span>
}

export default function TablaComparativa() {
  return (
    <section className="py-24 relative bg-white/50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900">
            Compara los planes en detalle.
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left p-4 font-semibold">Funcionalidad</th>
                {PLANS.map((p) => (
                  <th key={p} className="p-4 font-semibold text-center">
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-4 text-gray-800 font-medium">{row.label}</td>
                  {row.values.map((v, j) => (
                    <td key={j} className="p-4 text-center">
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: one card per plan */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {PLANS.map((plan, pIdx) => (
            <div
              key={plan}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="bg-gray-900 text-white p-4 font-bold font-heading text-center">{plan}</div>
              <ul className="divide-y divide-gray-100">
                {ROWS.map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-3 p-3.5">
                    <span className="text-sm text-gray-600">{row.label}</span>
                    <span className="text-sm font-medium text-right">
                      <Cell value={row.values[pIdx]} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
