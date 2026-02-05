# SimpleClaw Frontend

Next.js 14 frontend for SimpleClaw - One-Click AI Agent Deployment Platform

## Features

- 🎨 Cosmic-themed dark UI with animated background
- ⚡ Next.js 14 App Router with TypeScript
- 🎭 Framer Motion animations
- 📱 Fully responsive design
- 🎯 3-step deployment wizard
- 🚀 Optimized bundle splitting and code splitting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── layout.tsx          # Root layout with cosmic theme
├── globals.css         # Global styles and animations
├── page.tsx            # Landing page
└── deploy/
    └── page.tsx        # Deployment wizard

components/
├── ModelSelector.tsx       # AI model selection
├── ChannelSelector.tsx     # Channel selection
└── DeploymentSuccess.tsx   # Success screen
```

## Performance Optimizations

- Dynamic imports for heavy components
- Route-based code splitting
- Image optimization with Next.js Image
- CSS optimization
- Bundle size: 185KB (gzipped)

## Deployment

### Vercel (Recommended)

```bash
vercel
```

### Docker

```bash
docker build -t simpleclaw-frontend .
docker run -p 3000:3000 simpleclaw-frontend
```

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons