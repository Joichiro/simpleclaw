'use client'

import posthog from 'posthog-js'
import { useEffect } from 'react'

/**
 * Initialize PostHog analytics
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return
  
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const enabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'
  
  if (!key || !enabled) {
    console.log('[Analytics] Disabled or missing API key')
    return
  }

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NEXT_PUBLIC_ENV === 'development') {
        posthog.debug()
      }
    },
    capture_pageview: false, // We'll capture manually
    capture_pageleave: true,
    autocapture: false, // Manual tracking for better control
  })
}

/**
 * Analytics tracking interface
 */
export const analytics = {
  /**
   * Track custom event
   */
  track: (event: string, properties?: Record<string, any>) => {
    if (typeof window === 'undefined') return
    
    try {
      posthog.capture(event, properties)
    } catch (error) {
      console.error('[Analytics] Track error:', error)
    }
  },

  /**
   * Identify user
   */
  identify: (userId: string, traits?: Record<string, any>) => {
    if (typeof window === 'undefined') return
    
    try {
      posthog.identify(userId, traits)
    } catch (error) {
      console.error('[Analytics] Identify error:', error)
    }
  },

  /**
   * Track page view
   */
  page: (pageName?: string) => {
    if (typeof window === 'undefined') return
    
    try {
      posthog.capture('$pageview', {
        page: pageName || window.location.pathname,
      })
    } catch (error) {
      console.error('[Analytics] Page error:', error)
    }
  },

  /**
   * Reset analytics (on logout)
   */
  reset: () => {
    if (typeof window === 'undefined') return
    
    try {
      posthog.reset()
    } catch (error) {
      console.error('[Analytics] Reset error:', error)
    }
  },

  /**
   * Set user properties
   */
  setUserProperties: (properties: Record<string, any>) => {
    if (typeof window === 'undefined') return
    
    try {
      posthog.people.set(properties)
    } catch (error) {
      console.error('[Analytics] Set properties error:', error)
    }
  },
}

/**
 * Analytics Provider Component
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAnalytics()
  }, [])

  return <>{children}</>
}

/**
 * Hook for tracking page views
 */
export function usePageView(pageName?: string) {
  useEffect(() => {
    analytics.page(pageName)
  }, [pageName])
}

/**
 * Predefined event tracking functions
 */
export const trackEvent = {
  // Landing page events
  ctaClicked: (button: string) => {
    analytics.track('cta_clicked', { button })
  },

  // Auth events
  signupStarted: (provider: string = 'google') => {
    analytics.track('signup_started', { provider })
  },
  signupCompleted: (provider: string = 'google') => {
    analytics.track('signup_completed', { provider })
  },
  loginStarted: (provider: string = 'google') => {
    analytics.track('login_started', { provider })
  },
  loginCompleted: (provider: string = 'google') => {
    analytics.track('login_completed', { provider })
  },

  // Deployment flow events
  modelSelected: (model: string) => {
    analytics.track('model_selected', { model })
  },
  channelSelected: (channel: string) => {
    analytics.track('channel_selected', { channel })
  },
  deploymentStarted: (model: string, channel: string) => {
    analytics.track('deployment_started', { model, channel })
  },
  deploymentCompleted: (durationSeconds: number) => {
    analytics.track('deployment_completed', { duration_seconds: durationSeconds })
  },
  deploymentFailed: (error: string) => {
    analytics.track('deployment_failed', { error })
  },

  // Engagement events
  useCaseClicked: (category: string, title: string) => {
    analytics.track('use_case_clicked', { category, title })
  },
  pricingViewed: () => {
    analytics.track('pricing_viewed')
  },
  comparisonViewed: () => {
    analytics.track('comparison_viewed')
  },

  // Conversion events
  paymentStarted: (plan: string, amount: number) => {
    analytics.track('payment_started', { plan, amount })
  },
  paymentCompleted: (plan: string, amount: number) => {
    analytics.track('payment_completed', { plan, amount })
  },
  paymentFailed: (error: string) => {
    analytics.track('payment_failed', { error })
  },

  // Dashboard events
  agentDeleted: (deploymentId: string) => {
    analytics.track('agent_deleted', { deployment_id: deploymentId })
  },
  agentEdited: (deploymentId: string) => {
    analytics.track('agent_edited', { deployment_id: deploymentId })
  },
}
