import OnboardingPage, { type OnboardingConfig } from '@/components/custom/OnboardingPage'

const config: OnboardingConfig = {
  planLabel: 'SERVICIO TÉCNICO DEDICADO',
  heading: 'Bienvenido a Lezgo Suite',
  subtitle: 'Lee las condiciones de tu plan antes de agendar tu primera sesión.',
  conditions: [
    {
      icon: '👨‍💻',
      title: 'Asesoría técnica personalizada',
      description:
        'Tienes acceso a un experto de Lezgo Suite que te guía en el uso de la plataforma, resuelve dudas técnicas y te orienta en las mejores prácticas.',
    },
    {
      icon: '🕘',
      title: 'Horario de atención',
      description:
        'Lunes a viernes de 9:00 a 18:00 hrs (hora del centro de México). Los mensajes fuera de horario serán atendidos el siguiente día hábil.',
    },
    {
      icon: '💬',
      title: 'Canal de contacto',
      description:
        'La atención se brinda vía WhatsApp. Los tiempos de respuesta dependen de la carga del equipo y la complejidad de la consulta.',
    },
    {
      icon: '🚫',
      title: 'No incluye creación de automatizaciones',
      description:
        'El Servicio Técnico es de asesoría y guía. No incluye que Lezgo Suite construya, configure ni implemente automatizaciones o flujos en tu cuenta.',
    },
    {
      icon: '✅',
      title: 'Resolución de dudas y orientación',
      description:
        'Puedes consultar cómo usar funcionalidades, entender errores, y recibir recomendaciones — siempre dentro del horario establecido.',
    },
  ],
}

export default function ServicioTecnicoOnboarding() {
  return <OnboardingPage config={config} />
}
