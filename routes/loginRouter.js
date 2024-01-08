// routes/loginRouter.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = function(pool) {
  // GET route for rendering login view
  router.get('/', (req, res) => {
    res.render('loginPage');
  });

  // POST route for handling login
  router.post('/', async (req, res) => {
    const { email, password } = req.body; // Use email instead of username

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]); // Use email instead of username

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
          res.send('Incorrect password');
        }
      } else {
        // User not found
        res.send('User not found');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  });

  return router;
};
