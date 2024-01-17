const express = require('express');
const router = express.Router();

module.exports = function(pool, addUtenteInformation, updateUtenteAndResidencia) {
  // Log that the router is connected
  console.log('New Request Router is connected!');

  router.get('/', (req, res) => {  
    console.log(req.session); 
    res.render('autenticated_utente/editUserDetails', { userName: req.session.userName });
  });

  router.post('/', async (req, res) => {  
    try {
      await pool.query('BEGIN');

      // Access userEmail and userName from the session
      const userEmail = req.session.userEmail;
      const userName = req.session.userName;

      // Fetch user ID using the PostgreSQL function
      const queryTextUserID = 'SELECT FindUtenteIDByEmail($1) as utenteid';
      const userIDResult = await pool.query(queryTextUserID, [userEmail]);
      const utenteID = userIDResult.rows[0].utenteid;

      const { 
        nomeUtente, niss, cc, localidadeEmissaoDSIC, dataEmissaoDSIC, dataValidadeCC,
        nif, dataNascimento, freguesiaNaturalidade, concelhoNaturalidade, paisNaturalidade, cartaoResidencia,
        previamenteSubmetidoAJM, phoneNumber, p_RuaResidencia, p_DistritoResidencia, p_FreguesiaResidencia,
        p_ConcelhoResidencia, p_CodigoPostalCP
      } = req.body;

      // Format the date fields (if needed)
      const formattedDataEmissaoDSIC = formatDate(req.body.dataEmissaoDSIC);
      const formattedDataValidadeCC = formatDate(req.body.dataValidadeCC);
      const formattedDataNascimento = formatDate(req.body.dataNascimento);

      console.log('formattedDataEmissaoDSIC:', formattedDataEmissaoDSIC);
      console.log('formattedDataValidadeCC:', formattedDataValidadeCC);
      console.log('formattedDataNascimento:', formattedDataNascimento);
      console.log('Request body:', req.body);
      
      // Call the updateUtenteAndResidencia function with formatted dates
      await pool.query(
        'SELECT update_utente_and_residencia($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)',
        [
          utenteID, 
          nomeUtente, 
          niss, 
          cc, 
          localidadeEmissaoDSIC, 
          formattedDataEmissaoDSIC, 
          formattedDataValidadeCC, 
          nif,
          formattedDataNascimento, 
          freguesiaNaturalidade, 
          concelhoNaturalidade, 
          paisNaturalidade, 
          cartaoResidencia,
          previamenteSubmetidoAJM, 
          phoneNumber, 
          p_RuaResidencia, 
          p_DistritoResidencia, 
          p_FreguesiaResidencia,
          p_ConcelhoResidencia, 
          p_CodigoPostalCP
        ]
      );

      await pool.query('COMMIT');
      res.redirect('/homepageAutenticatedUtente');
    } catch (error) {
      await pool.query('ROLLBACK');
      console.error('Error during updating user details:', error);
      res.status(500).redirect('/errorPage');
    } finally {
      await pool.query('END');
    }
  });

  return router;
};

function formatDate(dateStr) {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    // Ensure that there are three parts (day, month, year)
    const [day, month, year] = parts;
    // Use parseInt to convert the parts to numbers
    return `${year}-${month}-${day}`;
  } else {
    // Handle invalid date format here or return null/undefined
    console.error('Invalid date format:', dateStr);
    return null;
  }
}
