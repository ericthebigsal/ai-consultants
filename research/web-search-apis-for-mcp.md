# Web Search APIs for MCP

**Fifteen ways to give an AI feature live web data — compared on what they return, what they
cost per thousand calls, how good the results actually are, and the contract terms that decide
whether you can ship them.**

- Compiled September 2026
- Pricing changes often — verify before committing
- Scope: production embedding in software features, not desktop assistants

Interactive version: <https://claude.ai/code/artifact/04f5b3b3-12c3-4933-9a5e-23e911e113f5>

---

## 1. The shortlist

If you only remember one row: for a generic "let this feature search the web and feed an LLM" job,
start with **Tavily** (fastest to ship) or **Parallel** (cheaper, strong benchmarks), and keep
**Brave** in reserve as an independent index. Everything else is a more specific tool.

| You want | Pick | Why |
|---|---|---|
| General web data for an AI feature / RAG | **Tavily** or **Parallel** | LLM-ready cleaned content + citations out of the box. Tavily has the biggest ecosystem and a real free tier; Parallel is ~5× cheaper at the fast tier and tops the public agent benchmarks. |
| A feature that shows a cited answer | **Perplexity Sonar** or **Exa Answer** | Returns a written answer with inline citations, not a link list. Perplexity has the best synthesis; Exa's Answer endpoint is a third of the price. |
| Semantic discovery — "find things like this" | **Exa** | Embeddings-native search plus specialised indexes for people, companies, research papers and repos. |
| Real Google SERP data (rankings, local, shopping) | **Serper** → SerpApi → DataForSEO | Serper is cheapest/fastest; SerpApi adds legal cover + many engines; DataForSEO is cheapest for bulk async jobs. |
| Search + full-page scraping in one call | **Firecrawl** | Handles JS-heavy pages and anti-bot, returns clean markdown, most widely deployed crawl-first MCP. |
| Strict privacy / EU-only / no third-party data | **Linkup** or self-hosted **SearXNG** | Linkup is EU-hosted, SOC 2, ZDR-capable and tops factuality benchmarks. SearXNG keeps every query inside your own infrastructure. |
| Already all-in on one LLM vendor | **Native web-search tool** | Anthropic, OpenAI and Google each bundle a web-search tool into their API. Least moving parts; least control. |
| Prototype / personal assistant, zero budget | **DuckDuckGo MCP** | No key, no cost. Community-maintained scraper — fine on a laptop, not in front of users. |

---

## 2. How to choose — the decision lens

"Which MCP search server" is usually the wrong first question. Work through these in order; each
one eliminates candidates.

### 1. MCP or REST?

MCP is an integration protocol for *agents* — a model in a tool-calling loop that decides when to
search. If your AI enhancement is an agent, a hosted MCP server is a clean fit. If it's a discrete
feature in a pipeline ("summarise this week's news about the customer"), call the vendor's REST API
directly — every MCP server here is a thin wrapper over the same endpoints, and the protocol hop
buys you nothing. Most vendors ship both; pick per feature, not per company.

### 2. Hosted MCP or self-run?

For anything deployed, use the vendor's **remote/hosted MCP endpoint** (Tavily, Exa, Linkup, Brave,
Perplexity, Parallel and Firecrawl all offer one) or run their server in your own infrastructure.
Do not ship `npx` stdio servers to production — they're built for a developer's laptop.

### 3. What shape of result does the feature need?

- **Raw links + snippets** — you do your own ranking / extraction. SERP proxies (Serper, SerpApi,
  DataForSEO), Brave Web, Kagi Search.
- **Cleaned page content** — markdown ready to drop into a context window. Tavily, Exa Contents,
  Firecrawl, Linkup.
- **A synthesised answer with citations** — the model has already read the pages. Perplexity Sonar,
  Exa Answer, Brave Answers, Parallel Task, native LLM tools.

### 4. Whose index is behind it?

Google (via proxies) still has the broadest recall. Brave, Exa, Mojeek and Kagi's blend run
*independent* indexes — valuable if you don't want a hard dependency on Google's or Microsoft's
terms, or you care about the privacy story. Bing's API is gone (see §7). AI-native providers
(Tavily, Linkup, Parallel) run their own crawl/retrieval layer on top of a mix of sources.

### 5. Can you legally store the results?

This kills deals late. **Brave's standard terms forbid storing results** — including caching them or
using them to train or tune a model — unless you're on a plan that explicitly grants storage rights.
Perplexity and Brave Answers require visible source attribution. SERP scrapers operate in a legal
grey zone against Google's ToS; SerpApi indemnifies you, Serper does not. Read the DPA before you
build caching.

### 6. Latency budget

Interactive, user-facing features need p95 under ~1.5 s: use the *fast / turbo / instant* tier
(Parallel Turbo ~200 ms, Exa, Brave, Tavily fast). *Deep* and *research* endpoints run 3 s to
10 minutes — background jobs only, never in a request path.

### 7. Where do the queries go?

User query text leaves your infrastructure and may contain PII. If that's a problem you need a
vendor with a DPA, SOC 2 and ideally zero-data-retention (Linkup, plus enterprise tiers of Brave,
Exa and Tavily) — or you self-host SearXNG and send nothing out.

---

## 3. Comparison matrix

Unit price is for the *interactive* search tier at low volume, normalised to USD per 1,000 requests
for up to 10 results. "Cache OK" is whether standard terms let you store results. Quality is the
SimpleQA factual-recall score where a comparable public number exists (see §4 for the heavy
caveats).

### AI-native search & answer APIs

| Provider | Result type | Index | Free tier | Unit price | Latency | SimpleQA | Official MCP | Cache OK | Best for |
|---|---|---|---|---|---|---|---|---|---|
| **Tavily** | Ranked results + clean content + optional answer | Own retrieval layer | 1,000 calls/mo | ~$8/1k basic, ~$16/1k advanced | Fast (~0.5–1.5 s) | ~72–94%* | Hosted | Yes | Drop-in agent web access, RAG |
| **Exa** | Neural results; Contents; Answer | Own embeddings index | $20 signup + $10/mo | $7/1k search, $5/1k answer | Fast (~1–1.5 s) | ~89% | Hosted | Yes | Semantic discovery, entity & paper search |
| **Linkup** | Results + content; async Research | Own + premium publisher deals | 4,000 queries | $5–6/1k | Standard 1–3 s | ~91% (deep) | Yes | Yes (ZDR) | Factual accuracy, EU data residency |
| **Perplexity Sonar** | Synthesised answer + citations | Own ranking + frontier models | $5 credit (Pro) | $5–14/1k req + $1–15/1M tok | Slow (2–10 s) | ~90%+ | Yes | Cite sources | Conversational Q&A, you want the answer |
| **Parallel** | Results; agentic Task & Responses | Own crawl/retrieval | Signup credits | $1/1k turbo, $5/1k base | Turbo ~200 ms | ~91% | Yes | Yes | Cost-efficient high-accuracy agents, Bing refugees |
| **You.com** | Web / news / research; content | Own + partners | $100 credit | ~$5–15/1k | Fast (sub-second claims) | — | Yes | Yes | Fast LLM-ready web + news blend |

### Independent index & privacy search

| Provider | Result type | Index | Free tier | Unit price | Latency | SimpleQA | Official MCP | Cache OK | Best for |
|---|---|---|---|---|---|---|---|---|---|
| **Brave Search** | Raw web results; LLM Context; Answers | Independent, 30B+ pages | $5/mo credit, then auto-bills | $5/1k web, $4/1k answers + tokens | Fast, 50 QPS | ~87% | Official + hosted | **Paid add-on** | Independent index, no Google dependency |
| **Kagi** | High-precision results; FastGPT; Summariser | Blend (Google, Brave, Mojeek, Marginalia) | None (paid account) | $15–25/1k search, $2/1k enrichment | Moderate | — (low spam) | Yes | Yes | Quality-sensitive, low-volume, summarisation |
| **DuckDuckGo** | Results (scraped HTML) | Bing-derived + own | Free, no key | $0 | Variable, rate-limited | — | Community | Grey area | Prototypes, personal assistants |

### Google / Bing SERP proxies

| Provider | Result type | Index | Free tier | Unit price | Latency | SimpleQA | Official MCP | Cache OK | Best for |
|---|---|---|---|---|---|---|---|---|---|
| **Serper** | Google SERP JSON (organic, news, images, places, scholar) | Google | 2,500 credits once | $1/1k → $0.30/1k at volume | ~1–2 s | = Google recall | Community / official-ish | Grey (Google ToS) | Cheapest fast Google data |
| **SerpApi** | SERP JSON, ~30 engines (Google, Bing, Maps, YouTube, Baidu…) | Google, Bing, others | 250 searches/mo | ~$15–25/1k (low vol), ~$9/1k at scale | ~1–3 s | = Google / Bing recall | Yes | Yes (indemnified) | Engine breadth, legal cover, Bing migration |
| **DataForSEO** | SERP JSON, async batch | Google, Bing, others | $1 trial ($50 min deposit) | $0.60/1k standard, $2/1k live | Async (queued) / live | = Google recall | Yes | Yes | Bulk SERP data, cost-sensitive, batch-tolerant |

### Crawl-first & self-hosted

| Provider | Result type | Index | Free tier | Unit price | Latency | SimpleQA | Official MCP | Cache OK | Best for |
|---|---|---|---|---|---|---|---|---|---|
| **Firecrawl** | Search + full page scrape (markdown/JSON) | Own + Google-backed search | 1,000 credits/mo | 2 credits / 10 results; ~$0.60–$3/1k pages | Slower (renders pages) | — | Yes (widely used) | Yes | Search + extraction of JS-heavy sites |
| **SearXNG (self-host)** | Aggregated results JSON from 70+ engines | Metasearch (you pick) | Free (your infra) | Infra cost only | Depends on upstreams | = aggregate | Community | Yes (self) | No third-party data leaves your infra |

### Native LLM search tools

| Provider | Result type | Index | Free tier | Unit price | Latency | SimpleQA | Official MCP | Cache OK | Best for |
|---|---|---|---|---|---|---|---|---|---|
| **Anthropic / OpenAI / Gemini** | Grounded answer + citations, inside the model API | Each vendor's partner index | Model free quotas | $10–35/1k + token cost | Adds 1–5 s to generation | — | N/A (built-in tool) | Per model vendor | Minimal moving parts if already on that model |

\* Tavily's SimpleQA number varies widely by config and by who ran the test — see §4.

---

## 4. Result quality — what the benchmarks say, and what they don't

There are two different things people mean by "search quality," and they rank providers
differently.

**Index quality** — recall, freshness, spam resistance. Google (through a proxy) still wins on raw
recall and long-tail coverage. Kagi is the standout for precision and low SEO spam. Brave's
independent index is genuinely competitive and updates 100M+ pages a day. Exa is weakest on
breaking-news recall but unmatched for semantic long-tail ("papers arguing X," "companies that do
Y").

**Agent-task quality** — does an LLM using this tool get the right answer? This is what the public
benchmark suites (SimpleQA, FRAMES, BrowseComp, HLE, WebWalker) measure. On the *fast* tier,
Parallel, Exa and Linkup lead; SERP proxies and Tavily's ultra-fast mode trail on factual recall
but Tavily's content extraction is clean and consistent.

### SimpleQA factual recall — fast tier

Higher is better. Source: Parallel.ai's public benchmark suite, 2026, fast-tier configs.

| Provider | SimpleQA accuracy |
|---|---|
| Parallel Turbo | 91% |
| Exa Instant | 89% |
| Brave Search | 87% |
| SerpApi | 77% |
| Tavily Ultra-Fast | 72% |

> **Treat every published benchmark as marketing.** Almost all of these numbers come from a vendor
> comparing itself favourably to rivals — Parallel's suite, Linkup's "vs Tavily" pages, Exa's
> "versus" pages. Linkup reports Tavily at ~73% on the same test where Tavily's own materials cite
> ~94%. Configuration (basic vs advanced, result count, whether content extraction is on) moves the
> number 15+ points. **Run your own eval** on 50–100 queries that look like your real traffic before
> you commit — it takes an afternoon and it's the only number that matters.

### Deep / research tiers

When you can spend seconds-to-minutes and more money per query, the ranking tightens near the top:
Linkup Deep (~91% SimpleQA F-score), Parallel Core/Ultra (~91–92% on BrowseComp), and Perplexity's
agentic search all land in the same band. Exa's deep agent scores lower on these particular tests
but its cost-per-correct-answer on *discovery* tasks is different work than factual recall.
Parallel's headline claim is cost efficiency: ~$5–25 per 1,000 BrowseComp queries versus $400+ for
Perplexity and $1,000+ for Exa's max agent tier.

---

## 5. AI-native search & answer APIs

Purpose-built for feeding LLMs: they return de-boilerplated content, snippets sized for a context
window, and usually a citation list. This is the category most "add web search to our AI feature"
projects should shop in first.

### Tavily — the default agentic search API

- **Endpoints:** Search, Extract, Crawl, Map, Research. Search returns ranked results + cleaned
  content + optional short LLM answer + images.
- **Pricing:** Free 1,000 credits/mo, no card. PAYG $0.008/credit → basic search (1 cr) ~$8/1k,
  advanced (2 cr) ~$16/1k. Project ~$30/mo for 4,000 credits + higher rate limits. Growth ~$500/mo
  for 100k credits ($0.005/cr). Research calls burn 4–250 credits each.
- **MCP:** Official hosted remote MCP endpoint + npm server. One of the most widely deployed search
  MCPs.
- **Quality:** Excellent, consistent content extraction. Factual-recall benchmarks are contested
  (see §4). Advanced search + higher result counts noticeably improve answer quality.
- **Terms:** Standard terms permit caching. SOC 2; enterprise DPA and ZDR available. Acquired by
  Nebius in 2026 — more infra backing, worth watching for roadmap shifts.
- **Pick it when** you want to ship this week, you're feeding results to an LLM, and you want the
  largest community and example base to lean on. The generous free tier makes it the natural place
  to prototype.

### Exa — neural / semantic search + entity indexes

- **Endpoints:** Search (neural, keyword, or auto), Contents, Answer, Deep Search, Monitors,
  Websets (bulk enrichment), "find similar links."
- **Pricing:** $7/1k search (≤10 results), +$1/1k per extra result, Contents $1/1k per type, Answer
  $5/1k, Deep Search $12–15/1k, Monitors $15/1k. Free: $20 signup + $10/mo recurring credits.
- **MCP:** Official hosted MCP + `exa-mcp-server` npm.
- **Quality:** ~89% SimpleQA fast tier. Class-leading for semantic and long-tail retrieval;
  specialised indexes for people, companies, research papers and GitHub. Weaker on breaking news.
- **Terms:** Caching allowed; enterprise offers custom QPS, ZDR.
- **Pick it when** the feature is discovery, not lookup — "find companies/papers/people like this,"
  competitive monitoring, research aggregation. Overkill (and pricier) for plain "what happened
  today."

### Linkup — accuracy-first, EU-hosted

- **Endpoints:** Search (Fast / Standard / Deep), Fetch (URL content), Research (async, 1–10 min).
  Native **parallel search** — multiple queries concurrently in one call.
- **Pricing:** Search $0.005–0.006/req; Fetch $0.001–0.006; Research $0.25–$2.50/req. Free 4,000
  queries. $5,000 startup credits.
- **MCP:** Official MCP server.
- **Quality:** Deep tier reports the #1 SimpleQA F-score among sub-second APIs (~91%). Premium
  publisher partnerships help on paywalled sources.
- **Terms:** EU (France) hosting, SOC 2 Type II, ZDR available, IP whitelisting. The strongest
  compliance story in the AI-native group.
- **Pick it when** factual accuracy is the product and/or you have EU data-residency requirements.
  Smaller ecosystem than Tavily, so expect to write more of your own glue.

### Perplexity Sonar — answer engine, not a search engine

- **Output:** A written, cited answer — the model has already read and synthesised the sources. You
  don't get a clean link list to re-rank.
- **Models:** Sonar (cheap), Sonar Pro (best synthesis), Sonar Reasoning, plus an agentic Pro
  Search mode.
- **Pricing:** Token cost $1–$15 per 1M (model-dependent) *plus* a per-request fee of $5–$14/1k by
  context depth; agentic mode $14–$22/1k. Realistically **$0.30–$1.30+ per query**. The most
  expensive per call in this document.
- **MCP:** Official "Ask Perplexity" MCP server.
- **Terms:** ToS requires displaying the citations Perplexity returns.
- **Pick it when** the feature literally shows the user a paragraph answer with sources and you
  don't want to run your own summarisation model. Wrong choice if you need raw results for
  downstream code, tight latency, or high call volume.

### Parallel — benchmark leader, aggressive pricing

- **Endpoints:** Search API (Turbo / Base / Pro), Extract, Task API (agentic deep research, Lite →
  Ultra), Responses API, FindAll, Entity Search.
- **Pricing:** Search **$1/1k turbo** (~200 ms), $5/1k base (10 results), +$1/1k extra results.
  Task API $5/1k (lite) up to $300–$2,400/1k (ultra). Failed runs aren't billed.
- **MCP:** Official MCP server.
- **Quality:** Leads its own published suite across SimpleQA, FRAMES, BrowseComp, HLE, WebWalker —
  and, unusually, on cost-per-correct-answer for deep research.
- **Company:** Founded by former Twitter CEO Parag Agrawal; well funded. Explicitly positioned as
  the Bing Search API replacement.
- **Pick it when** cost at scale matters and you want the current benchmark front-runner. Newer
  than the others, so less community tooling — but the hosted API and MCP are production-ready and
  the price is hard to argue with.

### You.com — fast web + news blend for LLMs

- **Endpoints:** Search, News, Content, Research APIs. Markets itself on latency ("fastest web
  search API for LLMs").
- **Pricing:** $100 in free credits for new accounts; usage-based thereafter (roughly $5–$15/1k
  depending on endpoint).
- **MCP:** Available via their platform / MCP integration.
- **Notes:** Actively maintained; made a breaking change in July 2026 (removed the `authors`
  field). Fewer independent benchmarks than the leaders.
- **Consider it** as a Tavily/Brave alternative if latency benchmarks on your own traffic favour
  it. Not differentiated enough to be a default pick.

---

## 6. Independent index & privacy search

These run their own crawl and index (or a non-Google blend). Value: no hard dependency on Google's
or Microsoft's terms, and a real privacy story you can put in front of customers.

### Brave Search API — the independent index

- **Endpoints:** Web, LLM Context, Answers (grounded, with citations, OpenAI-SDK compatible),
  Image, Video, News, Suggest, Spellcheck. Goggles let you re-rank results with custom rules.
- **Index:** Fully independent — 30B+ pages, 100M+ updated daily, no profiling of users.
- **Pricing:** Web $5/1k (50 QPS); Answers $4/1k + $5/1M tokens (2 QPS). **2026 change:** the free
  tier was removed — you now get $5/mo in credits (~1,000–1,600 queries), then a saved card is
  billed automatically. Enterprise for volume + ZDR.
- **MCP:** Official `brave-search-mcp-server` + hosted. Note: there has been public debate about
  whether typical MCP/AI-inference use complies with Brave's terms.
- **Storage:** **Standard terms forbid storing results — including caching or using them to
  train/tune an LLM.** You must subscribe to a plan that explicitly grants storage rights. This is
  the single biggest gotcha in this whole document.
- **Pick it when** you want an index that isn't Google or Bing, or the privacy story is a selling
  point. Budget for the storage-rights plan if your architecture caches results or trains on them —
  and check that MCP inference use is covered for your case.

### Kagi — premium, low-spam, summarisation built in

- **Endpoints:** Search, Enrichment (supplementary non-commercial indexes — Teclis, Marginalia),
  FastGPT (quick cited answer), Universal Summarizer (page/video/PDF → summary).
- **Pricing:** Search $15–$25/1k (usage-based, invoiced monthly, no flat tiers). Enrichment $2/1k.
  Summarizer billed per document/token. No free tier; Search API access has historically been
  gated.
- **MCP:** Official `kagimcp` — exposes Search, Summarizer and FastGPT.
- **Quality:** Best-in-class precision and SEO-spam resistance; results blend Google, Brave, Mojeek
  and Marginalia with Kagi's own ranking.
- **Pick it when** result quality per query matters more than price and volume is modest — a
  research assistant, an internal tool. The bundled summariser is a genuine time-saver. Too
  expensive for high-volume user-facing search.

### DuckDuckGo — free, keyless, unofficial

- **Reality:** DDG has no general search API — only a limited Instant Answer API. Community MCP
  servers scrape the HTML/lite endpoints.
- **Pricing:** $0, no key.
- **Limits:** Aggressive rate limiting, brittle to layout changes, and scraping is against DDG's
  ToS.
- **Fine for** a local dev loop, a hobby agent, or a demo. Do not put it in a product — it will
  rate-limit you and it isn't a supported interface.

---

## 7. Google / Bing SERP proxies

When the feature needs *Google's actual results* — organic rankings, the local pack, shopping,
Scholar, "People also ask" — you need a scraping proxy. These return structured SERP JSON, not
LLM-ready content; you extract page text yourself if you need it.

> **Bing Search API is dead.** Microsoft retired all Bing Search APIs on **11 August 2025** (new
> resource creation was disabled in February 2025). The official successor is *Grounding with Bing
> Search* inside Azure AI Foundry Agent Service — but it returns grounded model answers, not SERP
> JSON, costs roughly $14–$35 per 1,000 calls, requires a full Azure AI project, and carries Bing
> display / branding requirements. It is not a drop-in replacement. Most former Bing API users
> moved to Brave, Serper, Parallel or Tavily.

### Serper — cheapest fast Google

- **Data:** Google organic, news, images, places/maps, Scholar, autocomplete, Lens. ~1–2 s.
- **Pricing:** $50/50k ($1/1k) → $375/500k ($0.75) → $1,250/2.5M ($0.50) → $3,750/12.5M ($0.30).
  2,500 free credits once; credits expire after 6 months. >10 results = 2 credits.
- **MCP:** Community and near-official MCP servers.
- **Legal:** No indemnification — you carry the ToS risk of scraped Google data.
- **Pick it when** you need Google data cheaply and fast and can live with the legal grey zone. The
  default SERP proxy for cost-sensitive projects.

### SerpApi — breadth + legal cover

- **Data:** ~30 engines: Google (all verticals), Bing, DuckDuckGo, Baidu, Yahoo, YouTube, Google
  Maps / Scholar / News / Shopping / Trends, App Store, Walmart, eBay, Home Depot…
- **Pricing:** Free 250/mo; Starter $25/1k; Developer $75/5k; up to $2,750/mo. Effective ~$15–$25/1k
  at low volume, ~$9/1k at scale. Unused searches don't roll over.
- **MCP:** Official `serpapi-mcp-server`.
- **Legal:** US "anti-scraping shield" — SerpApi assumes the legal risk of scraping. Field naming
  is closest to the retired Bing API v7, so it's the easiest Bing migration.
- **Pick it when** you need multiple search engines, want someone else holding the legal risk, or
  are porting off Bing. Pay a clear premium over Serper for those.

### DataForSEO — cheapest at bulk, async

- **Data:** SERP JSON for Google, Bing and more, inside a large SEO-data platform (keywords,
  backlinks, on-page).
- **Pricing:** $0.60/1k standard (queued/async), $1.20/1k priority, $2/1k live. $50 minimum
  deposit, $1 trial. Pay-as-you-go, no subscription.
- **MCP:** Official `dataforseo-mcp-server`.
- **Shape:** Built for batch. The cheap tier is a queue — results arrive seconds later via
  callback, not synchronously.
- **Pick it when** you're processing SERPs in bulk offline (SEO tooling, monitoring, dataset
  building) and can tolerate async. Not for interactive request paths.

---

## 8. Crawl-first & self-hosted

### Firecrawl — search fused with scraping

- **Endpoints:** Scrape, Crawl, Map, Search (results + optional full scraped content of each),
  Interact (browser actions), structured LLM extraction.
- **Pricing:** Free 1,000 credits/mo; Hobby $16/mo (5k); Standard $83/mo (100k); Growth $333/mo
  (500k); Scale $599/mo (1M). Scrape/Crawl/Map = 1 credit/page; **Search = 2 credits per 10
  results**.
- **MCP:** Official server — the most widely deployed of the crawl-first tools, wired into Claude
  Code, Cursor, Windsurf, VS Code.
- **Strength:** JS rendering and anti-bot handling. When your targets are SPAs or protected sites,
  this is where the others fall down.
- **Pick it when** the feature needs the *full text* of result pages, not just snippets, and those
  pages are JavaScript-heavy. Slower and pricier per page than snippet-only APIs — use it where
  extraction is the point.

### SearXNG / WebSearch-MCP (self-hosted) — nothing leaves your infrastructure

- **What:** Open-source metasearch aggregator. Runs in Docker, queries 70+ upstream engines,
  returns unified JSON. WebSearch-MCP packages a crawler + search stack similarly.
- **Pricing:** Free software; you pay for the compute, proxies and maintenance.
- **MCP:** Several community SearXNG MCP servers.
- **Trade-off:** Total data control and no per-query fee, but you own the operational burden: rate
  limits, CAPTCHAs, proxy rotation, and result quality that's only as good as the upstreams you can
  reach.
- **Pick it when** a policy genuinely forbids sending query text to a third party, or your volume is
  so high that running infrastructure beats per-call pricing and you have the SRE capacity for it.

---

## 9. Native LLM web-search tools

If your AI feature already calls Claude, GPT or Gemini, each of those APIs has a built-in
web-search tool — no separate vendor, contract or key.

- **Anthropic web search tool** — $10 per 1,000 searches plus normal token costs; built into the
  Messages API, with a companion web-fetch tool, domain allow/block lists, and citations returned
  in the response.
- **OpenAI web search** — built into the Responses API and some models; priced per call, scaling
  with context size.
- **Google Gemini — Grounding with Google Search** — a free monthly quota, then roughly $35 per
  1,000 grounded prompts. Google's recall, with mandatory "Search Suggestions" display
  requirements.

**The trade-off.** You get simplicity — one bill, one SDK, no extra moving parts — and lose
control. Results come back answer-shaped and tied to that vendor's partner index; you can't swap the
index, tune the ranking, or easily hand raw results to non-LLM code. Cost per call is often higher
than a dedicated API, and you can't A/B two providers. Good for a v1 or a low-volume feature;
standalone APIs win once search quality or spend becomes something you need to actively manage.

---

## 10. Cross-cutting concerns for embedding in a product

### Wrap every provider behind your own interface

Define one internal `SearchProvider` that returns a normalised result
(`title, url, snippet, content?, publishedAt?, score?`). Then swapping Tavily for Parallel, or
running two with automatic failover, is a config change instead of a refactor. This one decision
de-risks the entire "which vendor" question — you can change your mind later.

### Legal & ToS — the checklist that catches projects late

- **Can you cache results?** Brave: no, without a storage-rights plan. Most AI-native providers:
  yes. SERP proxies: contractually yes, but Google's own ToS is a separate grey area.
- **Can you train or tune a model on results?** Almost universally requires an explicit, usually
  pricier, licence. Brave is the sharpest about this.
- **Must you display citations?** Perplexity and Brave Answers: yes. Gemini grounding: yes (Search
  Suggestions).
- **Who carries the scraping risk?** SerpApi indemnifies; Serper, Playwright-style scrapers and DIY
  do not.
- **Is there a DPA for end-user query text?** Required if queries can contain personal data. Linkup,
  and enterprise tiers of Brave / Exa / Tavily, offer SOC 2 + ZDR.

### Cost control

- Cache normalised `query → results` with a TTL (a few hours for news, days for evergreen) where
  terms allow — the cheapest search is the one you don't make.
- Cap results at 10; nearly every provider surcharges beyond that.
- Use the fast/turbo tier for anything interactive; reserve deep/research endpoints for explicit
  user-triggered "research this" actions, run as background jobs.
- Watch per-request floor fees (Perplexity, Exa answer) — they dominate cost at low token counts.

### Latency

Budget backwards from the user. If the feature shows results in under 2 seconds total, the search
call needs a sub-second p95 — Parallel Turbo, Exa, Brave, Tavily fast, You.com. Add the LLM call
after that. Anything labelled "deep," "research" or "agent" belongs in a queue with a progress
indicator, not a synchronous handler.

### Freshness & filters

Confirm the endpoints you'll use support what you need: date-range filtering, domain
include/exclude, locale and geo targeting, and a dedicated news index. Tavily, Exa, Brave and the
SERP proxies cover most of this; verify per endpoint rather than assuming.

### Vendor stability

The category is consolidating. Bing's API was retired outright. Brave removed its free tier and
switched to auto-billing in 2026. Tavily was acquired by Nebius. Prices in this document have moved
20–40% inside a year. Budget with headroom, keep the abstraction layer, and re-check pricing
quarterly.

---

## 11. Recommendations by scenario

| Scenario | Recommendation |
|---|---|
| Add current-web knowledge to an AI feature / RAG pipeline (the common case) | **Tavily** — Parallel if cost at scale matters; Brave as the independent-index fallback |
| Feature that displays a written answer with citations | **Perplexity Sonar** — Exa Answer or Brave Answers at ~⅓ the price with slightly less polish |
| "Find related / similar", competitive & topic monitoring, research aggregation | **Exa** — Linkup Research for scheduled deep dives |
| Need Google's real SERP — rankings, local pack, shopping, Scholar | **Serper** — SerpApi for engine breadth + legal cover; DataForSEO for cheap bulk async |
| Search + full-page content extraction, including JS-heavy / protected sites | **Firecrawl** — Tavily Extract or Exa Contents if targets are mostly static |
| Strict privacy, EU data residency, or contractual no-third-party | **Linkup** — self-hosted SearXNG if query text cannot leave your infra at all |
| Highest factual accuracy, cost secondary | **Linkup Deep or Parallel Core/Ultra** — Perplexity agentic search for synthesised output |
| Already committed to one LLM vendor, want minimal integration | **That vendor's native web-search tool** — revisit once volume or quality needs active management |
| Prototype / internal tool / personal agent, no budget | **DuckDuckGo MCP or Tavily free tier** — Brave's $5/mo credit also works for light use |

> **Before you commit:** pull 50–100 queries from your real (or realistically simulated) traffic,
> run your two or three finalists through them behind the abstraction layer, and score the results
> yourself on relevance, freshness and citation quality. Every benchmark in §4 is a vendor's
> marketing; your own eval on your own queries is the only number that should decide this.

---

## Method & caveats

Compiled September 2026 from vendor pricing pages and documentation, vendor-published benchmark
suites, and third-party pricing trackers. Search-API pricing and terms change frequently — treat
every figure here as "approximately, at time of writing" and confirm against the vendor before
making a commitment. Benchmark scores are directional only; most originate from a provider
comparing itself to competitors.

### Primary sources

- [Brave Search API — pricing & terms](https://brave.com/search/api/)
- [Brave drops free API tier (Implicator)](https://www.implicator.ai/brave-drops-free-search-api-tier-puts-all-developers-on-metered-billing/)
- [Tavily pricing](https://www.tavily.com/pricing)
- [Tavily API credit costs](https://docs.tavily.com/documentation/api-credits)
- [Exa pricing](https://exa.ai/pricing)
- [Linkup pricing](https://www.linkup.so/pricing)
- [Linkup — best web search API 2026](https://www.linkup.so/blog/best-web-search-api-in-2026-top-providers-compared)
- [Perplexity API pricing (CloudZero)](https://www.cloudzero.com/blog/perplexity-api-pricing/)
- [Perplexity Sonar pricing](https://pricepertoken.com/pricing-page/model/perplexity-sonar)
- [Parallel.ai — web search quality benchmarks](https://parallel.ai/benchmarks)
- [Parallel API pricing](https://docs.parallel.ai/getting-started/pricing)
- [Serper pricing (ColdIQ)](https://coldiq.com/blog/serper-pricing)
- [SerpApi pricing (TrustRadius)](https://www.trustradius.com/products/serpapi/pricing)
- [DataForSEO SERP API pricing](https://dataforseo.com/apis/serp-api/pricing)
- [Microsoft — Bing Search API retirement](https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement)
- [Kagi API portal docs](https://help.kagi.com/kagi/api/overview.html)
- [Firecrawl pricing (eesel)](https://www.eesel.ai/blog/firecrawl-pricing)
- [Firecrawl — best web search MCP](https://www.firecrawl.dev/blog/best-web-search-mcp)
- [You.com Web Search API docs](https://you.com/docs/search/overview)
- [Vellum — best web search APIs & MCPs](https://www.vellum.ai/blog/best-web-search-apis-and-mcps-for-ai-agents)
- [Model Context Protocol](https://modelcontextprotocol.io)
