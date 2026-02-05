import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'

const router = Router()

/**
 * POST /api/auth/google
 * Google OAuth callback handler
 */
router.post('/google',
  body('token').notEmpty().withMessage('Google token is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { token } = req.body

      // TODO: Verify Google token with Google OAuth API
      // For now, mock the verification
      const mockUser = {
        id: 'user_' + Date.now(),
        email: 'user@example.com',
        name: 'Demo User'
      }

      // Generate JWT
      const jwtToken = jwt.sign(
        { userId: mockUser.id, email: mockUser.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      )

      res.json({
        success: true,
        token: jwtToken,
        user: mockUser
      })
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Authentication failed' 
      })
    }
  }
)

/**
 * POST /api/auth/refresh
 * Refresh JWT token
 */
router.post('/refresh',
  body('token').notEmpty().withMessage('Token is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { token } = req.body
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any

      // Generate new token
      const newToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      )

      res.json({
        success: true,
        token: newToken
      })
    } catch (error) {
      res.status(401).json({ 
        success: false, 
        error: 'Invalid or expired token' 
      })
    }
  }
)

/**
 * GET /api/auth/me
 * Get current user info
 */
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any

    res.json({
      success: true,
      user: {
        id: decoded.userId,
        email: decoded.email
      }
    })
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      error: 'Invalid token' 
    })
  }
})

export default router