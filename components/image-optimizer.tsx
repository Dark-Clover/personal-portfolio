"use client"

import type React from "react"

import { useState, useEffect, useRef, memo } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface PerformanceImageProps {
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
  blurDataURL?: string
  onLoadingComplete?: () => void
}

function PerformanceImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  style = {},
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw", // Responsive sizes
  quality = 75,
  loading = "lazy",
  fallbackSrc = "/placeholder.svg",
  blurDataURL,
  onLoadingComplete,
}: PerformanceImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  // Generate a simple blur data URL if none provided
  const placeholderBlur =
    blurDataURL ||
    `data:image/svg+xml;base64,${Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width || 100} ${height || 100}">
      <filter id="b" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="20" />
      </filter>
      <rect width="100%" height="100%" fill="#3f3f46" />
    </svg>`,
    ).toString("base64")}`

  // Handle image loading errors
  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false)
    setHasError(false)
    setImgSrc(src)
  }, [src])

  // Set up intersection observer for better lazy loading
  useEffect(() => {
    if (!imageRef.current || priority) {
      return
    }

    // If IntersectionObserver isn't available (e.g. SSR or very old browser),
    // just load the image immediately and skip observer logic.
    if (typeof IntersectionObserver === "undefined") {
      setImgSrc(src)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries?.length) return

        const entry = entries[0]
        if (entry.isIntersecting) {
          // Preload once the image is within viewport
          const img = new Image()
          img.src = src
          img.onload = () => setImgSrc(src)
          img.onerror = () => {
            setHasError(true)
            setImgSrc(fallbackSrc)
          }
          observer.disconnect()
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.01,
      },
    )

    observer.observe(imageRef.current)

    return () => observer.disconnect()
  }, [src, priority, fallbackSrc])

  // Combine provided styles with loading state styles
  const combinedStyles = {
    ...style,
    transition: "filter 0.3s ease, transform 0.3s ease, opacity 0.3s ease",
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
      ref={imageRef}
      className={cn("relative overflow-hidden bg-gray-800/20", fill ? "h-full w-full" : "", className)}
      style={{
        height: height || (fill ? "100%" : "auto"),
        width: width || (fill ? "100%" : "auto"),
        position: fill ? "relative" : "static",
      }}
    >
      {/* Shimmer effect while loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/10 to-transparent"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            zIndex: 1,
          }}
        />
      )}

      <Image
        src={hasError ? fallbackSrc : imgSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={cn("transition-opacity duration-300 ease-in-out", isLoaded ? "opacity-100" : "opacity-0")}
        style={combinedStyles}
        priority={priority}
        sizes={sizes}
        quality={quality}
        loading={priority ? "eager" : loading}
        onLoadingComplete={handleLoadComplete}
        onError={handleError}
        placeholder="blur"
        blurDataURL={placeholderBlur}
      />
    </div>
  )
}

// Add shimmer animation to global CSS
const shimmerCSS = `
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
`

// Memoize the component to prevent unnecessary re-renders
export default memo(PerformanceImage)
