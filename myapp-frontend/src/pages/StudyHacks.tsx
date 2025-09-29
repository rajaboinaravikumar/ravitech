 import React, { useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Clock, 
  Download, 
  Share2, 
  BookOpen,
  Lightbulb,
  Target,
  Brain,
  TrendingUp,
  Filter,
  Trophy,
  Zap,
  ArrowDown
} from 'lucide-react';

// Custom hook for scroll-triggered animations
const useScrollAnimation = (ref, threshold = 0.1) => {
  const isInView = useInView(ref, { threshold, once: false });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return { isInView, scrollYProgress };
};

// Animated component wrapper
const ScrollAnimationWrapper = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const studyHacks = [
  {
    id: 1,
    title: "10 Effective Study Techniques for Programming",
    excerpt: "Discover proven methods to learn programming concepts faster and retain them longer.",
    content: "Programming requires a different approach to studying compared to traditional subjects...",
    image: "https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg",
    tags: ["study tips", "programming", "learning"],
    readTime: "5 min read",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Time Management for Coding Students",
    excerpt: "Learn how to balance coding practice with theoretical study for maximum efficiency.",
    content: "Managing your time effectively while learning to code is crucial for success...",
    image: "https://images.pexels.com/photos/273222/pexels-photo-273222.jpeg",
    tags: ["time management", "productivity", "coding"],
    readTime: "7 min read",
    date: "2024-01-10"
  },
  {
    id: 3,
    title: "Debugging Strategies Every Student Should Know",
    excerpt: "Master the art of debugging with these essential techniques and tools.",
    content: "Debugging is an essential skill that every programmer must develop...",
    image: "https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg",
    tags: ["debugging", "problem solving", "programming"],
    readTime: "6 min read",
    date: "2024-01-05"
  }
];

const cheatSheets = [
  {
    title: "Python Quick Reference",
    description: "Essential Python syntax, functions, and data structures in one page",
    downloads: "15.2k",
    language: "Python",
    color: "bg-blue-100 text-blue-800"
  },
  {
    title: "Java Fundamentals Cheat Sheet",
    description: "Object-oriented concepts, syntax, and common patterns",
    downloads: "12.8k",
    language: "Java",
    color: "bg-orange-100 text-orange-800"
  },
  {
    title: "Data Structures & Algorithms",
    description: "Time complexity, common algorithms, and implementation patterns",
    downloads: "18.5k",
    language: "Multiple",
    color: "bg-purple-100 text-purple-800"
  },
  {
    title: "Git Commands Reference",
    description: "Essential Git commands for version control and collaboration",
    downloads: "9.3k",
    language: "Git",
    color: "bg-green-100 text-green-800"
  }
];

const StudyHacks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  const categories = ['All', 'Study Tips', 'Time Management', 'Programming', 'Problem Solving'];

  const filteredHacks = studyHacks.filter(hack => {
    const matchesSearch = hack.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hack.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           hack.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  const featuredTips = [
    {
      icon: Brain,
      title: "Active Learning",
      description: "Engage with the material through coding practice and projects",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Target,
      title: "Set Clear Goals",
      description: "Break down complex topics into manageable learning objectives",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your learning journey and celebrate small wins",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Clock,
      title: "Time Boxing",
      description: "Use focused study sessions with regular breaks",
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  // Floating scroll indicator
  const FloatingScrollIndicator = () => (
    <motion.div
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col items-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        className="w-1 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mb-4 relative overflow-hidden"
        animate={{ scaleY: [0, 1] }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="w-full bg-blue-600 rounded-full absolute bottom-0"
          style={{ scaleY: scrollProgress }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl opacity-30"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-30"
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <FloatingScrollIndicator />
       
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Study Hacks & Learning Tips
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover proven strategies to accelerate your programming learning 
              and master complex concepts efficiently
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold flex items-center"
              >
                Start Learning
                <ArrowDown className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Essential Learning Strategies */}
        <ScrollAnimationWrapper delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Essential Learning Strategies
          </h2>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredTips.map((tip, index) => (
            <ScrollAnimationWrapper key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center mb-4"
                >
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl">
                    <tip.icon className={`h-10 w-10 ${tip.color}`} />
                  </div>
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {tip.description}
                </p>
              </motion.div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Search and Filter Section */}
        <ScrollAnimationWrapper delay={0.3}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-12 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Search study hacks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
              </div>
 
              <div className="flex items-center space-x-3">
                <Filter className="h-5 w-5 text-gray-400" />
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </motion.select>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-gray-600 dark:text-gray-300"
            >
              Showing {filteredHacks.length} of {studyHacks.length} articles
            </motion.div>
          </motion.div>
        </ScrollAnimationWrapper>

        {/* Study Hacks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredHacks.map((hack, index) => (
            <ScrollAnimationWrapper key={hack.id} delay={index * 0.1}>
              <motion.article
                whileHover={{ 
                  y: -5,
                  scale: 1.02
                }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700"
              >
                <motion.div 
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={hack.image}
                    alt={hack.title}
                    className="w-full h-48 object-cover"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-start p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <BookOpen className="h-8 w-8 text-white" />
                  </motion.div>
                </motion.div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <motion.div 
                      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      {hack.date}
                    </motion.div>
                    <motion.div 
                      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {hack.readTime}
                    </motion.div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {hack.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {hack.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hack.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: tagIndex * 0.1 }}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read More
                    </motion.button>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button 
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Cheat Sheets Section */}
        <ScrollAnimationWrapper delay={0.2}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16 border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Download Cheat Sheets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cheatSheets.map((sheet, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {sheet.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                        {sheet.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${sheet.color}`}>
                          {sheet.language}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          {sheet.downloads} downloads
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* No Results */}
        {filteredHacks.length === 0 && studyHacks.length > 0 && (
          <ScrollAnimationWrapper>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Lightbulb className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                No study hacks found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          </ScrollAnimationWrapper>
        )}

        {/* Newsletter Subscription 
        <ScrollAnimationWrapper delay={0.4}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-10 text-white text-center relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: [-100, 100] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Get Weekly Study Tips
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Subscribe to receive the latest study hacks, learning strategies, 
                and programming tips directly in your inbox
              </p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper> */}
      </div>
    </div>
  );
};

export default StudyHacks;