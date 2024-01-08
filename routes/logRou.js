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
    console.log("Query result:", result.rows);
    console.log("Received login request:", req.body);

    req.session.isAuthenticated = true;
    req.session.userType = 'Test';
    return res.redirect('/indexPage');

    try {
      // Check if the user exists in the UtenteLogin table
      let result = await pool.query('SELECT * FROM utentelogin WHERE email = $1', [email]);
      let user = null;
      let userType = '';

      if (result.rows.length > 0) {
        user = result.rows[0];5
        userType = 'Utente';

      } 
      /*
      else {
        result = await pool.query('SELECT * FROM médicologin WHERE "E-Mail" = $1', [email]);
        if (result.rows.length > 0) {
          user = result.rows[0];
          userType = 'Médico';
        }
      }
      */

      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          req.session.isAuthenticated = true;
          req.session.userType = userType;
          res.redirect('/index'); // Ensure this route exists
        } else {
          res.render('login', { error: 'Incorrect password' });
        }
      } else {
        res.render('login', { error: 'User not found' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).render('errorPage', { error: 'Internal Server Error' }); // Ensure this view exists
    }
  });

  return router;
};
