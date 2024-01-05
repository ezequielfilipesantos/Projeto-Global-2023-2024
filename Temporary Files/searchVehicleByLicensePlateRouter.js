// searchVehicleByLicensePlateRouter.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// GET route to render the Search Vehicle by License Plate page
router.get('/search-vehicle-by-license-plate', authMiddleware, (req, res) => {
    res.render('searchVehicleByLicensePlate');
});

// POST route to handle the form submission for searching vehicles by license plate
router.post('/search-vehicle-by-license-plate', authMiddleware, async (req, res) => {
    // Extract form data from req.body and call the corresponding database function
    try {
        // Call your database function to search vehicle by license plate
        // Example: const result = await db.searchVehicleByLicensePlate(req.body.licensePlate);
        // Handle the result accordingly
        res.send('Vehicle found successfully!');
    } catch (error) {
        console.error('Error searching vehicle by license plate:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
