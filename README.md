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
| `problem-space.html` | Discovery question set + fit rubric |
| `principles.html` | Proposed point of view on judicious AI use |
| `engagement.html` | End-to-end engagement flow + the master open-questions list |
| `resources/web-search-apis-for-mcp.html` | Standalone reference doc (moved from the site root) |
| `assets/styles.css`, `assets/site.js` | Shared design system + theme toggle, used by every page |

Design spec for this structure: Shelfmark, Product → Feature Specs →
*"Consultancy Site — Design Spec"* (`PRD.SPC.GNB86`).

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
