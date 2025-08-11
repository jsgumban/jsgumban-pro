# Full-Stack Supabase Monorepo

A complete full-stack application built with Express.js backend, Next.js frontend, and Supabase for authentication and database.

## 🏗️ Project Structure

```
.
├── backend/           # Express.js API server
│   ├── config/        # Supabase configuration
│   ├── middleware/    # Authentication middleware
│   ├── routes/        # API routes
│   ├── index.js       # Server entry point
│   ├── package.json
│   └── .env.example
├── frontend/          # Next.js React application
│   ├── src/
│   │   ├── app/       # Next.js 13+ app directory
│   │   ├── components/# React components (Navbar, Providers)
│   │   ├── hooks/     # Custom React hooks (useAuth)
│   │   └── lib/       # Redux store, slices, and utilities
│   ├── package.json
│   └── .env.example
├── package.json       # Root monorepo configuration
├── README.md          # Project overview
└── CLAUDE.md          # This file - comprehensive guide
```

## 🚀 Tech Stack

### Backend
- **Express.js**: Fast, minimalist web framework for Node.js
- **Supabase**: Backend-as-a-Service for database and authentication
- **JWT**: Token-based authentication via Supabase
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security middleware

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library with hooks
- **Redux Toolkit**: Simplified Redux for state management
- **React-Redux**: React bindings for Redux
- **Supabase Auth Helpers**: Next.js integration for Supabase
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Supabase account and project

## 🎯 Quick Start

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install workspace dependencies
npm run install:all
# OR manually:
# cd backend && npm install && cd ../frontend && npm install
```

### 2. Supabase Setup

1. Create a new Supabase project at https://app.supabase.com
2. Go to Settings > API to get your keys
3. Create the following table in your Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 3. Environment Variables

#### Backend (.env)
```bash
# Copy example file
cd backend && cp .env.example .env

# Edit .env with your values:
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)
```bash
# Copy example file  
cd frontend && cp .env.example .env.local

# Edit .env.local with your values:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Development

```bash
# Start both backend and frontend
npm run dev

# OR start separately:
npm run dev:backend  # Starts backend on :5000
npm run dev:frontend # Starts frontend on :3000
```

## 🔐 Authentication Flow

### Backend Authentication (Primary)
- **Email/Password Authentication**: Handled entirely on backend via API routes
- **JWT validation**: Using Supabase's `getUser()` method for token verification
- **Automatic Profile Creation**: Creates profile record in `profiles` table on registration
- **Session Management**: Backend controls all session lifecycle
- **Security**: Credentials never exposed to frontend JavaScript

### Frontend Authentication 
- **Redux State Management**: Centralized auth state with Redux Toolkit
- **Backend API Integration**: `useAuth` hook calls backend auth endpoints for email/password
- **OAuth Integration**: Direct Supabase client integration for Google/GitHub OAuth
- **Session Persistence**: LocalStorage with server-side validation
- **Protected Routes**: Redirect to login if not authenticated
- **Real-time State**: Automatic state updates on auth changes
- **Auth-Aware UI**: Dynamic navbar and components based on auth state

### Key Authentication Features
- ✅ **Redux State Management**: Simplified Redux with basic actions for auth state
- ✅ **Backend Email/Password**: Secure server-side authentication
- ✅ **OAuth providers**: Google, GitHub (via direct Supabase client)
- ✅ **Protected API routes**: JWT middleware validation
- ✅ **Protected frontend pages**: Route-level protection
- ✅ **Auth-aware Navigation**: Dynamic navbar with user menu and conditional links
- ✅ **Automatic profile creation**: User profiles created on signup and OAuth
- ✅ **Session persistence**: LocalStorage + server validation
- ✅ **Hybrid auth approach**: Backend for email/password, direct Supabase for OAuth

## 🛠️ API Endpoints

### Authentication Routes (`/auth`)
- `POST /auth/register` - **User registration with auto profile creation**
- `POST /auth/login` - **User login (returns session tokens)**
- `POST /auth/logout` - **User logout (invalidates session)**
- `GET /auth/verify` - Verify JWT token validity
- `POST /auth/refresh` - Refresh access token

### OAuth Authentication
- **Google OAuth**: Direct Supabase client integration with automatic profile creation
- **GitHub OAuth**: Direct Supabase client integration with automatic profile creation
- **Callback Handling**: `/auth/callback` route handles OAuth redirects and profile creation

### Protected Routes (`/api`)
- `GET /api/profile` - Get user profile data
- `PUT /api/profile` - Update user profile information
- `GET /api/dashboard-data` - Get dashboard statistics

### Frontend Routes
- `/` - Home page (public)
- `/login` - Sign in page
- `/signup` - Registration page
- `/dashboard` - Protected dashboard (requires auth)
- `/auth/callback` - OAuth callback handler

## 📊 Database Schema

### Profiles Table
```sql
profiles {
  id: UUID (FK to auth.users)
  full_name: TEXT
  avatar_url: TEXT  
  updated_at: TIMESTAMP
}
```

### Built-in Supabase Tables
- `auth.users` - User accounts and metadata
- `auth.sessions` - Active user sessions

## 🚀 Deployment

### Backend Deployment Options
1. **Railway/Render** - Container-based deployment
2. **DigitalOcean App Platform** - Managed container deployment
3. **Heroku** - Platform-as-a-Service deployment
4. **AWS/GCP/Azure** - Cloud provider deployment
5. **VPS/Docker** - Self-hosted deployment

### Frontend Deployment
1. **Vercel** (recommended for Next.js)
2. **Netlify**
3. **Static hosting** with `npm run build && npm run export`

### Production Environment Variables
Ensure these are set in your deployment environment:
- All variables from `.env.example` files
- Update URLs to production domains
- Use production Supabase keys

## 🔧 Development Commands

```bash
# Root level
npm run dev                 # Start both services
npm run build              # Build both services
npm run start              # Start both services in production
npm run clean              # Clean all node_modules

# Backend specific
cd backend
npm run dev                # Start backend dev server
npm run start              # Start backend in production

# Frontend specific  
cd frontend
npm run dev                # Start frontend dev server
npm run build              # Build frontend for production
npm run start              # Start frontend in production
npm run lint               # Lint frontend code
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `FRONTEND_URL` in backend `.env`
   - Ensure backend CORS is properly configured

2. **Authentication Errors**
   - Verify Supabase URL and keys are correct
   - Check if RLS policies are properly set up
   - Ensure auth callback URL is configured in Supabase

3. **Build Errors**
   - Check Node.js version (>=18 required)
   - Clear `node_modules` and reinstall: `npm run clean && npm install`

4. **Environment Variables Not Loading**
   - Frontend: Use `.env.local` (not `.env`)
   - Backend: Use `.env` 
   - Restart dev servers after changing env vars

### Debug Mode
Set `NODE_ENV=development` to see detailed error messages.

## 📚 Key Files Reference

### Backend Key Files
- `backend/index.js` - Main server file
- `backend/config/supabase.js` - Supabase client setup
- `backend/middleware/auth.js` - JWT authentication middleware
- `backend/routes/auth.js` - **Authentication endpoints (register, login, logout)**
- `backend/routes/protected.js` - Protected API routes

### Frontend Key Files
- `frontend/src/app/layout.tsx` - Root layout with Redux provider and navbar
- `frontend/src/app/page.tsx` - Home page
- `frontend/src/components/Navbar.tsx` - **Auth-aware navigation component**
- `frontend/src/components/Providers.tsx` - Redux provider wrapper
- `frontend/src/lib/store.ts` - Redux store configuration
- `frontend/src/lib/slices/authSlice.ts` - Authentication Redux slice
- `frontend/src/hooks/useAuth.ts` - **Authentication hook (Redux + API integration)**
- `frontend/src/lib/supabase.ts` - Supabase client configuration (OAuth only)
- `frontend/src/app/login/page.tsx` - Login page with Redux integration
- `frontend/src/app/signup/page.tsx` - Registration page with Redux integration
- `frontend/src/app/dashboard/page.tsx` - Protected dashboard

## 🔄 Adding New Features

### Adding a New API Route
1. Create route file in `backend/routes/`
2. Import and use in `backend/index.js`
3. Add authentication middleware if needed

### Adding a New Page
1. Create page in `frontend/src/app/[route]/page.tsx`
2. Add navigation links as needed
3. Use `useAuth` hook for authentication state

### Adding Database Tables
1. Create table in Supabase SQL editor
2. Set up RLS policies for security
3. Update TypeScript types in `frontend/src/lib/supabase.ts`

## 🔐 Backend Authentication Implementation

### Registration Flow (`POST /auth/register`)
```javascript
// Request body: { email, password }
// Response: { user, session, message }
```
1. Validates email and password requirements
2. Creates user account via Supabase Auth
3. Automatically creates profile record in `profiles` table
4. Returns user object and session tokens

### Login Flow (`POST /auth/login`)
```javascript  
// Request body: { email, password }
// Response: { user, session, message }
```
1. Authenticates credentials via Supabase Auth
2. Returns user object and session tokens
3. Frontend stores session in localStorage

### Logout Flow (`POST /auth/logout`)
```javascript
// Headers: Authorization: Bearer <token>
// Response: { message }
```
1. Invalidates session server-side via Supabase
2. Frontend clears localStorage and auth state

### Session Management
- **Token Validation**: `GET /auth/verify` endpoint validates JWT tokens
- **Automatic Refresh**: `POST /auth/refresh` endpoint for token renewal
- **Frontend Persistence**: Sessions stored in localStorage with server-side validation
- **Security**: All sensitive auth operations handled server-side

## 🔄 Redux State Management

### Simple Redux Architecture
```javascript
// Basic Redux actions (no complex async thunks)
dispatch(setLoading(true))
dispatch(setAuth({ user, session }))
dispatch(setError('Error message'))
dispatch(clearAuth())
```

### Auth State Structure
```javascript
interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}
```

### Key Redux Features
- ✅ **Simplified Actions**: Basic synchronous actions for state updates
- ✅ **Centralized State**: Single source of truth for authentication
- ✅ **Easy Debugging**: Simple state transitions with Redux DevTools
- ✅ **Clean API Integration**: API logic in useAuth hook, state management in Redux
- ✅ **Component Reactivity**: Components automatically re-render on state changes

## 🎨 UI Components

### Auth-Aware Navbar
- **Dynamic Navigation**: Shows different links based on authentication state
- **User Menu**: Dropdown with user info, dashboard link, and sign out
- **Professional Design**: Clean styling with hover effects and transitions
- **Responsive Layout**: Mobile-friendly design with collapsible menu
- **Loading States**: Shows spinner during authentication state changes

### Component Features
- ✅ **Conditional Rendering**: Different UI for authenticated vs guest users
- ✅ **User Avatar**: Displays first letter of user email in circular avatar
- ✅ **Click Outside**: Dropdown closes when clicking outside
- ✅ **Smooth Transitions**: Professional hover and focus effects
- ✅ **Accessibility**: Proper focus management and keyboard navigation

This project provides a solid foundation for building scalable full-stack applications with modern tools and best practices, featuring secure backend authentication, Redux state management, and professional UI components.