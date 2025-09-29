import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Users, BookOpen, Star } from 'lucide-react';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const courses = [
    {
      id: 'python-basics',
      title: 'Python Fundamentals',
      description: 'Learn Python from scratch with practical examples and projects',
      language: 'Python',
      level: 'Intermediate',
      duration: '3 weeks',
      students: '2k',
      rating: 4,
      topics: 35,
      image: 'public/images/python1.jpg',
      color: 'from-blue-100 to-blue-200'
    },
    {
      id: 'java-programming',
      title: 'Java Foundamentals',
      description: 'Master Java programming with object-oriented concepts',
      language: 'Java',
      level: 'Advanced',
      duration: '6 weeks',
      students: '1.8k',
      rating: 4.1,
      topics: 65,
      image: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'c-programming',
      title: 'C Programming',
      description: 'Build strong programming foundations with C language',
      language: 'C',
      level: 'Beginner',
      duration: '2 weeks',
      students: '1.2k',
      rating: 4,
      topics: 12,
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'javascript-basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn modern JavaScript for web development',
      language: 'JavaScript',
      level: 'Beginner',
      duration: '4 weeks',
      students: '3.1k',
      rating: 4.9,
      topics: 22,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'cpp-programming',
      title: 'Complete C++ Programming Course',
      description: 'Advanced programming concepts with C++',
      language: 'C++',
      level: 'Advanced',
      duration: '8 weeks',
      students: '980',
      rating: 4.8,
      topics: 35,
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'data-structures',
      title: 'Data Structures & Algorithms',
      description: 'Master DSA for competitive programming and interviews',
      language: 'Multiple',
      level: 'Advanced',
      duration: '10 weeks',
      students: '1.5k',
      rating: 4.9,
      topics: 45,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      color: 'from-green-500 to-green-600'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    
    return matchesSearch && matchesLevel && matchesLanguage;
  });

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  const languages = ['all', 'Python', 'Java', 'C', 'JavaScript', 'C++', 'Multiple'];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen py-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with animation */}
        <div 
  className={`mt-12 text-center mb-12 transform transition-all duration-700 ${
    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
  }`}
    >
   <h1 className="mt-10 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 
               bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  Programming Courses
</h1>

  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
    Master programming languages with our comprehensive courses designed for all skill levels
      </p>
        </div>


        {/* Search and Filters with animation */}
        <div 
          className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-8 transform transition-all duration-700 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-transform group-focus-within:scale-110" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 group-hover:shadow-md"
              />
            </div>

            {/* Level Filter */}
            <div className="relative group">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-transform group-focus-within:scale-110" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none transition-all duration-300 group-hover:shadow-md cursor-pointer"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="relative group">
              <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-transform group-focus-within:scale-110" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none transition-all duration-300 group-hover:shadow-md cursor-pointer"
              >
                {languages.map(language => (
                  <option key={language} value={language}>
                    {language === 'all' ? 'All Languages' : language}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 font-semibold text-lg">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>

        {/* Course Grid with staggered animations */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s ease-out'
          }}
        >
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              style={{
                animationDelay: `${index * 0.1}s`,
                transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                opacity: isVisible ? 1 : 0,
                transition: `all 0.5s ease-out ${index * 0.1}s`
              }}
            >
              <Link
                to={`/course/${course.id}`}
                className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-80 mix-blend-multiply`} />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm font-semibold rounded-full backdrop-blur-sm border border-white border-opacity-30">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{course.title}</h3>
                    <p className="text-sm opacity-90 font-medium">{course.language}</p>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      <Clock className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                      <span className="text-sm font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      <Users className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                      <span className="text-sm font-medium">{course.students} students</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      <BookOpen className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                      <span className="text-sm font-medium">{course.topics} topics</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current transition-transform group-hover:scale-110" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group-hover:shadow-2xl">
                    Start Learning
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* No results state */}
        {filteredCourses.length === 0 && (
          <div 
            className={`text-center py-16 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="relative inline-block">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4 transform transition-transform duration-700 hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLevel('all');
                setSelectedLanguage('all');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .grid {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
        
        .grid::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .grid::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }
        
        .grid::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        
        .grid::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Courses; 