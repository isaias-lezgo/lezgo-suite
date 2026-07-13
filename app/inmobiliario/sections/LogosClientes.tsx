'use client'

// Logos reales de clientes (descargados de sus sitios oficiales a /public/logos-clientes).
// Se renderizan en escala de grises + opacidad para lograr un strip armónico pese a los
// distintos colores/estilos; al pasar el cursor recuperan su color de marca.
// `h` = altura óptica en px (se ajusta por logo para equilibrar imagotipos vs. iconos cuadrados).
const CLIENTES = [
  { nombre: "Grupo DRT", src: "/logos-clientes/drt.png", h: 34 },
  { nombre: "Kapitaliza", src: "/logos-clientes/kapitaliza.png", h: 46 },
  { nombre: "VAEO", src: "/logos-clientes/vaeo.svg", h: 30 },
  { nombre: "Grand Center", src: "/logos-clientes/grandcenter.svg", h: 30 },
  { nombre: "Yconia", src: "/logos-clientes/yconia-user.png", h: 42 },
  { nombre: "Grupo HAI", src: "/logos-clientes/hai-user.png", h: 44 },
]

export default function LogosClientes() {
  // Duplicamos la lista para lograr el bucle infinito sin saltos.
  const loop = [...CLIENTES, ...CLIENTES]

  return (
    <section className="py-14 border-y border-gray-200 bg-white/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500 mb-8">
          Agencias y desarrolladoras que ya operan con Lezgo Suite
        </p>
      </div>

      {/* Carrusel infinito: se desplaza de izquierda a derecha de forma continua.
          Máscara con degradado para desvanecer los bordes. */}
      <div
        className="group relative w-full"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="flex w-max items-center animate-logos-scroll group-hover:[animation-play-state:paused]">
          {loop.map((c, i) => (
            <div
              key={`${c.nombre}-${i}`}
              aria-hidden={i >= CLIENTES.length}
              className="mx-8 sm:mx-12 flex shrink-0 items-center"
            >
              <img
                src={c.src}
                alt={c.nombre}
                draggable={false}
                loading="lazy"
                style={{ height: c.h }}
                className="w-auto select-none opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes logos-scroll {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-logos-scroll {
          animation: logos-scroll 32s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-logos-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
