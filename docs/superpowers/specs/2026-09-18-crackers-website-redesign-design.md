# Crackers Website Redesign — Design Spec

## Context

The existing site (`index.html`, single file) is a working Diwali cracker catalog + WhatsApp-checkout flow: search/category nav, per-item stepper controls, a floating cart bar, a bottom-sheet cart with a required customer-details form, and a "Place Order" button that opens a `wa.me` deep link with the full order pre-filled as plain text. Prices are currently computed at 80% discount off MRP (`Rate/Qty` in the source price list).

This redesign covers two independent changes: (1) recompute all catalog prices to a 75% discount, and (2) a visual and structural overhaul, including a redesigned WhatsApp order-completion experience.

## 1. Pricing change

Every catalog item's displayed price changes from `MRP × 0.20` (80% off) to `MRP × 0.25` (75% off). The `Rate / Qty` (MRP) values from the source price list (`lokesh crackers list (1).pdf`) are the base; final prices are recalculated directly from MRP, not derived from the current 80%-off values. Round to 2 decimals (e.g. item 1: ₹365 × 0.25 = ₹91.25).

This affects only the `price` field in the `CATALOG` data array — no product, packaging, or category data changes.

## 2. Visual redesign

**Direction:** Clean white background with gold (`#f3c14b`/`#d4a017`) and maroon (`#3a0713`) accents — approved as "Direction B" during brainstorming (closer to Goodwill Fireworks' trust-forward look than the current all-maroon theme).

**Product display:** Change from single-column list rows to a 2-column card grid (responsive). Each card shows:
- A placeholder icon/image tile (swappable later for real per-SKU photos — out of scope for this pass)
- Product name, pack size
- Strikethrough MRP + bold sale price
- A "75% OFF" badge
- Add-to-cart control (stepper once added, matching current behavior)

**Category navigation:** Horizontal scrollable pill tabs (replacing the current `<select>` dropdown), plus the existing search box.

**Hero banner:** Real Diwali/fireworks photography — 2-3 free-to-use images sourced from Unsplash or Pexels, downloaded into a local `/images` folder (no external hotlinking, no attribution required for these licenses). Used in the hero banner and as a section divider or two. No per-product photography in this pass.

**Trust/info elements:**
- Minimum order value ₹3000 (unchanged), shown near cart totals as today
- Delivery messaging: "Free delivery within Tamil Nadu. All-India delivery available — charges confirmed on WhatsApp for other states."
- Safety note retained in footer

## 3. File structure

Split the current single `index.html` into:
- `index.html` — markup only
- `style.css` — all styles
- `script.js` — catalog data, cart state/logic, rendering, search/nav, checkout
- `images/` — downloaded hero/banner photography

No build step or bundler — plain static files, still deployable anywhere (e.g. GitHub Pages, Netlify, any static host).

## 4. Checkout flow

Flow stays the same shape as today: Cart → "View Order" → required fields (Name, Mobile, Address; Email optional) → "Place Order."

**What changes:** instead of only opening WhatsApp with a plain-text order list, tapping "Place Order":
1. Renders a branded order-receipt card (see mockup: header with shop name/diyas, order number + timestamp, items grouped by category with per-line price, dashed divider, total + item count, customer details block, delivery note, footer safety line) to an off-screen HTML element.
2. Uses `html2canvas` (loaded via CDN, no build step) to convert that element into a PNG and trigger a browser download.
3. Opens a `wa.me` deep link with a short backup text message: order number, item count, total, and a note asking the customer to attach the downloaded receipt image.

This is a deliberate trade-off: WhatsApp `wa.me` links can only pre-fill plain text — they cannot auto-attach a file. Getting a genuinely well-designed, branded receipt requires the customer to manually tap the attach icon in WhatsApp and pick the downloaded image, adding one manual step versus today's fully automatic text-only flow. This trade-off was explicitly reviewed and approved.

**Order numbering:** generate a simple order reference (e.g. `TC-` + a short timestamp-based or random suffix) for display on the receipt card; no backend/persistence involved, purely cosmetic on the card.

## 5. Unchanged / explicitly out of scope

- WhatsApp number stays `919345273268`
- Minimum order value stays ₹3000
- Per-product photography (260 SKUs) — deferred; product cards keep placeholder icon tiles for now, to be swapped in later
- No backend, no payment gateway, no order persistence/database — fully static site, same as today
- Cart/localStorage persistence behavior unchanged

## Testing approach

Manual verification in a browser:
- Confirm every catalog item's displayed price equals its MRP × 0.25 (spot-check a sample across categories)
- Confirm search, category pill nav, add/remove stepper, and cart totals work as before
- Confirm min-order gating still blocks "Place Order" under ₹3000
- Confirm required-field validation still blocks submission without name/mobile/address
- Confirm clicking "Place Order" downloads a receipt PNG and opens WhatsApp with the backup text
- Confirm layout works at mobile widths (this is a mobile-first customer-facing site)
