const express = require('express');
const router = express.Router();

// GET route for rendering the new request page for Utente (authenticated)
router.get('/', (req, res) => {
  res.render('newRequest');
});

module.exports = router;
