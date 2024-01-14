//editUserDetailsRouter.js
module.exports = function(pool) {
  const express = require('express');  
  const router = express.Router();

  // GET route for rendering the user details editing page
  router.get('/', (req, res) => {  // This will handle "/editUserDetails" due to how it's mounted in app.js
    console.log(req.session); 
    
    res.render('autenticated_utente/editUserDetails', { userName: req.session.userName });
    });

  // POST route for submitting personal info
  router.post('/', async (req, res) => {  // This will handle form submissions to "/editUserDetails"
    const utenteID = req.session.userID; 

    const { nome, niss, cc, localidadeEmissaoDSIC, dataEmissaoDSIC, dataValidadeCC, nif, dataNascimento, freguesiaNaturalidade, concelhoNaturalidade, paisNaturalidade, cartaoResidencia, previamenteSubmetidoAJM } = req.body;
  
    try {
      await pool.query('SELECT update_personal_info_utente($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', [utenteID, nome, niss, cc, localidadeEmissaoDSIC, dataEmissaoDSIC, dataValidadeCC, nif, dataNascimento, freguesiaNaturalidade, concelhoNaturalidade, paisNaturalidade, cartaoResidencia, previamenteSubmetidoAJM]);
      res.redirect('/homepageAutenticatedUtente'); 
    } catch (error) {
      console.error('Error during updating user details:', error);
      res.status(500).redirect('/errorPage');
    }
  });

  return router;
};
