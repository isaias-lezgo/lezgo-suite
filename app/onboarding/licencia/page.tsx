import OnboardingPage, { type OnboardingConfig } from '@/components/custom/OnboardingPage'

const config: OnboardingConfig = {
  planLabel: 'LICENCIA ESTÁNDAR',
  heading: 'Bienvenido a Lezgo Suite',
  subtitle: 'Lee las condiciones de tu plan antes de agendar tu primera sesión.',
  conditions: [
    {
      icon: '🏠',
      title: 'Acceso a la plataforma',
      description:
        'Tienes acceso completo a Lezgo Suite (GoHighLevel). La plataforma es tuya para administrar y operar a tu ritmo.',
    },
    {
      icon: '💬',
      title: 'Soporte vía WhatsApp',
      description:
        'Puedes escribirnos por WhatsApp para resolver dudas puntuales. El soporte es únicamente para responder preguntas — no incluye configuraciones ni implementaciones.',
    },
    {
      icon: '🕘',
      title: 'Horario de atención',
      description:
        'Lunes a viernes de 9:00 a 18:00 hrs (hora del centro de México). Mensajes fuera de horario serán atendidos el siguiente día hábil.',
    },
    {
      icon: '🚫',
      title: 'No incluye implementaciones',
      description:
        'Este plan no contempla la creación de automatizaciones, flujos ni configuraciones adicionales por parte de Lezgo Suite. Tú eres responsable de administrar y operar tu plataforma.',
    },
  ],
}

export default function LicenciaOnboarding() {
  return <OnboardingPage config={config} />
}
