const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = function (pool) {
  router.get('/', (req, res) => {
    res.render('public_views/user_logic/login');
  });

  router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log("Received login request:", req.body);

    try {
      let user = null;
      let userType = '';

      let result = await pool.query('SELECT * FROM utentelogin WHERE Email = $1', [email]);

      if (result.rows.length > 0) {
        user = result.rows[0];
        userType = 'Utente';

        const utenteQuery = 'SELECT UtenteID, nomeUtente FROM Utente WHERE UtenteID = $1';
        const utenteResult = await pool.query(utenteQuery, [user.UtenteUtenteID]);

        if (utenteResult.rows.length > 0) {
          const { UtenteID, nomeUtente } = utenteResult.rows[0];
          req.session.userName = nomeUtente;
          req.session.userID = UtenteID; 
        }

        const query = 'SELECT UtenteUtenteID FROM utentelogin WHERE Email = $1';
        const { rows } = await pool.query(query, [email]);

        if (rows.length > 0) {
          req.session.userEmail = email; 
          console.log("UtenteUtenteID:", req.session.userID);
        } else {
          console.log("No data found for the email:", email);
        }
      } else {
        result = await pool.query('SELECT * FROM médicologin WHERE "E-Mail" = $1', [email]);
        if (result.rows.length > 0) {
          user = result.rows[0];
          userType = 'Médico';
          req.session.userEmail = email; 
        }
      }

      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", passwordMatch); 

        if (passwordMatch) {
          req.session.isAuthenticated = true;
          req.session.userType = userType;

          if (userType === 'Utente') {
            res.redirect('/homepageAutenticatedUtente');
          } else if (userType === 'Médico') {
            res.redirect('/homepageAutenticatedMedico');
          }

          return; 
        }
      }

      res.render('public_views/user_logic/login', { error: 'Incorrect credentials' });

    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).render('errorPage', { error: 'Internal Server Error' });
    }
  });

  return router;
};
