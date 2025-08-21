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
import { projects } from "@/data/projects" // Import from your data file

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

// Memoized project card component to prevent unnecessary re-renders
const ProjectCard = memo(
  ({
    project,
    index,
    itemVariants,
  }: { project: Project; index: number; itemVariants: any }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [cardRef, cardInView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
    })

    // Calculate staggered animation delay - memoized to prevent recalculation
    const delay = useMemo(() => index * 0.1, [index])

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
                Featured
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
              {project.github !== "#" && (
                <Button variant="outline" size="sm" className="rounded-full" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                </Button>
              )}
              {project.demo !== "#" && (
                <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-full" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              {/* If both are placeholders, show disabled buttons */}
              {project.github === "#" && project.demo === "#" && (
                <>
                  <Button variant="outline" size="sm" className="rounded-full opacity-50 cursor-not-allowed" disabled>
                    <Github className="h-4 w-4 mr-2" />
                    Private
                  </Button>
                  <Button variant="default" size="sm" className="bg-emerald-600 rounded-full opacity-50 cursor-not-allowed" disabled>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Coming Soon
                  </Button>
                </>
              )}
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

  // Get project counts for category buttons
  const projectCounts = useMemo(() => {
    return {
      all: projects.length,
      professional: projects.filter(p => p.category === "professional").length,
      academic: projects.filter(p => p.category === "academic").length,
      personal: projects.filter(p => p.category === "personal").length,
    }
  }, [])

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
            All Projects ({projectCounts.all})
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
            Professional ({projectCounts.professional})
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
            Academic ({projectCounts.academic})
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
            Personal ({projectCounts.personal})
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
                key={project.id}
                project={project}
                index={index}
                itemVariants={itemVariants}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(Projects)
