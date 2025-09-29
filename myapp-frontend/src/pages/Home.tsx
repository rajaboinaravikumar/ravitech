 import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, TrendingUp, Play, Star, ArrowRight, Code, Zap } from 'lucide-react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef([]);

  // Intersection Observer for scroll animations - MUCH FASTER
  useEffect(() => {
    const observers = [];
    
    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              // Remove setTimeout for instant animation
              ref.style.opacity = '1';
              ref.style.transform = 'translateY(0)';
            }
          },
          {
            threshold: 0.05, // Lower threshold for earlier trigger
            rootMargin: '0px 0px -100px 0px' // Trigger earlier
          }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Interactive Learning",
      description: "Learn programming with hands-on examples and live code playground"
    },
    {
      icon: <Code className="h-8 w-8 text-teal-600" />,
      title: "Multiple Languages",
      description: "Master Python, Java, C, JavaScript and more with structured courses"
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Certificates",
      description: "Earn completion certificates and showcase your achievements"
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "Study Hacks",
      description: "Access exclusive tips and strategies to ace your programming exams"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      content: "Ravi Ram's platform made learning Python so much easier. The step-by-step approach is perfect!",
      rating: 5
    },
    {
      name: "Amit Kumar",
      role: "Software Developer",
      content: "The best programming education platform I've used. Clear explanations and practical examples.",
      rating: 5
    },
    {
      name: "Sneha Patel",
      role: "Engineering Student",
      content: "Helped me ace my programming exams. The study hacks section is incredibly valuable!",
      rating: 5
    }
  ];

  const courses = [
    { name: "Python Fundamentals", students: "2.5k", level: "Beginner", color: "bg-blue-100 text-blue-800" },
    { name: "Java Programming", students: "1.8k", level: "Intermediate", color: "bg-teal-100 text-teal-800" },
    { name: "C Programming", students: "1.2k", level: "Beginner", color: "bg-purple-100 text-purple-800" },
    { name: "JavaScript Basics", students: "3.1k", level: "Beginner", color: "bg-orange-100 text-orange-800" }
  ];

  const addToRefs = (el, index) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current[index] = el;
      // Set initial styles for animation - VERY FAST
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.3s ease-out';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Ravi Ram's Photo */}
       
{/* Hero Section with Ravi Ram's Photo */}
<section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-20 relative overflow-hidden">
  <div className="absolute inset-0 bg-black opacity-5"></div>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Text Content */}
      <div 
        ref={el => addToRefs(el, 0)}
        className="text-center lg:text-left"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Simplify Programming &
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 block"> Ace Your Exams</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Learn programming languages step-by-step with interactive tutorials, practice exercises, and expert guidance from <strong>Ravi Ram</strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            to="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-400 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Learning Free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-400 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white dark:bg-gray-800 dark:text-blue-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-400 border border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl"
          >
            Explore Courses
            <BookOpen className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Ravi Ram's Photo */}
      <div 
        ref={el => addToRefs(el, 1)}
        className="relative group"
      >
        <div className="flex justify-center items-center">
          <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-500 w-80 h-80 md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px]">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
              <img
                src="public/images/raviram.png"
                alt="Ravi Ram - Python Developer & Educator"
                className="w-full h-full object-cover"
                style={{ objectPosition: "110% 15%" }}
              />
            </div>
            {/* Floating badge - adjust position for larger circle */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl shadow-lg transform rotate-3 transition-transform duration-400 group-hover:scale-105">
              <div className="text-lg font-semibold">Ravi Ram</div>
              <div className="text-sm opacity-90">Tech enthusiast & Educator</div>
            </div>
          </div>
        </div>
        {/* Animated background elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-200 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 delay-300"></div>
      </div>
    </div>
  </div>
</section>
      {/* Popular Courses */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={el => addToRefs(el, 2)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of students learning programming the right way
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <Link
                key={index}
                to="/courses"
                ref={el => addToRefs(el, 3 + index)}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-150 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${course.color} transform group-hover:scale-105 transition-transform duration-150`}>
                    {course.level}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-150">
                    <Users className="h-4 w-4 mr-1 transition-transform group-hover:scale-110 duration-150" />
                    <span className="text-sm font-medium">{course.students}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                  {course.name}
                </h3>
                <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-150">
                  <span className="text-sm font-medium">Start Learning</span>
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 duration-150" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={el => addToRefs(el, 7)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Ravi Ram Education?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience a modern approach to programming education with interactive learning and practical examples
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={el => addToRefs(el, 8 + index)}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1 group border border-gray-100 dark:border-gray-700"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-150">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-150 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-150 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={el => addToRefs(el, 12)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real feedback from our programming community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                ref={el => addToRefs(el, 13 + index)}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 group"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current transform group-hover:scale-110 transition-transform duration-150" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic leading-relaxed transition-colors duration-150 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white transition-colors duration-150 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-150 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section 
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div 
            ref={el => addToRefs(el, 16)}
            className="transform transition-all duration-300"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Programming Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who are already mastering programming with Ravi Ram's proven teaching methods
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-100 transition-all duration-150 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-150 hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section> */}

      
    </div>
  );
};

export default Home;