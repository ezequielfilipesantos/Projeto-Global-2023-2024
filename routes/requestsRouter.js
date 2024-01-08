const express = require('express');
const router = express.Router();

// GET route for rendering the requests page for Médico (authenticated)
router.get('/', (req, res) => {
  res.render('requests');
});

module.exports = router;
