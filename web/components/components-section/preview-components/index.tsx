export function TextPreview() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-white font-mono">
      <div className="text-green-500 font-bold text-lg">Bold Green Text</div>
      <div className="text-white font-normal text-lg">Normal Text</div>
      <div className="text-yellow-300 font-normal underline underline-offset-2 text-lg">Underlined Text</div>
      <div className="text-red-500 font-normal line-through text-lg">Strikethrough Text</div>
    </div>
  )
}

export function ContainerPreview() {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center text-white font-mono">
      <div className="w-[80%] p-4 border-2 border-muted-foreground/30 flex justify-center items-center">
        Center Content
      </div>
      <div className="w-[80%] p-4 border-2 border-muted-foreground/30">
        Left Content
      </div>
      <div className="w-[80%] p-4 border-2 border-muted-foreground/30 flex justify-end">
        Right Content
      </div>
    </div>
  )
}

export function CardPreview() {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center text-white font-mono">
      <div className="h-[80%] w-[80%] flex flex-col p-4 justify-center border-2 border-muted-foreground/30">
        <div className="py-2 text-yellow-400">System Info</div>
        <div>CPU Usage: 42%</div>
        <div>Memory: 3.2 GB / 16 GB</div>
        <div>Uptime: 5 days</div>
        <div className="py-2 text-muted-foreground">Updated just now</div>
      </div>
    </div>
  )
}

export function AlertPreview() {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center text-white font-mono">
      <div className="w-[80%] p-4 border-2 border-blue-700 text-blue-700">Info</div>
      <div className="w-[80%] p-4 border-2 border-red-700 text-red-700">Error</div>
      <div className="w-[80%] p-4 border-2 border-yellow-400 text-yellow-400">Warning</div>
    </div>
  )
}

export function ProgressPreview() {
  return (
    <div className="h-full w-full flex flex-col gap-y-6 justify-center items-center text-white font-mono text-sm">
      <div className="w-[80%] flex flex-col gap-y-2">
        <div className="flex justify-between w-full">
          <span>Deploy:</span>
          <span className="text-yellow-500">35%</span>
        </div>
        <div className="flex h-2 gap-0.5 w-full">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className={`flex-1 h-full ${i < 11 ? 'bg-yellow-500' : 'bg-muted-foreground/30'}`} />
          ))}
        </div>
      </div>
      <div className="w-[80%] flex flex-col gap-y-2">
        <div className="flex justify-between w-full">
          <span>Build:</span>
          <span>100%</span>
        </div>
        <div className="flex h-2 gap-0.5 w-full">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className={`flex-1 h-full bg-white`} />
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
        <div className="flex flex-1 w-full border-b-2 border-muted-foreground/30 bg-black/40 text-yellow-400 font-bold">
          <div className="flex-[1.4] px-2 flex items-center border-r-2 border-muted-foreground/30">Name</div>
          <div className="flex-1 px-2 flex items-center border-r-2 border-muted-foreground/30">Role</div>
          <div className="w-16 px-2 flex items-center justify-center">Status</div>
        </div>
        <div className="flex flex-1 w-full border-b-2 border-muted-foreground/30 text-white">
          <div className="flex-[1.4] px-2 flex items-center border-r-2 border-muted-foreground/30">Alice</div>
          <div className="flex-1 px-2 flex items-center border-r-2 border-muted-foreground/30">Engineer</div>
          <div className="w-16 px-2 flex items-center justify-center">Active</div>
        </div>
        <div className="flex flex-1 w-full bg-black/40 text-white">
          <div className="flex-[1.4] px-2 flex items-center border-r-2 border-muted-foreground/30">Bob</div>
          <div className="flex-1 px-2 flex items-center border-r-2 border-muted-foreground/30">Designer</div>
          <div className="w-16 px-2 flex items-center justify-center">Away</div>
        </div>
      </div>
    </div>
  )
}

export function InputPreview() {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center text-white font-mono text-sm">
      <div className="w-[80%] border-2 border-muted-foreground flex">
        <div className="p-2 border-r-2 border-muted-foreground font-bold">Name:</div>
        <div className="p-2 text-yellow-400 flex items-center">
          shellcn<span className="inline-block w-[6px] ml-1 h-4 bg-white animate-pulse" />
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
    <div className="h-full w-full flex flex-col justify-center items-center text-white font-mono text-sm">
      <div className="w-[80%] border-2 border-white flex flex-col">
        <div className="p-2 border-b-2 border-white font-bold">Pick a framework:</div>
        <div className="p-2 flex gap-2 items-center bg-muted-foreground/20 text-yellow-500 font-bold border-b-2 border-muted-foreground/30">
          <span className="text-xs">▶</span> React
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
    <div className="h-full w-full flex flex-col justify-center items-center text-white font-mono text-sm">
      <div className="w-[80%] border-2 border-white flex flex-col">
        <div className="p-2 border-b-2 border-white font-bold text-yellow-500">Select features:</div>
        <div className="p-2 flex gap-3 items-center bg-muted-foreground/20 text-yellow-500 font-bold border-b-2 border-muted-foreground/30">
          <div className="w-3.5 h-3.5 border-2 border-yellow-500 flex justify-center items-center">
            <div className="w-1.5 h-1.5 bg-yellow-500" />
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
        <span className="text-muted-foreground text-xs w-16">cyan</span>
        <div className="flex-1 h-[2px] bg-cyan-400" />
      </div>
      <div className="w-[80%] flex gap-4 items-center">
        <span className="text-muted-foreground text-xs w-16">yellow</span>
        <div className="flex-1 h-[2px] bg-yellow-400" />
      </div>
      <div className="w-[80%] flex gap-4 items-center">
        <span className="text-muted-foreground text-xs w-16">magenta</span>
        <div className="flex-1 h-[2px] bg-fuchsia-400" />
      </div>
    </div>
  )
}