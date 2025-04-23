"use client"

import { useEffect, useRef, useState, memo } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

function OptimizedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(true)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const frameCountRef = useRef<number>(0)
  const isInitializedRef = useRef<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
    })
    if (!ctx) return

    // Set canvas to full screen with lower resolution for better performance
    const handleResize = () => {
      // Use a fixed scale factor of 0.5 for better performance
      const scale = 0.5
      canvas.width = window.innerWidth * scale
      canvas.height = window.innerHeight * scale
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(scale, scale)

      // Only initialize particles if not already done
      if (!isInitializedRef.current) {
        initParticles()
        isInitializedRef.current = true
      }
    }

    // Create particles
    const initParticles = () => {
      // Adjust particle count based on screen size
      const width = window.innerWidth
      let particleCount = 5 // Minimal particles for better performance

      if (width < 768) {
        particleCount = 3 // Mobile
      } else if (width < 1024) {
        particleCount = 4 // Tablet
      }

      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1 + 0.5, // Even smaller particles
          speedX: (Math.random() - 0.5) * 0.03, // Much slower movement
          speedY: (Math.random() - 0.5) * 0.03,
          color: theme === "dark" ? "#10b981" : "#059669",
        })
      }
    }

    // Connect particles with lines if they're close enough
    const connectParticles = () => {
      const maxDistance = 60 // Reduced connection distance

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Set opacity based on distance
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle =
              theme === "dark" ? `rgba(16, 185, 129, ${opacity * 0.08})` : `rgba(5, 150, 105, ${opacity * 0.08})`
            ctx.lineWidth = 0.5 // Thinner lines
            ctx.beginPath()
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop with time-based animation and throttling
    const animate = (timestamp: number) => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Throttle to 15fps for better performance
      if (timestamp - lastTimeRef.current < 66) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      // Only clear and redraw every 2 frames for better performance
      frameCountRef.current++
      if (frameCountRef.current % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        for (const particle of particlesRef.current) {
          // Use delta time to make movement frame-rate independent
          particle.x += particle.speedX * (deltaTime / 16)
          particle.y += particle.speedY * (deltaTime / 16)

          // Bounce off edges
          if (particle.x < 0 || particle.x > window.innerWidth) {
            particle.speedX = -particle.speedX
          }

          if (particle.y < 0 || particle.y > window.innerHeight) {
            particle.speedY = -particle.speedY
          }

          // Draw particle
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }

        connectParticles()
      }

      // Use requestIdleCallback if available, otherwise use requestAnimationFrame
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(
          () => {
            animationRef.current = requestAnimationFrame(animate)
          },
          { timeout: 100 },
        )
      } else {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    // Visibility observer to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 },
    )

    if (canvas) {
      observer.observe(canvas)
    }

    // Use passive event listener for better performance
    window.addEventListener("resize", handleResize, { passive: true })
    handleResize()
    lastTimeRef.current = performance.now()

    // Start animation on next idle callback
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => {
        animationRef.current = requestAnimationFrame(animate)
      })
    } else {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect()
    }
  }, [theme, isVisible])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-15 pointer-events-none" aria-hidden="true" />
}

export default memo(OptimizedParticles)
