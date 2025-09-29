const StudyHack = require('../models/StudyHack');
const CheatSheet = require('../models/CheatSheet');
const User = require('../models/User');

// Get all study hacks with filtering and search
const getStudyHacks = async (req, res) => {
  try {
    const { 
      search = '', 
      category = 'All', 
      page = 1, 
      limit = 9,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    let filter = { isPublished: true };
    
    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Category filter
    if (category && category !== 'All') {
      filter.category = category;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const studyHacks = await StudyHack.find(filter)
      .populate('author', 'name avatar')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content'); // Don't send full content in list

    const total = await StudyHack.countDocuments(filter);

    // Get featured tips for the dashboard
    const featuredTips = [
      {
        icon: 'Brain',
        title: "Active Learning",
        description: "Engage with the material through coding practice and projects",
        color: "text-blue-600 dark:text-blue-400"
      },
      {
        icon: 'Target',
        title: "Set Clear Goals",
        description: "Break down complex topics into manageable learning objectives",
        color: "text-green-600 dark:text-green-400"
      },
      {
        icon: 'TrendingUp',
        title: "Track Progress",
        description: "Monitor your learning journey and celebrate small wins",
        color: "text-purple-600 dark:text-purple-400"
      },
      {
        icon: 'Clock',
        title: "Time Boxing",
        description: "Use focused study sessions with regular breaks",
        color: "text-orange-600 dark:text-orange-400"
      }
    ];

    res.json({
      success: true,
      data: {
        studyHacks,
        featuredTips,
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

// Get single study hack
const getStudyHack = async (req, res) => {
  try {
    const studyHack = await StudyHack.findById(req.params.id)
      .populate('author', 'name avatar bio');

    if (!studyHack) {
      return res.status(404).json({
        success: false,
        message: 'Study hack not found'
      });
    }

    // Increment view count
    studyHack.views += 1;
    await studyHack.save();

    // Get related study hacks
    const relatedHacks = await StudyHack.find({
      _id: { $ne: studyHack._id },
      tags: { $in: studyHack.tags },
      isPublished: true
    })
    .populate('author', 'name avatar')
    .limit(3)
    .select('-content');

    res.json({
      success: true,
      data: {
        studyHack,
        relatedHacks
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create study hack (for admins/instructors)
const createStudyHack = async (req, res) => {
  try {
    const studyHackData = {
      ...req.body,
      author: req.user.id
    };

    const studyHack = await StudyHack.create(studyHackData);
    await studyHack.populate('author', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Study hack created successfully',
      data: studyHack
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update study hack
const updateStudyHack = async (req, res) => {
  try {
    const studyHack = await StudyHack.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name avatar');

    if (!studyHack) {
      return res.status(404).json({
        success: false,
        message: 'Study hack not found'
      });
    }

    res.json({
      success: true,
      message: 'Study hack updated successfully',
      data: studyHack
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Like a study hack
const likeStudyHack = async (req, res) => {
  try {
    const studyHack = await StudyHack.findById(req.params.id);

    if (!studyHack) {
      return res.status(404).json({
        success: false,
        message: 'Study hack not found'
      });
    }

    studyHack.likes += 1;
    await studyHack.save();

    res.json({
      success: true,
      message: 'Study hack liked successfully',
      data: {
        likes: studyHack.likes
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get cheat sheets
const getCheatSheets = async (req, res) => {
  try {
    const { category = '', search = '' } = req.query;

    let filter = {};

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { language: { $regex: search, $options: 'i' } }
      ];
    }

    const cheatSheets = await CheatSheet.find(filter)
      .sort({ downloads: -1 });

    // Format response with colors
    const formattedCheatSheets = cheatSheets.map(sheet => {
      const colorMap = {
        'Python': 'bg-blue-100 text-blue-800',
        'Java': 'bg-orange-100 text-orange-800',
        'JavaScript': 'bg-yellow-100 text-yellow-800',
        'C++': 'bg-purple-100 text-purple-800',
        'Git': 'bg-green-100 text-green-800',
        'Multiple': 'bg-purple-100 text-purple-800',
        'Database': 'bg-red-100 text-red-800',
        'Web Development': 'bg-indigo-100 text-indigo-800'
      };

      return {
        ...sheet.toObject(),
        color: colorMap[sheet.language] || 'bg-gray-100 text-gray-800'
      };
    });

    res.json({
      success: true,
      data: formattedCheatSheets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Download cheat sheet
const downloadCheatSheet = async (req, res) => {
  try {
    const cheatSheet = await CheatSheet.findById(req.params.id);

    if (!cheatSheet) {
      return res.status(404).json({
        success: false,
        message: 'Cheat sheet not found'
      });
    }

    // Increment download count
    cheatSheet.downloads += 1;
    await cheatSheet.save();

    // In a real application, you would serve the actual file
    // For now, we'll return the file URL
    res.json({
      success: true,
      message: 'Cheat sheet download started',
      data: {
        fileUrl: cheatSheet.fileUrl,
        title: cheatSheet.title
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get study hack categories
const getCategories = async (req, res) => {
  try {
    const categories = await StudyHack.distinct('category');
    
    res.json({
      success: true,
      data: ['All', ...categories]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get popular study hacks
const getPopularStudyHacks = async (req, res) => {
  try {
    const popularHacks = await StudyHack.find({ isPublished: true })
      .sort({ views: -1, likes: -1 })
      .limit(6)
      .populate('author', 'name avatar')
      .select('-content');

    res.json({
      success: true,
      data: popularHacks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getStudyHacks,
  getStudyHack,
  createStudyHack,
  updateStudyHack,
  likeStudyHack,
  getCheatSheets,
  downloadCheatSheet,
  getCategories,
  getPopularStudyHacks
};