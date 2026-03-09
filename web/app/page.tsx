"use client"

import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center overflow-x-hidden selection:bg-foreground selection:text-background">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}
