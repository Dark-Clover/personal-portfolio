"use client"

import { useEffect, useState, useRef, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Toaster } from "@/components/ui/toaster"
import dynamic from "next/dynamic"

// Import lightweight components directly
import GlitchText from "@/components/glitch-text"
import TerminalText from "@/components/terminal-text"

import Accessibility from "@/components/accessibility"
import MobileNav from "@/components/mobile-nav"

// Simple loading components
const SectionSkeleton = () => (
  <div className="w-full py-16 space-y-4 animate-pulse">
    <div className="h-8 bg-gray-700/30 rounded-md w-1/3 mx-auto"></div>
    <div className="h-4 bg-gray-700/20 rounded-md w-2/3 mx-auto"></div>
    <div className="h-4 bg-gray-700/20 rounded-md w-1/2 mx-auto"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-800/40 rounded-lg"></div>
      ))}
    </div>
  </div>
)

// Navbar is critical for navigation, load with higher priority
const Navbar = dynamic(() => import("@/components/navbar"), {
  ssr: true,
  loading: () => <div className="h-16 bg-background/80 backdrop-blur-md shadow-md"></div>,
})

// Hero section is critical for first impression, load with higher priority
const Hero = dynamic(() => import("@/components/hero"), {
  ssr: true,
  loading: () => <SectionSkeleton />,
})

// Load other sections with lower priority
const About = dynamic(() => import("@/components/about"), {
  loading: () => <SectionSkeleton />,
})

const Skills = dynamic(() => import("@/components/skills"), {
  loading: () => <SectionSkeleton />,
})

const ProjectShowcase = dynamic(() => import("@/components/project-showcase"), {
  loading: () => <SectionSkeleton />,
})

const Resume = dynamic(() => import("@/components/resume"), {
  loading: () => <SectionSkeleton />,
})

const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <SectionSkeleton />,
})



const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <SectionSkeleton />,
})

// Load particles with lowest priority and only on capable devices
const OptimizedParticles = dynamic(() => import("@/components/optimized-particles"), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isParticlesEnabled, setIsParticlesEnabled] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [resourcesLoaded, setResourcesLoaded] = useState(false)
  const sectionsRef = useRef<HTMLDivElement>(null)

  // Handle client-side hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Detect device capabilities and preload critical resources
  useEffect(() => {
    if (!isHydrated) return

    // Check device capabilities
    const checkDevicePerformance = () => {
      // Check if device is mobile or has a low-end GPU
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const isLowPower = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const isHighEndDevice = !isMobile && !isLowPower && window.innerWidth > 768

      // Only enable particles for high-end devices
      setIsParticlesEnabled(isHighEndDevice)
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const isLowPower = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    checkDevicePerformance()

    // Preload critical resources
    const preloadResources = async () => {
      // Preload critical images
      const criticalImages = ["/profile-image-new.png"]

      // Create image promises
      const imagePromises = criticalImages.map((src) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => resolve(true)
          img.onerror = () => resolve(false)
          img.src = src
        })
      })

      // Wait for critical resources to load
      await Promise.all([
        // Add a small timeout to ensure UI is responsive
        new Promise((resolve) => setTimeout(resolve, 300)),
        // Wait for images
        ...imagePromises,
      ])

      setResourcesLoaded(true)

      // Slightly delay removing the loading screen for smoother transition
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }

    preloadResources()

    // Add performance monitoring
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      // Report web vitals
      const reportWebVitals = async () => {
        try {
          const { getCLS, getFID, getLCP, getFCP, getTTFB } = await import("web-vitals")

          getCLS(console.log)
          getFID(console.log)
          getLCP(console.log)
          getFCP(console.log)
          getTTFB(console.log)
        } catch (error) {
          console.error("Failed to load web-vitals", error)
        }
      }

      reportWebVitals()
    }

    // Add event listener for performance issues
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Page is hidden, can pause heavy animations
        setIsParticlesEnabled(false)
      } else if (!isLowPower && !isMobile && window.innerWidth > 768) {
        // Page is visible again, resume animations if device is capable
        setIsParticlesEnabled(true)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isHydrated])

  // Add resource hints for better performance
  useEffect(() => {
    if (typeof document === "undefined") return

    // DNS prefetch for external resources
    const dnsPrefetch = (url: string) => {
      const link = document.createElement("link")
      link.rel = "dns-prefetch"
      link.href = url
      document.head.appendChild(link)
    }

    // Preconnect to critical domains
    const preconnect = (url: string, crossOrigin?: string) => {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = url
      if (crossOrigin) link.crossOrigin = crossOrigin
      document.head.appendChild(link)
    }

    // Preload critical assets
    const preload = (url: string, as: string) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = url
      link.as = as
      document.head.appendChild(link)
    }

    // Add resource hints
    dnsPrefetch("https://fonts.googleapis.com")
    dnsPrefetch("https://fonts.gstatic.com")

    preconnect("https://fonts.googleapis.com", "anonymous")
    preconnect("https://fonts.gstatic.com", "anonymous")

    preload("/profile-image-new.png", "image")
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/90 overflow-hidden">
      <div className="stars-container fixed inset-0 z-0 opacity-20" />

      {/* Only load particles if enabled and page is fully loaded */}
      {isHydrated && isParticlesEnabled && !isLoading && <OptimizedParticles />}

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
                {resourcesLoaded && (
                  <TerminalText
                    text="✓ Ready for deployment!"
                    typingSpeed={15}
                    startDelay={300}
                    className="text-green-400"
                  />
                )}
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
            id="main-content"
          >
            <Navbar />
            

            
            {/* Mobile Navigation */}
            <MobileNav className="fixed top-6 left-6 z-40" />
            
            <div className="container mx-auto px-4">
              {/* Load hero section immediately */}
              <Suspense fallback={<SectionSkeleton />}>
                <Hero />
              </Suspense>

              {/* Load other sections with progressive enhancement */}
              <Suspense fallback={<SectionSkeleton />}>
                <About />
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <Skills />
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <ProjectShowcase />
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <Resume />
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <Contact />
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <Footer />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
      
      {/* Accessibility Component */}
      <Accessibility />
      
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="skip-link"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
    </main>
  )
}
