const Course = require('../models/Course');
const User = require('../models/User');

// Get all courses with filtering
const getCourses = async (req, res) => {
  try {
    const { search, level, language, page = 1, limit = 10 } = req.query;
    
    let filter = { isPublished: true };
    
    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Level filter
    if (level && level !== 'all') {
      filter.level = level;
    }
    
    // Language filter
    if (language && language !== 'all') {
      filter.language = language;
    }
    
    const courses = await Course.find(filter)
      .populate('instructor', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Course.countDocuments(filter);
    
    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single course
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar bio')
      .populate('lessons');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enroll in course
const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if already enrolled
    const isEnrolled = user.enrolledCourses.some(
      enrolled => enrolled.course.toString() === req.params.id
    );
    
    if (isEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    // Add to enrolled courses
    user.enrolledCourses.push({
      course: req.params.id,
      progress: 0,
      enrolledAt: new Date()
    });
    
    // Update students count
    course.students += 1;
    
    await user.save();
    await course.save();
    
    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create course (for instructors)
const createCourse = async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      instructor: req.user.id
    });
    
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourse,
  enrollCourse,
  createCourse
};


// Get course progress for user
const getCourseProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const courseId = req.params.courseId;

    const progress = user.enrolledCourses.find(
      enrolled => enrolled.course.toString() === courseId
    );

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Course not found in user enrollments'
      });
    }

    res.json({
      success: true,
      data: {
        progress: progress.progress,
        completed: progress.completed,
        completedTopics: progress.completedTopics || [],
        enrolledAt: progress.enrolledAt
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
    const courseId = req.params.courseId;

    const enrolledCourse = user.enrolledCourses.find(
      enrolled => enrolled.course.toString() === courseId
    );

    if (!enrolledCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found in user enrollments'
      });
    }

    // Initialize completedTopics array if it doesn't exist
    if (!enrolledCourse.completedTopics) {
      enrolledCourse.completedTopics = [];
    }

    // Add topic to completed topics if not already there
    if (!enrolledCourse.completedTopics.includes(topicId)) {
      enrolledCourse.completedTopics.push(topicId);
    }

    // Get course to calculate total topics
    const course = await Course.findById(courseId);
    const totalTopics = course.topics ? course.topics.length : 1;
    const completedCount = enrolledCourse.completedTopics.length;
    const newProgress = Math.round((completedCount / totalTopics) * 100);

    enrolledCourse.progress = newProgress;
    enrolledCourse.lastAccessed = new Date();

    // Check if course is completed
    if (newProgress >= 100 && !enrolledCourse.completed) {
      enrolledCourse.completed = true;
      if (!user.completedCourses.includes(courseId)) {
        user.completedCourses.push(courseId);
      }

      // Generate certificate automatically
      try {
        const existingCertificate = await Certificate.findOne({
          student: req.user.id,
          course: courseId
        });

        if (!existingCertificate) {
          await Certificate.create({
            student: req.user.id,
            course: courseId,
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
      message: 'Topic marked as completed',
      data: {
        progress: newProgress,
        completedTopics: enrolledCourse.completedTopics,
        totalTopics,
        completed: enrolledCourse.completed
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};