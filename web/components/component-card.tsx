"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { DocsRenderer } from "@/components/docs-renderer"

interface RegistryComponent {
  name: string
  preview: React.ReactNode
  command: string
  docs?: {
    description: string
    import: string
    example: string
    props: Array<{
      name: string
      type: string
      description: string
      default?: string
    }>
  }
}

interface ComponentCardProps {
  component: RegistryComponent
  index: number
}

export function ComponentCard({ component, index }: ComponentCardProps) {
  const [copiedComponent, setCopiedComponent] = useState(false)

  function handleCopyComponentCommand(command: string) {
    navigator.clipboard.writeText(command)
    setCopiedComponent(true)
    setTimeout(() => setCopiedComponent(false), 2000)
  }

  return (
    <Dialog key={component.name}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
      >
        <Card className="h-72 flex flex-col rounded-none overflow-hidden border-border/60 hover:border-foreground/50 transition-all bg-card hover:bg-muted/10 group shadow-sm hover:shadow-md">
          <DialogTrigger asChild>
            <div className="h-[88%] w-full border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col items-center justify-center p-6 relative cursor-pointer group-hover:bg-muted/[0.05] transition-colors">
              <div className="transform group-hover:scale-105 transition-transform duration-300">
                {component.preview}
              </div>
            </div>
          </DialogTrigger>
          <div
            className="h-[12%] flex justify-center items-center gap-x-4 cursor-pointer hover:bg-muted/20 transition-colors"
            onClick={() => handleCopyComponentCommand(component.command)}
          >
            <span className="font-mono text-[12px] font-medium text-muted-foreground group-hover:text-foreground transition-colors tracking-tight">
              {component.command}
            </span>
            <div className="w-4 h-4 flex items-center justify-center">
              {copiedComponent ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      <DialogContent className="sm:max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto custom-scrollbar border-border bg-background p-0 outline-none">
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 px-8 py-6">
          <DialogHeader className="p-0">
            <DialogTitle className="text-3xl font-black tracking-tighter uppercase italic">{component.name}</DialogTitle>
            <DialogDescription className="text-base mt-2 text-muted-foreground font-medium">
              Technical documentation and API reference for the {component.name} component.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-8 pb-8">
          {component.docs && <DocsRenderer docs={component.docs} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
