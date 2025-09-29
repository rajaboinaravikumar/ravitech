const mongoose = require('mongoose');
const StudyHack = require('../models/StudyHack');
const CheatSheet = require('../models/CheatSheet');
const User = require('../models/User');
require('dotenv').config();

const createStudyHacksData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get admin user
    const adminUser = await User.findOne({ email: 'raviramrajaboina@gmail.com' });
    
    if (!adminUser) {
      console.log('Admin user not found. Please create admin user first.');
      process.exit(1);
    }

    // Create study hacks
    const studyHacks = [
      {
        title: "10 Effective Study Techniques for Programming",
        excerpt: "Discover proven methods to learn programming concepts faster and retain them longer.",
        content: "Programming requires a different approach to studying compared to traditional subjects. Here are 10 proven techniques:\n\n1. **Active Coding Practice**: Don't just read code - write it regularly\n2. **Project-Based Learning**: Build real projects to apply concepts\n3. **Spaced Repetition**: Review material at increasing intervals\n4. **Interleaving Practice**: Mix different topics in study sessions\n5. **Debugging Practice**: Learn by fixing errors and understanding why they occurred\n6. **Code Review**: Study others' code and have your code reviewed\n7. **Teaching Others**: Explain concepts to reinforce your understanding\n8. **Algorithm Visualization**: Use tools to see how algorithms work\n9. **Pair Programming**: Learn collaboratively with other developers\n10. **Regular Breaks**: Use Pomodoro technique for focused sessions",
        image: "https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg",
        tags: ["study tips", "programming", "learning", "techniques"],
        readTime: "5 min read",
        category: "Study Tips",
        author: adminUser._id,
        featured: true,
        views: 1520,
        likes: 89
      },
      {
        title: "Time Management for Coding Students",
        excerpt: "Learn how to balance coding practice with theoretical study for maximum efficiency.",
        content: "Managing your time effectively while learning to code is crucial for success...",
        image: "https://images.pexels.com/photos/273222/pexels-photo-273222.jpeg",
        tags: ["time management", "productivity", "coding", "efficiency"],
        readTime: "7 min read",
        category: "Time Management",
        author: adminUser._id,
        views: 980,
        likes: 45
      },
      {
        title: "Debugging Strategies Every Student Should Know",
        excerpt: "Master the art of debugging with these essential techniques and tools.",
        content: "Debugging is an essential skill that every programmer must develop...",
        image: "https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg",
        tags: ["debugging", "problem solving", "programming", "tools"],
        readTime: "6 min read",
        category: "Problem Solving",
        author: adminUser._id,
        views: 1230,
        likes: 67
      }
    ];

    await StudyHack.insertMany(studyHacks);

    // Create cheat sheets
    const cheatSheets = [
      {
        title: "Python Quick Reference",
        description: "Essential Python syntax, functions, and data structures in one page",
        language: "Python",
        fileUrl: "/cheatsheets/python-quick-reference.pdf",
        fileSize: "2.1 MB",
        downloads: 15200,
        category: "Programming",
        tags: ["python", "syntax", "reference"],
        isFree: true
      },
      {
        title: "Java Fundamentals Cheat Sheet",
        description: "Object-oriented concepts, syntax, and common patterns",
        language: "Java",
        fileUrl: "/cheatsheets/java-fundamentals.pdf",
        fileSize: "1.8 MB",
        downloads: 12800,
        category: "Programming",
        tags: ["java", "oop", "syntax"],
        isFree: true
      },
      {
        title: "Data Structures & Algorithms",
        description: "Time complexity, common algorithms, and implementation patterns",
        language: "Multiple",
        fileUrl: "/cheatsheets/dsa-reference.pdf",
        fileSize: "3.2 MB",
        downloads: 18500,
        category: "Algorithms",
        tags: ["algorithms", "data structures", "complexity"],
        isFree: true
      },
      {
        title: "Git Commands Reference",
        description: "Essential Git commands for version control and collaboration",
        language: "Git",
        fileUrl: "/cheatsheets/git-commands.pdf",
        fileSize: "1.5 MB",
        downloads: 9300,
        category: "Tools",
        tags: ["git", "version control", "commands"],
        isFree: true
      }
    ];

    await CheatSheet.insertMany(cheatSheets);

    console.log('Study hacks and cheat sheets created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating study hacks data:', error);
    process.exit(1);
  }
};

createStudyHacksData();