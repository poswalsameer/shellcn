import React, { useState } from "react"
import { motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import { Card } from "@/components/ui/card"
import { registryComponents } from "@/constants/registery-components"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"

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
          <Dialog key={component.name}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.05 }}
            >
              <Card className="h-72 flex flex-col rounded-none overflow-hidden border-border/60 hover:border-foreground/50 transition-colors bg-card hover:bg-muted/10 group">
                <DialogTrigger asChild>
                  <div className="h-[90%] w-full border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col items-center justify-center p-6 relative cursor-pointer">
                    {component.preview}
                  </div>
                </DialogTrigger>
                <div className="h-[10%] flex justify-center items-center gap-x-4 cursor-pointer" onClick={() => handleCopyComponentCommand(component.command)}>
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

            <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl max-h-[85vh] overflow-y-auto custom-scrollbar">
              <DialogHeader>
                <DialogTitle className="text-2xl">{component.name}</DialogTitle>
                <DialogDescription className="text-base mt-1">
                  {component.docs?.description}
                </DialogDescription>
              </DialogHeader>

              {component.docs && (
                <div className="flex flex-col gap-8 mt-4 pb-4">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground border-b border-border pb-2">Import</h3>
                    <div className="bg-zinc-50 dark:bg-black border border-border rounded-lg p-4 text-sm font-mono overflow-x-auto text-zinc-950 dark:text-zinc-50">
                      <code>{component.docs.import}</code>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground border-b border-border pb-2">Usage</h3>
                    <div className="bg-zinc-50 dark:bg-black border border-border rounded-lg p-4 text-sm font-mono whitespace-pre-wrap overflow-x-auto text-zinc-950 dark:text-zinc-50">
                      <code>{component.docs.example}</code>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground border-b border-border pb-2">Props</h3>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-muted text-foreground border-b border-border text-xs uppercase">
                            <tr>
                              <th className="px-4 py-3 font-medium">Prop</th>
                              <th className="px-4 py-3 font-medium">Type</th>
                              <th className="px-4 py-3 font-medium">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {component.docs.props.map((prop, i) => (
                              <tr key={i} className="bg-card hover:bg-muted/50 transition-colors">
                                <td className="px-4 py-3 align-top">
                                  <code className="font-mono text-[13px] font-semibold text-primary px-1.5 py-0.5 rounded-md bg-primary/10">{prop.name}</code>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <code className="font-mono text-[13px] text-muted-foreground whitespace-nowrap">{prop.type}</code>
                                </td>
                                <td className="px-4 py-3 align-top text-muted-foreground">
                                  <div className="flex flex-col gap-1.5">
                                    <span>{prop.description}</span>
                                    {prop.default && (
                                      <span className="text-xs">
                                        Default: <code className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">{prop.default}</code>
                                      </span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  )
}