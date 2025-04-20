"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Toaster } from "@/components/ui/toaster"
import dynamic from "next/dynamic"

// Simple components loaded normally
import GlitchText from "@/components/glitch-text"
import TerminalText from "@/components/terminal-text"

// Simple loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="flex justify-center items-center py-24">
    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

// Dynamically import components with lower loading priority
const Navbar = dynamic(() => import("@/components/navbar"), {
  ssr: true,
  loading: () => <div className="h-16 bg-background/80 backdrop-blur-md shadow-md"></div>,
})

const Hero = dynamic(() => import("@/components/hero"), {
  ssr: true,
  loading: () => <SectionLoader />,
})

// Load these components immediately but with dynamic import
const About = dynamic(() => import("@/components/about"), {
  loading: () => <SectionLoader />,
})

const ProjectShowcase = dynamic(() => import("@/components/project-showcase"), {
  loading: () => <SectionLoader />,
})

const Resume = dynamic(() => import("@/components/resume"), {
  loading: () => <SectionLoader />,
})

const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <SectionLoader />,
})

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <SectionLoader />,
})

// Load particle background with lowest priority
const ParticleBackground = dynamic(() => import("@/components/particle-background"), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isParticlesEnabled, setIsParticlesEnabled] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const sectionsRef = useRef<HTMLDivElement>(null)

  // Handle client-side hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Detect if device is low-powered
  useEffect(() => {
    if (!isHydrated) return

    const checkDevicePerformance = () => {
      // Check if device is mobile or has a low-end GPU
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const isLowPower = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const isHighEndDevice = !isMobile && !isLowPower && window.innerWidth > 768

      // Only enable particles for high-end devices
      setIsParticlesEnabled(isHighEndDevice)
    }

    checkDevicePerformance()

    // Preload critical components
    const preloadComponents = async () => {
      // Shorter loading time
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }

    preloadComponents()

    // Preload critical assets
    const preloadImages = () => {
      const criticalImages = ["/profile-image.png"]

      criticalImages.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }

    preloadImages()
  }, [isHydrated])

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/90 overflow-hidden">
      <div className="stars-container fixed inset-0 z-0 opacity-30" />

      {/* Only load particles if enabled */}
      {isHydrated && isParticlesEnabled && <ParticleBackground />}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-screen w-screen flex flex-col items-center justify-center bg-black"
          >
            <div className="w-full max-w-md p-4 bg-gray-900 rounded-md border border-gray-800 shadow-lg">
              <div className="flex items-center mb-2 border-b border-gray-700 pb-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-xs mx-auto">building</div>
              </div>
              <div className="font-mono text-sm text-emerald-500 mb-4">
                <TerminalText text="npm run build" typingSpeed={30} className="mb-2" />
                <TerminalText
                  text="Creating an optimized production build..."
                  typingSpeed={15}
                  startDelay={300}
                  className="mb-2"
                />
                <TerminalText text="Compiling..." typingSpeed={15} startDelay={600} className="mb-2" />
                <TerminalText
                  text="✓ Compiled successfully"
                  typingSpeed={15}
                  startDelay={900}
                  className="text-white mb-2"
                />
                <TerminalText
                  text="✓ Ready for deployment!"
                  typingSpeed={15}
                  startDelay={1200}
                  className="text-green-400"
                />
              </div>
              <div className="flex justify-center">
                <GlitchText className="text-xl font-bold text-emerald-500" enableOnHover={false} speed={0.5}>
                  USMAN ARSHAD
                </GlitchText>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            ref={sectionsRef}
            className="smooth-scroll"
          >
            <Navbar />
            <div className="container mx-auto px-4">
              <Hero />
              <About />
              <ProjectShowcase />
              <Resume />
              <Contact />
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
    </main>
  )
}
