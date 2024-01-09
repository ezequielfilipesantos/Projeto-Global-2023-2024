const express = require('express');
const router = express.Router();

// GET route for rendering the user details editing page for Utente (authenticated)
router.get('/', (req, res) => {
  res.render('autenticated_utente/editUserDetails');
});

module.exports = router;
