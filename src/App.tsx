import * as React from "react"
import { Coins, Database, TriangleAlert } from "lucide-react"

import { RelicBrowser } from "@/components/relic-browser"
import { RelicDetail } from "@/components/relic-detail"
import { TallyPanel } from "@/components/tally-panel"
import { MARKET_GENERATED_AT } from "@/data/market"
import { DATA_GENERATED_AT } from "@/data/relics"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { isMarketStale, marketAgeDays } from "@/lib/market"
import {
  RELICS,
  addToTally,
  getRelic,
  tallyTotals,
  type RelicEra,
  type RelicRefinement,
  type Tally,
} from "@/lib/relics"

const dateFmt = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
})

/**
 * Amber stale warning for the market stamp. Hidden…sm:flex keeps the *full*
 * stamp desktop-only, but staleness is the one thing worth shouting about, so
 * this shows (unchanged) at every breakpoint.
 */
function StaleMarketNotice({ ageDays }: { ageDays: number }) {
  return (
    <p
      className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400"
      role="status"
      title="warframe.market snapshot is older than 72h — run `bun run data:market` to refresh it"
    >
      <TriangleAlert className="size-3" aria-hidden="true" />
      market data {ageDays} {ageDays === 1 ? "day" : "days"} old
    </p>
  )
}

export function App() {
  const [query, setQuery] = React.useState("")
  const [eras, setEras] = useLocalStorage<RelicEra[]>("wf.relics.eras", [])
  const [hideVaulted, setHideVaulted] = useLocalStorage(
    "wf.relics.hideVaulted",
    false
  )
  const [selectedName, setSelectedName] = useLocalStorage<string | null>(
    "wf.relics.selected",
    null
  )
  const [refinement, setRefinement] = useLocalStorage<RelicRefinement>(
    "wf.relics.refinement",
    "Intact"
  )
  const [tally, setTally] = useLocalStorage<Tally>("wf.relics.tally", {})

  // Single staleness computation, handed down to TallyPanel so header and
  // panel can never disagree.
  const marketStale = isMarketStale()
  const marketAge = marketAgeDays()

  const filteredRelics = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    return RELICS.filter((relic) => {
      if (hideVaulted && relic.vaulted) return false
      if (eras.length > 0 && !eras.includes(relic.era)) return false
      if (needle && !relic.name.toLowerCase().includes(needle)) return false
      return true
    })
  }, [query, eras, hideVaulted])

  const selectedRelic =
    (selectedName ? getRelic(selectedName) : undefined) ??
    filteredRelics[0] ??
    RELICS[0]

  const totals = React.useMemo(() => tallyTotals(tally), [tally])

  const toggleEra = React.useCallback(
    (era: RelicEra) => {
      setEras((current) =>
        current.includes(era)
          ? current.filter((item) => item !== era)
          : [...current, era]
      )
    },
    [setEras]
  )

  const resetFilters = React.useCallback(() => {
    setQuery("")
    setEras([])
    setHideVaulted(false)
  }, [setEras, setHideVaulted])

  const addItem = React.useCallback(
    (item: string) => {
      setTally((current) => addToTally(current, item, 1))
    },
    [setTally]
  )

  const removeItem = React.useCallback(
    (item: string) => {
      setTally((current) => addToTally(current, item, -1))
    },
    [setTally]
  )

  const clearTally = React.useCallback(() => {
    setTally({})
  }, [setTally])

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight">
              Warframe Toolkit
            </h1>
            <p className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
              <Database className="size-3" />
              {RELICS.length} relics ·{" "}
              {dateFmt.format(new Date(DATA_GENERATED_AT))}
              <span
                className={
                  marketStale
                    ? "font-medium text-amber-600 dark:text-amber-400"
                    : undefined
                }
              >
                {" · market "}
                {dateFmt.format(new Date(MARKET_GENERATED_AT))}
                {marketStale
                  ? ` (${marketAge} ${marketAge === 1 ? "day" : "days"} old — rebuild to refresh)`
                  : null}
              </span>
            </p>
            {marketStale ? <StaleMarketNotice ageDays={marketAge} /> : null}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5">
              <Coins className="size-4 text-amber-500" />
              <span className="text-sm font-semibold tabular-nums">
                {totals.ducats.toLocaleString()}
              </span>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                ducats
              </span>
            </div>
            <span className="hidden text-xs text-muted-foreground md:inline">
              Press <kbd className="rounded border border-border px-1">d</kbd>{" "}
              for dark mode
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[100rem] items-start gap-4 p-4 lg:grid-cols-[19rem_minmax(0,1fr)] xl:grid-cols-[19rem_minmax(0,1fr)_21rem]">
        <RelicBrowser
          relics={filteredRelics}
          selectedName={selectedRelic.name}
          onSelect={setSelectedName}
          query={query}
          onQueryChange={setQuery}
          eras={eras}
          onToggleEra={toggleEra}
          hideVaulted={hideVaulted}
          onHideVaultedChange={setHideVaulted}
          onReset={resetFilters}
        />

        <RelicDetail
          relic={selectedRelic}
          refinement={refinement}
          onRefinementChange={setRefinement}
          tally={tally}
          onAdd={addItem}
        />

        <div className="lg:col-span-2 xl:col-span-1">
          <TallyPanel
            tally={tally}
            onAdd={addItem}
            onRemove={removeItem}
            onClear={clearTally}
            marketStale={marketStale}
          />
        </div>
      </div>

      <footer className="mx-auto w-full max-w-[100rem] px-4 pb-4 text-xs text-muted-foreground/60">
        Price data from warframe.market · game content © Digital Extremes Ltd.
        (non-commercial fan use)
      </footer>
    </div>
  )
}

export default App
