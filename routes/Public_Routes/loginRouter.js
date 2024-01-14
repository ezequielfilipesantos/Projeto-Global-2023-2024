// loginRouter.js
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
      let result = await pool.query('SELECT * FROM utentelogin WHERE email = $1', [email]);
      let user = null;
      let userType = '';

      if (result.rows.length > 0) {
        user = result.rows[0];
        userType = 'Utente';
      } else {
        result = await pool.query('SELECT * FROM médicologin WHERE "E-Mail" = $1', [email]);
        if (result.rows.length > 0) {
          user = result.rows[0];
          userType = 'Médico';
        }
      }

      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", passwordMatch); // DEBUG

        if (passwordMatch) {
          req.session.isAuthenticated = true;
          req.session.userType = userType;

          if (userType === 'Utente') {
            req.session.userID = user.UtenteID;
            const query = 'SELECT nomeUtente FROM utente WHERE UtenteID = $1';
            const { rows } = await pool.query(query, [user.UtenteID]);

            if (rows.length > 0) {
              req.session.userName = rows[0].nomeUtente;
            }

            res.redirect('/homepageAutenticatedUtente');
          } else if (userType === 'Médico') {
            req.session.userID = user.MedicoMedicoID;
            const query = 'SELECT NomeMedico FROM Médico WHERE MedicoID = $1';
            const { rows } = await pool.query(query, [user.MedicoMedicoID]);

            if (rows.length > 0) {
              req.session.userName = rows[0].NomeMedico;
            }

            res.redirect('/homepageAutenticatedMedico'); 
          }
        } else {
          res.render('public_views/user_logic/login', { error: 'Incorrect password' });
        }
      } else {
        res.render('public_views/user_logic/login', { error: 'User not found' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).render('errorPage', { error: 'Internal Server Error' }); 
    }
  });

  return router;
};
