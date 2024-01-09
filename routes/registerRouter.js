const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = function (pool) {
  // GET route for rendering the registration view
  router.get('/', (req, res) => {
    res.render('public_views/user_logic/register'); // Render the registration view
  });

  // POST route for handling registration
  router.post('/', async (req, res) => {
    const { nomeutente, nif, email, password } = req.body; // Corrected to match the form field names

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 255);

      // Check if the user already exists in the UtenteLogin table
      const userExistsResult = await pool.query('SELECT * FROM utentelogin WHERE email = $1', [email]);

      if (userExistsResult.rows.length > 0) {
        res.render('public_views/user_logic/register', { error: 'User with this email already exists' });
      } else {
        // Call the database function to create a new user and get the user ID
        const newUserResult = await pool.query(
          'SELECT create_new_user_login($1, $2, $3, $4)', 
          [nomeutente, parseInt(nif, 10), email, hashedPassword] // Parse nif as integer
        );
        const newUserID = newUserResult.rows[0].create_new_user_login;

        if (newUserID) {
          req.session.isAuthenticated = true;
          req.session.userType = 'Utente';
          req.session.userID = newUserID; // Store the new user's ID in the session
          res.redirect('/index');
        } else {
          res.render('public_views/user_logic/register', { error: 'Registration failed' });
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).render('public_views/user_logic/errorPage', { error: 'Internal Server Error' });
    }
  });

  return router;
};
