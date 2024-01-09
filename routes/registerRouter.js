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
    const { name, email, password } = req.body;
    console.log("Received registration data:", req.body);

    try {
      // Check if the user already exists in the UtenteLogin table
      const result = await pool.query('SELECT * FROM utentelogin WHERE email = $1', [email]);

      if (result.rows.length > 0) {
        res.render('register', { error: 'User with this email already exists' });
      } else {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Call the database function to create a new user and get the user ID
        const newUserID = await pool.query('SELECT create_new_user_login($1, $2, $3)', [name, email, hashedPassword]);

        req.session.isAuthenticated = true;
        req.session.userType = 'Utente';
        res.redirect('/index');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).render('errorPage', { error: 'Internal Server Error' }); // Ensure this view exists
    }
  });

  return router;
};
