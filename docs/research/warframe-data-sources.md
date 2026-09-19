# Warframe Data Sources — Relic Farming & Ducat Tallying

Research date: 2026-09-19. All endpoints probed live on that date unless noted. Sources are primary (live endpoints, repos, DE policy pages); the community wiki is explicitly marked where used. Search caveat: the local `searxng` CLI instance (localhost:8080) returned HTTP 403 for every query, so search was performed via the Exa web-search proxy + direct endpoint probing; findings were verified by fetching the primary sources themselves.

---

## 1. Official Digital Extremes data

### 1.1 World State API (live game state — does NOT contain drop tables)
- `https://api.warframe.com/cdn/worldState.php` — official PC worldstate, plain JSON (probed 2026-09-19: HTTP 200, `Content-Type: text/html`, `Cache-Control: public, max-age=21`).
- Platform variants documented on the community wiki "World State" page: `https://content.warframe.com/dynamic/worldState.php` (PC), `https://content-ps4.warframe.com/dynamic/worldState.php` (PS4/PS5), `https://content-xb1.warframe.com/dynamic/worldState.php` (Xbox), `https://content-swi.warframe.com/dynamic/worldState.php` (Switch) — https://wiki.warframe.com/w/World_State (mirror of the article: https://warframe.fandom.com/wiki/World_State)
- Contents are live events only: Void Fissures (`ActiveMissions`), Void Traders (`VoidTraders`), Prime Vault (`PrimeVaultTraders`/`PrimeVaultAvailabilities`), Nightwave (`SeasonInfo`), etc. It has **no static relic reward tables, no drop chances, no ducat values** — you cannot build a ducat tally from the official API alone.
- **CORS: NOT enabled.** Probed with an `Origin` header: no `Access-Control-Allow-Origin` is ever sent. Browser front-ends cannot fetch it cross-origin; you need a proxy (warframestat.us) or a server-side fetch.
- **Rate limit: none documented.** DE publishes no rate-limit text for this endpoint; the only control is the ~21 s CDN cache (`Cache-Control: max-age=21`), which effectively caps refresh frequency. Treat it as effectively unlimited via the CDN.
- Source: https://api.warframe.com/cdn/worldState.php (headers probed), endpoint list: https://wiki.warframe.com/w/World_State (community wiki — DE ships no official API docs, the wiki explicitly says: "The developers do not maintain public documentation on the subject so assume anything could change at any moment").

### 1.2 Public Export (DE's machine-readable game-data export — used by every major community tool)
- Manifest: `https://content.warframe.com/PublicExport/index_en.txt.lzma` (probed HTTP 200; plain text list of `Export*.json` endpoints). `origin.warframe.com` is preferred when available (fallback `content.`), per the WFCD scraper.
- Item files: `https://content.warframe.com/PublicExport/Manifest/Export{Category}.json` (e.g. `ExportRelics.json`, `ExportItems.json`, `ExportWarframes.json`, `ExportWeapons.json`). This is where warframe-items gets relic/item identity data (`uniqueName`, names, component trees).
- Source (usage evidence): https://github.com/WFCD/warframe-items/blob/master/build/scraper.ts (lines ~89, ~151)
- Caveat: the per-category `Manifest/` URLs I probed returned 404 on 2026-09-19; the manifest `index_en.txt.lzma` works. The export pipeline is DE infrastructure that changes without notice; the reliable machine-readable surface is the WFCD mirrors below, which are built from it.

### 1.3 Official Drop Tables page (relic drop tables, human-readable only)
- `https://www.warframe.com/droptables` → 302 → `https://warframe-web-assets.nyc3.cdn.digitaloceanspaces.com/uploads/cms/hnfvc0o3jnfvc873njb03enrf56.html` (probed 2026-09-19; ~4.4 MB HTML; `Last Update: 25 June, 2026`).
- Page text (verbatim, in-file): "This is automatically generated from our internal data … This list will be maintained by an automated process combined with manual publishing with Updates (not all Hotfixes)."
- Contains `#relicRewards` (per-relic tables incl. refinement states), `#missionRewards`, `#keyRewards`, `#transientRewards`.
- **Machine-readable: NO.** It is a static HTML page of `<table>`s, and the CDN sends no `Access-Control-Allow-Origin` (probed), so it cannot even be consumed from a browser. It is the *origin* of the machine-readable community dataset `warframe-drop-data` (which parses it "with no data mining involved" — repo README).
- Sources: https://www.warframe.com/droptables , https://warframe-web-assets.nyc3.cdn.digitaloceanspaces.com/uploads/cms/hnfvc0o3jnfvc873njb03enrf56.html (files probed), parse provenance: https://github.com/WFCD/warframe-drop-data/blob/master/README.md

### 1.4 DE's terms applying to using game data
- Digital Extremes Terms of Use: "The Properties are strictly for your individual use and entertainment purposes, all of which are **non-commercial**. You must obey by this policy unless otherwise permitted by Digital Extremes. Failure to do so will result in consequences ranging from account deletion to legal action." — https://www.warframe.com/terms (fetched 2026-09-19)
- There is no separate "Content Policy / API terms" document. The de-facto policy is that sentence in the ToU + the Third-Party Software policy (below). No API key, no application process, no attribution requirement is published for the worldstate/export endpoints.

---

## 2. Community mirrors & datasets (WFCD — Warframe Community Developers)

Organization: https://github.com/WFCD — self-description: "Tenno who provide developed tools that people can use for their own projects or gameplay **without infringing on aspects of Warframe**. Not affiliated with DE." (https://github.com/wfcd)

### 2.1 WFCD/warframe-drop-data — THE relic reward table source
- Repo: https://github.com/WFCD/warframe-drop-data — license MIT, last push 2026-06-25 (matches the official droptables "Last Update" — data is regenerated whenever DE's page changes).
- "This data is parsed from Digital Extremes official drop data website … no data mining was involved." (README, verbatim)
- Files: `data/relics.json` — 3,086 entries, one per relic × refinement state. Shape (verified):
  ```json
  { "tier": "Axi", "relicName": "A1", "state": "Intact",
    "rewards": [ { "_id": "...", "itemName": "Akstiletto Prime Barrel",
                   "rarity": "Uncommon", "chance": 11 } ] }
  ```
  Note: no ducat value, no vaulted flag — those live elsewhere (see §3, §4).
- Also served as JSON: `https://drops.warframestat.us/data/all.json`, `all.slim.json` (4.4 MB flat list incl. 4,056 relic *drop-location* entries like `{"place":"Mercury/Apollodorus (Survival), Rotation B","item":"Lith Q3 Relic","rarity":"Rare","chance":7.69}`), `info.json` (md5 hash + DE page last-modified), `missionRewards.json`, `relics.json`. All probed live 2026-09-19.
- Web UI: http://drops.warframestat.us

### 2.2 WFCD/warframe-items — master item dataset (incl. ducats & vaulted)
- Repo: https://github.com/WFCD/warframe-items — license MIT, last push 2026-09-19 (daily activity).
- **npm package `warframe-items` is STALE**: latest `1.1269.87` published 2025-04-10 (https://registry.npmjs.org/warframe-items) — do not consume via npm; use the repo's `data/json/*.json` (per-category: `Relics.json`, `Warframes.json`, `Primary.json`, `Secondary.json`, `Melee.json`, …) or a vendored snapshot.
- Data provenance (from `build/scraper.ts`): items/identity from DE Public Export; **drop rates from `drops.warframestat.us/data/all.slim.json`; ducats scraped from `https://wiki.warframe.com/w/Ducats/Prices/All`**.
- `data/json/Relics.json` (3,120 entries, one per relic × state): includes `vaulted` (bool), `marketInfo` (warframe.market id/urlName), `rewards[]` with `{chance, rarity, item:{name, uniqueName, warframeMarket}}`. Verified: `Axi A1 Intact → vaulted: true`; `Meso N11 Intact → vaulted: false`.
- `data/json/Warframes.json` etc.: ducats on **components/parts**, not on the top-level item (verified: Frost Prime → Blueprint 100, Systems 45, Chassis 15, Neuroptics 15; item-level keys `vaulted`, `vaultDate`, `estimatedVaultDate`, `isPrime`).

### 2.3 WFCD/warframe-relic-data — relic metadata (vaulted status, market links) — @wfcd/relics
- Repo: https://github.com/WFCD/warframe-relic-data (default branch `development`) — license MIT (© 2022 Soundofdarkness), last push 2026-09-19.
- `data/Relics.json`: 773 relics `{name: "Axi A1", uniqueName, locations, vaultInfo: {vaulted: bool}, warframeMarket: {id, urlName}, rewards: [{rarity, chance, item:{name, uniqueName, warframeMarket}}]}` — all 773 have `vaultInfo`. Verified live.
- It is part of the warframe-items build chain (README). README's own caveat: "probably not complete and is not stable. No build is automatically ran either, so the data is probably quite outdated" — despite the caveat, the repo pushes as of 2026-09-19, so treat the caveat as historical.

### 2.4 warframestat.us / WFCD API (worldstate proxy; useful for live fissures)
- API docs + OpenAPI: https://docs.warframestat.us/ (version 3.2.25 probed; servers: https://api.warframestat.us), repo https://github.com/WFCD/warframe-status — license Apache-2.0, active.
- Relevant endpoints: `/pc` (full worldstate, CORS-enabled, sanitized), `/pc/fissures`, `/pc/voidTrader`, `/items`, `/items/{item}`, `/drops`, `/drops/search/{query}`. **Caveat: the `/drops*` endpoints returned HTTP 521 (Cloudflare origin down) when probed 2026-09-19** — use the raw GitHub/drops.warframestat.us drop files instead.
- Notably there is **no `/relics` endpoint** in the current API surface (verified against the OpenAPI spec) — relic static data is served via `/drops` (currently down) or the repos above.
- Rate limits: no documented limit found in the repo README or OpenAPI; third-party integrations note transient HTTP 429 responses (e.g. the Apify actor docs). Practice: ≤1 req/s, cache aggressively.
- Extra static asset CDN: `https://cdn.warframestat.us/img/{imageName}` (warframe-items images).

---

## 3. Ducat values specifically

- **Canonical source = the official Warframe Wiki page `Ducats/Prices/All`** — https://wiki.warframe.com/w/Ducats/Prices/All (probed 2026-09-19, 582 item rows). Table columns: `Part | Drop Location(s) | Ducat Value`, where Drop Locations carry `(V)` = vaulted and `(B)` markers, e.g. `Daikyu Prime Grip … 100`, `Odonata Prime Systems Blueprint … 15`.
- The rule (wiki text, verbatim, https://wiki.warframe.com/w/Orokin_Ducats): "The Ducats value depends on the item's rarity as it appears on the Void Relics that they originate from. Typically, common (bronze) items are worth 15, uncommon (silver) 45, and the rare (gold) ones sell for 100. An exception is made for items that had a higher rarity on Relics that were placed in the Prime Vault, but remain available on newer relics at a lower rarity. To make up for the loss in rarity and thus value, such items are worth 25 and 65, respectively."
- Verified value distribution across all 582 items: {15: 183, 45: 184, 100: 148, 65: 36, 25: 31}.
- **What maps to ducats**: you can sell Prime *blueprints*, Prime weapon *parts* (barrel/receiver/stock/grip/link/blade/handle/etc.), and *crafted* Prime Warframe components at Void Trader kiosks (wiki: https://wiki.warframe.com/w/Orokin_Ducats). Built prime *weapons/archwings* are not in the price table (not sellable as items); a crafted warframe component sells for the same ducats as its blueprint (both are rarity-tiered identically — corroborated by community example "Ash Prime Neuroptics … value of 65" and "Braton Prime Blueprint … value of 25" in https://steamcommunity.com/app/230410/discussions/0/1736589520001144692/). This "blueprint = crafted part" equality is not stated as a formal rule by DE; it falls out of the rarity-tier rule and the wiki's price table listing.
- **How often it changes**: ducat values change only when DE re-rarities items via Prime Vault/Resurgence rotations (the 25/65 exceptions), i.e. a few times per year. warframe-items re-scrapes the wiki page on each build; the wiki page is community-maintained.
- **warframe.market also carries ducats** (secondary): `GET https://api.warframe.market/v1/tools/ducats` (the "Ducanator") — verified live; hourly payload: `{ducats, ducats_per_platinum, median, wa_price, volume, plat_worth, item, …}` per item (values shown per item: 15/45/65…). Web UI: https://warframe.market/tools/ducats. It is a market/economy aggregator; the *value* it reports matches the wiki but it is not the source of truth, and it mixes in platinum-price math. warframe.market's own item objects do not include ducats.
- **Not present where you might expect**: official worldstate API (no ducats), warframe-drop-data (no ducats), warframe-relic-data (no ducats).

---

## 4. Relic metadata (which relics exist, eras, refinements, probabilities, vaulted, drop locations)

- **Eras / tiers**: Lith, Meso, Neo, Axi, Requiem — plus newer classes `Eterna`, `Vanguard`, and a `Void` tier present in current warframe-items data (verified in `data/json/Relics.json`; these were not in older documentation — new-relic-era flag for your data model).
- **Refinement states**: Intact / Exceptional / Flawless / Radiant — each is a separate row/entry in warframe-drop-data `relics.json` (state field) and warframe-items `Relics.json` (name field). Per-state chance tables come from DE's droptables page (`#relicRewards`), i.e. the same data as drop-data.
- **Per-tier reward probabilities**: `warframe-drop-data/data/relics.json` is the dataset that carries per-relic, per-state reward chance tables (verified sample: Axi A1 Intact — Uncommon 11%/25.33%, Rare 2%; Radiant boosts rare to ~10%, commons compress; chance values are per-state).
- **Vaulted status**: `warframe-items Relics.json` `vaulted` field (per relic × state) and `warframe-relic-data` `vaultInfo.vaulted` (per relic) — both verified live; `warframe-items` items also carry `vaulted`/`vaultDate`/`estimatedVaultDate`. The official droptables page contains **no vaulted markers** (only currently-farmable drops) — the `(V)` markers live on the wiki's `Ducats/Prices/All` page and are implied by presence/absence in current drop data.
- **Relic drop locations (which mission drops which relic)**: the official droptables `#missionRewards`; machine-readable via drop-data `all.json`/`all.slim.json` (4,056 `"…Relic"` entries with place/rarity/chance, verified) and via `warframe-items` Relic `locations` (present but often empty) and `warframestat.us /drops` (currently 521).

---

## 5. Existing tools (one line each — do not duplicate)

- **AlecaFrame** — Overwolf in-game overlay (desktop); relic reward overlay showing ducat/plat value of each reward choice + inventory tracking + WFMarket listing; NOT DE-sanctioned ("use at own risk", Overwolf says DE were "in conversations" re ToS) — https://alecaframe.com/ , https://docs.alecaframe.com/faq . It tallies *per-selection* value in the game, not a farm session log on the web.
- **WFInfo** — Windows OCR overlay reading relic-reward popups, shows plat + ducat values, optionally auto-posts to its stats API (also exposes server-side endpoints at warframestat.us `/wfinfo/*`); also "use at own risk" per DE policy — https://github.com/dimon222/WFInfo (activity: stale-ish, but the concept is the reference implementation for OCR reward capture).
- **overframe.gg** — web build-sharing/planner site with an item DB (has a Ducats item page); no relic-farm ducat tallying — https://overframe.gg/
- **warframe.market** — web trading market (API `api.warframe.market/v1`); its Ducanator (`/v1/tools/ducats`) converts item ducat values into ducat-per-platinum ratios using live order prices; not a farming tally — https://warframe.market/tools/ducats
- **Warframe Relic Helper** (warframerelichelper.com / github.com/kcho760/warframe-relic-helper) — web; ranks currently-farmable relics by expected value (TEV = Σ chance×price×volume); no personal tally.
- **Warframe Analytics** (warframe-analytics.com) — web; real-time relic EV rankings with per-relic platinum *and* ducat EV, vaulted filtering; a recommendation engine, not a "tally what I earned" counter.
- **MGTools relic visualizer** (mgtools.cloud/games/warframe-relics) — web; cumulative drop-chance math for group relic runs.
- **Gap**: none of the above is a simple web "tally the items I obtained from relic runs → total ducat value" counter; WFInfo/AlecaFrame cover it in-game via OCR/Overwolf inventory access, which your web app can't replicate (drops are client-local, no official inventory API for third parties).

---

## 6. Legal & licensing constraints (redistribution in a public web app)

- **DE ToU**: the Properties are "strictly for your individual use and entertainment … **non-commercial**" — commercial apps built on Warframe data need DE permission (none published). https://www.warframe.com/terms
- **Third-party software policy** (relevant if the app ever automates the game): DE publishes no approval list; "If you use external software in conjunction with Warframe, you do so at your own risk"; DE said of Overwolf only that "we've had conversations to ensure that Warframe's EULA and ToS are not being breached in any way". https://support.warframe.com/hc/en-us/articles/360030014351-Third-Party-Software-and-You and https://forums.warframe.com/topic/1383123-third-party-software-usage/
- **WFCD dataset licenses**: warframe-drop-data, warframe-items, warframe-relic-data, warframe-worldstate-parser are all MIT (verified via GitHub API license field). Redistribution with attribution is permitted; MIT permits commercial use, but DE's ToU non-commercial clause still governs the underlying game data.
- **Wiki data**: the official wiki (wiki.warframe.com, launched Feb 2025 in collaboration with Weird Gloop) is licensed **CC BY-NC-SA 3.0** (footer, verified) — Non-Commercial + ShareAlike + attribution. Ducat values compiled from the wiki are therefore NC/SA-scoped; warframe-items (MIT) redistributes them, which is a known fuzzy edge — if your app is non-commercial and you attribute, CC BY-NC-SA is satisfied, but avoid *commercial* reuse of wiki-derived values in isolation.
  - Wiki announcement (DE devstream): https://wiki.warframe.com/w/Devstream_184 ; hosting/footer: https://wiki.warframe.com/w/WARFRAME_Wiki:About
- **Scraping the wiki/HTML**: acceptable technically (MediaWiki API: `api.php?action=parse&page=…&prop=wikitext`), legally within CC BY-NC-SA + DE ToU for non-commercial use; the wiki and DE data contain trademarked names ("Warframe", "Prime", "Ducats", item names) — attribute DE ("© Digital Extremes Ltd.") and note trademarks.
- **warframe.market data**: their API is free to query for non-commercial fan tools; aggregate market *prices* are their live data — if you recompute/redistribute, follow their guidance and don't hammer the API (no documented rate limit; be polite).

---

## Recommended data architecture

**Primary dataset: WFCD `warframe-drop-data` (raw GitHub files or `drops.warframestat.us`) + WFCD `warframe-items` (repo `data/json/*.json`)**

Join plan (all MIT, all actively maintained as of 2026-09-19):
1. **Relic reward tables** → `warframe-drop-data/data/relics.json` keyed by `tier + relicName + state` (Intact/Exceptional/Flawless/Radiant) — mirrors DE's official droptables, refreshed automatically when DE's page updates (info.json `modified` timestamp).
2. **Relic identity & vaulted** → `warframe-items/data/json/Relics.json` (`vaulted`, `marketInfo`, `rewards[].item.uniqueName`) or `warframe-relic-data/data/Relics.json` (`vaultInfo`, `warframeMarket` id) keyed by name.
3. **Ducat values** → join rewards to `warframe-items` per-type files' components/parts `ducats` field; canonical verification source is the wiki `Ducats/Prices/All` (which also gives 15/25/45/65/100 and `(V)` markers per item + drop locations). If you prefer a single fetch: parse `https://wiki.warframe.com/w/Ducats/Prices/All` yourself (or vendor warframe-items' scrape on each build).
4. **Live fissures / void trader** (optional, for a "current best relics" view) → `https://api.warframestat.us/pc/fissures` (CORS-enabled proxy; the official worldstate endpoint has no CORS).
5. **Where relics drop** (optional "farm location") → `warframe-drop-data/data/all.json` / `all.slim.json` entries with `item` ending in `Relic`.

**Fallback**: if WFCD mirrors are down, scrape the official droptables HTML (server-side, no CORS needed; last-updated header + in-page "Last Update" date) for rewards, and the wiki `Ducats/Prices/All` table (via MediaWiki API) for ducats — both are direct DE/wiki sources; drop-data exists precisely to avoid this.

**Refresh cadence**: relic rewards + vaulted ~daily/weekly (aligns with DE updates & Prime Vault rotations); ducat values only change on vault/rarity changes (re-scrape monthly); worldstate/fissures every minute at most (CDN caches 21 s).

**Licensing posture for a public web app**: keep it non-commercial, attribute DE + WFCD + wiki (CC BY-NC-SA), and do not redistribute warframe.market order data in bulk.
