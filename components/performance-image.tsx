"use client"

import type React from "react"

import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"

interface PerformanceImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  loading?: "eager" | "lazy"
  onLoadingComplete?: (img: HTMLImageElement) => void
}

const PerformanceImage: React.FC<PerformanceImageProps> = ({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  sizes,
  loading = "lazy",
  onLoadingComplete,
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(loading === "eager" || priority ? src : undefined)
  const imgRef = useRef<HTMLImageElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = useCallback(
    (img: HTMLImageElement) => {
      setIsLoaded(true)
      if (onLoadingComplete) {
        onLoadingComplete(img)
      }
    },
    [onLoadingComplete],
  )

  useEffect(() => {
    if (loading === "eager" || priority) {
      setImgSrc(src)
      return
    }

    if (typeof IntersectionObserver === "undefined") {
      // Fallback for environments without IntersectionObserver (e.g., old browsers, SSR)
      setImgSrc(src)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Ensure entries exist and have length before trying to access them
        if (entries && entries.length > 0) {
          const [entry] = entries
          // Explicitly check if the entry exists before accessing its properties
          if (entry && entry.isIntersecting) {
            setImgSrc(src)
            // Disconnect observer once image starts loading
            observer.disconnect()
          }
        }
      },
      {
        rootMargin: "200px", // Load image when it's 200px from viewport
      },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      // Ensure observer exists before trying to disconnect
      if (observer) {
        observer.disconnect()
      }
    }
  }, [src, loading, priority])

  return (
    <div className={`relative ${fill ? "h-full w-full" : ""}`}>
      <Image
        ref={imgRef}
        src={imgSrc || "/placeholder.svg"} // Use a placeholder if imgSrc is not yet set
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        priority={priority}
        sizes={sizes}
        onLoad={(e) => handleLoad(e.currentTarget)}
        onError={(e) => {
          console.error("Image failed to load:", e.currentTarget.src)
          setImgSrc("/placeholder.svg") // Fallback to a generic placeholder on error
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/40 animate-pulse rounded-md">
          {/* Optional: Add a spinner or custom loading indicator */}
        </div>
      )}
    </div>
  )
}

export default PerformanceImage
