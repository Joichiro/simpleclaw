.PHONY: help install dev build start stop restart logs clean test

help:
	@echo "SimpleClaw - Available Commands"
	@echo "================================"
	@echo "install     - Install all dependencies"
	@echo "dev         - Start development environment"
	@echo "build       - Build Docker images"
	@echo "start       - Start production environment"
	@echo "stop        - Stop all services"
	@echo "restart     - Restart all services"
	@echo "logs        - View logs"
	@echo "clean       - Clean up containers and volumes"
	@echo "test        - Run tests"

install:
	@echo "Installing frontend dependencies..."
	cd simpleclaw-frontend && npm install
	@echo "Installing backend dependencies..."
	cd simpleclaw-backend && npm install
	@echo "✓ Dependencies installed"

dev:
	@echo "Starting development environment..."
	docker-compose -f docker-compose.dev.yml up -d
	@echo "✓ Development databases running"
	@echo "Run 'cd simpleclaw-frontend && npm run dev' for frontend"
	@echo "Run 'cd simpleclaw-backend && npm run dev' for backend"

build:
	@echo "Building Docker images..."
	docker-compose build
	@echo "✓ Images built successfully"

start:
	@echo "Starting SimpleClaw..."
	docker-compose up -d
	@echo "✓ SimpleClaw is running"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:3001"

stop:
	@echo "Stopping SimpleClaw..."
	docker-compose down
	@echo "✓ Services stopped"

restart:
	@echo "Restarting SimpleClaw..."
	docker-compose restart
	@echo "✓ Services restarted"

logs:
	docker-compose logs -f

clean:
	@echo "Cleaning up..."
	docker-compose down -v
	docker system prune -f
	@echo "✓ Cleanup complete"

test:
	@echo "Running frontend tests..."
	cd simpleclaw-frontend && npm test
	@echo "Running backend tests..."
	cd simpleclaw-backend && npm test
	@echo "✓ Tests complete"