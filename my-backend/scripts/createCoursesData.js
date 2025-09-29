const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
require('dotenv').config();

const createCoursesData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get admin user
    const adminUser = await User.findOne({ email: 'raviramrajaboina@gmail.com' });
    
    if (!adminUser) {
      console.log('Admin user not found. Please create admin user first.');
      process.exit(1);
    }

    // Create Python course
    const pythonCourse = await Course.create({
      title: 'Python Fundamentals',
      description: 'Master Python from basics to advanced concepts with practical examples',
      language: 'Python',
      level: 'Beginner',
      duration: '8 weeks',
      students: 2500,
      rating: 4.9,
      totalTopics: 35,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      instructor: adminUser._id,
      isPublished: true,
      price: 0,
      category: 'Programming',
      topics: [
        {
          id: 'installation',
          title: 'Installing Python 3',
          content: 'Learn how to install Python and set up your development environment properly...',
          code: '# Your first Python program\nprint("Hello, World!")',
          language: 'python',
          exercise: 'Install Python and run a simple program',
          order: 1
        },
        {
          id: 'first-program',
          title: 'Your First Python Program',
          content: 'Create your first Python program and understand how to execute it...',
          code: 'print("Welcome to Python Programming!")\nprint("This is my first program")',
          language: 'python',
          exercise: 'Create a program that prints your name and age',
          order: 2
        }
        // Add more topics...
      ]
    });

    // Create Java course
    const javaCourse = await Course.create({
      title: 'Java Programming',
      description: 'Master Java from basics to advanced concepts with practical projects',
      language: 'Java',
      level: 'Intermediate',
      duration: '10 weeks',
      students: 1800,
      rating: 4.8,
      totalTopics: 65,
      image: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg',
      instructor: adminUser._id,
      isPublished: true,
      price: 0,
      category: 'Programming',
      topics: [
        {
          id: 'introduction',
          title: 'Introduction to Java',
          content: 'Welcome to Java Programming! Java is a powerful, object-oriented programming language...',
          code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}',
          language: 'java',
          exercise: 'Write your first Java program',
          order: 1
        }
        // Add more topics...
      ]
    });

    console.log('Courses created successfully');
    console.log('Python Course ID:', pythonCourse._id);
    console.log('Java Course ID:', javaCourse._id);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating courses data:', error);
    process.exit(1);
  }
};

createCoursesData();