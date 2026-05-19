const express = require('express');
const router = express.Router();
const { handleContactSubmission } = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');

// POST /api/contact — Submit contact form
router.post('/', validateContact, handleContactSubmission);

module.exports = router;
