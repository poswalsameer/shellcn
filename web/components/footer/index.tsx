import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {

  return (
    <footer className="w-full max-w-6xl py-6 flex flex-col md:flex-row items-center justify-between text-sm gap-6">
      <div className="flex items-center gap-1 cursor-default">
        <span className="text-muted-foreground font-medium">Built for your terminal, by</span>
        <a
          href="https://www.sameerposwal.xyz"
          target="_blank"
          rel="noreferrer"
          className="text-foreground font-semibold underline underline-offset-4 hover:text-primary transition-colors decoration-foreground"
        >
          Sameer Poswal
        </a>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://www.github.com/poswalsameer"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground transition-colors p-1"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href="https://www.x.com/samposwal"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground transition-colors p-1"
          aria-label="Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/sameerposwal"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground transition-colors p-1"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </footer>
  )
}