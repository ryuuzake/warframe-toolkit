import * as React from "react"
import { Autocomplete } from "@base-ui/react/autocomplete"
import type { AutocompleteRootChangeEventDetails } from "@base-ui/react/autocomplete"
import { useVirtualizer, type Virtualizer } from "@tanstack/react-virtual"
import { Coins, Search } from "lucide-react"

import { ScrollArea, ScrollAreaViewport } from "@/components/ui/scroll-area"
import { ITEMS, ITEM_NAMES, searchItems } from "@/lib/relics"
import { cn } from "@/lib/utils"

/** Row height used both for initial size estimates and item metrics. */
const ITEM_HEIGHT = 30
const LIST_PADDING = 4
const MAX_LIST_HEIGHT = 288 // 17.5rem, replaces max-h-72

interface ItemPickerProps {
  /** Add one of the named item to the tally. */
  onAdd: (item: string) => void
}

/**
 * Name-first tally entry: search any prime reward and add it straight to the
 * tally without knowing which relic dropped it.
 *
 * Built on Base UI's Autocomplete. Selection is detected through
 * `onValueChange`'s `item-press` reason, which fires for both pointer clicks and
 * the Enter key, so the item is added exactly once and the input clears for the
 * next entry.
 */
export function ItemPicker({ onAdd }: ItemPickerProps) {
  const [query, setQuery] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const virtualizerRef = React.useRef<Virtualizer<
    HTMLDivElement,
    Element
  > | null>(null)

  const matches = React.useMemo(() => searchItems(query), [query])

  const handleValueChange = React.useCallback(
    (next: string, details: AutocompleteRootChangeEventDetails) => {
      if (details.reason === "item-press") {
        onAdd(next)
        setQuery("")
        return
      }
      setQuery(next)
    },
    [onAdd]
  )

  return (
    <Autocomplete.Root
      items={ITEM_NAMES}
      filteredItems={matches}
      value={query}
      onValueChange={handleValueChange}
      onOpenChange={setOpen}
      onItemHighlighted={(item, details) => {
        const virtualizer = virtualizerRef.current
        if (!item || !virtualizer) return

        // Only correct scrolling at the list edges (list-navigation scrolls
        // within Ot native (virtual) range already); align to keep the item in view.
        const isStart = details.index === 0
        const isEnd = details.index === virtualizer.options.count - 1
        const shouldScroll =
          details.reason === "none" ||
          (details.reason === "keyboard" && (isStart || isEnd))

        if (shouldScroll) {
          queueMicrotask(() => {
            virtualizer.scrollToIndex(details.index, {
              align: isEnd ? "start" : "end",
            })
          })
        }
      }}
      virtualized
      itemToStringValue={(name) => name}
      openOnInputClick
      autoHighlight
    >
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2 z-10 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Autocomplete.Input
          placeholder="Search any item…"
          aria-label="Search items to add to the tally"
          className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent py-1 pr-2.5 pl-7 text-sm transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <Autocomplete.Portal>
        <Autocomplete.Positioner
          sideOffset={4}
          align="start"
          className="z-50 outline-none"
        >
          <Autocomplete.Popup
            className={cn(
              "w-[var(--anchor-width)] min-w-[15rem] rounded-lg border border-border bg-popover text-popover-foreground shadow-md",
              "data-[starting-style]:animate-in data-[starting-style]:fade-in-0"
            )}
          >
            <Autocomplete.List className="p-0">
              <VirtualizedItemList
                matches={matches}
                open={open}
                query={query}
                virtualizerRef={virtualizerRef}
              />
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  )
}

function VirtualizedItem({
  name,
  index,
  itemCount,
  start,
  measureElement,
}: {
  name: string
  index: number
  itemCount: number
  start: number
  measureElement: (element: HTMLElement | null) => void
}) {
  const ducats = ITEMS[name]?.ducats
  return (
    <Autocomplete.Item
      ref={measureElement}
      index={index}
      value={name}
      aria-posinset={index + 1}
      aria-setsize={itemCount}
      className="flex cursor-default items-center justify-between gap-3 rounded-md px-2 py-1.5 text-sm outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        transform: `translateY(${start}px)`,
      }}
    >
      <span className="min-w-0 truncate">{name}</span>
      <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground tabular-nums">
        {ducats != null ? (
          <>
            <Coins className="size-3 text-amber-500" />
            {ducats}
          </>
        ) : (
          "—"
        )}
      </span>
    </Autocomplete.Item>
  )
}

function VirtualizedItemList({
  matches,
  open,
  query,
  virtualizerRef,
}: {
  matches: readonly string[]
  open: boolean
  query: string
  virtualizerRef: React.RefObject<Virtualizer<HTMLDivElement, Element> | null>
}) {
  const scrollElementRef = React.useRef<HTMLDivElement | null>(null)

  const virtualizer = useVirtualizer({
    enabled: open,
    count: matches.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 12,
    paddingStart: LIST_PADDING,
    paddingEnd: LIST_PADDING,
    scrollPaddingStart: LIST_PADDING,
    scrollPaddingEnd: LIST_PADDING,
  })

  React.useImperativeHandle(virtualizerRef, () => virtualizer)

  const handleScrollElementRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      scrollElementRef.current = element
      if (element) {
        virtualizer.measure()
      }
    },
    [virtualizer]
  )

  const totalSize = virtualizer.getTotalSize()

  if (matches.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="px-2.5 py-6 text-center text-sm text-muted-foreground"
      >
        No items match “{query}”.
      </div>
    )
  }

  return (
    <ScrollArea style={{ height: Math.min(MAX_LIST_HEIGHT, totalSize + LIST_PADDING * 2) }}>
      <ScrollAreaViewport
        ref={handleScrollElementRef}
        className="overscroll-contain"
      >
      <div
        role="presentation"
        className="relative w-full"
        style={{ height: totalSize }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const name = matches[virtualItem.index]
          if (!name) return null

          return (
            <VirtualizedItem
              key={virtualItem.key}
              name={name}
              index={virtualItem.index}
              itemCount={matches.length}
              start={virtualItem.start}
              measureElement={virtualizer.measureElement}
            />
          )
        })}
        </div>
      </ScrollAreaViewport>
    </ScrollArea>
  )
}
