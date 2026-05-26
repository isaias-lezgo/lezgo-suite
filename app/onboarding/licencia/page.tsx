import OnboardingPage, { type OnboardingConfig } from '@/components/custom/OnboardingPage'

const config: OnboardingConfig = {
  planLabel: 'LICENCIA ESTÁNDAR',
  heading: 'Bienvenido a Lezgo Suite',
  subtitle: 'Revisa las condiciones de tu plan antes de agendar tu primera sesión.',
  conditions: [
    {
      icon: '🏠',
      title: 'Acceso a la plataforma',
      description:
        'Cuentas con acceso completo a Lezgo Suite para administrar y operar la plataforma a tu ritmo.',
    },
    {
      icon: '💬',
      title: 'Soporte vía WhatsApp',
      description:
        'Puedes contactarnos por WhatsApp para resolver dudas puntuales. El soporte se limita a responder preguntas; no incluye configuraciones ni implementaciones.',
    },
    {
      icon: '🕘',
      title: 'Horario de atención',
      description:
        'Lunes a viernes de 9:00 a 18:00 h (hora del centro de México). Los mensajes recibidos fuera de este horario se atenderán el siguiente día hábil.',
    },
    {
      icon: '🚫',
      title: 'No incluye implementaciones',
      description:
        'Este plan no contempla la creación de automatizaciones, flujos ni configuraciones adicionales por parte de Lezgo Suite. La administración y operación de la plataforma son responsabilidad de tu empresa.',
    },
    {
      icon: '📞',
      title: 'Una videollamada al mes',
      description:
        'Incluye una videollamada de 1 hora al mes con un experto de la plataforma para orientarte en el uso del sistema.',
    },
  ],
}

export default function LicenciaOnboarding() {
  return <OnboardingPage config={config} />
}
