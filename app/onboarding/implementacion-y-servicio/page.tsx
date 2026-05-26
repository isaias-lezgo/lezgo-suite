import OnboardingPage, { type OnboardingConfig } from '@/components/custom/OnboardingPage'

const config: OnboardingConfig = {
  planLabel: 'IMPLEMENTACIÓN + SERVICIO TÉCNICO',
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
      icon: '👨‍💻',
      title: 'Asesoría técnica personalizada',
      description:
        'Un experto de Lezgo Suite te acompaña en el uso de la plataforma, resuelve dudas técnicas y te orienta en buenas prácticas.',
    },
    {
      icon: '🕘',
      title: 'Horario de atención',
      description:
        'Lunes a viernes de 9:00 a 18:00 h (hora del centro de México). Los mensajes recibidos fuera de este horario se atenderán el siguiente día hábil.',
    },
    {
      icon: '💬',
      title: 'Canal de contacto',
      description:
        'La atención se realiza por WhatsApp con tu experto asignado. Los tiempos de respuesta dependen de la carga del equipo y la complejidad de cada consulta.',
    },
    {
      icon: '📞',
      title: 'Videollamadas con previa coordinación',
      description:
        'Las videollamadas se programan de común acuerdo entre Lezgo Suite y tu empresa. No están disponibles de forma inmediata ni sin cita previa, y están sujetas a la disponibilidad del equipo.',
    },
    {
      icon: '1️⃣',
      title: 'Un punto de contacto',
      description:
        'La atención se canaliza a través de un representante designado por tu empresa, quien centraliza las consultas del equipo.',
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
      title: 'Acompañamiento técnico',
      description:
        'Durante y después de la implementación, el acompañamiento es de asesoría, guía y resolución de dudas. No es un servicio inmediato las 24 horas ni incluye trabajo ilimitado fuera del alcance acordado.',
    },
    {
      icon: '⚠️',
      title: 'Ritmo de automatizaciones',
      description:
        'Después de la implementación, el servicio técnico incluye asesoría y acompañamiento para crear o mantener una automatización por semana. Según la complejidad, algunos proyectos pueden requerir más de una semana.',
    },
    {
      icon: '✅',
      title: 'Resolución de dudas y orientación',
      description:
        'Puedes consultar el uso de funcionalidades, interpretar errores y recibir recomendaciones, siempre dentro del horario de atención establecido.',
    },
  ],
}

export default function ImplementacionYServicioOnboarding() {
  return <OnboardingPage config={config} />
}
