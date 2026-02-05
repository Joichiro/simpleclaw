import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Header from '@/components/Header'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Deploy Your AI Agent',
  description: 'Deploy your AI-powered Telegram bot in 30 seconds. Choose your model, configure settings, and launch.',
}

// Dynamically load the deployment flow component
const DeploymentFlow = dynamic(() => import('@/components/DeploymentFlow'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
})

export default function DeployPage() {
  return (
    <div className="cosmic-bg min-h-screen relative overflow-hidden">
      {/* Cosmic orbs */}
      <div className="cosmic-orb cosmic-orb-1" />
      <div className="cosmic-orb cosmic-orb-2" />
      <div className="cosmic-orb cosmic-orb-3" />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <DeploymentFlow />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
