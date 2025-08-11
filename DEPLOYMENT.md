# Vercel Deployment Guide

## 🚀 Your app is now ready for Vercel deployment!

### Prerequisites
- Vercel account (https://vercel.com)
- Supabase project with environment variables
- Git repository (push your code to GitHub/GitLab/Bitbucket)

## Deployment Steps

### 1. Push to Git Repository
```bash
git init
git add .
git commit -m "Initial commit - ready for Vercel deployment"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project root
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: your-app-name
# - Directory: ./ (current directory)
# - Override settings? Yes
# - Build command: cd frontend && npm run build
# - Output directory: frontend/.next
# - Development command: npm run dev
```

#### Option B: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your Git repository
4. Configure project settings:
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/.next`
   - **Install Command**: `npm install && cd frontend && npm install`

### 3. Set Environment Variables in Vercel

In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
NODE_ENV=production
FRONTEND_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_API_URL=/api
```

### 4. Deploy!

Your app will be available at: `https://your-app-name.vercel.app`

## 🔧 How It Works

### Architecture
- **Frontend**: Next.js app deployed to Vercel's edge network
- **Backend**: Express.js API deployed as Vercel serverless functions
- **Database**: Supabase (external service)

### API Routes
- Frontend: `https://your-app.vercel.app/`
- Backend API: `https://your-app.vercel.app/api/`
- Auth endpoints: `https://your-app.vercel.app/api/auth/`

### File Structure
```
.
├── vercel.json           # Vercel configuration
├── api/
│   ├── index.js         # Express app (works both locally and serverless)
│   ├── config/          # Supabase configuration
│   ├── middleware/      # Auth middleware
│   └── routes/          # Express routes (auth, protected)
├── frontend/            # Next.js app
└── package.json         # Root dependencies for serverless functions
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Ensure all dependencies are in root `package.json`
   - Check that Node.js version matches (`engines` in package.json)

2. **API Not Working**
   - Verify environment variables are set in Vercel dashboard
   - Check that Supabase URLs and keys are correct
   - Ensure CORS allows your Vercel domain

3. **Authentication Issues**
   - Update Supabase Auth settings to allow your Vercel domain
   - Check redirect URLs in Supabase dashboard

### Local Development
Use the updated development commands:
```bash
npm run dev  # Starts both API (port 5001) and frontend (port 3000)
npm run dev:api  # Starts only the API server on port 5001
npm run dev:frontend  # Starts only the frontend on port 3000
```

**Note**: This monorepo uses independent modules (not workspaces) - each package manages its own dependencies.

### Production Testing
Test your deployed API:
```bash
curl https://your-app-name.vercel.app/api
curl https://your-app-name.vercel.app/api/auth/verify
```

## ✅ What's Deployed

- ✅ **Frontend**: Next.js app with Redux state management
- ✅ **Backend**: Express.js API as serverless functions
- ✅ **Authentication**: Supabase auth with JWT validation
- ✅ **Database**: Supabase profiles table with RLS
- ✅ **CORS**: Configured for Vercel domains
- ✅ **Environment**: Production-ready configuration

Your full-stack app is now ready for production! 🎉