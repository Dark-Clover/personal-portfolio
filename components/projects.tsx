"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from 'lucide-react'
import { useState, useCallback } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Project {
  title: string
  description: string
  image: string
  logo?: string
  tags: string[]
  github: string
  demo: string
  category?: "personal" | "professional" | "academic"
  date?: string
  institution?: string
}

const projects: Project[] = [
  {
    title: "Fake News Detector in Python",
    description:
      "Developed an AI-powered agent using NLP models and datasets to analyze specific phrases and linguistic patterns, determining whether an article is real or fake. This project leveraged advanced Natural Language Processing techniques to enhance accuracy in misinformation detection.",
    image: "/fake-news-detector.jpg",
    tags: ["Python", "NLP", "Machine Learning", "Artificial Neural Networks", "Classification"],
    github: "#",
    demo: "#",
    category: "academic",
    date: "Nov 2024 - Jan 2025",
    institution: "Bahria University",
  },
  {
    title: "SRS Document on Google Chrome",
    description:
      "Developed a comprehensive Software Requirements Specification (SRS) document for Google Chrome enhancements. Covered aspects like user classes, product functions, external interfaces, and nonfunctional requirements. Enhanced skills in requirement analysis and documentation.",
    image: "/srs-document.jpg",
    tags: ["Requirements Analysis", "UML", "Data-flow Diagrams", "Activity Diagrams", "ERD"],
    github: "#",
    demo: "#",
    category: "academic",
    date: "May 2024 - Jun 2024",
    institution: "Bahria University",
  },
  {
    title: "Nessus Vulnerability Assessment",
    description:
      "Utilized the Nessus Vulnerability Scanner to assess security vulnerabilities on our university's website and Yahoo. Analyzed scan results, prioritized critical issues, and provided actionable recommendations to enhance website security.",
    image: "/vunerability-scanner.jpg",
    tags: ["Cybersecurity", "Vulnerability Assessment", "Security Analysis", "Nessus"],
    github: "#",
    demo: "#",
    category: "academic",
    date: "Apr 2024 - May 2024",
    institution: "Bahria University",
  },
  {
    title: "CodeAlpha Image Gallery",
    description:
      "A responsive image gallery built with HTML, CSS, and JavaScript. It features a seamless design that adjusts across all devices, allowing users to zoom in on images for detailed viewing. The gallery includes smooth transitions and a user-friendly interface.",
    image: "/image-gallery.png",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    github: "https://github.com/Dark-Clover/CodeAlpha_Image_Gallery",
    demo: "#",
    category: "personal",
  },

  {
    title: "Music Player",
    description:
      "Personal Portfolio and Music Player project that includes a simple music player. The portfolio showcases personal information, skills, projects, and contact details, while the integrated music player allows visitors to enjoy music while browsing.",
    image: "/music-player.png",
    tags: ["JavaScript", "HTML", "CSS", "Audio API"],
    github: "https://github.com/Dark-Clover/Music-Player",
    demo: "#",
    category: "personal",
  },
  {
    title: "Anees Kingsmen Portfolio",
    description:
      "Designed and developed a sleek, luxury-themed portfolio website for Anees Kingsmen Real Estate. The site features elegant animations, responsive design, and a sophisticated black and gold color scheme that reflects the premium brand identity.",
    image: "/badge_png.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    github: "#",
    demo: "https://aneeskingsmen.com/",
    category: "professional",
  },
  {
    title: "OtakuStream - Anime Streaming App",
    description:
      "Developed a feature-rich anime streaming application that allows users to browse, search, and watch their favorite anime series. Implemented user authentication, favorites list, and watch history tracking.",
    image: "/otaku.png",
    tags: ["React Native", "Firebase", "API Integration", "Mobile Development"],
    github: "#",
    demo: "#",
    category: "professional",
  },
  {
    title: "H2H Courses - Learning Platform",
    description:
      "A fully functional online learning platform developed for Heart2Heart, offering users a seamless way to explore, purchase, and access digital courses. Implemented Firebase authentication, Stripe payment integration, and dynamic content access control.",
    image: "/H2H-logo.png",
    tags: ["Firebase", "Stripe", "React", "Firestore"],
    github: "#",
    demo: "https://h2hcourses.com",
    category: "professional",
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Memoize filtered projects to prevent unnecessary recalculations
  const filteredProjects = useCallback(() => {
    return activeCategory === "all" 
      ? projects 
      : projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced stagger time
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }, // Slightly faster animations
    },
  }

  return (
    <section id="projects" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto"
      >
        <motion.h2 variants={itemVariants} className="section-heading text-center mx-auto">
          My Projects
        </motion.h2>

        <motion.div variants={itemVariants} className="flex justify-center mb-8 gap-2 flex-wrap">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            onClick={() => setActiveCategory("all")}
            className={activeCategory === "all" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            size={isMobile ? "sm" : "default"}
          >
            All Projects
          </Button>
          <Button
            variant={activeCategory === "professional" ? "default" : "outline"}
            onClick={() => setActiveCategory("professional")}
            className={activeCategory === "professional" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            size={isMobile ? "sm" : "default"}
          >
            Professional
          </Button>
          <Button
            variant={activeCategory === "academic" ? "default" : "outline"}
            onClick={() => setActiveCategory("academic")}
            className={activeCategory === "academic" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            size={isMobile ? "sm" : "default"}
          >
            Academic
          </Button>
          <Button
            variant={activeCategory === "personal" ? "default" : "outline"}
            onClick={() => setActiveCategory("personal")}
            className={activeCategory === "personal" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            size={isMobile ? "sm" : "default"}
          >
            Personal
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects().map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="transition-all duration-300 hover:translate-y-[-5px] optimize-gpu"
              layout
            >
              <Card className="h-full border-emerald-500/20 overflow-hidden bg-opacity-80 backdrop-blur-sm">
                <div className="relative h-48 w-full group">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Show logo overlay for Kingsmen project */}
                  {project.logo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                      <div className="w-3/4 h-auto relative">
                        <Image
                          src={project.logo || "/placeholder.svg"}
                          alt={`${project.title} Logo`}
                          width={400}
                          height={200}
                          className="object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}

                  {/* Academic badge */}
                  {project.category === "academic" && project.institution && (
                    <div className="absolute top-2 left-2 bg-emerald-600/90 text-white text-xs py-1 px-2 rounded-md">
                      {project.institution}
                    </div>
                  )}

                  {/* Date badge */}
                  {project.date && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded-md">
                      {project.date}
                    </div>
                  )}

                  {/* Overlay with buttons on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-emerald-600/20 border-emerald-500 text-white hover:bg-emerald-600/40"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>

                    <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl gradient-text">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4 text-sm line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="bg-secondary/50 text-foreground/80 border-emerald-500/20 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

