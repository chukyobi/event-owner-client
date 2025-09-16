import type { Metadata } from 'next'
import { Inter } from "next/font/google"
import { Suspense } from "react"
// import { GeistSans } from 'geist/font/sans'
// import { GeistMono } from 'geist/font/mono'
// import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})


export const metadata: Metadata = {
  title: 'Oucla Event',
 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
         <head>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
}
        `}</style>
      </head>
      <body className={inter.className}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        {children}
     
      </body>
    </html>
  )
}
