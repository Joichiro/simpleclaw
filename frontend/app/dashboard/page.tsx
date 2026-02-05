'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import AgentCard from '@/components/AgentCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { api } from '@/lib/api'
import { analytics } from '@/lib/analytics'
import type { Deployment } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const [deployments, setDeployments] = useState<Deployment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDeployments()
    analytics.track('page_viewed', { page: 'dashboard' })
  }, [])

  async function fetchDeployments() {
    try {
      setLoading(true)
      const data = await api.getDeployments()
      setDeployments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load deployments')
      analytics.track('error_occurred', { 
        page: 'dashboard', 
        error: err instanceof Error ? err.message : 'Unknown error' 
      })
    } finally {
      setLoading(false)
    }
  }

  function handleCreateNew() {
    analytics.track('create_agent_clicked', { source: 'dashboard' })
    router.push('/deploy')
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this agent?')) return

    try {
      await api.deleteDeployment(id)
      setDeployments(deployments.filter(d => d.id !== id))
      analytics.track('agent_deleted', { deployment_id: id })
    } catch (err) {
      alert('Failed to delete deployment')
      analytics.track('error_occurred', { 
        action: 'delete_agent', 
        error: err instanceof Error ? err.message : 'Unknown error' 
      })
    }
  }

  if (loading) {
    return (
      <div className="cosmic-bg min-h-screen relative overflow-hidden">
        <div className="cosmic-orb cosmic-orb-1" />
        <div className="cosmic-orb cosmic-orb-2" />
        <div className="cosmic-orb cosmic-orb-3" />
        <Header />
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="cosmic-bg min-h-screen relative overflow-hidden">
      {/* Cosmic orbs */}
      <div className="cosmic-orb cosmic-orb-1" />
      <div className="cosmic-orb cosmic-orb-2" />
      <div className="cosmic-orb cosmic-orb-3" />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Your AI Agents</h1>
                <p className="text-gray-400">
                  Manage and monitor your deployed agents
                </p>
              </div>
              <Button 
                onClick={handleCreateNew}
                size="lg"
                className="btn-primary"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Agent
              </Button>
            </div>

            {/* Error state */}
            {error && (
              <div className="glass-card border-red-500/50 p-6 rounded-xl mb-8">
                <p className="text-red-400">{error}</p>
                <Button 
                  onClick={fetchDeployments}
                  variant="outline"
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Empty state */}
            {!error && deployments.length === 0 && (
              <div className="glass-card p-12 rounded-xl text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 bg-cosmic-purple/20 rounded-full flex items-center justify-center">
                    <Plus className="w-10 h-10 text-cosmic-purple" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">No agents yet</h2>
                  <p className="text-gray-400 mb-6">
                    Get started by deploying your first AI agent. It takes less than 30 seconds!
                  </p>
                  <Button 
                    onClick={handleCreateNew}
                    size="lg"
                    className="btn-primary"
                  >
                    Deploy Your First Agent
                  </Button>
                </div>
              </div>
            )}

            {/* Deployments grid */}
            {deployments.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deployments.map(deployment => (
                  <AgentCard
                    key={deployment.id}
                    deployment={deployment}
                    onDelete={() => handleDelete(deployment.id)}
                  />
                ))}
              </div>
            )}

            {/* Stats summary */}
            {deployments.length > 0 && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Total Agents</p>
                  <p className="text-3xl font-bold">{deployments.length}</p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Active</p>
                  <p className="text-3xl font-bold text-green-400">
                    {deployments.filter(d => d.status === 'active').length}
                  </p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Total Messages</p>
                  <p className="text-3xl font-bold text-cosmic-purple">
                    {deployments.reduce((sum, d) => sum + (d.stats?.messageCount || 0), 0)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
