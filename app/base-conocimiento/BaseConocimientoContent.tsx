'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Users, Target, Calendar, CheckSquare, BookOpen, X, Search, ChevronDown } from 'lucide-react'

interface Video {
  id: string
  title: string
  description: string
  duration: string
  keywords: string[]
}

interface Subcategory {
  id: string
  label: string
  videos: Video[]
}

interface Section {
  id: string
  label: string
  icon: LucideIcon
  subcategories: Subcategory[]
}

const SECTIONS: Section[] = [
  {
    id: 'contactos',
    label: 'Contactos',
    icon: Users,
    subcategories: [
      {
        id: 'gestion',
        label: 'Gestión básica',
        videos: [
          {
            id: 'PLACEHOLDER_1',
            title: 'Cómo crear un contacto',
            description: 'Agrega contactos manualmente y por importación masiva.',
            duration: '0:00',
            keywords: ['crear', 'agregar', 'nuevo', 'importar', 'contacto', 'registro', 'csv'],
          },
          {
            id: 'PLACEHOLDER_2',
            title: 'Editar y eliminar contactos',
            description: 'Modifica datos y gestiona registros duplicados.',
            duration: '0:00',
            keywords: ['editar', 'eliminar', 'modificar', 'borrar', 'duplicados', 'actualizar', 'datos'],
          },
          {
            id: 'PLACEHOLDER_3',
            title: 'Filtros y segmentación',
            description: 'Organiza tus contactos con etiquetas y filtros avanzados.',
            duration: '0:00',
            keywords: ['filtros', 'segmentación', 'etiquetas', 'tags', 'organizar', 'buscar', 'grupos'],
          },
        ],
      },
      {
        id: 'comunicacion',
        label: 'Comunicación',
        videos: [
          {
            id: 'PLACEHOLDER_4',
            title: 'Enviar mensajes desde un contacto',
            description: 'SMS, email y WhatsApp directo desde el perfil.',
            duration: '0:00',
            keywords: ['sms', 'email', 'whatsapp', 'mensaje', 'correo', 'enviar', 'comunicar'],
          },
          {
            id: 'PLACEHOLDER_5',
            title: 'Historial de conversaciones',
            description: 'Revisa todo el historial de interacciones con un contacto.',
            duration: '0:00',
            keywords: ['historial', 'conversaciones', 'interacciones', 'seguimiento', 'registro', 'actividad'],
          },
          {
            id: 'PLACEHOLDER_6',
            title: 'Notas y actividades',
            description: 'Registra llamadas, reuniones y notas internas.',
            duration: '0:00',
            keywords: ['notas', 'actividades', 'llamadas', 'reuniones', 'anotaciones', 'comentarios'],
          },
        ],
      },
      {
        id: 'automatizaciones-contactos',
        label: 'Automatizaciones',
        videos: [
          {
            id: 'PLACEHOLDER_7',
            title: 'Flujos automáticos al crear un contacto',
            description: 'Configura acciones que se disparan al registrar un nuevo contacto.',
            duration: '0:00',
            keywords: ['flujos', 'automatización', 'workflow', 'disparador', 'trigger', 'acciones', 'nuevo contacto'],
          },
          {
            id: 'PLACEHOLDER_8',
            title: 'Etiquetas automáticas',
            description: 'Aplica etiquetas según el comportamiento del contacto.',
            duration: '0:00',
            keywords: ['etiquetas', 'automáticas', 'tags', 'comportamiento', 'reglas', 'condiciones'],
          },
          {
            id: 'PLACEHOLDER_9',
            title: 'Notificaciones al equipo',
            description: 'Avisa a tu equipo cuando un contacto realiza una acción clave.',
            duration: '0:00',
            keywords: ['notificaciones', 'equipo', 'alertas', 'avisos', 'acción', 'alerta'],
          },
        ],
      },
    ],
  },
  {
    id: 'oportunidades',
    label: 'Oportunidades',
    icon: Target,
    subcategories: [
      {
        id: 'pipeline',
        label: 'Pipeline',
        videos: [
          {
            id: 'PLACEHOLDER_10',
            title: 'Crear una oportunidad',
            description: 'Registra oportunidades de negocio y asígnalas a tu pipeline.',
            duration: '0:00',
            keywords: ['oportunidad', 'crear', 'negocio', 'pipeline', 'trato', 'deal', 'venta'],
          },
          {
            id: 'PLACEHOLDER_11',
            title: 'Mover entre etapas',
            description: 'Avanza oportunidades por las etapas del proceso de venta.',
            duration: '0:00',
            keywords: ['etapas', 'mover', 'avanzar', 'proceso', 'venta', 'embudo', 'funnel'],
          },
          {
            id: 'PLACEHOLDER_12',
            title: 'Personalizar el pipeline',
            description: 'Crea y reordena etapas según tu proceso comercial.',
            duration: '0:00',
            keywords: ['personalizar', 'pipeline', 'etapas', 'configurar', 'reordenar', 'comercial'],
          },
        ],
      },
      {
        id: 'seguimiento',
        label: 'Seguimiento',
        videos: [
          {
            id: 'PLACEHOLDER_13',
            title: 'Actividades de seguimiento',
            description: 'Programa llamadas, demos y recordatorios para cada oportunidad.',
            duration: '0:00',
            keywords: ['seguimiento', 'actividades', 'llamadas', 'demos', 'recordatorios', 'programar'],
          },
          {
            id: 'PLACEHOLDER_14',
            title: 'Notas de oportunidad',
            description: 'Documenta avances y acuerdos dentro de cada trato.',
            duration: '0:00',
            keywords: ['notas', 'oportunidad', 'acuerdos', 'documentar', 'avances', 'trato'],
          },
          {
            id: 'PLACEHOLDER_15',
            title: 'Asignar oportunidades al equipo',
            description: 'Distribuye tratos entre los vendedores de tu equipo.',
            duration: '0:00',
            keywords: ['asignar', 'equipo', 'vendedores', 'distribuir', 'responsable', 'delegación'],
          },
        ],
      },
      {
        id: 'reportes',
        label: 'Reportes',
        videos: [
          {
            id: 'PLACEHOLDER_16',
            title: 'Reportes de conversión',
            description: 'Analiza tu tasa de cierre por etapa y por vendedor.',
            duration: '0:00',
            keywords: ['reportes', 'conversión', 'tasa', 'cierre', 'análisis', 'métricas', 'vendedor'],
          },
          {
            id: 'PLACEHOLDER_17',
            title: 'Proyección de ingresos',
            description: 'Estima ingresos futuros con base en tu pipeline actual.',
            duration: '0:00',
            keywords: ['proyección', 'ingresos', 'forecast', 'predicción', 'ventas', 'futuro'],
          },
          {
            id: 'PLACEHOLDER_18',
            title: 'Exportar reportes',
            description: 'Descarga tus datos de ventas en Excel o PDF.',
            duration: '0:00',
            keywords: ['exportar', 'descargar', 'excel', 'pdf', 'datos', 'reporte', 'informe'],
          },
        ],
      },
    ],
  },
  {
    id: 'calendarios',
    label: 'Calendarios',
    icon: Calendar,
    subcategories: [
      {
        id: 'configuracion',
        label: 'Configuración',
        videos: [
          {
            id: 'PLACEHOLDER_19',
            title: 'Configurar tu calendario',
            description: 'Define tu disponibilidad, zonas horarias y tipos de cita.',
            duration: '0:00',
            keywords: ['configurar', 'calendario', 'disponibilidad', 'horarios', 'zona horaria', 'citas'],
          },
          {
            id: 'PLACEHOLDER_20',
            title: 'Bloquear horarios',
            description: 'Marca periodos no disponibles y días de descanso.',
            duration: '0:00',
            keywords: ['bloquear', 'horarios', 'no disponible', 'descanso', 'vacaciones', 'restricciones'],
          },
          {
            id: 'PLACEHOLDER_21',
            title: 'Personalizar el formulario de cita',
            description: 'Agrega campos personalizados a tu página de agendamiento.',
            duration: '0:00',
            keywords: ['formulario', 'personalizar', 'campos', 'agendamiento', 'página', 'booking'],
          },
        ],
      },
      {
        id: 'citas',
        label: 'Citas',
        videos: [
          {
            id: 'PLACEHOLDER_22',
            title: 'Agendar una cita manualmente',
            description: 'Crea citas directamente desde la plataforma sin link externo.',
            duration: '0:00',
            keywords: ['agendar', 'cita', 'programar', 'manualmente', 'crear', 'reunión'],
          },
          {
            id: 'PLACEHOLDER_23',
            title: 'Confirmar y reagendar citas',
            description: 'Gestiona cambios de horario y confirmaciones del cliente.',
            duration: '0:00',
            keywords: ['confirmar', 'reagendar', 'cambiar', 'cancelar', 'cita', 'cliente', 'horario'],
          },
          {
            id: 'PLACEHOLDER_24',
            title: 'Recordatorios automáticos',
            description: 'Configura recordatorios de cita por SMS y email.',
            duration: '0:00',
            keywords: ['recordatorios', 'automáticos', 'sms', 'email', 'notificación', 'cita', 'aviso'],
          },
        ],
      },
      {
        id: 'integraciones-cal',
        label: 'Integraciones',
        videos: [
          {
            id: 'PLACEHOLDER_25',
            title: 'Conectar con Google Calendar',
            description: 'Sincroniza tus citas con Google Calendar en tiempo real.',
            duration: '0:00',
            keywords: ['google calendar', 'sincronizar', 'integración', 'conectar', 'google', 'calendario'],
          },
          {
            id: 'PLACEHOLDER_26',
            title: 'Conectar con Outlook',
            description: 'Mantén tu agenda de Outlook sincronizada con Lezgo Suite.',
            duration: '0:00',
            keywords: ['outlook', 'microsoft', 'sincronizar', 'integración', 'conectar', 'agenda'],
          },
          {
            id: 'PLACEHOLDER_27',
            title: 'Link de agendamiento público',
            description: 'Comparte tu enlace de citas con clientes y prospectos.',
            duration: '0:00',
            keywords: ['link', 'enlace', 'agendamiento', 'público', 'compartir', 'booking', 'calendly'],
          },
        ],
      },
    ],
  },
  {
    id: 'tareas',
    label: 'Tareas',
    icon: CheckSquare,
    subcategories: [
      {
        id: 'gestion-tareas',
        label: 'Gestión básica',
        videos: [
          {
            id: 'PLACEHOLDER_28',
            title: 'Crear y editar tareas',
            description: 'Agrega tareas individuales con fecha límite y prioridad.',
            duration: '0:00',
            keywords: ['crear', 'tareas', 'editar', 'fecha límite', 'prioridad', 'nueva tarea'],
          },
          {
            id: 'PLACEHOLDER_29',
            title: 'Marcar tareas como completadas',
            description: 'Actualiza el estado de tus tareas a medida que avanzas.',
            duration: '0:00',
            keywords: ['completar', 'marcar', 'estado', 'finalizar', 'hecho', 'tarea completa'],
          },
          {
            id: 'PLACEHOLDER_30',
            title: 'Vistas de tareas',
            description: 'Cambia entre vista de lista, tablero y calendario.',
            duration: '0:00',
            keywords: ['vistas', 'lista', 'tablero', 'kanban', 'calendario', 'organizar'],
          },
        ],
      },
      {
        id: 'equipo',
        label: 'Equipo',
        videos: [
          {
            id: 'PLACEHOLDER_31',
            title: 'Asignar tareas a miembros del equipo',
            description: 'Delega y distribuye responsabilidades dentro de tu equipo.',
            duration: '0:00',
            keywords: ['asignar', 'delegar', 'equipo', 'miembros', 'responsabilidades', 'distribuir'],
          },
          {
            id: 'PLACEHOLDER_32',
            title: 'Comentarios en tareas',
            description: 'Colabora con tu equipo con notas y actualizaciones en cada tarea.',
            duration: '0:00',
            keywords: ['comentarios', 'colaborar', 'notas', 'equipo', 'comunicación', 'actualizaciones'],
          },
          {
            id: 'PLACEHOLDER_33',
            title: 'Seguimiento de progreso',
            description: 'Monitorea el avance de las tareas asignadas a tu equipo.',
            duration: '0:00',
            keywords: ['seguimiento', 'progreso', 'avance', 'monitorear', 'equipo', 'tareas'],
          },
        ],
      },
      {
        id: 'automatizacion-tareas',
        label: 'Automatización',
        videos: [
          {
            id: 'PLACEHOLDER_34',
            title: 'Tareas recurrentes',
            description: 'Crea tareas que se repitan automáticamente en intervalos fijos.',
            duration: '0:00',
            keywords: ['recurrentes', 'repetir', 'automático', 'intervalo', 'periódico', 'programar'],
          },
          {
            id: 'PLACEHOLDER_35',
            title: 'Crear tareas desde flujos',
            description: 'Dispara la creación de tareas automáticamente con automatizaciones.',
            duration: '0:00',
            keywords: ['flujos', 'automatización', 'workflow', 'crear', 'disparador', 'trigger'],
          },
          {
            id: 'PLACEHOLDER_36',
            title: 'Notificaciones de vencimiento',
            description: 'Recibe alertas cuando una tarea está próxima a vencer.',
            duration: '0:00',
            keywords: ['notificaciones', 'vencimiento', 'alertas', 'fecha límite', 'aviso', 'recordatorio'],
          },
        ],
      },
    ],
  },
]

interface SearchResult {
  section: Section
  sub: Subcategory
  video: Video
}

export default function BaseConocimientoContent() {
  const [activeSection, setActiveSection] = useState('contactos')
  const [activeSubs, setActiveSubs] = useState<Record<string, string>>(
    () => Object.fromEntries(SECTIONS.map((s) => [s.id, s.subcategories[0].id]))
  )
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSection, setFilterSection] = useState('')

  const searchResults = useMemo<SearchResult[]>(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    const sectionsToSearch = filterSection
      ? SECTIONS.filter((s) => s.id === filterSection)
      : SECTIONS
    const results: SearchResult[] = []
    for (const section of sectionsToSearch) {
      for (const sub of section.subcategories) {
        for (const video of sub.videos) {
          const haystack = [video.title, video.description, ...video.keywords].join(' ').toLowerCase()
          if (haystack.includes(q)) {
            results.push({ section, sub, video })
          }
        }
      }
    }
    return results
  }, [searchQuery, filterSection])

  const isSearching = searchQuery.trim().length > 0

  function scrollToSection(id: string) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function setActiveSub(sectionId: string, subId: string) {
    setActiveSubs((prev) => ({ ...prev, [sectionId]: subId }))
  }

  function openModal(video: Video) {
    setSelectedVideo(video)
  }

  function closeModal() {
    setSelectedVideo(null)
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (selectedVideo) closeModal()
        else setSearchQuery('')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedVideo])

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#F59B1B0d_0%,_transparent_70%)]" />
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F59B1B]/40 bg-[#F59B1B]/10 px-3 py-1 text-xs text-[#F59B1B] mb-4">
              <BookOpen className="h-3.5 w-3.5" /> Base de Conocimiento
            </span>
            <h1 className="font-[var(--font-space-grotesk)] text-3xl font-bold tracking-tight md:text-5xl mb-4">
              Aprende a usar Lezgo Suite
            </h1>
            <p className="text-[var(--muted-foreground)] text-base md:text-lg max-w-xl mx-auto mb-8">
              Tutoriales en video para dominar cada módulo de tu plataforma. Aprende a tu ritmo y saca el máximo provecho.
            </p>

            {/* Search bar */}
            <div className="flex max-w-lg mx-auto bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#F59B1B]/50 transition-colors">
              {/* Section filter dropdown */}
              <div className="relative flex-shrink-0 border-r border-white/10">
                <select
                  value={filterSection}
                  onChange={(e) => setFilterSection(e.target.value)}
                  className="h-full w-32 bg-[#1a1f2e] pl-3 pr-7 py-3 text-xs text-white focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">Todos</option>
                  {SECTIONS.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[var(--muted-foreground)] pointer-events-none" />
              </div>

              {/* Text input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar tutoriales..."
                  className="w-full bg-transparent pl-9 pr-9 py-3 text-sm text-white placeholder:text-[var(--muted-foreground)] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-white transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky anchor nav — hidden while searching */}
      {!isSearching && (
        <div className="sticky top-16 z-20 bg-[var(--background)]/95 backdrop-blur border-b border-white/5">
          <div className="mx-auto max-w-6xl px-6 py-3 flex gap-2 flex-wrap">
            {SECTIONS.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-[#F59B1B]/20 border border-[#F59B1B] text-[#F59B1B]'
                      : 'bg-white/5 border border-white/10 text-[var(--muted-foreground)] hover:text-white hover:border-white/20'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Search results */}
      {isSearching ? (
        <div className="mx-auto max-w-6xl px-6 py-12">
          {searchResults.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-10 w-10 text-white/10 mx-auto mb-4" />
              <p className="text-[var(--muted-foreground)] text-sm">
                No se encontraron tutoriales para <span className="text-white">"{searchQuery}"</span>
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-xs text-[#F59B1B] hover:underline"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">
                <span className="text-white font-medium">{searchResults.length}</span>{' '}
                resultado{searchResults.length !== 1 ? 's' : ''} para{' '}
                <span className="text-white">"{searchQuery}"</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map(({ section, sub, video }) => (
                  <button
                    key={video.id}
                    onClick={() => openModal(video)}
                    className="group text-left bg-[var(--card)] border border-white/5 rounded-xl overflow-hidden hover:border-[#F59B1B]/40 hover:bg-white/5 transition-all duration-200"
                  >
                    {/* Breadcrumb */}
                    <div className="px-4 pt-3 pb-0 flex items-center gap-1.5">
                      <span className="text-[10px] text-[#F59B1B]">{section.label}</span>
                      <span className="text-[10px] text-white/20">›</span>
                      <span className="text-[10px] text-[var(--muted-foreground)]">{sub.label}</span>
                    </div>
                    {/* Thumbnail */}
                    <div className="relative bg-white/5 aspect-video flex items-center justify-center mx-4 mt-2 rounded-lg overflow-hidden">
                      <div className="w-10 h-10 bg-[#F59B1B] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-black text-sm ml-0.5">▶</span>
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {video.duration}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="p-4">
                      <p className="font-semibold text-sm mb-1 group-hover:text-[#F59B1B] transition-colors">
                        {video.title}
                      </p>
                      <p className="text-[var(--muted-foreground)] text-xs leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        /* Normal sections */
        <div className="mx-auto max-w-6xl px-6 py-12 space-y-16">
          {SECTIONS.map((section, sectionIndex) => {
            const Icon = section.icon
            const totalVideos = section.subcategories.reduce((acc, s) => acc + s.videos.length, 0)
            const activeSubId = activeSubs[section.id]
            const activeVideos = section.subcategories.find((s) => s.id === activeSubId)?.videos ?? []

            return (
              <section key={section.id} id={section.id}>
                {/* Section header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-[#F59B1B] rounded-full" />
                  <Icon className="h-5 w-5 text-[#F59B1B]" />
                  <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold">{section.label}</h2>
                  <span className="bg-white/5 border border-white/10 text-[var(--muted-foreground)] text-xs px-2.5 py-0.5 rounded-full">
                    {totalVideos} videos
                  </span>
                </div>

                {/* Subcategory tabs */}
                <div className="flex gap-2 flex-wrap mb-6">
                  {section.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSub(section.id, sub.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                        activeSubId === sub.id
                          ? 'bg-white/10 border border-white/20 text-white font-medium'
                          : 'bg-transparent border border-white/5 text-[var(--muted-foreground)] hover:border-white/15 hover:text-white/70'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                {/* Video grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeVideos.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => openModal(video)}
                      className="group text-left bg-[var(--card)] border border-white/5 rounded-xl overflow-hidden hover:border-[#F59B1B]/40 hover:bg-white/5 transition-all duration-200"
                    >
                      {/* Thumbnail */}
                      <div className="relative bg-white/5 aspect-video flex items-center justify-center">
                        <div className="w-10 h-10 bg-[#F59B1B] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-black text-sm ml-0.5">▶</span>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                          {video.duration}
                        </span>
                      </div>
                      {/* Info */}
                      <div className="p-4">
                        <p className="font-semibold text-sm mb-1 group-hover:text-[#F59B1B] transition-colors">
                          {video.title}
                        </p>
                        <p className="text-[var(--muted-foreground)] text-xs leading-relaxed">
                          {video.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {sectionIndex < SECTIONS.length - 1 && (
                  <div className="mt-16 border-t border-white/5" />
                )}
              </section>
            )
          })}
        </div>
      )}

      {/* YouTube Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              aria-label="Cerrar video"
            >
              <X className="h-6 w-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
              title={selectedVideo.title}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  )
}
