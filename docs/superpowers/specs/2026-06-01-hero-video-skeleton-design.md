# Hero Video Skeleton Loader — Design Spec

**Date:** 2026-06-01
**Status:** Approved

## Problem

`/VIDEOSUITE.mp4` is 19MB. While it buffers, the hero video container shows a black square because `poster=""` is empty. There is no loading state.

## Approach

CSS shimmer skeleton overlay controlled by React state. No UX change — video still autoplays silently. Skeleton fades out once the video can play.

## Architecture

### State

Single `useState<boolean>(false)` named `videoLoaded` in `HomeContent`. One flag covers both the mobile and desktop video blocks because the browser fetches the file once and both `<video>` elements share it.

### DOM structure

Both video wrappers (mobile and desktop) get the same pattern:

```tsx
<div className="aspect-video ... relative rounded-2xl overflow-hidden">
  <video
    ...
    onCanPlay={() => setVideoLoaded(true)}
  />
  {/* Always mounted for smooth fade-out transition */}
  <div className={`absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden transition-opacity duration-500 ${videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
    <div className="absolute inset-0 shimmer-sweep" />
  </div>
</div>
```

The skeleton is always mounted (not conditionally rendered) so the `transition-opacity` fade-out plays smoothly when the video is ready. `pointer-events-none` ensures it doesn't block clicks after fading.

### Skeleton element

*(Inline with the DOM structure above — no separate component needed.)*

### CSS (globals.css)

Add one keyframe and one utility class:

```css
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}

.shimmer-sweep {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 100%
  );
  animation: shimmer 1.8s ease-in-out infinite;
}
```

### Poster attribute

Remove `poster=""` from both `<video>` elements. An empty string causes the browser to request a blank resource and may flash a blank frame before the skeleton mounts.

## Files changed

| File | Change |
|---|---|
| `app/HomeContent.tsx` | Add `videoLoaded` state, `onCanPlay` handler, skeleton overlay on both video elements, remove `poster=""` |
| `app/globals.css` | Add `@keyframes shimmer` and `.shimmer-sweep` utility |

## Out of scope

- Video compression (separate task — would require ffmpeg outside the codebase)
- WebM format conversion
- Lazy loading / `preload="none"` (would break autoplay UX)
