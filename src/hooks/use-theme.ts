import * as React from "react"

export type Theme = "light" | "dark"

const STORAGE_KEY = "studio-theme"

// External store so the theme can be read without an effect (avoids
// react-hooks/set-state-in-effect and hydration mismatches).
const listeners = new Set<() => void>()

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      onStoreChange()
    }
  }

  window.addEventListener("storage", onStorage)

  return () => {
    listeners.delete(onStoreChange)
    window.removeEventListener("storage", onStorage)
  }
}

export function useTheme() {
  // Server snapshot is "light"; layout.tsx runs an inline script before
  // hydration that applies the persisted class, so the client re-render
  // immediately picks up the real theme.
  const theme = React.useSyncExternalStore(subscribe, readTheme, () => "light")

  const setTheme = (next: Theme) => {
    document.documentElement.classList.toggle("dark", next === "dark")

    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode); the visual toggle still works.
    }

    listeners.forEach((listener) => listener())
  }

  return { theme, setTheme }
}
