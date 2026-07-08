'use client'

// SWAP: replace the text badges below with <Image> grayscale transparent PNGs
// when Iván provides the client logos. Structure/hover behavior stays the same.
const CLIENTES = ["Yconia", "Plaza Bosques", "Muratta", "Condesa", "Vaeo", "Grand Center"]

export default function LogosClientes() {
  return (
    <section className="py-14 border-y border-gray-200 bg-white/50">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500 mb-8">
          Agencias y desarrolladoras que ya operan con Lezgo Suite
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {CLIENTES.map((nombre) => (
            <span
              key={nombre}
              className="text-lg sm:text-xl font-bold font-heading text-gray-400 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:text-[#F59B1B]"
            >
              {nombre}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
