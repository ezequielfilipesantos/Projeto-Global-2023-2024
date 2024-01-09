const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('autenticated_utente/homepageAutenticatedUtente');
});

module.exports = router;
