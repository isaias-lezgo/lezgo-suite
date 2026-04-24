"use client";

// components/terminos/TerminosYCondiciones.tsx
// Stack: Next.js App Router · TypeScript · Tailwind · @radix-ui/react-accordion · framer-motion

import { useEffect, useRef, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

// ─── Brand tokens (idénticos al Aviso de Privacidad) ─────────────────────────
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

// ─── Helper: bullet item ──────────────────────────────────────────────────────
function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span
        className="mt-[6px] w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: BRAND.red }}
      />
      <span>{children}</span>
    </li>
  );
}

// ─── Secciones ────────────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  {
    id: "condiciones-uso",
    num: "IV",
    title: "Condiciones de uso",
    content: (
      <>
        <p className="mb-4">
          El cliente se obliga a utilizar los servicios conforme a las leyes aplicables, buenas
          prácticas comerciales y a los fines establecidos en cada contrato. En particular, el
          cliente se compromete a:
        </p>
        <ol className="space-y-2 list-decimal list-inside">
          {[
            "No utilizar los sistemas para fines ilícitos, inmorales o contrarios a las políticas de las plataformas utilizadas.",
            "No distribuir, copiar o sublicenciar configuraciones realizadas por Lezgo Suite sin autorización escrita.",
            "No suplantar identidades ni utilizar datos de terceros sin consentimiento documentado.",
            "Proveer información veraz, suficiente y oportuna para permitir la ejecución de los servicios contratados.",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </>
    ),
  },
  {
    id: "servicios",
    num: "V",
    title: "Servicios ofrecidos",
    content: (
      <>
        <p className="mb-4">Lezgo Suite S.C. ofrece, entre otros:</p>
        <ul className="space-y-2">
          {[
            "Implementación de CRM sobre Go High Level con personalización por nicho.",
            "Integración y configuración de WhatsApp Business API (mediante Meta y proveedores aprobados).",
            "Automatización de procesos de venta y atención con herramientas como Make, Zapier, API REST y Webhooks.",
            "Soporte técnico y funcional en horarios establecidos.",
            "Capacitación básica o avanzada en el uso de plataformas contratadas.",
            "Consultoría de optimización de flujos de venta digital.",
          ].map((item) => (
            <Bullet key={item}>{item}</Bullet>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "contratacion",
    num: "VI",
    title: "Contratación y vigencia",
    content: (
      <>
        <p className="mb-4">La contratación puede formalizarse mediante:</p>
        <ol className="space-y-2 list-decimal list-inside mb-5">
          {[
            "Firma autógrafa de contrato.",
            "Firma digital por medios validados (PDF firmado, plataformas electrónicas).",
            "Aceptación mediante botón de 'Sí, acepto' en formularios o correos electrónicos.",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <div
          className="rounded-lg p-4 border text-sm"
          style={{ borderColor: BRAND.border, background: "#EFF6FF" }}
        >
          <p className="font-semibold mb-1" style={{ color: BRAND.navy }}>
            Renovación automática
          </p>
          <p>
            La vigencia puede ser mensual, por proyecto o por contrato con duración definida. La
            renovación será automática salvo indicación escrita con al menos{" "}
            <strong>7 días naturales</strong> de anticipación a la fecha de corte.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "obligaciones",
    num: "VII",
    title: "Obligaciones del cliente",
    content: (
      <ul className="space-y-2">
        {[
          "Entregar la información solicitada en tiempo y forma.",
          "Proveer accesos seguros a plataformas y cuentas necesarias.",
          "Aceptar entregables conforme a los tiempos establecidos.",
          "Cumplir con los pagos en los términos acordados.",
          "No interferir, modificar ni revender sin permiso lo configurado por Lezgo Suite.",
        ].map((item) => (
          <Bullet key={item}>{item}</Bullet>
        ))}
      </ul>
    ),
  },
  {
    id: "propiedad-intelectual",
    num: "VIII",
    title: "Propiedad intelectual",
    content: (
      <>
        <p className="mb-3">
          Lezgo Suite conserva la titularidad de toda metodología, lógica, diseño, estructura de
          automatización, documentación técnica, plantillas y configuraciones desarrolladas como
          parte del servicio, salvo pacto en contrario.
        </p>
        <div
          className="rounded-lg p-4 border text-sm"
          style={{ borderColor: BRAND.border, background: BRAND.gray }}
        >
          <p>
            Una vez liquidado el servicio, se entregan al cliente los entregables pactados para
            su <strong>uso exclusivo</strong>, sin derecho de reproducción o distribución salvo
            autorización expresa.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "confidencialidad",
    num: "IX",
    title: "Confidencialidad",
    content: (
      <>
        <p className="mb-3">
          Lezgo Suite se compromete a no divulgar, ceder o utilizar en beneficio propio o de
          terceros cualquier información confidencial del cliente, la cual incluye:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {[
            ["🗄️", "Bases de datos"],
            ["📊", "Estrategias comerciales"],
            ["⚙️", "Configuraciones y flujos"],
            ["🔑", "Claves de acceso"],
            ["💬", "Textos comerciales"],
            ["🔒", "Datos sensibles"],
          ].map(([icon, text]) => (
            <div
              key={text}
              className="flex items-center gap-3 p-3 rounded-lg border text-sm"
              style={{ borderColor: BRAND.border, background: BRAND.gray }}
            >
              <span className="text-base" aria-hidden="true">
                {icon}
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
        <p className="text-sm">
          La confidencialidad permanece{" "}
          <strong>incluso después de terminada la relación contractual</strong>.
        </p>
      </>
    ),
  },
  {
    id: "soporte",
    num: "X",
    title: "Soporte y atención",
    content: (
      <>
        <div
          className="flex items-start gap-4 rounded-lg p-4 border mb-4"
          style={{ borderColor: BRAND.border, background: "#EFF6FF" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.navy})` }}
          >
            🕘
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: BRAND.navy }}>
              Horario de atención
            </p>
            <p className="text-sm">
              Lunes a viernes · <strong>9:00 a 18:00 hrs</strong> (hora del centro de México)
            </p>
          </div>
        </div>

        <p className="mb-3 text-sm">Canales disponibles:</p>
        <ul className="space-y-2 mb-4">
          {["WhatsApp corporativo", "Comunidad de Lezgo Suite"].map((item) => (
            <Bullet key={item}>{item}</Bullet>
          ))}
        </ul>
        <p className="text-sm">
          Los tiempos de respuesta dependen de la criticidad del incidente. Para casos urgentes,
          la atención será priorizada, aunque no se garantiza una resolución inmediata si depende
          de proveedores externos.
        </p>
      </>
    ),
  },
  {
    id: "pagos",
    num: "XI",
    title: "Pagos y política de facturación",
    content: (
      <>
        <p className="mb-4">
          Los pagos serán anticipados, recurrentes o únicos, según el modelo acordado. El cliente
          acepta la facturación automática a través de medios como{" "}
          <strong>Stripe o transferencias autorizadas</strong>.
        </p>
        <div
          className="rounded-lg p-4 border text-sm"
          style={{ borderColor: "#FCA5A5", background: "#FFF5F5" }}
        >
          <p className="font-semibold mb-1" style={{ color: BRAND.red }}>
            Política de impago
          </p>
          <p>
            En caso de fallo de cobro, se intentará un segundo cargo en las siguientes{" "}
            <strong>48 horas</strong>. Si persiste el impago, el servicio se suspenderá y se
            reactivará solo una vez regularizado el pago.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "terminacion",
    num: "XII",
    title: "Terminación anticipada",
    content: (
      <>
        <p className="mb-4">
          El cliente podrá cancelar el servicio con aviso escrito de al menos{" "}
          <strong>30 días naturales</strong>. En caso de no hacerlo dentro del plazo, se
          facturará un ciclo adicional antes de la baja.
        </p>
        <p className="mb-3">
          Lezgo Suite podrá suspender o cancelar la relación sin previo aviso si:
        </p>
        <ul className="space-y-2">
          {[
            "El cliente incumple con los pagos.",
            "Se detecta un uso fraudulento o indebido.",
            "Hay incumplimiento de cláusulas contractuales o legales.",
          ].map((item) => (
            <Bullet key={item}>{item}</Bullet>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "modificaciones",
    num: "XIII",
    title: "Modificaciones a los términos",
    content: (
      <>
        <p className="mb-3">
          Lezgo Suite podrá modificar en cualquier momento estos Términos y Condiciones,
          publicando los cambios en su sitio web oficial y/o notificando al cliente por correo
          electrónico.
        </p>
        <p>
          El uso continuado del servicio después de dichos cambios constituye{" "}
          <strong>aceptación tácita</strong> de los mismos.
        </p>
      </>
    ),
  },
  {
    id: "jurisdiccion",
    num: "XIV",
    title: "Jurisdicción y ley aplicable",
    content: (
      <p>
        Este documento se rige por la <strong>legislación vigente en los Estados Unidos
        Mexicanos</strong>. Para la interpretación, cumplimiento o ejecución, ambas partes se
        someten a la jurisdicción de los tribunales competentes de Santiago de Querétaro, Qro.,
        renunciando expresamente a cualquier otro fuero.
      </p>
    ),
  },
];

// ─── AnimatedSection ──────────────────────────────────────────────────────────
function AnimatedSection({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
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

// ─── Logo SVG ─────────────────────────────────────────────────────────────────
function GrupoLezgoLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size * 2.5}
      height={size}
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Grupo Lezgo"
      role="img"
    >
      <polygon points="10,38 30,18 50,38" fill={BRAND.red} />
      <rect x="14" y="38" width="32" height="24" fill={BRAND.navy} />
      <rect x="22" y="44" width="10" height="10" fill="white" opacity="0.8" />
      <rect x="11" y="32" width="4" height="30" fill={BRAND.navy} />
      <text x="62" y="28" fontFamily="'Inter','Helvetica Neue',sans-serif" fontSize="11" fontWeight="600" fill={BRAND.muted} letterSpacing="2">GRUPO</text>
      <text x="60" y="56" fontFamily="'Inter','Helvetica Neue',sans-serif" fontSize="30" fontWeight="800" fill={BRAND.navy} letterSpacing="1">LEZGO</text>
    </svg>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function TerminosYCondiciones() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [openItems, setOpenItems] = useState<string[]>([SECTIONS[0].id]);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Intersection Observer → ToC activo
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
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

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.blue} 100%)` }}
      >
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
                Términos y Condiciones
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-blue-200 text-sm md:text-base"
              >
                Lezgo Suite S.C. &nbsp;·&nbsp;{" "}
                <span className="text-white font-semibold">Versión vigente — Septiembre 2025</span>
              </motion.p>
            </div>

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
              Documento vigente · México
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ── Layout ────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 flex gap-8">

        {/* ── ToC Sticky ────────────────────────────────────────────────────── */}
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

            <nav aria-label="Secciones de términos y condiciones">
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
                          className="mt-0.5 text-xs font-bold flex-shrink-0 w-6"
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

           
          </div>
        </aside>

        {/* ── Accordion de secciones ─────────────────────────────────────────── */}
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
                  <div ref={(el) => { sectionRefs.current[id] = el; }}>
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
                          <Accordion.Trigger className="w-full flex items-center gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-t-2xl cursor-pointer">
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

                            <span
                              className="flex-1 text-base font-semibold transition-colors duration-200"
                              style={{ color: isOpen ? BRAND.navy : BRAND.text }}
                            >
                              {title}
                            </span>

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
                                style={{ color: "#374151", borderTop: `1px solid ${BRAND.border}` }}
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
                ¿Tienes preguntas sobre estos términos o necesitas aclaraciones legales? Escríbenos
                directamente.
              </p>


              <p className="text-xs text-gray-400 mt-5">
                © {new Date().getFullYear()} Lezgo Suite S.C. · Santiago de Querétaro, México ·
                Todos los derechos reservados.
              </p>
            </div>
          </AnimatedSection>
        </main>
      </div>
    </div>
  );
}