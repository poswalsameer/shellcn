"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Check, Copy, ArrowUpRight } from "lucide-react"
import { registryComponents } from "@/constants/registery-components"
import { ComponentCard } from "@/components/components-section/component-card"

export default function Hero() {
  const [copiedInit, setCopiedInit] = useState(false)

  function handleCopyInitCommand() {
    navigator.clipboard.writeText("npx shellcn-tui init")
    setCopiedInit(true)
    setTimeout(() => setCopiedInit(false), 2000)
  }

  return (
    <main className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center gap-4 md:gap-8 text-center pt-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col items-center gap-2 md:gap-4"
        >
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl flex flex-col sm:gap-y-2 font-black tracking-tighter max-w-5xl">
            <span className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/60">BUILDING TERMINAL UI</span>
            <span className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/60 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">IS FINALLY EASY</span>
          </div>

          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl font-semibold tracking-tight">
            Accessible. Customisable. Open Source.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="mt-4 sm:mt-0 flex flex-row justify-center gap-2 sm:gap-4"
        >
          {/* Copy Command Box */}
          <div
            onClick={handleCopyInitCommand}
            className="group relative flex items-center justify-between gap-2 sm:gap-4 rounded-none border-2 border-border dark:border-muted-foreground/30 bg-transparent hover:bg-muted/40 px-6 py-2 sm:px-8 sm:py-3 cursor-pointer transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs sm:text-sm tracking-tight text-foreground/90 font-medium">npx shellcn-tui init</span>
            </div>
            <div className="flex items-center justify-center h-4 w-4 sm:w-5 sm:h-5">
              {copiedInit ? (
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-foreground animate-in zoom-in-50 duration-200" />
              ) : (
                <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-foreground transition-all duration-200" />
              )}
            </div>
          </div>

          {/* NPM Link Button */}
          <a
            href="https://www.npmjs.com/package/shellcn-tui"
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center justify-between gap-2 sm:gap-4 rounded-none border-2 border-border dark:border-muted-foreground/30 bg-transparent hover:bg-muted/40 p-2 sm:p-3 transition-all duration-300"
          >
            {/* <span className="font-mono text-xs sm:text-sm tracking-tight text-foreground/90 font-medium">npm registry</span> */}
            <div className="flex items-center justify-center h-4 w-4 sm:w-5 sm:h-5">
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200" />
            </div>
          </a>
        </motion.div>
      </section>

      {/* Components Section */}
      <section id="components-grid" className="w-full px-4 lg:px-0 lg:max-w-4xl xl:max-w-6xl py-12 sm:py-20 flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col items-center sm:gap-1"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Components</h2>
          <p className="text-muted-foreground font-semibold tracking-tight text-sm sm:text-lg">Browse the official registry of components</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {registryComponents.map((component, idx) => (
            <ComponentCard key={component.name} component={component} index={idx} />
          ))}
        </div>
      </section>
    </main>
  )
}