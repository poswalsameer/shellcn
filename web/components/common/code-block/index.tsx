"use client"

import { useTheme } from "next-themes"
import { Check, Copy } from "lucide-react"
import { useEffect, useState, useMemo } from "react"
import { createHighlighter, type Highlighter } from "shiki"

let highlighterCache: Highlighter | null = null

export function CodeBlock({
  code,
  language = "tsx",
  className = "",
  variant = "bordered"
}: {
  code: string
  language?: string
  className?: string
  variant?: "ghost" | "bordered"
}) {
  const [html, setHtml] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)

  const { theme, resolvedTheme } = useTheme()

  const isSingleLine = code.trim().split("\n").length === 1

  const currentTheme = useMemo(() => {
    const activeTheme = resolvedTheme || theme
    return activeTheme === "light" ? "github-light" : "github-dark"
  }, [theme, resolvedTheme])

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }


  useEffect(() => {
    let active = true
    async function highlight() {
      if (!highlighterCache) {
        highlighterCache = await createHighlighter({
          themes: ["github-dark", "github-light"],
          langs: ["tsx", "bash", "typescript", "javascript", "json"],
        })
      }

      if (active && highlighterCache) {
        const h = highlighterCache.codeToHtml(code, {
          lang: language,
          theme: currentTheme,
        })
        setHtml(h)
      }
    }
    highlight()
    return () => { active = false }
  }, [code, language, currentTheme])

  return (
    <div className={`
      relative flex flex-col group rounded-none overflow-hidden transition-all duration-300
      ${variant === "bordered" ? "border-2 border-muted-foreground/30 bg-transparent dark:bg-transparent" : "bg-transparent"}
      ${className}
    `}>
      {/* Copy Button */}
      <div className="absolute right-2 top-2 z-10 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-none transition-colors cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-foreground" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>
      </div>

      <div className={`
        relative font-mono text-sm leading-normal custom-scrollbar selection:bg-primary/20 overflow-x-auto
        ${isSingleLine ? "p-3 px-4 pr-12" : "p-4"}
      `}>
        {html ? (
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className={`
              [&>pre]:bg-transparent! [&>pre]:p-0! [&>pre]:m-0! 
              [&_code]:font-mono! [&_span]:font-mono! 
              [&_span]:leading-6!
            `}
          />
        ) : (
          <pre className="text-muted-foreground opacity-50">
            <code>{code}</code>
          </pre>
        )}
      </div>

      <style jsx global>{`
        .shiki, .shiki span {
          font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
        }
      `}</style>
    </div>
  )
}
