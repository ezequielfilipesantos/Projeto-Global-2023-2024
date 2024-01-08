const express = require('express');
const router = express.Router();

// GET route for rendering the registration page
router.get('/', (req, res) => {
  res.render('register');
});

// POST route for handling registration
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Insert the user's registration data into the utentelogin table without hashing the password
    const result = await pool.query('INSERT INTO utentelogin ("E-Mail", "Password") VALUES ($1, $2) RETURNING *', [email, password]);

    if (result.rows.length > 0) {
      // Registration successful
      req.session.isAuthenticated = true;

      // Redirect to the desired page after successful registration
      res.redirect('/indexPage');
    } else {
      // Registration failed
      res.render('register', { error: 'Registration failed' });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).render('errorPage', { error: 'Internal Server Error' });
  }
});

module.exports = router;
