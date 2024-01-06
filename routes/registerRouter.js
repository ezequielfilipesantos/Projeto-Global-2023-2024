// routes/registerRouter.js
const express = require('express');
const router = express.Router();

// Route for registerPage1
router.get('/registerPage1', (req, res) => {
    res.render('registerPage1'); // Render the registerPage1.ejs template
});

// Route for registerPage2
router.get('/registerPage2', (req, res) => {
    res.render('registerPage2'); // Render the registerPage2.ejs template
});

module.exports = router;
