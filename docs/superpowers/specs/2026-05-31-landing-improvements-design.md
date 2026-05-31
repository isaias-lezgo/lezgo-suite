# Landing Improvements — Design Spec
**Date:** 2026-05-31  
**Approach:** Single PR, all changes in one session

---

## 1. Hero Text (`app/HomeContent.tsx`)

### Current
```
H1: "Transformación / Empresarial / Completa"
Subtitle: "Lezgo Suite revoluciona la gestión empresarial con IA avanzada, automatizaciones inteligentes e integraciones todo-en-uno para empresas que buscan liderar el futuro."
```

### New
```
H1:
  "El CRM que impulsa"   ← "El CRM" en naranja (#F59B1B)
  "tu negocio"           ← en gris oscuro

Subtitle:
  "Lezgo Suite es el CRM todo en uno con IA para empresas mexicanas.
   Gestiona contactos, automatiza ventas y conecta todos tus canales
   desde un solo lugar."
```

- Badge superior se mantiene: "Plataforma Empresarial #1 en Latinoamérica"
- Stats debajo del hero se mantienen sin cambios

---

## 2. "Contacto" → "Contáctanos" en negritas

Archivos afectados:
- `components/navbar.tsx` — enlace desktop y enlace en menú móvil
- `components/footer.tsx` — enlace en columna "Empresa"

Both render as `font-bold` where already styled, or add `font-bold` class if not present.

---

## 3. Botones flotantes (`components/custom/FloatingWhatsapp.tsx`)

### WhatsApp (agrandado)
- Ícono: `w-10 h-10` (was `w-8 h-8`)
- Padding: `p-4 sm:p-5` (was `p-2 sm:p-4`)
- Posición y animación pulse: sin cambios

### Nuevo botón "Hablar con un asesor"
- Stacked arriba del WhatsApp, misma posición bottom-left
- Fondo: `#F59B1B` (naranja de marca)
- Forma: pill redondeado (`rounded-full`)
- Desktop: ícono de calendario + texto "Hablar con un asesor"
- Móvil (`sm:` breakpoint abajo): solo ícono de calendario, sin texto
- Link: `https://app.lezgosuite.com/widget/bookings/conocelezgosuite` (nueva pestaña)
- Tracking al click:
  - Vercel: `track("Botón Asesor Flotante")`
  - Facebook Pixel: `fbq("trackCustom", "Botón Asesor Flotante")`

---

## 4. Popup de captura de leads (`components/custom/LeadPopup.tsx`)

### Trigger
- `IntersectionObserver` sobre `section#funcionalidades`
- Se dispara cuando el borde inferior de la sección sale del viewport (usuario la pasó)
- Una sola vez por sesión: `sessionStorage.setItem("leadPopupShown", "true")`
- Al montar, revisar sessionStorage; si ya se mostró, no renderizar

### UI
- Overlay: `fixed inset-0 bg-black/60 backdrop-blur-sm z-50`
- Tarjeta centrada: `max-w-md`, fondo blanco, `rounded-2xl`, sombra grande
- Botón X (cerrar) en esquina superior derecha
- Título: **"¿Te interesa lo que viste?"**
- Subtítulo: *"Habla con un especialista y descubre cómo Lezgo Suite puede transformar tu negocio."*
- Campos: Nombre, Email, Teléfono (todos `required`)
- Botón submit: "Quiero más información" (gradiente naranja, full-width)

### Submit
- POST a `process.env.NEXT_PUBLIC_WEBHOOK_URL`
- Body: `{ nombre, email, telefono, source: "popup-funcionalidades" }`
- Estado de carga en botón mientras envía
- Al éxito: cerrar popup y mostrar toast/mensaje breve de confirmación
- Al error: mostrar mensaje de error inline

### Tracking
- Apertura del popup: `track("Popup Funcionalidades - Abierto")` + fbq
- Submit exitoso: `track("Popup Funcionalidades - Submit")` + fbq

### Integración
- Importar y montar en `app/HomeContent.tsx` (dentro del `<div className="relative">`)

---

## 5. Formulario compacto sobre el footer (`components/footer.tsx`)

### Posición
- Se inserta como nueva `<section>` justo antes de la sección naranja de CTA existente (el bloque "Transforma tu Empresa Hoy Mismo")

### UI
- Fondo: `bg-[#081737]` (mismo que el footer oscuro)
- Título: **"¿Listo para transformar tu empresa?"**
- Subtítulo: *"Déjanos tus datos y un especialista te contactará."*
- Layout desktop: campos en fila horizontal + botón "Enviar" al lado (`flex gap-4`)
- Layout móvil: apilado verticalmente
- Campos: Nombre, Email, Teléfono
- Botón: "Enviar" (naranja)

### Submit
- POST a `NEXT_PUBLIC_WEBHOOK_URL`
- Body: `{ nombre, email, telefono, source: "formulario-footer" }`
- Estado de carga + mensaje de éxito/error

### Tracking
- `track("Formulario Footer - Submit")` + fbq al submit exitoso

---

## 6. Íconos de redes sociales en el footer (`components/footer.tsx`)

- Se agregan en la primera columna del footer (bajo la descripción de la empresa)
- Redes: Facebook, Instagram, TikTok
- Facebook e Instagram: íconos de `lucide-react` (`Facebook`, `Instagram`)
- TikTok: SVG inline (lucide no lo incluye)
- Links: `href="#"` por ahora (reemplazar con URLs reales)
- Tamaño: `w-5 h-5`, color `text-gray-400 hover:text-white`

---

## 7. Reordenamiento de Testimoniales (`app/HomeContent.tsx`)

### Orden actual
Hero → Funcionalidades → Stats → Características → Precios → **Testimoniales** → FAQ

### Orden nuevo
Hero → Funcionalidades → Stats → **Testimoniales** → Características → Precios → FAQ

- Solo se mueve el bloque JSX de la sección `id="testimonios"` a la nueva posición
- El atributo `id="testimonios"` debe preservarse para que los links `/#testimonios` del navbar sigan funcionando
- No hay cambios en el contenido de la sección

---

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `app/HomeContent.tsx` | Hero text + reordenar testimoniales + montar `<LeadPopup />` |
| `components/navbar.tsx` | "Contacto" → "Contáctanos" (desktop + móvil) |
| `components/footer.tsx` | "Contacto" → "Contáctanos" + social icons + formulario compacto |
| `components/custom/FloatingWhatsapp.tsx` | WA agrandado + botón asesor apilado |
| `components/custom/LeadPopup.tsx` | **Nuevo componente** |

---

## Out of scope
- Cambios en páginas `/landing/*` (tienen su propio Hero y Funcionalidades separados)
- Cambios en páginas de funcionalidades individuales
- Rediseño del footer CTA naranja existente
