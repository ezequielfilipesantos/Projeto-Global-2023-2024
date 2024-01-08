const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = function (pool) {
  // GET route for rendering the login view
  router.get('/', (req, res) => {
    res.render('login'); // Render the login view
  });

  // POST route for handling login
  router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the user exists in the UtenteLogin table
      let result = await pool.query('SELECT * FROM UtenteLogin WHERE email = $1', [email]);

      let user = null;
      let userType = '';

      if (result.rows.length > 0) {
        // Found user in UtenteLogin
        user = result.rows[0];
        userType = 'Utente';
      } else {
        // If not found, check in MédicoLogin table
        result = await pool.query('SELECT * FROM MédicoLogin WHERE "E-Mail" = $1', [email]);
        if (result.rows.length > 0) {
          user = result.rows[0];
          userType = 'Médico';
        }
      }

      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (passwordMatch) {
          // Successful login
          req.session.isAuthenticated = true;
          req.session.userType = userType; // Store the type of user

          // Redirect to indexPage if authentication is successful
          res.redirect('/indexPage');
        } else {
          // Incorrect password
          res.render('login', { error: 'Incorrect password' });
        }
      } else {
        // User not found
        res.render('login', { error: 'User not found' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).render('errorPage', { error: 'Internal Server Error' });
    }
  });

  return router;
};
