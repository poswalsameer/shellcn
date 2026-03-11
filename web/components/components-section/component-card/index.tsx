"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { RegistryComponent } from "@/types"
import { DocsRenderer } from "@/components/components-section/docs-renderer"
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"

export function ComponentCard({ component, index }: {
  component: RegistryComponent
  index: number
}) {
  const [copiedComponent, setCopiedComponent] = useState<boolean>(false)

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
        <Card className="h-80 ring-0 flex flex-col rounded-none border-2 border-muted-foreground/30 hover:border-muted-foreground/40 transition-all bg-card hover:bg-muted/10 group overflow-hidden">
          <DialogTrigger asChild className="h-full">
            <div className="h-[80%] w-full flex flex-col items-center justify-center p-4 relative cursor-pointer transition-colors ">
              <div className="w-full h-full transform group-hover:scale-[1.03] transition-transform duration-300 ease-out">
                {component.preview}
              </div>
            </div>
          </DialogTrigger>
          <div
            className="h-[20%] pt-3 border-t-2 border-muted-foreground/30 group-hover:border-muted-foreground/40 flex items-center justify-center gap-x-4 cursor-pointer hover:bg-muted/20 transition-all duration-300 w-full font-mono text-muted-foreground group-hover:text-foreground"
            onClick={() => handleCopyComponentCommand(component.command)}
          >
            {component.command}
            {copiedComponent ? (
              <Check className="h-3.5 w-3.5 text-foreground" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}

          </div>
        </Card>
      </motion.div>

      <DialogContent className="w-[95vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto custom-scrollbar border-2 border-muted-foreground/30 ring-0 bg-background p-0 rounded-none sm:rounded-lg">
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 px-4 sm:px-8 py-4 sm:py-6">
          <DialogHeader className="flex flex-col gap-y-1">
            <DialogTitle className="text-xl sm:text-2xl font-semibold tracking-tight uppercase">{component.name}</DialogTitle>
            <DialogDescription className="text-sm sm:text-lg text-muted-foreground font-medium">
              Documentation and reference to use {component.name.toLowerCase()} component
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-4 sm:px-8 w-full max-w-full overflow-x-hidden">
          {component.docs && <DocsRenderer docs={component.docs} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
