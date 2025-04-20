"use client"

import { useEffect, useState, useRef, Suspense, lazy } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Toaster } from "@/components/ui/toaster"
import GlitchText from "@/components/glitch-text"
import TerminalText from "@/components/terminal-text"

// Dynamically import components with code splitting for better performance
const Navbar = lazy(() => import("@/components/navbar"))
const Hero = lazy(() => import("@/components/hero"))
const About = lazy(() => import("@/components/about"))
const ProjectShowcase = lazy(() => import("@/components/project-showcase"))
const Resume = lazy(() => import("@/components/resume"))
const Contact = lazy(() => import("@/components/contact"))
const Footer = lazy(() => import("@/components/footer"))
const ParticleBackground = lazy(() => import("@/components/particle-background"))

// Simple loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="flex justify-center items-center py-24">
    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isParticlesEnabled, setIsParticlesEnabled] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const [visibleSections, setVisibleSections] = useState({
    about: false,
    projects: false,
    resume: false,
    contact: false,
  })

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
      // Simulate loading time but shorter
      setTimeout(() => {
        setIsLoading(false)
      }, 800)
    }

    preloadComponents()

    // Set up intersection observer for sections
    const observeSections = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.id
            if (id && ["about", "projects", "resume", "contact"].includes(id)) {
              if (entry.isIntersecting) {
                setVisibleSections((prev) => ({ ...prev, [id]: true }))
              }
            }
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
      )

      // Observe each section
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.observe(section)
      })

      return observer
    }

    // Set up observer after initial render
    let observer: IntersectionObserver
    if (!isLoading) {
      setTimeout(() => {
        observer = observeSections()
      }, 1000)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [isLoading, isHydrated])

  // Preload critical assets
  useEffect(() => {
    if (!isHydrated) return

    const preloadImages = () => {
      const criticalImages = [
        "/profile-image.png",
        "/triadic-marketing.png",
        "/saleha.png",
        "/heart2heart.png",
        "/kings-men.png",
      ]

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
      {isHydrated && isParticlesEnabled && (
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
      )}

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
                <TerminalText
                  text="Generating static HTML export..."
                  typingSpeed={15}
                  startDelay={600}
                  className="mb-2"
                />
                <TerminalText
                  text="✓ Compiled successfully"
                  typingSpeed={15}
                  startDelay={900}
                  className="text-white mb-2"
                />
                <TerminalText
                  text="✓ Export successful! Files written to /out"
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
            <Suspense fallback={<SectionLoader />}>
              <Navbar />
            </Suspense>
            <div className="container mx-auto px-4">
              <Suspense fallback={<SectionLoader />}>
                <Hero />
              </Suspense>

              {/* Load sections with dynamic imports */}
              <Suspense fallback={<SectionLoader />}>
                <About />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <ProjectShowcase />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Resume />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Contact />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <Footer />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
    </main>
  )
}
