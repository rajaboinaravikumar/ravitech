import React, { useState, useEffect } from 'react';
import { Download, Share2, Award, Calendar, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { certificateAPI } from '../services/api';
import toast from 'react-hot-toast';

const Certificates = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [stats, setStats] = useState({
    totalCertificates: 0,
    totalEnrolled: 0,
    totalCompleted: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await certificateAPI.getUserCertificates();
      if (response.success) {
        setCertificates(response.data.certificates);
        setStats(response.data.stats);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (certificateId, courseName) => {
    try {
      const blob = await certificateAPI.downloadCertificate(certificateId);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${courseName.replace(/\s+/g, '_')}_Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success(`Certificate for ${courseName} downloaded!`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleShare = async (certificateId, courseName) => {
    try {
      const response = await certificateAPI.shareCertificate(certificateId);
      if (response.success) {
        // Copy to clipboard
        await navigator.clipboard.writeText(response.data.shareableUrl);
        toast.success(`Shareable link for ${courseName} copied to clipboard!`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const shareOnLinkedIn = (certificate) => {
    const text = `I just completed the "${certificate.course.title}" course on Programming LMS! Check out my certificate.`;
    const url = `${window.location.origin}/verify-certificate/${certificate.certificateId}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank');
  };

  const shareOnTwitter = (certificate) => {
    const text = `I just completed "${certificate.course.title}"! 🎓 Check out my certificate:`;
    const url = `${window.location.origin}/verify-certificate/${certificate.certificateId}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to view your certificates
          </h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Certificates
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Showcase your achievements and download your course completion certificates
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {stats.totalCertificates}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Certificates Earned</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {stats.totalEnrolled}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Courses Enrolled</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <ExternalLink className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {stats.totalCompleted}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Courses Completed</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <Share2 className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {stats.completionRate}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Completion Rate</div>
          </div>
        </div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="text-center py-16">
            <Award className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No certificates yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Complete your courses to earn certificates and showcase your achievements
            </p>
            <a
              href="/courses"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate) => (
              <div key={certificate._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Certificate Preview */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white">
                  <div className="absolute top-4 right-4">
                    <Award className="h-8 w-8 text-yellow-300" />
                  </div>
                  <div className="h-full flex flex-col justify-center">
                    <div className="text-center">
                      <h3 className="text-lg font-bold mb-2">Certificate of Completion</h3>
                      <p className="text-sm opacity-90 mb-1">{certificate.course.title}</p>
                      <p className="text-xs opacity-75">{user.name}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-6 text-xs opacity-75">
                    ID: {certificate.certificateId}
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {certificate.course.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Completed: {new Date(certificate.completionDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Language: {certificate.course.language} • Level: {certificate.course.level}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Verification: {certificate.verificationCode}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(certificate.certificateId, certificate.course.title)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                    <button
                      onClick={() => handleShare(certificate.certificateId, certificate.course.title)}
                      className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Share Section */}
        {certificates.length > 0 && (
          <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Share Your Achievements
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Let the world know about your programming skills! Share your certificates on social media 
              and professional networks to showcase your learning journey.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => shareOnLinkedIn(certificates[0])}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Share on LinkedIn
              </button>
              <button 
                onClick={() => shareOnTwitter(certificates[0])}
                className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
              >
                Share on Twitter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;