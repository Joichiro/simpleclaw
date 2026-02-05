import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SimpleClaw - One-Click AI Agent Deployment',
  description: 'Deploy production-ready AI agents to any channel in 60 seconds. No code, no infrastructure, no complexity.',
  keywords: ['AI agents', 'deployment', 'automation', 'chatbots', 'Telegram', 'Discord'],
  openGraph: {
    title: 'SimpleClaw - One-Click AI Agent Deployment',
    description: 'Deploy production-ready AI agents to any channel in 60 seconds',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="cosmic-bg">
          <div className="cosmic-orb cosmic-orb-1" />
          <div className="cosmic-orb cosmic-orb-2" />
          <div className="cosmic-orb cosmic-orb-3" />
        </div>
        {children}
      </body>
    </html>
  )
}