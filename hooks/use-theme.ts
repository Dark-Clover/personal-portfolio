"use client"

import { useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    // Get theme from localStorage or default to system
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    // Remove existing theme classes
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setResolvedTheme(systemTheme)
      root.classList.add(systemTheme)
    } else {
      setResolvedTheme(theme)
      root.classList.add(theme)
    }

    // Save to localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = () => {
      if (theme === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light"
        setResolvedTheme(systemTheme)
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(systemTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  return {
    theme,
    setTheme,
    resolvedTheme,
  }
}
