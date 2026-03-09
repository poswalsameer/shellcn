"use client"

import { useEffect, useState, useMemo } from "react"
import { createHighlighter, Highlighter } from "shiki"
import { Check, Copy } from "lucide-react"
import { useTheme } from "next-themes"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
  className?: string
  variant?: "ghost" | "bordered"
}

let highlighterCache: Highlighter | null = null

export function CodeBlock({
  code,
  language = "tsx",
  title,
  showLineNumbers = false,
  className = "",
  variant = "bordered"
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  const currentTheme = useMemo(() => {
    const activeTheme = resolvedTheme || theme
    return activeTheme === "light" ? "github-light" : "github-dark"
  }, [theme, resolvedTheme])

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

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isSingleLine = code.trim().split("\n").length === 1 && !title

  return (
    <div className={`
      relative flex flex-col group rounded-none overflow-hidden transition-all duration-300
      ${variant === "bordered" ? "border border-border bg-muted/40 dark:bg-zinc-950/50 shadow-sm" : "bg-transparent"}
      ${className}
    `}>
      {/* Dynamic Header */}
      {!isSingleLine && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border/40">
          <div className="flex items-center gap-2">
            {title ? (
              <span className="text-xs font-bold text-foreground/80 tracking-tight">{title}</span>
            ) : (
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">{language}</span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-none border border-border/80 bg-background hover:bg-muted transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>
        </div>
      )}

      {/* Single Line Copy Button */}
      {isSingleLine && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-none border border-border/80 bg-background hover:bg-muted shadow-sm transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>
        </div>
      )}

      <div className={`
        relative font-mono text-[13px] leading-relaxed custom-scrollbar selection:bg-primary/20
        ${isSingleLine ? "p-3 px-4 pr-12" : "p-4"}
        ${showLineNumbers ? "line-numbers" : ""}
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
        
        .line-numbers pre code {
          counter-reset: line;
        }
        .line-numbers pre code > span {
          display: block;
        }
        .line-numbers pre code > span::before {
          counter-increment: line;
          content: counter(line);
          display: inline-block;
          width: 2rem;
          margin-right: 1.5rem;
          text-align: right;
          color: var(--muted-foreground);
          opacity: 0.3;
          user-select: none;
        }
      `}</style>
    </div>
  )
}
