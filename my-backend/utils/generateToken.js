const jwt = require('jsonwebtoken');

/**
 * Generate JWT token for user authentication
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  if (!id) {
    throw new Error('User ID is required to generate token');
  }

  if (!process.env.JWT_SECRET) {
    console.warn('⚠️  JWT_SECRET not found in environment variables. Using fallback secret.');
  }

  return jwt.sign(
    { 
      id,
      iat: Math.floor(Date.now() / 1000) // issued at
    }, 
    process.env.JWT_SECRET || 'your_super_secure_jwt_secret_key_here_change_in_production', 
    {
      expiresIn: '30d',
      issuer: 'lms-backend',
      audience: 'lms-users'
    }
  );
};

module.exports = generateToken;