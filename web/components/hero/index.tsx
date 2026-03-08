import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "../ui/button"
import { Check, Copy, Terminal } from "lucide-react"

export default function Hero() {
  const [copiedInit, setCopiedInit] = useState(false)

  function handleCopyInitCommand() {
    navigator.clipboard.writeText("npx shellcn init")
    setCopiedInit(true)
    setTimeout(() => setCopiedInit(false), 2000)
  }

  function scrollToGrid() {
    document.getElementById('components-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="flex-1 w-full max-w-5xl flex flex-col items-center justify-center py-24 px-6 gap-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter max-w-4xl ">
          BUILDING TERMINAL INTERFACES IS FINALLY EASY
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
          Accessible. Customisable. Open Source.
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
          onClick={handleCopyInitCommand}
          className="group relative flex items-center justify-between gap-4 rounded-none border border-border bg-muted/30 px-4 py-3 text-sm cursor-pointer hover:bg-muted/80 transition-colors w-full sm:w-auto"
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

        <Button onClick={scrollToGrid} size="lg" className="rounded-none w-full sm:w-auto px-8 h-[46px]">
          Browse Components
        </Button>
      </motion.div>
    </main>
  )
}