 

const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  code: {
    type: String
  },
  language: {
    type: String,
    enum: ['python', 'java', 'c', 'cpp', 'javascript']
  },
  exercise: {
    type: String
  },
  order: {
    type: Number,
    required: true
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'Multiple']
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  duration: {
    type: String,
    required: true
  },
  students: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalTopics: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'from-blue-500 to-blue-600'
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  topics: [topicSchema],
  requirements: [String],
  learningOutcomes: [String],
  category: {
    type: String,
    default: 'Programming'
  }
}, {
  timestamps: true
});

// Update totalTopics when topics are modified
courseSchema.pre('save', function(next) {
  this.totalTopics = this.topics.length;
  next();
});

module.exports = mongoose.model('Course', courseSchema);