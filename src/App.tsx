import * as React from "react"
import { Coins, Database } from "lucide-react"

import { RelicBrowser } from "@/components/relic-browser"
import { RelicDetail } from "@/components/relic-detail"
import { TallyPanel } from "@/components/tally-panel"
import { DATA_GENERATED_AT } from "@/data/relics"
import { useLocalStorage } from "@/hooks/use-local-storage"
import {
  RELICS,
  addToTally,
  getRelic,
  tallyTotals,
  type RelicEra,
  type RelicRefinement,
  type Tally,
} from "@/lib/relics"

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
              Warframe Relic Ducat Tally
            </h1>
            <p className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
              <Database className="size-3" />
              {RELICS.length} relics ·{" "}
              {new Date(DATA_GENERATED_AT).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
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
          />
        </div>
      </div>
    </div>
  )
}

export default App
