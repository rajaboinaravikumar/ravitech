const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/course');
require('dotenv').config();

const createSampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Create admin user
    const adminUser = await User.create({
      name: 'Ravi Ram Rajaboina',
      email: 'raviramrajaboina@gmail.com',
      password: 'ravi+shiva=143',
      role: 'admin',
      isVerified: true
    });

    // Create student user
    const studentUser = await User.create({
      name: 'Test Student',
      email: 'student@example.com',
      password: 'password123',
      role: 'student',
      isVerified: true
    });

    // Create sample courses
    const courses = [
      {
        title: 'Python Fundamentals',
        description: 'Learn Python from scratch with practical examples and projects',
        language: 'Python',
        level: 'Beginner',
        duration: '4 weeks',
        students: 2500,
        rating: 4.9,
        topics: 25,
        image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
        instructor: adminUser._id,
        isPublished: true
      },
      {
        title: 'Java Programming',
        description: 'Master Java programming with object-oriented concepts',
        language: 'Java',
        level: 'Intermediate',
        duration: '6 weeks',
        students: 1800,
        rating: 4.8,
        topics: 32,
        image: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg',
        instructor: adminUser._id,
        isPublished: true
      }
    ];

    await Course.insertMany(courses);
    console.log('Sample data created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample data:', error);
    process.exit(1);
  }
};

createSampleData();