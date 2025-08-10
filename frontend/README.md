# Frontend - Next.js Application

Next.js 14 frontend application with Supabase authentication and TypeScript.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

The application will start on `http://localhost:3000`

## 📋 Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_URL=http://localhost:3000
```

## 🔐 Authentication

### useAuth Hook

The `useAuth` hook provides authentication state and methods:

```typescript
const { user, session, loading, signIn, signUp, signOut } = useAuth();
```

### Protected Routes

Pages automatically redirect to login if not authenticated:

```typescript
// In your component
const { user, loading } = useAuth();

useEffect(() => {
  if (!loading && !user) {
    router.push('/login');
  }
}, [user, loading, router]);
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── auth/
│   │   └── callback/       # OAuth callback handler
│   ├── dashboard/          # Protected dashboard page
│   ├── login/              # Login page
│   ├── signup/             # Registration page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable components
├── hooks/
│   └── useAuth.ts          # Authentication hook
└── lib/
    └── supabase.ts         # Supabase client configuration
```

## 🎨 Styling

Uses Tailwind CSS for styling with a responsive design system:

- Utility-first CSS framework
- Dark mode support (system preference)
- Responsive breakpoints
- Component-based styling

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint code with ESLint

## 📊 Dependencies

### Production
- `next` - React framework
- `react` & `react-dom` - UI library
- `@supabase/auth-helpers-nextjs` - Supabase Next.js integration
- `@supabase/supabase-js` - Supabase client

### Development
- `typescript` - Type safety
- `@types/*` - Type definitions
- `tailwindcss` - CSS framework
- `eslint` - Code linting
- `autoprefixer` & `postcss` - CSS processing

## 🛡️ Security Features

- **Protected Routes**: Automatic authentication checks
- **JWT Token Management**: Secure token storage and refresh
- **OAuth Integration**: Google and GitHub providers
- **CORS Configuration**: Secure API communication
- **TypeScript**: Type safety and error prevention

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- Netlify
- Static hosting with `next export`
- Docker containers

Make sure to update environment variables with production URLs.

## 📱 Pages

### Public Pages
- `/` - Home page with feature overview
- `/login` - Sign in with email/password or OAuth
- `/signup` - User registration

### Protected Pages
- `/dashboard` - User dashboard with profile and statistics

### Utility Pages
- `/auth/callback` - OAuth callback handler

## 🔄 State Management

Uses React Context and the `useAuth` hook for authentication state:
- Automatic session management
- Token refresh handling
- Loading states
- Error handling