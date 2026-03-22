import type { Metadata } from "next"
import { Manrope, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/providers/theme-provider"
import { Analytics } from '@vercel/analytics/next'
import "./globals.css"

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://shellcn.sameerposwal.xyz"),
  title: "shellcn | Building Terminal UIs is finally easy",
  description: "A collection of accessible, customisable, and open source components for building stunning CLI applications.",
  openGraph: {
    title: "shellcn | Building Terminal UIs is finally easy",
    description: "A collection of accessible, customisable, and open source components for building stunning CLI applications.",
    url: "https://shellcn.sameerposwal.xyz",
    siteName: "shellcn",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/sameerposwal/image/upload/v1774172914/Screenshot_2026-03-22_141509_mqprvk.png",
        width: 1200,
        height: 630,
        alt: "shellcn | Building Terminal UIs is finally easy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "shellcn | Building Terminal UIs is finally easy",
    description: "A collection of accessible, customisable, and open source components for building stunning CLI applications.",
    images: [
      {
        url: "https://res.cloudinary.com/sameerposwal/image/upload/v1774172914/Screenshot_2026-03-22_141509_mqprvk.png",
        width: 1200,
        height: 630,
        alt: "shellcn | Building Terminal UIs is finally easy",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
