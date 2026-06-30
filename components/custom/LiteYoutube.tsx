'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

const ORANGE = '#DF7F1E'

/**
 * Reproductor de YouTube "lite": muestra la miniatura y solo monta el iframe
 * cuando el usuario hace clic, para no penalizar la carga de la página con
 * muchos videos a la vez.
 *
 * Pasa `videoId` (el ID del video de YouTube, p.ej. "dQw4w9WgXcQ"). Si se deja
 * vacío, se muestra un estado "Próximamente" sin reproductor.
 */
export default function LiteYoutube({
  videoId,
  title,
}: {
  videoId?: string
  title: string
}) {
  const [active, setActive] = useState(false)

  if (!videoId) {
    return (
      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-2"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <span
          className="font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 rounded uppercase"
          style={{ color: ORANGE, border: `1px solid ${ORANGE}35`, background: `${ORANGE}12` }}
        >
          Próximamente
        </span>
        <span className="text-xs" style={{ color: '#6A7390' }}>
          Video en preparación
        </span>
      </div>
    )
  }

  if (active) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Reproducir: ${title}`}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden block"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0" style={{ background: 'rgba(22,33,60,0.35)' }} />
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full transition-transform duration-300 group-hover:scale-110"
        style={{ background: ORANGE, boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}
      >
        <Play className="w-6 h-6 ml-0.5" fill="#fff" color="#fff" />
      </span>
    </button>
  )
}
