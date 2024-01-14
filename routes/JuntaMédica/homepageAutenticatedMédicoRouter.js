const express = require('express');
const router = express.Router();

// GET route for rendering the request editing page for Médico (authenticated)
router.get('/', (req, res) => {
  res.render('medical_staff/editRequests');
});

module.exports = router;
