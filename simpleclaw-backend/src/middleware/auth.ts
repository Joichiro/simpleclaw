import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

/**
 * JWT authentication middleware
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        error: 'No token provided' 
      })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'your-secret-key'
    ) as any

    // Attach user info to request
    req.body.userId = decoded.userId
    req.body.userEmail = decoded.email

    next()
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      error: 'Invalid or expired token' 
    })
  }
}