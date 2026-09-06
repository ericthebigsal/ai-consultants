# Parley — Pillar 02 showcase (From playground to production)

**Date:** 2026-09-06
**Status:** built — 6 pages + CSS in `showcase/parley/`, wired into `showcase/index.html`
and `README.md`. Shelfmark mirror not yet done.
**Pillar:** 02 — From playground to production (`services.html#pillar-2`)

## Why

Pillar 02 has no showcase that owns it. The pieces are scattered across Northwind's
design margin notes, Northwind's governance page, and APlusTechBros's eval harness, but
nothing is squarely "your teams shipped a pile of AI features, some are liabilities, and
nobody can tell which — here is the production bar we set and how we sorted every feature
against it."

Distinct from APlusTechBros: that engagement is about **cost** (is this feature worth its
bill?). This one is about **production quality** — is it correct, safe to depend on, and
would it pass the same review as any other code? No dollar figures as the spine.

## The client

**Parley** — a customer-support platform (shared inbox + helpdesk + help center for
product teams). Over ~18 months, three teams shipped six AI features with no shared
standard.

| # | Feature | Owner team | Output goes | Verdict |
|---|---|---|---|---|
| 1 | Ticket triage — category, priority, queue routing | Support Platform | changes ticket state | keep |
| 2 | Suggested replies — drafts a response for the agent | Support Platform | agent-edited draft | harden |
| 3 | Macro suggestions — recommends a saved reply | Support Platform | one-click insert | retire |
| 4 | Answer bot — answers the customer directly from the help center | Growth | customer-facing, no human | harden (deep-dive) |
| 5 | Conversation summary — TL;DR on long tickets + handoffs | Agent Experience | internal only | keep |
| 6 | Sentiment flagging — marks at-risk conversations for a manager | Agent Experience | internal signal | retire |

Verdict reasons:
- **Ticket triage — keep.** Already near the bar; add the eval and it's done.
- **Conversation summary — keep.** Internal-only, high quality, low blast radius.
- **Suggested replies — harden.** Good, but asserts facts with no grounding check and no eval.
- **Answer bot — harden.** Valuable but a liability now — ~1 in 12 answers has an
  unsupported claim, no eval, no confidence gate, straight to 100% of traffic.
- **Macro suggestions — retire.** Wrong ~15% of the time, adds a click, agents ignore it —
  measurably negative value.
- **Sentiment flagging — retire.** False-negative rate makes it worse than the keyword
  rule it replaced; rebuild later if it earns it.

All figures invented; illustrative sample, disclaimed on every page.

## Pages — `showcase/parley/`

1. **`index.html`** — landing. Six features, the situation in the client's words, the four
   deliverables, how to read it (illustrative; pre-generated outputs marked).
2. **`inventory.html`** — *Where AI reaches a customer or a decision.* Register: feature,
   owner, where output goes, has an eval? (no ×5, partial ×1), human in the loop?, last
   reviewed. Beat: can't hold anything to a bar until you can see everything it applies to.
3. **`bar.html`** — *The production bar.* Written standard, folded into Parley's existing
   PR review. Five rules, each with rationale + a pass/fail example from the six features:
   grounded-or-labelled; evaluated-before-merge; human-gate-on-action; logged-and-attributable;
   owned.
4. **`triage.html`** — *Keep, harden, retire.* Six features sorted against the bar —
   verdict, reason, what acting on it costs. Closes with what happens to the two being
   retired (fallbacks, comms, door left open).
5. **`hardened.html`** — *The answer bot, demo to dependency.* Deep-dive (spec below).
6. **`enablement.html`** — *Keeping the bar enforced.* CI eval gate, review checklist in
   the PR template, a short pattern library (grounding, confidence-gating, refusal
   handling) from Parley's own code, the "trained against your codebase" half-day, the
   quarterly re-check against real traffic. Ends on the handover callout.

Each content page carries a "drafted by AI / signed by a person" margin note
(`pass-note`: `drafted` / `decided`), the way Northwind threads its AI-pass notes.

## `hardened.html` deep-dive spec

1. **As it shipped.** Growth hackathon win; retrieves from the help center, answers the
   customer directly; 100% of traffic in a week; no eval, no confidence gate, no topic
   limits, no "I don't know." Deflection looked good in the launch dashboard.
2. **The failure-mode catalogue** (`pass-note`: AI drafted from 400 real bot
   conversations, a person confirmed each mode). Table: mode / frequency / example / why.
   - Unsupported claim — asserts a billing/policy specific the sources don't contain (~8.3%)
   - Stale answer — cites a superseded help article
   - Confident out-of-scope — answers legal/security/billing-dispute questions it should refuse
   - No graceful "don't know" — always answers, even at low retrieval confidence
   - Internal-macro leakage — occasionally pastes raw internal macro text into a reply
3. **The eval suite, built after the fact.** 150 real questions with graded references; an
   unsupported-claim detector (claim → source check); a refusal-appropriateness check on a
   held-out should-refuse set; retrieval hit-rate. Runs in CI, blocks merge below the bar.
   Bar: unsupported-claim rate < 1%, appropriate-refusal > 85%, deflection down no more
   than 3 points.
4. **The guardrails added.**
   - Retrieval with citation required — no source above a relevance threshold → no answer
   - Confidence gate — below threshold, hand to a human with the draft, don't send
   - Topic denylist — billing disputes, legal, security, cancellation → straight to a human
   - "No source, no answer" — replaces always-answer with a scoped "a person will follow up"
5. **Before / after** (stat strip):
   | | Before | After |
   |---|---|---|
   | Unsupported-claim rate | 8.3% | 0.6% |
   | Appropriate refusal | 12% | 89% |
   | Deflection rate | 34% | 33% |
   | CSAT on bot-handled tickets | 3.9 | 4.3 |
6. **What stayed a human call.** The confidence threshold (Growth + Support set it
   together), the denylist topics, and whether it should be customer-facing at all —
   reviewed quarterly, kept for now.

## Identity — "inspection / bench report"

`showcase/parley/assets/parley.css`, committed single light theme.

- Ground: cool pale slate `#F3F5F6` / surface `#FBFCFC`.
- Ink: `#191D21` / soft `#454B50` / mute `#727A80`. Rules `#DCE1E3` / soft `#E9EDEE`.
- Primary: steel blue `#3F5C6B` (structure, links).
- Verdict palette (low-saturation): keep `#4A6A5C` slate-green · harden `#B67514` amber ·
  retire `#9E5044` muted rust; each with a faint tint for row backgrounds.
- Type: Space Grotesk (display + body), Space Mono (labels, status, data) — Google Fonts.
- Signature device: a monospace **status stamp** in a left rail on inventory/triage/bar
  rows — `KEEP` / `HARDEN` / `RETIRE`, or `PASS` / `FAIL` on the bar's examples — bordered
  box, letter-spaced, rotated ~-2°. Form-sheet rule lines; faint spec-grid table headers.

## Wiring

- `showcase/index.html` — new section (Parley), card grid linking the six pages. Another
  agent is editing this file concurrently — re-read immediately before editing, do it last.
- `README.md` — new Parley subsection in the showcase list. Same concurrency caution.
- Shelfmark build spec `PRD.SPC.xxxxx` — follow-up, not done in this pass. Flag to user.

## Build order

1. `showcase/parley/assets/parley.css`
2. `showcase/parley/index.html`
3. `inventory.html`, `bar.html`, `triage.html`, `hardened.html`, `enablement.html`
4. Local-preview screenshot pass, link check, figure reconciliation across pages
5. Wire `showcase/index.html` + `README.md` (re-read first)

## Verification

- Every internal link resolves; nav consistent across all six pages.
- Figures reconcile page-to-page (the six verdicts, the answer-bot before/after numbers,
  the eval bar thresholds).
- Renders correctly in the Parley identity, both narrow and wide.
- Disclaimer footer on every page; "illustrative sample" tag in the header.
