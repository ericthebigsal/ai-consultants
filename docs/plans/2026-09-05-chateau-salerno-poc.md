# Chateau Salerno POC Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This plan builds static HTML/CSS and Shelfmark documents — there is no test runner; "verification" means an HTML tag-balance check plus a browser screenshot review, described per task.

**Goal:** Produce a client-facing proof-of-concept package — a Business Case, a Statement of Work, and four clickable capability prototypes — pitching AI modernization to a fictional winery-commerce SaaS company, Chateau Salerno.

**Architecture:** Plain static HTML/CSS, no build step, served by the existing GitHub Pages site. Four prototype pages plus a landing page live in `showcase/chateau-salerno/` with a dedicated stylesheet; the demos are that design system in use. Eight Shelfmark documents (in a new `Chateau Salerno` category) carry the written deliverables and frame each demo. Nothing calls a live model — all "AI output" is pre-generated representative content, labeled as such.

**Tech Stack:** HTML5, hand-written CSS with custom properties, Google Fonts (Newsreader or similar serif + a grotesk + a mono). No JS frameworks; small vanilla JS only where a prototype needs a visible interaction (tab/example switching). Shelfmark writes via the `Artifact` tool's `write_db` / `read_db`.

**Spec:** Shelfmark → Product → Feature Specs → *"Chateau Salerno POC — Build Spec"* (`PRD.SPC.0HDIM`). The plan argues from that spec; executors read both.

## Global Constraints

- **No live model calls, no backend.** Every prototype ships pre-generated content. Each page carries a visible line stating what is real (the UI, the flow) vs. pre-generated (the AI output).
- **Fictional, labeled.** Chateau Salerno, Kestrel Ridge Vineyards, and every figure/name/vendor are invented. Every page footer carries the illustrative-sample disclaimer (copy in Task 1).
- **Commerce7 is an internal reference only.** Never named in any client-facing deliverable (demo pages, Business Case, SOW, Prototype docs). Use the domain vocabulary below, not Commerce7's branding.
- **Domain vocabulary:** *customers* (not "contacts"); orders resolve to the bottle/SKU line; club *memberships* with *tiers* and *allocations*; *cellar-door* POS; *subscription / club processing runs*; *tags* and saved *segments*.
- **Chateau Salerno is the product identity** for the demo pages — NOT the ai-consultants IBM Plex system and NOT Northwind's petrol/grotesk. Single committed light theme, all colors painted explicitly. Palette and type locked in Task 1.
- **AI-cliché guard:** the accent is vine-green, never terracotta; a grotesk carries all working UI; the serif is display-only. If a screenshot reads as "warm cream + serif + terracotta," revise.
- **Client-facing polish:** no draft banners, no `TBD`/`Proposed` tags on these deliverables (unlike the ai-consultants site). Illustrative figures in the SOW/Business Case are flagged inline as illustrative, not hidden.
- **Shelfmark IDs:** doc ids `doc-<subcat-slug>-<Date.now() base36>`; codes `Date.now().toString(36).toUpperCase().slice(-5)`; positions `-Date.now()`. Never continue a sequential code series.
- **Commit** after each task with `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>` and the `Claude-Session:` trailer already used in this repo's history.

## Sample data canon (use verbatim across all four demos)

**Winery:** Kestrel Ridge Vineyards — Dundee Hills AVA, Willamette Valley, Oregon. Est. 2009. ~4,000 cases/year. Voice: warm, unfussy, specific about place; never "notes of"-listy; talks about the vineyard block and the season.

**Current releases:**

| SKU | Wine | Price | Notes |
|---|---|---|---|
| `PN-EST-22` | 2022 Estate Pinot Noir | $52 | The workhorse; 60% of club allocation |
| `PN-B7-22` | 2022 Reserve Pinot Noir "Block 7" | $95 | 180 cases; Falconer tier + mailing-list allocation |
| `CH-EST-23` | 2023 Estate Chardonnay | $38 | |
| `RS-PN-23` | 2023 Rosé of Pinot Noir | $28 | Spring release, sells out |
| `PN-OV-21` | 2021 Pinot Noir "Old Vine" | $68 | Library-ish; 1974 plantings |

**Club — "The Aviary":** 3 tiers. Fledgling (4 btl/shipment, 2 shipments/yr) ~520 members · Kestrel (8 btl, 2/yr) ~300 · Falconer (12 btl + Block 7 access, 3/yr) ~80. **~900 members total.** Mailing list ~6,000 (900 are club).

**Retention-demo members (use these exact rows):**

| Customer | Tier | Tenure | Spend to date | Risk | Predicted 24-mo value | Top factors |
|---|---|---|---|---|---|---|
| Dana Whitfield | Falconer | 4.2 yr | $3,940 | 0.71 | $1,180 | No cellar-door visit in 18 mo · last 2 allocations set to "hold" · email opens down 40% |
| Marcus Lindqvist | Kestrel | 1.1 yr | $610 | 0.63 | $540 | Joined on a Rosé promo · one shipment declined · no add-on purchases |
| Priya Anand | Falconer | 6.5 yr | $8,220 | 0.09 | $2,600 | Visits twice a year · buys Block 7 every release · refers |
| Tom Becker | Fledgling | 0.7 yr | $210 | 0.55 | $260 | New · card declined once · no email engagement yet |
| Sofia Reyes | Kestrel | 3.0 yr | $2,150 | 0.22 | $1,400 | Steady · opens most emails · one recent support ticket about shipping |
| Grant Fowler | Fledgling | 2.4 yr | $840 | 0.68 | $300 | Downgraded from Kestrel last year · buys only at the minimum · TX shipping holds in summer |

**Segments-demo canonical query:** *"club members in Texas who bought Pinot at least twice but haven't opened an email in 90 days"* → resolves to a filter tree (tier is any Aviary tier AND ship-state = TX AND lifetime Pinot orders ≥ 2 AND last email open > 90 days ago) → **34 customers**. Sample matched names: Grant Fowler, two others.

**Journeys-demo goal:** *"win back lapsed Aviary members before the fall release"* → a 5-step email + SMS journey (defined in Task 3).

**Copy-demo input:** `PN-B7-22` — 2022 Reserve Pinot Noir "Block 7", Dundee Hills, 14 months in French oak (30% new), 180 cases, from the 1998 block on the ridge's east shoulder, cool vintage, picked Sept 28.

---

### Task 1: Chateau Salerno design system + Prototype landing page

**Files:**
- Create: `showcase/chateau-salerno/assets/chateau-salerno.css`
- Create: `showcase/chateau-salerno/index.html`

**Interfaces:**
- Produces: the CSS classes every later demo consumes — `.cs-header`, `.cs-nav`, `.cs-hero`, `.cs-eyebrow`, `.cs-panel`, `.cs-footer`, `.cs-disclaimer`, `.cs-btn` (`--primary`/`--ghost`), `.cs-field`, `.cs-tag`, `.mock-badge`, `.reg` (register table), `.stat`, and the CSS custom properties. Later tasks must not invent parallel classes.
- Produces: the shared header/nav/footer HTML block (copied into each page verbatim; nav has 5 links: Overview, Segments, Journeys, Retention, Copy).

- [ ] **Step 1: Write `chateau-salerno.css`**

Design tokens (paint everything explicitly; single light theme):

```css
:root {
  --paper:        #F4EFE6;   /* warm parchment, green-gray bias — NOT #F4F1EA cream */
  --surface:      #FCFAF4;
  --surface-sunk: #ECE5D6;
  --ink:          #22190F;   /* near-black, warm */
  --ink-soft:     #4A3F31;
  --mute:         #7A6E5B;
  --rule:         #DCD2BF;
  --rule-soft:    #E8E0CF;
  --wine:         #5B2233;   /* deep bordeaux, primary */
  --wine-mid:     #86394C;   /* links, hover */
  --wine-tint:    #EFE1E2;
  --vine:         #4F6B47;   /* secondary — the anti-terracotta accent */
  --vine-tint:    #E3EADD;
  --brass:        #A9803C;   /* premium / allocation moments, used rarely */
  --brass-tint:   #F0E6D0;
  --shadow: 0 1px 2px rgba(34,25,15,.06), 0 14px 30px -18px rgba(34,25,15,.20);

  --f-display: "Newsreader", Georgia, "Times New Roman", serif;   /* display only */
  --f-body:    "Hanken Grotesk", system-ui, -apple-system, sans-serif;
  --f-mono:    "Spline Sans Mono", ui-monospace, Menlo, monospace;

  --container: 1080px;
  --measure:   680px;
}
```

Include, styled through those tokens:
- Reset (`*{box-sizing}`, `body{margin:0;background:var(--paper);color:var(--ink);font:17px/1.6 var(--f-body)}`, `img{max-width:100%;display:block}`, `[hidden]{display:none!important}`).
- Headings in `--f-display` (400/500/600), `text-wrap:balance`, `letter-spacing:-0.01em`. Body/UI text in `--f-body`.
- `.cs-header` (sticky, `--surface`, bottom `--rule`), `.cs-header-in` (flex, max-width `--container`, padding 14px 32px), `.cs-brand` (serif 600, a small SVG grape/estate mark in `--wine`), `.cs-nav` (flex gap, links `--mute` → hover `--surface-sunk`, `[aria-current=page]` → `--wine` on `--wine-tint`), `.cs-sample-tag` (mono 11px pill, "Illustrative prototype").
- `.cs-hero` (max-width `--container`, padding 60px 32px 36px, bottom `--rule`), `.cs-eyebrow` (mono 12px, `letter-spacing:.14em`, uppercase, `--vine`), `.cs-hero h1` (`clamp(2.1rem,4.6vw,3.2rem)`, serif 500), `.cs-hero p` (max-width 56ch, 1.1rem, `--ink-soft`), `.cs-meta` (mono 12px row, `--mute`).
- `.cs-main` (max-width `--container`, padding 8px 32px 72px), `.cs-main > section` (`max-width:var(--measure)`, padding 40px 0, bottom `--rule-soft`), `.sec-label` (mono 12px uppercase `--mute`), `.lead` (1.1rem `--ink-soft`).
- `.cs-panel` (the demo surface: `border:1px solid var(--rule)`, `border-radius:12px`, `background:var(--surface)`, `box-shadow:var(--shadow)`, padding 22px). `.cs-panel + .cs-panel { margin-top:14px }`.
- `.cs-btn` base (grotesk 14px 600, padding 9px 18px, radius 8px, `transition:background-color .15s`); `--primary` (`background:var(--wine)`, `color:var(--surface)`, hover `--wine-mid`); `--ghost` (`color:var(--ink-soft)`, hover `background:var(--surface-sunk)`).
- `.cs-field` (flex column gap 5px), `.cs-field label` (12px 600 `--ink-soft`), `.cs-input`/`textarea.cs-input` (grotesk 14px, padding 9px 11px, `border:1px solid var(--rule)`, radius 8px, `background:var(--paper)`; `:focus` → `border-color:var(--wine-mid)`, `box-shadow:0 0 0 3px var(--wine-tint)`, `outline:none`).
- `.cs-tag` (mono 10.5px, padding 3px 8px, radius 999px); variants `--vine` (`--vine-tint`/`--vine`), `--wine` (`--wine-tint`/`--wine-mid`), `--brass` (`--brass-tint`/`--brass`), `--mute` (`--surface-sunk`/`--mute`).
- `.mock-badge` (mono 10px, `--surface-sunk`, `--mute`, radius 4px, padding 2px 6px) + inline text pattern "Pre-generated" — used to mark every block of AI output.
- `.reg` table (`border-collapse:collapse`, `width:100%`, `font-size:13.5px`; `th`/`td` `text-align:left`, padding 9px 12px, bottom `--rule-soft`; `thead th` mono 11px uppercase `--mute` bottom `--rule`; `td.num` mono right-aligned `tabular-nums`). `.reg-wrap { overflow-x:auto }`, `.reg.wide { min-width:640px }`.
- `.stat` (border `--rule`, radius 10px, padding 14px 16px, `background:var(--surface)`; `.k` mono 11px uppercase `--mute`; `.v` serif 500 1.7rem; `.d` mono 12px, `.d.up`→`--vine`, `.d.down`→`--wine-mid`).
- `.callout` (margin-top 20px, `border:1px solid var(--rule)`, left `3px solid var(--wine)`, radius `0 8px 8px 0`, `background:var(--surface)`, padding 15px 18px, 14.5px `--ink-soft`); `.callout.vine` left `--vine`.
- `.cs-footer` (top `--rule`, `--surface`), `.cs-footer-in` (max-width `--container`, padding 26px 32px 42px, 13px `--mute`), `.cs-disclaimer strong { color: var(--ink-soft) }`.
- Focus: `:focus-visible { outline:2px solid var(--wine-mid); outline-offset:3px }`.
- `@media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation-duration:.001ms!important; transition-duration:.001ms!important } }`.
- `@media (max-width:640px)` — `.cs-header-in,.cs-hero,.cs-main,.cs-footer-in { padding-left:20px; padding-right:20px }`; body 16px.

Font link (each HTML page `<head>`):
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Hanken+Grotesk:wght@400;500;600&family=Spline+Sans+Mono:wght@400;500&display=swap">
```

- [ ] **Step 2: Write the shared chrome block** (reused verbatim in Tasks 2–5)

```html
<header class="cs-header">
  <div class="cs-header-in">
    <a class="cs-brand" href="index.html">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="11" r="5.5" fill="#5B2233"></circle><path d="M9 5.5 C9 3 10.5 1.5 12.5 1.5" stroke="#4F6B47" stroke-width="1.6" fill="none" stroke-linecap="round"></path></svg>
      Chateau&nbsp;Salerno
    </a>
    <nav class="cs-nav" aria-label="Prototype">
      <a href="index.html">Overview</a>
      <a href="segments.html">Segments</a>
      <a href="journeys.html">Journeys</a>
      <a href="retention.html">Retention</a>
      <a href="copy.html">Copy</a>
    </nav>
    <span class="cs-sample-tag">Illustrative prototype</span>
  </div>
</header>
```

Footer (reused verbatim):
```html
<footer class="cs-footer">
  <div class="cs-footer-in">
    <p class="cs-disclaimer"><strong>Illustrative prototype, not a shipping product.</strong> Chateau Salerno and Kestrel Ridge Vineyards are fictional; all data, wines, and figures are invented. The interface and flow are real; every block of AI output is pre-generated and marked. Built by AI&nbsp;Consultants <em>(working name)</em>. More: <a href="https://ericthebigsal.github.io/ai-consultants/">ai-consultants</a>.</p>
  </div>
</footer>
```

- [ ] **Step 3: Write `index.html` (Prototype landing)**

Full doctype page. `<head>` per the font link above + `<link rel="stylesheet" href="assets/chateau-salerno.css">` + `<meta name="robots" content="noindex">` + `<title>Chateau Salerno — AI Capability Prototype</title>`. Body: shared header (Overview has no `aria-current` here — it's the brand target; give the `index.html` nav link `aria-current="page"`), then:
- `.cs-hero`: eyebrow "AI capability prototype", h1 "Four new capabilities, built on the platform Chateau Salerno already has.", lead paragraph naming the sample winery (Kestrel Ridge) and stating what's real vs. pre-generated, `.cs-meta` ("4 capabilities · 1 sample winery · ~900 club members · static prototype").
- `.cs-main` with one `<section>` per capability (4 total), each: `.sec-label` ("01 · Natural-language segments" … "04 · Tasting notes & copy"), h2, a 2-sentence lead, a `.cs-panel` with a 1-line "What it replaces / What it adds" pair, and a `.cs-btn--primary` linking to the demo (`segments.html` etc.).
- A closing `<section>`: h2 "How to read these", a short paragraph — the UI and flows are representative of what a build would produce; the model output is pre-generated for a fixed set of inputs; nothing here calls an API.
- Footer.

- [ ] **Step 4: Verify**

```bash
python3 - <<'EOF'
import re
for f in ["showcase/chateau-salerno/index.html"]:
    s=open(f).read()
    for t in ["div","section","header","footer","nav","p","svg","main"]:
        o=len(re.findall(rf"<{t}\b",s)); c=len(re.findall(rf"</{t}>",s))
        if o!=c: print(f,t,o,c)
print("balance ok")
EOF
(python3 -m http.server 8123 >/tmp/h.log 2>&1 &) ; sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8123/showcase/chateau-salerno/index.html
```

Then in the browser: navigate to the local URL, screenshot the hero + first section. Confirm: parchment ground (not cream), bordeaux h1 accents only where intended, serif is display-only, nav renders 5 items. If it reads cream+serif+terracotta, adjust `--paper` cooler and confirm `--vine`/`--brass` are the only accents. One adjustment pass, then stop.

- [ ] **Step 5: Commit**

```bash
git add showcase/chateau-salerno/
git commit -m "$(printf 'Add Chateau Salerno prototype: design system + landing\n\nCo-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01Mst2XictbufczjX36JNBQM')"
```

---

### Task 2: Demo — Natural-language segments

**Files:**
- Create: `showcase/chateau-salerno/segments.html`

**Interfaces:**
- Consumes: all `.cs-*` classes and the shared chrome from Task 1. Nav link `segments.html` gets `aria-current="page"`.
- Produces: the pattern the later demos follow — an input area, a "Generate" affordance (non-functional or JS example-switcher), a `.mock-badge`-marked output, and an "inspect / edit" affordance showing the AI output is not a black box.

- [ ] **Step 1: Build the page**

Doctype + head (same as Task 1 pattern, title "Chateau Salerno — Natural-language segments"). Body: shared header (Segments `aria-current`), then:

- `.cs-hero`: eyebrow "Capability 01", h1 "Describe the audience. Get the segment.", lead — today a Kestrel Ridge marketer builds this segment by hand across five filter screens; here they type it. `.cs-meta` ("Built on the existing segment engine · query is inspectable · nothing is hidden").

- `<section id="try">`: `.sec-label` "The ask", then a `.cs-panel` containing:
  - A `.cs-field` with a `<label>` "Describe your audience" and a `textarea.cs-input` (readonly, 2 rows) pre-filled with the canonical query verbatim.
  - Below it, 2 more example queries as `.cs-btn--ghost` chips (non-functional, illustrative): "Falconer members who haven't bought Block 7 this release" and "Anyone who visited the cellar door in the last year but isn't in the club".
  - A `.cs-btn--primary` "Generate segment".

- `<section id="result">`: `.sec-label` "What it produced", `<span class="mock-badge">Pre-generated</span>` inline, then:
  - A `.cs-panel` "Resolved filter" — the filter tree as a nested `<ul>` with mono condition text: `tier ∈ {Fledgling, Kestrel, Falconer}` AND `ship-to state = TX` AND `lifetime Pinot bottles ≥ 2` AND `last email open > 90 days ago`. Each row has a small `.cs-btn--ghost` "edit" (non-functional) to show it's editable.
  - A `.cs-panel` with a `.stat`: k "Matched customers", v "34", d "of 900 club members".
  - A `.cs-panel` "Sample" — a `.reg` table (Customer, Tier, Ship state, Lifetime Pinot btl, Last email open) with 5 rows including Grant Fowler (Fledgling, TX, 6, 118 days). Invent 4 more consistent rows.
  - A `.callout` — "This is the same segment object the campaign builder and journeys use. The model wrote the filter; it didn't create a new kind of segment."

- `<section id="how">`: `.sec-label` "In a build", 3 bullets — the model maps language to the existing filter schema (no new query language); ambiguous asks return a clarifying question, not a guess; every generated segment is saved as a normal editable segment with the prompt kept on it.

- Footer.

- [ ] **Step 2: Verify** — tag-balance check (same script, add the file), serve, screenshot the result section. Confirm the filter tree is legible, the `.mock-badge` is visible, the stat reads clearly. One fix pass.

- [ ] **Step 3: Commit**

```bash
git add showcase/chateau-salerno/segments.html
git commit -m "$(printf 'Add Chateau Salerno prototype: natural-language segments\n\nCo-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01Mst2XictbufczjX36JNBQM')"
```

---

### Task 3: Demo — Campaign & journey drafting

**Files:**
- Create: `showcase/chateau-salerno/journeys.html`

**Interfaces:**
- Consumes: Task 1 classes + chrome. Nav `journeys.html` `aria-current`.
- Produces: a `#journey-step` block pattern (step number, channel tag, timing, content) that `retention.html` (Task 4) links into by anchor (`journeys.html#journey-step-1`).

- [ ] **Step 1: Build the page**

Head/title "Chateau Salerno — Campaign & journey drafting". Body: header (Journeys `aria-current`), then:

- `.cs-hero`: eyebrow "Capability 02", h1 "A goal in. A journey out.", lead — Kestrel Ridge's marketer describes the outcome; the platform drafts the multi-step email + SMS journey, timing and copy included, on the same canvas they already edit. `.cs-meta` ("Email + SMS · editable steps · copy in the winery's voice").

- `<section id="goal">`: `.sec-label` "The goal", `.cs-panel` with a readonly `.cs-input` pre-filled with the canonical goal ("win back lapsed Aviary members before the fall release") + a `.cs-field` row of pre-set controls shown as static `.cs-tag`s: "Audience: lapsed Aviary (no order 9+ mo) — 212 members", "Window: 3 weeks", "Channels: email + SMS". A `.cs-btn--primary` "Draft journey".

- `<section id="journey">`: `.sec-label` "Drafted journey", `<span class="mock-badge">Pre-generated</span>`, then 5 `.cs-panel` blocks with `id="journey-step-1"`…`5`, each:
  - Header row: `<span class="cs-tag cs-tag--wine">Step N</span>`, a channel tag (`cs-tag--vine` "Email" / `cs-tag--mute` "SMS"), timing mono text.
  - Subject / preview (email) or message (SMS), in Kestrel Ridge's voice.
  - A short rationale line in `--mute` ("why this step").
  - A `.cs-btn--ghost` "edit copy" (non-functional).

  Steps:
  1. **Email · Day 0** — Subject "The east ridge came in late this year". Body opens with the vineyard/season, not a discount; mentions the fall release date; soft link to reactivate. Rationale: lead with place, not the ask.
  2. **SMS · Day 4 (only if email unopened)** — "Kestrel Ridge: fall release opens the 15th. Your Aviary spot is held through the 12th — reply YES to keep it." Rationale: SMS only for non-openers; a real deadline, not urgency theatre.
  3. **Email · Day 8** — Subject "What you'd have gotten in the spring shipment". Shows the specific wines they missed (Estate Pinot, Rosé) with tasting-room-style notes. Rationale: concrete loss, specific to their tier.
  4. **Email · Day 14 (branch: opened step 3)** — Subject "Hold your fall allocation". One-click reactivate; Falconer-tier members also get Block 7 mentioned. Rationale: the actual conversion step, only to the engaged branch.
  5. **SMS · Day 19 (branch: no reactivation)** — "Last call — fall allocations lock tomorrow. [link]". Rationale: single final touch; then the member exits the journey to a quarterly re-engagement list, not repeated sends.

- `<section id="canvas">`: `.sec-label` "On the canvas", a `.cs-panel` with a simple ASCII-ish or CSS flow diagram of the 5 steps with the two branch points labeled, and a `.callout` — "Every step is a normal journey step. The model set the structure, timing, and first-draft copy; the marketer edits in place and publishes."

- `<section id="how">`: 3 bullets — copy is drafted from the winery's own past sends and product data (voice, not generic); branch logic uses existing engagement events; the marketer approves before anything sends.

- Footer.

- [ ] **Step 2: Verify** — balance check, serve, screenshot the journey steps + canvas. Confirm step blocks are distinct, channel tags read, branch labels are legible. One fix pass.

- [ ] **Step 3: Commit** (message: "Add Chateau Salerno prototype: campaign & journey drafting", same trailers).

---

### Task 4: Demo — Churn / LTV prediction

**Files:**
- Create: `showcase/chateau-salerno/retention.html`

**Interfaces:**
- Consumes: Task 1 classes + chrome; links to `journeys.html#journey-step-1` and `segments.html`. Nav `retention.html` `aria-current`.

- [ ] **Step 1: Build the page**

Head/title "Chateau Salerno — Churn & lifetime-value prediction". Body: header (Retention `aria-current`), then:

- `.cs-hero`: eyebrow "Capability 03", h1 "Which club members are about to leave — and why.", lead — every Aviary member scored on cancellation risk and predicted 24-month value, with the factors behind each score, feeding straight into a win-back journey. `.cs-meta` ("900 members scored weekly · factors shown, not just a number · one click to a journey").

- `<section id="summary">`: `.sec-label` "This week", a row of 3 `.stat`s: "At-risk (risk ≥ 0.5)" v "88" d.down "▲ 12 vs last week"; "Predicted 90-day cancels" v "23"; "Value at risk (24-mo)" v "$46k". A `.callout.vine` — "Risk is only useful if it's actionable. Every at-risk member below has a one-click path into the win-back journey."

- `<section id="scores">`: `.sec-label` "Member scores", `<span class="mock-badge">Pre-generated</span>`, a `.reg-wrap` with `.reg.wide` table: columns Customer, Tier, Tenure, Spend to date, **Risk**, Predicted 24-mo, Top factors, Action. Use the six canonical rows verbatim. Risk cell: colored text — `.cs-tag--wine` style for ≥0.5, `--mute` for <0.3, `--brass`/plain for mid. Action cell: a `.cs-btn--ghost` "→ win-back journey" linking `journeys.html#journey-step-1` for at-risk rows; "—" for low-risk.

- `<section id="factors">`: `.sec-label` "Why — one member", a `.cs-panel` for **Dana Whitfield**: the risk 0.71 broken into weighted contributions as a small horizontal bar list (mono labels + bar widths): "No cellar-door visit in 18 mo — 0.28", "Last 2 allocations set to hold — 0.22", "Email opens down 40% — 0.14", "Tenure & spend (protective) — −0.09", baseline. A line: "The model explains the score in the platform's own events — visits, allocation choices, opens — not a black-box number."

- `<section id="how">`: 3 bullets — the score is retrained weekly on the winery's own history; "hold" and "skip" allocation events are the strongest early signal; a member exits the at-risk list automatically once they re-engage, so the marketer isn't chasing stale flags. Plus a `.callout` linking `segments.html` — "At-risk members are just a segment; anything that consumes a segment can use them."

- Footer.

- [ ] **Step 2: Verify** — balance check, serve, screenshot the scores table + the factors panel. Confirm the wide table scrolls cleanly on narrow width, risk colors read, the factor bars render. One fix pass.

- [ ] **Step 3: Commit** ("Add Chateau Salerno prototype: churn & LTV prediction").

---

### Task 5: Demo — Tasting-note & product-copy generation

**Files:**
- Create: `showcase/chateau-salerno/copy.html`

**Interfaces:**
- Consumes: Task 1 classes + chrome. Nav `copy.html` `aria-current`.

- [ ] **Step 1: Build the page**

Head/title "Chateau Salerno — Tasting notes & product copy". Body: header (Copy `aria-current`), then:

- `.cs-hero`: eyebrow "Capability 04", h1 "The writing wineries put off.", lead — from the structured wine data already in the platform, draft the tasting note, the shop description, and the allocation email, consistently and in the winery's voice. `.cs-meta` ("From existing product fields · one voice across every channel · winemaker edits, doesn't write from scratch").

- `<section id="input">`: `.sec-label` "The wine", a `.cs-panel` with a `.reg` table of the `PN-B7-22` structured fields (Field / Value): Wine, Vintage, Appellation, Block, Cases, Oak, Harvest date, Vintage character — use the canon. A `.cs-field` row of static controls as `.cs-tag`s: "Voice: Kestrel Ridge", "Length: standard", "Channels: 3". `.cs-btn--primary` "Draft copy".

- `<section id="output">`: `.sec-label` "Drafts", `<span class="mock-badge">Pre-generated</span>`, three `.cs-panel`s:
  1. **Tasting note** (~55 words) — place and season first ("The east shoulder of the ridge ripens a week behind everything else…"), structure without a "notes of" list, ends on food or a cellar window. In Kestrel Ridge's voice.
  2. **Shop description** (~90 words) — same wine, buyer-facing, a little more context on the block and the 180-case scarcity, a line on the vintage, a clear close. No purple prose.
  3. **Allocation email** — subject "Block 7 is 180 cases this year" + a 70-word body for Falconer members: what it is, why it's small this vintage, the allocation link, the reply-to-adjust line.
  Each panel has a `.cs-btn--ghost` "regenerate" and "edit" (non-functional) and a `--mute` line noting the word count and that it reuses the winery's past phrasings.

- `<section id="consistency">`: `.sec-label` "Why it's worth it", a `.cs-panel` showing the *same wine* rendered for two other surfaces (a 12-word POS shelf-talker and a 1-line SMS) to make the "one voice everywhere" point, then 3 bullets — trained on the winery's own back catalogue of notes; structured fields in means no hallucinated appellation or oak regime; every draft is a draft — the winemaker's edit is the point, the blank page was the problem.

- Footer.

- [ ] **Step 2: Verify** — balance check, serve, screenshot the three drafts. Confirm they read as one voice, word-count lines present, `.mock-badge` visible. One fix pass.

- [ ] **Step 3: Commit** ("Add Chateau Salerno prototype: tasting notes & product copy").

---

### Task 6: Prototype Shelfmark docs (category + subcategories + 5 docs)

**Files:**
- No repo files. Shelfmark writes via `Artifact` `write_db`, artifact URL `https://claude.ai/code/artifact/99194861-1d96-4c87-ac9f-63c5c23b1829`.

**Interfaces:**
- Consumes: the four demo URLs (`https://ericthebigsal.github.io/ai-consultants/showcase/chateau-salerno/<demo>.html`).
- Produces: the `Chateau Salerno` category and its `Prototype` subcategory id (`sub-chs-pro`) that Tasks 7–8 also depend on (they need the sibling `sub-chs-bus`, `sub-chs-sow`).

- [ ] **Step 1: Read current folders**

`Artifact` `read_db`, `db_op:"query"`, `collection:"folders"`. Confirm `cat-chs` does not already exist. (If a prior wipe removed the standard tree, recreate per repo history first — see README's Shelfmark section.)

- [ ] **Step 2: Create the category and three subcategories**

`Artifact` `write_db`, `db_op:"batch"`, `collection:"folders"`:
```
set cat-chs         { code:"CHA", name:"Chateau Salerno",  parentId:null,      position:4 }
set sub-chs-bus     { code:"BUS", name:"Business Case",     parentId:"cat-chs", position:0 }
set sub-chs-sow     { code:"SOW", name:"SOW",               parentId:"cat-chs", position:1 }
set sub-chs-pro     { code:"PRO", name:"Prototype",         parentId:"cat-chs", position:2 }
```
(position 4 puts the category after Operations. If `read_db` shows a different max category position, use max+1.)

- [ ] **Step 3: Write the Prototype overview doc**

`doc_id` `doc-chs-pro-<base36>`, `folderId:"sub-chs-pro"`, title **"Prototype — What's Included"**, body (Shelfmark HTML: `p`, `h2`, `ul`/`ol`, `table-wrap`/`table`, `callout`, `code`):
- Intro: the four capability prototypes, what they demonstrate, what's real vs. pre-generated.
- A `table-wrap` table: Capability | Demo link | What a build produces.
- A `callout` (label "Note"): all four are clickable prototypes with pre-generated content for a fixed set of Kestrel Ridge inputs; the interface and flows are representative, nothing calls a model.
- Links to all four demo URLs.

- [ ] **Step 4: Write the four capability docs**

One `doc-chs-pro-<base36>` each, `folderId:"sub-chs-pro"`, titles:
- **"Prototype — Natural-Language Segments"**
- **"Prototype — Campaign & Journey Drafting"**
- **"Prototype — Churn & LTV Prediction"**
- **"Prototype — Tasting Notes & Product Copy"**

Each body follows the Create / Enhance / Accelerate / Maintain template already used in the Design and Operations Shelfmark docs:
- 1-para "the situation we're modernizing".
- `callout` (label "Demo") linking the live prototype URL.
- `table` — Mode | What AI does (Create/Enhance/Accelerate/Maintain rows).
- `h2` "The workflow (tool-agnostic)" — an `ol`.
- `h2` "What stays human" — a `ul`.
- `h2` "What Chateau Salerno's customers get".
- `callout` "Honest limit".

Content is drawn from the matching demo page's "In a build" / "Why it's worth it" section plus the domain vocabulary. Do not name Commerce7.

- [ ] **Step 5: Verify**

`Artifact` `read_db` `query` on `collection:"documents"` filtered to `folderId == "sub-chs-pro"`; confirm 5 docs. Open the artifact in the browser, confirm the sidebar shows `Chateau Salerno` with `Prototype` count 5 (per the known iframe limitation, verify via the count, not by clicking in).

- [ ] **Step 6: Commit** — no repo changes; skip (folder/doc state is in Shelfmark). Note completion in the plan checkboxes.

---

### Task 7: Business Case (Shelfmark doc)

**Files:**
- Shelfmark only. `folderId:"sub-chs-bus"` (from Task 6).

**Interfaces:**
- Consumes: `sub-chs-bus` folder id.

- [ ] **Step 1: Write the doc**

`doc_id` `doc-chs-bus-<base36>`, title **"The Case for AI Modernization"**, Shelfmark HTML body:
- **Intro** — one paragraph: Chateau Salerno has a strong platform and a modernization decision to make.
- `h2` **Where the platform is** — strong core (segmentation engine, journey automation, club/allocation, cellar-door POS, storefront); the gap is interface and the AI-shaped capabilities customers now expect. A `table`: Strength | Current limit.
- `h2` **The pressure** — `ul`: winery DTC is the margin engine and it's under attention; winery operators increasingly benchmark against Klaviyo/Shopify-grade tooling they use elsewhere; whichever winery platform ships language-driven segmentation and AI drafting first resets the category's expectations; the modernization backlog compounds while unaddressed.
- `h2` **What the four capabilities are worth** — a `table`: Capability | Primary effect | Illustrative annual impact (flag the column header "illustrative"). Effects framed as: churn reduction (retention), ARPU (upsell via better journeys), sales-cycle (demo-ability in Chateau Salerno's own sales), support-load (fewer "how do I build this segment" tickets).
- `h2` **Cost of inaction** — `ul`: customer churn to a modernizing competitor; downward price pressure as the platform looks dated; an ever-larger and riskier rebuild later; sales team without a differentiated story.
- `h2` **Recommendation** — a phased program (Phase 0 + four capability phases), an illustrative total investment range (flagged), and the shape of return (retention first, ARPU and sales-cycle following). Point to the SOW for scope and structure.
- `callout` (label "Note"): figures are illustrative, sized to make the decision legible, not quoted.

- [ ] **Step 2: Verify** — `read_db` confirms the doc in `sub-chs-bus`; sidebar count for `Business Case` = 1.

- [ ] **Step 3: Commit** — Shelfmark only; skip repo commit.

---

### Task 8: Statement of Work (Shelfmark doc)

**Files:**
- Shelfmark only. `folderId:"sub-chs-sow"`.

- [ ] **Step 1: Write the doc**

`doc_id` `doc-chs-sow-<base36>`, title **"Statement of Work — AI Capability Program"**, Shelfmark HTML body:
- **Intro** — parties (AI Consultants and Chateau Salerno), the program in one sentence, the period (illustrative).
- `h2` **Scope** — the four capabilities, and for each, the platform-modernization work it forces: a stable API surface, a data-model touch, and an eval suite. A `table`: Capability | Also delivers.
- `h2` **Approach** — runs on the AI Consultants delivery framework (Business Requirements → UX → Functional Spec → Architecture → Test Plan → Test-First Development → Deployment → Maintenance, looping); reference *Delivery Framework — Core Skills Loop* (`ENG.ARC.J3JXC`). Phase 0 is discovery + assessment; Phases 1–4 are one capability each, each shipping to production behind a flag with its eval suite live before cutover.
- `h2` **Deliverables by phase** — an `ol` or `table`: Phase | Deliverable | Definition of done. Phase 0: current-state assessment, the prioritized capability order, the eval-harness design, the phase plan. Phases 1–4 each: the capability in production behind a flag, its API, its eval suite in CI, its docs, an enablement session, and a decision memo on rollout.
- `h2` **Team & roles** — the two AI Consultants founders (lead + build), plus one embedded Chateau Salerno engineer per phase (per the Engagement page's team-model note). A `table`: Role | Party | Commitment.
- `h2` **Timeline** — illustrative: Phase 0 ~3 weeks, each capability phase ~4–5 weeks, ~2 quarters total; phases can overlap at the seams.
- `h2` **Assumptions** — `ul`: access to a staging environment with representative data; one named Chateau Salerno owner empowered to make scope calls; the embedded engineer is available as scheduled; model-provider choice is Chateau Salerno's, made in Phase 0.
- `h2` **Out of scope** — `ul`: net-new platform features beyond the four capabilities; data migration; a full design-system rebuild (a targeted modernization of the touched surfaces only); ongoing managed operation past the enablement handoff (available separately).
- `h2` **Commercials** — a `callout` (label "Illustrative"): fee structure shown as a shape (Phase 0 fixed fee; capability phases fixed-fee per phase; optional post-handoff retainer) with illustrative ranges, explicitly not a quote — AI Consultants' pricing model is still being set.
- `h2` **Acceptance** — each phase is accepted when its definition-of-done items are met and the enablement session is complete.

- [ ] **Step 2: Verify** — `read_db` confirms the doc in `sub-chs-sow`; sidebar count for `SOW` = 1. Scan the rendered body for any occurrence of "Commerce7" — there must be none.

- [ ] **Step 3: Commit** — Shelfmark only; skip repo commit.

---

### Task 9: README + final wiring

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update the README**

In the "Showcase" section, add a `showcase/chateau-salerno/` subsection listing the 5 pages (landing + 4 demos) and the stylesheet, with a one-line description each and the fictional-layering note (Chateau Salerno = the pitched SaaS company; Kestrel Ridge = the sample winery).

In the "Shelfmark mirror" table, add 8 rows: `Chateau Salerno → Business Case` (`CHA.BUS.<code>`), `→ SOW` (`CHA.SOW.<code>`), `→ Prototype` ×6 (overview + 4 capability docs + note the build spec is separately under Product → Feature Specs). Use the actual codes from Tasks 6–8.

Add the plan path to the docs list: `docs/plans/2026-09-05-chateau-salerno-poc.md`.

- [ ] **Step 2: Verify** — `curl` each of the 5 live demo URLs for HTTP 200 after the Pages rebuild; grep one demo for a known string.

- [ ] **Step 3: Commit**

```bash
git add README.md docs/plans/2026-09-05-chateau-salerno-poc.md
git commit -m "$(printf 'Document Chateau Salerno POC (showcase + Shelfmark)\n\nCo-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01Mst2XictbufczjX36JNBQM')"
git push
```

---

## Self-Review

**1. Spec coverage:**
- Fictional layering (AI Consultants / Chateau Salerno / Kestrel Ridge) → Global Constraints + sample-data canon + Task 1 landing + Task 9 README. ✓
- Commerce7 reference-model, never named client-facing → Global Constraints; Task 8 Step 2 greps for it. ✓
- Deliverable 1 Business Case → Task 7 (all spec bullets mapped: platform state, market pressure, capability value, cost of inaction, recommendation). ✓
- Deliverable 2 SOW → Task 8 (scope, approach on the framework, deliverables by phase, team & roles, timeline, assumptions, out-of-scope, commercials — all mapped). ✓
- Deliverable 3 Prototype: 4 demos + overview → Tasks 2–5 (demos) + Task 6 (overview + 4 capability docs). ✓
- Visual identity (bordeaux/parchment/vine/brass, serif display + grotesk body, anti-cliché guard, single light theme) → Task 1 Step 1 + Global Constraints. ✓
- Shelfmark structure (category CHA, subs BUS/SOW/PRO) → Task 6 Step 2. ✓
- Repo layout `showcase/chateau-salerno/` → all tasks. ✓
- Build order (stylesheet+landing → 4 demos → prototype docs → business case + SOW → README) → Tasks 1–9 in sequence. ✓
- Out of scope (no live model, no real data, illustrative pricing, no HTML versions of Business Case/SOW) → Global Constraints + Task 6/7/8 bodies. ✓

**2. Placeholder scan:** No "TBD"/"TODO"/"implement later". Demo content is specified to the section and word-count level; Shelfmark doc bodies are specified to the heading + bullet level with content sourced from the demos and the canon (acceptable for prose deliverables — the writer has the substance). Sample data is given verbatim. No "similar to Task N" — each demo task restates its structure.

**3. Type/name consistency:** Class names (`.cs-panel`, `.cs-btn--primary`, `.reg.wide`, `.mock-badge`, `.cs-tag--wine`) defined in Task 1 and used consistently in Tasks 2–5. Folder ids (`cat-chs`, `sub-chs-bus`, `sub-chs-sow`, `sub-chs-pro`) defined in Task 6 and referenced by Tasks 7–8 and the README. Demo filenames (`segments.html`, `journeys.html`, `retention.html`, `copy.html`, `index.html`) consistent across the nav block, cross-links (`journeys.html#journey-step-1` produced in Task 3, consumed in Task 4), and the Shelfmark doc links. Category code `CHA` consistent (name "Chateau Salerno", code per first-3-letters rule).
