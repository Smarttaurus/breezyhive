import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BreezyHive - Connect with Skilled Tradespeople',
  description: 'Find and hire trusted tradespeople for your projects. Enterprise solutions for businesses.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
