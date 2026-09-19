import * as React from "react"

type Updater<T> = T | ((previous: T) => T)

interface StoredResult<T> {
  found: boolean
  value?: T
}

function readStored<T>(key: string): StoredResult<T> {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw !== null) {
      return { found: true, value: JSON.parse(raw) as T }
    }
  } catch {
    // fall through: unreadable storage or corrupt payload
  }
  return { found: false }
}

function resolveInitial<T>(initialValue: T | (() => T)): T {
  return typeof initialValue === "function"
    ? (initialValue as () => T)()
    : initialValue
}

/**
 * `useState` backed by `localStorage`.
 *
 * - Reads synchronously on first render so persisted values survive reloads
 *   without a flash of default state.
 * - Serializes with JSON and silently falls back to the initial value when the
 *   stored payload is corrupt or storage is unavailable (e.g. private mode).
 * - Listens for `storage` events so multiple tabs stay in sync.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, (next: Updater<T>) => void] {
  // Resolved once; lets callers pass inline literals without churn.
  const [initial] = React.useState<T>(() => resolveInitial(initialValue))

  const [value, setValue] = React.useState<T>(() => {
    const stored = readStored<T>(key)
    return stored.found ? (stored.value as T) : initial
  })

  // Persist every change. Runs once on mount too, which normalizes the key.
  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full / disabled: keep the in-memory value
    }
  }, [key, value])

  // Keep multiple tabs in sync.
  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage || event.key !== key) {
        return
      }
      if (event.newValue === null) {
        setValue(initial)
        return
      }
      try {
        setValue(JSON.parse(event.newValue) as T)
      } catch {
        setValue(initial)
      }
    }

    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [key, initial])

  const set = React.useCallback((next: Updater<T>) => {
    setValue((previous) =>
      typeof next === "function" ? (next as (value: T) => T)(previous) : next
    )
  }, [])

  return [value, set]
}
