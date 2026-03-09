"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Check, Copy, Terminal } from "lucide-react"
import { registryComponents } from "@/constants/registery-components"
import { ComponentCard } from "@/components/component-card"

export default function Hero() {
  const [copiedInit, setCopiedInit] = useState(false)

  function handleCopyInitCommand() {
    navigator.clipboard.writeText("npx shellcn init")
    setCopiedInit(true)
    setTimeout(() => setCopiedInit(false), 2000)
  }

  return (
    <main className="w-full flex flex-col items-center px-6">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center gap-8 text-center pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <div className="text-5xl md:text-7xl flex flex-col gap-y-2 font-black tracking-tighter max-w-5xl">
            <span className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/60">BUILDING TERMINAL UI</span>
            <span className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/60 text-4xl md:text-6xl">IS FINALLY EASY</span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium tracking-tight">
            Beautifully designed, accessible CLI components. <br />
            Built with React for the modern terminal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex justify-center"
        >
          {/* Copy Command Box */}
          <div
            onClick={handleCopyInitCommand}
            className="group relative flex items-center justify-between gap-6 rounded-none border border-border bg-muted/20 hover:bg-muted/40 px-8 py-4 text-sm cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <Terminal className="h-4 w-4 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="font-mono text-[13px] tracking-tight text-foreground/90 font-medium">npx shellcn init</span>
            </div>
            <div className="flex items-center justify-center w-5 h-5">
              {copiedInit ? (
                <Check className="h-4 w-4 text-green-500 animate-in zoom-in-50 duration-200" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-all duration-200" />
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Components Section */}
      <section id="components-grid" className="w-full max-w-6xl py-24 flex flex-col gap-12">
        <div className="flex flex-col items-center gap-2 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Components</h2>
          <p className="text-muted-foreground text-lg">Browse the official registry of components.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {registryComponents.map((component, idx) => (
            <ComponentCard key={component.name} component={component} index={idx} />
          ))}
        </div>
      </section>
    </main>
  )
}