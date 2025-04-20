"use client"

import { memo, useState, useMemo, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Star, ArrowUpRight, Layers } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import OptimizedImage from "./image-optimizer"

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
  hideButtons?: boolean
  featured?: boolean
}

// Move projects data outside component to prevent recreation on each render
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
    hideButtons: true,
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
    hideButtons: true,
  },
  {
    title: "Nessus Vulnerability Assessment",
    description:
      "Utilized the Nessus Vulnerability Scanner to assess security vulnerabilities on our university's website and Yahoo. Analyzed scan results, prioritized critical issues, and provided actionable recommendations to enhance website security.",
    image: "/vulnerability-scanner.jpg",
    tags: ["Cybersecurity", "Vulnerability Assessment", "Security Analysis", "Nessus"],
    github: "#",
    demo: "#",
    category: "academic",
    date: "Apr 2024 - May 2024",
    institution: "Bahria University",
    hideButtons: true,
  },
  {
    title: "Triadic Marketing Media Website",
    description:
      "Designed and developed a modern, responsive website for Triadic Marketing Media, a digital marketing agency. The site features a clean, professional design with smooth animations, interactive elements, and optimized performance for all devices.",
    image: "/sleek-marketing-site.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Responsive Design", "SEO"],
    github: "#",
    demo: "https://triadicmarketing.com/",
    category: "professional",
    date: "2023 - Present",
    featured: true,
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
    image: "/kingsmen-portfolio.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    github: "#",
    demo: "https://aneeskingsmen.com/",
    category: "professional",
    featured: true,
  },
  {
    title: "OtakuStream - Anime Streaming App",
    description:
      "Developed a feature-rich anime streaming application that allows users to browse, search, and watch their favorite anime series. Implemented user authentication, favorites list, and watch history tracking.",
    image: "/anime-streaming.png",
    tags: ["React Native", "Firebase", "API Integration", "Mobile Development"],
    github: "#",
    demo: "#",
    category: "professional",
  },
  {
    title: "H2H Courses - Learning Platform",
    description:
      "A fully functional online learning platform developed for Heart2Heart, offering users a seamless way to explore, purchase, and access digital courses. Implemented Firebase authentication, Stripe payment integration, and dynamic content access control.",
    image: "/h2h-courses.png",
    tags: ["Firebase", "Stripe", "React", "Firestore"],
    github: "#",
    demo: "https://h2hcourses.com",
    category: "professional",
    featured: true,
  },
]

// Memoized project card component to prevent unnecessary re-renders
const ProjectCard = memo(
  ({
    project,
    index,
    itemVariants,
    isVisible,
  }: { project: Project; index: number; itemVariants: any; isVisible: boolean }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [cardRef, cardInView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
    })

    // Calculate staggered animation delay
    const delay = index * 0.1

    return (
      <motion.div
        ref={cardRef}
        variants={itemVariants}
        initial="hidden"
        animate={cardInView ? "visible" : "hidden"}
        custom={delay}
        className="transition-all duration-300 will-change-transform h-full"
        layout
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          perspective: "1000px",
        }}
      >
        <Card
          className={`h-full border-emerald-500/20 overflow-hidden bg-opacity-80 backdrop-blur-sm relative group ${
            project.featured ? "ring-2 ring-emerald-500/50" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
            transform: isHovered ? "translateY(-8px)" : "translateY(0)",
            boxShadow: isHovered
              ? "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="relative h-52 w-full overflow-hidden">
            <OptimizedImage
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-all duration-700"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                filter: isHovered ? "brightness(1.1)" : "brightness(1)",
              }}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60"
              style={{
                opacity: isHovered ? "0.4" : "0.6",
                transition: "opacity 0.5s ease",
              }}
            />

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-xs py-1 px-2 rounded-full flex items-center shadow-lg backdrop-blur-sm">
                <Star className="h-3 w-3 mr-1 fill-white" />
                Created by me
              </div>
            )}

            {/* Show logo overlay for projects with logos */}
            {project.logo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <div className="w-3/4 h-auto relative">
                  <OptimizedImage
                    src={project.logo}
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
              <div className="absolute top-3 right-3 bg-emerald-600/90 text-white text-xs py-1 px-2 rounded-full shadow-lg backdrop-blur-sm">
                {project.institution}
              </div>
            )}

            {/* Date badge */}
            {project.date && !project.institution && (
              <div className="absolute top-3 right-3 bg-black/70 text-white text-xs py-1 px-2 rounded-full shadow-lg backdrop-blur-sm">
                {project.date}
              </div>
            )}

            {/* Category indicator */}
            <div className="absolute bottom-3 left-3">
              <Badge
                variant="outline"
                className={`
                text-xs font-medium px-2 py-0.5 rounded-full shadow-lg backdrop-blur-sm
                ${project.category === "professional" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : ""}
                ${project.category === "personal" ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : ""}
                ${project.category === "academic" ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : ""}
              `}
              >
                {project.category}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-xl gradient-text flex items-center justify-between">
              {project.title}
              {isHovered && !project.hideButtons && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-emerald-500"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </motion.div>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-foreground/80 mb-4 text-sm line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant="outline"
                  className="bg-secondary/50 text-foreground/80 border-emerald-500/20 text-xs px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>

          {!project.hideButtons && (
            <CardFooter className="flex justify-between pt-0">
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
              <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-full" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            </CardFooter>
          )}

          {/* Hover effect overlay */}
          <div
            className="absolute inset-0 border border-emerald-500/0 rounded-lg pointer-events-none"
            style={{
              borderColor: isHovered ? "rgba(16, 185, 129, 0.3)" : "rgba(16, 185, 129, 0)",
              boxShadow: isHovered ? "0 0 20px rgba(16, 185, 129, 0.15) inset" : "none",
              transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
        </Card>
      </motion.div>
    )
  },
)

ProjectCard.displayName = "ProjectCard"

function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (inView) {
      setIsVisible(true)
    }
  }, [inView])

  // Memoize filtered projects to prevent unnecessary recalculations
  const filteredProjects = useMemo(() => {
    return activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (delay: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  }

  return (
    <section id="projects" className="section-container">
      <div ref={ref} className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="section-heading text-center mx-auto">My Projects</h2>

          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            A collection of my work across professional, academic, and personal projects. Each project represents my
            skills and passion for creating impactful digital experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center mb-10 gap-2 flex-wrap"
        >
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            onClick={() => handleCategoryChange("all")}
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
            onClick={() => handleCategoryChange("professional")}
            className={`
              rounded-full px-4 transition-all duration-300
              ${activeCategory === "professional" ? "bg-blue-600 hover:bg-blue-700" : ""}
            `}
            size={isMobile ? "sm" : "default"}
          >
            Professional
          </Button>
          <Button
            variant={activeCategory === "academic" ? "default" : "outline"}
            onClick={() => handleCategoryChange("academic")}
            className={`
              rounded-full px-4 transition-all duration-300
              ${activeCategory === "academic" ? "bg-amber-600 hover:bg-amber-700" : ""}
            `}
            size={isMobile ? "sm" : "default"}
          >
            Academic
          </Button>
          <Button
            variant={activeCategory === "personal" ? "default" : "outline"}
            onClick={() => handleCategoryChange("personal")}
            className={`
              rounded-full px-4 transition-all duration-300
              ${activeCategory === "personal" ? "bg-purple-600 hover:bg-purple-700" : ""}
            `}
            size={isMobile ? "sm" : "default"}
          >
            Personal
          </Button>
        </motion.div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title + index}
                project={project}
                index={index}
                itemVariants={itemVariants}
                isVisible={isVisible}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(Projects)
