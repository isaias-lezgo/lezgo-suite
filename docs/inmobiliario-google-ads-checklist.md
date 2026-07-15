# Checklist — Conversiones de Google Ads vía GTM para `/inmobiliario`

> Guía operativa para Isa. La landing ya dispara los 4 eventos de dataLayer necesarios
> (verificado en desarrollo). Este documento cubre lo que se hace **fuera del código**,
> en las interfaces de **Google Ads** (cuenta `280-345-0198`) y **GTM** (contenedor
> `GTM-P8333HV6`). No se toca la vinculación GA4 ↔ Google Ads.

## Eventos que ya dispara la landing (no hay que crear ninguno)

| Acción | Evento dataLayer | Payload |
|---|---|---|
| Agendar demo (hero, sección WhatsApp, Elite) | `click_agendar_demo` | `button_location` |
| Formulario de demo enviado con éxito | `form_submit_success` | `form_name:'inmobiliario_demo'`, `form_location` |
| Botón de plan (checkout) | `click_payment_link` | `paquete`, `plan`, `button_location:'precios'` |
| WhatsApp | `click_whatsapp` | `button_location` |

> Verificación previa: los 4 eventos ya fueron probados disparando en la landing.
> Para reconfirmarlo en vivo, abre la consola en `/inmobiliario`, corre `window.dataLayer=[]`,
> ejecuta cada acción y revisa `window.dataLayer`.

---

## Paso 0 · Limpieza previa: quitar la conversión genérica que sobra

En Google Ads → **Objetivos → Conversiones → Resumen → "Ver todas las acciones de conversión"**, quitar (no reciclar):

1. **"Envío de formulario para clientes potenciales"** — fuente *Sitio web*, estado "Esperando conversiones". La creó el asistente de campaña; es genérica y se reemplaza por las 4 de abajo. Nunca recibirá los eventos de GTM tal como está.

Cómo: entrar a la acción → menú ⋮ → **Quitar**. Con 0 datos y la campaña en borrador/pausa el riesgo es nulo (se puede restaurar). Quitarla **no** desvincula GA4. Tras esto, el resumen debe quedar vacío antes de crear las 4.

---

## Paso 1 · Crear las 4 acciones de conversión (Google Ads)

Para cada fila: **+ Nueva acción de conversión → Sitio web → "Crear acción de conversión manualmente con código" / "Configurarla tú mismo"** (saltar la detección automática).

> Nombre de la acción = **el nombre crudo del evento** (así el mapeo Ads↔GTM es inequívoco).

| Nombre | Categoría | Valor | Recuento | Prioridad |
|---|---|---|---|---|
| **form_submit_success** | Enviar formulario de cliente potencial | No usar valor | Una | Principal |
| **click_agendar_demo** | Reservar cita | No usar valor | Una | Principal |
| **click_whatsapp** | Contacto | No usar valor | Una | Secundaria |
| **click_payment_link** | Otra | No usar valor | Una | Secundaria |

- **Valor: "No usar valor"** en las 4, sin excepción (la puja será Maximizar clics → Maximizar conversiones; ninguna usa valor). El dinero real vive en GA4.
- **Ventana de conversión:** dejar el default (30 días clic).
- En instalación de etiqueta, elegir **"Usar Google Tag Manager"**. Google te dará, por cada acción, un **ID de conversión** (`AW-XXXXXXXXX`) y una **Etiqueta de conversión** (string). Anótalos.

> **NO crear conversión de `purchase`.** Cuando haya volumen de ventas (30+), se evaluará una conversión de compra server-side; es decisión posterior.

---

## Paso 2 · Montar los tags en GTM (`GTM-P8333HV6`)

### 2.1 Conversion Linker (una sola vez)
Verificar si ya existe un tag **"Conversion Linker"** (probablemente sí, por la etiqueta de Google). Si no, crearlo con trigger **All Pages**. Es requisito para que las conversiones funcionen.

### 2.2 Un tag por acción
Por cada una de las 4 acciones:

1. Nuevo tag tipo **"Google Ads Conversion Tracking"**.
2. Pegar el **ID de conversión** y la **Etiqueta de conversión** de esa acción.
3. **Trigger** = un Custom Event que matchee el evento del dataLayer:

| Tag | Trigger (Custom Event, nombre exacto) |
|---|---|
| form_submit_success | `form_submit_success` |
| click_agendar_demo | `click_agendar_demo` |
| click_whatsapp | `click_whatsapp` |
| click_payment_link | `click_payment_link` |

> ⚠️ El trigger de la primera es `form_submit_success`, **NO** `form_submit`. El sitio dispara ambos: `form_submit` al iniciar el envío y `form_submit_success` solo tras el OK del webhook. La conversión debe colgar del segundo.

> Si el trigger no existe, crearlo: **Triggers → Nuevo → Custom Event**, campo "Event name" = el nombre exacto de la tabla. No hay que crear eventos nuevos en el sitio; solo triggers que los escuchen.

### 2.3 Enhanced Conversions for Leads (recomendado)
Aplica **solo al tag `form_submit_success`** (es el único con datos del usuario en la landing).

> **Código ya listo.** El push de `form_submit_success` (`DemoForm.tsx`) ahora incluye un objeto `user_data` con `email` (normalizado a minúsculas) y `phone_number` (sin espacios) en claro. GTM los hashea client-side antes de enviarlos — nunca salen sin hashear. Ya desplegado, no hay nada que tocar en el sitio.

Montaje en GTM:
1. **Variables → Nueva → "Datos proporcionados por el usuario"** (User-Provided Data), tipo **Manual**:
   - Email → variable de capa de datos `user_data.email`
   - Teléfono → variable de capa de datos `user_data.phone_number`
2. En el tag **`form_submit_success`**, expandir **"Incluir datos proporcionados por el usuario"** → seleccionar la variable del paso 1.
3. Usar la estructura de `user_data` **actual de Google** (cambió en abril 2026, no la vieja).

Alimenta el match de conversiones y el futuro Customer Match de Iván.

> **`click_agendar_demo` NO lleva Enhanced Conversions.** Dispara en el clic (antes de que el usuario escriba nada) y va a un booking externo (Calendar); la landing no tiene email/teléfono en ese punto. El match de esa cita, si se quiere, sale del widget de Calendar, no de aquí. Confirmárselo a Iván (su brief lo pedía en las 2 principales).

**Ojo con el teléfono:** para buen match conviene E.164 (`+52...`). El placeholder del form ya sugiere `+52 442 000 0000`, pero el usuario puede omitir el lada. Google/GTM normaliza, pero el match será mejor cuanto más completo venga.

---

## Paso 3 · Validar y publicar

1. **GTM Preview:** disparar cada acción en la landing y confirmar que cada tag de conversión dispara con su evento.
2. **Publicar** el contenedor.
3. En Google Ads → Conversiones, el estado pasa de "Inactivo" a "Grabando/Activo" cuando llegan datos (hasta 24 h).
4. Tras ~24 h, verificar que el volumen sea del mismo orden que en GA4 (no idéntico — atribución distinta).

---

## Regla anti-doble-conteo
Cada acción se trackea UNA vez como primaria vía Google Ads nativo (GTM). Si su equivalente importado de GA4 existe, debe quedar **secundario**, nunca primario. No trackear la misma acción como primaria en los dos sistemas.
