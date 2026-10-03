import {
  ITEMS,
  RELICS,
  RELIC_ERAS,
  RELIC_REFINEMENTS,
  type Relic,
  type RelicEra,
  type RelicItem,
  type RelicRefinement,
  type RelicReward,
  type RewardRarity,
} from "@/data/relics"

export { ITEMS, RELICS, RELIC_ERAS, RELIC_REFINEMENTS }
export type {
  Relic,
  RelicEra,
  RelicItem,
  RelicRefinement,
  RelicReward,
  RewardRarity,
}

/** Relic name -> relic, for O(1) selection lookups. */
export const RELIC_BY_NAME = new Map<string, Relic>(
  RELICS.map((relic) => [relic.name, relic])
)

export function getRelic(name: string): Relic | undefined {
  return RELIC_BY_NAME.get(name)
}

export function getItem(name: string): RelicItem | undefined {
  return ITEMS[name]
}

/**
 * Every reward item name, alphabetically sorted, for name-first search.
 * Derived once at module load since {@link ITEMS} is static generated data.
 */
export const ITEM_NAMES: readonly string[] = Object.keys(ITEMS).sort((a, b) =>
  a.localeCompare(b)
)

/**
 * Rank item names for a free-text query, so a reward can be added to the tally
 * without first finding the relic it dropped from.
 *
 * Every whitespace-separated token must appear somewhere in the name, which
 * lets "acceltra barrel" match "Acceltra Prime Barrel". Earlier and
 * word-boundary matches rank first, so the most likely item is on top.
 * An empty query returns every name in alphabetical order.
 */
export function searchItems(query: string): string[] {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return [...ITEM_NAMES]

  const scored: { name: string; score: number }[] = []
  for (const name of ITEM_NAMES) {
    const haystack = name.toLowerCase()
    let score = 0
    let matches = true
    for (const token of tokens) {
      const index = haystack.indexOf(token)
      if (index === -1) {
        matches = false
        break
      }
      score += index
      if (index === 0 || haystack[index - 1] === " ") score -= 5
    }
    if (matches) scored.push({ name, score })
  }

  scored.sort((a, b) => a.score - b.score || a.name.localeCompare(b.name))
  return scored.map((entry) => entry.name)
}

/** Ducat value of an item, treating unsellable items as zero. */
export function ducatsFor(name: string): number {
  return ITEMS[name]?.ducats ?? 0
}

// ---------------------------------------------------------------------------
// Farming tally
// ---------------------------------------------------------------------------

/** Item display name -> quantity collected. */
export type Tally = Record<string, number>

export const EMPTY_TALLY: Tally = {}

export function addToTally(tally: Tally, item: string, delta = 1): Tally {
  const next = { ...tally }
  const quantity = (next[item] ?? 0) + delta
  if (quantity <= 0) {
    delete next[item]
  } else {
    next[item] = quantity
  }
  return next
}

export interface TallyLine {
  item: string
  quantity: number
  ducats: number
  subtotal: number
}

export function tallyLines(tally: Tally): TallyLine[] {
  return Object.entries(tally)
    .map(([item, quantity]) => {
      const ducats = ITEMS[item]?.ducats ?? 0
      return { item, quantity, ducats, subtotal: ducats * quantity }
    })
    .sort((a, b) => b.subtotal - a.subtotal || a.item.localeCompare(b.item))
}

export function tallyTotals(tally: Tally): {
  items: number
  stacks: number
  ducats: number
} {
  const lines = tallyLines(tally)
  return {
    items: lines.reduce((sum, line) => sum + line.quantity, 0),
    stacks: lines.length,
    ducats: lines.reduce((sum, line) => sum + line.subtotal, 0),
  }
}

// ---------------------------------------------------------------------------
// Presentation helpers
// ---------------------------------------------------------------------------

export const ERA_ORDER: RelicEra[] = [...RELIC_ERAS]

const ERA_BADGE: Record<string, string> = {
  Lith: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  Meso: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  Neo: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  Axi: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  Requiem: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  Vanguard: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  Eterna: "bg-teal-500/15 text-teal-700 dark:text-teal-300",
  Void: "bg-slate-500/15 text-slate-700 dark:text-slate-300",
}

/** Badge classes for an era, tolerating eras added by future data refreshes. */
export function eraBadgeClass(era: RelicEra | string): string {
  return ERA_BADGE[era] ?? "bg-muted text-muted-foreground"
}

export const RARITY_BADGE: Record<RewardRarity, string> = {
  Common:
    "bg-stone-500/15 text-stone-700 dark:text-stone-300 ring-stone-500/20",
  Uncommon: "bg-blue-500/15 text-blue-700 dark:text-blue-300 ring-blue-500/20",
  Rare: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 ring-yellow-500/20",
}

export const RARITY_BAR: Record<RewardRarity, string> = {
  Common: "bg-stone-400 dark:bg-stone-500",
  Uncommon: "bg-blue-500",
  Rare: "bg-yellow-500",
}

export const REFINEMENT_LABEL: Record<RelicRefinement, string> = {
  Intact: "Intact",
  Exceptional: "Exceptional",
  Flawless: "Flawless",
  Radiant: "Radiant",
}

/** Expected ducats from a single run of a relic at a given refinement. */
export function expectedDucats(
  relic: Relic,
  refinement: RelicRefinement
): number {
  return relic.tiers[refinement].reduce(
    (sum, reward) => sum + (reward.chance / 100) * ducatsFor(reward.item),
    0
  )
}

/** Unique reward items a relic can drop, independent of refinement. */
export function relicItems(relic: Relic): string[] {
  const names = new Set<string>()
  for (const refinement of RELIC_REFINEMENTS) {
    for (const reward of relic.tiers[refinement]) {
      names.add(reward.item)
    }
  }
  return [...names]
}
