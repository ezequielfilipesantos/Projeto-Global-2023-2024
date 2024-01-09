const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Database Connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'juntadb',
  password: 'magali712',
  port: 5432,
});

// Session Configuration
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true } // Uncomment if using HTTPS
}));

// Express Configuration
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // Serve static files

// Import routes and middleware
const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter')(pool);
const registerRouter = require('./routes/registerRouter')(pool);
const authMiddleware = require('./middleware/authMiddleware');

// Public Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.get('/', (req, res) => {
  res.redirect('/index');
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.redirect('/'); // Or an error page
    }
    res.redirect('/login');
  });
});

// Protected Routes with Authentication Middleware
app.use('/requests', authMiddleware, require('./routes/requestsRouter'));
app.use('/editRequests', authMiddleware, require('./routes/editRequestsRouter'));

//Protected Utente
app.use('/homepageAutenticatedUtente', authMiddleware, require('./routes/homepageAutenticatedUtenteRouter'));
app.use('/newRequest', authMiddleware, require('./routes/newRequestRouter'));
app.use('/editUserDetails', authMiddleware, require('./routes/editUserDetailsRouter'));
app.use('/requestsHistory', authMiddleware, require('./routes/requestsHistoryRouter'));


// Start the Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
