import { ModeToggle } from "../theme-toggle"

export default function Navbar() {
  return (
    <nav className="w-full max-w-5xl flex items-center justify-between p-6">
      <div className="font-bold text-xl tracking-tighter cursor-default">
        shellcn
      </div>
      <ModeToggle />
    </nav>
  )
}