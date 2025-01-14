# EventEase Platform

A full-stack event management platform built with Next.js (Frontend) and NestJS (Backend).

## Prerequisites

- Docker and Docker Compose
- Node.js v20+ (for local development)
- npm v10+ (for local development)
- Git

## Quick Start

1. Clone the repository
2. Copy environment files:

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

3. Change the environment variables in the `.env` files to match your setup.

### Backend

Development:

```bash
cd backend
npm install
npm run docker:dev:build
```

Production:

```bash
cd backend
npm run docker:prod:build
```

### Frontend

Development:

```bash
cd frontend
npm install
npm run docker:dev:build
```

Production:

```bash
cd frontend
npm run docker:prod:build
```

## Architecture Overview

### Backend (NestJS)

- GraphQL API with Apollo Server
- PostgreSQL database with Prisma
- JWT Authentication
- Socket.IO for real-time updates
- Docker containerization

### Frontend (Next.js)

- Apollo Client for GraphQL
- Tailwind CSS for styling
- Socket.IO Client for real-time features
- Docker containerization

## Docker Configuration

The project uses separate Docker configurations for development and production:

### Backend Docker Setup

- Development configuration: `docker/docker-compose.dev.yml`
- Production configuration: `docker/docker-compose.prod.yml`
- Includes PostgreSQL service
- Automatic restart on code changes in development

### Frontend Docker Setup

- Development configuration: `docker/docker-compose.dev.yml`
- Production configuration: `docker/docker-compose.prod.yml`
- Hot reload enabled in development
- Production-optimized build

## Available Scripts

### Backend Scripts

```bash
npm run docker:dev # Start development environment
npm run docker:prod # Start production environment
npm run docker:down # Stop development containers
npm run docker:down:prod # Stop production containers
```

### Frontend Scripts

```bash
npm run docker:dev        # Start development environment
npm run docker:prod      # Start production environment
npm run docker:down      # Stop development containers
npm run docker:down:prod # Stop production containers
```

## Default Ports

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- PostgreSQL: 5432

## Notes

- Development mode includes hot-reload and debugging capabilities
- Production mode includes optimized builds and network isolation
- Environment variables are loaded from .env files in both modes
