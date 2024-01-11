//homepageAuthenticatedUtenteRouter.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const userID = req.session.userID;
  res.render('autenticated_utente/homepageAutenticatedUtente', { userID: userID });
});

module.exports = router;
