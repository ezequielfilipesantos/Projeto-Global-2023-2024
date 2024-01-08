const express = require('express');
const router = express.Router();

// GET route for rendering the index page
router.get('/index', (req, res) => {
  res.render('index');
});

module.exports = router;
