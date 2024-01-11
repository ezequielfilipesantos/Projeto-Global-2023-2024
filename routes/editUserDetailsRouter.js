module.exports = function(pool) {
  const express = require('express'); // Require express here
  
  const router = express.Router();

  // GET route for rendering the user details editing page
  router.get('/editUserDetails', (req, res) => {
    console.log(req.session); // This will show you the session details
    res.render('editUserDetails'); // The .ejs file name
    
  });

  // POST route for submitting personal info
  router.post('/editUserDetails', async (req, res) => {
    const utenteID = req.session.userID; // Get the user ID from the session
  
    // Extract data from the request body
    const { nome, niss, cc, localidadeEmissaoDSIC, dataEmissaoDSIC, dataValidadeCC, nif, dataNascimento, freguesiaNaturalidade, concelhoNaturalidade, paisNaturalidade, cartaoResidencia, previamenteSubmetidoAJM } = req.body;
  
    try {
      // Call the PostgreSQL function
      await pool.query('CALL update_personal_info_utente($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', [utenteID, nome, niss, cc, localidadeEmissaoDSIC, dataEmissaoDSIC, dataValidadeCC, nif, dataNascimento, freguesiaNaturalidade, concelhoNaturalidade, paisNaturalidade, cartaoResidencia, previamenteSubmetidoAJM]);
      res.redirect('/homepageAutenticatedUtente'); // Redirect after successful update
    } catch (error) {
      console.error('Error during updating user details:', error);
      res.status(500).redirect('/errorPage');
    }
  });

  return router;
};
