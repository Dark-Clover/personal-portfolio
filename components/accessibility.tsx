"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Keyboard, 
  Eye, 
  Volume2, 
  VolumeX, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Accessibility as AccessibilityIcon
} from "lucide-react"

interface AccessibilityProps {
  className?: string
}

export default function Accessibility({ className = "" }: AccessibilityProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showFocus, setShowFocus] = useState(false)

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content
      if (e.key === 'Tab' && e.altKey) {
        e.preventDefault()
        const mainContent = document.querySelector('main')
        if (mainContent) {
          (mainContent as HTMLElement).focus()
        }
      }

      // Escape key to close accessibility panel
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Apply accessibility settings
  useEffect(() => {
    const root = document.documentElement
    
    // Font size
    root.style.fontSize = `${fontSize}px`
    
    // High contrast
    if (highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    // Reduced motion
    if (reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }
    
    // Show focus indicators
    if (showFocus) {
      root.classList.add('show-focus')
    } else {
      root.classList.remove('show-focus')
    }
  }, [fontSize, highContrast, reducedMotion, showFocus])

  const resetSettings = () => {
    setFontSize(16)
    setHighContrast(false)
    setReducedMotion(false)
    setShowFocus(false)
  }

  return (
    <>
      {/* Accessibility Toggle Button */}
      <motion.div
        className={`fixed bottom-6 right-6 z-50 ${className}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg border-2 border-emerald-400/30"
          aria-label="Accessibility settings"
          aria-expanded={isOpen}
        >
          <AccessibilityIcon className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-gray-900/95 backdrop-blur-md rounded-lg border border-emerald-500/30 shadow-2xl"
            role="dialog"
            aria-label="Accessibility settings"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <AccessibilityIcon className="h-5 w-5 mr-2 text-emerald-400" />
                  Accessibility
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close accessibility settings"
                >
                  ×
                </Button>
              </div>

              {/* Font Size Control */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white flex items-center">
                  <ZoomIn className="h-4 w-4 mr-2 text-emerald-400" />
                  Font Size
                </label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                    className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    aria-label="Decrease font size"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-white min-w-[3rem] text-center">{fontSize}px</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                    className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    aria-label="Increase font size"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-emerald-400" />
                  High Contrast
                </label>
                <Button
                  variant={highContrast ? "default" : "outline"}
                  size="sm"
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-full ${
                    highContrast
                      ? "bg-emerald-600 text-white"
                      : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                  aria-pressed={highContrast}
                >
                  {highContrast ? "Enabled" : "Disabled"}
                </Button>
              </div>

              {/* Reduced Motion Toggle */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white flex items-center">
                  <VolumeX className="h-4 w-4 mr-2 text-emerald-400" />
                  Reduced Motion
                </label>
                <Button
                  variant={reducedMotion ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={`w-full ${
                    reducedMotion
                      ? "bg-emerald-600 text-white"
                      : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                  aria-pressed={reducedMotion}
                >
                  {reducedMotion ? "Enabled" : "Disabled"}
                </Button>
              </div>

              {/* Focus Indicators Toggle */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white flex items-center">
                  <Keyboard className="h-4 w-4 mr-2 text-emerald-400" />
                  Show Focus Indicators
                </label>
                <Button
                  variant={showFocus ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFocus(!showFocus)}
                  className={`w-full ${
                    showFocus
                      ? "bg-emerald-600 text-white"
                      : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                  aria-pressed={showFocus}
                >
                  {showFocus ? "Enabled" : "Disabled"}
                </Button>
              </div>

              {/* Reset Button */}
              <div className="pt-3 border-t border-emerald-500/30">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetSettings}
                  className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
              </div>

              {/* Keyboard Shortcuts Info */}
              <div className="text-xs text-gray-400 space-y-1">
                <p><strong>Keyboard Shortcuts:</strong></p>
                <p>Alt + Tab: Skip to main content</p>
                <p>Escape: Close this panel</p>
                <p>Tab: Navigate between elements</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
    </>
  )
}
