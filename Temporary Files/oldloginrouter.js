// routes/loginRouter.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = function(pool) {
  // GET route for rendering the login view
  router.get('/', (req, res) => {
    res.render('loginPage');
  });

  // POST route for handling login
  router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the user exists in the database
      const result = await pool.query('SELECT * FROM utentelogin WHERE email = $1', [email]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (passwordMatch) {
          // Successful login
          req.session.isAuthenticated = true;

          // Redirect to indexPage if authentication is successful
          res.redirect('/indexPage');
        } else {
          // Incorrect password
          res.render('loginPage', { error: 'Incorrect password' });
        }
      } else {
        // User not found
        res.render('loginPage', { error: 'User not found' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).render('errorPage', { error: 'Internal Server Error' });
    }
  });

  return router;
};
