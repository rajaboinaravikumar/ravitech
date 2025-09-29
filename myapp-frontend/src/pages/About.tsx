import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Youtube, 
  Instagram, 
  Linkedin, 
  Mail, 
  Award, 
  BookOpen, 
  Users, 
  Star,
  Code,
  GraduationCap,
  Heart,
  Target,
  ArrowDown
} from 'lucide-react';

// Scroll Animation Wrapper
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

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  const stats = [
    { icon: Users, label: 'Students Taught', value: '10,000+', color: 'text-blue-600' },
    { icon: BookOpen, label: 'Courses Created', value: '50+', color: 'text-green-600' },
    { icon: Youtube, label: 'YouTube Subscribers', value: '25,000+', color: 'text-red-600' },
    { icon: Award, label: 'Years Experience', value: '8+', color: 'text-purple-600' }
  ];

  const achievements = [
    {
      year: '2024',
      title: 'Started Teaching Journey',
      description: 'Began helping fellow students with programming concepts'
    },
    {
      year: '2024',
      title: 'YouTube Channel Launch ( raviramtechtalks )',
      description: 'Created a professional YouTube channel to reach more students worldwide with tech & education content'
    },
    {
      year: '2024',
      title: 'Instagram Channel Launch ( raviramtechtalks )',
      description: 'created an instagram channel to share short-form content, updates , and student gudance'
    },
    {
      year: '2025',
      title: 'Telegram Community ( raviramtechtalks )',
      description: 'Launched a  Telegram channel/group to provide notes,updates, and direct community interaction '
    },
    {
      year: '2025',
      title: 'Online Platform creation & Educational Innovation',
      description: 'Launched a comprehensive learning platform with structured courses and certifications. Integrated AI-Powered assistants and interactive learning tools to make learning more engaging ,personalized,and effective.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Teaching',
      description: 'Genuinely love helping students achieve their programming goals'
    },
    {
      icon: Target,
      title: 'Practical Learning',
      description: 'Focus on real-world applications and hands-on projects'
    },
    {
      icon: GraduationCap,
      title: 'Continuous Growth',
      description: 'Always learning and updating content with latest technologies'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a supportive community of learners and achievers'
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

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Meet Ravi Ram
                <motion.span 
                  className="block text-yellow-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                Teaching Philosophy
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-xl text-blue-100 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              > I believe that programming should be taught in a way that's both 
                practical and enjoyable. My approach focuses on real-world applications 
                and building confidence through hands-on experience.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://youtube.com/@raviramtechtalks?si=WKDJvN5ahRDnUPeo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Youtube className="h-5 w-5 mr-2" />
                  YouTube Channel
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/ravi-kumar-a85797254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </motion.a>
                 <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.instagram.com/raviramtechtalks?igsh=b2RoN2k2cGl5cnVs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  Instagram
                </motion.a>
                
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src="public/images/raviram.png"
                  alt="Ravi Ram"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -bottom-6 -right-6 bg-yellow-400 text-gray-900 p-4 rounded-xl shadow-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="h-6 w-6" />
                    <div>
                      <div className="font-bold">4.9/5</div>
                      <div className="text-sm">Student Rating</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section 
      <div className="py-16 bg-white dark:bg-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollAnimationWrapper key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ 
                    y: -5,
                    scale: 1.05
                  }}
                  className="text-center bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="p-3 bg-white dark:bg-gray-600 rounded-full shadow-md">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </div> */}

      {/* Teaching Philosophy Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/*
          <ScrollAnimationWrapper delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                My Teaching Philosophy
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                I believe that programming should be taught in a way that's both 
                practical and enjoyable. My approach focuses on real-world applications 
                and building confidence through hands-on experience.
              </p>
            </div>
          </ScrollAnimationWrapper> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <ScrollAnimationWrapper delay={0.2}>
              <motion.div
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Why I Started Teaching
                </h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    My journey into education began during my college years when I 
                    noticed many of my classmates struggling with programming concepts. 
                    I started helping them understand complex topics by breaking them 
                    down into simpler, more digestible pieces.
                  </p>
                  <p>
                    What started as informal study sessions grew into a passion for 
                    teaching. I realized that with the right approach, anyone could 
                    learn to code and even fall in love with it. This revelation 
                    drove me to create content that makes programming accessible to everyone.
                  </p>
                  <p>
                    Today, I'm proud to have helped thousands of students not just 
                    learn programming, but also build successful careers in technology. 
                    Each student's success story motivates me to continue improving 
                    and expanding my teaching methods.
                  </p>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <img
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                  alt="Teaching setup"
                  className="w-full rounded-2xl shadow-lg"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg"
                >
                  <Code className="h-8 w-8 mb-2" />
                  <div className="font-bold">Practical</div>
                  <div className="text-sm">Learning</div>
                </motion.div>
              </motion.div>
            </ScrollAnimationWrapper>
          </div> 

          {/* Core Values Section */}
          <ScrollAnimationWrapper delay={0.2}>
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                My Core Values
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      y: -10,
                      scale: 1.05
                    }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="flex justify-center mb-4"
                    >
                      <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl">
                        <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                    </motion.div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimationWrapper delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                My Journey
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Key milestones in my teaching and content creation journey
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1 }}
              className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-blue-600"
            />

            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <ScrollAnimationWrapper key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Timeline dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 z-10"
                    />

                    {/* Content */}
                    <div className={`ml-20 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">
                          {achievement.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {achievement.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {achievement.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section 
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: [-100, 100] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollAnimationWrapper delay={0.2}>
            <h2 className="text-4xl font-bold mb-4">
              Let's Connect!
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Have questions about programming? Want to collaborate? 
              I'd love to hear from you and help you on your coding journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:contact@raviram.com"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </motion.a>
              <div className="flex items-center space-x-4">
                {[
                  { icon: Youtube, href: "https://youtube.com", color: "hover:bg-red-500" },
                  { icon: Instagram, href: "https://instagram.com", color: "hover:bg-pink-500" },
                  { icon: Linkedin, href: "https://linkedin.com", color: "hover:bg-blue-500" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <social.icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div> */}
    </div>
  );
};

export default About;