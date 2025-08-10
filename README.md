# Full-Stack Supabase Monorepo

A modern full-stack application built with Express.js, Next.js, and Supabase. This monorepo provides a complete foundation for building scalable web applications with authentication, database integration, and modern deployment practices.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Supabase:**
   - Create a new project at [Supabase](https://app.supabase.com)
   - Copy your project URL and API keys
   - Run the SQL schema (see CLAUDE.md for details)

3. **Configure environment variables:**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   # Edit both files with your Supabase credentials
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

## 📋 What's Included

- **Backend**: Express.js API with JWT authentication
- **Frontend**: Next.js 14 with App Router and TypeScript  
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Email/password + OAuth (Google, GitHub)
- **Styling**: Tailwind CSS with responsive design
- **Security**: CORS, Helmet, and secure authentication flow

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend  | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend   | Express.js, Node.js |
| Database  | Supabase (PostgreSQL) |
| Auth      | Supabase Auth with JWT |
| Deployment| Ready for Vercel, Netlify, Railway, etc. |

## 📁 Project Structure

```
├── backend/           # Express.js API
├── frontend/          # Next.js frontend
├── package.json       # Monorepo configuration
├── CLAUDE.md          # Complete setup and development guide
└── README.md          # This file
```

## 🔧 Available Commands

```bash
npm run dev            # Start both backend and frontend
npm run dev:backend    # Start only backend (port 5000)
npm run dev:frontend   # Start only frontend (port 3000)
npm run build          # Build both services for production
npm run start          # Start both services in production mode
```

## 📖 Documentation

For complete setup instructions, deployment guides, API documentation, and troubleshooting, see **[CLAUDE.md](./CLAUDE.md)**.

## 🔐 Features

- ✅ User registration and authentication
- ✅ Protected routes and API endpoints
- ✅ JWT token management with automatic refresh
- ✅ OAuth integration (Google, GitHub)
- ✅ Responsive dashboard with user profile
- ✅ Database integration with Supabase
- ✅ TypeScript support
- ✅ Production-ready configuration

## 🚀 Deployment

This project is configured for easy deployment to:
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, DigitalOcean App Platform

See CLAUDE.md for detailed deployment instructions.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Need help?** Check out the comprehensive guide in [CLAUDE.md](./CLAUDE.md) for detailed instructions, API documentation, and troubleshooting tips.