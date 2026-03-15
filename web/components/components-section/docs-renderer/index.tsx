"use client"

import type { DocsSchema } from "@/types"
import { CodeBlock } from "@/components/common/code-block"
import { motion } from "motion/react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DocsRenderer({ docs }: { docs: DocsSchema }) {
  return (
    <div className="flex flex-col gap-8 sm:gap-12 mt-4 pb-8 sm:pb-12 w-full max-w-full selection:bg-foreground selection:text-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="flex flex-col gap-1"
      >
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground border-b border-border/40">Introduction</h2>
        <p className="text-base sm:text-lg font-medium text-muted-foreground leading-relaxed max-w-3xl">
          {docs.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="flex flex-col gap-2"
      >
        <h3 className="text-base sm:text-lg font-semibold text-muted-foreground tracking-tight">Import</h3>
        <CodeBlock code={docs.import} language="tsx" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className="flex flex-col gap-2"
      >
        <h3 className="text-base sm:text-lg font-semibold text-muted-foreground tracking-tight">Basic Usage</h3>
        <CodeBlock code={docs.example} language="tsx" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        className="flex flex-col gap-2 w-full max-w-full"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-muted-foreground tracking-tight">List of all available props</h3>
        </div>

        <div className="border-2 border-muted-foreground/30 bg-transparent w-full max-w-full overflow-x-auto custom-scrollbar">
          <Table className="min-w-[600px] sm:min-w-[800px]">
            <TableHeader>
              <TableRow className="bg-transparent border-b-2 border-muted-foreground/30">
                <TableHead className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-foreground">Prop</TableHead>
                <TableHead className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-foreground">Type</TableHead>
                <TableHead className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-foreground">Default</TableHead>
                <TableHead className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-foreground">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y-2 divide-muted-foreground/30">
              {docs.props.map((prop, i) => (
                <TableRow key={i} className="bg-transparent transition-colors">
                  <TableCell className="px-4 sm:px-6 py-4 sm:py-5 align-top">
                    <code className="font-mono text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
                      {prop.name}
                    </code>
                  </TableCell>
                  <TableCell className="px-4 sm:px-6 py-4 sm:py-5 align-top">
                    <code className="font-mono text-xs sm:text-sm text-muted-foreground font-medium whitespace-nowrap">
                      {prop.type}
                    </code>
                  </TableCell>
                  <TableCell className="px-4 sm:px-6 py-4 sm:py-5 align-top">
                    {prop.default ? (
                      <code className="font-mono text-[11px] sm:text-[13px] text-foreground whitespace-nowrap">
                        {prop.default}
                      </code>
                    ) : (
                      <span className="text-muted-foreground text-xs sm:text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 sm:px-6 py-4 sm:py-5 align-top text-muted-foreground font-medium text-sm sm:text-base min-w-[200px]">
                    {prop.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  )
}
