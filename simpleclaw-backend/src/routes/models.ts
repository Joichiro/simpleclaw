import { Router, Request, Response } from 'express'

const router = Router()

/**
 * GET /api/models
 * List available AI models
 */
router.get('/', async (req: Request, res: Response) => {
  const models = [
    {
      id: 'claude-opus-4.5',
      name: 'Claude Opus 4.5',
      provider: 'Anthropic',
      description: 'Most capable model for complex reasoning',
      contextWindow: 200000,
      pricing: {
        input: 0.015,
        output: 0.075
      }
    },
    {
      id: 'gpt-5.2',
      name: 'GPT-5.2',
      provider: 'OpenAI',
      description: 'Balanced performance for creative tasks',
      contextWindow: 128000,
      pricing: {
        input: 0.01,
        output: 0.03
      }
    },
    {
      id: 'gemini-3-flash',
      name: 'Gemini 3 Flash',
      provider: 'Google',
      description: 'Lightning-fast responses with excellent efficiency',
      contextWindow: 100000,
      pricing: {
        input: 0.0005,
        output: 0.0015
      }
    }
  ]

  res.json({
    success: true,
    models
  })
})

/**
 * GET /api/models/channels
 * List available deployment channels
 */
router.get('/channels', async (req: Request, res: Response) => {
  const channels = [
    {
      id: 'telegram',
      name: 'Telegram',
      status: 'active',
      description: 'Deploy to Telegram with bot API',
      features: ['Instant messaging', 'Rich media', 'Bot commands']
    },
    {
      id: 'discord',
      name: 'Discord',
      status: 'coming-soon',
      description: 'Discord server integration',
      features: ['Server integration', 'Slash commands', 'Voice channels']
    },
    {
      id: 'slack',
      name: 'Slack',
      status: 'coming-soon',
      description: 'Slack workspace integration',
      features: ['Workspace apps', 'Slash commands', 'Workflows']
    }
  ]

  res.json({
    success: true,
    channels
  })
})

export default router