//editUserDetailsRouter.js
module.exports = function(pool) {
  const express = require('express');  
  const router = express.Router();

  router.get('/', (req, res) => {  
    console.log(req.session); 
    
    res.render('autenticated_utente/editUserDetails', { userName: req.session.userName });
    });

  router.post('/', async (req, res) => {  
    const utenteID = req.session.userID; 
  const { nome, niss, cc, localidadeEmissaoDSIC, dataEmissaoDSIC, dataValidadeCC, nif, dataNascimento, freguesiaNaturalidade, concelhoNaturalidade, paisNaturalidade, cartaoResidencia } = req.body;
  
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

  //IMPLEMENT HERE
  /*p_RuaResidencia,
  p_DistritoResidencia,
  p_FreguesiaResidencia,
  p_ConcelhoResidencia,
  p_CodigoPostalCP,
  p_Localidade,
  */

  return router;
};
