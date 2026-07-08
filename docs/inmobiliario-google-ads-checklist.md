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

## Paso 0 · Limpieza previa: quitar las 2 conversiones basura

En Google Ads → **Objetivos → Conversiones → Resumen**, quitar (no reciclar):

1. **"Compra"** — fuente *Sitio web / Evento manual*, sin URL. Es el `purchase` que **NO** usamos en Ads (la venta ya se mide en GA4 vía Stripe→Make; duplicarla causa doble conteo).
2. **"Lead - Formulario sitio"** — fuente *Importar desde los clics*, no editable, error "sin conexión asociada". Nunca recibirá los eventos de GTM.

Cómo: entrar a cada acción → menú ⋮ / botón **Quitar**. Con 0 datos y 0 campañas el riesgo es nulo (se pueden restaurar). Quitarlas **no** desvincula GA4. Tras esto, el resumen debe quedar vacío.

---

## Paso 1 · Crear las 4 acciones de conversión (Google Ads)

Para cada fila: **+ Nueva acción de conversión → Sitio web → "Crear acción de conversión manualmente con código" / "Configurarla tú mismo"** (saltar la detección automática).

| Nombre | Categoría | Valor | Recuento | Prioridad |
|---|---|---|---|---|
| **Lead - Demo agendada** | Envío de formulario de clientes potenciales | No usar valor | Uno | Primaria |
| **Lead - Formulario enviado** | Envío de formulario de clientes potenciales | No usar valor | Uno | Primaria |
| **Contacto - WhatsApp** | Contacto | No usar valor | Uno | Secundaria |
| **Intención - Payment link** | Otra | No usar valor | Uno | Secundaria |

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
| Lead - Demo agendada | `click_agendar_demo` |
| Lead - Formulario enviado | `form_submit_success` |
| Contacto - WhatsApp | `click_whatsapp` |
| Intención - Payment link | `click_payment_link` |

> Si el trigger no existe, crearlo: **Triggers → Nuevo → Custom Event**, campo "Event name" = el nombre exacto de la tabla. No hay que crear eventos nuevos en el sitio; solo triggers que los escuchen.

### 2.3 Enhanced Conversions for Leads (recomendado)
En los dos tags de Lead, activar **Enhanced Conversions** y mapear los datos del formulario (email, teléfono con hash) usando el objeto `user_data` con la **estructura actual de Google** (cambió en abril 2026, no usar la vieja). Alimenta el match de conversiones y el futuro Customer Match. Si complica, puede quedar para una 2ª iteración — no bloquea el lanzamiento.

---

## Paso 3 · Validar y publicar

1. **GTM Preview:** disparar cada acción en la landing y confirmar que cada tag de conversión dispara con su evento.
2. **Publicar** el contenedor.
3. En Google Ads → Conversiones, el estado pasa de "Inactivo" a "Grabando/Activo" cuando llegan datos (hasta 24 h).
4. Tras ~24 h, verificar que el volumen sea del mismo orden que en GA4 (no idéntico — atribución distinta).

---

## Regla anti-doble-conteo
Cada acción se trackea UNA vez como primaria vía Google Ads nativo (GTM). Si su equivalente importado de GA4 existe, debe quedar **secundario**, nunca primario. No trackear la misma acción como primaria en los dos sistemas.
