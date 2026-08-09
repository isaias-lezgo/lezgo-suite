'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Users, Target, MessageCircle, BookOpen, X, Search, ChevronDown } from 'lucide-react'

interface Video {
  id: string
  title: string
  description: string
  duration: string
  keywords: string[]
  /** Ruta en /public/thumbnails. Sin ella, la tarjeta cae al placeholder con botón de play. */
  thumbnail?: string
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
            id: 'h1e5Cu4FfGI',
            thumbnail: '/thumbnails/02-agregar-contacto.png',
            title: 'Agregar un contacto',
            description: 'Crea un contacto nuevo desde cero y captura su información.',
            duration: '1:40',
            keywords: ['crear', 'agregar', 'nuevo', 'contacto', 'registro', 'alta', 'capturar'],
          },
          {
            id: '5Qp1kqZzi7s',
            thumbnail: '/thumbnails/03-importacion-de-contactos.png',
            title: 'Importación de contactos',
            description: 'Sube tu base completa desde un archivo y evita la captura manual.',
            duration: '2:18',
            keywords: ['importar', 'importación', 'csv', 'excel', 'masiva', 'base de datos', 'subir', 'carga'],
          },
          {
            id: 'eKEBgRuPwak',
            thumbnail: '/thumbnails/09-secciones-del-contacto-y-reasignacion.png',
            title: 'Secciones del contacto y reasignación',
            description: 'Recorre las secciones del perfil y reasigna el contacto a otro usuario.',
            duration: '3:32',
            keywords: ['secciones', 'perfil', 'reasignar', 'reasignación', 'propietario', 'asignar', 'usuario', 'detalle'],
          },
          {
            id: 'xwnTLDQ4fms',
            thumbnail: '/thumbnails/01-restaurar-contactos.png',
            title: 'Restaurar contactos',
            description: 'Recupera contactos eliminados sin perder su información.',
            duration: '1:11',
            keywords: ['restaurar', 'recuperar', 'eliminados', 'borrados', 'papelera', 'deshacer'],
          },
        ],
      },
      {
        id: 'vistas-listas',
        label: 'Vistas y listas',
        videos: [
          {
            id: '4LDmR2q2UsA',
            thumbnail: '/thumbnails/08-personalizar-vistas-de-contactos.png',
            title: 'Personalizar vistas de contactos',
            description: 'Ajusta cómo se ven tus listas y guarda las vistas que más usas.',
            duration: '2:18',
            keywords: ['vistas', 'personalizar', 'guardar', 'lista', 'configurar', 'tablero'],
          },
          {
            id: 'rQarPRYQDNc',
            thumbnail: '/thumbnails/04-listas-inteligentes.png',
            title: 'Listas inteligentes',
            description: 'Crea listas que se actualizan solas según las condiciones que definas.',
            duration: '2:06',
            keywords: ['listas inteligentes', 'smart list', 'dinámica', 'automática', 'segmento', 'condiciones'],
          },
          {
            id: '0eWluic1bhw',
            thumbnail: '/thumbnails/05-columnas-engrane.png',
            title: 'Columnas: menú de engrane',
            description: 'Usa el ícono de engrane para elegir qué columnas ves en la lista.',
            duration: '1:23',
            keywords: ['columnas', 'engrane', 'engranaje', 'ajustes', 'mostrar', 'ocultar', 'configuración'],
          },
          {
            id: 'NWgRzrX8k-4',
            title: '¿Cómo editar las columnas de una lista?',
            description: 'Agrega, quita y reordena las columnas de cualquier lista.',
            duration: '1:23',
            keywords: ['editar', 'columnas', 'lista', 'reordenar', 'agregar', 'quitar', 'campos'],
          },
        ],
      },
      {
        id: 'busqueda',
        label: 'Búsqueda y orden',
        videos: [
          {
            id: 'QEHjp0Ubvtg',
            thumbnail: '/thumbnails/13-buscador.png',
            title: 'Buscador',
            description: 'Encuentra cualquier contacto en segundos con el buscador.',
            duration: '1:27',
            keywords: ['buscador', 'buscar', 'búsqueda', 'encontrar', 'localizar'],
          },
          {
            id: 'jUGk8u07Wc8',
            thumbnail: '/thumbnails/07-filtros-contactos.png',
            title: 'Filtros de contactos',
            description: 'Filtra tu base por los criterios que necesites para segmentarla.',
            duration: '1:28',
            keywords: ['filtros', 'filtrar', 'segmentar', 'criterios', 'condiciones', 'depurar'],
          },
          {
            id: 'm14_4DojSOg',
            thumbnail: '/thumbnails/06-ordenar-contactos.png',
            title: 'Ordenar contactos',
            description: 'Ordena la lista por fecha, nombre o cualquier otro campo.',
            duration: '1:17',
            keywords: ['ordenar', 'orden', 'clasificar', 'fecha', 'alfabético', 'ascendente', 'descendente'],
          },
        ],
      },
      {
        id: 'configuracion-contactos',
        label: 'Configuración',
        videos: [
          {
            id: 'TkZA7zgMvK4',
            thumbnail: '/thumbnails/12-editar-campos-personalizados.png',
            title: 'Editar campos personalizados',
            description: 'Crea y modifica los campos que tu negocio necesita capturar.',
            duration: '1:42',
            keywords: ['campos personalizados', 'custom fields', 'editar', 'crear', 'campos', 'formulario', 'datos'],
          },
          {
            id: 'HItuFJDEWqw',
            thumbnail: '/thumbnails/15-mapear-formularios.png',
            title: 'Mapear formularios',
            description: 'Conecta cada pregunta de tu formulario con el campo correcto del contacto.',
            duration: '1:29',
            keywords: ['mapear', 'mapeo', 'formularios', 'campos', 'conectar', 'lead', 'captura'],
          },
          {
            id: 'zp5fH1Le40o',
            thumbnail: '/thumbnails/14-registro-de-auditoria.png',
            title: 'Registro de auditoría',
            description: 'Revisa quién hizo cada cambio y cuándo lo hizo.',
            duration: '1:52',
            keywords: ['auditoría', 'registro', 'historial', 'cambios', 'log', 'trazabilidad', 'quién'],
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
            id: '1tTc-5Pfm2M',
            thumbnail: '/thumbnails/10-crear-pipeline.png',
            title: 'Crear un pipeline',
            description: 'Arma tu embudo de ventas con las etapas de tu proceso comercial.',
            duration: '2:16',
            keywords: ['pipeline', 'crear', 'embudo', 'etapas', 'proceso', 'ventas', 'funnel', 'oportunidades'],
          },
          {
            id: 'Q5YESyswX34',
            thumbnail: '/thumbnails/11-editar-gestionar-permisos-pipeline.png',
            title: 'Editar y gestionar permisos de pipeline',
            description: 'Define qué pipelines puede ver y editar cada miembro del equipo.',
            duration: '2:15',
            keywords: ['permisos', 'pipeline', 'editar', 'accesos', 'equipo', 'roles', 'visibilidad', 'gestionar'],
          },
        ],
      },
    ],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: MessageCircle,
    subcategories: [
      {
        id: 'conexion',
        label: 'Conexión y plantillas',
        videos: [
          {
            id: 'AkI8P3Kg2-c',
            thumbnail: '/thumbnails/16-diferencias-tipos-whatsapp.png',
            title: 'Diferencias entre tipos de WhatsApp',
            description: 'Entiende qué tipo de WhatsApp le conviene a tu operación antes de conectarlo.',
            duration: '6:49',
            keywords: ['whatsapp', 'tipos', 'diferencias', 'business', 'api', 'qr', 'comparación', 'cuál elegir'],
          },
          {
            id: '2LmypbpJbJE',
            thumbnail: '/thumbnails/18-conectar-whatsapp-codigo-qr.png',
            title: 'Conectar WhatsApp por código QR',
            description: 'Vincula tu número escaneando el código QR paso a paso.',
            duration: '3:30',
            keywords: ['whatsapp', 'conectar', 'qr', 'código', 'vincular', 'escanear', 'número', 'integración'],
          },
          {
            id: 'ky1dCzNKrnw',
            thumbnail: '/thumbnails/17-plantilla-de-whatsapp.png',
            title: 'Plantillas de WhatsApp',
            description: 'Crea plantillas para responder más rápido y mantener un mensaje consistente.',
            duration: '4:38',
            keywords: ['plantilla', 'plantillas', 'whatsapp', 'template', 'mensajes', 'respuestas', 'crear'],
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

function VideoThumbnail({ video, className = '' }: { video: Video; className?: string }) {
  return (
    <div className={`relative aspect-video bg-white/5 overflow-hidden ${className}`}>
      {video.thumbnail && (
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      )}
      {/* Play: siempre visible sin thumbnail, al hover cuando sí hay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          video.thumbnail ? 'bg-black/45 opacity-0 group-hover:opacity-100' : ''
        }`}
      >
        <div className="w-11 h-11 bg-[#F59B1B] rounded-full flex items-center justify-center shadow-lg">
          <span className="text-black text-sm ml-0.5">▶</span>
        </div>
      </div>
      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
        {video.duration}
      </span>
    </div>
  )
}

export default function BaseConocimientoContent() {
  const [activeSection, setActiveSection] = useState('contactos')
  const [activeSubs, setActiveSubs] = useState<Record<string, string>>(
    () => Object.fromEntries(SECTIONS.map((s) => [s.id, s.subcategories[0].id]))
  )
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSection, setFilterSection] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
            <p className="text-[var(--muted-foreground)] text-base md:text-lg max-w-xl mx-auto">
              Tutoriales en video para dominar cada módulo de tu plataforma. Aprende a tu ritmo y saca el máximo provecho.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky nav — always visible */}
      <div className="sticky top-16 z-20 bg-[var(--background)]/95 backdrop-blur border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">

          {/* Section pills — hidden while searching */}
          {!isSearching && (
            <div className="flex gap-2 flex-wrap flex-1">
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
          )}

          {/* Search bar — always visible, full width on mobile */}
          <div
            ref={dropdownRef}
            className={`relative flex items-center bg-white/5 border border-white/10 rounded-xl focus-within:border-[#F59B1B]/50 transition-all duration-200 w-full sm:w-auto ${
              isSearching ? 'sm:flex-1' : 'sm:w-64'
            }`}
          >
            {/* Section filter dropdown trigger */}
            <div className="relative flex-shrink-0 border-r border-white/10">
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-1 h-full w-28 pl-3 pr-2 py-2.5 text-xs text-white focus:outline-none cursor-pointer whitespace-nowrap"
              >
                <span className="flex-1 text-left truncate">
                  {filterSection ? SECTIONS.find((s) => s.id === filterSection)?.label : 'Todos'}
                </span>
                <ChevronDown className={`h-3 w-3 text-white/50 flex-shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-44 bg-[#1a1f2e] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                  {[{ id: '', label: 'Todos los módulos' }, ...SECTIONS.map((s) => ({ id: s.id, label: s.label }))].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => { setFilterSection(opt.id); setDropdownOpen(false) }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                        filterSection === opt.id
                          ? 'text-[#F59B1B] bg-[#F59B1B]/10'
                          : 'text-white hover:bg-white/5'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Text input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar tutoriales..."
                className="w-full bg-transparent pl-8 pr-8 py-2.5 text-sm placeholder:text-white/30 focus:outline-none"
                style={{ color: '#ffffff', caretColor: '#F59B1B', WebkitTextFillColor: '#ffffff' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

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
                    <VideoThumbnail video={video} className="mx-4 mt-2 rounded-lg" />
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
                      <VideoThumbnail video={video} />
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
