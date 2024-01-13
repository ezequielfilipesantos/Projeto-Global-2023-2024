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
      // Join UtenteLogin and Utente tables to get UtenteID
      let query = `
        SELECT ul.Email, ul.Password, u.UtenteID 
        FROM UtenteLogin ul
        JOIN Utente u ON ul.UtenteUtenteID = u.UtenteID
        WHERE ul.Email = $1
      `;
      let result = await pool.query(query, [email]);

      if (result.rows.length > 0) {
        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", passwordMatch);

        if (passwordMatch) {
          req.session.isAuthenticated = true;
          req.session.userType = 'Utente'; // Assuming the user is of type 'Utente'
          req.session.userID = user.utenteid;
          console.log("Session userID after login:", req.session.userID);

          res.redirect('/homepageAutenticatedUtente');
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
