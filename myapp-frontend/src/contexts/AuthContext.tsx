import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { authAPI, courseAPI, dashboardAPI } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  enrolledCourses: string[];
  completedCourses: string[];
  progress: { [courseId: string]: string[] };
  mobile?: string;
  avatar?: string;
  joinDate?: string;
  status?: 'Active' | 'Inactive';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  googleLogin: (accessToken: string) => Promise<boolean>;
  logout: () => void;
  enrollInCourse: (courseId: string, courseName: string) => Promise<boolean>;
  markTopicComplete: (courseId: string, topicId: string) => Promise<boolean>;
  isTopicComplete: (courseId: string, topicId: string) => boolean;
  isLoading: boolean;
  loading: boolean;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app start
  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        // Verify token with backend
        try {
          const response = await authAPI.getCurrentUser();
          if (response.success) {
            setUser(response.data);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else if (savedUser) {
        // Fallback: use saved user data without token
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Regular email/password login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Try backend API first
      try {
        const response = await authAPI.login(email, password);
        const { token, user: userData } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        toast.success(`Welcome back, ${userData.name}!`);
        return true;
      } catch (apiError) {
        console.log('API login failed, falling back to local auth');
      }

      // Fallback: Special admin logins
      const adminLogins = [
        { 
          email: 'raviramrajaboina@gmail.com', 
          password: 'ravi+shiva=143', 
          name: 'Ravi Ram',
          mobile: '+91 8688252878',
          role: 'admin' as const
        },
        { 
          email: 'admin@raviram.com', 
          password: 'admin123', 
          name: 'Ravi Ram Admin',
          mobile: '+91 8688252878',
          role: 'admin' as const
        }
      ];

      const admin = adminLogins.find(a => a.email === email && a.password === password);
      
      if (admin) {
        const adminUser: User = {
          id: 'admin-raviram',
          name: admin.name,
          email: admin.email,
          role: admin.role,
          enrolledCourses: [],
          completedCourses: [],
          progress: {},
          mobile: admin.mobile,
          joinDate: new Date().toISOString(),
          status: 'Active'
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        toast.success(`Welcome Admin ${admin.name}!`);
        return true;
      }

      // Fallback: Regular students
      if (email && password) {
        const studentUser: User = {
          id: `student-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: 'student',
          enrolledCourses: [],
          completedCourses: [],
          progress: {},
          joinDate: new Date().toISOString(),
          status: 'Active'
        };
        setUser(studentUser);
        localStorage.setItem('user', JSON.stringify(studentUser));
        toast.success('Welcome to Ravi Ram Education!');
        return true;
      }
      
      toast.error('Login failed. Please check credentials.');
      return false;
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please check credentials.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Login
  const googleLogin = async (accessToken: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Try backend Google OAuth first
      try {
        const response = await authAPI.googleLogin(accessToken);
        const { token, user: userData } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        toast.success(`Welcome, ${userData.name}!`);
        return true;
      } catch (apiError) {
        console.log('Google OAuth API failed, falling back to local auth');
      }

      // Fallback: Local Google OAuth simulation
      const demoUser: User = {
        id: `google-user-${Date.now()}`,
        name: 'Google User',
        email: 'google.user@example.com',
        role: 'student',
        enrolledCourses: [],
        completedCourses: [],
        progress: {},
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        joinDate: new Date().toISOString(),
        status: 'Active'
      };

      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      toast.success('Welcome to Ravi Ram Education!');
      return true;

    } catch (error: any) {
      toast.error(error.message || 'Google login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Try backend logout if token exists
      const token = localStorage.getItem('token');
      if (token) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    }
  };

  const enrollInCourse = async (courseId: string, courseName: string): Promise<boolean> => {
    if (!user) {
      toast.error('Please login to enroll in courses');
      return false;
    }

    if (user.enrolledCourses.includes(courseId)) {
      toast.success('You are already enrolled in this course!');
      return true;
    }

    try {
      // Try backend enrollment first
      let success = false;
      
      try {
        const response = await courseAPI.enrollCourse(courseId);
        if (response.success) {
          success = true;
        }
      } catch (apiError) {
        console.log('API enrollment failed, using local enrollment');
      }

      // Update local state regardless of API success
      const updatedUser: User = {
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId],
        progress: { 
          ...user.progress, 
          [courseId]: [] 
        }
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      if (success) {
        toast.success(`Successfully enrolled in ${courseName}!`);
      } else {
        toast.success(`You've started ${courseName}! (Offline)`);
      }
      
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Enrollment failed. Please try again.');
      return false;
    }
  };

  const markTopicComplete = async (courseId: string, topicId: string): Promise<boolean> => {
    if (!user) {
      toast.error('Please login to track progress');
      return false;
    }

    const currentProgress = user.progress[courseId] || [];
    if (currentProgress.includes(topicId)) {
      return true; // Already completed
    }

    try {
      // Try backend update first
      let success = false;
      
      try {
        const totalTopics = getCourseTotalTopics(courseId);
        const newProgress = [...currentProgress, topicId];
        const progressPercentage = (newProgress.length / totalTopics) * 100;

        const response = await dashboardAPI.updateProgress(courseId, progressPercentage, topicId);
        if (response.success) {
          success = true;
        }
      } catch (apiError) {
        console.log('API progress update failed, using local update');
      }

      // Update local state
      const updatedProgress = {
        ...user.progress,
        [courseId]: [...currentProgress, topicId]
      };
      
      const updatedUser: User = { 
        ...user, 
        progress: updatedProgress 
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      if (success) {
        toast.success('Topic completed! Progress saved.');
      } else {
        toast.success('Topic completed! (Progress saved locally)');
      }
      
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to mark topic as complete.');
      return false;
    }
  };

  const isTopicComplete = (courseId: string, topicId: string): boolean => {
    return user?.progress[courseId]?.includes(topicId) || false;
  };

  const getCourseTotalTopics = (courseId: string): number => {
    const courseTopics: { [key: string]: number } = {
      'python-basics': 35,
      'java-programming': 65,
      'c-programming': 12,
      'cpp-programming': 65,
      'web-development': 45,
      'data-science': 50,
      'machine-learning': 40
    };
    return courseTopics[courseId] || 10; // Default to 10 if unknown
  };

  // Helper function to check admin access
  const checkAdminAccess = (): boolean => {
    return user?.role === 'admin';
  };

  const value: AuthContextType = {
    user,
    login,
    googleLogin,
    logout,
    enrollInCourse,
    markTopicComplete,
    isTopicComplete,
    isLoading,
    loading,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export helper function
export const isAdmin = (): boolean => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'admin';
};