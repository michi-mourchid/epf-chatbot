import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "EPF Chatbot - Assistant virtuel",
  description: "Assistant virtuel pour EPF Engineering School",
  generator: "v0.app",
  authors: [{ name: "Mourchid MOUTUIDINE", url: "https://mourchid-studio.tech" },
  { name: "EPF Engineering School", url: "https://epf.fr" },
  { name: "Génération IA EPF", url: "https://epf.fr" }],
  icons: {
    icon: "/favicon.ico",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${montserrat.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
