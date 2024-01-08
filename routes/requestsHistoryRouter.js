const express = require('express');
const router = express.Router();

// GET route for rendering the requests history page for Utente (authenticated)
router.get('/', (req, res) => {
  res.render('requestsHistory');
});

module.exports = router;
