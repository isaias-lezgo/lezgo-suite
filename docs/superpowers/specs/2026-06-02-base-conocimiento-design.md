# Base de Conocimiento — Design Spec

**Date:** 2026-06-02
**Route:** `/base-conocimiento`
**Status:** Approved

## Overview

A public knowledge base page divided into four sections corresponding to the main modules of Lezgo Suite. Users can browse and watch tutorial videos without leaving the page. Videos are hosted on YouTube and embedded via a modal.

**Branding constraint:** Never mention "GHL" or "GoHighLevel" — always use "Lezgo Suite."

## Layout

**Section B — Stacked sections with sticky anchor navigation.**

All four categories are visible on a single scrollable page. A sticky pill navigation bar at the top allows users to jump directly to any section.

### Page structure (top to bottom)

1. **Hero** — page title ("Aprende a usar Lezgo Suite") + short description. Dark background with subtle radial gradient, orange accent badge.
2. **Sticky anchor nav** — four pill buttons (Contactos, Oportunidades, Calendarios, Tareas). Active pill highlighted in orange. Scrolls to the matching section on click.
3. **Four content sections** — stacked vertically, each separated by a divider.
4. **Navbar + Footer** — same shared components used across the rest of the site.

## Sections

Each of the four sections follows the same pattern:

- **Section header:** orange left-border accent + section name + video count badge
- **Video grid:** 3 columns on desktop, 2 on tablet, 1 on mobile
- **Placeholder cards:** 3 per section (12 total), ready to be filled with real YouTube IDs

## Video Card

Each card contains:
- **Thumbnail area:** dark placeholder with centered orange play button; duration badge bottom-right
- **Title:** short descriptive name (placeholder text initially)
- **Description:** one-line summary (placeholder text initially)
- **Click behavior:** opens a YouTube modal overlay (the video plays inline without navigating away)

## YouTube Modal

- Triggered by clicking any video card
- Full-screen dark overlay with centered `<iframe>` embed
- Close button (×) top-right; clicking outside the modal also closes it
- Video pauses/stops on close

## Data Structure

Videos are defined as a static array in the page component (no CMS, no API). Each entry:

```ts
{
  id: string           // YouTube video ID (e.g. "dQw4w9WgXcQ")
  title: string        // Display title
  description: string  // Short description
  duration: string     // Display duration (e.g. "5:32")
}
```

Each section is a named group:

```ts
{
  id: string           // anchor id (e.g. "contactos")
  label: string        // Display name (e.g. "Contactos")
  icon: LucideIcon
  videos: Video[]
}
```

## Styling

- Dark theme — consistent with the rest of the site (`--background`, `--card`, etc.)
- Brand accent: `#F59B1B` (orange) for section accents, active pill, play buttons
- Fonts: DM Sans (body), Space Grotesk (headings) — same as global layout
- Responsive: 3-col → 2-col → 1-col grid

## File Structure

```
app/
  base-conocimiento/
    page.tsx              ← thin server component
    BaseConocimientoContent.tsx  ← main client component
```

## Out of Scope

- Authentication / access control (page is fully public)
- Search or filter functionality
- Video upload or CMS integration
- Comments or ratings
