// app.js
const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');
const authMiddleware = require('./middleware/authMiddleware');
const indexRouter = require('./routes/indexRouter');
const mechanicHomepageRouter = require('./routes/mechanicHomepageRouter');
const addInterventionRouter = require('./routes/addInterventionRouter');
const searchVehicleByLicensePlateRouter = require('./routes/searchVehicleByLicensePlateRouter');
const searchVehicleByOwnerNIFRouter = require('./routes/searchVehicleByOwnerNIFRouter');
const searchOwnerByNIFRouter = require('./routes/searchOwnerByNIFRouter');

const app = express();
const port = 3000;

// Database Connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'HistoricoCarro',
    password: 'magali712',
    port: 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
        process.exit(1); // Exit the process if the database connection fails
    } else {
        console.log('Connected to the database');
        release();
    }
});

// Express Configuration
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Use the authMiddleware for all routes
app.use(authMiddleware);

// Use the new index route
app.use('/', indexRouter);

// Use the login route
const loginRouter = require('./routes/loginRouter')(pool);
app.use('/login', loginRouter);

// Use the mechanic homepage route with authMiddleware
app.use('/mechanicHomepage', mechanicHomepageRouter);

// Use the new addIntervention route
app.use('/mechanicHomepage', addInterventionRouter);

// Use the new searchVehicleByLicensePlate route
app.use('/mechanicHomepage', searchVehicleByLicensePlateRouter);

// Use the new searchVehicleByOwnerNIF route
app.use('/mechanicHomepage', searchVehicleByOwnerNIFRouter);

// Use the new searchOwnerByNIF route
app.use('/mechanicHomepage', searchOwnerByNIFRouter);

// Start the Server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
