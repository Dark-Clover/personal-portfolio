"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TerminalTextProps {
  text: string
  typingSpeed?: number
  className?: string
  showCursor?: boolean
  startDelay?: number
  onComplete?: () => void
}

export default function TerminalText({
  text,
  typingSpeed = 50,
  className = "",
  showCursor = true,
  startDelay = 0,
  onComplete,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Start typing after delay
    timeout = setTimeout(() => {
      setIsTyping(true)

      let currentIndex = 0
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(intervalId)
          setIsTyping(false)
          setIsComplete(true)
          if (onComplete) onComplete()
        }
      }, typingSpeed)

      return () => clearInterval(intervalId)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [text, typingSpeed, startDelay, onComplete])

  // Blinking cursor effect
  useEffect(() => {
    if (!showCursor) return

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [showCursor])

  return (
    <div className={`font-mono ${className}`}>
      <span>{displayedText}</span>
      {showCursor && (
        <motion.span
          animate={{ opacity: cursorVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={`inline-block w-2 h-5 bg-emerald-500 ml-1 ${isComplete ? "animate-blink" : ""}`}
        />
      )}
    </div>
  )
}

