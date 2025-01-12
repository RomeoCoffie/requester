const { body, validationResult } = require('express-validator');

const submissionValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens and apostrophes'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  
  body('whatsapp')
    .trim()
    .matches(/^\+?[\d\s-]{10,}$/)
    .withMessage('Please enter a valid WhatsApp number with at least 10 digits'),
  
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ max: 255 })
    .withMessage('Location must not exceed 255 characters'),
  
  body('propertyNeed')
    .trim()
    .notEmpty()
    .withMessage('Property need is required')
    .isLength({ max: 255 })
    .withMessage('Property need must not exceed 255 characters'),
  
  body('about')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Please provide between 10 and 1000 characters about yourself'),
  
  body('need')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Please provide between 10 and 1000 characters about your need'),
  
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['Active', 'Under Review', 'Completed', 'Cancelled'])
    .withMessage('Invalid status value')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  submissionValidation,
  validate
}; 