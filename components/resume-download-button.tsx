"use client"

import type React from "react"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResumeDownloadButtonProps {
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  children?: React.ReactNode
}

export default function ResumeDownloadButton({
  className = "",
  variant = "default",
  size = "default",
  children,
}: ResumeDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)

    // Create a direct link to the PDF file with download attribute
    const link = document.createElement("a")
    link.href = "/resume.pdf" // Use the actual PDF file in public folder
    link.download = "Usman-Arshad-Resume.pdf" // Set a nice filename for download

    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Reset downloading state after a short delay
    setTimeout(() => {
      setIsDownloading(false)
    }, 1000)
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleDownload} disabled={isDownloading}>
      {isDownloading ? (
        <>
          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
          Downloading...
        </>
      ) : (
        children || (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </>
        )
      )}
    </Button>
  )
}
