const User = require('../models/User');
const Course = require('../models/course');
const Certificate = require('../models/Certificate');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments();
    
    // Get active users (users with activity in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsers = await User.countDocuments({
      updatedAt: { $gte: thirtyDaysAgo }
    });

    // Get total courses count
    const totalCourses = await Course.countDocuments({ isPublished: true });
    
    // Get total certificates count
    const totalCertificates = await Certificate.countDocuments();
    
    // Get completion rate (average progress of all enrolled courses)
    const usersWithProgress = await User.aggregate([
      { $unwind: '$enrolledCourses' },
      {
        $group: {
          _id: null,
          avgProgress: { $avg: '$enrolledCourses.progress' },
          totalEnrollments: { $sum: 1 }
        }
      }
    ]);

    const completionRate = usersWithProgress.length > 0 
      ? Math.round(usersWithProgress[0].avgProgress) 
      : 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalCourses,
        totalCertificates,
        monthlyRevenue: 0, // Free platform
        activeUsers,
        completionRate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get users with pagination and filtering
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    
    let filter = {};
    
    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Status filter (you might want to implement user status logic)
    if (status) {
      filter.status = status;
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: {
        users,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('enrolledCourses.course', 'title image language level')
      .populate('completedCourses', 'title image');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get courses for admin (including drafts)
const getCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = '' } = req.query;
    
    let filter = {};
    
    // Status filter
    if (status === 'published') {
      filter.isPublished = true;
    } else if (status === 'draft') {
      filter.isPublished = false;
    }

    const courses = await Course.find(filter)
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Course.countDocuments(filter);

    // Calculate completion rates
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const enrolledUsers = await User.countDocuments({
          'enrolledCourses.course': course._id
        });
        
        const completedUsers = await User.countDocuments({
          'completedCourses': course._id
        });
        
        const completionRate = enrolledUsers > 0 
          ? Math.round((completedUsers / enrolledUsers) * 100)
          : 0;

        return {
          ...course.toObject(),
          enrolledStudents: enrolledUsers,
          completionRate
        };
      })
    );

    res.json({
      success: true,
      data: {
        courses: coursesWithStats,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create course
const createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      instructor: req.user.id
    };

    const course = await Course.create(courseData);
    
    await course.populate('instructor', 'name email');

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('instructor', 'name email');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Remove course from user enrollments
    await User.updateMany(
      { 'enrolledCourses.course': req.params.id },
      { $pull: { enrolledCourses: { course: req.params.id } } }
    );

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get certificates
const getCertificates = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const certificates = await Certificate.find()
      .populate('student', 'name email')
      .populate('course', 'title language level')
      .sort({ issueDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Certificate.countDocuments();

    res.json({
      success: true,
      data: {
        certificates,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get analytics data
const getAnalytics = async (req, res) => {
  try {
    // User growth over time
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Course enrollment statistics
    const courseStats = await Course.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'enrolledCourses.course',
          as: 'enrollments'
        }
      },
      {
        $project: {
          title: 1,
          enrollmentCount: { $size: '$enrollments' },
          language: 1,
          level: 1
        }
      },
      { $sort: { enrollmentCount: -1 } }
    ]);

    // Completion rates by course
    const completionRates = await User.aggregate([
      { $unwind: '$enrolledCourses' },
      {
        $group: {
          _id: '$enrolledCourses.course',
          avgProgress: { $avg: '$enrolledCourses.progress' },
          totalEnrolled: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'course'
        }
      },
      { $unwind: '$course' },
      {
        $project: {
          courseTitle: '$course.title',
          avgProgress: { $round: ['$avgProgress', 2] },
          totalEnrolled: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        userGrowth,
        courseStats,
        completionRates
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get system settings
const getSystemSettings = async (req, res) => {
  try {
    // In a real app, you'd fetch from a Settings model
    const settings = {
      platformName: 'Programming LMS',
      platformDescription: 'Learn programming with interactive courses',
      allowRegistrations: true,
      maintenanceMode: false,
      maxFileSize: 10, // MB
      supportedLanguages: ['Python', 'Java', 'C', 'JavaScript', 'C++'],
      contactEmail: 'admin@programminglms.com'
    };

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update system settings
const updateSystemSettings = async (req, res) => {
  try {
    // In a real app, you'd update a Settings model
    const updatedSettings = req.body;

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedSettings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCertificates,
  getAnalytics,
  getSystemSettings,
  updateSystemSettings
};