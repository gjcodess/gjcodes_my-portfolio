/**
 * Validation middleware for contact form
 */
const validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else {
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }
  }

  if (!message || message.trim().length === 0) {
    errors.push('Message is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Sanitize
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.message = message.trim();

  next();
};

module.exports = { validateContact };
