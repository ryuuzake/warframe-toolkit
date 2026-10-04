# Market data is a build-time static snapshot, not a runtime API call

The sell-vs-burn feature needs live warframe.market prices, but `api.warframe.market` sends no `Access-Control-Allow-Origin` for non-`*.warframe.market` origins and forbids amending the browser `User-Agent` that its rules require. Instead of hosting a proxy, the build script fetches the `/v1/tools/ducats` aggregate once, filters it to the relic-reward items, and emits a committed `src/data/market.ts` alongside the generated relic data.

Consequences: there is no runtime network, no loading or error UI, and no proxy to operate — but the shipped prices only change when the site is rebuilt, and the integration depends on an undocumented v1 endpoint whose deprecation would require re-sourcing.

## Considered Options

- **Runtime proxy** (Cloudflare Worker/Vite proxy). Rejected: adds an operational component and a public endpoint that risks the "no mirrors" rule, for data that changes hourly at most.
- **Per-item `/v2/orders/item/{slug}/top` at runtime.** Rejected: still needs a proxy (same CORS wall), plus N calls against a 3 req/s budget, and it exposes live ask prices with no trade volume.
- **`/v1/tools/ducats` at build time** (chosen): one request, per-item `median`, `wa_price`, `ducats_per_platinum`, and `volume` for every ducat item.
