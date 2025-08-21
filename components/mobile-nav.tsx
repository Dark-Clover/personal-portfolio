"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Code, 
  Briefcase, 
  FileText, 
  Mail, 
  ChevronRight,
  Download,
  ExternalLink
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import ResumeDownloadButton from "./resume-download-button"

interface MobileNavProps {
  className?: string
}

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "#home" },
  { id: "about", label: "About", icon: User, href: "#about" },
  { id: "skills", label: "Skills", icon: Code, href: "#skills" },
  { id: "projects", label: "Projects", icon: Briefcase, href: "#projects" },
  { id: "resume", label: "Resume", icon: FileText, href: "#resume" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
]

const socialLinks = [
  { 
    name: "GitHub", 
    url: "https://github.com/Dark-Clover", 
    icon: ExternalLink,
    color: "hover:text-gray-300"
  },
  { 
    name: "LinkedIn", 
    url: "https://www.linkedin.com/in/usman-arshad-647235247", 
    icon: ExternalLink,
    color: "hover:text-blue-400"
  },
  { 
    name: "Instagram", 
    url: "https://www.instagram.com/usmaniii", 
    icon: ExternalLink,
    color: "hover:text-pink-400"
  },
]

export default function MobileNav({ className = "" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const navRef = useRef<HTMLDivElement>(null)

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && isOpen) {
      // Swipe left to close
      setIsOpen(false)
    } else if (isRightSwipe && !isOpen) {
      // Swipe right to open
      setIsOpen(true)
    }
  }

  // Close nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden" // Prevent background scroll
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      })
      setIsOpen(false)
    }
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "download-resume":
        // Trigger resume download
        const downloadBtn = document.querySelector('[data-resume-download]') as HTMLButtonElement
        if (downloadBtn) downloadBtn.click()
        break
      case "contact":
        scrollToSection("contact")
        break
      case "projects":
        scrollToSection("projects")
        break
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.div
        className={`lg:hidden ${className}`}
        ref={navRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0 bg-gray-900/50 hover:bg-gray-800/70 border border-emerald-500/20 text-emerald-400"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
          >
            <motion.div
              ref={navRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-md border-l border-emerald-500/20 shadow-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-emerald-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold gradient-text">Menu</h2>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleQuickAction("download-resume")}
                      variant="outline"
                      size="sm"
                      className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                    <Button
                      onClick={() => handleQuickAction("contact")}
                      variant="outline"
                      size="sm"
                      className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-6">
                  <ul className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      const isActive = activeSection === item.id
                      
                      return (
                        <motion.li
                          key={item.id}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon className="h-5 w-5" />
                              <span className="font-medium">{item.label}</span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </motion.li>
                      )
                    })}
                  </ul>
                </nav>

                {/* Social Links & Footer */}
                <div className="p-6 border-t border-emerald-500/20 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Follow Me</h3>
                    <div className="flex space-x-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon
                        return (
                          <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-lg bg-gray-800/50 hover:bg-emerald-500/20 text-gray-400 transition-all duration-200 ${social.color}`}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Icon className="h-5 w-5" />
                          </motion.a>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center">
                    <p>© 2024 Usman Arshad</p>
                    <p>Built with Next.js & Tailwind</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Touch Gesture Indicator */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="fixed bottom-20 left-4 z-40 lg:hidden"
        >
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 border border-emerald-500/20">
            <p className="text-xs text-emerald-400 text-center">
              💡 Swipe right to open menu
            </p>
          </div>
        </motion.div>
      )}
    </>
  )
}
