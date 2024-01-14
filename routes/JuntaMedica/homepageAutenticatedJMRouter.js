//homepageAutenticatedUtenteRouter.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const userID = req.session.userID;
  
  res.render('autenticated_junta_medica/homepageAutenticatedJM', { req: req, userID: userID, userName: req.session.userName});
});

module.exports = router;
