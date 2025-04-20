"use client"

import type React from "react"

import { useState, useEffect, memo } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  sizes?: string
  quality?: number
  loading?: "eager" | "lazy"
  fallbackSrc?: string
  onLoadingComplete?: () => void
}

function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  style = {},
  priority = false,
  sizes = "100vw",
  quality = 75,
  loading = "lazy",
  fallbackSrc = "/placeholder.svg",
  onLoadingComplete,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Handle image loading errors
  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false)
    setHasError(false)
    setImgSrc(src)
  }, [src])

  // Combine provided styles with loading state styles
  const combinedStyles = {
    ...style,
    transition: "filter 0.5s ease, transform 0.5s ease, opacity 0.5s ease",
  }

  // Handle image load completion
  const handleLoadComplete = () => {
    setIsLoaded(true)
    if (onLoadingComplete) {
      onLoadingComplete()
    }
  }

  // Handle image load error
  const handleError = () => {
    setHasError(true)
    setImgSrc(fallbackSrc)
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: height || (fill ? "100%" : "auto"),
        width: width || (fill ? "100%" : "auto"),
        position: fill ? "relative" : "static",
      }}
    >
      <Image
        src={hasError ? fallbackSrc : imgSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`${className} ${!isLoaded ? "opacity-80" : "opacity-100"}`}
        style={combinedStyles}
        priority={priority}
        sizes={sizes}
        quality={quality}
        loading={loading}
        onLoadingComplete={handleLoadComplete}
        onError={handleError}
        unoptimized={true} // For static export
      />
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(OptimizedImage)
