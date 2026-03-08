import { useState } from "react"
import { motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import { Card } from "@/components/ui/card"
import { registryComponents } from "@/constants/registery-components"

export default function ComponentsSection() {
  const [copiedComponent, setCopiedComponent] = useState<string | null>(null)

  function handleCopyComponentCommand(command: string) {
    navigator.clipboard.writeText(command)
    setCopiedComponent(command)
    setTimeout(() => setCopiedComponent(null), 2000)
  }

  return (
    <section id="components-grid" className="w-full max-w-5xl py-24 px-6 flex flex-col gap-12">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl font-bold tracking-tighter">Components</h2>
        <p className="text-muted-foreground text-lg tracking-tight">Every component you need to build stunning CLI applications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registryComponents.map((component, idx) => (
          <motion.div
            key={component.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.05 }}
          >
            <Card className="h-72 flex flex-col rounded-none overflow-hidden border-border/60 hover:border-foreground/50 transition-colors bg-card hover:bg-muted/10 group cursor-default">
              <div className="h-[90%] w-full border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col items-center justify-center p-6 relative">
                {component.preview}
              </div>
              <div className="h-[10%] flex justify-center items-center gap-x-4" onClick={() => handleCopyComponentCommand(component.command)}>
                <span className="font-mono text-sm text-muted-foreground group-hover/command:text-foreground transition-colors">
                  {component.command}
                </span>
                {copiedComponent === component.command ? (
                  <Check className="h-3 w-3 text-foreground" />
                ) : (
                  <Copy className="h-3 w-3 text-muted-foreground group-hover/command:text-foreground transition-colors" />
                )}
              </div>


            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}