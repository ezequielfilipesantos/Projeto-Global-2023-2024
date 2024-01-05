const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Render the mechanicHomepage.ejs view
    res.render('mechanicHomepage');
});

module.exports = router;
