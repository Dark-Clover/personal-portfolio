"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Code, 
  Database, 
  Smartphone, 
  Palette, 
  Server, 
  Shield, 
  Zap,
  TrendingUp,
  Layers,
  Cpu
} from "lucide-react"
import { memo } from "react"

interface Skill {
  name: string
  proficiency: number
  category: string
  icon: React.ReactNode
  color: string
}

const skills: Skill[] = [
  // Frontend
  { name: "React", proficiency: 95, category: "Frontend", icon: <Code className="h-4 w-4" />, color: "from-blue-500 to-cyan-500" },
  { name: "Next.js", proficiency: 90, category: "Frontend", icon: <Code className="h-4 w-4" />, color: "from-gray-800 to-gray-900" },
  { name: "TypeScript", proficiency: 85, category: "Frontend", icon: <Code className="h-4 w-4" />, color: "from-blue-600 to-blue-700" },
  { name: "Tailwind CSS", proficiency: 92, category: "Frontend", icon: <Palette className="h-4 w-4" />, color: "from-cyan-500 to-blue-500" },
  { name: "Framer Motion", proficiency: 88, category: "Frontend", icon: <Zap className="h-4 w-4" />, color: "from-purple-500 to-pink-500" },
  
  // Backend
  { name: "Node.js", proficiency: 80, category: "Backend", icon: <Server className="h-4 w-4" />, color: "from-green-500 to-green-600" },
  { name: "Firebase", proficiency: 90, category: "Backend", icon: <Database className="h-4 w-4" />, color: "from-orange-500 to-yellow-500" },
  { name: "Supabase", proficiency: 85, category: "Backend", icon: <Database className="h-4 w-4" />, color: "from-emerald-500 to-teal-500" },
  { name: "Stripe", proficiency: 82, category: "Backend", icon: <Zap className="h-4 w-4" />, color: "from-purple-500 to-indigo-500" },
  
  // Mobile & Cross-platform
  { name: "React Native", proficiency: 75, category: "Mobile", icon: <Smartphone className="h-4 w-4" />, color: "from-blue-500 to-indigo-500" },
  { name: "Flutter", proficiency: 70, category: "Mobile", icon: <Smartphone className="h-4 w-4" />, color: "from-blue-400 to-cyan-400" },
  
  // DevOps & Tools
  { name: "Git", proficiency: 88, category: "DevOps", icon: <TrendingUp className="h-4 w-4" />, color: "from-orange-600 to-red-600" },
  { name: "Docker", proficiency: 65, category: "DevOps", icon: <Layers className="h-4 w-4" />, color: "from-blue-500 to-indigo-600" },
  { name: "CI/CD", proficiency: 70, category: "DevOps", icon: <Zap className="h-4 w-4" />, color: "from-green-500 to-emerald-500" },
  
  // Security & AI
  { name: "Cybersecurity", proficiency: 75, category: "Security", icon: <Shield className="h-4 w-4" />, color: "from-red-500 to-pink-500" },
  { name: "Machine Learning", proficiency: 60, category: "AI", icon: <Cpu className="h-4 w-4" />, color: "from-purple-500 to-pink-500" },
  { name: "NLP", proficiency: 65, category: "AI", icon: <Cpu className="h-4 w-4" />, color: "from-indigo-500 to-purple-500" },
]

const categories = ["Frontend", "Backend", "Mobile", "DevOps", "Security", "AI"]

function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category)
  }

  return (
    <section id="skills" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto"
      >
        <motion.h2 variants={itemVariants} className="section-heading text-center mx-auto">
          Skills & Expertise
        </motion.h2>

        <motion.p 
          variants={itemVariants} 
          className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto"
        >
          A comprehensive overview of my technical skills and proficiency levels across different domains
        </motion.p>

        {/* Skills Grid by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="space-y-4"
            >
              <Card className="border-emerald-500/20 bg-opacity-80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-xl">
                    <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${getSkillsByCategory(category)[0]?.color || 'from-emerald-500 to-teal-500'} mr-3`} />
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getSkillsByCategory(category).map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1.5 rounded-md bg-gradient-to-r ${skill.color} text-white`}>
                            {skill.icon}
                          </div>
                          <span className="font-medium text-foreground">{skill.name}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
                        >
                          {skill.proficiency}%
                        </Badge>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                          transition={{ 
                            delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.3,
                            duration: 1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Overall Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Years Experience", value: "3+", icon: <TrendingUp className="h-6 w-6" /> },
            { label: "Projects Completed", value: "25+", icon: <Code className="h-6 w-6" /> },
            { label: "Technologies", value: "20+", icon: <Layers className="h-6 w-6" /> },
            { label: "Client Satisfaction", value: "98%", icon: <Zap className="h-6 w-6" /> },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              className="text-center p-6 rounded-lg border border-emerald-500/20 bg-opacity-60 backdrop-blur-sm"
            >
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-foreground/70 mb-2">{stat.label}</div>
              <div className="text-emerald-500 flex justify-center">{stat.icon}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default memo(Skills)
