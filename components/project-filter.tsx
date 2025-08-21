"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X, Code, Database, Smartphone, Palette, Server, Shield, Cpu } from "lucide-react"
import { projects } from "@/data/projects"

interface ProjectFilterProps {
  onFilterChange: (filteredProjects: typeof projects) => void
  className?: string
}

const categories = [
  { id: "all", label: "All", icon: <Filter className="h-4 w-4" />, color: "from-emerald-500 to-teal-500" },
  { id: "professional", label: "Professional", icon: <Code className="h-4 w-4" />, color: "from-blue-500 to-cyan-500" },
  { id: "academic", label: "Academic", icon: <Cpu className="h-4 w-4" />, color: "from-purple-500 to-pink-500" },
  { id: "personal", label: "Personal", icon: <Palette className="h-4 w-4" />, color: "from-orange-500 to-yellow-500" },
]

const technologies = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Supabase", 
  "Stripe", "Node.js", "React Native", "Flutter", "Python", "Machine Learning"
]

export default function ProjectFilter({ onFilterChange, className = "" }: ProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Filter by category
      if (selectedCategory !== "all" && project.category !== selectedCategory) {
        return false
      }

      // Filter by technologies
      if (selectedTechnologies.length > 0) {
        const hasSelectedTech = selectedTechnologies.some(tech => 
          project.tags.some(tag => tag.toLowerCase().includes(tech.toLowerCase()))
        )
        if (!hasSelectedTech) return false
      }

      return true
    })
  }, [selectedCategory, selectedTechnologies])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleTechnologyToggle = (tech: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedTechnologies([])
  }

  const hasActiveFilters = selectedCategory !== "all" || selectedTechnologies.length > 0

  // Update parent component with filtered projects
  useMemo(() => {
    onFilterChange(filteredProjects)
  }, [filteredProjects, onFilterChange])

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category.id)}
              className={`transition-all duration-200 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white border-0`
                  : "border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10"
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Technology Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-emerald-500 hover:text-emerald-400 p-0 h-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter by Technology
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-2"
            >
              ▼
            </motion.div>
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-400 hover:text-gray-200 p-0 h-auto"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-2">
                {technologies.map((tech) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      variant={selectedTechnologies.includes(tech) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedTechnologies.includes(tech)
                          ? "bg-emerald-500 text-white border-0"
                          : "border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/50"
                      }`}
                      onClick={() => handleTechnologyToggle(tech)}
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-foreground/70"
        >
          <span>Active filters:</span>
          {selectedCategory !== "all" && (
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-500">
              {categories.find(c => c.id === selectedCategory)?.label}
            </Badge>
          )}
          {selectedTechnologies.map(tech => (
            <Badge key={tech} variant="outline" className="border-emerald-500/30 text-emerald-500">
              {tech}
            </Badge>
          ))}
        </motion.div>
      )}

      {/* Results Count */}
      <div className="text-sm text-foreground/60">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>
    </div>
  )
}
