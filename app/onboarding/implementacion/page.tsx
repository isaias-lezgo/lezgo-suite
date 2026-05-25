import OnboardingPage, { type OnboardingConfig } from '@/components/custom/OnboardingPage'

const config: OnboardingConfig = {
  planLabel: 'IMPLEMENTACIÓN',
  heading: 'Bienvenido a Lezgo Suite',
  subtitle: 'Lee las condiciones de tu plan antes de agendar tu primera sesión.',
  conditions: [
    {
      icon: '🗺️',
      title: 'Primera sesión: mapeo de necesidades',
      description:
        'La primera sesión está dedicada a definir con precisión qué automatizaciones e integraciones se implementarán. Es obligatorio llegar con tus procesos identificados.',
    },
    {
      icon: '📅',
      title: 'Plazo de implementación: 4 semanas',
      description:
        'El proceso de implementación tiene una duración fija de 4 semanas a partir de la primera sesión. Este plazo no se extiende.',
    },
    {
      icon: '⏱️',
      title: 'El plazo corre independientemente del seguimiento',
      description:
        'Si el cliente no asiste a sesiones, no entrega información o no responde en tiempo, el plazo de 4 semanas sigue corriendo. No hay pausas.',
    },
    {
      icon: '🤝',
      title: 'Tu participación es clave',
      description:
        'Para completar la implementación en tiempo, el cliente debe estar disponible, responder solicitudes y proveer accesos cuando Lezgo Suite los necesite.',
    },
    {
      icon: '⚠️',
      title: 'Responsabilidad por incumplimiento',
      description:
        'Si la implementación no concluye dentro de las 4 semanas por falta de seguimiento, información o disponibilidad del cliente, la responsabilidad es exclusiva del cliente. Lezgo Suite no está obligado a extender el plazo.',
    },
  ],
}

export default function ImplementacionOnboarding() {
  return <OnboardingPage config={config} />
}
