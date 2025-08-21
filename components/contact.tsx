"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Phone, Linkedin, Instagram, Github } from "lucide-react"
import ShapeBlur from "./shape-blur"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const isMobile = useMediaQuery("(max-width: 768px)")

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      })
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section id="contact" className="section-container relative">
      {/* ShapeBlur effect positioned behind the contact section */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <ShapeBlur
          className="w-full h-full"
          variation={0}
          shapeSize={1.5}
          roundness={0.3}
          borderSize={0.03}
          circleSize={0.4}
          circleEdge={0.6}
        />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto relative z-10"
      >
        <motion.h2 variants={itemVariants} className="section-heading text-center mx-auto">
          Contact Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <Card className="border-emerald-500/20 h-full bg-opacity-80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-6 gradient-text">Get In Touch</h3>
                <p className="text-foreground/80 mb-6">
                  Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
                </p>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5, color: "#10b981" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Mail className="h-5 w-5 text-emerald-500 mr-3" />
                    <a
                      href="mailto:usman11arshad22@gmail.com"
                      className="text-foreground/80 hover:text-emerald-500 transition-colors text-sm md:text-base break-all"
                    >
                      usman11arshad22@gmail.com
                    </a>
                  </motion.div>

                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5, color: "#10b981" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Phone className="h-5 w-5 text-emerald-500 mr-3" />
                    <a
                      href="tel:+923338239991"
                      className="text-foreground/80 hover:text-emerald-500 transition-colors text-sm md:text-base"
                    >
                      +92 333 8239991
                    </a>
                  </motion.div>

                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5, color: "#10b981" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Linkedin className="h-5 w-5 text-emerald-500 mr-3" />
                    <a
                      href="https://www.linkedin.com/in/usman-arshad-647235247"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-emerald-500 transition-colors text-sm md:text-base break-all"
                    >
                      linkedin.com/in/usman-arshad-647235247
                    </a>
                  </motion.div>

                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5, color: "#10b981" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Github className="h-5 w-5 text-emerald-500 mr-3" />
                    <a
                      href="https://github.com/Dark-Clover"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-emerald-500 transition-colors text-sm md:text-base"
                    >
                      github.com/Dark-Clover
                    </a>
                  </motion.div>

                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5, color: "#10b981" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Instagram className="h-5 w-5 text-emerald-500 mr-3" />
                    <a
                      href="https://www.instagram.com/usmaniii"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-emerald-500 transition-colors text-sm md:text-base"
                    >
                      @usmaniii
                    </a>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-emerald-500/20 bg-opacity-80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-secondary/50 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      required
                      className="bg-secondary/50 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      required
                      className="min-h-[150px] bg-secondary/50 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <Button
                      type="submit"
                      className="relative w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
