//IndexRouter.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Render the indexPage.ejs view
    res.render('indexPage');
});

module.exports = router;
