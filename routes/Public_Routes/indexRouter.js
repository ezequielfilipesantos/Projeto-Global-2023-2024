const express = require('express');
const router = express.Router();

router.get('/index', (req, res) => {
  res.render('public_views/user_logic/index');
});

module.exports = router;
