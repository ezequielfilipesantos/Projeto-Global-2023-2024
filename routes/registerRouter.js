const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// GET route for rendering the registration page
router.get('/', (req, res) => {
  res.render('register');
});

// POST route for handling registration
router.post('/', async (req, res) => {
  const { name, email, password, userType, specialty } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  try {
    if (userType === 'Utente') {
      // Insert into UtenteIdentificação and UtenteLogin
      const utenteResult = await pool.query(
        'INSERT INTO UtenteIdentificação (NomeUtente) VALUES ($1) RETURNING UtenteID', 
        [name]
      );
      const utenteId = utenteResult.rows[0].utenteid;

      await pool.query(
        'INSERT INTO UtenteLogin (Email, Password, UtenteIdentificaçãoUtenteID) VALUES ($1, $2, $3)', 
        [email, hashedPassword, utenteId]
      );
    } else if (userType === 'Médico') {
      // Insert into MédicoIdentificação and MédicoLogin
      const medicoResult = await pool.query(
        'INSERT INTO MédicoIdentificação (NomeMedico, Especialidade) VALUES ($1, $2) RETURNING MedicoID', 
        [name, specialty]
      );
      const medicoId = medicoResult.rows[0].medicoid;

      await pool.query(
        'INSERT INTO MédicoLogin ("E-Mail", Password, MedicoMedicoID) VALUES ($1, $2, $3)', 
        [email, hashedPassword, medicoId]
      );
    }

    // Redirect to the login page after successful registration
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).render('errorPage', { error: 'Internal Server Error' });
  }
});

module.exports = router;
