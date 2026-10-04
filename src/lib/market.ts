import { ITEMS } from "@/data/relics"
import {
  MARKET,
  MARKET_FODDER_RATE,
  MARKET_GENERATED_AT,
  type MarketSnapshot,
} from "@/data/market"

/**
 * Age after which the committed snapshot is treated as stale. Calibrated
 * around the feed's previous-day split (~48h optimistic at build wall-clock,
 * see docs/adr/0002-market-snapshot-timestamp-is-build-wall-clock.md).
 */
const MARKET_STALE_AFTER_MS = 72 * 60 * 60 * 1000

/** Market snapshot for an item, or `null` when it isn't tracked. */
export function marketFor(name: string): MarketSnapshot | null {
  return MARKET[ITEMS[name]?.market?.id ?? ""] ?? null
}

/**
 * Ducats per platinum for an item: the "how much fodder value am I giving up
 * to sell for plat" ratio, derived on the fly from `ITEMS[name].ducats` (never
 * stored in the snapshot). `null` when not derivable: no ducats (consumable),
 * no market row, or a zero price.
 */
export function ducatsPerPlat(name: string): number | null {
  const ducats = ITEMS[name]?.ducats
  const waPrice = marketFor(name)?.waPrice
  if (ducats == null || waPrice == null || waPrice <= 0) return null
  return ducats / waPrice
}

export type MarketVerdict = "sell" | "burn"

/**
 * The sell-vs-burn answer for an item, or `null` when no verdict is possible:
 * no d/p, no fodder rate (`MARKET_FODDER_RATE === null`, degraded feed), or a
 * thin market (`volume < 5`) — never badge on data that thin.
 *
 * Above the rate → **burn** (its ducat value beats its market price); at or
 * below → **sell**.
 */
export function verdictFor(name: string): MarketVerdict | null {
  if (MARKET_FODDER_RATE === null) return null
  const snapshot = marketFor(name)
  if (!snapshot || snapshot.volume < 5) return null
  const ratio = ducatsPerPlat(name)
  if (ratio === null) return null
  return ratio > MARKET_FODDER_RATE ? "burn" : "sell"
}

/**
 * True when the committed snapshot is older than the 72h staleness window:
 * the previous-day feed plus build wall-clock can be ~48h stale at birth, so
 * 72h is the honest "this is a lie now" threshold (ADR-0002).
 */
export function isMarketStale(now: number = Date.now()): boolean {
  const generatedAt = Date.parse(MARKET_GENERATED_AT)
  if (Number.isNaN(generatedAt)) return true
  return now - generatedAt > MARKET_STALE_AFTER_MS
}

/**
 * Whole days since the snapshot was built, for provenance text. Negative or
 * unparseable stamps read as `0` (staleness itself is `isMarketStale`'s job).
 */
export function marketAgeDays(now: number = Date.now()): number {
  const generatedAt = Date.parse(MARKET_GENERATED_AT)
  if (Number.isNaN(generatedAt)) return 0
  return Math.max(0, Math.floor((now - generatedAt) / 86400000))
}
