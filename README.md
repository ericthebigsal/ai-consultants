# ai-consultants

**Internal working draft.** This is the two founders' working definition of an AI-in-software
consultancy — not a client-facing site yet. Every page carries a draft banner; anything tagged
`TBD`, `Proposed`, or `Open` is a decision we still owe ourselves. The running list lives on
[Engagement → open questions](https://ericthebigsal.github.io/ai-consultants/engagement.html#open-questions).

## Site

Hosted via GitHub Pages: <https://ericthebigsal.github.io/ai-consultants/>

| Page | Content |
|---|---|
| `index.html` | Home — thesis, why now, the five pillars at a glance |
| `services.html` | The five pillars, each to a fixed template |
| `flywheel.html` | How engaging one pillar surfaces the next — the five-pillar value loop |
| `problem-space.html` | Discovery question set + fit rubric |
| `principles.html` | Proposed point of view on judicious AI use |
| `framework.html` | The 10 core delivery skills as an 8-stage loop (with input/output contracts) plus 2 cross-cutting skills — also the methodology behind Pillar 05 |
| `engagement.html` | End-to-end engagement flow + the master open-questions list |
| `resources/web-search-apis-for-mcp.html` | Standalone reference doc (moved from the site root) |
| `assets/styles.css`, `assets/site.js` | Shared design system + theme toggle, used by every page |

### Showcase — client-facing capability samples

`showcase/` holds illustrative assets built for **fictional** clients, disclaimed as samples on
every page, each with its own visual identity (distinct from the internal-draft site).
`showcase/index.html` is the portfolio landing that ties the two engagements together (AI
Consultants identity, no draft banner).

**Northwind Analytics** — a fictional data-analytics SaaS; how we'd use AI on a design + ops
engagement. Petrol / chalk / Bricolage Grotesque.

| Page | Content |
|---|---|
| `showcase/design-system.html` | Northwind's token system, component specs, governance — with margin notes marking each AI pass and the human decision |
| `showcase/brand-guidelines.html` | Northwind's wordmark, color meaning, voice principles with worked do/avoid examples |
| `showcase/process.html` | The five-stage AI-augmented design process as an AI-lane / human-lane swimlane |
| `showcase/security.html` | Northwind's AI governance register, controls, risk register, and framework crosswalk |
| `showcase/vendors.html` | Northwind's AI vendor register, a head-to-head scorecard, exit readiness, and renewal watch |
| `showcase/migration.html` | The executed consolidation — three teams moved off two vendors onto the golden provider, workflow by workflow, cutover order, decommission checklist, before/after |
| `showcase/assets/northwind.css` | The Northwind design system (the demos are the system in use) |

**Chateau Salerno** — a fictional winery-commerce SaaS (marketing platform for small wineries),
modeled on a Commerce7-class product. A Pillar 01 → 05 engagement, end to end: an opportunity
map scores twelve candidate AI applications and ranks four, then a Business Case + SOW (Shelfmark)
argue and sequence the build, then four clickable capability prototypes show the result — all
around a sample winery, Kestrel Ridge Vineyards. Bordeaux / parchment / Newsreader. Build spec:
`PRD.SPC.0HDIM`; plan: `docs/plans/2026-09-05-chateau-salerno-poc.md`.

| Page | Content |
|---|---|
| `showcase/chateau-salerno/opportunities.html` | The Pillar 01 opportunity map — 12 candidates scored on effort/risk/customer value, 4 ranked in, 7 cut, the recommended first move |
| `showcase/chateau-salerno/index.html` | Engagement overview — where the four came from, what's real vs. pre-generated |
| `showcase/chateau-salerno/segments.html` | Plain-English audience → resolved, editable segment (filter tree, count, sample) |
| `showcase/chateau-salerno/journeys.html` | A goal → a 5-step email + SMS journey with branch logic, copy in the winery's voice |
| `showcase/chateau-salerno/retention.html` | Club members scored on churn risk + predicted value, with per-member factor breakdown |
| `showcase/chateau-salerno/copy.html` | Structured wine data → tasting note, shop description, allocation email, one voice |
| `showcase/chateau-salerno/assets/chateau-salerno.css` | The Chateau Salerno prototype design system |

**APlusTechBros** — a fictional SaaS martech platform that shipped AI into 8 features and never
checked the bill (~$182k/mo, no attribution, no evals). A remediation engagement: Business Case
+ SOW (Shelfmark) plus four analysis dashboards. Electric indigo / Archivo / a before→after
ledger row as the signature. Build spec: `PRD.SPC.4LDLE`.

| Page | Content |
|---|---|
| `showcase/aplustechbros/index.html` | Prototype landing — the four analyses, illustrative-figures framing |
| `showcase/aplustechbros/audit.html` | The AI bill by feature / model / cost-per-outcome, ~$108k/mo of waste named |
| `showcase/aplustechbros/routing.html` | Each feature routed to the right model tier — $182k → ~$74k/mo, gateway config |
| `showcase/aplustechbros/evals.html` | Per-feature win rate vs. a deterministic baseline; 6 keep, 2 cut |
| `showcase/aplustechbros/prompts.html` | One prompt 4,240 → 680 tokens, quality held; a 6-call panel collapsed to 1 |
| `showcase/aplustechbros/assets/aplustechbros.css` | The APlusTechBros prototype identity |

**Fieldwork** — a fictional company building a survey platform that uses Claude Code across the
SDLC to compress its requirements-to-deployed-feature cycle (~4 weeks → ~1.7, all six review
gates kept). Business Case + SOW (Shelfmark) plus four demos. Spruce green / ochre gate markers
/ Instrument Sans. Build spec: `PRD.SPC.5CIBG`.

| Page | Content |
|---|---|
| `showcase/fieldwork/index.html` | Prototype landing — the four parts, illustrative-figures framing |
| `showcase/fieldwork/cycle.html` | Each SDLC stage timed before/after Claude Code, with the drafting/deciding split |
| `showcase/fieldwork/feature.html` | Response quotas per segment, from a one-paragraph requirement to a merged PR |
| `showcase/fieldwork/setup.html` | The CLAUDE.md, skills, subagents, MCP servers, hooks, slash commands for the repo |
| `showcase/fieldwork/guardrails.html` | Six human gates, TDD rule, CI checks, and what Claude Code can't touch |
| `showcase/fieldwork/assets/fieldwork.css` | The Fieldwork prototype identity |

## Shelfmark (docs dashboard) mirror

Every page on this site is mirrored into Shelfmark as a standalone reference, alongside the
design artifacts:

| Shelfmark location | Document |
|---|---|
| Product → Roadmap & Strategy `PRD.ROA.JAE56` | Company Thesis — Why Now (Home) |
| Product → Roadmap & Strategy `PRD.ROA.JAE57` | Service Offering — Five Pillars (Services) |
| Product → Roadmap & Strategy `PRD.ROA.SIMWZ` | The Value Flywheel (Flywheel) |
| Product → Roadmap & Strategy `PRD.ROA.JAE58` | Delivery Principles — Judicious AI Use (Principles) |
| Product → Roadmap & Strategy `PRD.ROA.JAE59` | Engagement Model & Open Decisions (Engagement) |
| Product → Research `PRD.RES.JAE5A` | Discovery Framework — Problem Space & Fit (Problem space) |
| Product → Feature Specs `PRD.SPC.GNB86` | Consultancy Site — Design Spec |
| Engineering → Architecture `ENG.ARC.J3JXC` | Delivery Framework — Core Skills Loop (Framework) |
| Engineering → API Reference `ENG.API.JAE5B` | Web Search APIs for MCP (resources/) |
| Design → Design System `DSN.SYS.I5706` | AI-Augmented Design Systems (→ showcase/design-system.html) |
| Design → Brand Guidelines `DSN.BRD.I5707` | AI-Augmented Brand Guidelines (→ showcase/brand-guidelines.html) |
| Design → Process `DSN.PRC.I5708` | The AI-Augmented Design Process (→ showcase/process.html) |
| Operations → Security & Compliance `OPS.SEC.K5L9H` | AI-Augmented Security & Compliance (→ showcase/security.html) |
| Operations → Vendor Management `OPS.VEN.K5L9I` | AI-Augmented Vendor Management (→ showcase/vendors.html) |
| Product → Feature Specs `PRD.SPC.0HDIM` | Chateau Salerno POC — Build Spec |
| Chateau Salerno → Business Case `CHA.BUS.1HBXH` | The Case for AI Modernization |
| Chateau Salerno → SOW `CHA.SOW.1HBXI` | Statement of Work — AI Capability Program |
| Chateau Salerno → Prototype `CHA.PRO.6EGGM` | Prototype — Opportunity Map (→ opportunities.html) |
| Chateau Salerno → Prototype `CHA.PRO.1EYKH` | Prototype — What's Included (overview) |
| Chateau Salerno → Prototype `CHA.PRO.1EYKI` | Prototype — Natural-Language Segments (→ segments.html) |
| Chateau Salerno → Prototype `CHA.PRO.1EYKJ` | Prototype — Campaign & Journey Drafting (→ journeys.html) |
| Chateau Salerno → Prototype `CHA.PRO.1EYKK` | Prototype — Churn & LTV Prediction (→ retention.html) |
| Chateau Salerno → Prototype `CHA.PRO.1EYKL` | Prototype — Tasting Notes & Product Copy (→ copy.html) |
| Product → Feature Specs `PRD.SPC.4LDLE` | APlusTechBros POC — Build Spec |
| APlusTechBros → Business Case `APL.BUS.4WGQ1` | The Cost of Undisciplined AI |
| APlusTechBros → SOW `APL.SOW.4WGQ2` | Statement of Work — AI Efficiency Program |
| APlusTechBros → Prototype `APL.PRO.4WGPW` | Prototype — What's Included (overview) |
| APlusTechBros → Prototype `APL.PRO.4WGPX` | Prototype — Cost & Usage Audit (→ audit.html) |
| APlusTechBros → Prototype `APL.PRO.4WGPY` | Prototype — Model Routing (→ routing.html) |
| APlusTechBros → Prototype `APL.PRO.4WGPZ` | Prototype — Eval Harness (→ evals.html) |
| APlusTechBros → Prototype `APL.PRO.4WGQ0` | Prototype — Prompt & Call Diet (→ prompts.html) |
| Product → Feature Specs `PRD.SPC.5CIBG` | Fieldwork POC — Build Spec |
| Fieldwork → Business Case `FIE.BUS.5N34S` | Cycle Time Is the Constraint |
| Fieldwork → SOW `FIE.SOW.5N34T` | Statement of Work — Claude Code in the SDLC |
| Fieldwork → Prototype `FIE.PRO.5N34N` | Prototype — What's Included (overview) |
| Fieldwork → Prototype `FIE.PRO.5N34O` | Prototype — The Cycle, Before & After (→ cycle.html) |
| Fieldwork → Prototype `FIE.PRO.5N34P` | Prototype — A Feature, End to End (→ feature.html) |
| Fieldwork → Prototype `FIE.PRO.5N34Q` | Prototype — The Claude Code Setup (→ setup.html) |
| Fieldwork → Prototype `FIE.PRO.5N34R` | Prototype — The Guardrails (→ guardrails.html) |

The GitHub Pages site is the canonical, fuller version of each; Shelfmark holds a condensed
reference that links back to it.

## Other docs

| Doc | Summary |
|---|---|
| [research/web-search-apis-for-mcp.md](research/web-search-apis-for-mcp.md) | Markdown mirror of the resources page — comparison of 15 web-search / answer APIs with MCP support. |
| [docs/plans/2026-09-05-chateau-salerno-poc.md](docs/plans/2026-09-05-chateau-salerno-poc.md) | Implementation plan for the Chateau Salerno POC package (executed). |

## Local preview

No build step — plain HTML/CSS/JS. From the repo root:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Status

Active. Structure and first-draft content in place; see the open-questions list for what's
still undecided.
