const express = require('express');
const router = express.Router();

// GET route for rendering the initial page when the user is not authenticated
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
