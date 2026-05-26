import OnboardingPage, { type OnboardingConfig } from '@/components/custom/OnboardingPage'

const config: OnboardingConfig = {
  planLabel: 'IMPLEMENTACIÓN',
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
      icon: '🕘',
      title: 'Horario de atención',
      description:
        'Lunes a viernes de 9:00 a 18:00 h (hora del centro de México). Los mensajes recibidos fuera de este horario se atenderán el siguiente día hábil.',
    },
    {
      icon: '📞',
      title: 'Videollamadas con previa coordinación',
      description:
        'Durante las 4 semanas de implementación, las videollamadas se programan de común acuerdo entre Lezgo Suite y tu empresa. No están disponibles de forma inmediata ni sin cita previa.',
    },
    {
      icon: '🚨',
      title: 'Primera sesión: mapeo de necesidades',
      description:
        'La primera sesión está dedicada a definir con precisión las automatizaciones e integraciones a implementar. Es indispensable que llegues con tus procesos y necesidades documentados.',
      highlighted: true,
    },
    {
      icon: '🚨',
      title: 'Plazo de implementación: 4 semanas',
      description:
        'El proceso de implementación tiene una duración fija de 4 semanas a partir de la primera sesión. Este plazo no se extiende.',
      highlighted: true,
    },
    {
      icon: '⏰',
      title: 'El plazo no se detiene',
      description:
        'Si no asistes a sesiones, no entregas información o no respondes a tiempo, el plazo de 4 semanas continúa sin pausas ni extensiones.',
    },
    {
      icon: '🤝',
      title: 'Tu participación es clave',
      description:
        'Para concluir la implementación en tiempo, debes mantenerte disponible, responder solicitudes y proporcionar los accesos que Lezgo Suite requiera.',
    },
    {
      icon: '⚠️',
      title: 'Responsabilidad por incumplimiento',
      description:
        'Si la implementación no concluye dentro de las 4 semanas por falta de seguimiento, información o disponibilidad de tu parte, la responsabilidad recae en el cliente. Lezgo Suite no está obligado a extender el plazo.',
    },
    {
      icon: '⚙️',
      title: 'Implementación, no servicio dedicado',
      description:
        'La implementación no equivale a servicio técnico dedicado. Al finalizar la implementación y la capacitación, Lezgo Suite no es responsable del mantenimiento de automatizaciones existentes, salvo fallas atribuibles a la plataforma. Contarás con soporte según las condiciones indicadas a continuación.',
      highlighted: true,
    },
    {
      icon: '💬',
      title: 'Soporte vía WhatsApp',
      description:
        'Puedes contactarnos por WhatsApp para resolver dudas puntuales. El soporte se limita a responder preguntas; no incluye configuraciones ni implementaciones.',
    },
  ],
}

export default function ImplementacionOnboarding() {
  return <OnboardingPage config={config} />
}
