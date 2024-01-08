// routes/indexRouter.js
const express = require('express');
const router = express.Router();

// Define a route for the index page
router.get('/', (req, res) => {
  // Render the indexPage.ejs view
  res.render('indexPage');
});

module.exports = router;
