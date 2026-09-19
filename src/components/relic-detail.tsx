import { Coins, ExternalLink, Lock, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  RARITY_BADGE,
  RARITY_BAR,
  REFINEMENT_LABEL,
  RELIC_REFINEMENTS,
  eraBadgeClass,
  expectedDucats,
  getItem,
  type Relic,
  type RelicRefinement,
  type Tally,
} from "@/lib/relics"
import { cn } from "@/lib/utils"

interface RelicDetailProps {
  relic: Relic
  refinement: RelicRefinement
  onRefinementChange: (refinement: RelicRefinement) => void
  tally: Tally
  onAdd: (item: string) => void
}

export function RelicDetail({
  relic,
  refinement,
  onRefinementChange,
  tally,
  onAdd,
}: RelicDetailProps) {
  const rewards = relic.tiers[refinement]
  const maxChance = Math.max(...rewards.map((reward) => reward.chance), 1)
  const expected = expectedDucats(relic, refinement)

  return (
    <section className="flex min-w-0 flex-col gap-4 rounded-xl border border-border bg-card p-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {relic.name}
            </h2>
            <Badge className={eraBadgeClass(relic.era)}>{relic.era}</Badge>
            {relic.vaulted && (
              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300">
                <Lock className="size-3" />
                Vaulted
              </Badge>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {relic.vaulted
              ? "Currently in the Prime Vault — not obtainable from normal missions."
              : "Available from Void fissure missions."}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background/60 px-3 py-2 text-right">
          <div className="flex items-center justify-end gap-1 text-base font-semibold tabular-nums">
            <Coins className="size-4 text-amber-500" />
            {expected.toFixed(1)}
          </div>
          <div className="text-[0.7rem] text-muted-foreground">
            expected ducats / run
          </div>
        </div>
      </header>

      <div
        role="tablist"
        aria-label="Refinement"
        className="flex flex-wrap gap-1 rounded-lg bg-muted/50 p-1"
      >
        {RELIC_REFINEMENTS.map((option) => {
          const active = option === refinement
          return (
            <button
              key={option}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => onRefinementChange(option)}
              className={cn(
                "flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {REFINEMENT_LABEL[option]}
            </button>
          )
        })}
      </div>

      <ul className="flex flex-col gap-2">
        {rewards.map((reward) => {
          const item = getItem(reward.item)
          const quantity = tally[reward.item] ?? 0
          return (
            <li
              key={`${reward.item}-${reward.chance}`}
              className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-2.5"
            >
              <Button
                type="button"
                size="icon-sm"
                variant="outline"
                onClick={() => onAdd(reward.item)}
                title={`Add ${reward.item} to tally`}
                aria-label={`Add ${reward.item} to tally`}
              >
                <Plus />
              </Button>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="truncate text-sm font-medium">
                    {reward.item}
                  </span>
                  <Badge className={RARITY_BADGE[reward.rarity]}>
                    {reward.rarity}
                  </Badge>
                  {quantity > 0 && (
                    <Badge className="bg-primary/15 text-primary">
                      ×{quantity} tallied
                    </Badge>
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        RARITY_BAR[reward.rarity]
                      )}
                      style={{
                        width: `${Math.max(
                          (reward.chance / maxChance) * 100,
                          2
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="w-14 text-right text-xs text-muted-foreground tabular-nums">
                    {reward.chance}%
                  </span>
                </div>
              </div>

              <div className="flex w-20 shrink-0 flex-col items-end gap-0.5">
                {item?.ducats != null ? (
                  <span className="inline-flex items-center gap-1 text-sm font-semibold tabular-nums">
                    <Coins className="size-3.5 text-amber-500" />
                    {item.ducats}
                  </span>
                ) : (
                  <span className="text-[0.7rem] text-muted-foreground">
                    no ducats
                  </span>
                )}
                {item?.market && (
                  <a
                    href={`https://warframe.market/items/${item.market.urlName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-0.5 text-[0.7rem] text-muted-foreground hover:text-foreground"
                  >
                    market
                    <ExternalLink className="size-2.5" />
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <p className="text-[0.7rem] text-muted-foreground">
        Press <Plus className="inline size-3 align-text-bottom" /> to log a
        drop. Ducat values and market links come from warframe-items.
      </p>
    </section>
  )
}
