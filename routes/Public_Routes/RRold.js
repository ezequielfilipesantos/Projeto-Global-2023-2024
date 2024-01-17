const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = function (pool) {
  router.get('/', (req, res) => {
    res.render('public_views/user_logic/register'); 
  });

  router.post('/', async (req, res) => {
    const { nomeutente, nif, email, password } = req.body;
  
    try {
      //HASH
      const hashedPassword = await bcrypt.hash(password, 12);
      const userExistsResult = await pool.query('SELECT * FROM utentelogin WHERE email = $1', [email]);
  
      if (userExistsResult.rows.length > 0) {
        res.render('public_views/user_logic/register', { error: 'User with this email already exists' });
      } else {
        const newUserResult = await pool.query(
          'SELECT create_new_user_login($1, $2, $3, $4)', 
          [nomeutente, nif, email, hashedPassword] 
        );
        const newUserID = newUserResult.rows[0].create_new_user_login;
  
        if (newUserID) {
          req.session.isAuthenticated = true;
          req.session.userType = 'Utente';
          req.session.userID = newUserID; 
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
