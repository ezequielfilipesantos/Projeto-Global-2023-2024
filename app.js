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
const indexRouter = require('./routes/Public_Routes/indexRouter');
const loginRouter = require('./routes/Public_Routes/loginRouter')(pool);
const registerRouter = require('./routes/Public_Routes/registerRouter')(pool);
const editUserDetails = require('./routes/Utente/editUserDetailsRouter')(pool);
const requestsHistoryRouter = require('./routes/Utente/requestsHistoryRouter')(pool);
const authMiddleware = require('./middleware/authMiddleware');
//Medico
const homepageAutenticatedMedicoRouter = require('./routes/Medico/homepageAutenticatedMedicoRouter');/*(pool);*/
const viewRequestsMRouter = require('./routes/Medico/viewRequestsMRouter');/*(pool);*/

//JuntaMedica
const homepageAutenticatedJMRouter = require('./routes/JuntaMedica/homepageAutenticatedJMRouter');/*(pool);*/
//const viewRequestsJMRouter = require('./routes/JuntaMedica/viewRequestsJMRouter');/*(pool);*/

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

// Protected Utente
app.use('/homepageAutenticatedUtente', authMiddleware, require('./routes/Utente/homepageAutenticatedUtenteRouter'));
app.use('/newRequest', authMiddleware, require('./routes/Utente/newRequestRouter')(pool));
app.use('/editUserDetails', authMiddleware, require('./routes/Utente/editUserDetailsRouter')(pool));
//app.use('/newRequest', authMiddleware, require('./routes/Utente/newRequestRouter')(pool));
app.use('/requestsHistory', authMiddleware, require('./routes/Utente/requestsHistoryRouter')(pool));

// Protected Médico
app.use('/homepageAutenticatedMedico', authMiddleware, require('./routes/Medico/homepageAutenticatedMedicoRouter'));
app.use('/viewRequestsM', authMiddleware, require('./routes/Medico/viewRequestsMRouter'));


//Protected JuntaMédica
app.use('/homepageAutenticatedJM', authMiddleware, require('./routes/JuntaMedica/homepageAutenticatedJMRouter'));
app.use('/viewRequestsJM', authMiddleware, require('./routes/JuntaMedica/viewRequestsJMRouter'))

// Start the Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
