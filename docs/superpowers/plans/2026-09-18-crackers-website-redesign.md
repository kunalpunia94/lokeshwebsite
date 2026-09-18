# Crackers Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recompute all catalog prices to a 75% discount, split the single `index.html` into `index.html` + `style.css` + `script.js`, redesign the visual style (white/gold card-grid catalog with real Diwali hero photography), and replace the plain-text WhatsApp order message with a generated branded receipt image plus a short backup text.

**Architecture:** Still a fully static site — no backend, no build step, no bundler. Three files (`index.html`, `style.css`, `script.js`) plus an `images/` folder of downloaded photos, deployable as-is to any static host.

**Tech Stack:** Vanilla HTML/CSS/JS. One external CDN script: `html2canvas` (for rendering the order receipt to a PNG). Node.js is used only as a local verification tool during development (checking the price math) — it is not part of the shipped site.

## Global Constraints

- Every catalog item's price = MRP (`Rate / Qty` from the source price list) × 0.25, rounded to 2 decimals. MRP values are already present in the current `CATALOG` array as implied by `price / 0.20` — Task 1 recomputes from the MRPs in the source PDF, not by scaling the existing 80%-off prices.
- WhatsApp number stays `919345273268`.
- Minimum order value stays ₹3000.
- No per-product photography in this pass — product cards use placeholder icon tiles.
- No backend, no payment gateway, no order persistence — everything stays client-side.
- Site must remain usable at mobile widths (primary audience is mobile).
- `html2canvas` is loaded via CDN (`https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js`), verified reachable.

---

## File Structure (end state)

```
crackers_website/
  index.html          # markup only
  style.css           # all styles
  script.js           # catalog data, cart state, rendering, search/nav, checkout, receipt generation
  images/
    hero-fireworks.jpg     # wide hero banner (Diwali fireworks over Jodhpur skyline)
    diya-divider.jpg       # single diya, used as a section divider background
    diya-marigold.jpg      # decorative diya/marigold close-up, used near hero or footer
  docs/superpowers/specs/2026-09-18-crackers-website-redesign-design.md   # already committed
  docs/superpowers/plans/2026-09-18-crackers-website-redesign.md          # this file
```

---

### Task 1: Recompute catalog prices to 75% discount and verify

**Files:**
- Modify: `index.html:260-505` (the `CATALOG` array) — this task edits the array in place in `index.html`; Task 2 will later move this exact array into `script.js` unchanged.
- Create (temporary, for verification only, delete after use): `/tmp/verify-prices.mjs`

**Interfaces:**
- Produces: an updated `CATALOG` array in `index.html` where every item's 4th element (`price`) equals that item's MRP × 0.25, rounded to 2 decimals. This is the array Task 2 relocates verbatim into `script.js`.

**Source of truth for MRPs:** the user's price list PDF (`lokesh crackers list (1).pdf`), specifically the `Rate / Qty` column. The plan below gives the exact MRP → new price mapping computed from that column, cross-checked against the existing 80%-off `Final Rate` values already in `index.html` (MRP = current price / 0.20).

- [ ] **Step 1: Write a Node verification script**

Create `/tmp/verify-prices.mjs`:

```javascript
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const match = html.match(/const CATALOG = (\[[\s\S]*?\n\]);/);
if (!match) {
  console.error("FAIL: could not locate CATALOG array in index.html");
  process.exit(1);
}

// eslint-disable-next-line no-eval
const CATALOG = eval(match[1]);

// Known MRPs (Rate / Qty) for every product code, from the source price list PDF.
// This map is the ground truth this script checks the new prices against.
const MRP = {
  "1":365,"2":450,"3":62.5,"4":80,"5":95,"6":105,"7":150,"8":160,"9":190,"10":215,
  "11":150,"12":160,"13":190,"14":215,"15":615,"16":715,
  "17":680,"18":290,"19":290,"20":290,"21":700,
  "22":295,"23":375,"24":495,"25":800,"26":875,"27":1225,"28":650,
  "29":1145,"30":785,"31":1170,"32":500,
  "34":167.5,"35":300,"36":520,
  "37":495,"38":850,"39":900,"40":575,"41":390,"42":590,
  "43":80,"44":240,
  "45":325,"46":50,"47":75,"48":125,"49":135,"50":120,"51":205,"52":230,"54":400,
  "56":545,"57":545,"58":545,"59":600,"60":600,"61":600,"62":630,"63":885,
  "64":780,"65":1150,
  "66":135,"67":140,"67A":250,
  "68":435,"69":505,"70":675,"73":1000,
  "76":1400,"77":2800,"78":7000,"79":14000,"74":200,
  "80":495,"81":740,"82":800,"83":1325,"84":1325,"85":1325,"86":1325,"87":1325,
  "88":1550,"89":1645,"90":1395,"91":3145,"90-A":2995,
  "92":6250,"93":6215,"94":22325,"95":23955,
  "96":14850,"97":8445,"98":1590,
  "99":6500,"100":6500,"101":6500,"102":4495,
  "103":1895,"104":2645,"105":2645,"106":5550,
  "107":2185,"108":2185,
  "109":5990,"110":5990,"111":7465,"112":11325,"113":11325,
  "114":1275,"115":2950,"116":4450,"117":3960,
  "118":2245,"119":2995,"119A":1700,
  "120":975,"121":1100,"122":1170,"123":1295,"124":1295,"125":1925,
  "126":825,"127":825,"128":825,"129":11995,
  "130":260,"131":600,"132":700,
  "133":725,"134":820,"135":1800,"136":1950,"137":1100,"138":4000,"139":8000,"140":16000,"141":32505,
  "142":1775,"143":3700,"144":7400,"145":14800,
  "146":770,"147":825,"148":535,"149":535,"150":535,"151":535,"152":2675,"153":2385,
  "154":135,"155":645,"156":645,"158":705,"159":705,"160":705,"161":705,"162":845,"163":845,"164":550,"165":550,
  "166":1995,"167":625,"168":945,"169":945,"170":945,"171":945,
  "172":1500,"173":3350,
  "174":595,"175":595,"176":595,
  "178":4475,"179":5250,"180":990,"181":1335,
  "182":675,"183":675,"184":675,"185":675,"186":675,
  "187":515,"188":515,"189":515,"190":515,"191":535,
  "192":675,"193":675,"194":695,"195":695,"196":695,"197":265,"198":265,"199":265,"200":1185,"200-A":485,"200-B":485,
  "201":675,"202":675,"203":675,"204":875,"205":875,"206":875,"207":875,
  "208":265,"209":245,"210":300,"211":735,"212":1795,"213":1120,
  "214":465,"216":650,"217":725,"218":725,"219":725,"220":725,"221":725,
  "222":125,"223":220,"224":545,"225":320,"226":335,"227":285,"228":335,"229":120,"230":585,"231":425,"232":335,"233":750,"234":275,"230-A":335,"230-b":675,"231-A":675,"231-b":680,
  "235":1180,"236":1010,"237":710,"235-a":175,"235-b":250,
  "238":585,"239":800,"240":800,"241":800,"242":800,"243":650,"244":1995,"245":1550,
  "251":575,"252":945,
  "253":40,"254":97,
  "255":1400,
  "257":900,"259":210,"260":420,
  "262":6000,
  "263":209,"264":320,"265":500,"266":3000,"267":3900,"268":4800,
  "269":3000,"270":5000,
};

let failures = 0;
let checked = 0;
CATALOG.forEach(([cat, items]) => {
  items.forEach(([code, name, pack, price]) => {
    checked++;
    if (!(code in MRP)) {
      console.error(`FAIL: no known MRP for code ${code} (${name})`);
      failures++;
      return;
    }
    const expected = Math.round(MRP[code] * 0.25 * 100) / 100;
    if (Math.abs(price - expected) > 0.01) {
      console.error(`FAIL: ${code} ${name} — got ${price}, expected ${expected} (MRP ${MRP[code]} x 0.25)`);
      failures++;
    }
  });
});

console.log(`Checked ${checked} items, ${failures} failures.`);
process.exit(failures > 0 ? 1 : 0);
```

- [ ] **Step 2: Run the verification script against the current (80%-off) prices to confirm it fails**

Run: `node /tmp/verify-prices.mjs`
Expected: many `FAIL:` lines (current prices are 80% off, this checks for 75% off) and a final line like `Checked 262 items, 262 failures.` with a non-zero exit code.

- [ ] **Step 3: Recompute every price in the `CATALOG` array**

In `index.html`, update every 4th element in every `[code, name, pack, price]` tuple inside `CATALOG` (lines 260–505) to `Math.round(MRP * 0.25 * 100) / 100`, i.e. `MRP / 4`. Concretely, replace the existing 80%-off value with the corresponding 75%-off value. Full mapping (old value → new value), grouped by category exactly as the array is laid out:

**Sparklers:** 73→91.25, 90→112.5, 12.5→15.63, 16→20, 19→23.75, 21→26.25, 30→37.5, 32→40, 38→47.5, 43→53.75, 30→37.5, 32→40, 38→47.5, 43→53.75, 123→153.75, 143→178.75

**Special Colourful Sparklers 2025:** 136→170, 58→72.5, 58→72.5, 58→72.5, 140→175

**Flower Pots:** 59→73.75, 75→93.75, 99→123.75, 160→200, 175→218.75, 245→306.25, 130→162.5

**Multi Colour Flower Pots:** 229→286.25, 157→196.25, 234→292.5, 100→125

**Chakkars (Ground):** 33.5→41.88, 60→75, 104→130

**Plastic Chakkar SPL 2025:** 99→123.75, 170→212.5, 180→225, 115→143.75, 78→97.5, 118→147.5

**Twinkling Star:** 16→20, 48→60

**One Sound Crackers:** 65→81.25, 10→12.5, 15→18.75, 25→31.25, 27→33.75, 24→30, 41→51.25, 46→57.5, 80→100

**Wonder Candle 2023 (Sky King):** 109→136.25, 109→136.25, 109→136.25, 120→150, 120→150, 120→150, 126→157.5, 177→221.25

**Colour Crackling Guns:** 156→195, 230→287.5

**Bijili Crackers:** 27→33.75, 28→35, 50→62.5

**Bombs:** 87→108.75, 101→126.25, 135→168.75, 200→250

**Super Sound SPL Wala Crackers:** 280→350, 560→700, 1400→1750, 2800→3500, 40→50

**Blue Star Brand SPL Fancy:** 99→123.75, 148→185, 160→200, 265→331.25, 265→331.25, 265→331.25, 265→331.25, 265→331.25

**Moorthy Brand SPL Fancy:** 310→387.5, 329→411.25, 279→348.75, 629→786.25, 599→748.75

**Moorthy Brand SPL Setout Display:** 1250→1562.5, 1243→1553.75, 4465→5581.25, 4791→5988.75

**Liya Brand SPL IPL New Fancy:** 2970→3712.5, 1689→2111.25, 318→397.5

**Sonny Brand Mega Display:** 1300→1625, 1300→1625, 1300→1625, 899→1123.75

**INF Big Brand Unique Fancy:** 379→473.75, 529→661.25, 529→661.25, 1110→1387.5

**Wow Star Brand SPL Colours:** 437→546.25, 437→546.25

**Vanitha Brand SPL Colour Fancy:** 1198→1497.5, 1198→1497.5, 1493→1866.25, 2265→2831.25, 2265→2831.25

**NSV Brand Fancy Collection:** 255→318.75, 590→737.5, 890→1112.5, 792→990

**Bee Brand:** 449→561.25, 599→748.75, 340→425

**Mega Sky Display Fancy:** 195→243.75, 220→275, 234→292.5, 259→323.75, 259→323.75, 385→481.25

**Asok Brand 2026 SPL:** 165→206.25, 165→206.25, 165→206.25, 2399→2998.75

**Sky Rockets:** 52→65, 120→150, 140→175

**Mega Multicolour Shots:** 145→181.25, 164→205, 360→450, 390→487.5, 220→275, 800→1000, 1600→2000, 3200→4000, 6501→8126.25

**Multi Colour Shot (Budget):** 355→443.75, 740→925, 1480→1850, 2960→3700

**Vanitha Products:** 154→192.5, 165→206.25, 107→133.75, 107→133.75, 107→133.75, 107→133.75, 535→668.75, 477→596.25

**Mini Arial Fancy:** 27→33.75, 129→161.25, 129→161.25, 141→176.25, 141→176.25, 141→176.25, 141→176.25, 169→211.25, 169→211.25, 110→137.5, 110→137.5

**Twin Colour Crackling Fountain (Vimal):** 399→498.75, 125→156.25, 189→236.25, 189→236.25, 189→236.25, 189→236.25

**Whizzling Shot:** 300→375, 670→837.5

**Vadivel Product 2026 (New):** 119→148.75, 119→148.75, 119→148.75

**Sri Vijay Brand Fancy:** 895→1118.75, 1050→1312.5, 198→247.5, 267→333.75

**Colour Crackling Fountain:** 135→168.75, 135→168.75, 135→168.75, 135→168.75, 135→168.75

**3pcs Fountain Sky King:** 103→128.75, 103→128.75, 103→128.75, 103→128.75, 107→133.75

**Crackling & Colour Fountain 2021 SPL:** 135→168.75, 135→168.75, 139→173.75, 139→173.75, 139→173.75, 53→66.25, 53→66.25, 53→66.25, 237→296.25, 97→121.25, 97→121.25

**Sky King Double & Triple Function:** 135→168.75, 135→168.75, 135→168.75, 175→218.75, 175→218.75, 175→218.75, 175→218.75

**New Collection Colour, Mani & Crackling Paper:** 53→66.25, 49→61.25, 60→75, 147→183.75, 359→448.75, 224→280

**Fancy Functions — Collection Sky King:** 93→116.25, 130→162.5, 145→181.25, 145→181.25, 145→181.25, 145→181.25, 145→181.25

**Children's Fancy SPL Novelties:** 25→31.25, 44→55, 109→136.25, 64→80, 67→83.75, 57→71.25, 67→83.75, 24→30, 117→146.25, 85→106.25, 67→83.75, 150→187.5, 55→68.75, 67→83.75, 135→168.75, 135→168.75, 136→170

**2026 New Children's Novelties:** 236→295, 202→252.5, 142→177.5, 35→43.75, 50→62.5

**Peacock 180° Fountain:** 117→146.25, 160→200, 160→200, 160→200, 160→200, 130→162.5, 399→498.75, 310→387.5

**Mega Match Boxes:** 115→143.75, 189→236.25

**Guns:** unchanged — code `253` and `254` are Net Rate items (no discount column in the source list), leave as-is: 40, 97

**Sky King Brand New 2026:** 280→350

**Paper Bomb:** 180→225, 42→52.5, 84→105

**Balaji Brand SPL New Fancy:** 1200→1500

**Gift Boxes:** unchanged — codes `263`–`268` are Net Rate items, leave as-is: 209, 320, 500, 3000, 3900, 4800

**Combo Packs:** unchanged — codes `269`–`270` are Net Rate items, leave as-is: 3000, 5000

Apply every changed value directly in the `CATALOG` array literal in `index.html`. Net Rate items (Guns, Gift Boxes, Combo Packs — the three categories explicitly marked "(Net Rate)" in the source PDF, not "(80% Discount)") have no MRP/discount split in the source and must NOT be changed.

- [ ] **Step 4: Run the verification script again to confirm it passes**

Run: `node /tmp/verify-prices.mjs`
Expected: `Checked 262 items, 0 failures.` and exit code 0. If any `FAIL:` lines remain, fix that specific item's price in `index.html` and re-run.

- [ ] **Step 5: Delete the temporary verification script and commit**

```bash
rm /tmp/verify-prices.mjs
git add index.html
git commit -m "Recompute catalog prices to 75% discount (was 80%)"
```

---

### Task 2: Split `index.html` into `index.html` + `style.css` + `script.js`

**Files:**
- Modify: `index.html` (strip out `<style>` and `<script>` blocks, add `<link>` and `<script src>` references)
- Create: `style.css` (all CSS from the current `<style>` block, unchanged)
- Create: `script.js` (all JS from the current `<script>` block, unchanged — including the already-updated `CATALOG` array from Task 1)

**Interfaces:**
- Produces: `style.css` selectors matching every class/id referenced in `index.html`'s markup (unchanged from current site — no renaming in this task). `script.js` exposes the same global behavior as before (DOM manipulation on load, no module exports needed — it's a plain script, not an ES module).

- [ ] **Step 1: Create `style.css` with the current stylesheet content**

Copy everything between `<style>` and `</style>` in `index.html` (the CSS custom properties, all selectors) verbatim into a new file `style.css`, with no `<style>`/`</style>` tags — just the raw CSS starting from `:root{...}` through the `footer{...}` rule.

- [ ] **Step 2: Create `script.js` with the current script content**

Copy everything between `<script>` and `</script>` in `index.html` (the `CONFIG` constants, the post-Task-1 `CATALOG` array, all functions, and the `/* ---------- Init ---------- */` block) verbatim into a new file `script.js`, with no `<script>`/`</script>` tags.

- [ ] **Step 3: Update `index.html` to reference the external files**

Replace the `<style>...</style>` block with:

```html
<link rel="stylesheet" href="style.css" />
```

placed in `<head>` right after the Google Fonts `<link>` tags.

Replace the `<script>...</script>` block (the whole inline script at the bottom of `<body>`) with:

```html
<script src="script.js"></script>
```

placed at the same location (just before `</body>`).

- [ ] **Step 4: Verify the split site still works**

Run: `python3 -m http.server 8000 --directory .` (or any static file server) from the project root, then fetch it:

```bash
curl -s http://localhost:8000/index.html | grep -c "link rel=\"stylesheet\" href=\"style.css\""
curl -s http://localhost:8000/style.css | head -3
curl -s http://localhost:8000/script.js | grep -c "const CATALOG"
```

Expected: first command outputs `1`, second shows CSS starting with `:root{`, third outputs `1`. Stop the server (`Ctrl+C` or `kill` the background process) after checking.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js
git commit -m "Split index.html into index.html, style.css, and script.js"
```

---

### Task 3: Download hero/divider Diwali photography into `images/`

**Files:**
- Create: `images/hero-fireworks.jpg`
- Create: `images/diya-divider.jpg`
- Create: `images/diya-marigold.jpg`

**Interfaces:**
- Produces: three local JPEG files under `images/` that Task 4 references from `style.css`/`index.html`. No other task depends on their internal content, only their file paths.

These are free-to-use Unsplash photos (Unsplash License: free for commercial and non-commercial use, no permission or attribution required), already verified to download and render correctly during planning.

- [ ] **Step 1: Create the images directory and download the three photos**

```bash
mkdir -p images
curl -sL -o images/hero-fireworks.jpg "https://images.unsplash.com/photo-1592843997881-cab3860b1067?w=1600&q=80&fm=jpg"
curl -sL -o images/diya-divider.jpg "https://images.unsplash.com/photo-1602305361939-806b254e9f47?w=1200&q=80&fm=jpg"
curl -sL -o images/diya-marigold.jpg "https://images.unsplash.com/photo-1577083753695-e010191bacb5?w=1200&q=80&fm=jpg"
```

- [ ] **Step 2: Verify all three downloaded as valid JPEGs**

Run: `file images/hero-fireworks.jpg images/diya-divider.jpg images/diya-marigold.jpg`
Expected: all three lines report `JPEG image data`.

- [ ] **Step 3: Commit**

```bash
git add images/
git commit -m "Add Diwali hero and divider photography"
```

---

### Task 4: Redesign visual style — white/gold theme, card-grid catalog, hero banner, pill category nav

**Files:**
- Modify: `style.css` (full rewrite of color tokens, `.item` → `.card` grid layout, header/hero, nav)
- Modify: `index.html` (header markup for hero banner, category nav markup for pill tabs, product row markup for cards)
- Modify: `script.js` (the catalog-rendering and category-nav-building code, to emit the new card/pill markup instead of the old row/dropdown markup)

**Interfaces:**
- Consumes: `images/hero-fireworks.jpg`, `images/diya-divider.jpg`, `images/diya-marigold.jpg` (Task 3). `CATALOG`, `byCode`, `cart`, `rupee()`, `totals()`, `makeControl()`, `changeQty()` (all pre-existing in `script.js` from Task 2 — unchanged behavior, only their rendered markup changes).
- Produces: `.cat h2` scroll targets keep their `id="cat<N>"` pattern (existing `jumpEl` scroll-to logic is replaced by pill-click scroll-to logic using the same ids — see Step 5). `.item` rows are replaced by `.card` elements but keep `data-code` and `data-search` attributes (existing `search` input logic in Step 6 depends on `data-search` presence).

- [ ] **Step 1: Rewrite color tokens and base styles in `style.css`**

Replace the `:root{...}` block and `body{...}` rule with:

```css
:root{
  --bg:#ffffff;
  --bg-alt:#fdfaf5;
  --card:#fdfaf5;
  --card-border:#eee2ce;
  --maroon:#3a0713;
  --maroon-2:#4d0b1c;
  --gold:#d4a017;
  --gold-2:#f3c14b;
  --orange:#ff7a1a;
  --text:#2b2b2b;
  --muted:#8a6b56;
  --green:#25d366;
  --line:#eee2ce;
  --shadow:0 10px 30px rgba(0,0,0,.12);
}

*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{
  font-family:'Poppins',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  background:var(--bg);
  color:var(--text);
  min-height:100vh;
  -webkit-text-size-adjust:100%;
}
a{color:inherit}
```

- [ ] **Step 2: Add hero banner styles to `style.css`**

Append:

```css
/* ---------- Hero ---------- */
.hero{
  position:relative;
  min-height:220px;
  background:linear-gradient(180deg, rgba(58,7,19,.55), rgba(58,7,19,.75)), url('images/hero-fireworks.jpg') center/cover no-repeat;
  color:#fff4e0;
  text-align:center;
  padding:32px 16px 26px;
}
.hero .diyas{font-size:22px;letter-spacing:6px}
.hero h1{
  font-family:'Baloo 2',cursive;
  font-weight:800;
  margin:8px 0 2px;
  font-size:clamp(28px,7vw,44px);
  color:var(--gold-2);
  text-shadow:0 2px 8px rgba(0,0,0,.5);
  line-height:1.05;
}
.hero .tag{font-size:14px;color:#fff4e0;margin:0;opacity:.9}
.hero .wish{
  display:inline-block;margin-top:8px;font-family:'Baloo 2',cursive;
  font-weight:600;color:var(--gold-2);font-size:15px;
}
.hero .callline{margin-top:6px;font-size:13px;color:#fff4e0;opacity:.85}
.hero .callline a{color:var(--gold-2);text-decoration:none;font-weight:600}
.trustline{
  background:var(--bg-alt);border-bottom:1px solid var(--line);
  text-align:center;padding:8px 12px;font-size:12.5px;color:var(--muted);
}
```

- [ ] **Step 3: Add pill category nav + card grid styles to `style.css`**

Append:

```css
/* ---------- Controls (sticky) ---------- */
.controls{
  position:sticky;top:0;z-index:40;
  background:rgba(255,255,255,.97);
  backdrop-filter:blur(6px);
  border-bottom:1px solid var(--line);
  padding:10px 12px;
}
input,select,textarea{
  font-family:inherit;font-size:15px;color:var(--text);
  background:#fff;border:1px solid var(--line);border-radius:12px;
  padding:11px 12px;outline:none;width:100%;
}
input::placeholder,textarea::placeholder{color:#b89a7a}
#search{margin-bottom:8px}

.pillnav{display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;scrollbar-width:none}
.pillnav::-webkit-scrollbar{display:none}
.pill{
  flex:0 0 auto;white-space:nowrap;font-size:13px;font-weight:600;
  color:var(--maroon);background:var(--bg-alt);border:1px solid var(--card-border);
  border-radius:999px;padding:7px 14px;cursor:pointer;
}
.pill.active{background:var(--gold-2);border-color:var(--gold);color:var(--maroon)}

/* ---------- Catalog ---------- */
main{padding:8px 12px 140px;max-width:960px;margin:0 auto}
.cat{margin-top:24px;scroll-margin-top:150px}
.cat h2{
  font-family:'Baloo 2',cursive;font-weight:700;font-size:19px;
  color:var(--maroon);margin:0 0 4px;
  display:flex;align-items:center;gap:8px;
}
.cat h2 .count{font-family:'Poppins';font-size:12px;color:var(--muted);font-weight:500}
.cat .bar{height:2px;background:linear-gradient(90deg,var(--gold),transparent);border-radius:2px;margin-bottom:10px}

.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media (min-width:640px){ .grid{grid-template-columns:repeat(3,1fr)} }

.card{
  background:var(--card);border:1px solid var(--card-border);border-radius:14px;
  padding:10px;position:relative;display:flex;flex-direction:column;
}
.card .badge{
  position:absolute;top:8px;left:8px;background:var(--orange);color:#fff;
  font-size:10px;font-weight:700;padding:3px 8px;border-radius:8px;z-index:1;
}
.card .tile{
  height:64px;background:#fff4e0;border-radius:10px;margin-bottom:8px;
  display:flex;align-items:center;justify-content:center;font-size:28px;
}
.card .name{font-weight:600;font-size:13.5px;line-height:1.25;min-height:2.4em}
.card .sub{font-size:11px;color:var(--muted);margin:2px 0 6px}
.card .pricerow{display:flex;align-items:baseline;gap:6px;margin-bottom:8px}
.card .mrp{font-size:11px;color:#b89a7a;text-decoration:line-through}
.card .price{font-family:'Baloo 2';font-weight:800;color:var(--gold);font-size:16px}

.stepper{display:flex;align-items:center;gap:0;border:1px solid var(--gold);border-radius:10px;overflow:hidden;background:#fff;margin-top:auto}
.stepper button{
  width:32px;height:32px;border:0;background:transparent;color:var(--maroon);
  font-size:18px;font-weight:700;cursor:pointer;line-height:1;
}
.stepper button:active{background:var(--bg-alt)}
.stepper .qty{flex:1;text-align:center;font-weight:700;font-size:14px}
.add{
  margin-top:auto;
  border:1.5px solid var(--gold);background:transparent;color:#8a6200;
  border-radius:10px;padding:8px 10px;font-weight:700;font-size:13px;cursor:pointer;
  font-family:inherit;width:100%;
}
.add:active{background:var(--bg-alt)}

.noresults{text-align:center;color:var(--muted);padding:40px 10px}

/* ---------- Section divider ---------- */
.divider{
  margin:30px auto 0;max-width:960px;border-radius:16px;overflow:hidden;
  background:linear-gradient(180deg, rgba(58,7,19,.35), rgba(58,7,19,.55)), url('images/diya-divider.jpg') center/cover no-repeat;
  min-height:90px;display:flex;align-items:center;justify-content:center;
  color:#fff4e0;font-family:'Baloo 2',cursive;font-weight:700;font-size:16px;text-align:center;padding:14px;
}
```

- [ ] **Step 4: Update cart bar, overlay, and form styles in `style.css` for the light theme**

Replace the `.cartbar`, `.overlay`, `.sheet`, and related rules with:

```css
/* ---------- Floating cart bar ---------- */
.cartbar{
  position:fixed;left:0;right:0;bottom:0;z-index:50;
  padding:10px 12px calc(10px + env(safe-area-inset-bottom));
  background:linear-gradient(180deg, rgba(255,255,255,0), #fff 30%);
  display:flex;justify-content:center;
  transform:translateY(120%);transition:transform .25s ease;
}
.cartbar.show{transform:translateY(0)}
.cartbar button{
  width:100%;max-width:900px;border:0;cursor:pointer;font-family:'Baloo 2',cursive;
  background:linear-gradient(180deg,var(--gold-2),var(--gold));color:var(--maroon);
  font-weight:800;font-size:17px;padding:14px 18px;border-radius:16px;
  display:flex;justify-content:space-between;align-items:center;box-shadow:var(--shadow);
}
.cartbar .n{background:var(--maroon);color:var(--gold-2);border-radius:20px;padding:2px 10px;font-size:14px}

/* ---------- Modal / cart ---------- */
.overlay{
  position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.45);
  display:none;align-items:flex-end;justify-content:center;
}
.overlay.show{display:flex}
.sheet{
  width:100%;max-width:560px;max-height:92vh;overflow-y:auto;
  background:#fff;
  border:1px solid var(--line);border-radius:20px 20px 0 0;
  padding:16px 16px calc(20px + env(safe-area-inset-bottom));
}
.sheet h3{font-family:'Baloo 2';color:var(--maroon);margin:2px 0 12px;font-size:20px;display:flex;justify-content:space-between;align-items:center}
.sheet h3 .x{cursor:pointer;font-size:26px;color:var(--muted);line-height:1}
.crow{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--line)}
.crow .cn{flex:1;min-width:0}
.crow .cn .t{font-weight:600;font-size:14px}
.crow .cn .s{font-size:12px;color:var(--muted)}
.crow .lp{font-weight:700;color:var(--gold);min-width:64px;text-align:right;font-family:'Baloo 2'}
.empty{color:var(--muted);text-align:center;padding:30px 0}

.totals{margin-top:12px;padding-top:10px;border-top:2px solid var(--gold)}
.totals .line{display:flex;justify-content:space-between;font-size:15px;margin:4px 0}
.totals .grand{font-family:'Baloo 2';font-size:20px;color:var(--maroon);font-weight:800}
.minwarn{background:#fff4e0;border:1px solid var(--orange);color:#8a4a00;border-radius:12px;padding:10px 12px;font-size:13px;margin:12px 0;text-align:center}

.form{margin-top:14px;display:grid;gap:10px}
.form label{font-size:13px;color:var(--muted);margin-bottom:-4px}
textarea{resize:vertical;min-height:64px}
.place{
  margin-top:6px;border:0;cursor:pointer;font-family:'Baloo 2',cursive;font-weight:800;font-size:18px;
  background:linear-gradient(180deg,var(--green),#1eb457);color:#053a1a;
  padding:15px;border-radius:16px;display:flex;align-items:center;justify-content:center;gap:8px;
}
.place:disabled{background:#e2dcd0;color:#a59788;cursor:not-allowed}
.hint{font-size:12px;color:var(--muted);text-align:center;margin-top:6px;line-height:1.5}
.err{color:#c0392b;font-size:13px;text-align:center;min-height:16px}

footer{text-align:center;color:var(--muted);font-size:12px;padding:20px 12px 30px;line-height:1.6;background:var(--bg-alt);border-top:1px solid var(--line)}
```

- [ ] **Step 5: Update `index.html` header markup for the hero banner and trust line**

Replace the `<header>...</header>` block with:

```html
<div class="hero">
  <div class="diyas">🪔 ✨ 🪔 ✨ 🪔</div>
  <h1 id="shopName">Thala Crackers</h1>
  <p class="tag">Sivakasi crackers • Home delivery • Best Diwali rates</p>
  <span class="wish">✨ Happy Diwali! ✨</span>
  <div class="callline">Orders on WhatsApp: <a id="waLink" href="#">chat with us</a></div>
</div>
<div class="trustline">🚚 Free delivery in Tamil Nadu • All-India delivery available • Min order ₹3000</div>
```

- [ ] **Step 6: Update `index.html` controls markup for the pill nav**

Replace the `<div class="controls">...</div>` block with:

```html
<div class="controls">
  <input id="search" type="search" placeholder="🔍 Search crackers…" autocomplete="off" />
  <div class="pillnav" id="pillnav"></div>
</div>
```

(The `<select id="jump">` dropdown is removed entirely — `script.js` Step 7 below replaces it with pill-building logic.)

- [ ] **Step 7: Update `script.js` catalog rendering to emit cards instead of rows, and pills instead of a dropdown**

Replace the catalog-rendering block (the code starting at `const catalogEl = document.getElementById("catalog");` through the end of the `CATALOG.forEach` that builds `sec` and appends `opt` to `jumpEl`) with:

```javascript
/* ---------- Render catalog ---------- */
const catalogEl = document.getElementById("catalog");
const pillnavEl = document.getElementById("pillnav");
const controls = {};
const CATEGORY_ICONS = {
  "Sparklers":"✨","Special Colourful Sparklers 2025":"✨","Flower Pots":"🎇","Multi Colour Flower Pots":"🎇",
  "Chakkars (Ground)":"🌀","Plastic Chakkar SPL 2025":"🌀","Twinkling Star":"⭐","One Sound Crackers":"💥",
  "Wonder Candle 2023 (Sky King)":"🕯️","Colour Crackling Guns":"🔫","Bijili Crackers":"⚡","Bombs":"💣",
  "Super Sound SPL Wala Crackers":"💥","Blue Star Brand SPL Fancy":"🎆","Moorthy Brand SPL Fancy":"🎆",
  "Moorthy Brand SPL Setout Display":"🎆","Liya Brand SPL IPL New Fancy":"🎆","Sonny Brand Mega Display":"🎆",
  "INF Big Brand Unique Fancy":"🎆","Wow Star Brand SPL Colours":"🎨","Vanitha Brand SPL Colour Fancy":"🎨",
  "NSV Brand Fancy Collection":"🎆","Bee Brand":"🐝","Mega Sky Display Fancy":"🎆","Asok Brand 2026 SPL":"🍸",
  "Sky Rockets":"🚀","Mega Multicolour Shots":"🎇","Multi Colour Shot (Budget)":"🎇","Vanitha Products":"🎀",
  "Mini Arial Fancy":"🎆","Twin Colour Crackling Fountain (Vimal)":"⛲","Whizzling Shot":"🎇",
  "Vadivel Product 2026 (New)":"🎭","Sri Vijay Brand Fancy":"🎆","Colour Crackling Fountain":"⛲",
  "3pcs Fountain Sky King":"⛲","Crackling & Colour Fountain 2021 SPL":"⛲","Sky King Double & Triple Function":"🎆",
  "New Collection Colour, Mani & Crackling Paper":"💰","Fancy Functions — Collection Sky King":"🎆",
  "Children's Fancy SPL Novelties":"🎈","2026 New Children's Novelties":"🎈","Peacock 180° Fountain":"🦚",
  "Mega Match Boxes":"🔥","Guns":"🔫","Sky King Brand New 2026":"🎆","Paper Bomb":"💣",
  "Balaji Brand SPL New Fancy":"🦸","Gift Boxes":"🎁","Combo Packs":"📦"
};

CATALOG.forEach(([cat,items],ci) => {
  const secId = "cat"+ci;
  const icon = CATEGORY_ICONS[cat] || "🎆";
  const sec = document.createElement("section");
  sec.className = "cat"; sec.id = secId; sec.dataset.cat = cat.toLowerCase();
  sec.innerHTML = `<h2>${icon} ${cat} <span class="count">(${items.length})</span></h2><div class="bar"></div><div class="grid"></div>`;
  const gridEl = sec.querySelector(".grid");
  items.forEach(it => {
    const [code,name,pack,price] = it;
    const mrp = Math.round(price * 4 * 100) / 100;
    const card = document.createElement("div");
    card.className = "card"; card.dataset.code = code; card.dataset.search = (name+" "+cat).toLowerCase();
    card.innerHTML = `
      <div class="badge">75% OFF</div>
      <div class="tile">${icon}</div>
      <div class="name">${name}</div>
      <div class="sub">${pack}</div>
      <div class="pricerow"><span class="mrp">${rupee(mrp)}</span><span class="price">${rupee(price)}</span></div>
      <div class="ctrl"></div>`;
    card.querySelector(".ctrl").appendChild(makeControl(code));
    gridEl.appendChild(card);
  });
  catalogEl.appendChild(sec);

  const pill = document.createElement("button");
  pill.type = "button"; pill.className = "pill"; pill.textContent = icon+" "+cat;
  pill.onclick = () => {
    document.getElementById(secId).scrollIntoView({behavior:"smooth"});
    document.querySelectorAll(".pill").forEach(p=>p.classList.remove("active"));
    pill.classList.add("active");
  };
  pillnavEl.appendChild(pill);
});
```

Note: `rupee()`, `makeControl()`, `cart`, `byCode`, `changeQty()` are unchanged from the current `script.js` (Task 2 moved them verbatim) — this step only replaces the rendering block, not those helper functions.

- [ ] **Step 8: Remove the now-obsolete `jumpEl` search/jump wiring in `script.js`**

Find and delete this block (it referenced the removed `<select id="jump">`):

```javascript
jumpEl.addEventListener("change", ()=>{
  const el = document.getElementById(jumpEl.value);
  if(el){ el.scrollIntoView({behavior:"smooth"}); }
  jumpEl.selectedIndex = 0;
});
```

Also delete the now-unused `const jumpEl = document.getElementById("jump");` line from the render block (already superseded by `pillnavEl` in Step 7 — make sure no reference to `jumpEl` remains anywhere in `script.js`).

- [ ] **Step 9: Update the search logic in `script.js` to target `.card` instead of `.item`**

Find:

```javascript
search.addEventListener("input", ()=>{
  const q = search.value.trim().toLowerCase();
  let anyVisible = false;
  document.querySelectorAll(".cat").forEach(sec=>{
    let shown = 0;
    sec.querySelectorAll(".item").forEach(it=>{
      const match = !q || it.dataset.search.includes(q);
      it.style.display = match ? "flex" : "none";
      if(match) shown++;
    });
    sec.style.display = shown>0 ? "block" : "none";
    if(shown>0) anyVisible = true;
  });
  noresults.style.display = anyVisible ? "none" : "block";
});
```

Replace `sec.querySelectorAll(".item")` with `sec.querySelectorAll(".card")` and `it.style.display = match ? "flex" : "none";` with `it.style.display = match ? "flex" : "none";` → change to `it.style.display = match ? "" : "none";` (cards use `display:flex` via the `.card` class itself, so clearing the inline style restores it instead of forcing `flex` redundantly):

```javascript
search.addEventListener("input", ()=>{
  const q = search.value.trim().toLowerCase();
  let anyVisible = false;
  document.querySelectorAll(".cat").forEach(sec=>{
    let shown = 0;
    sec.querySelectorAll(".card").forEach(it=>{
      const match = !q || it.dataset.search.includes(q);
      it.style.display = match ? "" : "none";
      if(match) shown++;
    });
    sec.style.display = shown>0 ? "block" : "none";
    if(shown>0) anyVisible = true;
  });
  noresults.style.display = anyVisible ? "none" : "block";
});
```

- [ ] **Step 10: Add a decorative divider between the catalog and footer in `index.html`**

Insert immediately before `<footer>`:

```html
<div class="divider">🪔 Wishing you a safe and sparkling Diwali 🪔</div>
```

- [ ] **Step 11: Verify visually in a browser**

Run: `python3 -m http.server 8000 --directory .` from the project root, open `http://localhost:8000/index.html` in a browser.

Check:
- Hero banner shows the fireworks photo with the shop name overlaid
- Category pills scroll horizontally and clicking one scrolls to that section and highlights the pill
- Products render as a 2-column card grid (3-column on wider screens) with strikethrough MRP, sale price, "75% OFF" badge, and an "Add +" button
- Typing in search filters cards and hides empty category sections
- Adding items shows the stepper control in place of "Add +"
- The divider image appears above the footer

Stop the server after checking.

- [ ] **Step 12: Commit**

```bash
git add index.html style.css script.js
git commit -m "Redesign catalog UI: white/gold theme, card grid, hero photography, pill nav"
```

---

### Task 5: Generate a branded order-receipt image on checkout, with WhatsApp text fallback

**Files:**
- Modify: `index.html` (add the `html2canvas` CDN script tag, add a hidden receipt-template element)
- Modify: `style.css` (add receipt card styles)
- Modify: `script.js` (replace the `placeBtn.onclick` handler)

**Interfaces:**
- Consumes: `cart`, `byCode`, `totals()`, `rupee()`, `SHOP_NAME`, `WHATSAPP_NUMBER`, `MIN_ORDER` (all pre-existing in `script.js`).
- Produces: a `buildReceiptHTML(name, mobile, addr, orderNo)` function in `script.js` that fills the hidden `#receiptCard` element's content, and a `generateOrderNumber()` helper returning a string like `TC-482113`. No other task depends on these — this is the last task in the plan.

- [ ] **Step 1: Add the `html2canvas` CDN script to `index.html`**

Add to `<head>`, after the Google Fonts links:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

- [ ] **Step 2: Add the hidden receipt template markup to `index.html`**

Insert immediately before the closing `</body>` tag (before the `<script src="script.js">` line):

```html
<div id="receiptCard" style="position:fixed;left:-9999px;top:0;width:360px;font-family:'Poppins',sans-serif;background:#fffaf0;border-radius:16px;overflow:hidden">
  <div class="receipt-head">
    <div class="receipt-diyas">🪔✨🪔</div>
    <div class="receipt-shop" id="rShop">Thala Crackers</div>
    <div class="receipt-sub">Sivakasi Direct • Order Receipt</div>
  </div>
  <div class="receipt-body">
    <div class="receipt-meta">
      <span id="rOrderNo">Order #TC-000000</span><span id="rDate"></span>
    </div>
    <div class="receipt-items" id="rItems"></div>
    <div class="receipt-total">
      <span id="rCount">0 items</span>
      <span id="rGrand">₹0</span>
    </div>
    <div class="receipt-customer" id="rCustomer"></div>
  </div>
  <div class="receipt-foot">Please burst crackers safely 🎆 Happy Diwali!</div>
</div>
```

- [ ] **Step 3: Add receipt styles to `style.css`**

Append:

```css
/* ---------- Order receipt (rendered to image) ---------- */
.receipt-head{background:linear-gradient(135deg,var(--maroon),var(--maroon-2));padding:18px 20px;text-align:center}
.receipt-diyas{font-size:24px}
.receipt-shop{color:var(--gold-2);font-weight:800;font-size:19px;margin-top:4px}
.receipt-sub{color:#e8c9a8;font-size:10px;margin-top:2px}
.receipt-body{padding:16px 20px}
.receipt-meta{display:flex;justify-content:space-between;font-size:11px;color:#888;margin-bottom:10px}
.receipt-items{border-top:2px dashed #e8d5b8;padding-top:10px}
.receipt-cat{font-size:11px;font-weight:700;color:#b8860b;letter-spacing:.5px;margin:8px 0 4px}
.receipt-cat:first-child{margin-top:0}
.receipt-line{display:flex;justify-content:space-between;font-size:12.5px;padding:2px 0}
.receipt-total{border-top:2px dashed #e8d5b8;margin-top:10px;padding-top:10px;display:flex;justify-content:space-between;align-items:center}
.receipt-total span:first-child{font-size:12px;color:#888}
.receipt-total span:last-child{font-size:19px;font-weight:800;color:var(--maroon)}
.receipt-customer{background:#fff4e0;border-radius:10px;padding:10px 12px;margin-top:12px;font-size:11.5px;line-height:1.6}
.receipt-foot{background:var(--maroon);color:#e8c9a8;text-align:center;padding:8px;font-size:10px}
```

- [ ] **Step 4: Replace the `placeBtn.onclick` handler in `script.js`**

Find the existing block:

```javascript
/* ---------- Place order (WhatsApp) ---------- */
document.getElementById("placeBtn").onclick = ()=>{
  const name = document.getElementById("fName").value.trim();
  const mobile = document.getElementById("fMobile").value.trim();
  const email = document.getElementById("fEmail").value.trim();
  const addr = document.getElementById("fAddr").value.trim();
  const err = document.getElementById("formErr");

  if(!name){ err.textContent="Please enter your name."; return; }
  if(mobile.replace(/\D/g,"").length < 10){ err.textContent="Please enter a valid 10-digit mobile number."; return; }
  if(!addr){ err.textContent="Please enter your delivery address."; return; }
  err.textContent = "";

  const {sum,count} = totals();
  let msg = `🪔 *New Order — ${SHOP_NAME}*\n\n*Items:*\n`;
  let i = 1;
  for(const code in cart){
    const it = byCode[code], q = cart[code];
    msg += `${i}. ${it.name} (${it.pack}) × ${q} = ${rupee(it.price*q)}\n`;
    i++;
  }
  msg += `\n*Total: ${rupee(sum)}*  (${count} item${count>1?"s":""})\n\n`;
  msg += `*Customer details*\nName: ${name}\nMobile: ${mobile}\n`;
  if(email) msg += `Email: ${email}\n`;
  msg += `Address: ${addr}\n`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.location.href = url;
};
```

Replace it entirely with:

```javascript
/* ---------- Place order (receipt image + WhatsApp) ---------- */
function generateOrderNumber(){
  return "TC-" + Date.now().toString().slice(-6);
}

function buildReceipt(orderNo, name, mobile, addr){
  document.getElementById("rShop").textContent = SHOP_NAME;
  document.getElementById("rOrderNo").textContent = "Order #"+orderNo;
  document.getElementById("rDate").textContent = new Date().toLocaleString("en-IN", {dateStyle:"medium", timeStyle:"short"});

  const byCat = {};
  for(const code in cart){
    const it = byCode[code];
    (byCat[it.cat] ||= []).push([it, cart[code]]);
  }
  const itemsEl = document.getElementById("rItems");
  itemsEl.innerHTML = "";
  Object.keys(byCat).forEach(cat=>{
    const catDiv = document.createElement("div");
    catDiv.className = "receipt-cat";
    catDiv.textContent = cat;
    itemsEl.appendChild(catDiv);
    byCat[cat].forEach(([it,q])=>{
      const line = document.createElement("div");
      line.className = "receipt-line";
      line.innerHTML = `<span>${it.name} ×${q}</span><b>${rupee(it.price*q)}</b>`;
      itemsEl.appendChild(line);
    });
  });

  const {sum,count} = totals();
  document.getElementById("rCount").textContent = count+" item"+(count>1?"s":"");
  document.getElementById("rGrand").textContent = rupee(sum);

  document.getElementById("rCustomer").innerHTML =
    `<b>${name}</b><br>${mobile}<br>${addr}<br><span style="color:#1a8a3f">🚚 Free delivery (Tamil Nadu) / All-India delivery available</span>`;
}

document.getElementById("placeBtn").onclick = async ()=>{
  const name = document.getElementById("fName").value.trim();
  const mobile = document.getElementById("fMobile").value.trim();
  const addr = document.getElementById("fAddr").value.trim();
  const err = document.getElementById("formErr");

  if(!name){ err.textContent="Please enter your name."; return; }
  if(mobile.replace(/\D/g,"").length < 10){ err.textContent="Please enter a valid 10-digit mobile number."; return; }
  if(!addr){ err.textContent="Please enter your delivery address."; return; }
  err.textContent = "";

  const orderNo = generateOrderNumber();
  buildReceipt(orderNo, name, mobile, addr);

  const receiptEl = document.getElementById("receiptCard");
  const canvas = await html2canvas(receiptEl, {backgroundColor:"#fffaf0", scale:2});
  const dataUrl = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `${orderNo}-receipt.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  const {sum,count} = totals();
  const msg = `🪔 *New Order — ${SHOP_NAME}*\nOrder #${orderNo}\n${count} item${count>1?"s":""}, Total: ${rupee(sum)}\n\nPlease find my order receipt attached 👇\n(Tap 📎 to attach ${orderNo}-receipt.png from your downloads)\n\nName: ${name}\nMobile: ${mobile}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.location.href = url;
};
```

Note: the `fEmail` input stays in the form markup unchanged (it was always optional). This new handler simply doesn't read it, matching the receipt card design, which has no email field.

- [ ] **Step 5: Verify the receipt generation and download in a browser**

Run: `python3 -m http.server 8000 --directory .` from the project root, open `http://localhost:8000/index.html`.

Check:
- Add a few items from different categories to the cart
- Open the cart, fill in name/mobile/address, tap "Place Order"
- A PNG file named like `TC-123456-receipt.png` downloads, showing the branded receipt with items grouped by category, total, and customer details
- The browser then navigates to (or opens) a `wa.me` link with the short backup text pre-filled

Stop the server after checking.

- [ ] **Step 6: Commit**

```bash
git add index.html style.css script.js
git commit -m "Replace plain-text WhatsApp order message with generated branded receipt image"
```

---

## Final Verification (after all tasks)

- [ ] Serve the site (`python3 -m http.server 8000 --directory .`) and manually walk through: search a product, add several items across categories, confirm min-order (₹3000) gating still blocks "Place Order" below that threshold and unblocks above it, submit with a missing required field to confirm validation still fires, then complete a full order and confirm the receipt PNG + WhatsApp handoff both work.
- [ ] Check the page at a mobile viewport width (e.g. browser dev tools set to 375px) to confirm the card grid, pill nav, and cart sheet remain usable.
- [ ] Confirm `git log --oneline -6` shows five feature commits plus the earlier spec commit, and `git status` is clean.
