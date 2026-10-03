import { Coins, Minus, Plus, ShoppingBag, Trash } from "lucide-react"

import { ItemPicker } from "@/components/item-picker"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ITEMS, tallyLines, tallyTotals, type Tally } from "@/lib/relics"

interface TallyPanelProps {
  tally: Tally
  onAdd: (item: string) => void
  onRemove: (item: string) => void
  onClear: () => void
}

export function TallyPanel({
  tally,
  onAdd,
  onRemove,
  onClear,
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
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="tabular-nums">
                      {ITEMS[line.item]?.ducats != null
                        ? `${line.ducats} ducats each`
                        : "not sellable"}
                    </span>
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

                <Badge className="w-14 justify-end border-transparent bg-transparent text-amber-600 tabular-nums dark:text-amber-400">
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
