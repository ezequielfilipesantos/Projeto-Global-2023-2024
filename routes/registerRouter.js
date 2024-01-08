const express = require('express');
const router = express.Router();

// GET route for rendering the registration page
router.get('/', (req, res) => {
  res.render('register');
});

module.exports = router;
