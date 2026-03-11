import { Github, Terminal } from "lucide-react"
import { ModeToggle } from "../theme-toggle"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="w-full px-4 lg:px-0 lg:max-w-4xl xl:max-w-6xl flex items-center justify-between py-6">
      <div className="font-black text-xl flex items-center gap-1 tracking-tighter cursor-default group">
        <div className="bg-foreground text-background p-0.5 flex items-center justify-center">
          <Terminal className="h-3 w-3" strokeWidth={3} />
        </div>
        <div className="flex items-center">
          shellcn
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-none border-2 dark:border-muted-foreground/30 dark:hover:border-muted-foreground/40 border-muted-foreground/30 hover:border-muted-foreground/40"
          asChild
        >
          <a
            href="https://github.com/poswalsameer/shellcn"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">GitHub</span>
          </a>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  )
}