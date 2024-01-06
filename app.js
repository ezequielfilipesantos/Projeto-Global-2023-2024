// app.js
const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');
const authMiddleware = require('./middleware/authMiddleware');
const indexRouter = require('./routes/indexRouter');
const registerRouter = require('./routes/registerRouter'); // Import the registerRouter
const loginRouter = require('./routes/loginRouter'); // Import the loginRouter

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

// Define routes

// Login Page
app.use(loginRouter); // Mount the loginRouter

// Use the registerRouter for the /registerPage1 and /registerPage2 routes
app.use(registerRouter);

// Index Page (using indexRouter with authMiddleware)
app.use('/indexPage', indexRouter);

// Start the Server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});