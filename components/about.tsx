"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"
import OptimizedImage from "./image-optimizer"

// Move skills data outside component to prevent recreation on each render
const skills = [
  { name: "Linux", category: "os" },
  { name: "Flutter", category: "mobile" },
  { name: "Firebase", category: "backend" },
  { name: "C++", category: "language" },
  { name: "Python", category: "language" },
  { name: "SQL", category: "database" },
  { name: "HTML/CSS", category: '  category: "language' },
  { name: "SQL", category: "database" },
  { name: "HTML/CSS", category: "frontend" },
  { name: "Web Dev", category: "frontend" },
  { name: "UI/UX Design", category: "design" },
  { name: "Networking", category: "infrastructure" },
  { name: "Project Management", category: "soft" },
  { name: "Microsoft Access", category: "database" },
  { name: "Critical Thinking", category: "soft" },
]

function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const isMobile = useMediaQuery("(max-width: 768px)")

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
      transition: { duration: 0.3 },
    },
  }

  return (
    <section id="about" className="section-container content-visibility-auto">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto"
      >
        <motion.h2 variants={itemVariants} className="section-heading text-center mx-auto">
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div variants={itemVariants} className="relative">
            <Card className="overflow-hidden border-emerald-500/20 bg-opacity-80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative h-[300px] md:h-[400px] w-full">
                  <OptimizedImage
                    src="/profile-image-new.png"
                    alt="Usman Arshad"
                    fill
                    className="object-contain rounded-md p-4" // Changed from object-cover to object-contain and added padding
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold gradient-text">Usman Arshad</h3>
                    <p className="text-foreground/80">IT Student at Bahria University</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">IT Student & Developer</span>
            </h3>
            <p className="text-foreground/80 mb-6">
              I'm a 21-year-old IT student at Bahria University Islamabad, passionate about technology, cybersecurity,
              and artificial intelligence. With experience in developing ERP systems and working with international
              clients, I combine academic knowledge with practical skills to create innovative solutions.
            </p>
            <p className="text-foreground/80 mb-6">
              My entrepreneurial mindset drives me to constantly learn and adapt to new technologies. I thrive in
              collaborative environments and enjoy tackling complex problems with creative approaches.
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3">My Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.03 }}
                    className="transition-all duration-200 hover:translate-y-[-2px]"
                  >
                    <Badge
                      variant="outline"
                      className="bg-secondary/50 hover:bg-secondary text-foreground border-emerald-500/20"
                    >
                      {skill.name}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default memo(About)
