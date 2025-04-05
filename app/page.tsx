"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Resume from "@/components/resume"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import ParticleBackground from "@/components/particle-background"
import GlitchText from "@/components/glitch-text"
import TerminalText from "@/components/terminal-text"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const sectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/90 overflow-hidden">
      <div className="stars-container fixed inset-0 z-0 opacity-30" />
      <ParticleBackground />

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
                <TerminalText text="npm run build" typingSpeed={50} className="mb-2" />
                <TerminalText
                  text="Creating an optimized production build..."
                  typingSpeed={30}
                  startDelay={500}
                  className="mb-2"
                />
                <TerminalText
                  text="Generating static HTML export..."
                  typingSpeed={30}
                  startDelay={1000}
                  className="mb-2"
                />
                <TerminalText
                  text="✓ Compiled successfully"
                  typingSpeed={30}
                  startDelay={1500}
                  className="text-white mb-2"
                />
                <TerminalText
                  text="✓ Export successful! Files written to /out"
                  typingSpeed={30}
                  startDelay={2000}
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
              <Projects />
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

