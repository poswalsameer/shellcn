import { Github } from "lucide-react"
import { ModeToggle } from "../theme-toggle"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="w-full max-w-5xl flex items-center justify-between p-6">
      <div className="font-bold text-xl tracking-tighter cursor-default">
        shellcn
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-none"
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