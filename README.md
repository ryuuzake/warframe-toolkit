# Warframe Relic Ducat Tally

A small web tool for browsing Void relics, comparing refinement drop chances,
and tallying the ducat value of the prime parts you farm. Built with Vite +
React + TypeScript + Tailwind + shadcn/ui.

## Features

- Browse all relics by era (Lith / Meso / Neo / Axi / Requiem / Vanguard),
  search by name and filter out vaulted relics.
- Inspect the reward table for each refinement state (Intact, Exceptional,
  Flawless, Radiant) with per-reward rarity, drop chance and ducat value.
- Expected ducats per run for the selected refinement.
- Log drops into a farm tally with a running ducat total. The tally, selected
  relic and filters are persisted to `localStorage`.

## Data pipeline

`src/data/relics.ts` is **generated** and should not be edited by hand. It is
produced by `scripts/build-relics-data.ts`, which joins two MIT-licensed,
community-maintained mirrors of Digital Extremes' official drop tables:

- [`WFCD/warframe-drop-data`](https://github.com/WFCD/warframe-drop-data)
  (`data/relics.json`) — per-relic, per-refinement reward chances.
- [`WFCD/warframe-items`](https://github.com/WFCD/warframe-items)
  (`data/json/*.json`) — relic `vaulted` flags, reward identity, market links
  and per-component ducat values.

The script:

1. Downloads the sources (cached under
   `node_modules/.cache/warframe-relics/` for 24h so repeat builds are fast and
   work offline).
2. Joins rewards by display name, maps each item to its ducat value and
   warframe.market link.
3. Recovers the real Common / Uncommon / Rare tier (the upstream `rarity`
   label collapses commons into "uncommon") from the Intact chance ordering.
4. Emits a single typed module: `Relic` (name, era, `vaulted`, per-refinement
   reward tables) plus an `ITEMS` lookup (`ducats`, `market`).

```bash
bun run data:relics        # regenerate src/data/relics.ts
RELIC_DATA_REFRESH=1 ...   # force a refetch, ignoring the cache
```

`bun run build` regenerates the data before type-checking and bundling.

## Scripts

| Command              | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `bun run dev`        | Start the Vite dev server                            |
| `bun run data:relics`| Fetch + regenerate `src/data/relics.ts`              |
| `bun run build`      | Regenerate data, type-check and build for production |
| `bun run preview`    | Preview the production build                         |
| `bun run lint`       | ESLint                                               |
| `bun run typecheck`  | TypeScript                                           |
| `bun run format`     | Prettier                                             |

## Licensing

Game content and names are © Digital Extremes Ltd. and are used here for
non-commercial fan purposes. The upstream datasets are MIT-licensed; ducat
values originate from the community wiki (CC BY-NC-SA 3.0).
