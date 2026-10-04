/**
 * Build-time data pipeline for the relic tool.
 *
 * Fetches the two community-maintained machine-readable sources that mirror
 * Digital Extremes' official drop tables, joins them, and emits a single typed
 * module at `src/data/relics.ts`.
 *
 *   - WFCD/warframe-drop-data  `data/relics.json`
 *       per-relic, per-refinement reward tables (item name, rarity, chance).
 *       Parsed from DE's official drop tables (no datamining).
 *
 *   - WFCD/warframe-items      `data/json/Relics.json` + equipment files
 *       relic `vaulted` flags, reward identity (uniqueName, warframe.market),
 *       and per-component `ducats` values.
 *
 *   - warframe.market          `/v2/items` (fallback ducat source)
 *       warframe-items stopped scraping ducats upstream (2026-10), so ducat
 *       values now come from the v2 items' documented `ducats` field, joined
 *       by the `warframeMarket.id` already carried on relic rewards. Per the
 *       research (docs/research/warframe-market-api.md §2/§4.1) the v2 field
 *       matches the wiki ducat table exactly; set roots (which report the sum
 *       of their parts) are never relic rewards, so they can't leak in.
 *
 * Raw downloads are cached under `node_modules/.cache/warframe-relics/` for 24h
 * so repeated builds are fast and work offline. Override with:
 *   RELIC_DATA_REFRESH=1   force a refetch
 *   RELIC_DATA_TTL_MS=...  cache lifetime in ms (0 disables the TTL)
 *
 * Run with: bun scripts/build-relics-data.ts
 *
 * Data is MIT-licensed by WFCD. Game content (c) Digital Extremes Ltd. and is
 * covered by their non-commercial fan-use terms.
 */
import { mkdir, readFile, stat, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { USER_AGENT } from "./lib/user-agent"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const CACHE_DIR = path.join(ROOT, "node_modules", ".cache", "warframe-relics")
const OUT_FILE = path.join(ROOT, "src", "data", "relics.ts")

const TTL_MS = Number(process.env.RELIC_DATA_TTL_MS ?? 24 * 60 * 60 * 1000)
const FORCE_REFRESH = process.env.RELIC_DATA_REFRESH === "1"

const DROP_DATA_URL =
  "https://raw.githubusercontent.com/WFCD/warframe-drop-data/master/data/relics.json"
const WFI_BASE =
  "https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json"
const WFM_ITEMS_URL = "https://api.warframe.market/v2/items"
const WFI_RELICS_FILE = "Relics"
/** Equipment categories that can carry prime parts / ducat values. */
const WFI_ITEM_FILES = [
  "Warframes",
  "Primary",
  "Secondary",
  "Melee",
  "Archwing",
  "Arch-Gun",
  "Arch-Melee",
  "Sentinels",
  "SentinelWeapons",
  "Pets",
]

const REFINEMENTS = ["Intact", "Exceptional", "Flawless", "Radiant"] as const
const ERA_ORDER = [
  "Lith",
  "Meso",
  "Neo",
  "Axi",
  "Requiem",
  "Vanguard",
  "Eterna",
  "Void",
] as const

// ---------------------------------------------------------------------------
// Raw source shapes (only the fields we consume)
// ---------------------------------------------------------------------------

interface RawDropReward {
  itemName: string
  rarity: string
  chance: number
}

interface RawDropRelic {
  tier: string
  relicName?: string
  state: string
  rewards: RawDropReward[]
}

interface RawWfiReward {
  chance: number
  rarity: string
  item: {
    name: string
    uniqueName: string
    warframeMarket?: { id: string; urlName: string } | null
  }
}

interface RawWfiRelic {
  name: string
  vaulted?: boolean
  rewards?: RawWfiReward[]
}

interface RawItemComponent {
  name: string
  uniqueName?: string
  ducats?: number
}

interface RawItem {
  name: string
  uniqueName: string
  ducats?: number
  components?: RawItemComponent[]
}

interface RawWfmItem {
  id: string
  /** Ducat value; absent on items that can't be sold at the kiosk. */
  ducats?: number
}

interface RawWfmItems {
  data: RawWfmItem[]
}

// ---------------------------------------------------------------------------
// Fetch + cache
// ---------------------------------------------------------------------------

async function fetchCached<T>(url: string, cacheName: string): Promise<T> {
  const cachePath = path.join(CACHE_DIR, cacheName)

  if (!FORCE_REFRESH && TTL_MS > 0) {
    try {
      const info = await stat(cachePath)
      if (Date.now() - info.mtimeMs < TTL_MS) {
        return JSON.parse(await readFile(cachePath, "utf8")) as T
      }
    } catch {
      // no cache yet
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
    // Fall back to a stale cache rather than failing the build offline.
    try {
      const text = await readFile(cachePath, "utf8")
      console.warn(
        `[relics] fetch failed for ${url} (${
          error instanceof Error ? error.message : String(error)
        }); using cached copy`
      )
      return JSON.parse(text) as T
    } catch {
      throw error
    }
  }
}

// ---------------------------------------------------------------------------
// Join helpers
// ---------------------------------------------------------------------------

/** Turn an all-caps multi-letter name (`ETERNA`) into title case, leave `A1`/`I`. */
function normalizeRelicName(raw: string): string {
  const trimmed = raw.trim()
  if (/^[A-Z]{4,}$/.test(trimmed)) {
    return trimmed
      .slice(0, 1)
      .toUpperCase()
      .concat(trimmed.slice(1).toLowerCase())
  }
  return trimmed
}

type Rarity = "Common" | "Uncommon" | "Rare"

/**
 * The upstream `rarity` label collapses Commons into "Uncommon". Recover the
 * real tier from the chance ordering of a single refinement table: the highest
 * chance group is Common, the middle is Uncommon, the lowest is Rare.
 *
 * Only the Intact table is safe to rank this way — at Radiant the Uncommon
 * chance (20%) is *higher* than the Common chance (16.67%), which would invert
 * the labels. Callers therefore derive the mapping once from Intact and apply
 * it to every refinement so a given item keeps one rarity across all states.
 */
function deriveRarityByItem(rewards: RawDropReward[]): Map<string, Rarity> {
  const distinct = [...new Set(rewards.map((r) => r.chance))].sort(
    (a, b) => b - a
  )
  const labelFor = (chance: number): Rarity => {
    if (distinct.length === 1) {
      const source = rewards[0]?.rarity?.toLowerCase()
      return source === "rare"
        ? "Rare"
        : source === "uncommon"
          ? "Uncommon"
          : "Common"
    }
    const rank = distinct.indexOf(chance)
    if (distinct.length === 2) return rank === 0 ? "Common" : "Uncommon"
    return rank === 0 ? "Common" : rank === 1 ? "Uncommon" : "Rare"
  }
  return new Map(rewards.map((r) => [r.itemName, labelFor(r.chance)]))
}

function relicKey(era: string, name: string): string {
  return `${era} ${name}`
}

function parseWfiRelicName(fullName: string): {
  era: string
  name: string
  state: string
} | null {
  const match = fullName.match(/^(.*) (Intact|Exceptional|Flawless|Radiant)$/)
  if (!match) return null
  const withoutState = match[1]
  const state = match[2]
  const spaceIndex = withoutState.indexOf(" ")
  if (spaceIndex === -1) return null
  return {
    era: withoutState.slice(0, spaceIndex),
    name: withoutState.slice(spaceIndex + 1),
    state,
  }
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

async function loadDucatsAndMarket(): Promise<{
  ducatsByUniqueName: Map<string, number>
  ducatsByDisplayName: Map<string, number>
  ducatsByMarketId: Map<string, number>
  marketByDisplayName: Map<string, { id: string; urlName: string }>
  uniqueByDisplayName: Map<string, string>
}> {
  const ducatsByUniqueName = new Map<string, number>()
  const ducatsByDisplayName = new Map<string, number>()
  const ducatsByMarketId = new Map<string, number>()
  const marketByDisplayName = new Map<string, { id: string; urlName: string }>()
  const uniqueByDisplayName = new Map<string, string>()

  const [files, wfmItems] = await Promise.all([
    Promise.all(
      WFI_ITEM_FILES.map((file) =>
        fetchCached<RawItem[]>(`${WFI_BASE}/${file}.json`, `wfi-${file}.json`)
      )
    ),
    fetchCached<RawWfmItems>(WFM_ITEMS_URL, "wfm-items-v2.json"),
  ])

  for (const item of wfmItems.data) {
    if (typeof item.ducats === "number") {
      ducatsByMarketId.set(item.id, item.ducats)
    }
  }

  for (const items of files) {
    for (const item of items) {
      const register = (displayName: string, component: RawItemComponent) => {
        if (typeof component.ducats === "number") {
          ducatsByDisplayName.set(displayName, component.ducats)
        }
        if (component.uniqueName) {
          if (typeof component.ducats === "number") {
            ducatsByUniqueName.set(component.uniqueName, component.ducats)
          }
          if (!uniqueByDisplayName.has(displayName)) {
            uniqueByDisplayName.set(displayName, component.uniqueName)
          }
        }
      }

      for (const component of item.components ?? []) {
        const base = `${item.name} ${component.name}`
        register(base, component)
        register(`${base} Blueprint`, component)
        if (component.name === "Blueprint") {
          register(`${item.name} Blueprint`, component)
        }
        if (component.name === "Neuroptics") {
          register(`${item.name} Helmet`, component)
          register(`${item.name} Helmet Blueprint`, component)
        }
      }

      // Rare, but keep top-level ducats working if upstream ever adds them.
      if (typeof item.ducats === "number") {
        ducatsByUniqueName.set(item.uniqueName, item.ducats)
        ducatsByDisplayName.set(item.name, item.ducats)
      }
    }
  }

  return {
    ducatsByUniqueName,
    ducatsByDisplayName,
    ducatsByMarketId,
    marketByDisplayName,
    uniqueByDisplayName,
  }
}

async function main() {
  console.log("[relics] fetching drop data + warframe-items …")
  const [dropFile, wfiRelics, itemMaps] = await Promise.all([
    fetchCached<{ relics: RawDropRelic[] }>(DROP_DATA_URL, "drop-relics.json"),
    fetchCached<RawWfiRelic[]>(
      `${WFI_BASE}/${WFI_RELICS_FILE}.json`,
      `wfi-${WFI_RELICS_FILE}.json`
    ),
    loadDucatsAndMarket(),
  ])

  // Reward identity + market info from warframe-items (display names are unique).
  const wfiRewardByName = new Map<string, RawWfiReward>()
  for (const relic of wfiRelics) {
    for (const reward of relic.rewards ?? []) {
      if (!wfiRewardByName.has(reward.item.name)) {
        wfiRewardByName.set(reward.item.name, reward)
        if (reward.item.warframeMarket) {
          itemMaps.marketByDisplayName.set(
            reward.item.name,
            reward.item.warframeMarket
          )
          // warframe-items no longer scrapes ducats; fall back to the v2 feed
          // joined by the market id. Equipment-file values (if upstream ever
          // restores them) and uniqueName-resolved values win, so only fill
          // genuine gaps here.
          const feedDucats = itemMaps.ducatsByMarketId.get(
            reward.item.warframeMarket.id
          )
          if (
            typeof feedDucats === "number" &&
            !itemMaps.ducatsByDisplayName.has(reward.item.name) &&
            !itemMaps.ducatsByUniqueName.has(reward.item.uniqueName)
          ) {
            itemMaps.ducatsByDisplayName.set(reward.item.name, feedDucats)
          }
        }
        if (!itemMaps.uniqueByDisplayName.has(reward.item.name)) {
          itemMaps.uniqueByDisplayName.set(
            reward.item.name,
            reward.item.uniqueName
          )
        }
      }
    }
  }

  // Vaulted flag per relic (consistent across refinement states).
  const vaultedByRelic = new Map<string, boolean>()
  for (const relic of wfiRelics) {
    const parsed = parseWfiRelicName(relic.name)
    if (!parsed) continue
    vaultedByRelic.set(
      relicKey(parsed.era, normalizeRelicName(parsed.name)),
      Boolean(relic.vaulted)
    )
  }

  interface BuiltReward {
    item: string
    rarity: Rarity
    chance: number
  }
  interface BuiltRelic {
    name: string
    era: string
    vaulted: boolean
    tiers: Record<string, BuiltReward[]>
  }

  const items = new Map<
    string,
    { ducats: number | null; market: { id: string; urlName: string } | null }
  >()
  const missingDucats = new Set<string>()
  let skipped = 0

  // Group upstream rows (one per relic x refinement) by relic first, so the
  // rarity mapping can be derived once from Intact and reused for all states.
  const grouped = new Map<
    string,
    { era: string; name: string; entries: RawDropRelic[] }
  >()
  for (const entry of dropFile.relics) {
    const rawName = entry.relicName?.trim()
    if (!rawName || !REFINEMENTS.includes(entry.state as never)) {
      skipped++
      continue
    }
    const era = entry.tier.trim()
    const name = normalizeRelicName(rawName)
    const key = relicKey(era, name)
    const group = grouped.get(key) ?? { era, name: key, entries: [] }
    group.entries.push(entry)
    grouped.set(key, group)
  }

  const relics = new Map<string, BuiltRelic>()

  for (const { era, name, entries } of grouped.values()) {
    const presentStates = new Set(entries.map((entry) => entry.state))
    if (REFINEMENTS.some((refinement) => !presentStates.has(refinement))) {
      console.warn(
        `[relics] skipping ${name}: incomplete refinement data ` +
          `(${[...presentStates].join(", ")})`
      )
      continue
    }

    const intact =
      entries.find((entry) => entry.state === "Intact") ?? entries[0]
    const rarityByItem = deriveRarityByItem(intact.rewards)

    const relic: BuiltRelic = {
      name,
      era,
      vaulted: vaultedByRelic.get(name) ?? false,
      tiers: Object.fromEntries(REFINEMENTS.map((r) => [r, []])),
    }

    for (const entry of entries) {
      // Fall back to that state's own ranking for any item absent from Intact.
      const fallbackRarity = deriveRarityByItem(entry.rewards)
      relic.tiers[entry.state] = entry.rewards.map((reward) => {
        const displayName = reward.itemName
        const uniqueName =
          itemMaps.uniqueByDisplayName.get(displayName) ??
          wfiRewardByName.get(displayName)?.item.uniqueName
        const ducats =
          itemMaps.ducatsByDisplayName.get(displayName) ??
          (uniqueName
            ? itemMaps.ducatsByUniqueName.get(uniqueName)
            : undefined) ??
          null

        if (ducats === null && !items.has(displayName)) {
          missingDucats.add(displayName)
        }
        if (!items.has(displayName)) {
          items.set(displayName, {
            ducats,
            market: itemMaps.marketByDisplayName.get(displayName) ?? null,
          })
        }

        return {
          item: displayName,
          rarity:
            rarityByItem.get(displayName) ??
            fallbackRarity.get(displayName) ??
            "Common",
          chance: reward.chance,
        }
      })
    }

    relics.set(name, relic)
  }

  const eraRank = (era: string) => {
    const index = (ERA_ORDER as readonly string[]).indexOf(era)
    return index === -1 ? ERA_ORDER.length : index
  }

  const sortedRelics = [...relics.values()].sort(
    (a, b) =>
      eraRank(a.era) - eraRank(b.era) ||
      a.name.localeCompare(b.name, "en", { numeric: true })
  )
  for (const relic of sortedRelics) {
    for (const refinement of REFINEMENTS) {
      relic.tiers[refinement].sort(
        (a, b) => b.chance - a.chance || a.item.localeCompare(b.item)
      )
    }
  }

  const eras = [...new Set(sortedRelics.map((r) => r.era))].sort(
    (a, b) => eraRank(a) - eraRank(b) || a.localeCompare(b)
  )

  const itemEntries = [...items.entries()].sort(([a], [b]) =>
    a.localeCompare(b)
  )

  // -------------------------------------------------------------------------
  // Emit
  // -------------------------------------------------------------------------
  const quotedUnion = (values: string[]) =>
    values.map((v) => JSON.stringify(v)).join(" | ")

  const relicLines = sortedRelics
    .map((relic) => {
      const tiers = REFINEMENTS.map(
        (r) => `${JSON.stringify(r)}:${JSON.stringify(relic.tiers[r])}`
      ).join(",")
      return `  {name:${JSON.stringify(relic.name)},era:${JSON.stringify(
        relic.era
      )},vaulted:${relic.vaulted},tiers:{${tiers}}}`
    })
    .join(",\n")

  const itemLines = itemEntries
    .map(
      ([name, value]) =>
        `  ${JSON.stringify(name)}:{ducats:${JSON.stringify(
          value.ducats
        )},market:${JSON.stringify(value.market)}}`
    )
    .join(",\n")

  const renderOutput = (
    generatedAt: string
  ) => `// AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
// Regenerate with: bun run data:relics
// Generated: ${generatedAt}
//
// Sources: WFCD/warframe-drop-data + WFCD/warframe-items (MIT); ducat values
// fall back to warframe.market /v2/items. Game content © Digital Extremes Ltd.
// Non-commercial fan use only.

export type RelicEra = ${quotedUnion(eras)}
export type RelicRefinement = ${quotedUnion([...REFINEMENTS])}
export type RewardRarity = "Common" | "Uncommon" | "Rare"

export interface RelicMarketInfo {
  id: string
  urlName: string
}

export interface RelicItem {
  /** Ducat value (warframe-items, falling back to warframe.market v2 items),
   * or \`null\` when the item cannot be sold at the ducat kiosk. */
  ducats: number | null
  market: RelicMarketInfo | null
}

export interface RelicReward {
  /** Display name, also the key into {@link ITEMS}. */
  item: string
  rarity: RewardRarity
  /** Drop chance as a percentage for this refinement state. */
  chance: number
}

export interface Relic {
  /** Full display name, e.g. "Axi A1". */
  name: string
  era: RelicEra
  vaulted: boolean
  /** Reward table per refinement state. */
  tiers: Record<RelicRefinement, RelicReward[]>
}

/** ISO timestamp of the last data regeneration. */
export const DATA_GENERATED_AT = ${JSON.stringify(generatedAt)}

export const RELIC_ERAS: readonly RelicEra[] = ${JSON.stringify(eras)}

export const RELIC_REFINEMENTS: readonly RelicRefinement[] = ${JSON.stringify([
    ...REFINEMENTS,
  ])}

/** Every reward item referenced by {@link RELICS}, keyed by display name. */
export const ITEMS: Record<string, RelicItem> = {
${itemLines},
}

export const RELICS: Relic[] = [
${relicLines},
]
`

  await mkdir(path.dirname(OUT_FILE), { recursive: true })

  // Only rewrite when the data actually changed, so the committed file does
  // not churn on every build just because of the timestamp.
  const generatedAt = new Date().toISOString()
  const output = renderOutput(generatedAt)

  let unchanged = false
  try {
    const existing = await readFile(OUT_FILE, "utf8")
    const previousStamp = existing.match(/DATA_GENERATED_AT = "([^"]+)"/)?.[1]
    unchanged =
      previousStamp != null && existing === renderOutput(previousStamp)
  } catch {
    // no existing file yet
  }

  if (!unchanged) {
    await writeFile(OUT_FILE, output, "utf8")
  }

  const size = Buffer.byteLength(output, "utf8")
  console.log(
    `[relics] ${unchanged ? "unchanged" : "wrote"} ${sortedRelics.length} ` +
      `relics, ${items.size} items, ${(size / 1024).toFixed(0)} KiB -> ` +
      `${path.relative(ROOT, OUT_FILE)}`
  )
  console.log(
    `[relics] eras: ${eras.join(", ")}` +
      (skipped ? ` | skipped ${skipped} malformed entries` : "")
  )
  if (missingDucats.size > 0) {
    console.log(
      `[relics] ${missingDucats.size} reward items have no ducat value ` +
        `(Forma, Requiem mods, resources, or items missing upstream):`
    )
    console.log(`         ${[...missingDucats].sort().join(", ")}`)
  }
}

main().catch((error) => {
  console.error("[relics] failed:", error)
  process.exitCode = 1
})
