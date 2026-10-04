import { Coins, Minus, Plus, ShoppingBag, Trash } from "lucide-react"

import { ItemPicker } from "@/components/item-picker"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ducatsPerPlat,
  marketFor,
  verdictFor,
  type MarketVerdict,
} from "@/lib/market"
import {
  ITEMS,
  tallyLines,
  tallyTotals,
  type Tally,
  type TallyLine,
} from "@/lib/relics"

interface TallyPanelProps {
  tally: Tally
  onAdd: (item: string) => void
  onRemove: (item: string) => void
  onClear: () => void
  /** Header-computed staleness — dims market figures in lockstep with it. */
  marketStale: boolean
}

/** Badge classes for a verdict, matching the rarity-badge conventions. */
const VERDICT_BADGE: Record<MarketVerdict, string> = {
  sell: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-emerald-500/20",
  burn: "bg-rose-500/15 text-rose-700 dark:text-rose-300 ring-rose-500/20",
}

/**
 * Secondary meta line for a tally line, resolving it to exactly one row of
 * the sell/burn state matrix (see .scratch/ticket-02-sell-burn-verdict.md):
 *
 * - ducats + market row, `volume >= 5`  → `12p · 3.8 d/p` + sell/burn badge
 *   (the badge itself is suppressed while `MARKET_FODDER_RATE` is `null`)
 * - market row, `1 <= volume < 5`       → same numbers + `thin market · n sales`
 * - market row, `volume = 0`            → greyed `12p` + `no recent sales`
 * - ducats, no market row               → ducats only
 * - `ducats: null`                      → `not sellable` (price link kept)
 */
function LineMarketMeta({
  line,
  stale,
}: {
  line: TallyLine
  stale: boolean
}) {
  const market = marketFor(line.item)
  const ducats = ITEMS[line.item]?.ducats ?? null

  // Amber only on the warning itself; staleness stays otherwise neutral.
  const dim = stale ? "opacity-60" : ""

  if (!market) {
    return (
      <span className="tabular-nums">
        {ducats != null ? `${line.ducats} ducats each` : "not sellable"}
      </span>
    )
  }

  const { volume } = market
  const ratio = ducatsPerPlat(line.item)
  const verdict = verdictFor(line.item)
  const thin = volume >= 1 && volume < 5

  return (
    <>
      <a
        href={`https://warframe.market/items/${market.slug}`}
        target="_blank"
        rel="noreferrer"
        className={
          "tabular-nums underline-offset-2 hover:underline " +
          (volume === 0 ? "opacity-50 " : "") +
          dim
        }
        title={`median ${market.median}p over ${volume} trades${stale ? " (stale snapshot)" : ""}`}
      >
        {market.waPrice.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
        p
      </a>
      {ducats == null ? (
        <>
          <span aria-hidden="true">·</span>
          <span className={dim}>not sellable</span>
        </>
      ) : volume === 0 ? (
        <>
          <span aria-hidden="true">·</span>
          <span className={dim}>no recent sales</span>
        </>
      ) : ratio === null ? null : (
        <>
          <span aria-hidden="true">·</span>
          <span
            className={`tabular-nums ${dim}`}
            title={`${ducats} ducats / ${market.waPrice}p`}
          >
            {ratio.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            d/p
          </span>
        </>
      )}
      {verdict !== null ? (
        <>
          <span aria-hidden="true">·</span>
          <Badge
            className={`rounded px-1 py-0 text-[0.65rem] ring-1 ${VERDICT_BADGE[verdict]} ${dim}`}
            title={
              verdict === "burn"
                ? "ducats per platinum above the 90th-percentile rate — burn at the kiosk"
                : "ducats per platinum at or below the 90th-percentile rate — sell for platinum"
            }
          >
            {verdict}
          </Badge>
        </>
      ) : thin ? (
        <>
          <span aria-hidden="true">·</span>
          <span>thin market · {volume} sales</span>
        </>
      ) : null}
    </>
  )
}

export function TallyPanel({
  tally,
  onAdd,
  onRemove,
  onClear,
  marketStale,
}: TallyPanelProps) {
  const lines = tallyLines(tally)
  const totals = tallyTotals(tally)

  return (
    <aside className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
      <header className="flex items-start justify-between gap-2">
        <div>
          <h2 className="flex items-center gap-1.5 text-sm font-semibold">
            <ShoppingBag className="size-4" />
            Farm tally
          </h2>
          <p className="text-xs text-muted-foreground">
            Saved to this browser automatically.
          </p>
        </div>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={onClear}
          disabled={lines.length === 0}
          title="Clear tally"
          aria-label="Clear tally"
          className="text-muted-foreground"
        >
          <Trash />
        </Button>
      </header>

      <div className="flex flex-col gap-1.5">
        <ItemPicker onAdd={onAdd} />
        <p className="text-xs text-muted-foreground">
          Know the part but not the relic? Search it here.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border bg-background/60 px-3 py-2">
          <div className="flex items-center gap-1 text-lg font-semibold tabular-nums">
            <Coins className="size-4 text-amber-500" />
            {totals.ducats.toLocaleString()}
          </div>
          <div className="text-[0.7rem] text-muted-foreground">
            total ducats
          </div>
        </div>
        <div className="rounded-lg border border-border bg-background/60 px-3 py-2">
          <div className="text-lg font-semibold tabular-nums">
            {totals.items.toLocaleString()}
          </div>
          <div className="text-[0.7rem] text-muted-foreground">
            items ({totals.stacks} types)
          </div>
        </div>
      </div>

      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto px-1">
        {lines.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center">
            <ShoppingBag className="size-6 text-muted-foreground/50" />
            <p className="max-w-[16rem] text-sm text-muted-foreground">
              Add relic rewards with the{" "}
              <Plus className="inline size-3 align-text-bottom" /> button, or
              search any item by name above.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-1.5 pb-1">
            {lines.map((line) => (
              <li
                key={line.item}
                className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 p-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {line.item}
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted-foreground">
                    <LineMarketMeta line={line} stale={marketStale} />
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => onRemove(line.item)}
                    aria-label={`Remove one ${line.item}`}
                  >
                    <Minus />
                  </Button>
                  <span className="w-7 text-center text-sm font-medium tabular-nums">
                    {line.quantity}
                  </span>
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => onAdd(line.item)}
                    aria-label={`Add one ${line.item}`}
                  >
                    <Plus />
                  </Button>
                </div>

                <Badge className="min-w-9 justify-end border-transparent bg-transparent px-1 text-amber-600 tabular-nums dark:text-amber-400">
                  {line.subtotal.toLocaleString()}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}
