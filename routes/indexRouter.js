const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Render the index.ejs view
    res.render('index');
});

module.exports = router;
