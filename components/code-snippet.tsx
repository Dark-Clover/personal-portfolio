"use client"

import { useState, useEffect } from "react"

interface CodeSnippetProps {
  code: string
  language?: string
  className?: string
  highlightLines?: number[]
}

export default function CodeSnippet({
  code,
  language = "javascript",
  className = "",
  highlightLines = [],
}: CodeSnippetProps) {
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    setLines(code.trim().split("\n"))
  }, [code])

  // Simple syntax highlighting
  const highlightSyntax = (line: string) => {
    if (language === "javascript" || language === "typescript") {
      // Keywords
      line = line.replace(
        /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await)\b/g,
        '<span class="text-purple-400">$1</span>',
      )

      // Strings
      line = line.replace(/(['"`])(.*?)\1/g, '<span class="text-amber-300">$1$2$1</span>')

      // Comments
      line = line.replace(/(\/\/.*$)/g, '<span class="text-gray-500">$1</span>')

      // Numbers
      line = line.replace(/\b(\d+)\b/g, '<span class="text-blue-400">$1</span>')

      // Function calls
      line = line.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\(/g, '<span class="text-yellow-300">$1</span>(')
    }

    return line
  }

  return (
    <div className={`bg-gray-900 rounded-md p-4 overflow-x-auto font-mono text-sm ${className}`}>
      <pre className="text-gray-300">
        {lines.map((line, index) => (
          <div key={index} className={`${highlightLines.includes(index + 1) ? "bg-emerald-900/30" : ""}`}>
            <span className="inline-block w-8 text-gray-500 select-none">{index + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }} />
          </div>
        ))}
      </pre>
    </div>
  )
}
