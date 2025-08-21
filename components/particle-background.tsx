"use client"

import { useEffect, useRef, useState, memo } from "react"


interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      const dpr = 1 // Use a fixed DPR of 1 for better performance
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)

      // Recreate particles on resize to ensure proper distribution
      initParticles()
    }

    // Create particles
    const initParticles = () => {
      // Adjust particle count based on screen size
      const width = window.innerWidth
      let particleCount = 8 // Further reduced for better performance

      if (width < 768) {
        particleCount = 4 // Mobile
      } else if (width < 1024) {
        particleCount = 6 // Tablet
      }

      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Smaller particles
          speedX: (Math.random() - 0.5) * 0.05, // Much slower movement
          speedY: (Math.random() - 0.5) * 0.05,
          color: "#10b981", // Always emerald-500 for dark mode
        })
      }
    }

    // Connect particles with lines if they're close enough
    const connectParticles = () => {
      const maxDistance = 80 // Reduced connection distance

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Set opacity based on distance
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.1})` // Always emerald for dark mode
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

      // Throttle to 30fps for better performance
      if (timestamp - lastTimeRef.current < 33) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

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
      animationRef.current = requestAnimationFrame(animate)
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

    window.addEventListener("resize", handleResize, { passive: true })
    handleResize()
    initParticles()
    lastTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect()
    }
  }, [isVisible])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-20 pointer-events-none will-change-transform" />
}

export default memo(ParticleBackground)
