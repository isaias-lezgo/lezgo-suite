'use client'

const PASOS: { title: string; body: string }[] = [
  {
    title: "Recibes tu cuenta con el snapshot inmobiliario ya armado",
    body: "Pipelines de Ventas y Rentas, automatizaciones y bots de IA preconfigurados y listos para usar. Esto lo preparamos nosotros por ti.",
  },
  {
    title: "Te guiamos en el onboarding",
    body: "En las sesiones de onboarding y con nuestra comunidad de video tutoriales aprendes a conectar el WhatsApp de tu equipo, cargar tu base de datos y dejar la operación a la medida de tu inmobiliaria.",
  },
  {
    title: "Tu equipo empieza a cerrar",
    body: "Con todo centralizado y soporte por WhatsApp, tu equipo opera desde los primeros días. ¿Quieres ir aún más rápido? Existen opciones de acompañamiento (STD e Implementación) que puedes contratar aparte.",
  },
]

export default function ComoFunciona() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gray-900">
            Todo listo para que arranques rápido.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PASOS.map((p, i) => (
            <div key={p.title} className="text-center md:text-left">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F59B1B] to-orange-600 text-white text-2xl font-bold font-heading flex items-center justify-center mb-5 mx-auto md:mx-0 shadow-lg">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
                {p.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
