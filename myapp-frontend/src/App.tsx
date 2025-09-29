import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CoursePage from './pages/CoursePage';
import Certificates from './pages/Certificates';
import StudyHacks from './pages/StudyHacks';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

function App() {
  
  return (
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/study-hacks" element={<StudyHacks />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Chatbot />
        <Footer />
      </div>
  );
}

export default App;