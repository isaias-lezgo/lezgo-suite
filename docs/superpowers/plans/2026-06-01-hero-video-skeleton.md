# Hero Video Skeleton Loader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show an animated CSS shimmer skeleton over the hero video while it buffers, fading it out once the video is ready to play.

**Architecture:** A single `videoLoaded` boolean state in `HomeContent` is flipped by `onCanPlay` on the `<video>` element. An absolutely-positioned `div` with a shimmer CSS animation overlays both video blocks (mobile + desktop) and transitions to `opacity-0` when `videoLoaded` becomes true. The keyframe and utility class live in `globals.css`.

**Tech Stack:** React (useState already imported), Tailwind CSS v4, custom CSS keyframe in `globals.css`

---

## File Map

| File | Change |
|---|---|
| `app/globals.css` | Add `@keyframes shimmer` and `.shimmer-sweep` inside `@layer base` |
| `app/HomeContent.tsx` | Add `videoLoaded` state at line ~192, `onCanPlay` handler + skeleton overlay on both video blocks (lines ~212-225 and ~258-271), remove `poster=""` |

---

### Task 1: Add shimmer CSS to globals.css

**Files:**
- Modify: `app/globals.css` (inside the `@layer base { }` block, before its closing `}` at line 263)

- [ ] **Step 1: Add the keyframe and utility class**

Open `app/globals.css`. Inside the `@layer base { }` block, append the following before the final closing `}` (after the `.animate-pulse-glow` rule that ends around line 262):

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

The file should now end like:

```css
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

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
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add shimmer keyframe and utility class for video skeleton"
```

---

### Task 2: Add videoLoaded state to HomeContent

**Files:**
- Modify: `app/HomeContent.tsx` lines 192-193

- [ ] **Step 1: Add the state variable**

In `app/HomeContent.tsx`, after line 193 (`const [billing, setBilling] = useState<BillingPeriod>('mensual')`), add:

```tsx
  const [videoLoaded, setVideoLoaded] = useState(false)
```

The block should read:

```tsx
export default function HomeContent() {
  const [heroReady, setHeroReady] = useState(false)
  const [billing, setBilling] = useState<BillingPeriod>('mensual')
  const [videoLoaded, setVideoLoaded] = useState(false)
```

No new import needed — `useState` is already imported on line 3.

- [ ] **Step 2: Commit**

```bash
git add app/HomeContent.tsx
git commit -m "feat: add videoLoaded state for hero video skeleton"
```

---

### Task 3: Update mobile video block

**Files:**
- Modify: `app/HomeContent.tsx` lines ~212-225

- [ ] **Step 1: Replace the mobile video block**

Find this block (around line 211):

```tsx
                  {/* Video Movil */}
                  <div className="aspect-video bg-gradient-to-br lg:hidden from-gray-900 to-gray-800 flex relative rounded-2xl overflow-hidden">
                    <video
                      className="w-full h-full"
                      poster=""
                      muted
                      loop
                      autoPlay
                      playsInline
                      controls
                    >
                      <source src="/VIDEOSUITE.mp4" type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>
```

Replace it with:

```tsx
                  {/* Video Movil */}
                  <div className="aspect-video bg-gradient-to-br lg:hidden from-gray-900 to-gray-800 flex relative rounded-2xl overflow-hidden">
                    <video
                      className="w-full h-full"
                      muted
                      loop
                      autoPlay
                      playsInline
                      controls
                      onCanPlay={() => setVideoLoaded(true)}
                    >
                      <source src="/VIDEOSUITE.mp4" type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                    <div className={`absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden transition-opacity duration-500 ${videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                      <div className="absolute inset-0 shimmer-sweep" />
                    </div>
                  </div>
```

Changes made:
- Removed `poster=""`
- Added `onCanPlay={() => setVideoLoaded(true)}`
- Added skeleton overlay `div` after `</video>`

- [ ] **Step 2: Commit**

```bash
git add app/HomeContent.tsx
git commit -m "feat: add skeleton overlay to mobile hero video"
```

---

### Task 4: Update desktop video block

**Files:**
- Modify: `app/HomeContent.tsx` lines ~258-271

- [ ] **Step 1: Replace the desktop video block**

Find this block (around line 250):

```tsx
            {/* Video Compu */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative px-4 hidden lg:block"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex relative rounded-2xl overflow-hidden">
                <video
                  className="w-full h-full"
                  poster=""
                  muted
                  loop
                  autoPlay
                  playsInline
                  controls
                >
                  <source src="/VIDEOSUITE.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </motion.div>
```

Replace it with:

```tsx
            {/* Video Compu */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative px-4 hidden lg:block"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex relative rounded-2xl overflow-hidden">
                <video
                  className="w-full h-full"
                  muted
                  loop
                  autoPlay
                  playsInline
                  controls
                  onCanPlay={() => setVideoLoaded(true)}
                >
                  <source src="/VIDEOSUITE.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
                <div className={`absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden transition-opacity duration-500 ${videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="absolute inset-0 shimmer-sweep" />
                </div>
              </div>
            </motion.div>
```

Changes made:
- Removed `poster=""`
- Added `onCanPlay={() => setVideoLoaded(true)}`
- Added skeleton overlay `div` after `</video>`

- [ ] **Step 2: Commit**

```bash
git add app/HomeContent.tsx
git commit -m "feat: add skeleton overlay to desktop hero video"
```

---

### Task 5: Verify in browser

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser.

- [ ] **Step 2: Verify skeleton behavior**

With a normal connection: the shimmer should be visible briefly then fade out as the video starts playing.

To simulate a slow connection: open DevTools → Network tab → throttle to "Slow 3G". Reload the page. The shimmer skeleton should be clearly visible for several seconds before the video begins playing and the skeleton fades out smoothly.

- [ ] **Step 3: Verify no black square**

On throttled connection, confirm there is no black square at any point — only the dark gradient shimmer.

- [ ] **Step 4: Verify both mobile and desktop**

Resize the browser below 1024px wide to trigger the mobile video block. Confirm the skeleton appears there too.
