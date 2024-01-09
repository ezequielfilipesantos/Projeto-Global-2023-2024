const express = require('express');
const router = express.Router();

// GET route for rendering the new request page for Utente (authenticated)
router.get('/', (req, res) => {
  res.render('autenticated_utente/newRequest');
});

module.exports = router;
