export function TextPreview() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-white font-mono gap-y-2">
      <div className="text-green-700 dark:text-green-500 font-bold text-base">Bold Green Text</div>
      <div className="text-black dark:text-white font-normal text-base">Normal Text</div>
      <div className="text-yellow-600 dark:text-yellow-300 font-normal underline underline-offset-2 text-base">Underlined Text</div>
      <div className="text-red-700 dark:text-red-500 font-normal line-through text-base">Strikethrough Text</div>
    </div>
  )
}

export function ContainerPreview() {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center text-black dark:text-white font-mono">
      <div className="w-[80%] p-4 border-2 border-muted-foreground/30 flex justify-center items-center">
        Center Aligned
      </div>
      <div className="w-[80%] p-4 border-2 border-muted-foreground/30">
        Left Aligned
      </div>
      <div className="w-[80%] p-4 border-2 border-muted-foreground/30 flex justify-end">
        Right Aligned
      </div>
    </div>
  )
}

export function CardPreview() {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center text-black dark:text-white font-mono">
      <div className="h-[80%] w-[80%] flex flex-col p-4 justify-center border-2 border-muted-foreground/30">
        <div className="py-3 text-yellow-600 dark:text-yellow-400">System Info</div>
        <div>CPU Usage: 42%</div>
        <div>Memory: 3.2 GB / 16 GB</div>
        <div>Uptime: 5 days</div>
        <div className="py-3 text-muted-foreground">Updated just now</div>
      </div>
    </div>
  )
}

export function AlertPreview() {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center text-white font-mono">
      <div className="w-[80%] px-4 py-2 border-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500">Info</div>
      <div className="w-[80%] px-4 py-2 border-2 border-red-700 text-red-700">Error</div>
      <div className="w-[80%] px-4 py-2 border-2 border-yellow-500 text-yellow-500 dark:border-yellow-400 dark:text-yellow-400">Warning</div>
    </div>
  )
}

export function ProgressPreview() {
  return (
    <div className="h-full w-full flex flex-col gap-y-6 justify-center items-center text-white font-mono text-sm">
      <div className="w-[80%] flex flex-col gap-y-2">
        <div className="flex justify-between w-full text-black dark:text-white">
          <span className="text-yellow-600 dark:text-yellow-400">Deploy:</span>
          <span className="text-yellow-600 dark:text-yellow-500">35%</span>
        </div>
        <div className="flex h-2 gap-0.5 w-full">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className={`flex-1 h-full ${i < 11 ? 'bg-yellow-600 dark:bg-yellow-500' : 'bg-muted-foreground/30'}`} />
          ))}
        </div>
      </div>
      <div className="w-[80%] flex flex-col gap-y-2">
        <div className="flex justify-between w-full text-black dark:text-white">
          <span>Build:</span>
          <span>100%</span>
        </div>
        <div className="flex h-2 gap-0.5 w-full">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className={`flex-1 h-full bg-black dark:bg-white`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TablePreview() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-white font-mono text-xs">
      <div className="h-[90%] w-[90%] border-2 border-muted-foreground/30 flex flex-col">
        <div className="flex flex-1 w-full border-b-2 border-muted-foreground/30  text-yellow-600 dark:text-yellow-400 font-bold">
          <div className="flex-1 px-2 flex items-center border-r-2 border-muted-foreground/30">Name</div>
          <div className="flex-1 px-2 flex items-center border-r-2 border-muted-foreground/30">Role</div>
          <div className="flex-1 px-2 flex items-center justify-center">Status</div>
        </div>
        <div className="flex flex-1 w-full border-b-2 border-muted-foreground/30 text-black dark:text-white">
          <div className="flex-1 px-2 flex items-center border-r-2 border-muted-foreground/30">Alice</div>
          <div className="flex-1 px-2 flex items-center border-r-2 border-muted-foreground/30">Engineer</div>
          <div className="flex-1 px-2 flex items-center justify-center">Active</div>
        </div>
        <div className="flex flex-1 w-full  text-black dark:text-white">
          <div className="flex-1 px-2 flex items-center border-r-2 border-muted-foreground/30">Bob</div>
          <div className="flex-1 px-2 flex items-center border-r-2 border-muted-foreground/30">Designer</div>
          <div className="flex-1 px-2 flex items-center justify-center">Away</div>
        </div>
      </div>
    </div>
  )
}

export function InputPreview() {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center text-black dark:text-white font-mono text-sm">
      <div className="w-[80%] border-2 border-muted-foreground flex">
        <div className="p-2 border-r-2 border-muted-foreground font-bold">Name:</div>
        <div className="p-2 text-black dark:text-white flex items-center">
          shellcn<span className="inline-block w-[6px] ml-1 h-4 bg-black dark:bg-white animate-pulse" />
        </div>
      </div>
      <div className="w-[80%] border-2 border-muted-foreground/50 flex text-muted-foreground">
        <div className="p-2 border-r-2 border-muted-foreground/50 font-bold">Email:</div>
        <div className="p-2">Type something...</div>
      </div>
    </div>
  )
}

export function SelectPreview() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-black dark:text-white font-mono text-sm">
      <div className="w-[80%] border-2 border-muted-foreground/30 flex flex-col">
        <div className="p-2 border-b-2 border-muted-foreground/30 font-medium">Pick a framework:</div>
        <div className="p-2 flex gap-2 items-center bg-muted-foreground/10 dark:bg-muted-foreground/20 text-black dark:text-white font-bold border-b-2 border-muted-foreground/10">
          <span className="text-xs">&gt;</span> React
        </div>
        <div className="p-2 flex gap-2 items-center text-muted-foreground border-b-2 border-muted-foreground/30">
          <span className="text-xs opacity-0">▶</span> Vue
        </div>
        <div className="p-2 flex gap-2 items-center text-muted-foreground">
          <span className="text-xs opacity-0">▶</span> Svelte
        </div>
      </div>
    </div>
  )
}

export function CheckboxPreview() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-black dark:text-white font-mono text-sm">
      <div className="w-[80%] border-2 border-muted-foreground/30 flex flex-col">
        <div className="p-2 border-b-2 border-muted-foreground/30 font-semibold text-black dark:text-white">Select features:</div>
        <div className="p-2 flex gap-3 items-center bg-muted-foreground/10 dark:bg-muted-foreground/20 text-black dark:text-white font-medium border-b-2 border-muted-foreground/10">
          <div className="w-3.5 h-3.5 border-2 border-black dark:border-white flex justify-center items-center">
            <div className="w-1.5 h-1.5 bg-black dark:bg-white" />
          </div>
          TypeScript
        </div>
        <div className="p-2 flex gap-3 items-center text-muted-foreground border-b-2 border-muted-foreground/30">
          <div className="w-3.5 h-3.5 border-2 border-muted-foreground" />
          ESLint
        </div>
        <div className="p-2 flex gap-3 items-center text-white border-muted-foreground/30">
          <div className="w-3.5 h-3.5 border-2 border-muted-foreground flex justify-center items-center">
            <div className="w-1.5 h-1.5 bg-muted-foreground" />
          </div>
          Prettier
        </div>
      </div>
    </div>
  )
}

export function SeparatorPreview() {
  return (
    <div className="h-full w-full flex flex-col gap-y-6 justify-center items-center text-white font-mono">
      <div className="w-[80%] flex gap-4 items-center">
        <span className="text-muted-foreground font-medium text-sm w-16">cyan</span>
        <div className="flex-1 h-[2px] bg-cyan-700 dark:bg-cyan-400" />
      </div>
      <div className="w-[80%] flex gap-4 items-center">
        <span className="text-muted-foreground font-medium text-sm w-16">yellow</span>
        <div className="flex-1 h-[2px] bg-yellow-600 dark:bg-yellow-400" />
      </div>
      <div className="w-[80%] flex gap-4 items-center">
        <span className="text-muted-foreground font-medium text-sm w-16">magenta</span>
        <div className="flex-1 h-[2px] bg-fuchsia-700 dark:bg-fuchsia-400" />
      </div>
    </div>
  )
}