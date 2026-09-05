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

The GitHub Pages site is the canonical, fuller version of each; Shelfmark holds a condensed
reference that links back to it.

## Other docs

| Doc | Summary |
|---|---|
| [research/web-search-apis-for-mcp.md](research/web-search-apis-for-mcp.md) | Markdown mirror of the resources page — comparison of 15 web-search / answer APIs with MCP support. |

## Local preview

No build step — plain HTML/CSS/JS. From the repo root:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Status

Active. Structure and first-draft content in place; see the open-questions list for what's
still undecided.
