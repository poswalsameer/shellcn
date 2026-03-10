"use client"

import { registryComponents } from "@/constants/registery-components"
import { ComponentCard } from "@/components/components-section/component-card"

export default function ComponentsSection() {
  return (
    <section id="components-grid" className="w-full max-w-5xl py-24 px-6 flex flex-col gap-12">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl font-bold tracking-tighter">Components</h2>
        <p className="text-muted-foreground text-lg tracking-tight">Every component you need to build stunning CLI applications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registryComponents.map((component, idx) => (
          <ComponentCard key={component.name} component={component} index={idx} />
        ))}
      </div>
    </section>
  )
}