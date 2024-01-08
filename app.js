//app.js
const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

// Database Connection

const pool = new Pool({
  user: 'postgres', // Correct the database user
  host: 'localhost',
  database: 'juntadb',
  password: 'magali712',
  port: 5432,
});

// Session Configuration
app.use(session({
    secret: 'your-secret-key',
    resave: false, // Set to false to avoid session save on every request
    saveUninitialized: true,
  }));

// Express Configuration
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({s extended: true }));
app.use(express.static('public'));

// Routes
const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter');//(pool); // Pass the database pool to loginRouter
const registerRouter = require('./routes/registerRouter');//(pool); // Pass the database pool to registerRouter

const requestsHistoryRouter = require('./routes/requestsHistoryRouter');
const newRequestRouter = require('./routes/newRequestRouter');
const editUserDetailsRouter = require('./routes/editUserDetailsRouter');
const requestsRouter = require('./routes/requestsRouter');
const editRequestsRouter = require('./routes/editRequestsRouter');

// Use Authentication Middleware for Protected Routes
app.use(authMiddleware);

// Mount Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use('/requestsHistory', requestsHistoryRouter);
app.use('/newRequest', newRequestRouter);
app.use('/editUserDetails', editUserDetailsRouter);
app.use('/requests', requestsRouter);
app.use('/editRequests', editRequestsRouter);

// Start the Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
