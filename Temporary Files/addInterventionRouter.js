// addInterventionRouter.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// GET route to render the Add Intervention page
router.get('/add-intervention', authMiddleware, (req, res) => {
    res.render('addIntervention');
});

// POST route to handle the form submission for adding interventions
router.post('/add-intervention', authMiddleware, async (req, res) => {
    // Extract form data from req.body and call the corresponding database function
    try {
        // Call your database function to add intervention
        // Example: const result = await db.addIntervention(req.body);
        // Handle the result accordingly
        res.send('Intervention added successfully!');
    } catch (error) {
        console.error('Error adding intervention:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
