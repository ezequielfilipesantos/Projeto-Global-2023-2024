const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('homepageAutenticatedUtente');
});

module.exports = router;
