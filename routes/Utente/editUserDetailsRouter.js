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
  const { nome, niss, cc, localidadeEmissaoDSIC, dataEmissaoDSIC, dataValidadeCC, nif, dataNascimento, freguesiaNaturalidade, concelhoNaturalidade, paisNaturalidade, cartaoResidencia } = req.body;
  
  // Handle the 'previamenteSubmetidoAJM' field
  let previamenteSubmetidoAJM = req.body.previamenteSubmetidoAJM;
  if (Array.isArray(previamenteSubmetidoAJM)) {
    previamenteSubmetidoAJM = previamenteSubmetidoAJM.includes("true");
  } else {
    previamenteSubmetidoAJM = previamenteSubmetidoAJM === "true";
  }
    try {
      const updateQuery = 'UPDATE utente SET nomeutente = $2, niss = $3, cc = $4, localidadeemissãodsic = $5, dataemissãodsic = $6, datavalidadecc = $7, nif = $8, datanascimento = $9, freguesianaturalidade = $10, concelhonaturalidade = $11, paisnaturalidade = $12, cartãoresidência = $13, utentepréviamentesubmetidoajm = $14 WHERE utenteid = $1';
    await pool.query(updateQuery, [utenteID, nome, niss, cc, localidadeEmissaoDSIC, dataEmissaoDSIC, dataValidadeCC, nif, dataNascimento, freguesiaNaturalidade, concelhoNaturalidade, paisNaturalidade, cartaoResidencia, previamenteSubmetidoAJM]);
    
    res.redirect('/homepageAutenticatedUtente'); 
  } catch (error) {
    console.error('Error during updating user details:', error);
    res.status(500).redirect('/errorPage');
  }
  });

  return router;
};
