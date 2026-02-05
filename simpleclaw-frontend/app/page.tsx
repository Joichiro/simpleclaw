'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Check, Shield, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: Zap,
      title: '60-Second Deployment',
      description: 'From idea to live agent in under a minute. No code, no infrastructure, no complexity.'
    },
    {
      icon: Shield,
      title: 'Production-Ready',
      description: 'Built-in monitoring, error handling, and rate limiting. Sleep well at night.'
    },
    {
      icon: Sparkles,
      title: 'Any AI Model',
      description: 'Claude Opus 4.5, GPT-5.2, Gemini 3 Flash. Choose the best model for your use case.'
    }
  ]

  const useCases = [
    'Customer Support Bot',
    'Lead Qualification Agent',
    'Content Researcher',
    'Meeting Scheduler',
    'Code Review Assistant',
    'Sales Outreach Bot',
    'Survey Collector',
    'Onboarding Guide',
    'FAQ Responder',
    'Product Recommender',
    'Bug Triager',
    'Translation Service'
  ]

  return (
    <main className="min-h-screen relative">
      <section className="container mx-auto px-4 py-20">
        <nav className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold gradient-text">SimpleClaw</span>
          </div>
          <div className="flex gap-4">
            <Link href="/deploy" className="btn-secondary text-sm">
              Get Started
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Deploy AI Agents in{' '}
              <span className="gradient-text">60 Seconds</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              One-click deployment of production-ready AI agents to Telegram, Discord, and Slack. 
              No code, no infrastructure, no complexity.
            </p>
            <div className="flex gap-4 justify-center items-center mb-12">
              <Link href="/deploy" className="btn-primary inline-flex items-center gap-2">
                Deploy Your Agent
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="btn-secondary">
                View Demo
              </button>
            </div>
            <div className="flex gap-8 justify-center text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Free tier available</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="card-cosmic p-8 rounded-xl"
            >
              <feature.icon className={`w-12 h-12 mb-4 ${hoveredFeature === index ? 'text-purple-500' : 'text-gray-400'} transition-colors`} />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Built for Every Use Case</h2>
          <p className="text-gray-400">From customer support to sales automation, SimpleClaw handles it all</p>
        </div>
        <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="card-cosmic p-4 rounded-lg text-center text-sm"
            >
              {useCase}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="card-cosmic max-w-4xl mx-auto p-12 rounded-2xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Deploy?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join hundreds of companies using SimpleClaw to automate their workflows
          </p>
          <Link href="/deploy" className="btn-primary inline-flex items-center gap-2">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-12 border-t border-cosmic-border">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            <span>SimpleClaw</span>
          </div>
          <div>© 2026 SimpleClaw. All rights reserved.</div>
        </div>
      </footer>
    </main>
  )
}