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
import { Mail, Phone, Linkedin, Instagram, Github, Upload, Clock, Send, FileText } from "lucide-react"
import ShapeBlur from "./shape-blur"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Badge } from "@/components/ui/badge"

export default function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    preferredContact: "email",
    projectType: "",
    budget: "",
    timeline: "",
  })
  const [attachments, setAttachments] = useState<File[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = ['image/*', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB. Please choose a smaller file.`,
          variant: "destructive"
        })
        return false
      }
      
      return true
    })
    
    setAttachments(prev => [...prev, ...validFiles])
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    // Simulate form submission with file upload
    setTimeout(() => {
      toast({
        title: "Message sent successfully! 🎉",
        description: `Thanks for reaching out, ${formData.name}! I'll get back to you within 24 hours via ${formData.preferredContact}.`,
      })
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
        phone: "",
        preferredContact: "email",
        projectType: "",
        budget: "",
        timeline: "",
      })
      setAttachments([])
      setErrors({})
      setIsSubmitting(false)
    }, 2000)
  }

  const projectTypes = [
    "Web Development", "Mobile App", "E-commerce", "Portfolio Website", 
    "Business Website", "Custom Software", "UI/UX Design", "Other"
  ]

  const budgetRanges = [
    "Under $1,000", "$1,000 - $5,000", "$5,000 - $10,000", 
    "$10,000 - $25,000", "$25,000+", "To be discussed"
  ]

  const timelineOptions = [
    "1-2 weeks", "1 month", "2-3 months", "3-6 months", "6+ months", "Flexible"
  ]

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

        <motion.p 
          variants={itemVariants} 
          className="text-center text-foreground/70 mb-8 max-w-2xl mx-auto"
        >
          Ready to start your next project? Let's discuss how I can help bring your ideas to life.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <Card className="border-emerald-500/20 h-full bg-opacity-80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4 gradient-text">Get in Touch</h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium">Email</p>
                    <a
                      href="mailto:usman11arshad22@gmail.com"
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      usman11arshad22@gmail.com
                    </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href="tel:+923001234567" 
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        +92 300 123 4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-foreground/70">Within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-500/20">
                  <h4 className="font-medium mb-3">Follow Me</h4>
                  <div className="flex space-x-3">
                    <motion.a
                      href="https://github.com/Dark-Clover"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-800/50 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition-all duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/usman-arshad-647235247"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-800/50 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition-all duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href="https://www.instagram.com/usmaniii"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-800/50 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition-all duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Instagram className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="border-emerald-500/20 bg-opacity-80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                        className={`border-emerald-500/30 focus:border-emerald-500 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                      )}
                  </div>

                  <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                        className={`border-emerald-500/30 focus:border-emerald-500 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`border-emerald-500/30 focus:border-emerald-500 ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="preferredContact" className="block text-sm font-medium mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        id="preferredContact"
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-emerald-500/30 rounded-md text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="linkedin">LinkedIn</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-emerald-500/30 rounded-md text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-emerald-500/30 rounded-md text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map(budget => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                      Project Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-emerald-500/30 rounded-md text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map(timeline => (
                        <option key={timeline} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`border-emerald-500/30 focus:border-emerald-500 ${
                        errors.message ? "border-red-500" : ""
                      }`}
                      placeholder="Tell me about your project, requirements, and any specific features you need..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* File Upload */}
                  <div>
                    <label htmlFor="attachments" className="block text-sm font-medium mb-2">
                      Attachments (Optional)
                    </label>
                    <div className="border-2 border-dashed border-emerald-500/30 rounded-lg p-6 text-center hover:border-emerald-500/50 transition-colors">
                      <Upload className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                      <p className="text-sm text-foreground/70 mb-2">
                        Drop files here or click to upload
                      </p>
                      <p className="text-xs text-foreground/50 mb-4">
                        Max file size: 10MB. Supported: Images, PDFs, Documents
                      </p>
                      <input
                        id="attachments"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*,.pdf,.txt,.doc,.docx"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('attachments')?.click()}
                        className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                      >
                        Choose Files
                      </Button>
                    </div>

                    {/* Display uploaded files */}
                    {attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Uploaded Files:</p>
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-800/30 rounded-md">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-emerald-400" />
                              <span className="text-sm">{file.name}</span>
                              <span className="text-xs text-foreground/50">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(index)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </div>
                    )}
                    </Button>

                  {/* Response Time Info */}
                  <div className="text-center text-sm text-foreground/60">
                    <Clock className="h-4 w-4 inline mr-1" />
                    I typically respond within 24 hours during business days
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
