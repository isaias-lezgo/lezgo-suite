# Spec — Landing `/inmobiliario` (Lezgo Suite)

**Fecha:** 2026-07-07
**Autor:** Isa (con Claude Code)
**Origen:** Brief de Iván — landing dedicada de conversión para Google Ads dirigida a agencias inmobiliarias, desarrolladoras y asesores en México.

## Objetivo

Crear `lezgosuite.com/inmobiliario`, una **página de conversión** independiente (no toca la home ni el resto del sitio) optimizada para tráfico de Google Ads. Cada sección empuja hacia **una** acción principal: **agendar demo**. El diferenciador central del copy es la gestión de WhatsApp en todas sus versiones (API oficial + conexión del WhatsApp de cada asesor) para centralizar y supervisar al equipo de ventas.

Alcance de esta entrega = **Bloque A completo** del brief + estructura swap-ready del Bloque B (logos, testimonios, screenshots con placeholders) + checklist de conversiones de Google Ads (sección 6). La configuración en las UIs de Google Ads y GTM la ejecuta Isa siguiendo el checklist (no es código).

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Chrome | Navbar y footer **estándar** del sitio (no stripped). |
| reCAPTCHA v3 | API route de Next que **verifica el token server-side** con el secret antes de reenviar al webhook. Código con placeholders de env keys. Honeypot como primera barrera. |
| Assets Bloque B | Construir con **placeholders swap-ready** usando nombres reales de clientes (Yconia, Plaza Bosques, Muratta, Condesa, Vaeo, Grand Center) y los `MOCKUP*.png` existentes. |
| Sección 6 (Ads) | Entregar **checklist** paso a paso; el código garantiza que los eventos de dataLayer disparen. |
| Métrica 3 del hero | `24/7` · atención con bots de IA (estática). |
| Contactos (tabla) | Start **100** · Growth **1,000** · Pro **15,000** · Elite **ilimitados**. |
| FAQ app móvil | Incluida: "Sí, tu equipo opera desde el celular". |

## Arquitectura

Sigue el patrón modular de `app/landing/`. Server component para SEO, client component que compone secciones enfocadas en archivos separados.

```
app/inmobiliario/
  page.tsx                     # metadata (createMetadata) + JSON-LD (Organization + Product)
  InmobiliarioContent.tsx      # orquesta las secciones (client)
  sections/
    Hero.tsx                   # eyebrow, H1, subtítulo, CTAs jerarquizados, 3 métricas ESTÁTICAS
    LogosClientes.tsx          # barra grises→color en hover (nombres reales, swap-ready)
    WhatsAppDiferenciador.tsx  # sección estrella: 2 cards (API + fuerza de ventas) + bloque líder
    Funcionalidades.tsx        # grid de 6 cards
    ComoFunciona.tsx           # 3 pasos (posicionamiento: el cliente ejecuta, guiado)
    Testimonios.tsx            # cards con avatar de iniciales (swap a foto real)
    Precios.tsx                # 4 planes, toggle Anual por default (-20%), checkout
    TablaComparativa.tsx       # tabla HTML responsiva → cards apiladas en móvil (FIX-3)
    FAQ.tsx                    # 8 preguntas (acordeón)
    DemoForm.tsx               # form mínimo + reCAPTCHA v3 + honeypot
  BotonesInmobiliario.tsx      # CTAs con dataLayer (demo / whatsapp / planes)
app/api/verify-recaptcha/route.ts   # verifica el token reCAPTCHA server-side
docs/inmobiliario-google-ads-checklist.md   # sección 6 paso a paso
```

### Reutilización (no duplicar)
- `withGAClientId()` de `lib/utils.ts` para el `client_reference_id`.
- Lógica de `PricingButton` (checkout + tracking) — se adapta/reutiliza en `BotonesInmobiliario`.
- `STRIPE_LINKS` y `BASE_PRICES` — se extraen a un módulo compartido o se importan desde el componente de precios existente para no duplicar URLs de Stripe.
- Primitivos de `components/ui/`.
- Patrón `form_submit` / `form_submit_success` del formulario de contacto.

### Chrome
Navbar y footer estándar se muestran solos (no se agrega `/inmobiliario` a `ROUTES_WITHOUT_NAVBAR`/`ROUTES_WITHOUT_FOOTER`).

## Contenido por sección (copy del brief)

### SEO (page.tsx)
- `title`: **CRM Inmobiliario | Lezgo Suite**
- `description`: "El CRM inmobiliario con WhatsApp nativo que usan agencias y desarrolladoras en México para centralizar leads, supervisar a su equipo de ventas y cerrar más rápido. Agenda una demo."
- Sin `<meta keywords>`. Canonical `/inmobiliario`. JSON-LD Organization + Product.

### Hero (FIX-1, FIX-2, FIX-5)
- Eyebrow: "CRM INMOBILIARIO · HECHO EN MÉXICO"
- H1: "El CRM inmobiliario que centraliza tu WhatsApp y pone a tu equipo de ventas bajo control."
- Subtítulo: "Conecta el WhatsApp de todos tus asesores en un solo lugar, mira cada conversación en tiempo real y deja de perder leads. Diseñado para agencias, desarrolladoras y asesores inmobiliarios en México."
- CTA primario (naranja): **Agendar demo gratis** → widget de booking + `click_agendar_demo`.
- CTA secundario (outline): **Ver planes** → ancla `#precios`.
- Métricas **estáticas** (sin contador animado): `+50` agencias y desarrolladoras · `+400 mil` conversaciones gestionadas · `24/7` atención con bots de IA.

### Logos de clientes
- Encabezado: "Agencias y desarrolladoras que ya operan con Lezgo Suite"
- Fila de nombres/logos en gris que se colorean en hover. Placeholder: nombres reales en texto estilizado hasta tener PNG transparentes. Swap-ready.

### WhatsApp (sección estrella)
- Título: "Todo el WhatsApp de tu equipo, en una sola pantalla."
- Intro + encabezado "Trabajamos con todas las versiones de WhatsApp disponibles."
- Card 1 — WhatsApp API oficial (copy del brief 3.4).
- Card 2 — El WhatsApp de tu fuerza de ventas, centralizado (copy del brief 3.4).
- Bloque "La combinación más común" + bloque "Para el líder del equipo".
- **No** mencionar "Coexistence" por nombre.
- CTA sección: "Quiero ver cómo funciona" → agendar demo.

### Funcionalidades (grid de 6)
Pipeline de ventas inteligente · Bots de IA 24/7 · Automatización de seguimiento · Multicanal centralizado · Dashboard y reportes · Gestión de cartera y contactos. (Copy del brief 3.5.)

### Cómo funciona (3 pasos)
Título "Todo listo para que arranques rápido." Posicionamiento clave: el cliente ejecuta su propia configuración guiado por el snapshot + onboarding + video tutoriales. Evitar "conectamos/migramos/configuramos por ti". (Copy del brief 3.6.)

### Testimonios
3-4 visibles. Card con avatar de iniciales en color de marca (swap a foto real). Textos del brief 3.11 (Jerry Medina, Evelyn/Yconia + placeholders `[Cliente]`). **Pendiente Iván**: asignar y confirmar textos antes de publicar.

### Precios
- Título: "Planes que crecen con tu inmobiliaria."
- Toggle Mensual / Trimestral (−5%) / Semestral (−10%) / **Anual (−20%, seleccionado por default)** con etiqueta "Ahorra 20%".
- 4 planes: Start $1,297 · Growth $3,527 · Pro $5,397 (popular) · Elite $10,567.
- CTA Start/Growth/Pro: "Comenzar ahora" → checkout Stripe con `client_reference_id`.
- CTA Elite: "Hablar con ventas" → agendar demo.
- Nota debajo: incluye onboarding, snapshot (Ventas + Rentas), 11 automatizaciones, 2 bots de IA, dashboard 7 widgets, soporte WhatsApp. Precios + IVA.

### Tabla comparativa (FIX-3)
Tabla HTML responsiva → cards por plan en móvil. Filas:

| Funcionalidad | Start | Growth | Pro | Elite |
|---|---|---|---|---|
| Usuarios | 1 | 3 | 10 | Ilimitados |
| Contactos | 100 | 1,000 | 15,000 | Ilimitados |
| Pipelines (Ventas + Rentas) | ✓ | ✓ | ✓ | ✓ |
| Conexión WhatsApp (todas las versiones) | ✓ | ✓ | ✓ | ✓ |
| Bots de IA | 2 | 2 | 2 | 2 |
| Automatizaciones | 11 | 11 | 11 | 11 |
| Dashboard (7 widgets) | ✓ | ✓ | ✓ | ✓ |
| Conexiones WhatsApp QR | — | — | — | 20 |
| Soporte | WhatsApp | WhatsApp | WhatsApp | Prioritario |

### FAQ (8 preguntas)
Copy del brief 3.10, incluyendo "¿Tiene app móvil? → Sí, tu equipo opera desde el celular estén donde estén."

### Formulario demo (FIX-4)
- Título: "Agenda una demo con un especialista."
- Campos mínimos: Nombre, WhatsApp, Correo, Nombre de la inmobiliaria/empresa, (opcional) Tamaño del equipo [1 / 2-5 / 6-15 / 15+].
- Honeypot oculto anti-bot.
- Botón: "Agendar mi demo". Link WhatsApp debajo.
- Flujo: reCAPTCHA v3 execute → token → `POST /api/verify-recaptcha` → si score OK, `POST` al webhook → tras respuesta OK, `dataLayer.push({event:'form_submit_success', form_name:'inmobiliario_demo', form_location})`.

## Tracking (sección 5 — respetado al pie)

| Acción | Evento dataLayer | Notas |
|---|---|---|
| Agendar demo | `click_agendar_demo` | En el `onClick`, no trigger de link click. |
| Form enviado OK | `form_submit_success` | `form_name:'inmobiliario_demo'` + `form_location`, DESPUÉS del webhook OK. |
| Botón de plan | `click_payment_link` | Con `paquete` + `plan`; URL con `client_reference_id` vía `withGAClientId` (sin cambios de lógica). |
| WhatsApp | `click_whatsapp` | |

GTM (`GTM-P8333HV6`) ya carga global en `app/layout.tsx`; la ruta lo hereda. No se agrega otro contenedor.

## reCAPTCHA v3 (FIX-4)

- Env: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (cliente) + `RECAPTCHA_SECRET_KEY` (servidor). Isa provee las keys.
- Script v3 cargado solo en `/inmobiliario`.
- `app/api/verify-recaptcha/route.ts`: recibe el token, hace POST a `https://www.google.com/recaptcha/api/siteverify`, valida `success` y `score >= 0.5`. Si falla, responde 400 y el form no envía.
- Honeypot: campo oculto; si viene lleno, se descarta silenciosamente.

## Entregable: checklist Google Ads (sección 6)

`docs/inmobiliario-google-ads-checklist.md` documenta: quitar las 2 conversiones basura ("Compra", "Lead - Formulario sitio"); crear las 4 acciones (Lead-Demo agendada, Lead-Formulario enviado, Contacto-WhatsApp, Intención-Payment link) con categoría/valor/recuento del brief; montar Conversion Linker + un tag Google Ads Conversion Tracking por acción con su Custom Event trigger; Enhanced Conversions for Leads; validar en Preview y publicar. **No** crear conversión `purchase`.

## Testing / QA

- `npm run build` limpio (aunque CI ignora errores de type/lint).
- QA visual en móvil (viewport ~390px) y desktop: hero, cards WhatsApp, tabla→cards, form.
- Verificar en consola que cada evento de dataLayer se dispara con su payload correcto (demo, form_submit_success, click_payment_link, click_whatsapp).
- Verificar que el checkout lleva `?client_reference_id=` con `.`→`_` cuando existe cookie `_ga`.

## Fuera de alcance

- Modificar la home o cualquier ruta existente.
- Configuración real en las UIs de Google Ads / GTM (la hace Isa con el checklist).
- Assets reales de logos/fotos/screenshots (llegan de Iván; el código queda swap-ready).
- Bloque C y D del brief más allá de lo listado (schema, meta, alt text sí van; sitemap si existe uno).

## Pendientes de Iván (no bloquean construir, sí publicar)
1. Confirmar/asignar textos de testimonios (3.11).
2. Confirmar ✓/✗ finales de la tabla comparativa si difieren de lo asumido.
3. Logos de clientes en PNG transparente.
