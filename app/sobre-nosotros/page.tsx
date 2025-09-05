"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Users2, Layers3, Phone, MapPin, Home } from "lucide-react";

export default function SobreNosotrosPage() {
  const stats = [
    { label: "+ años de experiencia", value: "14+" },
    { label: "Especialistas", value: "52+" },
    { label: "Empresas en el grupo", value: "4" },
  ];

  const empresas = [
    {
      title: "FRACS App",
      description:
        "Aplicación inmobiliaria que une innovación y atención personalizada para transformar la búsqueda y adquisición de propiedades habitacionales, comerciales e industriales.",
    },
    {
      title: "Protección de Inmuebles",
      description:
        "Institución enfocada en proteger inmuebles y propietarios por medio de la investigación y calificación de inquilinos, blindando la integridad legal y física de las propiedades arrendadas.",
    },
    {
      title: "Lezgo Desarrolladora",
      description:
        "Empresa dedicada al desarrollo integral de proyectos inmobiliarios y a la comercialización exclusiva, desde la planeación hasta la ejecución para maximizar la rentabilidad.",
    },
    {
      title: "Lezgo Partners",
      description:
        "Alianzas estratégicas que potencian el ecosistema inmobiliario del grupo para inversión, gestión y expansión de proyectos.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0817370d] via-white to-white" />
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400 bg-[#F59B1B]/10 px-3 py-1 text-xs md:text-sm text-[#081737] shadow-sm">
              <Layers3 className="h-3.5 w-3.5 text-[#F59B1B]" /> Ecosistema Inmobiliario
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Sobre <span className="text-[#081737]">Grupo Lezgo</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600">
              Somos un grupo empresarial especializado en el sector inmobiliario. Operamos con
              sistemas, estructuras y software propios, y herramientas tecnológicas de primer
              nivel para entregar resultados con productividad y transparencia.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="text-3xl md:text-4xl font-semibold tracking-tight text-[#F59B1B]">{s.value}</div>
                <div className="mt-1 text-sm md:text-base text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="mx-auto max-w-7xl px-6 pb-8 md:pb-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#081737]">Quiénes somos</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Grupo Lezgo está conformado por empresas que abarcan construcción, comercialización
              de desarrollos, administración de inversiones, gestoría y tramitología
              especializada y servicios legales inmobiliarios. Nuestro equipo multidisciplinario
              acompaña a clientes e inversionistas de principio a fin, desde la planeación hasta
              la ejecución y comercialización de cada proyecto.
            </p>
            <ul className="mt-6 list-disc pl-6 text-slate-600 space-y-2">
              <li>Altos estándares de productividad respaldados por procesos y software propios.</li>
              <li>Uso intensivo de tecnología para una toma de decisiones ágil y transparente.</li>
              <li>Enfoque integral para maximizar el valor y la rentabilidad de los desarrollos.</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <Building2 className="h-6 w-6 text-[#081737]" />
                <div>
                  <h3 className="font-medium text-[#081737]">Oficina Corporativa</h3>
                  <p className="mt-2 text-sm text-slate-600">
                  Corporativo High Park, Lic. Manuel Gómez Morin 3960-Torre 100 Oficina 7A, Centro Sur, 76090 Santiago de Querétaro, Qro.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#F59B1B]" />
                <div>
                  <p className="text-sm text-slate-600">(442) 161 2994</p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#F59B1B]" />
                <a
                  href="https://maps.app.goo.gl/ZZcs4ZGnL4NnZjX99"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[#081737] underline underline-offset-4 hover:no-underline"
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empresas del grupo */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="md:flex md:items-end md:justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#081737]">Empresas del grupo</h2>
          <p className="mt-2 text-slate-600 md:max-w-xl">
            Cada empresa atiende una parte específica del ecosistema inmobiliario, conectadas por
            procesos y tecnología compartida para brindar una experiencia de punta a punta.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {empresas.map((e) => (
            <div
              key={e.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <Layers3 className="h-5 w-5 text-[#F59B1B]" />
                <h3 className="font-medium tracking-tight text-[#081737]">{e.title}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="mx-auto max-w-7xl px-6 pb-12 md:pb-20">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#081737]">Nuestro equipo</h2>
              <p className="mt-3 text-slate-600">
                Más de 52 especialistas en comercialización, desarrollo, legal y operaciones
                trabajan coordinados bajo metodologías y KPIs claros para cumplir tus metas
                inmobiliarias.
              </p>
            </div>
            <div className="flex items-center md:justify-end">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F59B1B] px-4 py-2 text-sm text-[#081737]">
                <Users2 className="h-4 w-4 text-[#F59B1B]" /> Equipo multidisciplinario
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20">
          <div className="rounded-3xl bg-gradient-to-br from-[#081737] to-[#0f2c4f] px-8 py-12 md:px-12 md:py-16 text-white shadow-lg">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#F59B1B]">
                  ¿Listo para colaborar con Grupo Lezgo?
                </h3>
                <p className="mt-3 text-slate-200">
                  Conversemos sobre tus necesidades de inversión, desarrollo o comercialización.
                  Nuestro equipo te acompaña en todo el proceso.
                </p>
              </div>
              <div className="flex items-center md:justify-end">
                <Home className="h-32 w-32 " />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}