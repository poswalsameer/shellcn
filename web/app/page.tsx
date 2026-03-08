"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Copy, Terminal, Check } from "lucide-react"
import { ModeToggle } from "@/components/theme-toggle"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const registryComponents = [
  {
    name: "Text",
    command: "npx shellcn add text",
    preview: (
      <div className="flex flex-col gap-2 font-mono text-sm">
        <span className="font-bold">Bold Text</span>
        <span className="text-muted-foreground">Dimmed Text</span>
      </div>
    )
  },
  {
    name: "Container",
    command: "npx shellcn add container",
    preview: (
      <div className="border border-border rounded-md p-4 text-center font-mono text-sm">
        A padded container
      </div>
    )
  },
  {
    name: "Alert",
    command: "npx shellcn add alert",
    preview: (
      <div className="border border-border rounded-md p-3 flex flex-col gap-1 w-full bg-background">
        <span className="font-bold text-sm">Warning</span>
        <span className="text-xs">Disk space is getting low.</span>
      </div>
    )
  },
  {
    name: "Progress",
    command: "npx shellcn add progress",
    preview: (
      <div className="flex items-center gap-2 w-full font-mono text-sm">
        <span>Build:</span>
        <div className="flex-1 bg-muted h-3 rounded-full overflow-hidden flex">
          <div className="bg-foreground w-[65%] h-full" />
        </div>
        <span>65%</span>
      </div>
    )
  },
  {
    name: "Table",
    command: "npx shellcn add table",
    preview: (
      <div className="font-mono text-xs whitespace-pre">
        {`┌────────────┬────────┐
│ Name       │ Status │
├────────────┼────────┤
│ Node.js    │ Active │
│ React      │ Active │
└────────────┴────────┘`}
      </div>
    )
  },
  {
    name: "Input",
    command: "npx shellcn add input",
    preview: (
      <div className="flex items-center gap-2 font-mono text-sm border border-border px-3 py-2 w-full rounded-md">
        <span className="text-muted-foreground mr-2 border-r border-border pr-2">Email</span>
        <span className="animate-pulse">_</span>
      </div>
    )
  },
  {
    name: "Select",
    command: "npx shellcn add select",
    preview: (
      <div className="flex flex-col gap-1 font-mono text-sm w-full">
        <span className="text-muted-foreground border-b border-border pb-1 mb-1">Select Fruit:</span>
        <span className="font-bold text-foreground">❯ Apple</span>
        <span className="text-muted-foreground">  Banana</span>
      </div>
    )
  },
  {
    name: "Checkbox",
    command: "npx shellcn add checkbox",
    preview: (
      <div className="flex flex-col gap-1 font-mono text-sm w-full">
        <span className="text-muted-foreground border-b border-border pb-1 mb-1">Options:</span>
        <span className="text-foreground">◉ ESLint</span>
        <span className="text-muted-foreground">○ Prettier</span>
      </div>
    )
  },
  {
    name: "Separator",
    command: "npx shellcn add separator",
    preview: (
      <div className="flex flex-col items-center w-full gap-2 font-mono text-sm text-muted-foreground">
        <span>Above</span>
        <div className="w-full border-t border-border" />
        <span>Below</span>
      </div>
    )
  }
]

export default function Home() {
  const [copiedInit, setCopiedInit] = React.useState(false)
  const [copiedComponent, setCopiedComponent] = React.useState<string | null>(null)

  const handleCopyInit = () => {
    navigator.clipboard.writeText("npx shellcn init")
    setCopiedInit(true)
    setTimeout(() => setCopiedInit(false), 2000)
  }

  const handleCopyComponent = (command: string) => {
    navigator.clipboard.writeText(command)
    setCopiedComponent(command)
    setTimeout(() => setCopiedComponent(null), 2000)
  }

  const scrollToGrid = () => {
    document.getElementById('components-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center overflow-x-hidden selection:bg-foreground selection:text-background">
      {/* Navbar */}
      <nav className="w-full max-w-5xl flex items-center justify-between p-6">
        <div className="font-bold text-xl tracking-tighter cursor-default">
          shellcn
        </div>
        <ModeToggle />
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-5xl flex flex-col items-center justify-center py-24 px-6 gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-foreground mr-2"></span>
            Building terminal interfaces is finally easy
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-3xl leading-[1.1]">
            Beautiful CLI components that you can copy and paste.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
            Accessible. Customisable. Open Source. <br className="hidden md:block" />
            Build your next CLI tool using React Ink with the aesthetics of Shadcn.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          {/* Copy Command Box */}
          <div
            onClick={handleCopyInit}
            className="group relative flex items-center justify-between gap-4 rounded-md border border-border bg-muted/30 px-4 py-3 text-sm cursor-pointer hover:bg-muted/80 transition-colors w-full sm:w-auto"
          >
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono font-medium">npx shellcn init</span>
            </div>
            {copiedInit ? (
              <Check className="h-4 w-4 text-foreground" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </div>

          <Button onClick={scrollToGrid} size="lg" className="w-full sm:w-auto px-8 h-[46px]">
            Browse Components
          </Button>
        </motion.div>
      </main>

      {/* Component Grid Section */}
      <section id="components-grid" className="w-full max-w-5xl py-24 px-6 flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Components</h2>
          <p className="text-muted-foreground">Every component you need to build stunning CLI applications.</p>
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
              <Card className="h-full flex flex-col overflow-hidden border-border/60 hover:border-foreground/50 transition-colors bg-card hover:bg-muted/10 group cursor-default">
                {/* Preview Area */}
                <div className="h-48 w-full border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col items-center justify-center p-6 relative">
                  {component.preview}
                </div>

                {/* Details Area */}
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{component.name}</CardTitle>
                </CardHeader>
                <CardFooter className="mt-auto pt-0">
                  <div
                    onClick={() => handleCopyComponent(component.command)}
                    className="w-full flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2 text-xs cursor-pointer hover:border-foreground/30 transition-colors group/command"
                  >
                    <span className="font-mono text-muted-foreground group-hover/command:text-foreground transition-colors">
                      {component.command}
                    </span>
                    {copiedComponent === component.command ? (
                      <Check className="h-3 w-3 text-foreground" />
                    ) : (
                      <Copy className="h-3 w-3 text-muted-foreground group-hover/command:text-foreground transition-colors" />
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl py-12 px-6 flex flex-col md:flex-row items-center justify-between border-t border-border mt-12 text-sm text-muted-foreground gap-4">
        <p>Built for the terminal, styled for the web.</p>
        <p>Uses React Ink &amp; shellcn</p>
      </footer>
    </div>
  )
}
