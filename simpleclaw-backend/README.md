# SimpleClaw Backend

Node.js/Express/TypeScript backend API for SimpleClaw platform.

## Features

- 🚀 Express.js with TypeScript
- 🔐 JWT authentication
- 🛡️ Security (Helmet, CORS, rate limiting)
- 📝 Request logging with Winston
- ✅ Input validation
- 🎯 RESTful API design
- 🐳 Docker-ready

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure your environment variables:
- `JWT_SECRET` - Secret key for JWT tokens
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `OPENROUTER_API_KEY` - OpenRouter API key for AI models
- `TELEGRAM_BOT_TOKEN` - Telegram bot token (optional)

### Development

```bash
npm run dev
```

Server runs on http://localhost:3001

### Build

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get current user

### Deployments
- `POST /api/deploy` - Deploy new AI agent
- `GET /api/deploy` - List all deployments
- `GET /api/deploy/:id` - Get deployment details
- `DELETE /api/deploy/:id` - Delete deployment

### Models & Channels
- `GET /api/models` - List available AI models
- `GET /api/models/channels` - List available channels

### Health
- `GET /health` - Health check endpoint

## Project Structure

```
src/
├── server.ts              # Express app setup
├── routes/
│   ├── auth.ts           # Authentication routes
│   ├── deploy.ts         # Deployment routes
│   └── models.ts         # Models & channels
├── services/
│   └── deploymentService.ts  # Deployment logic
├── middleware/
│   ├── auth.ts           # JWT middleware
│   └── errorHandler.ts   # Error handling
└── utils/
    └── logger.ts         # Winston logger
```

## Security

- Helmet for security headers
- CORS configuration
- Rate limiting (100 req/15min per IP)
- JWT authentication
- Input validation
- Environment variable protection

## Deployment

### Docker

```bash
docker build -t simpleclaw-backend .
docker run -p 3001:3001 simpleclaw-backend
```

### Railway/Heroku

```bash
# Railway
railway up

# Heroku
heroku create
git push heroku main
```

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Redis
- JWT
- Winston (logging)
- Helmet (security)