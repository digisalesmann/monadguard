import '@/styles/globals.css'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MonadGuard',
  description: 'Sybil Checker & Airdrop Simulator for Monad',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className={cn('bg-background text-foreground font-sans')}>
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  )
}
