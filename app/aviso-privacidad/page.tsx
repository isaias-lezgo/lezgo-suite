"use client";

// components/aviso-privacidad/AvisoPrivacidadClient.tsx
// Stack: Next.js App Router · TypeScript · Tailwind · @radix-ui/react-accordion · framer-motion
//
// Instala dependencias si aún no las tienes:
//   npm install @radix-ui/react-accordion framer-motion
//   npm install -D @types/react

import { useEffect, useRef, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND = {
  navy: "#1B2B4B",
  blue: "#2E5490",
  red: "#C0392B",
  gray: "#F7F8FA",
  border: "#E2E8F0",
  text: "#1A202C",
  muted: "#64748B",
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Section {
  id: string;
  num: string;
  title: string;
  content: ReactNode;
}

// ─── Datos del aviso ──────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  {
    id: "identidad",
    num: "I",
    title: "Identidad y domicilio del responsable",
    content: (
      <p>
        Grupo Lezgo S.C., en adelante referido como &ldquo;Grupo Lezgo&rdquo;, con domicilio
        ubicado en{" "}
        <strong>
          Avenida Antea Número 1130 interior 609, Colonia Jurica, C.P. 76100, Santiago de
          Querétaro, Querétaro, México
        </strong>
        , en cumplimiento con lo establecido en la Ley Federal de Protección de Datos Personales
        en Posesión de los Particulares (en adelante la &ldquo;Ley&rdquo;), su Reglamento,
        Lineamientos y demás disposiciones aplicables, es responsable del tratamiento, protección,
        resguardo, y uso de sus datos personales conforme al presente Aviso de Privacidad.
      </p>
    ),
  },
  {
    id: "datos",
    num: "II",
    title: "Datos personales que serán recabados",
    content: (
      <>
        <p className="mb-4">
          Grupo Lezgo podrá recabar, directa o indirectamente, los siguientes datos personales:
        </p>
        <ul className="space-y-2">
          {(
            [
              [
                "Datos de identificación",
                "Nombre completo, denominación o razón social, domicilio, teléfonos de contacto (móvil y fijo), correo electrónico, RFC, CURP.",
              ],
              ["Datos laborales", "Puesto, área, antigüedad, referencias."],
              ["Datos financieros", "Información de facturación, pagos y cuentas."],
              [
                "Datos tecnológicos",
                "Historial de navegación, interacciones en CRM, WhatsApp API, IVR, Make, etc.",
              ],
              ["Datos de comunicación", "Mensajes, formularios, grabaciones."],
              [
                "Analítica derivada",
                "Comportamiento, reportes, métricas.",
              ],
            ] as [string, string][]
          ).map(([label, desc]) => (
            <li key={label} className="flex gap-3 items-start">
              <span
                className="mt-[6px] w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: BRAND.red }}
              />
              <span>
                <strong>{label}:</strong> {desc}
              </span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "finalidades",
    num: "III",
    title: "Finalidades del tratamiento",
    content: (
      <>
        <div className="mb-5">
          <h4 className="font-semibold mb-3" style={{ color: BRAND.navy }}>
            Finalidades primarias
          </h4>
          <ol className="space-y-1 list-decimal list-inside">
            {[
              "Establecer relación jurídica/comercial.",
              "Gestionar plataformas tecnológicas contratadas.",
              "Dar soporte, mantenimiento y operación.",
              "Procesar pagos automáticos.",
              "Cumplir obligaciones fiscales y legales.",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="font-semibold mb-3" style={{ color: BRAND.navy }}>
            Finalidades secundarias
          </h4>
          <ul className="space-y-1">
            {[
              "Envío de promociones y contenidos informativos.",
              "Encuestas de calidad y participación en eventos.",
            ].map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span
                  className="mt-[6px] w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: BRAND.red }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "transferencias",
    num: "IV",
    title: "Transferencias de datos personales",
    content: (
      <>
        <p className="mb-4">Podrán transferirse a:</p>
        <ul className="space-y-2 mb-4">
          {[
            "Proveedores tecnológicos como Go High Level, Meta, procesadores de pago.",
            "Sociedades afiliadas con fines administrativos u operativos.",
          ].map((item) => (
            <li key={item} className="flex gap-3 items-start">
              <span
                className="mt-[6px] w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: BRAND.red }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          Las transferencias estarán protegidas mediante cláusulas de confidencialidad y medidas
          de seguridad conforme a la Ley.
        </p>
      </>
    ),
  },
  {
    id: "mecanismos",
    num: "V",
    title: "Mecanismos de obtención y tecnologías de rastreo",
    content: (
      <p>
        Se recabarán datos mediante formularios físicos y digitales, navegación en sitios web y
        uso de tecnologías como{" "}
        <strong>cookies, APIs, etiquetas y herramientas de analítica</strong> que permiten conocer
        la interacción con las plataformas administradas.
      </p>
    ),
  },
  {
    id: "arco",
    num: "VI",
    title: "Derechos ARCO",
    content: (
      <>
        <p className="mb-4">Usted o su representante legal podrán ejercer:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {(
            [
              { letra: "A", nombre: "Acceso", desc: "Conocer datos en posesión de Grupo Lezgo." },
              { letra: "R", nombre: "Rectificación", desc: "Corregir datos inexactos." },
              { letra: "C", nombre: "Cancelación", desc: "Eliminar datos de bases activas." },
              {
                letra: "O",
                nombre: "Oposición",
                desc: "Negarse al uso de datos para fines no deseados.",
              },
            ] as { letra: string; nombre: string; desc: string }[]
          ).map(({ letra, nombre, desc }) => (
            <div
              key={letra}
              className="flex gap-3 items-start p-3 rounded-lg border"
              style={{ borderColor: BRAND.border, background: BRAND.gray }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: BRAND.blue }}
              >
                {letra}
              </div>
              <div>
                <p className="font-semibold text-sm">{nombre}</p>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-lg p-4 border"
          style={{ borderColor: BRAND.border, background: "#EFF6FF" }}
        >
          <p className="font-semibold mb-2" style={{ color: BRAND.navy }}>
            Procedimiento
          </p>
          <ol className="space-y-1 list-decimal list-inside text-sm">
            <li>
              Enviar solicitud a{" "}
              <a
                href="mailto:privacidad@grupolezgo.com.mx"
                className="font-medium underline"
                style={{ color: BRAND.blue }}
              >
                privacidad@grupolezgo.com.mx
              </a>
            </li>
            <li>
              Incluir: nombre, medios de contacto, documentos de identidad, descripción de la
              solicitud y, en su caso, documentos de respaldo.
            </li>
          </ol>
          <p className="font-semibold mt-4 mb-1" style={{ color: BRAND.navy }}>
            Tiempos de respuesta
          </p>
          <ul className="text-sm space-y-1">
            <li>
              • Respuesta: <strong>20 días hábiles</strong>
            </li>
            <li>
              • Implementación: <strong>15 días hábiles posteriores</strong>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "seguridad",
    num: "VII",
    title: "Medidas de seguridad",
    content: (
      <>
        <p className="mb-4">
          Grupo Lezgo aplica medidas administrativas, técnicas y físicas, incluyendo:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(
            [
              ["🔐", "Acceso restringido a datos"],
              ["🔒", "Conexiones seguras (HTTPS)"],
              ["💾", "Cifrado de almacenamiento"],
              ["🗄️", "Respaldo de información"],
              ["📄", "Contratos de confidencialidad con personal y terceros"],
            ] as [string, string][]
          ).map(([icon, text]) => (
            <div
              key={text}
              className="flex items-center gap-3 p-3 rounded-lg border text-sm"
              style={{ borderColor: BRAND.border, background: BRAND.gray }}
            >
              <span className="text-lg" aria-hidden="true">
                {icon}
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "modificaciones",
    num: "VIII",
    title: "Modificaciones al Aviso",
    content: (
      <>
        <p className="mb-3">
          Grupo Lezgo podrá modificar este Aviso en cualquier momento por:
        </p>
        <ul className="space-y-1 mb-4">
          {["Cambios legislativos.", "Actualizaciones internas.", "Nuevos servicios."].map(
            (item) => (
              <li key={item} className="flex gap-3 items-start">
                <span
                  className="mt-[6px] w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: BRAND.red }}
                />
                <span>{item}</span>
              </li>
            )
          )}
        </ul>
        <p>
          Las modificaciones serán publicadas en medios oficiales y se considerará{" "}
          <strong>consentimiento tácito</strong> si no hay objeción.
        </p>
      </>
    ),
  },
  {
    id: "consentimiento",
    num: "IX",
    title: "Consentimiento tácito y expreso",
    content: (
      <>
        <p className="mb-3">
          El consentimiento se entiende otorgado tácitamente si no hay oposición expresa.
        </p>
        <p>
          En caso de <strong>datos sensibles o financieros</strong>, se requerirá consentimiento
          expreso, mediante firma o acción afirmativa documentada.
        </p>
      </>
    ),
  },
  {
    id: "responsabilidad",
    num: "X",
    title: "Limitación de responsabilidad sobre plataformas de terceros",
    content: (
      <>
        <p className="mb-3">
          Grupo Lezgo configura y opera servicios con plataformas externas como{" "}
          <strong>Go High Level, Meta, Make</strong>. No es responsable de:
        </p>
        <ul className="space-y-1 mb-4">
          {[
            "Fallos técnicos o de disponibilidad.",
            "Modificaciones unilaterales.",
            "Pérdida de datos causada por terceros.",
          ].map((item) => (
            <li key={item} className="flex gap-3 items-start">
              <span
                className="mt-[6px] w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: BRAND.red }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>Se actuará como intermediario en la resolución dentro de lo posible.</p>
      </>
    ),
  },
  {
    id: "jurisdiccion",
    num: "XI",
    title: "Jurisdicción y ley aplicable",
    content: (
      <p>
        Este Aviso se rige por la <strong>legislación mexicana vigente</strong> y se somete a la
        jurisdicción de los tribunales competentes de Querétaro, Qro., renunciando a cualquier
        otro fuero que pudiera corresponder por razón de domicilio presente o futuro.
      </p>
    ),
  },
];

// ─── Sub-componente: AnimatedSection ─────────────────────────────────────────
interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Sub-componente: Logo SVG ─────────────────────────────────────────────────
interface LogoProps {
  size?: number;
}

function GrupoLezgoLogo({ size = 40 }: LogoProps) {
  const w = size * 2.5;
  const h = size;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Grupo Lezgo"
      role="img"
    >
      {/* Ícono casa */}
      <polygon points="10,38 30,18 50,38" fill={BRAND.red} />
      <rect x="14" y="38" width="32" height="24" fill={BRAND.navy} />
      <rect x="22" y="44" width="10" height="10" fill="white" opacity="0.8" />
      <rect x="11" y="32" width="4" height="30" fill={BRAND.navy} />
      {/* Texto */}
      <text
        x="62"
        y="28"
        fontFamily="'Inter', 'Helvetica Neue', sans-serif"
        fontSize="11"
        fontWeight="600"
        fill={BRAND.muted}
        letterSpacing="2"
      >
        GRUPO
      </text>
      <text
        x="60"
        y="56"
        fontFamily="'Inter', 'Helvetica Neue', sans-serif"
        fontSize="30"
        fontWeight="800"
        fill={BRAND.navy}
        letterSpacing="1"
      >
        LEZGO
      </text>
    </svg>
  );
}

// ─── Componente principal (Client) ────────────────────────────────────────────
export default function AvisoPrivacidadClient() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [openItems, setOpenItems] = useState<string[]>([SECTIONS[0].id]);

  // Mapa de refs tipadas
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Intersection Observer → ToC activo
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpenItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className="min-h-screen" style={{ background: BRAND.gray, color: BRAND.text }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.blue} 100%)`,
        }}
      >
        {/* Patrón de puntos decorativo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                              radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-6"
          >
            

            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight"
              >
                Aviso de Privacidad
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-blue-200 text-sm md:text-base"
              >
                Fecha de última actualización:{" "}
                <span className="text-white font-semibold">Abril 2025</span>
                &nbsp;·&nbsp; Ley Federal de Protección de Datos Personales (LFPDPPP)
              </motion.p>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white border border-white/20 backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#4ADE80" }}
              />
              Aviso vigente · México
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ── Layout principal ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 flex gap-8">

        {/* ── Tabla de contenidos (sticky, solo desktop) ─────────────────────── */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div
            className="sticky top-6 rounded-2xl border p-4 shadow-sm"
            style={{ borderColor: BRAND.border, background: "white" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: BRAND.muted }}
            >
              Contenido
            </p>

            <nav aria-label="Secciones del aviso de privacidad">
              <ul className="space-y-0.5">
                {SECTIONS.map(({ id, num, title }) => {
                  const isActive = activeSection === id;
                  return (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        aria-current={isActive ? "location" : undefined}
                        className="w-full text-left flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                        style={{
                          background: isActive ? `${BRAND.blue}15` : "transparent",
                          color: isActive ? BRAND.blue : BRAND.muted,
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        <span
                          className="mt-0.5 text-xs font-bold flex-shrink-0 w-5"
                          style={{ color: isActive ? BRAND.red : "#CBD5E1" }}
                        >
                          {num}.
                        </span>
                        <span className="leading-snug">{title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA contacto */}
            
          </div>
        </aside>

        {/* ── Secciones ─────────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          <Accordion.Root
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="space-y-3"
          >
            {SECTIONS.map(({ id, num, title, content }, idx) => {
              const isOpen = openItems.includes(id);
              return (
                <AnimatedSection key={id} delay={idx * 0.04}>
                  <div
                    ref={(el) => {
                      sectionRefs.current[id] = el;
                    }}
                  >
                    <Accordion.Item
                      value={id}
                      className="rounded-2xl border overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md"
                      style={{
                        borderColor: isOpen ? BRAND.blue : BRAND.border,
                        background: "white",
                      }}
                    >
                      <Accordion.Header asChild>
                        <h2>
                          <Accordion.Trigger className="w-full flex items-center gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-t-2xl cursor-pointer group">
                            {/* Número */}
                            <div
                              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white transition-all duration-300"
                              style={{
                                background: isOpen
                                  ? `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.navy})`
                                  : BRAND.muted,
                              }}
                            >
                              {num}
                            </div>

                            {/* Título */}
                            <span
                              className="flex-1 text-base font-semibold transition-colors duration-200"
                              style={{ color: isOpen ? BRAND.navy : BRAND.text }}
                            >
                              {title}
                            </span>

                            {/* Chevron */}
                            <motion.svg
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                              className="flex-shrink-0 w-5 h-5"
                              style={{ color: isOpen ? BRAND.blue : BRAND.muted }}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </motion.svg>
                          </Accordion.Trigger>
                        </h2>
                      </Accordion.Header>

                      <Accordion.Content forceMount asChild>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.section
                              key="content"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                              style={{ overflow: "hidden" }}
                            >
                              <div
                                className="px-6 pb-6 pt-4 text-sm leading-relaxed space-y-3"
                                style={{
                                  color: "#374151",
                                  borderTop: `1px solid ${BRAND.border}`,
                                }}
                              >
                                {content}
                              </div>
                            </motion.section>
                          )}
                        </AnimatePresence>
                      </Accordion.Content>
                    </Accordion.Item>
                  </div>
                </AnimatedSection>
              );
            })}
          </Accordion.Root>

          {/* ── Footer CTA ──────────────────────────────────────────────────── */}
          <AnimatedSection delay={0.1}>
            <div
              className="mt-8 rounded-2xl p-6 text-center border"
              style={{
                borderColor: BRAND.border,
                background: `linear-gradient(135deg, ${BRAND.navy}08, ${BRAND.blue}08)`,
              }}
            >
             

              <p className="text-sm text-gray-500 max-w-lg mx-auto mb-4">
                Para ejercer tus derechos ARCO o aclarar dudas sobre el tratamiento de tus datos
                personales, contáctanos directamente.
              </p>

              

              <p className="text-xs text-gray-400 mt-5">
                © {new Date().getFullYear()} Grupo Lezgo S.C. · Santiago de Querétaro, México ·
                Todos los derechos reservados.
              </p>
            </div>
          </AnimatedSection>
        </main>
      </div>
    </div>
  );
}