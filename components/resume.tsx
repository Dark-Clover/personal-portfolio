"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Briefcase, GraduationCap, Award } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Resume() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const isMobile = useMediaQuery("(max-width: 768px)")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section id="resume" className="section-container">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto"
      >
        <motion.h2 variants={itemVariants} className="section-heading text-center mx-auto">
          Resume
        </motion.h2>

        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Button className="relative bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
              <a href="/usman_resume.pdf.pdf" download>
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <Card className="border-emerald-500/20 h-full bg-opacity-80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-xl md:text-2xl">
                  <GraduationCap className="h-5 w-5 text-emerald-500 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative pl-6 border-l-2 border-emerald-500/30"
                  >
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                    <h3 className="text-lg font-semibold">Bachelor in Information Technology</h3>
                    <p className="text-sm text-foreground/70">Bahria University Islamabad</p>
                    <p className="text-sm text-foreground/70">2022 - Present</p>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative pl-6 border-l-2 border-emerald-500/30"
                  >
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                    <h3 className="text-lg font-semibold">FSc (Pre-Engineering)</h3>
                    <p className="text-sm text-foreground/70">Punjab College of Science</p>
                    <p className="text-sm text-foreground/70">2020 - 2021</p>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative pl-6 border-l-2 border-emerald-500/30"
                  >
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                    <h3 className="text-lg font-semibold">Matriculation</h3>
                    <p className="text-sm text-foreground/70">Telecom Foundation School</p>
                    <p className="text-sm text-foreground/70">2018 - 2019</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-emerald-500/20 h-full bg-opacity-80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-xl md:text-2xl">
                  <Briefcase className="h-5 w-5 text-emerald-500 mr-2" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative pl-6 border-l-2 border-emerald-500/30"
                  >
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                    <h3 className="text-lg font-semibold">Backend Developer & Firebase Integration Lead</h3>
                    <p className="text-sm text-foreground/70">H2H Courses</p>
                    <p className="text-sm text-foreground/70">2023 - Present</p>
                    <p className="mt-2 text-sm">
                      Led backend development for an online learning platform, implementing Firebase authentication,
                      Stripe payment integration, and Firestore database management.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative pl-6 border-l-2 border-emerald-500/30"
                  >
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                    <h3 className="text-lg font-semibold">ERP System Developer</h3>
                    <p className="text-sm text-foreground/70">Freelance</p>
                    <p className="text-sm text-foreground/70">2022 - 2023</p>
                    <p className="mt-2 text-sm">
                      Developed comprehensive ERP systems using Microsoft Access for small businesses.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative pl-6 border-l-2 border-emerald-500/30"
                  >
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                    <h3 className="text-lg font-semibold">Customer Sales Associate</h3>
                    <p className="text-sm text-foreground/70">Touchstone Communications</p>
                    <p className="text-sm text-foreground/70">2021 - 2022</p>
                    <p className="mt-2 text-sm">
                      Demonstrated strong communication and sales skills while working with international clients.
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card className="border-emerald-500/20 bg-opacity-80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-xl md:text-2xl">
                  <Award className="h-5 w-5 text-emerald-500 mr-2" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative pl-6 border-l-2 border-emerald-500/30"
                  >
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                    <h3 className="text-lg font-semibold">Google IT Support Specialist</h3>
                    <p className="text-sm text-foreground/70">Google</p>
                    <p className="mt-2 text-sm">
                      Comprehensive training in IT support fundamentals, computer networking, operating systems, system
                      administration, and security.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative pl-6 border-l-2 border-emerald-500/30 mt-6"
                  >
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                    <h3 className="text-lg font-semibold">Google Certified UI/UX Designer</h3>
                    <p className="text-sm text-foreground/70">Google</p>
                    <p className="mt-2 text-sm">
                      Professional certification in user interface and user experience design principles, including user
                      research, wireframing, prototyping, and usability testing. Trained in industry-standard design
                      tools and methodologies.
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

