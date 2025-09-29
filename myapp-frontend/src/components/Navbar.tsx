 import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileDropdown = (linkName: string) => {
    setMobileDropdown(mobileDropdown === linkName ? null : linkName);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses', hasDropdown: true },
    { name: 'Study Hacks', path: '/study-hacks' },
    { name: 'About', path: '/about' },
  ];

  const courseDropdown = [
    { name: 'Python Fundamentals', path: '/course/python-basics' },
    { name: 'Java Programming', path: '/course/java-programming' },
    { name: 'Web Development', path: '/courses/web-dev' },
    { name: 'Data Structures', path: '/courses/dsa' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 shadow-xl backdrop-blur-lg border-b border-gray-200/50' 
          : 'bg-white shadow-lg border-b border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with animation */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            style={{
              transform: isScrolled ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          >
            <BookOpen className="h-8 w-8 text-blue-600 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-600">
              Ravi Ram Tech Talks
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <div key={link.name} className="relative group">
                <div
                  className="relative flex items-center space-x-1 py-2"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className="text-gray-700 hover:text-blue-600 transition-all duration-300 flex items-center space-x-1"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transform: isScrolled ? 'translateY(-2px)' : 'translateY(0)'
                    }}
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  {link.hasDropdown && (
                    <>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                        activeDropdown === link.name ? 'rotate-180' : ''
                      }`} />
                      
                      {/* Course Dropdown */}
                      <div 
                        className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 transform origin-top ${
                          activeDropdown === link.name 
                            ? 'opacity-100 scale-100 translate-y-0' 
                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                        }`}
                      >
                        <div className="py-2">
                          {courseDropdown.map((course) => (
                            <Link
                              key={course.name}
                              to={course.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 transform hover:translate-x-2"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {course.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                {/* ✅ ADMIN DASHBOARD LINK (Only for you) */}
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-all duration-300 transform hover:scale-105 border border-purple-200 rounded-lg hover:bg-purple-50"
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                {/* Student Dashboard Link */}
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="relative">
                    <User className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <span className="transition-all duration-300 group-hover:translate-x-1">
                    {user.name}
                    {user.role === 'admin' && ' (Admin)'}
                  </span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-all duration-300 transform hover:scale-105 border border-red-200 rounded-lg hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-200"
                >
                  Login
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 transition-transform duration-300 rotate-180" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu with animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-gray-200 space-y-3">
            {navLinks.map((link, index) => (
              <div key={link.name}>
                <div className="flex flex-col">
                  {link.hasDropdown ? (
                    <>
                      {/* Dropdown trigger for mobile */}
                      <button
                        onClick={() => toggleMobileDropdown(link.name)}
                        className="flex items-center justify-between py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-300 w-full text-left"
                      >
                        <span>{link.name}</span>
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-300 ${
                            mobileDropdown === link.name ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {/* Mobile Course Dropdown */}
                      <div 
                        className={`ml-4 space-y-2 transition-all duration-300 overflow-hidden ${
                          mobileDropdown === link.name ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {courseDropdown.map((course, courseIndex) => (
                          <Link
                            key={course.name}
                            to={course.path}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileDropdown(null);
                            }}
                            className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
                          >
                            {course.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    // Regular link (without dropdown)
                    <Link
                      to={link.path}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setMobileDropdown(null);
                      }}
                      className="flex items-center justify-between py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
                    >
                      <span>{link.name}</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
            
            {/* Mobile Auth Links */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {user ? (
                <>
                  {/* ✅ MOBILE ADMIN DASHBOARD LINK */}
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setMobileDropdown(null);
                      }}
                      className="block py-3 px-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-300 font-medium"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <Link
                    to="/dashboard"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setMobileDropdown(null);
                    }}
                    className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
                  >
                    Dashboard {user.role === 'admin' && '(Admin)'}
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-3 px-4 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setMobileDropdown(null);
                  }}
                  className="block py-3 px-4 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;