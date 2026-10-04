/**
 * Build-time market snapshot pipeline.
 *
 * Fetches warframe.market's `/v1/tools/ducats` aggregate, joins it to the
 * relic-reward items already emitted by `build-relics-data.ts` (by
 * `ITEMS[name].market.id`), and rewrites `src/data/market.ts` with a per-item
 * platinum snapshot: the "warframe.market price" (`wa_price`), the trade
 * median, 48h trade volume, and the item slug.
 *
 * The v1 feed carries no slug, so `/v2/items` is fetched as well purely as a
 * name-free `id -> slug` bridge (the ids themselves act as the validation:
 * every relic-reward id must resolve there or the build fails).
 *
 * This fetch path is intentionally **fresh-only**: unlike the relic pipeline
 * there is no stale-cache fallback, because `MARKET_GENERATED_AT` is the build
 * wall-clock (see docs/adr/0002-market-snapshot-timestamp-is-build-wall-clock.md)
 * and re-stamping data of unknown age would turn it into an unbounded lie.
 * If the fetch fails past the TTL, the last committed snapshot is left
 * untouched (stamp intact, UI staleness warning stays truthful) and the
 * script warns and exits 0.
 *
 * Raw downloads are cached under `node_modules/.cache/warframe-market/` for
 * 24h so repeated builds are fast. Override with:
 *   MARKET_DATA_REFRESH=1   force a refetch (ignores the cache entirely)
 *   MARKET_DATA_TTL_MS=...  cache lifetime in ms (0 disables the TTL)
 *
 * Requests carry a descriptive, versioned `User-Agent` (see
 * scripts/lib/user-agent.ts), as warframe.market's API rules require. Any
 * non-2xx response — rate limiting (`429`) and capacity (`509`) included —
 * counts as a fetch failure and therefore never rewrites the file.
 *
 * Run with: bun scripts/build-market-data.ts
 *
 * Data belongs to warframe.market; game content (c) Digital Extremes Ltd. and
 * is covered by their non-commercial fan-use terms.
 */
import { existsSync } from "node:fs"
import { mkdir, readFile, stat, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { ITEMS } from "../src/data/relics"
import { USER_AGENT } from "./lib/user-agent"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const CACHE_DIR = path.join(ROOT, "node_modules", ".cache", "warframe-market")
const OUT_FILE = path.join(ROOT, "src", "data", "market.ts")

const TTL_MS = Number(process.env.MARKET_DATA_TTL_MS ?? 24 * 60 * 60 * 1000)
const FORCE_REFRESH = process.env.MARKET_DATA_REFRESH === "1"

const DUCATS_URL = "https://api.warframe.market/v1/tools/ducats"
const ITEMS_URL = "https://api.warframe.market/v2/items"

// ---------------------------------------------------------------------------
// Raw source shapes (only the fields we consume)
// ---------------------------------------------------------------------------

interface RawDucatRow {
  /** warframe.market item id, shared with `RelicMarketInfo.id`. */
  item: string
  /** "warframe.market price" in platinum. */
  wa_price: number
  /** 48h trade median ask, in platinum. */
  median: number
  /** 48h completed trade count. */
  volume: number
}

interface RawDucats {
  payload: {
    previous_day: RawDucatRow[]
  }
}

interface RawV2Item {
  id: string
  slug: string
}

interface RawV2Items {
  data: RawV2Item[]
}

// ---------------------------------------------------------------------------
// Fetch + cache (fresh-only: a stale cache is a hard error, see header)
// ---------------------------------------------------------------------------

/**
 * Cached fetch that never serves data older than the TTL: within the TTL the
 * cache answers, past it the network must, and if neither can, the build fails
 * loudly. Unlike the relic pipeline's `fetchCached`, a stale cache is *not* a
 * fallback — `MARKET_GENERATED_AT` is build wall-clock (see ADR 0002), so
 * re-stamping data of unknown age would silently widen the lie the 72h
 * staleness warning is calibrated around.
 */
async function fetchFresh<T>(url: string, cacheName: string): Promise<T> {
  const cachePath = path.join(CACHE_DIR, cacheName)

  if (!FORCE_REFRESH) {
    try {
      const info = await stat(cachePath)
      if (TTL_MS > 0 && Date.now() - info.mtimeMs < TTL_MS) {
        return JSON.parse(await readFile(cachePath, "utf8")) as T
      }
    } catch {
      // no cache yet — fetch as normal
    }
  }

  try {
    const res = await fetch(url, {
      headers: { "user-agent": USER_AGENT },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)
    const text = await res.text()
    await mkdir(CACHE_DIR, { recursive: true })
    await writeFile(cachePath, text)
    return JSON.parse(text) as T
  } catch (error) {
    throw new Error(
      `[market] fresh fetch of ${url} failed (${
        error instanceof Error ? error.message : String(error)
      }). Not falling back to the (possibly stale) cache at ` +
        `${path.relative(ROOT, cachePath)}: \`MARKET_GENERATED_AT\` is build ` +
        "wall-clock, so old data must not be re-stamped " +
        "(docs/adr/0002-market-snapshot-timestamp-is-build-wall-clock.md). " +
        "Re-run with network access, or set MARKET_DATA_REFRESH=1 / " +
        "MARKET_DATA_TTL_MS=0.",
      { cause: error }
    )
  }
}

// ---------------------------------------------------------------------------
// Failure policy (fresh-only, see header + ADR-0002)
// ---------------------------------------------------------------------------

/**
 * The fetch failed and no within-TTL cache could answer. Do **not** write
 * `market.ts`: the committed snapshot keeps its genuine wall-clock stamp, so
 * the 72h staleness warning in the UI keeps telling the truth. Warn and exit
 * 0 — a stale-but-honest snapshot is a normal degraded state (CI, flaky
 * network), not a build failure.
 *
 * Only when no snapshot exists at all (first generation, nothing committed)
 * is there nothing to protect — the app cannot build without it, so that
 * fails loudly with exit 1.
 */
function giveUp(error: unknown): never {
  const reason = error instanceof Error ? error.message : String(error)
  if (existsSync(OUT_FILE)) {
    console.warn(
      `[market] fresh fetch failed (${reason}). Leaving the existing ` +
        `${path.relative(ROOT, OUT_FILE)} untouched so its build stamp stays ` +
        "honest and the 72h staleness warning keeps working " +
        "(docs/adr/0002-market-snapshot-timestamp-is-build-wall-clock.md). " +
        "Re-run with network access to refresh."
    )
    process.exit(0)
  }
  console.error(
    `[market] fresh fetch failed (${reason}) and no committed snapshot ` +
      `exists at ${path.relative(ROOT, OUT_FILE)} to keep — cannot generate ` +
      "market data."
  )
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

async function main() {
  const startedAt = Date.now()

  let ducatsRaw: RawDucats
  let itemsRaw: RawV2Items
  try {
    const [d, i] = await Promise.all([
      fetchFresh<RawDucats>(DUCATS_URL, "ducats-v1.json"),
      fetchFresh<RawV2Items>(ITEMS_URL, "items-v2.json"),
    ])
    ducatsRaw = d
    itemsRaw = i
  } catch (error) {
    giveUp(error)
  }

  const slugById = new Map(itemsRaw.data.map((item) => [item.id, item.slug]))

  const rowByItemId = new Map<string, RawDucatRow>()
  for (const row of ducatsRaw.payload.previous_day) {
    rowByItemId.set(row.item, row) // duplicate ids keep their last row
  }

  const MARKET: Record<
    string,
    { median: number; slug: string; volume: number; waPrice: number }
  > = {}

  for (const item of Object.values(ITEMS)) {
    const id = item.market?.id
    if (!id) continue
    const row = rowByItemId.get(id)
    if (!row) continue
    const slug = slugById.get(id)
    if (!slug) continue
    MARKET[id] = {
      median: row.median,
      slug,
      volume: row.volume,
      waPrice: row.wa_price,
    }
  }

  const matched = Object.keys(MARKET).length
  if (matched === 0) {
    throw new Error(
      "[market] no feed row matched a relic-reward item — the id join broke upstream"
    )
  }

  // ---------------------------------------------------------------------------
  // Fodder reference rate (sell-vs-burn verdict baseline)
  // ---------------------------------------------------------------------------

  /**
   * `R`, the nearest-rank p90 of `ducats / waPrice` across the relic-reward
   * pool: an item whose ducats-per-platinum sits above the 90th percentile
   * converts its plat income into ducats better than ~90% of the pool, i.e. its
   * market price is bad relative to its fodder value — burn it.
   *
   * The pool is the relic-reward items only (what `ITEMS` emits), never the full
   * 757-row ducats feed: set roots report the sum of their parts' ducats and
   * would contaminate the rate. Items without ducats ( Forma, Requiem mods, … )
   * can't burn, so they're excluded too. Only `volume >= 5` rows qualify — the
   * same gate the verdict badge uses.
   *
   * An empty pool (degraded feed) yields `R = null`, which suppresses every
   * verdict in the UI instead of inventing a baseline.
   */
  const fodderRatios: number[] = []
  for (const item of Object.values(ITEMS)) {
    const id = item.market?.id
    const ducats = item.ducats
    if (!id || ducats === null) continue
    const snapshot = MARKET[id]
    if (!snapshot || snapshot.volume < 5 || snapshot.waPrice <= 0) continue
    fodderRatios.push(ducats / snapshot.waPrice)
  }
  fodderRatios.sort((a, b) => a - b)
  const rateIndex = Math.ceil(0.9 * fodderRatios.length) - 1
  const MARKET_FODDER_RATE: number | null =
    rateIndex >= 0 ? Math.round(fodderRatios[rateIndex] * 100) / 100 : null

  // ---------------------------------------------------------------------------
  // Emit
  // ---------------------------------------------------------------------------

  const GENERATED_AT = new Date().toISOString()

  const header = `// AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
// Regenerate with: bun run data:market
// Generated: ${GENERATED_AT}
//
// Sources: warframe.market /v1/tools/ducats (previous_day split) and /v2/items
// (id -> slug). Data belongs to warframe.market; game content © Digital
// Extremes Ltd. Non-commercial fan use only.

export interface MarketSnapshot {
  /** 48h trade median ask, in platinum. */
  median: number
  /** warframe.market item slug, for deep links. */
  slug: string
  /** 48h completed trade count. */
  volume: number
  /** "warframe.market price" in platinum (the sell-vs-burn income figure). */
  waPrice: number
}

/** warframe.market item id -> snapshot, for the relic-reward items only. */
export const MARKET: Record<string, MarketSnapshot> = ${JSON.stringify(MARKET, null, 2)}

/** ISO timestamp of the last market data regeneration (build wall-clock). */
export const MARKET_GENERATED_AT = ${JSON.stringify(GENERATED_AT)}

/**
 * Fodder reference rate \`R\`: nearest-rank p90 of ducats / waPrice over
 * relic-reward items with volume >= 5, in ducats per platinum (2 dp). An
 * item's d/p above this means its market price is poor relative to its
 * ducat value — burn instead of sell. \`null\` when the qualifying pool is
 * empty (degraded feed); suppresses all verdicts.
 */
export const MARKET_FODDER_RATE: number | null = ${JSON.stringify(MARKET_FODDER_RATE)}
`

  await writeFile(OUT_FILE, header)
  console.log(
    `[market] wrote ${matched} snapshots to ${path.relative(ROOT, OUT_FILE)} ` +
      `in ${Date.now() - startedAt}ms (${GENERATED_AT})`
  )
  console.log(
    `[market] fodder rate: ${MARKET_FODDER_RATE} d/p ` +
      `(p90 over ${fodderRatios.length} relic-reward items with volume >= 5)`
  )
}

main().catch((error) => {
  console.error("[market] failed:", error)
  process.exitCode = 1
})
