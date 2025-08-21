"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-800/50 animate-pulse" />
    )
  }

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ]

  return (
    <div className="flex items-center space-x-1 p-1 bg-gray-900/50 rounded-lg border border-emerald-500/20 backdrop-blur-sm">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon
        const isActive = theme === themeOption.value
        
        return (
          <motion.div
            key={themeOption.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(themeOption.value)}
              className={`h-8 px-3 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              }`}
              title={`Switch to ${themeOption.label} theme`}
            >
              <Icon className="h-4 w-4" />
              <span className="sr-only">{themeOption.label}</span>
            </Button>
          </motion.div>
        )
      })}
    </div>
  )
}
