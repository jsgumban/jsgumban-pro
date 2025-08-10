# Backend - Express.js API

Express.js backend server with Supabase authentication and JWT middleware.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

The server will start on `http://localhost:5000`

## 📋 Environment Variables

Create a `.env` file with the following variables:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🛠️ API Endpoints

### Authentication Routes (`/auth`)
- `GET /auth/verify` - Verify JWT token
- `POST /auth/refresh` - Refresh access token

### Protected Routes (`/api`)
- `GET /api/profile` - Get user profile (requires auth)
- `PUT /api/profile` - Update user profile (requires auth)
- `GET /api/dashboard-data` - Get dashboard data (requires auth)

## 🔐 Authentication Middleware

The `authenticateToken` middleware validates Supabase JWT tokens:

```javascript
const { authenticateToken } = require('./middleware/auth');

router.get('/protected-route', authenticateToken, (req, res) => {
  // Access user data via req.user
});
```

## 📁 Project Structure

```
src/
├── config/
│   └── supabase.js     # Supabase client configuration
├── middleware/
│   └── auth.js         # JWT authentication middleware
├── routes/
│   ├── auth.js         # Authentication endpoints
│   └── protected.js    # Protected API routes
└── index.js            # Main server file
```

## 🔧 Scripts

- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run build` - Build command (currently just logs)

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **JWT Validation**: Token-based authentication
- **Environment Variables**: Secure credential management

## 📊 Dependencies

### Production
- `express` - Web framework
- `@supabase/supabase-js` - Supabase client
- `cors` - CORS middleware
- `helmet` - Security middleware
- `dotenv` - Environment variables
- `jsonwebtoken` - JWT utilities

### Development
- `nodemon` - Development server with hot reload

## 🚀 Deployment

The backend can be deployed to:
- Railway
- Render
- DigitalOcean App Platform
- Heroku
- AWS/GCP/Azure

Make sure to set environment variables in your deployment platform.