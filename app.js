const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'juntadb',
  password: 'magali712',
  port: 5432,
});

//LIGAÇÃO PARA INTEGRAÇÃO DO RNU
const secondaryDBPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rnu',
  password: 'magali712',
  port: 5432,
});

app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: true,
}));

app.use('/protectedRoute', (req, res, next) => {
  const userName = req.session.userName;
  const userID = req.session.userID;
  const userEmail = req.session.userEmail;
  next(); 
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); 

const indexRouter = require('./routes/Public_Routes/indexRouter');
const loginRouter = require('./routes/Public_Routes/loginRouter')(pool);
const registerRouter = require('./routes/Public_Routes/registerRouter')(pool, secondaryDBPool);
const editUserDetails = require('./routes/Utente/editUserDetailsRouter')(pool);
const requestsHistoryRouter = require('./routes/Utente/requestsHistoryRouter')(pool);
const newRequestRouter = require('./routes/Utente/newRequestRouter')(pool);

const authMiddleware = require('./middleware/authMiddleware');

// Medico
const homepageAutenticatedMedicoRouter = require('./routes/Medico/homepageAutenticatedMedicoRouter');
const viewRequestsMRouter = require('./routes/Medico/viewRequestsMRouter')(pool);
const evaluateRequest = require('./routes/Medico/evaluateRequest')(pool);
const createDiagnostico = require('./routes/Medico/createDiagnostico')(pool);

// JuntaMedica
const homepageAutenticatedJMRouter = require('./routes/JuntaMedica/homepageAutenticatedJMRouter');
// const viewRequestsJMRouter = require('./routes/JuntaMedica/viewRequestsJMRouter');

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
app.use('/requestsHistory', authMiddleware, require('./routes/Utente/requestsHistoryRouter')(pool));

// Protected Médico
app.use('/homepageAutenticatedMedico', authMiddleware, homepageAutenticatedMedicoRouter);
app.use('/viewRequestsM', authMiddleware, viewRequestsMRouter);
app.use('/evaluateRequest', authMiddleware, evaluateRequest);
app.use('/createDiagnostico', authMiddleware, createDiagnostico);

// Protected JuntaMédica
app.use('/homepageAutenticatedJM', authMiddleware, homepageAutenticatedJMRouter);
// app.use('/viewRequestsJM', authMiddleware, viewRequestsJMRouter);

// Start the Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
