"use client"

import { motion } from "framer-motion"
import { ArrowDown, Code, Database, Cpu, Palette } from 'lucide-react'
import { Button } from "@/components/ui/button"
import GlitchText from "./glitch-text"
import TerminalText from "./terminal-text"
import { useState } from "react"

export default function Hero() {
  const [showTerminal, setShowTerminal] = useState(true)
  const [showCode, setShowCode] = useState(false)
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative pt-16">
      <div className="container mx-auto px-4 z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="mb-6">
            <GlitchText className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text">
              Usman Arshad
            </GlitchText>
          </div>
          
          {showTerminal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900 rounded-md p-4 mb-6 font-mono w-full"
            >
              <div className="flex items-center mb-2 border-b border-gray-700 pb-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-xs mx-auto">terminal</div>
              </div>
              <div className="text-gray-300 text-left">
                <div className="flex flex-wrap">
                  <span className="text-emerald-500">guest@usman-portfolio</span>
                  <span className="text-gray-400">:~$</span>
                  <TerminalText 
                    text=" ./introduce.sh" 
                    className="ml-2"
                    typingSpeed={80}
                    onComplete={() => setShowCode(true)}
                  />
                </div>
                
                {showCode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                    className="mt-2"
                  >
                    <TerminalText 
                      text="Hi, I'm Usman - a full-stack developer specializing in web and mobile applications."
                      typingSpeed={20}
                      startDelay={300}
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
            transition={{ delay: 2.1, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            <motion.div
              className="flex items-center bg-secondary/50 backdrop-blur-sm p-3 rounded-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(39, 39, 42, 0.8)",
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Code className="h-5 w-5 text-emerald-500 mr-2" />
              <span>Web Development</span>
            </motion.div>
            <motion.div
              className="flex items-center bg-secondary/50 backdrop-blur-sm p-3 rounded-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(39, 39, 42, 0.8)",
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Database className="h-5 w-5 text-emerald-500 mr-2" />
              <span>Database Management</span>
            </motion.div>
            <motion.div
              className="flex items-center bg-secondary/50 backdrop-blur-sm p-3 rounded-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(39, 39, 42, 0.8)",
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Cpu className="h-5 w-5 text-emerald-500 mr-2" />
              <span>Mobile Apps</span>
            </motion.div>
            <motion.div
              className="flex items-center bg-secondary/50 backdrop-blur-sm p-3 rounded-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(39, 39, 42, 0.8)",
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Palette className="h-5 w-5 text-emerald-500 mr-2" />
              <span>UI/UX Design</span>
            </motion.div>
          </motion.div>
          
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
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <ArrowDown className="h-6 w-6 text-emerald-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}

