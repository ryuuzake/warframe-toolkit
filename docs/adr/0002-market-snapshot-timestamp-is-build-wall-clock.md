# The market snapshot is stamped with build wall-clock, and warns at 72h

`MARKET_GENERATED_AT` records the wall-clock time of the build that produced `src/data/market.ts`, not the time the upstream feed was actually fetched. This is deliberate and knowingly under-reports the data's true age: the feed is cached for 24h, and the `previous_day` split is itself up to ~24h behind its own fetch, so the stamp can be ~48h optimistic. The UI compensates by treating the snapshot as stale at 72h (dimming prices and showing an age warning) rather than hiding the age.

This is a hard-to-reverse, surprising deviation: a future reader will otherwise "fix" the stamp to the fetch time. The trade-off was chosen for a single, simple, cache-aware timestamp; a future maintainer who reverses it is not wrong, but should revisit the 72h warning's meaning at the same time.

## Consequences

- A build that cannot fetch fresh data must not rewrite `market.ts`, or the wall-clock stamp becomes an unbounded lie (a stale cache of any age would be re-stamped with today's date). The market fetch therefore uses a fresh-only path with no stale-cache fallback.
