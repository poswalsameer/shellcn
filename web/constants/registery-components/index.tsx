export const registryComponents = [
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