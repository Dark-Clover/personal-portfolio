"use client"

import { useMemo } from "react"
import { useState, useRef, useEffect, memo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Star,
  Calendar,
  Briefcase,
  GraduationCap,
  Code,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import OptimizedImage from "./image-optimizer"
import { useMediaQuery } from "@/hooks/use-media-query"

// Project type definition
interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo: string
  category: "professional" | "academic" | "personal"
  date?: string
  institution?: string
  hideButtons?: boolean
  featured?: boolean
}

// Project data with enhanced details
const projects: Project[] = [
  {
    id: "triadic-marketing",
    title: "Triadic Marketing Media Website",
    description:
      "Designed and developed a modern, responsive website for Triadic Marketing Media, a digital marketing agency that helps brands grow through strategic marketing solutions. The site features a clean, professional design with smooth animations, interactive elements, and optimized performance for all devices.",
    image: "/triadic-marketing.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Responsive Design", "SEO"],
    github: "#",
    demo: "https://triadicmarketing.com/",
    category: "professional",
    date: "2023 - Present",
    featured: true,
  },
  {
    id: "saleha-khan",
    title: "Saleha Khan Healer Website",
    description:
      "Developed a session booking website for healer and therapist Saleha Khan, featuring an integrated payment system and an admin dashboard for managing appointments. The site provides a serene, user-friendly interface that reflects her healing practice.",
    image: "/saleha.png",
    tags: ["React", "Payment Integration", "Admin Dashboard", "Booking System", "Responsive Design"],
    github: "#",
    demo: "https://www.salehakhanhealer.com/",
    category: "professional",
    date: "2023 - Present",
    featured: true,
  },
  {
    id: "h2h-courses",
    title: "H2H Courses - Relationship Learning Platform",
    description:
      "A fully functional online learning platform developed for Heart2Heart, offering users a seamless way to explore, purchase, and access digital relationship courses. Implemented Firebase authentication, Stripe payment integration, and dynamic content access control with a user dashboard for course management.",
    image: "/heart2heart.png",
    tags: ["Firebase", "Stripe", "React", "Firestore", "Authentication"],
    github: "#",
    demo: "http://h2hcourses.com",
    category: "professional",
    featured: true,
  },
  {
    id: "kingsmen-portfolio",
    title: "Anees Kingsmen Portfolio",
    description:
      "Designed and developed a sleek, luxury-themed portfolio website for Anees Antapur, the CEO of Kingsmen Real Estate, one of the most successful real estate companies in UAE. The site features elegant animations, responsive design, and a sophisticated black and gold color scheme that reflects the premium brand identity.",
    image: "/kings-men.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design", "Luxury Branding"],
    github: "#",
    demo: "https://aneeskingsmen.com/",
    category: "professional",
    featured: true,
  },
  {
    id: "anime-streaming",
    title: "OtakuStream - Anime Streaming App",
    description:
      "Developed a feature-rich anime streaming application that allows users to browse, search, and watch their favorite anime series. Implemented user authentication, favorites list, and watch history tracking with a clean, intuitive interface designed for anime enthusiasts.",
    image: "/anime-streaming-app.png",
    tags: ["React Native", "Firebase", "API Integration", "Mobile Development", "UI/UX Design"],
    github: "#",
    demo: "#",
    category: "academic",
    date: "Feb 2024 - Apr 2024",
    institution: "Bahria University",
    hideButtons: true,
  },
  {
    id: "fake-news-detector",
    title: "Fake News Detector in Python",
    description:
      "Developed an AI-powered agent using NLP models and datasets to analyze specific phrases and linguistic patterns, determining whether an article is real or fake. This project leveraged advanced Natural Language Processing techniques to enhance accuracy in misinformation detection.",
    image: "/ai-fake-news-detection.png",
    tags: ["Python", "NLP", "Machine Learning", "Artificial Neural Networks", "Classification"],
    github: "#",
    demo: "#",
    category: "academic",
    date: "Nov 2024 - Jan 2025",
    institution: "Bahria University",
    hideButtons: true,
  },
  {
    id: "srs-document",
    title: "SRS Document on Google Chrome",
    description:
      "Developed a comprehensive Software Requirements Specification (SRS) document for Google Chrome enhancements. Covered aspects like user classes, product functions, external interfaces, and nonfunctional requirements. Enhanced skills in requirement analysis and documentation.",
    image: "/srs-document-abstract.png",
    tags: ["Requirements Analysis", "UML", "Data-flow Diagrams", "Activity Diagrams", "ERD"],
    github: "#",
    demo: "#",
    category: "academic",
    date: "May 2024 - Jun 2024",
    institution: "Bahria University",
    hideButtons: true,
  },
  {
    id: "vulnerability-assessment",
    title: "Nessus Vulnerability Assessment",
    description:
      "Utilized the Nessus Vulnerability Scanner to assess security vulnerabilities on our university's website and Yahoo. Analyzed scan results, prioritized critical issues, and provided actionable recommendations to enhance website security.",
    image: "/cyber-threat-overview.png",
    tags: ["Cybersecurity", "Vulnerability Assessment", "Security Analysis", "Nessus"],
    github: "#",
    demo: "#",
    category: "academic",
    date: "Apr 2024 - May 2024",
    institution: "Bahria University",
    hideButtons: true,
  },
  {
    id: "image-gallery",
    title: "CodeAlpha Image Gallery",
    description:
      "A responsive image gallery built with HTML, CSS, and JavaScript. It features a seamless design that adjusts across all devices, allowing users to zoom in on images for detailed viewing. The gallery includes smooth transitions and a user-friendly interface.",
    image: "/image-gallery-project.png",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    github: "https://github.com/Dark-Clover/CodeAlpha_Image_Gallery",
    demo: "#",
    category: "personal",
  },
  {
    id: "music-player",
    title: "Music Player",
    description:
      "Personal Portfolio and Music Player project that includes a simple music player. The portfolio showcases personal information, skills, projects, and contact details, while the integrated music player allows visitors to enjoy music while browsing.",
    image: "/music-player-project.png",
    tags: ["JavaScript", "HTML", "CSS", "Audio API"],
    github: "https://github.com/Dark-Clover/Music-Player",
    demo: "#",
    category: "personal",
  },
]

// Featured Project Slider component - Memoized for performance
const FeaturedProjectSlider = memo(
  ({
    projects,
    onViewProject,
  }: {
    projects: Project[]
    onViewProject: (project: Project) => void
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const featuredProjects = useMemo(() => projects.filter((p) => p.featured), [projects])
    const isMobile = useMediaQuery("(max-width: 768px)")
    const autoplayRef = useRef<NodeJS.Timeout | null>(null)
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    const goToNext = useCallback(() => {
      if (isAnimating) return
      setIsAnimating(true)
      setIsImageLoaded(false)
      setCurrentIndex((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1))
      setTimeout(() => setIsAnimating(false), 500)
    }, [isAnimating, featuredProjects.length])

    const goToPrev = useCallback(() => {
      if (isAnimating) return
      setIsAnimating(true)
      setIsImageLoaded(false)
      setCurrentIndex((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1))
      setTimeout(() => setIsAnimating(false), 500)
    }, [isAnimating, featuredProjects.length])

    // Reset autoplay when index changes
    useEffect(() => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }

      autoplayRef.current = setInterval(() => {
        goToNext()
      }, 6000)

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current)
        }
      }
    }, [currentIndex, goToNext])

    const handleMouseEnter = useCallback(() => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
    }, [])

    const handleMouseLeave = useCallback(() => {
      if (!autoplayRef.current) {
        autoplayRef.current = setInterval(() => {
          goToNext()
        }, 6000)
      }
    }, [goToNext])

    // Preload next image for smoother transitions
    useEffect(() => {
      const nextIndex = currentIndex === featuredProjects.length - 1 ? 0 : currentIndex + 1
      const nextImage = new Image()
      nextImage.src = featuredProjects[nextIndex].image
    }, [currentIndex, featuredProjects])

    const currentProject = featuredProjects[currentIndex]

    return (
      <div
        className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-emerald-500/20"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background image with parallax effect */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full"
            >
              <OptimizedImage
                src={currentProject.image}
                alt={currentProject.title}
                fill
                className="object-cover"
                priority={true}
                sizes="100vw"
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Loading indicator */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <Badge
                variant="outline"
                className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30 backdrop-blur-sm"
              >
                Featured Project
              </Badge>

              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">{currentProject.title}</h3>

              <p className="text-gray-300 mb-6 text-sm md:text-base max-w-2xl">{currentProject.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {currentProject.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="bg-gray-900/70 text-gray-300 border-gray-700 backdrop-blur-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full" asChild>
                  <a href={currentProject.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Site
                  </a>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="absolute bottom-6 right-6 flex space-x-2">
            {featuredProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAnimating(true)
                  setIsImageLoaded(false)
                  setCurrentIndex(i)
                  setTimeout(() => setIsAnimating(false), 500)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-emerald-500 w-6" : "bg-gray-500/50 hover:bg-gray-400/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        {!isMobile && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center border border-white/10 hover:bg-black/50 transition-all z-20"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center border border-white/10 hover:bg-black/50 transition-all z-20"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    )
  },
)

FeaturedProjectSlider.displayName = "FeaturedProjectSlider"

// Project Card component
const ProjectCard = memo(
  ({
    project,
    onViewProject,
  }: {
    project: Project
    onViewProject: (project: Project) => void
  }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [cardRef, cardInView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: "100px",
    })
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    // Category-specific styling
    const getCategoryStyles = () => {
      switch (project.category) {
        case "professional":
          return {
            badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
            icon: <Briefcase className="h-4 w-4 mr-1" />,
          }
        case "academic":
          return {
            badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
            icon: <GraduationCap className="h-4 w-4 mr-1" />,
          }
        case "personal":
          return {
            badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
            icon: <Code className="h-4 w-4 mr-1" />,
          }
      }
    }

    const categoryStyles = getCategoryStyles()

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="h-full will-change-transform"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ contain: "layout" }}
      >
        <div
          className="h-full rounded-xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all duration-300"
          style={{
            transform: isHovered ? "translateY(-5px)" : "translateY(0)",
            boxShadow: isHovered ? "0 15px 30px -10px rgba(0, 0, 0, 0.5)" : "none",
            willChange: "transform, box-shadow",
          }}
        >
          {/* Image container */}
          <div className="relative h-48 overflow-hidden">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-emerald-500/40 border-t-emerald-500 rounded-full animate-spin"></div>
              </div>
            )}

            <OptimizedImage
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-all duration-500"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                willChange: "transform",
              }}
              lazyBoundary="300px"
              onLoadingComplete={() => setIsImageLoaded(true)}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <Badge variant="outline" className={`${categoryStyles.badge} backdrop-blur-sm flex items-center`}>
                {categoryStyles.icon}
                {project.category}
              </Badge>
            </div>

            {/* Institution or date badge */}
            {(project.institution || project.date) && (
              <div className="absolute top-3 right-3">
                <Badge
                  variant="outline"
                  className="bg-gray-900/70 text-gray-300 border-gray-700 backdrop-blur-sm flex items-center"
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  {project.institution || project.date}
                </Badge>
              </div>
            )}

            {/* Featured indicator */}
            {project.featured && (
              <div className="absolute bottom-3 left-3">
                <Badge
                  variant="outline"
                  className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 backdrop-blur-sm flex items-center"
                >
                  <Star className="h-3 w-3 mr-1 fill-emerald-300" />
                  Created by me
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>

            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700 text-xs">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700 text-xs">
                  +{project.tags.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex space-x-2">
              {!project.hideButtons && (
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex-1"
                  asChild
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live Site
                  </a>
                </Button>
              )}

              {!project.hideButtons && project.github !== "#" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 rounded-full"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  },
)

ProjectCard.displayName = "ProjectCard"

// Main ProjectShowcase component
export default function ProjectShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  // Group projects by category for organized display
  const groupedProjects = useMemo(() => {
    const professional = projects.filter((p) => p.category === "professional" && !p.featured)
    const academic = projects.filter((p) => p.category === "academic")
    const personal = projects.filter((p) => p.category === "personal")

    return { professional, academic, personal }
  }, [])

  const handleViewProject = useCallback((project: Project) => {
    window.open(project.demo, "_blank")
  }, [])

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      // Preload featured project images first
      const featuredProjects = projects.filter((p) => p.featured)
      featuredProjects.forEach((project) => {
        const img = new Image()
        img.src = project.image
      })

      // Then preload other images based on active category
      setTimeout(() => {
        const projectsToPreload =
          activeCategory === "all" ? projects.filter((p) => !p.featured).slice(0, 6) : filteredProjects.slice(0, 6)

        projectsToPreload.forEach((project) => {
          const img = new Image()
          img.src = project.image
        })
      }, 1000)
    }

    preloadImages()
  }, [activeCategory, filteredProjects, projects])

  return (
    <section id="projects" className="section-container">
      <div ref={ref} className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-center mx-auto">My Projects</h2>

          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            A showcase of my professional, academic, and personal projects. Each project represents my skills,
            problem-solving approach, and passion for creating impactful digital experiences.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center mb-6 gap-2 flex-wrap"
          >
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
              className={`
                rounded-full px-4 transition-all duration-300
                ${activeCategory === "all" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              `}
              size={isMobile ? "sm" : "default"}
            >
              <Layers className="h-4 w-4 mr-2" />
              All Projects
            </Button>
            <Button
              variant={activeCategory === "professional" ? "default" : "outline"}
              onClick={() => setActiveCategory("professional")}
              className={`
                rounded-full px-4 transition-all duration-300
                ${activeCategory === "professional" ? "bg-blue-600 hover:bg-blue-700" : ""}
              `}
              size={isMobile ? "sm" : "default"}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Professional
            </Button>
            <Button
              variant={activeCategory === "academic" ? "default" : "outline"}
              onClick={() => setActiveCategory("academic")}
              className={`
                rounded-full px-4 transition-all duration-300
                ${activeCategory === "academic" ? "bg-amber-600 hover:bg-amber-700" : ""}
              `}
              size={isMobile ? "sm" : "default"}
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Academic
            </Button>
            <Button
              variant={activeCategory === "personal" ? "default" : "outline"}
              onClick={() => setActiveCategory("personal")}
              className={`
                rounded-full px-4 transition-all duration-300
                ${activeCategory === "personal" ? "bg-purple-600 hover:bg-purple-700" : ""}
              `}
              size={isMobile ? "sm" : "default"}
            >
              <Code className="h-4 w-4 mr-2" />
              Personal
            </Button>
          </motion.div>
        </motion.div>

        {/* Featured Projects Slider - only show on "all" or "professional" categories */}
        {(activeCategory === "all" || activeCategory === "professional") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <FeaturedProjectSlider projects={projects} onViewProject={handleViewProject} />
          </motion.div>
        )}

        {/* Project Grid - show based on active category */}
        <AnimatePresence mode="wait">
          {activeCategory === "all" ? (
            // Show all projects organized by category
            <motion.div
              key="all-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-16"
            >
              {/* Professional Projects */}
              {groupedProjects.professional.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Briefcase className="h-5 w-5 text-blue-400 mr-2" />
                    <h3 className="text-2xl font-bold text-white">Professional Projects</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedProjects.professional.map((project) => (
                      <ProjectCard key={project.id} project={project} onViewProject={handleViewProject} />
                    ))}
                  </div>
                </div>
              )}

              {/* Academic Projects */}
              {groupedProjects.academic.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <GraduationCap className="h-5 w-5 text-amber-400 mr-2" />
                    <h3 className="text-2xl font-bold text-white">Academic Projects</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedProjects.academic.map((project) => (
                      <ProjectCard key={project.id} project={project} onViewProject={handleViewProject} />
                    ))}
                  </div>
                </div>
              )}

              {/* Personal Projects */}
              {groupedProjects.personal.length > 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Code className="h-5 w-5 text-purple-400 mr-2" />
                    <h3 className="text-2xl font-bold text-white">Personal Projects</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedProjects.personal.map((project) => (
                      <ProjectCard key={project.id} project={project} onViewProject={handleViewProject} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            // Show filtered projects
            <motion.div
              key={`${activeCategory}-projects`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects
                .filter((p) => !(activeCategory === "professional" && p.featured)) // Don't show featured projects twice in professional category
                .map((project) => (
                  <ProjectCard key={project.id} project={project} onViewProject={handleViewProject} />
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
