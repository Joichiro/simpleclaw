import { getApiUrl } from './utils'
import type { 
  AIModel, 
  Channel, 
  Deployment, 
  DeploymentConfig,
  User,
  ApiResponse 
} from '@/types'

/**
 * API client for backend communication
 */
class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor() {
    this.baseUrl = getApiUrl()
    
    // Load token from localStorage on client
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  /**
   * Set authentication token
   */
  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  /**
   * Clear authentication token
   */
  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  /**
   * Make authenticated API request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        message: response.statusText 
      }))
      throw new Error(error.message || `API error: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string }> {
    return this.request('/health')
  }

  // Authentication endpoints

  /**
   * Initiate Google OAuth flow
   */
  getGoogleAuthUrl(): string {
    return `${this.baseUrl}/api/auth/google`
  }

  /**
   * Verify authentication token
   */
  async verifyToken(): Promise<User> {
    return this.request<User>('/api/auth/verify')
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await this.request('/api/auth/logout', { method: 'POST' })
    this.clearToken()
  }

  // Models and channels

  /**
   * Get available AI models
   */
  async getModels(): Promise<AIModel[]> {
    return this.request<AIModel[]>('/api/models')
  }

  /**
   * Get available channels
   */
  async getChannels(): Promise<Channel[]> {
    return this.request<Channel[]>('/api/models/channels')
  }

  // Deployment endpoints

  /**
   * Check VPS availability
   */
  async checkAvailability(): Promise<{ 
    available: boolean
    slotsRemaining: number
  }> {
    return this.request('/api/deploy/availability')
  }

  /**
   * Create new deployment
   */
  async createDeployment(config: DeploymentConfig): Promise<Deployment> {
    return this.request<Deployment>('/api/deploy', {
      method: 'POST',
      body: JSON.stringify(config),
    })
  }

  /**
   * Get all deployments for current user
   */
  async getDeployments(): Promise<Deployment[]> {
    return this.request<Deployment[]>('/api/deploy/list')
  }

  /**
   * Get deployment by ID
   */
  async getDeployment(id: string): Promise<Deployment> {
    return this.request<Deployment>(`/api/deploy/${id}`)
  }

  /**
   * Delete deployment
   */
  async deleteDeployment(id: string): Promise<void> {
    return this.request(`/api/deploy/${id}`, { method: 'DELETE' })
  }

  /**
   * Update deployment configuration
   */
  async updateDeployment(
    id: string, 
    config: Partial<DeploymentConfig>
  ): Promise<Deployment> {
    return this.request<Deployment>(`/api/deploy/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(config),
    })
  }

  /**
   * Get deployment logs
   */
  async getDeploymentLogs(id: string, limit = 100): Promise<{
    logs: Array<{
      timestamp: string
      level: string
      message: string
    }>
  }> {
    return this.request(`/api/deploy/${id}/logs?limit=${limit}`)
  }

  /**
   * Get deployment stats
   */
  async getDeploymentStats(id: string): Promise<{
    messageCount: number
    uptime: number
    lastActive: string
    errorRate: number
  }> {
    return this.request(`/api/deploy/${id}/stats`)
  }
}

// Export singleton instance
export const api = new ApiClient()

/**
 * Hook for handling API errors
 */
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    await api.verifyToken()
    return true
  } catch {
    return false
  }
}
