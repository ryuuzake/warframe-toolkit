/**
 * Descriptive, versioned `User-Agent` for build-time API requests.
 *
 * warframe.market's API rules require a dedicated, non-browser identity
 * ("Do not disguise your application as a regular browser"), formatted like
 * their example `ExampleMarketTool/1.2.0 (+https://example.com/contact)`.
 * The version comes from `package.json` so a release bump changes the header
 * without touching this file.
 *
 * Shared by both build scripts (the relic pipeline also calls
 * `api.warframe.market /v2/items` for its ducat fallback).
 */
import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const pkg = JSON.parse(
  await readFile(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "..",
      "package.json"
    ),
    "utf8"
  )
) as { version: string }

export const USER_AGENT = `WarframeToolkit/${pkg.version} (+https://github.com/ryuuzake/warframe-toolkit)`
