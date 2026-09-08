# ai-consultants

**Internal working draft.** This is the two founders' working definition of an AI-in-software
consultancy — not a client-facing site yet. Every page carries a draft banner; anything tagged
`TBD`, `Proposed`, or `Open` is a decision we still owe ourselves. The running list lives on
[Engagement → open questions](https://ericthebigsal.github.io/ai-consultants/engagement.html#open-questions).

## Site

Hosted via GitHub Pages: <https://ericthebigsal.github.io/ai-consultants/>

| Page | Content |
|---|---|
| `index.html` | Home — thesis, why now, the eight pillars at a glance |
| `services.html` | The eight pillars (five journey + three cross-cutting), each to a fixed template |
| `flywheel.html` | How engaging one journey pillar surfaces the next — the five-pillar value loop, plus the three cross-cutting pillars that run across it |
| `problem-space.html` | Discovery question set + fit rubric |
| `principles.html` | Proposed point of view on judicious AI use |
| `framework.html` | The 10 core delivery skills as an 8-stage loop (with input/output contracts) plus 2 cross-cutting skills — also the methodology behind Pillar 05 |
| `engagement.html` | End-to-end engagement flow + the master open-questions list |
| `founders.html` | The two founders — bios (Eric now, Mark's is a stub), and an honest note that the firm is new and its first clients would be founding clients |
| `resources/web-search-apis-for-mcp.html` | Standalone reference doc (moved from the site root) |
| `assets/styles.css`, `assets/site.js` | Shared design system + theme toggle, used by every page |

### Showcase — client-facing capability samples

`showcase/` holds illustrative assets built for **fictional** clients, disclaimed as samples on
every page, each with its own visual identity (distinct from the internal-draft site).
`showcase/index.html` is the "Worked examples" landing — framed explicitly as demonstrations of
method, not client case studies, since the firm has no clients yet (AI Consultants identity, no
draft banner).

**Northwind Analytics** — a fictional data-analytics SaaS whose design layer accreted across
teams and whose AI adoption ran ahead of governance and cost control. A design + AI-ops
engagement in two workstreams: systematize the design system, then bring governance (Pillar 07)
and vendor spend (Pillar 04) under control. A Business Case + SOW (Shelfmark) plus the 6-page
prototype. Petrol / chalk / Bricolage Grotesque; "AI pass / Human kept" margin notes. Build
spec: `PRD.SPC.FZ0N8`.

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

**Parley** — a fictional customer-support platform where three teams shipped six AI features
in eighteen months with no shared standard (two good, one a customer-facing liability, none
with an eval). The Pillar 02 engagement: audit every AI surface, write a production bar into
code review, sort each feature keep / harden / retire, harden one all the way. A Business Case
+ SOW (Shelfmark) plus the 6-page prototype. Cool slate / Space Grotesk / a rotated inspection
stamp. Build spec: `PRD.SPC.8JEPE`; plan: `docs/plans/2026-09-06-parley-pillar-02-showcase.md`.

| Page | Content |
|---|---|
| `showcase/parley/index.html` | Engagement landing — the six features, the situation, the four deliverables + worked example |
| `showcase/parley/inventory.html` | Every AI surface: output destination, eval, human-in-loop, owner, last reviewed |
| `showcase/parley/bar.html` | Five production-bar rules, each with a pass and a fail from the six shipped features |
| `showcase/parley/triage.html` | Keep / harden / retire on each feature, the reason, and what acting on it costs |
| `showcase/parley/hardened.html` | The answer bot demo→dependency — failure-mode catalogue, retrofitted eval, guardrails, before/after |
| `showcase/parley/enablement.html` | CI eval gate, PR review checklist, pattern library, the quarterly re-check |
| `showcase/parley/assets/parley.css` | The Parley prototype identity |

## Shelfmark (docs dashboard) mirror

Every page on this site is mirrored into Shelfmark as a standalone reference, alongside the
design artifacts:

| Shelfmark location | Document |
|---|---|
| Product → Roadmap & Strategy `PRD.ROA.JAE56` | Company Thesis — Why Now (Home) |
| Product → Roadmap & Strategy `PRD.ROA.JAE57` | Service Offering — Eight Pillars (Services) |
| Product → Roadmap & Strategy `PRD.ROA.SIMWZ` | The Value Flywheel (Flywheel) |
| Product → Roadmap & Strategy `PRD.ROA.JAE58` | Delivery Principles — Judicious AI Use (Principles) |
| Product → Roadmap & Strategy `PRD.ROA.JAE59` | Engagement Model & Open Decisions (Engagement) |
| Product → Research `PRD.RES.JAE5A` | Discovery Framework — Problem Space & Fit (Problem space) |
| Product → Feature Specs `PRD.SPC.GNB86` | Consultancy Site — Design Spec |
| Engineering → Architecture `ENG.ARC.J3JXC` | Delivery Framework — Core Skills Loop (Framework) |
| Engineering → API Reference `ENG.API.JAE5B` | Web Search APIs for MCP (resources/) |
| Product → Feature Specs `PRD.SPC.FZ0N8` | Northwind Analytics POC — Build Spec |
| Northwind Analytics → Business Case `NWA.BUS.FZ1F0` | Two Kinds of Drift, One Fix |
| Northwind Analytics → SOW `NWA.SOW.FZ26S` | Statement of Work — Design & AI Operations |
| Northwind Analytics → Prototype `NWA.PRO.FZ2YK` | Prototype — What's Included (overview) |
| Northwind Analytics → Prototype `NWA.PRO.I5706` | Prototype — The Design System (→ design-system.html) |
| Northwind Analytics → Prototype `NWA.PRO.I5707` | Prototype — The Brand Guide (→ brand-guidelines.html) |
| Northwind Analytics → Prototype `NWA.PRO.I5708` | Prototype — The Design Process (→ process.html) |
| Northwind Analytics → Prototype `NWA.PRO.K5L9H` | Prototype — AI Governance & Controls (→ security.html) |
| Northwind Analytics → Prototype `NWA.PRO.K5L9I` | Prototype — The AI Vendor Register (→ vendors.html) |
| Northwind Analytics → Prototype `NWA.PRO.FZ3QC` | Prototype — The Executed Migration (→ migration.html) |
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
| Product → Feature Specs `PRD.SPC.8JEPE` | Parley POC — Build Spec |
| Parley → Business Case `PAR.BUS.8JFH6` | You Can't Tell the Demos From the Dependencies |
| Parley → SOW `PAR.SOW.8JG8Y` | Statement of Work — A Production Bar for AI-Assisted Work |
| Parley → Prototype `PAR.PRO.8JH0Q` | Prototype — What's Included (overview) |
| Parley → Prototype `PAR.PRO.8JHSI` | Prototype — The AI Inventory (→ inventory.html) |
| Parley → Prototype `PAR.PRO.8JIKA` | Prototype — The Production Bar (→ bar.html) |
| Parley → Prototype `PAR.PRO.8JJC2` | Prototype — Keep / Harden / Retire (→ triage.html) |
| Parley → Prototype `PAR.PRO.8JK3U` | Prototype — The Answer Bot, Demo to Dependency (→ hardened.html) |
| Parley → Prototype `PAR.PRO.8JKVM` | Prototype — Keeping the Bar Enforced (→ enablement.html) |

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
