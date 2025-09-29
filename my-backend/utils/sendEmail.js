const nodemailer = require('nodemailer');

/**
 * Send email using nodemailer
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} options.text - Plain text content (optional)
 * @returns {Object} Email sending result
 */
const sendEmail = async (options) => {
  try {
    // Validate required options
    if (!options.to || !options.subject || (!options.html && !options.text)) {
      throw new Error('Missing required email options: to, subject, and html/text content');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(options.to)) {
      throw new Error('Invalid recipient email address');
    }

    // Check for required environment variables
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      throw new Error('SMTP credentials not configured in environment variables');
    }

    // Create transporter with better configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      // Better connection handling
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      // Timeout settings
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 30000, // 30 seconds
      // Debugging (enable in development)
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development',
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');

    // Email message configuration
    const message = {
      from: {
        name: process.env.FROM_NAME || 'LMS Platform',
        address: process.env.FROM_EMAIL || process.env.SMTP_EMAIL
      },
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Auto-generate text from HTML
      // Additional headers for better deliverability
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      },
      // Attachments if provided
      attachments: options.attachments || []
    };

    console.log(`📧 Attempting to send email to: ${options.to}`);
    console.log(`📝 Subject: ${options.subject}`);

    // Send email
    const info = await transporter.sendMail(message);
    
    console.log('✅ Email sent successfully!');
    console.log('📨 Message ID:', info.messageId);
    console.log('👤 Recipient:', info.accepted.join(', '));
    
    if (info.rejected.length > 0) {
      console.warn('⚠️ Rejected recipients:', info.rejected);
    }

    return {
      success: true,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    };

  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    
    // More specific error messages
    let errorMessage = 'Email could not be sent';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'SMTP authentication failed. Check your email credentials.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Could not connect to SMTP server. Check your network and SMTP settings.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'SMTP connection timed out.';
    } else if (error.message.includes('Invalid login')) {
      errorMessage = 'Invalid SMTP credentials. Please check your email and password.';
    }

    throw new Error(errorMessage);
  }
};

module.exports = sendEmail;