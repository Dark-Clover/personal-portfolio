"use client"

import type React from "react"

import "./glitch-text.css"

interface GlitchTextProps {
  children: string
  speed?: number
  enableShadows?: boolean
  enableOnHover?: boolean
  className?: string
}

const GlitchText = ({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = true,
  className = "",
}: GlitchTextProps) => {
  const inlineStyles = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    "--after-shadow": enableShadows ? "-5px 0 #ff2d75" : "none",
    "--before-shadow": enableShadows ? "5px 0 #00ffe7" : "none",
  } as React.CSSProperties

  const hoverClass = enableOnHover ? "enable-on-hover" : ""

  return (
    <div className={`glitch ${hoverClass} ${className}`} style={inlineStyles} data-text={children}>
      {children}
    </div>
  )
}

export default GlitchText
