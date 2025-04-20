"use client"

import { useState, useEffect, useRef, memo } from "react"

interface TerminalTextProps {
  text: string
  typingSpeed?: number
  className?: string
  showCursor?: boolean
  startDelay?: number
  onComplete?: () => void
}

function TerminalText({
  text,
  typingSpeed = 50,
  className = "",
  showCursor = true,
  startDelay = 0,
  onComplete,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  // Use refs to avoid recreating intervals on re-renders
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Memoize the typing effect to improve performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const startTyping = () => {
      let currentIndex = 0

      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      // Create new typing interval
      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setIsComplete(true)
          if (onComplete) onComplete()
        }
      }, typingSpeed)
    }

    // Start typing after delay
    timeoutId = setTimeout(startTyping, startDelay)

    // Cleanup function
    return () => {
      clearTimeout(timeoutId)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [text, typingSpeed, startDelay, onComplete])

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return

    // Clear any existing cursor interval
    if (cursorIntervalRef.current) {
      clearInterval(cursorIntervalRef.current)
    }

    // Create new cursor blink interval
    cursorIntervalRef.current = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    // Cleanup function
    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current)
        cursorIntervalRef.current = null
      }
    }
  }, [showCursor])

  return (
    <div className={`font-mono ${className}`} style={{ willChange: "contents" }}>
      <span>{displayedText}</span>
      {showCursor && (
        <span
          className="inline-block w-2 h-5 bg-emerald-500 ml-1"
          style={{
            opacity: cursorVisible ? 1 : 0,
            transition: "opacity 0.2s ease",
            willChange: "opacity",
          }}
        />
      )}
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(TerminalText)
