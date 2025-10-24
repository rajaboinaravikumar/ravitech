# Ravi Ram Tech Talks - Learning Management System

## Overview
A full-stack Learning Management System (LMS) built with React, TypeScript, Node.js, Express, and MongoDB. This platform allows students to learn programming languages through interactive tutorials, practice exercises, and expert guidance from Ravi Ram.

## Project Structure
```
├── my-backend/          # Node.js/Express backend server
│   ├── config/         # Database and passport configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Authentication and error handling
│   ├── models/         # MongoDB/Mongoose models
│   ├── routes/         # API routes
│   ├── scripts/        # Database seed scripts
│   └── utils/          # Utility functions
│
├── myapp-frontend/     # React/TypeScript frontend
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   ├── contexts/   # React contexts (Auth, etc.)
│   │   ├── pages/      # Page components
│   │   └── services/   # API service layer
│   └── public/         # Static assets
│

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** as build tool and dev server
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Node.js** with Express 5
- **MongoDB** with Mongoose ODM
- **Passport.js** for authentication (JWT + Google OAuth)
- **bcryptjs** for password hashing
- **PDFKit** for certificate generation
- **Nodemailer** for email functionality

## Environment Configuration

### Required Environment Variables
- `MONGO_URI` - MongoDB connection string (MongoDB Atlas or local)
- `JWT_SECRET` - Secret key for JWT token signing
- `BACKEND_PORT` - Backend server port (default: 3001)

### Optional Environment Variables
- `GOOGLE_CLIENT_ID` - For Google OAuth login
- `GOOGLE_CLIENT_SECRET` - For Google OAuth login
- `SMTP_EMAIL` - For sending emails
- `SMTP_PASSWORD` - SMTP password
- `SMTP_HOST` - SMTP host (default: smtp.gmail.com)
- `SMTP_PORT` - SMTP port (default: 587)
- `FRONTEND_URL` - Frontend URL for redirects

## Development Setup

### Running Locally

1. Backend runs on port 3001 (localhost only)
2. Frontend runs on port 5000 (0.0.0.0) with Vite dev server
3. Vite is configured to proxy `/api` requests to the backend at `http://localhost:3001`


## API Routes

### Authentication (`/api/auth`)
- POST `/login` - Email/password login
- POST `/register` - User registration
- POST `/google` - Google OAuth login
- GET `/profile` - Get current user profile
- POST `/logout` - Logout user

### Courses (`/api/courses`)
- GET `/` - Get all courses (with filters)
- GET `/:id` - Get single course
- POST `/:id/enroll` - Enroll in course
- POST `/` - Create course (instructor only)

### Dashboard (`/api/dashboard`)
- GET `/` - Get dashboard data
- GET `/progress/:courseId` - Get course progress
- PUT `/progress/:courseId` - Update progress
- POST `/progress/:courseId/complete-topic` - Mark topic complete
- GET `/stats` - Get learning statistics

### Certificates (`/api/certificates`)
- POST `/generate` - Generate certificate
- GET `/my-certificates` - Get user certificates
- GET `/download/:certificateId` - Download certificate
- POST `/verify` - Verify certificate
- POST `/share/:certificateId` - Share certificate

### Study Hacks (`/api/study-hacks`)
- GET `/` - Get all study hacks
- GET `/categories` - Get categories
- GET `/popular` - Get popular study hacks
- GET `/cheat-sheets` - Get cheat sheets
- GET `/:id` - Get single study hack
- POST `/:id/like` - Like study hack
- POST `/download-cheatsheet/:id` - Download cheat sheet

### Admin (`/api/admin`)
- GET `/dashboard-stats` - Dashboard statistics
- GET `/users` - Get all users
- PUT `/users/:id` - Update user
- DELETE `/users/:id` - Delete user
- PATCH `/users/:id/status` - Update user status
- GET `/courses` - Get all courses (admin)
- POST `/courses` - Create course
- PUT `/courses/:id` - Update course
- DELETE `/courses/:id` - Delete course
- GET `/analytics` - Get analytics
- GET `/settings` - Get system settings
- PUT `/settings` - Update system settings

## Deployment

- **Build**: Builds the frontend using Vite
- **Run**: Starts both backend and frontend servers
- Frontend is served in production mode using Vite preview

## Known Issues & Fixes

1. **Model Import Case Sensitivity**: Fixed `Course` model import (was uppercase, file is lowercase)
2. **Express 5 Wildcard Route**: Removed incompatible `app.use('*')` pattern
3. **Environment Variables**: Switched from `process.env` to `import.meta.env` for Vite
4. **ES6 vs CommonJS**: Converted courseRoutes from ES6 to CommonJS syntax

## User Credentials (Development)

### Admin Account
- Email: xxxx@gmail.com
- Password: xxxxxxxxxx

### Test Student Account
- Email: student@example.com
- Password: password123

 
