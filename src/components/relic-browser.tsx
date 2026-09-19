import { Lock, RotateCcw, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ERA_ORDER,
  eraBadgeClass,
  expectedDucats,
  type Relic,
  type RelicEra,
} from "@/lib/relics"
import { cn } from "@/lib/utils"

interface RelicBrowserProps {
  relics: Relic[]
  selectedName: string
  onSelect: (name: string) => void
  query: string
  onQueryChange: (value: string) => void
  eras: RelicEra[]
  onToggleEra: (era: RelicEra) => void
  hideVaulted: boolean
  onHideVaultedChange: (value: boolean) => void
  onReset: () => void
}

export function RelicBrowser({
  relics,
  selectedName,
  onSelect,
  query,
  onQueryChange,
  eras,
  onToggleEra,
  hideVaulted,
  onHideVaultedChange,
  onReset,
}: RelicBrowserProps) {
  const hasFilters = query.trim() !== "" || eras.length > 0 || hideVaulted

  return (
    <aside className="flex min-h-0 flex-col gap-3 rounded-xl border border-border bg-card p-3 lg:sticky lg:top-20 lg:h-[calc(100svh-6rem)]">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search relics…"
          aria-label="Search relics"
          className="pl-7"
        />
      </div>

      <div className="flex flex-wrap gap-1">
        {ERA_ORDER.map((era) => {
          const active = eras.includes(era)
          return (
            <Button
              key={era}
              type="button"
              size="xs"
              variant={active ? "default" : "outline"}
              aria-pressed={active}
              onClick={() => onToggleEra(era)}
            >
              {era}
            </Button>
          )
        })}
      </div>

      <label className="flex items-center gap-2 text-xs text-muted-foreground select-none">
        <input
          type="checkbox"
          checked={hideVaulted}
          onChange={(event) => onHideVaultedChange(event.target.checked)}
          className="size-3.5 accent-primary"
        />
        Hide vaulted relics
      </label>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {relics.length} {relics.length === 1 ? "relic" : "relics"}
        </span>
        {hasFilters && (
          <Button
            type="button"
            size="xs"
            variant="ghost"
            onClick={onReset}
            className="text-muted-foreground"
          >
            <RotateCcw data-icon="inline-start" />
            Reset
          </Button>
        )}
      </div>

      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto px-1">
        {relics.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No relics match these filters.
          </p>
        ) : (
          <ul className="flex flex-col gap-1 pb-1">
            {relics.map((relic) => {
              const active = relic.name === selectedName
              return (
                <li key={relic.name}>
                  <button
                    type="button"
                    onClick={() => onSelect(relic.name)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "w-full rounded-lg border px-2.5 py-2 text-left transition-colors",
                      active
                        ? "border-primary/40 bg-primary/10"
                        : "border-transparent hover:bg-muted/60"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium">
                        {relic.name}
                      </span>
                      <Badge className={eraBadgeClass(relic.era)}>
                        {relic.era}
                      </Badge>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span>
                        ~{expectedDucats(relic, "Intact").toFixed(1)} ducats/run
                      </span>
                      {relic.vaulted && (
                        <span
                          className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400"
                          title="Vaulted"
                        >
                          <Lock className="size-3" />
                          Vaulted
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </aside>
  )
}
