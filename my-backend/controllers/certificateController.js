const Certificate = require('../models/Certificate');
const Course = require('../models/course');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

// Generate certificate
const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.body;
    
    const user = await User.findById(req.user.id);
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check if course is completed
    const enrolledCourse = user.enrolledCourses.find(
      enrolled => enrolled.course.toString() === courseId && enrolled.completed
    );
    
    if (!enrolledCourse) {
      return res.status(400).json({
        success: false,
        message: 'Course not completed. Please complete all topics to earn certificate.'
      });
    }
    
    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({
      student: req.user.id,
      course: courseId
    });
    
    if (existingCertificate) {
      return res.status(400).json({
        success: false,
        message: 'Certificate already issued for this course'
      });
    }
    
    // Create certificate
    const certificate = await Certificate.create({
      student: req.user.id,
      course: courseId,
      completionDate: new Date()
    });
    
    await certificate.populate('course', 'title language level instructor');
    await certificate.populate('student', 'name email');
    
    // Generate PDF certificate
    const pdfBuffer = await generatePDFCertificate(certificate);
    
    // Save PDF to server (in production, you'd save to cloud storage)
    const certificatesDir = path.join(__dirname, '../certificates');
    if (!fs.existsSync(certificatesDir)) {
      fs.mkdirSync(certificatesDir, { recursive: true });
    }
    
    const pdfPath = path.join(certificatesDir, `${certificate.certificateId}.pdf`);
    fs.writeFileSync(pdfPath, pdfBuffer);
    
    certificate.certificateUrl = `/api/certificates/download/${certificate.certificateId}`;
    await certificate.save();
    
    // Send email with certificate
    await sendCertificateEmail(user, course, certificate);
    
    res.status(201).json({
      success: true,
      message: 'Certificate generated successfully',
      data: certificate
    });
  } catch (error) {
    console.error('Certificate generation error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Generate PDF certificate
const generatePDFCertificate = (certificate) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4'
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Certificate design
      const width = doc.page.width;
      const height = doc.page.height;

      // Background
      doc.rect(0, 0, width, height).fill('#1a365d');

      // Border
      doc.strokeColor('#ecc94b')
         .lineWidth(10)
         .rect(20, 20, width - 40, height - 40)
         .stroke();

      // Title
      doc.fontSize(32)
         .fillColor('#ecc94b')
         .text('CERTIFICATE OF COMPLETION', 0, 100, {
           align: 'center',
           width: width
         });

      // Subtitle
      doc.fontSize(18)
         .fillColor('#ffffff')
         .text('This is to certify that', 0, 160, {
           align: 'center',
           width: width
         });

      // Student Name
      doc.fontSize(28)
         .fillColor('#ecc94b')
         .text(certificate.student.name.toUpperCase(), 0, 200, {
           align: 'center',
           width: width
         });

      // Course completion text
      doc.fontSize(16)
         .fillColor('#ffffff')
         .text('has successfully completed the course', 0, 260, {
           align: 'center',
           width: width
         });

      // Course Title
      doc.fontSize(22)
         .fillColor('#ecc94b')
         .text(`"${certificate.course.title}"`, 0, 300, {
           align: 'center',
           width: width
         });

      // Course details
      doc.fontSize(14)
         .fillColor('#ffffff')
         .text(`Language: ${certificate.course.language} | Level: ${certificate.course.level}`, 0, 350, {
           align: 'center',
           width: width
         });

      // Completion date
      doc.fontSize(12)
         .fillColor('#cbd5e0')
         .text(`Completed on: ${new Date(certificate.completionDate).toLocaleDateString()}`, 0, 400, {
           align: 'center',
           width: width
         });

      // Certificate ID
      doc.fontSize(10)
         .fillColor('#a0aec0')
         .text(`Certificate ID: ${certificate.certificateId}`, 0, 450, {
           align: 'center',
           width: width
         });

      // Verification code
      doc.fontSize(10)
         .fillColor('#a0aec0')
         .text(`Verification Code: ${certificate.verificationCode}`, 0, 470, {
           align: 'center',
           width: width
         });

      // Footer
      doc.fontSize(12)
         .fillColor('#ecc94b')
         .text('Programming LMS', 0, 520, {
           align: 'center',
           width: width
         });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

// Send certificate email
const sendCertificateEmail = async (user, course, certificate) => {
  try {
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d; text-align: center;">🎉 Congratulations ${user.name}! 🎉</h2>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0;">Certificate of Completion</h3>
          <h4 style="margin: 0 0 20px 0;">${course.title}</h4>
          <p style="margin: 0;">You have successfully completed the course and earned your certificate!</p>
        </div>

        <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #2d3748; margin-bottom: 15px;">Certificate Details:</h4>
          <p><strong>Certificate ID:</strong> ${certificate.certificateId}</p>
          <p><strong>Verification Code:</strong> ${certificate.verificationCode}</p>
          <p><strong>Completion Date:</strong> ${new Date(certificate.completionDate).toLocaleDateString()}</p>
          <p><strong>Course:</strong> ${course.title}</p>
          <p><strong>Language:</strong> ${course.language}</p>
          <p><strong>Level:</strong> ${course.level}</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/certificates" 
             style="background: #4299e1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Your Certificate
          </a>
        </div>

        <p style="color: #718096; font-size: 14px; text-align: center;">
          You can download and share your certificate from your dashboard. Keep learning!
        </p>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: `🎓 Certificate Earned - ${course.title}`,
      html: emailContent
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw error, certificate generation should still succeed
  }
};

// Get user certificates
const getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ student: req.user.id })
      .populate('course', 'title image language level duration instructor')
      .sort({ issueDate: -1 });

    // Get user stats
    const user = await User.findById(req.user.id);
    const totalEnrolled = user.enrolledCourses.length;
    const totalCompleted = user.completedCourses.length;

    res.json({
      success: true,
      data: {
        certificates,
        stats: {
          totalCertificates: certificates.length,
          totalEnrolled,
          totalCompleted,
          completionRate: totalEnrolled > 0 ? Math.round((totalCompleted / totalEnrolled) * 100) : 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Download certificate PDF
const downloadCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    
    const certificate = await Certificate.findOne({ certificateId })
      .populate('student', 'name')
      .populate('course', 'title language level');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Check if user owns the certificate or is admin
    if (certificate.student._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const pdfPath = path.join(__dirname, '../certificates', `${certificateId}.pdf`);
    
    if (!fs.existsSync(pdfPath)) {
      // Regenerate PDF if not found
      const pdfBuffer = await generatePDFCertificate(certificate);
      fs.writeFileSync(pdfPath, pdfBuffer);
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${certificateId}.pdf`);
    
    const fileStream = fs.createReadStream(pdfPath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Certificate download error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Verify certificate
const verifyCertificate = async (req, res) => {
  try {
    const { certificateId, verificationCode } = req.body;
    
    const certificate = await Certificate.findOne({
      certificateId,
      verificationCode
    })
    .populate('student', 'name email')
    .populate('course', 'title language level instructor duration');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: 'Certificate not found or invalid verification code'
      });
    }

    if (certificate.status === 'revoked') {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'Certificate has been revoked'
      });
    }

    res.json({
      success: true,
      valid: true,
      data: {
        student: certificate.student.name,
        course: certificate.course.title,
        language: certificate.course.language,
        level: certificate.course.level,
        instructor: certificate.course.instructor,
        issueDate: certificate.issueDate,
        completionDate: certificate.completionDate,
        certificateId: certificate.certificateId,
        verificationCode: certificate.verificationCode
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Share certificate (generate shareable link)
const shareCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    
    const certificate = await Certificate.findOne({ certificateId })
      .populate('student', 'name')
      .populate('course', 'title');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Check if user owns the certificate
    if (certificate.student._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // In a real app, you might create a public verification page
    const shareableUrl = `${process.env.FRONTEND_URL}/verify-certificate/${certificateId}`;

    res.json({
      success: true,
      data: {
        shareableUrl,
        certificateId: certificate.certificateId,
        message: 'Certificate shared successfully'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  generateCertificate,
  getUserCertificates,
  downloadCertificate,
  verifyCertificate,
  shareCertificate
};