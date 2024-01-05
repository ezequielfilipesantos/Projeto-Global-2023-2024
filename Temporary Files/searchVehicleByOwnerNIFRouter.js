// searchVehicleByOwnerNIFRouter.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'HistoricoCarro',
    password: 'magali712',
    port: 5432,
});

// GET route to render the Search Vehicle by Owner NIF page
router.get('/search-vehicle-by-owner-nif', authMiddleware, (req, res) => {
    res.render('searchVehicleByOwnerNIF', { vehicleInfo: null });
});

// POST route to handle the form submission for searching vehicles by owner NIF
router.post('/search-vehicle-by-owner-nif', authMiddleware, async (req, res) => {
    const { ownerNIF } = req.body;

    try {
        const result = await pool.query({
            text: 'SELECT v.vehicle_id, v.make, v.model, v.year, v.license_plate, v.vin, v.imported_vehicle, v.owner_id FROM Vehicle v INNER JOIN public.person p ON v.owner_id = p.person_id WHERE p.nif = $1',
            values: [ownerNIF],
        });

        const vehicleInfo = result.rows[0]; // Assuming only one vehicle is returned

        // Render the same page with the vehicle information
        res.render('searchVehicleByOwnerNIF', { vehicleInfo });
    } catch (error) {
        console.error('Error searching vehicle by owner NIF:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
