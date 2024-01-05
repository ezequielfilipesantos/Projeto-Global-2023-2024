// searchOwnerByNIFRouter.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// GET route to render the Search Owner by NIF page
router.get('/search-owner-by-nif', authMiddleware, (req, res) => {
    res.render('searchOwnerByNIF');
});

// POST route to handle the form submission for searching owners by NIF
router.post('/search-owner-by-nif', authMiddleware, async (req, res) => {
    // Extract form data from req.body and call the corresponding database function
    try {
        // Call your database function to search owner by NIF
        // Example: const result = await db.searchOwnerByNIF(req.body.ownerNIF);
        // Handle the result accordingly
        res.send('Owner found successfully!');
    } catch (error) {
        console.error('Error searching owner by NIF:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
