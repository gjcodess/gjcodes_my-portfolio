/**
 * Contact form submission handler
 * Currently logs to console. Ready for email/DB integration.
 */
const handleContactSubmission = (req, res) => {
  const { name, email, message } = req.body;

  // Log submission
  console.log('\n  ── New Contact Submission ──');
  console.log(`  Name:    ${name}`);
  console.log(`  Email:   ${email}`);
  console.log(`  Message: ${message}`);
  console.log(`  Time:    ${new Date().toISOString()}`);
  console.log('  ────────────────────────────\n');

  // TODO: Add email sending with nodemailer
  // TODO: Add database storage

  res.status(200).json({
    success: true,
    message: 'Message received! I\'ll get back to you soon.',
  });
};

module.exports = { handleContactSubmission };
