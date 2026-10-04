# warframe.market API — Ducats, Platinum Pricing & Client-Side Integration

Research date: **2026-10-03**. Every endpoint below was probed live on that date with `curl` from a single machine (unless explicitly marked otherwise); every field/envelope claim is either copied from a live response or from a primary doc page. Third-party/community material is labelled as such.

Companion doc: [warframe-data-sources.md](./warframe-data-sources.md) (relic drop tables, ducat *values*, WFCD datasets).

**Orientation up front:** warframe.market has a modern, *officially documented* **v2 API** (`https://api.warframe.market/v2/`, live version `0.25.0`) and a **legacy v1 API** that is explicitly deprecated in the official docs. The **Ducanator feed is v1-only and undocumented**, but the per-item **ducat value is a first-class field (`ducats`) on v2 items** — which is what a relic-tally app actually needs.

---

## 1. `GET https://api.warframe.market/v1/tools/ducats` (the "Ducanator" feed)

Probed live 2026-10-03 16:39 UTC. HTTP 200, `content-type: application/json`, ~531 KB, `cf-cache-status: DYNAMIC`, no `Cache-Control`. Anonymous (no JWT) — the server still sets an anonymous session cookie (`set-cookie: JWT=…; Domain=.warframe.market; SameSite=Lax`).

### Envelope

There is **no `payload/previous/next` pagination envelope** on this endpoint, and no top-level list. The envelope is:

```jsonc
{
  "payload": {
    "previous_hour": [ /* 757 entries */ ],
    "previous_day":  [ /* 757 entries */ ]
  }
}
```

* `payload.previous_hour` — 757 entries, **all sharing one `datetime`** (`"2026-10-03T15:00:00.000+00:00"`, i.e. top of the previous hour).
* `payload.previous_day` — 757 entries, all sharing one `datetime` (`"2026-10-02T00:00:00.000+00:00"`, i.e. midnight of the previous day).

### Per-element fields (identical key set in both splits)

```jsonc
{
  "datetime": "2026-10-03T15:00:00.000+00:00",
  "position_change_month": -36,
  "position_change_week": -33,
  "position_change_day": -16,
  "plat_worth": 82.005,
  "volume": 33,
  "ducats_per_platinum": 7.5,
  "ducats_per_platinum_wa": 6.04,
  "ducats": 15,
  "item": "54a73e65e779893a797fff22",   // <-- v2 item `id`, NOT a url_name
  "median": 2,
  "wa_price": 2.48,
  "id": "6ac129b9e63ff80010e05add"      // <-- id of this snapshot row
}
```

**Key finding:** there is **no `url_name`, no `order`, no `user`** field. The `item` field is a 24-hex ObjectId that is *exactly* the v2 item `id`. (Older community write-ups describing `order`/`user`/`url_name` on this endpoint no longer match the live response — treat those as stale.)

### Is it "recent orders" or "all items"? Is it ordered/limited?

* **It is a per-item hourly/daily aggregate, not a list of trades.** One row per ducat-bearing item, with the hour's/day's `volume`, `median`, `wa_price`, and `ducats_per_platinum`.
* **It is the complete ducat set, not a top-N.** Both splits contain exactly **757** rows with **757 distinct `item` ids**; the v2 item collection contains exactly **757 items carrying a `ducats` field**. The intersection is 100%: all 757 feed ids resolve in `/v2/items`, and every `ducats` value in the feed **matches the item's v2 `ducats` value (0 mismatches over 757×2 rows)**.
* **Ordering:** rows are sorted **ascending by `item` id** (string sort) — i.e. by item insertion/creation order, *not* by volume or ducats/plat. `volume` is not monotonic.
* Derived fields verified: `ducats_per_platinum == ducats / median`; `ducats_per_platinum_wa == ducats / wa_price` (2 dp); `plat_worth` ≈ `wa_price × volume` (not exactly — it uses an unrounded WA price).

### Practical read

For a relic-tally app the ducat *value* should come from `/v2/items` (`ducats` field, see §2/§3). The v1 feed is only worth fetching if you want the **live market context** (`median`, `wa_price`, `ducats_per_platinum`, `volume`) for the "is it better to sell or to burn for ducats?" view. It is an undocumented v1 endpoint — no official page documents it (see §8).

---

## 2. `GET https://api.warframe.market/v2/items`

Live version `0.25.0`. HTTP 200, `content-type: application/json`, ~1.64 MB, `cf-cache-status: DYNAMIC`, no `Cache-Control`.

### Envelope — **`data` + `apiVersion` + `error`, no `meta`, no `previous/next`**

```jsonc
{
  "apiVersion": "0.25.0",
  "data": [ /* 3892 Item objects */ ],
  "error": null
}
```

This is the documented envelope for "most JSON endpoints" (official docs, API Overview → *Response Envelope*). `data` here is a **bare array** (not `{items: [...]}`), so there is *no* pagination wrapper anywhere — the whole item collection is returned in one response.

### Per-item fields actually present in the list response

Union of keys across all 3892 entries: `baseEndo`, `bulkTradable`, `ducats`, `endoMultiplier`, `gameRef`, `i18n`, `id`, `maxAmberStars`, `maxCyanStars`, `maxRank`, `slug`, `subtypes`, `tags`, `vaulted`.

```jsonc
{
  "id": "54a73e65e779893a797fff7d",
  "slug": "frost_prime_chassis_blueprint",
  "gameRef": "/Lotus/Types/Recipes/WarframeRecipes/FrostPrimeChassisBlueprint",
  "tags": ["component", "prime", "warframe", "blueprint"],
  "ducats": 15,
  "i18n": {
    "en": {
      "name": "Frost Prime Chassis Blueprint",
      "icon": "items/images/en/frost_prime_chassis.4f8ff8605be1afaab9a0e5cc3c67cb21.png",
      "thumb": "items/images/en/thumbs/frost_prime_chassis....128x128.png",
      "subIcon": "sub_icons/warframe/prime_chassis_128x128.png"
    }
  }
}
```

Counts in the live list (2026-10-03): **757 items with `ducats`**, **799 with `vaulted`** (756 `true`), **1044 `bulkTradable`**, **1521 `maxRank`**. Every one of the 3892 items has an `i18n.en`. `setRoot`, `setParts`, `quantityInSet`, `rarity`, `vosfor`, `maxCharges`, `reqMasteryRank`, `tradingTax`, `tradable` are **absent from the list** (they are "optional/contextual" and only appear on the detail response).

### `/v2/items` also includes things a relic app must filter out

The collection is **all tradable items**, not just prime parts: 1399 mods, 799 **relics** (tag `relic`, e.g. `axi_a1_relic` → `"Axi A1 Relic"`, `vaulted: true`, `subtypes: ["intact","exceptional","flawless","radiant"]`, **no `ducats`**), 234 set roots, arcanes, scenes, rivens, etc. Tag vocabulary (top): `mod 1399`, `rare 925`, `relic 799`, `weapon 777`, `prime 759`, `component 617`, `warframe 613`, `blueprint 397`, `set 234`, plus era tags `lith/axi/neo/meso`.

### `GET /v2/item/{slug}` (detail)

Officially the route is **`/v2/item/{slug}`** with aliases **`/v2/itemId/{itemId}`** and **`/v2/item/{slug}/set`** / **`/v2/itemId/{itemId}/set`**. Probed aliases that also work but are **undocumented**: `/v2/items/{slug}` (byte-identical body to `/v2/item/{slug}`). Detail adds:

```jsonc
{
  "id": "56783f24cbfa8f0432dd899c",
  "slug": "frost_prime_set",
  "gameRef": "/Lotus/Powersuits/Frost/FrostPrime",
  "tags": ["set", "prime", "warframe"],
  "setRoot": true,
  "setParts": ["54a73e65e779893a797fff80", "…7d", "…6c", "56783f24cbfa8f0432dd899c", "…79"],
  "ducats": 175,
  "reqMasteryRank": 0,
  "tradingTax": 8000,
  "tradable": true,
  "i18n": { "en": { "name": "Frost Prime Set", "description": "…",
                    "wikiLink": "https://wiki.warframe.com/w/Frost/Prime", "icon": "…", "thumb": "…" } }
}
```

`GET /v2/item/frost_prime_set/set` returns `data: {id, items: Item[]}` where each **set part** additionally carries `setRoot: false` and `quantityInSet: 1`, and the root carries `setRoot: true`. Note the set root's `ducats` (175) is the **sum of its parts** (100+15+15+45) — do not use set `ducats` as if it were a single part's value.

### id / slug ↔ v1 `url_name`

* **`slug` and the v1 `url_name` are the same string.** The v2 slug alphabet is strictly lower-case snake_case (verified: 0 of 3892 slugs contain spaces or upper-case). Item page URLs (`https://warframe.market/items/<slug>`) and the v1 API (`/v1/items/<slug>/statistics`) accept the same value.
* **`id` is the stable join key.** The v1 ducats feed's `item` field, `setParts[]`, and `Order.itemId` all use the v2 `id`. Cross-check against this repo's own generated data: for the **591** relic-reward items that carry a market link in `src/data/relics.ts`, **590 resolve `urlName` → v2 slug and 0 have an `id` mismatch** between the stored id and the v2 id. (The single failure is an upstream typo — see §7.)
* The API is **lenient about some aliases**: `GET /v2/item/frost_prime_systems` returns the item whose `slug` is `frost_prime_systems_blueprint` (component short-name → blueprint). Do not rely on this; it is undocumented.

---

## 3. Does v2 expose the Ducats tool? — **No; but `ducats` is on every v2 item**

* `GET /v2/tools/ducats` → **404** `404 page not found`.
* `GET /v2/tools` → 404. `GET /v2/ducats` → 404.
* `GET /v1/tools/ducats` → 200 (the feed in §1).
* The v2 route tree (official docs "Manifests And Collections", "Orders", "Users", "Achievements", "Dashboard", plus the third-party OpenAPI listing all paths) contains **no `/tools/*` route at all**.

**The ducat value field is `ducats` (int, optional/contextual) on the `Item` model.** It exists on the `/v2/items` list entries and on `/v2/item/{slug}`; it is documented as *"Ducat value."* Distribution across the live list is **not** just 15/25/45/65/100 — because set roots report the sum: e.g. `15: 196, 45: 191, 100: 156, 65: 34, 25: 17, 205: 32, 225: 18, 160: 23, 175: 19, 260: 16, …`. Non-set, single-part items do use the familiar wiki tiers (the same 15/25/45/65/100 set).

So: **a browser app can get ducat values entirely from v2** and never touch the deprecated v1 tool.

---

## 4. Platinum pricing — orders & statistics

### v2 (current)

| Route | Status (live) | Notes |
| --- | --- | --- |
| `GET /v2/orders/item/{slug}` | **200** (≈453 KB for `frost_prime_set`, 898 orders) | All visible orders. Alias `/v2/orders/itemId/{itemId}`. |
| `GET /v2/orders/item/{slug}/top` | **200** (≈5 KB) | **The recommended price endpoint.** |
| `GET /v2/orders/recent` | **200** (≈205 KB) | Up to 500 orders created in the last 4 h, online users only, 1-minute refresh badge in docs. |
| `GET /v2/orders/user/{slug}` | public | Visible orders only for anonymous users. |
| `GET /v2/orders/my` | 🔒 auth required | |
| `GET /v2/orders/item/{slug}/statistics` | **404** | Does not exist. |

`/v2/orders/item/{slug}` and `/top` are **platform/crossplay aware**. `/v2/orders/item/{slug}` returns orders "whose `lastSeen` is within the last 48h"; each order carries a nested `user` (UserShort with `status`, `platform`, `crossplay`, `locale`, `reputation`, `activity`, `lastSeen`).

**`/v2/orders/item/{slug}/top` response** — up to 5 sell + 5 buy, **online users only**:

```jsonc
{
  "apiVersion": "0.25.0",
  "data": {
    "sell": [ { "id": "6a74639890780835bc3d7a84", "type": "sell", "platinum": 77,
                "quantity": 1, "perTrade": 1, "visible": true,
                "createdAt": "2026-08-06T10:36:08Z", "updatedAt": "2026-10-03T15:58:41Z",
                "itemId": "56783f24cbfa8f0432dd899c",
                "user": { "id": "…", "ingameName": "QBTao", "slug": "qbtao",
                          "reputation": 50, "platform": "pc", "crossplay": true,
                          "locale": "zh-hans", "status": "ingame",
                          "activity": { "type": "UNKNOWN", "details": "unknown",
                                        "startedAt": "2026-10-03T13:07:40Z" },
                          "lastSeen": "2026-10-03T13:07:40Z" } }, … ],
    "buy":  [ /* same shape, type: "buy" */ ]
  },
  "error": null
}
```

Ranking is **not** a plain price sort: sell orders rank "Endo listings first, then better Endo-per-platinum …, otherwise lower platinum-per-trade first"; buy orders rank the mirror image. Query filters: `rank`, `rankLt`, `charges`, `chargesLt`, `amberStars`, `amberStarsLt`, `cyanStars`, `cyanStarsLt`, `subtype` (all ignore-on-inapplicable).

### v1 (legacy, deprecated)

| Route | Status (live) | Notes |
| --- | --- | --- |
| `GET /v1/items/{slug}/orders` | **403** body `Deprecated` | Deliberately disabled. |
| `GET /v1/items/{slug}/statistics` | **200** (≈96 KB) | Still serving historical price/volume aggregates. |
| `GET /v1/orders/item/{slug}` | **404** `{"error":"…"}` | Gone. |
| `GET /v1/items` | **404** | The old item list is gone. |
| `GET /v1/items/{slug}` | **404** | Gone. |
| `GET /v1/tools/ducats` | **200** | The only widely-used v1 survivor besides statistics. |

`/v1/items/{slug}/statistics` shape (live):

```jsonc
{ "payload": {
    "statistics_closed": {
      "48hours": [ { "datetime": "2026-10-01T16:00:00.000+00:00", "volume": 2,
                     "min_price": 75.0, "max_price": 76.0, "open_price": 76.0,
                     "closed_price": 75.0, "avg_price": 75.5, "wa_price": 75.5,
                     "median": 75.5, "moving_avg": 76.5,
                     "donch_top": 79.0, "donch_bot": 75.0, "id": "…" }, /* 33 rows */ ],
      "90days":  [ /* 87 daily rows, same shape */ ]
    },
    "statistics_live": {
      "48hours": [ { "datetime": "…", "volume": 2008, "min_price": 55, "max_price": 70,
                     "avg_price": 62.5, "wa_price": 62.017, "median": 65.0,
                     "order_type": "buy", "moving_avg": 69.6, "id": "…" }, /* 96 rows */ ],
      "90days":  [ /* 174 rows */ ]
    }
} }
```

**Recommendation:** use **`/v2/orders/item/{slug}/top`** as the live buy/sell price for each reward (it is what the official library `WFCD/warframe-nexus-query` documents as *"RECOMMENDED for price checks"*), and derive your own statistics client-side from the returned 5+5 orders (the library ships a `calculateStatistics` helper that filters `onlineOnly`). Use `/v1/items/{slug}/statistics` only if you specifically want 48 h/90 day history — it is explicitly deprecated ("The legacy v1 API is deprecated and unsupported") and could be switched off.

---

## 5. Auth, rate limits, headers

### Public vs JWT

* **All the endpoints this app needs are public / anonymous**: `/v2/items`, `/v2/item/{slug}`, `/v2/item/{slug}/set`, `/v2/orders/item/{slug}`, `/v2/orders/item/{slug}/top`, `/v2/orders/recent`, `/v2/orders/user/{slug}`, `/v2/user/{slug}`, `/v2/versions`, and the v1 `/v1/tools/ducats` + `/v1/items/{slug}/statistics`. Probed with **no** `Authorization` header → 200.
* **🔒 Auth-required v2 endpoints** (docs badges): `/v2/me` (+ avatar/background), `/v2/orders/my`, `/v2/order` (POST), `/v2/order/{id}` (GET/PATCH/DELETE), `/v2/order/{id}/close`, `/v2/orders/group/{id}`, and parts of `/v2/achievements*` / `/v2/dashboard/showcase`.
* **Sign-in is now first-party-only.** `POST /auth/signin` and `/auth/signup` require a registered first-party `clientId` **and** an `X-Firebase-AppCheck` token; the response is `{accessToken, refreshToken, tokenType: "Bearer", expiresIn}`. The docs state: *"OAuth 2.0 is still in development and is not available to public integrations yet… integrations that require user authorization still need to rely on the existing v1 authorization flow."* **A read-only client app needs no auth at all.**
* Historic `Authorization: JWT <token>` (v1 style, token returned in the `Authorization` response header with the `"JWT "` prefix stripped) is still the legacy flow; new v2 tokens are `Bearer`. Not needed here.

### Rate limits (officially documented)

* **General public limit: `3` requests per second** (docs: API Overview and Rules → Rate Limits). Exceeding it → **`429`**; *"Too many concurrent connections from one IP address may return `509`."* Contract-search endpoints ≈ `10–20`/min. Limits may change without notice.
* Attempting a 15-request burst of `/v2/versions` in a tight loop did **not** produce a 429 from this single IP (Cloudflare tolerates short bursts). Do not take that as a budget.
* **A descriptive, non-browser `User-Agent` is required by policy**: *"Every application should use a dedicated and descriptive `User-Agent` header… Do not disguise your application as a regular browser."* Example given: `User-Agent: ExampleMarketTool/1.2.0 (+https://example.com/contact)`. Applications that hide identity or impersonate browsers "may be blocked". (Note the irony for a *browser* client: the `User-Agent` cannot be overridden from JS, and browsers forbid amending it. This is a strong argument for a server-side proxy — see §6.)
* No documented `Retry-After` header, no documented per-IP quota number. **UNVERIFIED:** the `429` body/headers (could not trigger).

### Global headers

| Header | Values | Default | Where it applies |
| --- | --- | --- | --- |
| `Language` | `ko, ru, de, fr, pt, zh-hans, zh-hant, es, it, pl, uk, tr, ja, en` | `en` | i18n-aware endpoints |
| `Platform` | `pc, ps4, xbox, switch, mobile` | `pc` | orders / platform-aware endpoints |
| `Crossplay` | `true` / `false` | `false` | crossplay-aware endpoints |

Verified live: `Language: ko` on `/v2/item/frost_prime_set` returned `i18n` keyed `["en","ko"]` (English always retained). `Platform: ps4` on `/v2/orders/item/frost_prime_set/top` changed the book (sells `100,105,200,200`, **empty buys**) vs PC (`77,78,78,78,79`). `Crossplay: true` added one extra crossplay buy order.

---

## 6. CORS — **verdict: a browser app CANNOT call this API cross-origin. Use a proxy/backend.**

Tested with `curl` on 2026-10-03, identical for `/v2/items`, `/v2/orders/item/{slug}/top`, and `/v1/tools/ducats`:

| `Origin` sent | `Access-Control-Allow-Origin` returned |
| --- | --- |
| *(none)* | **absent** |
| `http://localhost:5173` | **absent** |
| `http://localhost:3000` | **absent** |
| `https://example.com` | **absent** |
| `null` | **absent** |
| `https://warframe.market` | `https://warframe.market` (+ methods/headers/credentials, see below) |
| `https://stats.warframe.market` | `https://stats.warframe.market` |
| `https://evil.warframe.market` | `https://evil.warframe.market` |
| `https://forum.warframe.market` | `https://forum.warframe.market` |

So the server an origin-allowlist gate of the form **`*.warframe.market`** (any subdomain depth). For an allow-listed origin it additionally sends:

```
access-control-allow-origin: https://warframe.market      # echoes the origin, not "*"
access-control-allow-methods: GET, POST, OPTIONS, DELETE, PUT, PATCH
access-control-allow-credentials: true
access-control-allow-headers: User-Agent,Keep-Alive,Content-Type,Accept,DNT,If-Modified-Since,Cache-Control,Language,Platform,Crossplay,Set-Cookie,X-CSRFToken,Authorization,auth_type,sentry-trace,baggage
access-control-expose-headers: Authorization
```

Raw header dump for a **third-party** origin (note: only `vary: accept-encoding`, nothing else):

```
$ curl -i -H 'Origin: http://localhost:5173' https://api.warframe.market/v2/items
HTTP/2 200
content-type: application/json
cf-cache-status: DYNAMIC
vary: accept-encoding
```

Preflight is also a dead end:

```
$ curl -i -X OPTIONS -H 'Origin: http://localhost:5173' \
       -H 'Access-Control-Request-Method: GET' \
       -H 'Access-Control-Request-Headers: authorization' \
       https://api.warframe.market/v2/items
HTTP/2 405
allow: GET
```

**Consequences for a Vite/React app:**

1. A plain `fetch('https://api.warframe.market/v2/items')` from `http://localhost:5173` (or any non-`*.warframe.market` production origin) will complete at the network level but **the browser will refuse to expose the body** — no `Access-Control-Allow-Origin`. `TypeError: Failed to fetch`.
2. Even if you added the allowed origin, sending `Language`/`Platform`/`Crossplay` (not CORS-safelisted) would need a preflight, which returns **405**.
3. `User-Agent` (which the API's own rules require you to set to a *non-browser*-looking value) is a **forbidden header name** in `fetch`/`XHR` — a browser literally cannot comply. A proxy is also the only way to satisfy the User-Agent rule.

**Verdict: proxy required.** Put the warframe.market calls behind a small server route (Node/Bun/Cloudflare Worker/Vite dev proxy) that adds `User-Agent`, applies per-endpoint TTL caching, and enforces a ≤3 req/s budget in one place. Do **not** ship a public client that hits `api.warframe.market` directly, and do not build a CORS-bypass proxy that mirrors the whole API (the rules explicitly forbid website clones / mirrors).

**`api.warframe.market` vs `docs.warframe.market`:** the two hosts serve different jobs, and *both* sit behind Cloudflare. `api.warframe.market` answers the REST calls above with the CORS behaviour in the table. `docs.warframe.market` (and `warframe.market/api_docs`) is **Cloudflare bot-challenge protected** — `curl` with a normal or browser-like User-Agent gets `HTTP 403` with `cf-mitigated: challenge` / `<title>Just a moment...` and no CORS headers at all. It is a human-facing docs site, not an API host; fetch its content through a renderer (e.g. the Exa reader) or read the source repo (§8). It applies the same `*.warframe.market` origin gate as `api.warframe.market` for its origin — but the docs content itself is fetched via a proxy for a different reason (bot challenge), not CORS.

---

## 7. Mapping a display name → warframe.market item

### The good news: it is a solved, near-100 % problem

Measured against this repo's own generated dataset (`src/data/relics.ts`, 596 reward names, 591 with a market link) on 2026-10-03:

* **596/596 reward names are unique**, and **`/v2/items` has 3892 items with 3892 distinct `i18n.en.name` — zero duplicate display names** (case-sensitive). A `Map<name, item>` built from the v2 list is therefore collision-free today.
* **591/596** reward display names match a v2 `i18n.en.name` **exactly**.
* **590/591** stored `urlName`s resolve to a v2 `slug`, with **0 `id` mismatches**.
* **100 % ducat agreement**: for every reward that has both a local `ducats` value and a v2 `ducats`, the numbers are identical (0 disagreements).

### The five misses (all non-ducat, all expected)

`1200X Kuva`, `2X Forma Blueprint`, `Exilus Weapon Adapter Blueprint`, `Forma Blueprint`, `Riven Sliver`. These are **not items in `/v2/items` at all** — `GET /v2/item/forma_blueprint`, `/forma`, `/orokin_catalyst_blueprint`, `/orokin_reactor_blueprint`, `/exilus_warframe_adapter_blueprint` all return `404 {"error":{"request":["app.item.notFound"]}}`. They carry `ducats: null` locally, so a ducat tally is unaffected — but a "sell it for plat" column must special-case them (they're consumables, not tradable prime parts in this API).

### Recommended mapping strategy (in priority order)

1. **Use the v2 `id` as the primary key.** It is stable, it is what the v1 ducats feed and `setParts[]`/`Order.itemId` use, and in this repo the stored market `id` was **correct 591/591 times** even where the slug was wrong. Build `itemsById` from `/v2/items`.
2. **Fall back to `slug`** (a.k.a. v1 `url_name`) — identical strings — when you only have a URL. `https://warframe.market/items/<slug>` round-trips.
3. **Last resort: exact `i18n.en.name` lookup** (lower-cased + trimmed). It works 591/596 here and is unambiguous because names are unique. Prefer `id`/`slug` so you never depend on name uniqueness holding in future releases.

### Edge cases to handle

* **Set roots vs parts.** `Set` items are separate items (`frost_prime_set`, `ducats: 175 = Σ parts`). A relic reward is never a set, so **filter `tags.includes("set")` / `setRoot === true` out of reward lookups**, and never surface a set's `ducats` as a part value. 163 of the 175 v2-ducat items missing from this repo's reward list are exactly these `*_set` items.
* **`Blueprint` suffix.** Prime **Warframe** components exist only in blueprint form here: `frost_prime_systems_blueprint` exists, **`frost_prime_systems` does not** (the API still *resolves* the short form, returning the blueprint). Prime weapon parts are parts without a `blueprint` suffix for each component (`corufell_prime_stock`) plus a whole-weapon `…_blueprint`. So don't synthesise a name by stripping/adding "Blueprint" — join on `id`/`slug`. Also note the WFCD upstream data maps `Neuroptics → "Helmet"` (`Frost Prime Helmet` is *not* a v2 name; the v2 name is `Frost Prime Neuroptics Blueprint`), another reason not to name-guess.
* **Relics themselves are items.** `tags: ["relic","axi"]`, `vaulted`, `subtypes: ["intact","exceptional","flawless","radiant"]`, **no `ducats`**. Relics are tradable but not ducat-convertible; exclude them from both the ducat sum and (unless you want it) the plat column.
* **Ranked / charged items.** Mods/arcanes carry `maxRank`; sculptures carry `maxAmberStars`/`maxCyanStars`/`baseEndo`/`endoMultiplier`; riven mods carry `subtypes`. Price filters are `rank`/`rankLt`, `charges`/`chargesLt`, `amberStars`/`amberStarsLt`, `cyanStars`/`cyanStarsLt`, `subtype`. A relic app can ignore these, but if a future "sell my extra arcanes" screen appears, pass `rankLt: 1` for rank-0 pricing.
* **Typo in the upstream slug (found in this repo's data).** `"Kompressa Prime Receiver"` is stored with `urlName: "kompressa_prime_reciever"` (sic) — that slug 404s. Its `id` (`682dfb8835715d4f3e9c64f6`) **is** correct and resolves to v2 `kompressa_prime_receiver`. **This is the concrete argument for joining on `id`, not `slug`/`urlName`.**
* **i18n.** `i18n.en` is always present; requesting `Language: xx` adds `i18n.xx` alongside it. So always read `i18n.en.name` for a display-name join even when localising the UI.

---

## 8. Official docs / spec / changelog

Canonical, first-party:

* **`https://docs.warframe.market/`** — the official public documentation (HTTP API, OAuth 2.0, WebSockets, data models, rules). Pages live under `/docs/...` (e.g. `https://docs.warframe.market/docs/rules/overview`, `/docs/api/overview`). **Cloudflare-challenge protected to non-browser clients** (403 + `cf-mitigated: challenge`).
* **`https://warframe.market/api_docs`** — the in-app API-docs entry point referenced by the older WFCD spec's deprecation notice.
* **Source of the docs site: `https://github.com/42bytes-team/wfm-docs`** ("WFM dev portal", default branch `master`). This is where you can read the docs *without* Cloudflare: `docs/api/overview.mdx`, `docs/api/orders.mdx`, `docs/api/manifests.mdx`, `docs/api/authentication.mdx`, `docs/data-models.mdx`, `docs/rules/overview.md`, `docs/oauth/overview.md`, `docs/websockets/*`. Raw-file reads (e.g. `https://raw.githubusercontent.com/42bytes-team/wfm-docs/master/docs/api/overview.mdx`) worked throughout this research.
* **No official OpenAPI/Swagger file is published.** `https://api.warframe.market/openapi.json`, `/swagger`, `/swagger.json`, `/api/docs` all 404. **UNVERIFIED:** whether an official spec is planned.
* **No official API changelog page found.** The docs repo itself is the closest thing (`apiVersion` in every response — currently `0.25.0` — is the version signal).
* **No official warframe.market GitHub organisation** (`github.com/warframe-market` → 404; no such org/user). The docs and the mobile apps are community/42bytes-maintained.

Third-party, useful, **not authoritative**:

* `https://github.com/WFCD/market-api-spec` — the old WFCD OpenAPI spec for **v1**. Its README now opens with *"This repo won't be updated anymore, as Warframe.Market… finally published their own!"* — treat as historical v1 reference only.
* `https://github.com/KibbeWater/wfm-openapi` → rendered spec at `https://kibbewater.github.io/wfm-openapi/openapi.json` (title `warframe.market API 0.21.2`). Currently the most complete **v2 route listing** available without the bot-challenged docs site, but it lags the live server (it lists `/v1/items/{slug}/statistics` and some `/v2/orders*` routes, and omits `/v1/tools/ducats`) and is community-maintained.
* `https://42bytes.notion.site/WFM-Api-v2-Documentation-5d987e4aa2f74b55a80db1a09932459d` — 42bytes' v2 notes (describes `v0.23.0`); historically the de-facto v2 doc before `docs.warframe.market` existed.
* `https://github.com/WFCD/warframe-nexus-query` — reference consumer (v1 + v2 clients, caching, statistics helpers).
* Older v1 swagger: `https://github.com/42bytes-team/wfm-api-docs` (**404 / gone** as of 2026-10-03, retained here only because it is still widely linked).

---

## 9. Caching TTL guidance

There are **no `Cache-Control`/`ETag`/`Last-Modified` headers** on any of the probed endpoints (all `cf-cache-status: DYNAMIC`), so there is no HTTP-level cache to lean on — the client must own the TTL. The official rule is qualitative only: *"Use caching, reuse responses, avoid tight polling loops… Do not repeatedly fetch large collections or high-traffic endpoints when local caching would work."*

**The official cache-invalidation primitive is `GET /v2/versions`** — docs: *"Clients can poll this endpoint to detect when local cached collections should be refreshed."* Live response:

```jsonc
{ "apiVersion": "0.25.0",
  "data": { "id": "…", "apps": { "ios": "0.0.1", "android": "0.0.1", "minIos": "", "minAndroid": "" },
            "collections": { "items": "MjAyNi0xMC0wMlQyMDoyNjozNA==",   // base64 → "2026-10-02T20:26:34"
                             "rivens": "…", "liches": "…", "sisters": "…",
                             "missions": "…", "npcs": "…", "locations": "…" },
            "updatedAt": "2026-10-02T20:26:34Z" },
  "error": null }
```

Each `collections.*` value is a base64-encoded timestamp; when `collections.items` changes, re-fetch `/v2/items`. For the whole item list that is a **1.6 MB fetch, so gate it behind the version hash rather than a timer**.

Observed practice (real consumers, primary source):

| Consumer | Items list | Orders / prices |
| --- | --- | --- |
| `WFCD/warframe-nexus-query` (`lib/market/v2/constants.js`) | `CACHE_TTL = 1h` fallback, invalidated by a **5-minute `/v2/versions` poll** (`VERSION_CHECK_INTERVAL = 5*60*1000`) | `SHORT_CACHE_TTL = 1min` |
| `modelrockettier/wfmk` CLI | `--ttl-items` default **1 day** | `--ttl-orders` default **10 min**; `--rate-limit` default 180 req/min |
| `KibbeWater/wf-market` (Rust) | "uses cached items if < **1 day** old" | – |
| `oanor.com` third-party wrapper | items cached **~1 h** | orders cached **~4 min** |

### Recommended for this app

| Data | TTL | Mechanism |
| --- | --- | --- |
| `/v2/items` (ducat values, names, slugs, ids) | **24 h**, invalidated early by `/v2/versions` `collections.items` | server-side, persisted (localStorage/IndexedDB on the proxy or a KV) |
| `/v2/versions` | **5–15 min** | cheap (small), poll-only |
| `/v2/orders/item/{slug}/top` | **1–5 min**, per slug | server-side cache + ≤3 req/s global budget |
| `/v1/tools/ducats` | **≥ 1 h** and only once per session | it is a whole-market snapshot that only changes hourly; there is no incremental variant |

**Is hammering `/v1/tools/ducats` discouraged?** Yes — three ways over. (a) It is a 531 KB response the server regenerates hourly; refetching it more often than hourly can only ever return identical data, and the rules say *"Do not repeatedly fetch large collections or high-traffic endpoints when local caching would work."* (b) The global limit is **3 req/s**, so it competes with your price calls. (c) It is an **undocumented v1** endpoint on a server whose docs say the v1 API is "deprecated and unsupported" — the safest integration is to treat `/v2/items` (`ducats`) as the source of truth for values and treat the v1 feed as an optional, long-TTL extra. If you only need values, **do not call it at all**.

---

## Sources

### Live endpoints probed (2026-10-03)
- `https://api.warframe.market/v1/tools/ducats`
- `https://api.warframe.market/v2/items`
- `https://api.warframe.market/v2/item/frost_prime_set`
- `https://api.warframe.market/v2/item/frost_prime_set/set`
- `https://api.warframe.market/v2/items/frost_prime_set` (undocumented alias, verified)
- `https://api.warframe.market/v2/itemId/{itemId}` (documented alias)
- `https://api.warframe.market/v2/orders/item/frost_prime_set`
- `https://api.warframe.market/v2/orders/item/frost_prime_set/top`
- `https://api.warframe.market/v2/orders/recent`
- `https://api.warframe.market/v2/versions`
- `https://api.warframe.market/v1/items/frost_prime_set/statistics`
- `https://api.warframe.market/v1/items/frost_prime_set/orders` (403 `Deprecated`)
- `https://api.warframe.market/v2/tools/ducats`, `/v2/tools`, `/v2/ducats` (404)

### Official warframe.market documentation
- https://docs.warframe.market/
- https://docs.warframe.market/docs/api/overview
- https://docs.warframe.market/docs/api/orders
- https://docs.warframe.market/docs/data-models
- https://docs.warframe.market/docs/rules/overview
- https://docs.warframe.market/docs/oauth/overview
- https://warframe.market/api_docs
- https://raw.githubusercontent.com/42bytes-team/wfm-docs/master/docs/api/overview.mdx
- https://raw.githubusercontent.com/42bytes-team/wfm-docs/master/docs/api/orders.mdx
- https://raw.githubusercontent.com/42bytes-team/wfm-docs/master/docs/api/manifests.mdx
- https://raw.githubusercontent.com/42bytes-team/wfm-docs/master/docs/api/authentication.mdx
- https://raw.githubusercontent.com/42bytes-team/wfm-docs/master/docs/data-models.mdx
- https://raw.githubusercontent.com/42bytes-team/wfm-docs/master/docs/rules/overview.md
- https://raw.githubusercontent.com/42bytes-team/wfm-docs/master/docs/intro.md
- https://github.com/42bytes-team/wfm-docs

### Specs, clients & consumer evidence
- https://github.com/WFCD/market-api-spec (deprecated v1 spec)
- https://wfcd.github.io/market-api-spec/
- https://github.com/WFCD/warframe-nexus-query
- https://wfcd.github.io/warframe-nexus-query/
- https://wfcd.github.io/warframe-nexus-query/market_v2_MarketFetcherV2.js.html
- https://raw.githubusercontent.com/WFCD/warframe-nexus-query/master/lib/market/v2/constants.js
- https://raw.githubusercontent.com/WFCD/warframe-nexus-query/master/lib/market/v2/utils/cache.js
- https://github.com/KibbeWater/wfm-openapi
- https://kibbewater.github.io/wfm-openapi/openapi.json
- https://github.com/KibbeWater/wf-market/blob/main/CHANGELOG.md
- https://docs.rs/wf-market/latest/wf_market/
- https://github.com/modelrockettier/wfmk
- https://42bytes.notion.site/WFM-Api-v2-Documentation-5d987e4aa2f74b55a80db1a09932459d

### CORS probes
- `curl -i -H 'Origin: http://localhost:5173' https://api.warframe.market/v2/items`
- `curl -i -H 'Origin: http://localhost:5173' https://api.warframe.market/v1/tools/ducats`
- `curl -i -X OPTIONS -H 'Origin: http://localhost:5173' -H 'Access-Control-Request-Method: GET' https://api.warframe.market/v2/items`
- `curl -i -H 'Origin: https://warframe.market' https://api.warframe.market/v2/items`
