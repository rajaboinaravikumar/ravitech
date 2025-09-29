import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Youtube, 
  Instagram, 
  Linkedin, 
  Twitter,
  Heart,
  ExternalLink,
  Download,
  Users,
  Award
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Study Hacks', path: '/study-hacks' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const courses = [
    { name: 'Python Fundamentals', path: '/course/python-basics' },
    { name: 'Java Programming', path: '/course/java-programming' },
    { name: 'C Programming', path: '/course/c-programming' },
    { name: 'JavaScript Basics', path: '/course/javascript-basics' }
  ];

  const resources = [
    { name: 'Certificates', path: '/certificates' },
    { name: 'Study Materials', path: '/study-hacks' },
    { name: 'Code Playground', path: '/courses' },
     
  ];

  const socialLinks = [
    {
      name: 'YouTube',
      icon: <Youtube className="h-5 w-5" />,
      url: 'https://youtube.com/@raviramtechtalks?si=WKDJvN5ahRDnUPeo',
      color: 'hover:text-red-500'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="h-5 w-5" />,
      url: 'https://www.instagram.com/raviramtechtalks?igsh=b2RoN2k2cGl5cnVs',
      color: 'hover:text-pink-500'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      url: 'https://www.linkedin.com/in/ravi-kumar-a85797254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      color: 'hover:text-blue-500'
    },
   ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: '50k+', label: 'Students' },
    { icon: <BookOpen className="h-6 w-6" />, value: '100+', label: 'Courses' },
    { icon: <Award className="h-6 w-6" />, value: '25k+', label: 'Certificates' },
    { icon: <Download className="h-6 w-6" />, value: '1M+', label: 'Downloads' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const statVariants = {
    hidden: { 
      scale: 0.5, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const socialVariants = {
    hidden: { 
      rotate: -180, 
      opacity: 0 
    },
    visible: { 
      rotate: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-gray-900 text-white overflow-hidden"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s ease-out 0.2s'
          }}
        >
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link 
              to="/" 
              className="flex items-center space-x-2 mb-4 group"
              style={{
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s ease-out 0.3s'
              }}
            >
              <h3 
              className="text-lg font-semibold mb-4 text-white"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s ease-out 0.4s'
              }}
            >
              Contact Us
            </h3>
            </Link> {/*
            <p 
              className="text-gray-400 mb-6 leading-relaxed"
              style={{
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s ease-out 0.4s'
              }}
            >
              Empowering the next generation of programmers with practical skills, 
              clear explanations, and the confidence to build amazing things with code.
            </p> */}
            
            {/* Contact Info */}
            <div className="space-y-3">
              {[
                { icon: Mail, text: 'ravik059144@gmail.com', delay: 0.5 },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center text-gray-400 group cursor-pointer"
                  style={{
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.5s ease-out ${item.delay}s`
                  }}
                >
                  <item.icon className="h-4 w-4 mr-3 text-blue-400 transition-transform group-hover:scale-125 duration-300" />
                  <span className="transition-colors group-hover:text-blue-400 duration-300">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links  
          <div>
            <h3 
              className="text-lg font-semibold mb-4 text-white"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s ease-out 0.3s'
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li 
                  key={link.name}
                  style={{
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.4s ease-out ${0.4 + index * 0.1}s`
                  }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Popular Courses */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4 text-white"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s ease-out 0.4s'
              }}
            >
              Popular Courses
            </h3>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li 
                  key={course.name}
                  style={{
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.4s ease-out ${0.5 + index * 0.1}s`
                  }}
                >
                  <Link
                    to={course.path}
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {course.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4 text-white"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s ease-out 0.5s'
              }}
            >
              Resources
            </h3>
            <ul className="space-y-3 mb-6">
              {resources.map((resource, index) => (
                <li 
                  key={resource.name}
                  style={{
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.4s ease-out ${0.6 + index * 0.1}s`
                  }}
                >
                  <Link
                    to={resource.path}
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {resource.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */} {/*
            <div 
              className="bg-gray-800 rounded-lg p-4 transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              style={{
                transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.6s ease-out 0.7s'
              }}
            >
              <h4 className="font-semibold mb-2 text-white">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-3">Get weekly programming tips</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-300 focus:scale-105"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-all duration-300 transform hover:scale-110 active:scale-95">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div> */}
            
          </div>
           <div className="mb-4 md:mb-0">
              <h4 
                className="font-semibold mb-3 text-white"
                style={{
                  transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 0.5s ease-out 1.1s'
                }}
              >
                Follow Ravi Ram
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-800 rounded-lg text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700 transform`}
                    title={social.name}
                    style={{
                      transform: isVisible ? 'scale(1) rotate(0)' : 'scale(0) rotate(-180deg)',
                      opacity: isVisible ? 1 : 0,
                      transition: `all 0.1s ease-out ${0.2 + index * 0.01}s`
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
        </div> 
 
        {/* Stats Section */} {/*
        <div 
          className="border-t border-gray-800 mt-12 pt-8"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s ease-out 0.8s'
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group cursor-pointer"
                style={{
                  transform: isVisible ? 'scale(1)' : 'scale(0)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.5s ease-out ${0.9 + index * 0.1}s`
                }}
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-blue-600 bg-opacity-20 rounded-lg text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-30 group-hover:rotate-6">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1 transition-all duration-300 group-hover:text-blue-400 group-hover:scale-105">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm transition-colors duration-300 group-hover:text-white">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Social Links */}
            

            {/* App Download (Future) */}
            
          </div>
      {/* Bottom Bar */}
      <div 
        className="border-t border-gray-800"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.6s ease-out 1.4s'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div 
              className="flex items-center text-gray-400 text-sm mb-4 md:mb-0"
              style={{
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s ease-out 1.5s'
              }}
            >
              <span>© {currentYear} Ravi Ram Tech Talks . Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500 fill-current animate-pulse" />
              <span>for aspiring programmers.</span>
            </div>
            
            <div 
              className="flex items-center space-x-6 text-sm"
              style={{
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s ease-out 1.6s'
              }}
            >
              {['Privacy Policy', 'Terms of Service', ].map((item, index) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
                  style={{
                    transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.4s ease-out ${1.7 + index * 0.1}s`
                  }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;