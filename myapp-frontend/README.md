# Ravi Ram Education Platform

A comprehensive W3Schools-style learning platform for programming education, built with the MERN stack.

## 🚀 Features

### Frontend Features
- **W3Schools-style Interface**: Clean, intuitive design with sidebar navigation
- **Interactive Code Playground**: Write, edit, and run code directly in the browser
- **Progress Tracking**: Visual progress bars and completion tracking
- **Certificate Generation**: PDF certificates for course completion
- **Responsive Design**: Mobile-first design with dark mode support
- **Real-time Chatbot**: AI-powered assistant for student support
- **Study Resources**: Blog-style articles, tips, and downloadable cheat sheets

### Backend Features
- **RESTful API**: Complete Express.js backend with MongoDB
- **JWT Authentication**: Secure user authentication and authorization
- **Role-based Access**: Student and admin roles with different permissions
- **Course Management**: CRUD operations for courses and content
- **Progress Tracking**: Database-driven progress and completion tracking
- **Admin Dashboard**: Comprehensive analytics and user management

### Security Features
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Server-side validation with express-validator
- **CORS Protection**: Configured for secure cross-origin requests
- **Helmet.js**: Security headers and protection

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **helmet** for security headers
- **cors** for cross-origin requests

## 📁 Project Structure

```
ravi-ram-education/
├── src/                    # Frontend source code
│   ├── components/ # Reusable React components
                  1.chatbot.tsx
                  2.codeplayground
                  3.footer.tsx
                  4.navbar.tsx
│   ├── pages/             # Page components
                  1.about.tsx
                  2.admindashboard.tsx
                  3.certificates.tsx
│   ├── contexts/          # React contexts
                  1.authcontext.tsx
│   ├── hooks/             # Custom hooks
│   ├── services/          # API service functions
│   └── types/             # TypeScript type definitions
├── server/                # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # Express routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Main server file
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ravi-ram-education
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Environment Setup**
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ravi-ram-education
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

5. **Start the development servers**
   
   **Option 1: Run both servers simultaneously**
   ```bash
   npm run dev:full
   ```
   
   **Option 2: Run servers separately**
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   npm run dev:server
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Course Endpoints
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses/:id/enroll` - Enroll in course
- `POST /api/courses/:courseId/topics/:topicId/complete` - Mark topic complete

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/progress/:courseId` - Get course progress

### Admin Endpoints
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `POST /api/admin/courses` - Create new course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course

### Chatbot Endpoints
- `POST /api/chatbot/chat` - Send message to chatbot
- `GET /api/chatbot/faq` - Get FAQ data

### Certificate Endpoints
- `POST /api/certificates/generate/:courseId` - Generate certificate
- `GET /api/certificates/my-certificates` - Get user certificates

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Teal (#14B8A6)
- **Accent**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Inter font family, various weights
- **Body**: Inter font family, regular weight
- **Code**: Monospace font family

### Spacing
- **Base unit**: 8px
- **Consistent spacing**: 8px, 16px, 24px, 32px, 48px, 64px

## 🔐 Authentication

### Demo Credentials
- **Admin**: admin@raviram.com / admin123
- **Student**: Any email / Any password (for demo purposes)

### JWT Implementation
- Tokens expire in 7 days
- Automatic token refresh on API calls
- Secure storage in localStorage
- Automatic logout on token expiration

## 📱 Responsive Design

The platform is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

Complete dark mode implementation with:
- System preference detection
- Manual toggle option
- Persistent user preference
- Smooth transitions

## 🤖 Chatbot Features

- **Natural Language Processing**: Keyword-based response system
- **FAQ Integration**: Pre-built responses for common questions
- **Course Recommendations**: Intelligent course suggestions
- **Real-time Responses**: Simulated typing indicators
- **Persistent Chat History**: Maintains conversation context

## 📊 Admin Dashboard

### Analytics
- User registration trends
- Course enrollment statistics
- Completion rates
- Popular courses tracking

### Management Tools
- User management (view, edit, deactivate)
- Course creation and editing
- Content management
- Certificate tracking

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

### Backend (Render/Heroku)
1. Push to Git repository
2. Connect to deployment platform
3. Configure environment variables
4. Deploy with automatic builds

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Configure network access
3. Update connection string in environment variables

## 🔧 Development

### Code Style
- ESLint configuration for code quality
- Prettier for code formatting
- TypeScript for type safety
- Consistent naming conventions

### Testing
- Unit tests with Jest (to be implemented)
- Integration tests for API endpoints
- E2E tests with Cypress (to be implemented)

### Performance
- Code splitting with React.lazy
- Image optimization
- Bundle size optimization
- API response caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Ravi Ram** - Programming Educator
- YouTube: [@raviram](https://youtube.com/@raviram)
- Instagram: [@raviram.edu](https://instagram.com/raviram.edu)
- LinkedIn: [raviram](https://linkedin.com/in/raviram)
- Email: hello@raviram.com

## 🙏 Acknowledgments

- Inspired by W3Schools' clean and intuitive design
- Built with modern web technologies
- Designed for aspiring programmers worldwide

---

Made with ❤️ for aspiring programmers