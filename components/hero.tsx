"use client"

import { motion } from "framer-motion"
import { ArrowDown, Code, Database, Cpu, Palette, Terminal, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlitchText from "./glitch-text"
import TerminalText from "./terminal-text"
import { useState, useCallback, useEffect, memo } from "react"
import ResumeDownloadButton from "./resume-download-button"

function Hero() {
  const [showTerminal, setShowTerminal] = useState(true)
  const [showCode, setShowCode] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for subtle parallax effect with throttling
  useEffect(() => {
    let lastUpdate = 0
    const throttleMs = 50 // Only update every 50ms

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate > throttleMs) {
        setMousePosition({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        })
        lastUpdate = now
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }, [])

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          style={{ willChange: "transform" }}
        />
      </div>

      <div className="container mx-auto px-4 z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="mb-6">
            <GlitchText className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text">Usman Arshad</GlitchText>
            <motion.p
              className="text-lg md:text-xl text-emerald-500 font-mono mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              &lt;Full-Stack Developer /&gt;
            </motion.p>
          </div>

          {showTerminal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900 rounded-md p-4 mb-6 font-mono w-full border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex items-center mb-2 border-b border-gray-700 pb-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-xs mx-auto flex items-center">
                  <Terminal className="h-3 w-3 mr-1" />
                  terminal
                </div>
              </div>
              <div className="text-gray-300 text-left">
                <div className="flex items-start overflow-hidden whitespace-nowrap">
                  <span className="text-emerald-500 whitespace-nowrap">guest@usman-portfolio</span>
                  <span className="text-gray-400 whitespace-nowrap">:~$</span>
                  <TerminalText
                    text=" ./introduce.sh"
                    className="ml-2"
                    typingSpeed={30}
                    onComplete={() => setShowCode(true)}
                  />
                </div>

                {showCode && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 overflow-hidden"
                  >
                    <TerminalText
                      text="Hi, I'm Usman - a full-stack developer specializing in web and mobile applications."
                      typingSpeed={8}
                      startDelay={200}
                      className="text-gray-300"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            {[
              { icon: <Code className="h-5 w-5 text-emerald-500 mr-2" />, text: "Web Development" },
              { icon: <Database className="h-5 w-5 text-emerald-500 mr-2" />, text: "Database Management" },
              { icon: <Cpu className="h-5 w-5 text-emerald-500 mr-2" />, text: "Mobile Apps" },
              { icon: <Palette className="h-5 w-5 text-emerald-500 mr-2" />, text: "UI/UX Design" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-secondary/50 backdrop-blur-sm p-3 rounded-lg border border-emerald-500/20"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(39, 39, 42, 0.8)",
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.icon}
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Button
                size="lg"
                className="relative bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <ResumeDownloadButton
                variant="outline"
                size="lg"
                className="relative bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800"
              >
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </ResumeDownloadButton>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <ArrowDown className="h-6 w-6 text-emerald-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default memo(Hero)
