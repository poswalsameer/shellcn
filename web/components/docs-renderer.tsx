"use client"

import React from "react"
import { CodeBlock } from "@/components/ui/code-block"

interface Prop {
  name: string
  type: string
  description: string
  default?: string
}

interface DocsSchema {
  description: string
  import: string
  example: string
  props: Prop[]
}

interface DocsRendererProps {
  docs: DocsSchema
}

export function DocsRenderer({ docs }: DocsRendererProps) {
  return (
    <div className="flex flex-col gap-12 mt-8 pb-12 w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Description */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/40 pb-3">Introduction</h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          {docs.description}
        </p>
      </div>

      {/* Import Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[15px] font-bold uppercase tracking-wider text-muted-foreground/80">Installation / Import</h3>
        <CodeBlock code={docs.import} language="tsx" title="Import" />
      </div>

      {/* Usage Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[15px] font-bold uppercase tracking-wider text-muted-foreground/80">Basic Usage</h3>
        <CodeBlock code={docs.example} language="tsx" title="Usage Example" showLineNumbers />
      </div>

      {/* Props Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-[15px] font-bold uppercase tracking-wider text-muted-foreground/80">Properties Reference</h3>
          <p className="text-sm text-muted-foreground">Comprehensive list of all available props for this component.</p>
        </div>

        <div className="w-full overflow-hidden border border-border/60 bg-muted/5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border/60">
                  <th className="px-6 py-4 font-bold text-foreground">Prop</th>
                  <th className="px-6 py-4 font-bold text-foreground">Type</th>
                  <th className="px-6 py-4 font-bold text-foreground">Default</th>
                  <th className="px-6 py-4 font-bold text-foreground">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {docs.props.map((prop, i) => (
                  <tr key={i} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-5 align-top">
                      <code className="font-mono text-[13px] font-bold text-foreground px-2 py-1 bg-muted/40 border border-border/40">
                        {prop.name}
                      </code>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <code className="font-mono text-[13px] text-muted-foreground/90 bg-muted/10 px-1.5 py-0.5 border border-border/20">
                        {prop.type}
                      </code>
                    </td>
                    <td className="px-6 py-5 align-top">
                      {prop.default ? (
                        <code className="font-mono text-[13px] text-foreground/70 bg-muted/20 px-1.5 py-0.5 border border-border/40">
                          {prop.default}
                        </code>
                      ) : (
                        <span className="text-muted-foreground/40 text-xs italic">—</span>
                      )}
                    </td>
                    <td className="px-6 py-5 align-top text-muted-foreground/90 leading-relaxed min-w-[200px]">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
