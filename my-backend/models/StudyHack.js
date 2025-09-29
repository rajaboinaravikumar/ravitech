const mongoose = require('mongoose');

const studyHackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: true
  }],
  readTime: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Study Tips', 'Time Management', 'Programming', 'Problem Solving', 'Productivity', 'Learning Methods']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Text search index
studyHackSchema.index({ 
  title: 'text', 
  excerpt: 'text', 
  content: 'text',
  tags: 'text'
});

module.exports = mongoose.model('StudyHack', studyHackSchema);