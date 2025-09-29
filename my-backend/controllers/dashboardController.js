const User = require('../models/User');
const Course = require('../models/Course');
const Certificate = require('../models/Certificate');

// Get user dashboard data
const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('enrolledCourses.course', 'title image language level duration instructor')
      .populate('completedCourses', 'title image language level');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate dashboard statistics
    const enrolledCourses = user.enrolledCourses.length;
    const completedCourses = user.completedCourses.length;
    const inProgressCourses = enrolledCourses - completedCourses;

    // Calculate overall progress
    const totalProgress = user.enrolledCourses.reduce(
      (acc, curr) => acc + curr.progress, 0
    );
    const averageProgress = enrolledCourses > 0 ? Math.round(totalProgress / enrolledCourses) : 0;

    // Get recent certificates
    const recentCertificates = await Certificate.find({ student: req.user.id })
      .populate('course', 'title image')
      .sort({ issueDate: -1 })
      .limit(3);

    // Get course progress details
    const courseProgress = user.enrolledCourses.map(enrolled => ({
      id: enrolled.course._id,
      title: enrolled.course.title,
      progress: enrolled.progress,
      totalTopics: enrolled.course.duration ? parseInt(enrolled.course.duration) * 4 : 20, // Estimate topics
      completedTopics: Math.round((enrolled.progress / 100) * (enrolled.course.duration ? parseInt(enrolled.course.duration) * 4 : 20)),
      lastAccessed: enrolled.lastAccessed || enrolled.enrolledAt,
      color: getCourseColor(enrolled.course.language),
      isCompleted: enrolled.completed
    }));

    // Recent activity (last 5 enrolled courses)
    const recentCourses = user.enrolledCourses
      .sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt))
      .slice(0, 5)
      .map(enrolled => ({
        course: enrolled.course,
        enrolledAt: enrolled.enrolledAt,
        progress: enrolled.progress
      }));

    res.json({
      success: true,
      data: {
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          joinDate: user.createdAt
        },
        stats: {
          enrolledCourses,
          completedCourses,
          inProgressCourses,
          averageProgress,
          certificatesEarned: recentCertificates.length
        },
        courseProgress,
        recentCourses,
        recentCertificates,
        enrolledCourses: user.enrolledCourses
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function to get course color based on language
const getCourseColor = (language) => {
  const colorMap = {
    'Python': 'from-blue-500 to-blue-600',
    'Java': 'from-teal-500 to-teal-600',
    'C': 'from-purple-500 to-purple-600',
    'JavaScript': 'from-orange-500 to-orange-600',
    'C++': 'from-indigo-500 to-indigo-600',
    'Multiple': 'from-green-500 to-green-600'
  };
  return colorMap[language] || 'from-gray-500 to-gray-600';
};

// Get course progress
const getCourseProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const enrolledCourse = user.enrolledCourses.find(
      course => course.course.toString() === req.params.courseId
    );

    if (!enrolledCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found in enrolled courses'
      });
    }

    await enrolledCourse.populate('course', 'title language level duration instructor');

    res.json({
      success: true,
      data: {
        progress: enrolledCourse.progress,
        completed: enrolledCourse.completed,
        enrolledAt: enrolledCourse.enrolledAt,
        lastAccessed: enrolledCourse.lastAccessed,
        course: enrolledCourse.course
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update course progress
const updateProgress = async (req, res) => {
  try {
    const { progress, topicId, completed } = req.body;
    const user = await User.findById(req.user.id);

    const enrolledCourseIndex = user.enrolledCourses.findIndex(
      course => course.course.toString() === req.params.courseId
    );

    if (enrolledCourseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Course not found in enrolled courses'
      });
    }

    // Update progress
    user.enrolledCourses[enrolledCourseIndex].progress = Math.min(progress, 100);
    user.enrolledCourses[enrolledCourseIndex].lastAccessed = new Date();

    // If progress is 100%, mark as completed
    if (progress >= 100 && !user.enrolledCourses[enrolledCourseIndex].completed) {
      user.enrolledCourses[enrolledCourseIndex].completed = true;
      
      // Add to completed courses if not already there
      if (!user.completedCourses.includes(req.params.courseId)) {
        user.completedCourses.push(req.params.courseId);
      }

      // Generate certificate automatically
      try {
        const Certificate = require('../models/Certificate');
        const existingCertificate = await Certificate.findOne({
          student: req.user.id,
          course: req.params.courseId
        });

        if (!existingCertificate) {
          await Certificate.create({
            student: req.user.id,
            course: req.params.courseId,
            completionDate: new Date()
          });
        }
      } catch (certError) {
        console.error('Certificate generation failed:', certError);
        // Don't fail the progress update if certificate generation fails
      }
    }

    await user.save();

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        progress: user.enrolledCourses[enrolledCourseIndex].progress,
        completed: user.enrolledCourses[enrolledCourseIndex].completed
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mark topic as completed
const completeTopic = async (req, res) => {
  try {
    const { topicId } = req.body;
    const user = await User.findById(req.user.id);

    const enrolledCourseIndex = user.enrolledCourses.findIndex(
      course => course.course.toString() === req.params.courseId
    );

    if (enrolledCourseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Course not found in enrolled courses'
      });
    }

    // Add topic to completed topics if not already there
    if (!user.enrolledCourses[enrolledCourseIndex].completedTopics) {
      user.enrolledCourses[enrolledCourseIndex].completedTopics = [];
    }

    if (!user.enrolledCourses[enrolledCourseIndex].completedTopics.includes(topicId)) {
      user.enrolledCourses[enrolledCourseIndex].completedTopics.push(topicId);
    }

    // Calculate new progress based on completed topics
    const course = await Course.findById(req.params.courseId);
    const totalTopics = course.lessons ? course.lessons.length : 10; // Default to 10 if not specified
    const completedTopics = user.enrolledCourses[enrolledCourseIndex].completedTopics.length;
    const newProgress = Math.round((completedTopics / totalTopics) * 100);

    user.enrolledCourses[enrolledCourseIndex].progress = newProgress;
    user.enrolledCourses[enrolledCourseIndex].lastAccessed = new Date();

    // Check if course is completed
    if (newProgress >= 100 && !user.enrolledCourses[enrolledCourseIndex].completed) {
      user.enrolledCourses[enrolledCourseIndex].completed = true;
      if (!user.completedCourses.includes(req.params.courseId)) {
        user.completedCourses.push(req.params.courseId);
      }
    }

    await user.save();

    res.json({
      success: true,
      message: 'Topic marked as completed',
      data: {
        progress: newProgress,
        completedTopics: user.enrolledCourses[enrolledCourseIndex].completedTopics.length,
        totalTopics,
        completed: user.enrolledCourses[enrolledCourseIndex].completed
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get learning statistics
const getLearningStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Calculate weekly progress
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentProgress = user.enrolledCourses.filter(
      course => new Date(course.lastAccessed) >= oneWeekAgo
    ).length;

    // Calculate total learning time (estimated)
    const totalLearningTime = user.enrolledCourses.reduce((total, course) => {
      return total + (course.progress * 0.5); // Estimate 0.5 hours per percentage point
    }, 0);

    // Get most progressed course
    const mostProgressedCourse = user.enrolledCourses.reduce((max, course) => {
      return course.progress > max.progress ? course : max;
    }, { progress: 0 });

    await mostProgressedCourse.populate('course', 'title');

    res.json({
      success: true,
      data: {
        weeklyActivity: recentProgress,
        totalLearningTime: Math.round(totalLearningTime),
        mostProgressedCourse: mostProgressedCourse.course ? {
          title: mostProgressedCourse.course.title,
          progress: mostProgressedCourse.progress
        } : null,
        streak: calculateStreak(user.enrolledCourses)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function to calculate learning streak
const calculateStreak = (enrolledCourses) => {
  // Simple streak calculation based on recent activity
  const today = new Date();
  let streak = 0;

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const hasActivity = enrolledCourses.some(course => {
      const lastAccessed = new Date(course.lastAccessed);
      return lastAccessed.toDateString() === date.toDateString();
    });

    if (hasActivity) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  return streak;
};

module.exports = {
  getDashboard,
  getCourseProgress,
  updateProgress,
  completeTopic,
  getLearningStats
};