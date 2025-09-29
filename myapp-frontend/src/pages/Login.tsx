import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Star, BookOpen } from 'lucide-react';
import { authAPI, testBackend } from '../services/api';

// Google OAuth type definitions
interface GoogleCredentialResponse {
  credential: string;
  clientId: string;
  select_by: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Initialize Google OAuth
  useEffect(() => {
    const initializeGoogleOAuth = () => {
      if (window.google && process.env.REACT_APP_GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Render Google Sign In Button
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left',
          }
        );

        // Optional: Also show the One Tap prompt
        // window.google.accounts.id.prompt();
      }
    };

    // Load Google OAuth script
    const loadGoogleScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleOAuth;
        document.head.appendChild(script);
      } else {
        initializeGoogleOAuth();
      }
    };

    loadGoogleScript();

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleGoogleSignIn = async (response: GoogleCredentialResponse) => {
    setGoogleLoading(true);
    setError('');

    try {
      console.log('🔄 Processing Google Sign In...');
      
      // Test backend connection first
      await testBackend();

      // Send Google token to your backend
      const authResponse = await authAPI.googleLogin(response.credential);
      
      if (authResponse.success) {
        console.log('✅ Google Sign In successful:', authResponse.message);
        
        // Save token and user data to localStorage
        localStorage.setItem('token', authResponse.data.token);
        localStorage.setItem('user', JSON.stringify(authResponse.data));
        
        // Show success message
        alert(authResponse.message || 'Google Sign In successful!');
        
        // Redirect based on role
        if (authResponse.data.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('❌ Google Sign In failed:', error);
      setError(error.message || 'Google Sign In failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Test backend connection first
      console.log('🔄 Testing backend connection...');
      await testBackend();

      // Login user
      console.log('🔄 Logging in...');
      const response = await authAPI.login(formData.email, formData.password);
      
      if (response.success) {
        console.log('✅ Login successful:', response.message);
        
        // Save token and user data to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // Show success message
        alert(response.message || 'Login successful!');
        
        // Redirect based on role
        if (response.data.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
  };

  const switchToRegister = () => {
    navigate('/register');
  };

  // Pre-fill admin credentials for testing
  const fillAdminCredentials = () => {
    setFormData({
      email: 'raviramrajaboina@gmail.com',
      password: 'ravi+shiva=143'
    });
  };

  // Pre-fill student credentials for testing
  const fillStudentCredentials = () => {
    setFormData({
      email: 'student@example.com',
      password: 'password123'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to continue your programming journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Quick Test Buttons - Only in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 space-y-3">
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="w-full text-sm py-2 px-3 bg-purple-100 text-purple-700 rounded-lg border border-purple-300 hover:bg-purple-200 transition-colors duration-200"
              >
                🛡️ Fill Admin Credentials
              </button>
              <button
                type="button"
                onClick={fillStudentCredentials}
                className="w-full text-sm py-2 px-3 bg-blue-100 text-blue-700 rounded-lg border border-blue-300 hover:bg-blue-200 transition-colors duration-200"
              >
                👨‍🎓 Fill Student Credentials
              </button>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <div className="space-y-4">
            <div id="googleSignInButton" className="w-full"></div>
            
            {googleLoading && (
              <div className="text-center">
                <div className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Processing Google Sign In...
                </div>
              </div>
            )}
          </div>

          {/* Register Link */}
          <div className="text-center pt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button 
                onClick={switchToRegister}
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>

        {/* Role Information */}
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current mx-0.5" />
              ))}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Join Thousands of Successful Students
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Master programming with Ravi Ram's proven teaching methods
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              <strong>Admin Demo:</strong> raviramrajaboina@gmail.com | <strong>Password:</strong> ravi+shiva=143
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;