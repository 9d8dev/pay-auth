import '../globals.css'

import { Inter as Font } from 'next/font/google'
import type { Metadata } from 'next'
import { pay } from 'site.config'

export const metadata: Metadata = {
  title: pay.title,
  description: pay.desc,
  metadataBase: new URL(pay.url),
}

const font = Font({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.className}>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
