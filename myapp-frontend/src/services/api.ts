import axios from 'axios';

// Types for API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  joinDate: string;
  status: 'Active' | 'Inactive';
  profilePicture?: string;
}

export interface ApiError extends Error {
  status?: number;
}

// Create axios instance with base configuration
const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Test backend connection
export const testBackend = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get('/api/health');
    return response.data;
  } catch (error) {
    console.error('Backend connection test failed:', error);
    throw error;
  }
};

// Auth API methods
export const authAPI = {
  // Email login
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: UserProfile }>> => {
    try {
      const response = await API.post('/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Login failed. Please check your credentials.'
      );
    }
  },

  // Google OAuth login
  googleLogin: async (googleToken: string): Promise<ApiResponse<{ token: string; user: UserProfile }>> => {
    try {
      const response = await API.post('/auth/google', { token: googleToken });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Google Sign In failed. Please try again.'
      );
    }
  },

  // Register new user
  register: async (userData: RegisterData): Promise<ApiResponse<{ token: string; user: UserProfile }>> => {
    try {
      const response = await API.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Registration failed. Please try again.'
      );
    }
  },

  // Get current user profile
  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    try {
      const response = await API.get('/auth/profile');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch user profile.'
      );
    }
  },

  // Get current user (alias for getProfile)
  getCurrentUser: async (): Promise<ApiResponse<UserProfile>> => {
    return authAPI.getProfile();
  },

  // Logout
  logout: async (): Promise<ApiResponse> => {
    try {
      const response = await API.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Logout failed.'
      );
    }
  }
};

// Course API methods
export const courseAPI = {
  // Get all courses with filters
  getCourses: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await API.get(`/courses?${params}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch courses.'
      );
    }
  },

  // Get single course
  getCourse: async (courseId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await API.get(`/courses/${courseId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch course details.'
      );
    }
  },

  // Enroll in course
  enrollCourse: async (courseId: string): Promise<ApiResponse> => {
    try {
      const response = await API.post(`/courses/${courseId}/enroll`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to enroll in course.'
      );
    }
  },

  // Get user's enrolled courses
  getEnrolledCourses: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await API.get('/courses/enrolled');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch enrolled courses.'
      );
    }
  }
};

// Dashboard API methods
export const dashboardAPI = {
  // Get dashboard data
  getDashboard: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await API.get('/dashboard');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch dashboard data.'
      );
    }
  },

  // Get course progress
  getCourseProgress: async (courseId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await API.get(`/dashboard/progress/${courseId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch course progress.'
      );
    }
  },

  // Update course progress
  updateProgress: async (courseId: string, progress: number, topicId: string | null = null): Promise<ApiResponse> => {
    try {
      const response = await API.put(`/dashboard/progress/${courseId}`, {
        progress,
        topicId
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to update progress.'
      );
    }
  },

  // Mark topic as completed
  completeTopic: async (courseId: string, topicId: string): Promise<ApiResponse> => {
    try {
      const response = await API.post(`/dashboard/progress/${courseId}/complete-topic`, {
        topicId
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to mark topic as completed.'
      );
    }
  },

  // Get learning statistics
  getLearningStats: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await API.get('/dashboard/stats');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch learning stats.'
      );
    }
  }
};

// Certificate API methods
export const certificateAPI = {
  // Generate certificate
  generateCertificate: async (courseId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await API.post('/certificates/generate', { courseId });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to generate certificate.'
      );
    }
  },

  // Get user certificates
  getUserCertificates: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await API.get('/certificates/my-certificates');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch certificates.'
      );
    }
  },

  // Download certificate
  downloadCertificate: async (certificateId: string): Promise<Blob> => {
    try {
      const response = await API.get(`/certificates/download/${certificateId}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to download certificate.'
      );
    }
  },

  // Verify certificate
  verifyCertificate: async (certificateId: string, verificationCode: string): Promise<ApiResponse> => {
    try {
      const response = await API.post('/certificates/verify', {
        certificateId,
        verificationCode,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Certificate verification failed.'
      );
    }
  },

  // Share certificate
  shareCertificate: async (certificateId: string): Promise<ApiResponse> => {
    try {
      const response = await API.post(`/certificates/share/${certificateId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to share certificate.'
      );
    }
  }
};

// Admin API methods
export const adminAPI = {
  // Dashboard stats
  getDashboardStats: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await API.get('/admin/dashboard-stats');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch dashboard stats.'
      );
    }
  },

  // User management
  getUsers: async (filters: any = {}): Promise<ApiResponse<UserProfile[]>> => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await API.get(`/admin/users?${params}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch users.'
      );
    }
  },

  updateUser: async (userId: string, userData: Partial<UserProfile>): Promise<ApiResponse> => {
    try {
      const response = await API.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to update user.'
      );
    }
  },

  deleteUser: async (userId: string): Promise<ApiResponse> => {
    try {
      const response = await API.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to delete user.'
      );
    }
  },

  updateUserStatus: async (userId: string, status: 'Active' | 'Inactive'): Promise<ApiResponse> => {
    try {
      const response = await API.patch(`/admin/users/${userId}/status`, { status });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to update user status.'
      );
    }
  },

  // Course management
  getCourses: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await API.get(`/admin/courses?${params}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch courses.'
      );
    }
  },

  createCourse: async (courseData: any): Promise<ApiResponse> => {
    try {
      const response = await API.post('/admin/courses', courseData);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to create course.'
      );
    }
  },

  updateCourse: async (courseId: string, courseData: any): Promise<ApiResponse> => {
    try {
      const response = await API.put(`/admin/courses/${courseId}`, courseData);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to update course.'
      );
    }
  },

  deleteCourse: async (courseId: string): Promise<ApiResponse> => {
    try {
      const response = await API.delete(`/admin/courses/${courseId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to delete course.'
      );
    }
  },

  // Analytics
  getAnalytics: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await API.get('/admin/analytics');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch analytics.'
      );
    }
  },

  // Certificates
  getCertificates: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await API.get(`/admin/certificates?${params}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch certificates.'
      );
    }
  },

  // Settings
  getSettings: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await API.get('/admin/settings');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch settings.'
      );
    }
  },

  updateSettings: async (settings: any): Promise<ApiResponse> => {
    try {
      const response = await API.put('/admin/settings', settings);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to update settings.'
      );
    }
  }
};

// Study Hacks API methods
export const studyHacksAPI = {
  // Get all study hacks
  getStudyHacks: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await API.get(`/study-hacks?${params}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch study hacks.'
      );
    }
  },

  // Get single study hack
  getStudyHack: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await API.get(`/study-hacks/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch study hack.'
      );
    }
  },

  // Get categories
  getCategories: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await API.get('/study-hacks/categories');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch categories.'
      );
    }
  },

  // Get popular study hacks
  getPopularStudyHacks: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await API.get('/study-hacks/popular');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch popular study hacks.'
      );
    }
  },

  // Get cheat sheets
  getCheatSheets: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await API.get(`/study-hacks/cheat-sheets?${params}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch cheat sheets.'
      );
    }
  },

  // Download cheat sheet
  downloadCheatSheet: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await API.post(`/study-hacks/download-cheatsheet/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to download cheat sheet.'
      );
    }
  },

  // Like study hack
  likeStudyHack: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await API.post(`/study-hacks/${id}/like`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to like study hack.'
      );
    }
  }
};

// Course progress methods
export const courseProgressAPI = {
  // Get course progress
  getCourseProgress: async (courseId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await API.get(`/courses/${courseId}/progress`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to fetch course progress.'
      );
    }
  },

  // Mark topic as completed
  completeTopic: async (courseId: string, topicId: string): Promise<ApiResponse> => {
    try {
      const response = await API.post(`/courses/${courseId}/complete-topic`, { topicId });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to mark topic as completed.'
      );
    }
  },

  // Update course progress
  updateProgress: async (courseId: string, progress: number, topicId: string | null = null): Promise<ApiResponse> => {
    try {
      const response = await API.put(`/courses/${courseId}/progress`, {
        progress,
        topicId
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Failed to update progress.'
      );
    }
  }
};

export default API;