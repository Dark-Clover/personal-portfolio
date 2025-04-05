"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(true)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Recreate particles on resize to ensure proper distribution
      initParticles()
    }

    // Create particles
    const initParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 50) // Reduced particle count
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Smaller particles
          speedX: (Math.random() - 0.5) * 0.3, // Slower movement
          speedY: (Math.random() - 0.5) * 0.3,
          color: theme === "dark" ? "#10b981" : "#059669",
        })
      }
    }

    // Connect particles with lines if they're close enough
    const connectParticles = () => {
      const maxDistance = 120 // Reduced connection distance

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Set opacity based on distance
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle =
              theme === "dark" ? `rgba(16, 185, 129, ${opacity * 0.15})` : `rgba(5, 150, 105, ${opacity * 0.15})`
            ctx.lineWidth = 0.5 // Thinner lines
            ctx.beginPath()
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      if (!isVisible) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (const particle of particlesRef.current) {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }

        if (particle.y < 0 || particle.y > canvas.height) {
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting)
      })
    }, { threshold: 0.1 });
    
    if (canvas) {
      observer.observe(canvas);
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    initParticles()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect();
    }
  }, [theme, isVisible])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none optimize-gpu" />
}

