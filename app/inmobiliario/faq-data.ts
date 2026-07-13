// Single source of truth for the FAQ: rendered by sections/FAQ.tsx and emitted
// as FAQPage JSON-LD from page.tsx. Keep them from drifting apart — Google
// requires the structured data to match the visible answer on the page.

export type FaqItem = { q: string; a: string }

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "¿Qué tan rápido puedo arrancar?",
    a: "Recibes tu cuenta con el snapshot inmobiliario ya armado, así que puedes empezar a operar en pocos días. En el onboarding y con los video tutoriales aprendes a conectar tu WhatsApp y cargar tu base a tu propio ritmo. Si contratas nuestro servicio de Implementación, los tiempos dependen del alcance que definas con el equipo de ventas.",
  },
  {
    q: "¿Puedo cargar mi base de datos actual?",
    a: "Sí. Puedes subir tus contactos y oportunidades a Lezgo Suite, y en el onboarding y los video tutoriales te enseñamos paso a paso cómo hacerlo para que no pierdas información. Si prefieres que te acompañen más de cerca, existen opciones de soporte dedicado.",
  },
  {
    q: "¿Mis asesores tienen que cambiar su WhatsApp?",
    a: "No. Cada asesor conecta su WhatsApp a Lezgo Suite y sigue trabajando como siempre, mientras todas sus conversaciones se reflejan en la plataforma para que tú las supervises en tiempo real. Trabajamos con todas las versiones de WhatsApp disponibles y en la demo definimos la mejor combinación para tu equipo.",
  },
  {
    q: "¿Qué pasa con mis leads si un asesor se va de la empresa?",
    a: "Se quedan contigo. Todas las conversaciones, contactos y oportunidades viven en Lezgo Suite, no en el WhatsApp del asesor. Proteges la cartera de tu inmobiliaria.",
  },
  {
    q: "¿Tiene app móvil?",
    a: "Sí, tu equipo puede operar desde el celular estén donde estén.",
  },
  {
    q: "¿Puedo cambiar de plan después?",
    a: "Sí, puedes subir o bajar de plan cuando lo necesites sin perder tus datos.",
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "No necesitas ser técnico. La plataforma es intuitiva, recibes onboarding personalizado y tienes una comunidad con video tutoriales para cada función. Y si quieres avanzar más rápido, puedes contratar acompañamiento adicional (STD o Implementación).",
  },
  {
    q: "¿Ustedes configuran la cuenta por mí?",
    a: "La configuración estándar la realizas tú, guiado por el onboarding y los video tutoriales — así conoces tu operación a fondo desde el inicio. Si quieres apoyo extra, tenemos dos opciones con costo adicional: el Soporte Técnico Dedicado (STD), un copiloto que reduce tu curva de aprendizaje y acelera la configuración mientras tú la realizas; y el servicio de Implementación, donde nuestro equipo configura la cuenta por ti según los alcances que necesites. Nuestro equipo de ventas te da los detalles de cada opción.",
  },
  {
    q: "¿Los datos están seguros?",
    a: "Sí. Usamos encriptación AES-256, servidores en múltiples regiones, backups automáticos y cumplimiento con las regulaciones de protección de datos.",
  },
]
