# Animation & Desktop Polish — Design Spec

## Context

Following the pricing/redesign/checkout work, the user reported: the sticky category controls bar stops sticking while scrolling, the horizontal category pill row has no visible way to scroll with a mouse on desktop, the site feels static (no scroll animation, no hover feedback), the hero photo looks awkwardly proportioned on wide desktop screens, and the page background is plain white with no additional photography. The user asked to "explore the web" for current animation patterns and add "a lot of really good animation," giving full creative latitude on which interactions to add.

## Root cause: sticky nav bug

`body{overflow-x:hidden}` (added earlier to fix a horizontal-scroll bug in the pill nav) breaks `position:sticky` for descendants, because `overflow` on an ancestor turns it into a scroll container that sticky positioning resolves against instead of the viewport. Fix: move `overflow-x:hidden` from `body` to `html`, which doesn't have this side effect.

## Changes

1. **Sticky nav fix** — as above.
2. **Pill nav desktop scroll** — add visible left/right arrow buttons (shown only above a tablet-width breakpoint; mobile continues to rely on touch swipe) that scroll the row by a fixed increment on click. Additionally, a wheel-event listener converts vertical mouse-wheel input over the pill row into horizontal scroll, matching the common desktop pattern for horizontal nav bars.
3. **Scroll-reveal animations** — implemented via `IntersectionObserver` + CSS transition classes (not the newer `animation-timeline: view()`, since that isn't yet baseline across Firefox/Safari as of 2026). Category sections and product cards get a `.reveal` class (opacity 0, translateY(16px)) that swaps to `.reveal-visible` (opacity 1, translateY(0)) the first time they scroll into view, with a small per-card stagger delay so a grid feels sequential rather than simultaneous. Once revealed, elements stay visible (no re-hiding on scroll-up) to avoid a distracting flicker.
4. **Hover effects** — product cards lift 2-4px with a soft shadow on hover (desktop pointer only, via `@media (hover:hover)` so it doesn't stick on touch devices); buttons get a subtle scale/brightness change on hover.
5. **Hero polish** — CSS `background-attachment:fixed`-based parallax on the hero photo (skipped on mobile Safari where `fixed` backgrounds are unreliable — detected via a `@media` feature query, falls back to plain `scroll` attachment) and a slow, subtle glow/pulse keyframe animation on the hero title text.
6. **Two additional full-width photo banners** — placed after two of the catalog category sections (breaking up the long white product list), using the existing `diya-marigold.jpg` photo, each with the same scroll-reveal fade-in treatment as other elements.
7. **Cart open/close transition** — the full-screen cart page slides in from the right (and back out on close) instead of an instant `display` toggle, using a CSS transform transition.
8. **Desktop layout polish** — hero and controls bar padding/sizing adjusted at wider breakpoints so the page doesn't read as a simply-stretched mobile layout; the pill nav and grid already scale via existing breakpoints from the earlier redesign.

## Technical approach

All animation is implemented with vanilla CSS transitions/keyframes plus one small IntersectionObserver-based JS helper in `script.js` — no animation library (GSAP, AOS, etc.) is added, keeping the site dependency-free and fast-loading. `prefers-reduced-motion: reduce` is respected: when set, all transitions/animations are disabled or reduced to instant/near-instant, and scroll-reveal elements are shown immediately rather than animated in.

## Testing approach

Manual verification in a browser at both mobile and desktop widths:
- Confirm the controls bar stays stuck to the top while scrolling the catalog
- Confirm pill-nav arrow buttons appear on desktop width and scroll the row; confirm mouse-wheel-over-pillnav scrolls horizontally
- Confirm category sections and cards fade/slide into view on first scroll past them, and do not re-animate on scrolling back up
- Confirm card hover lift only applies on hover-capable (desktop/mouse) devices, not stuck on after a tap on mobile
- Confirm the cart page slides in/out rather than popping instantly
- Confirm the site still works with `prefers-reduced-motion: reduce` simulated (animations skipped/instant, content still fully visible and usable)
