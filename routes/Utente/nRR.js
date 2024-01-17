const express = require('express');
const router = express.Router();

module.exports = function(pool) {
  // Middleware to pass currentDate and efeitoOptions
  router.use(async (req, res, next) => {
    try {
      // Define currentDate here
      const currentDate = new Date().toISOString().slice(0, 10);

      // Fetch Efeito options from the database
      const queryText = 'SELECT IDEfeito, Descritivo FROM EfeitoPedido';
      const result = await pool.query(queryText);
      const efeitoOptions = result.rows;

      // Pass currentDate and efeitoOptions to the template
      res.locals.currentDate = currentDate;
      res.locals.efeitoOptions = efeitoOptions;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Define a single route handler for both GET and POST requests
  router.all('/', async (req, res) => {
    if (req.method === 'GET') {
      try {
        // Render the template with currentDate and efeitoOptions
        res.render('autenticated_utente/newRequest'), {
          currentDate: res.locals.currentDate,
           efeitoOptions: res.locals.efeitoOptions,
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    } else if (req.method === 'POST') {
      // Handle POST requests here
      try {
        // Access userEmail and userName from the session
        const userEmail = req.session.userEmail;
        const userName = req.session.userName;

        // Fetch user ID using the PostgreSQL function
        const queryTextUserID = 'SELECT FindUtenteIDByEmail($1) as utenteid';
        const userIDResult = await pool.query(queryTextUserID, [userEmail]);
        const utenteID = userIDResult.rows[0].utenteid;

        // Debug: Log utenteID, userEmail, and userName
        console.log('Utente ID:', utenteID);
        console.log('User Email:', userEmail);
        console.log('User Name:', userName);

        // Retrieve data from the request body
        const {
          p_LocalidadePedido,
          p_TeCAssinado,
          p_EfeitoIDEfeito,
        } = req.body;
        
        const teCAssinado = req.body.p_TeCAssinado === 'on'; // Convert the checkbox value to a boolean
        // Use utenteID and currentDate for p_dataPedido
        const queryTextNewRequest = `
          SELECT addPedidoAvaliacaoMedica(
            $1, $2, $3, $4, $5, true
          )`;
          const values = [
            utenteID,
            res.locals.currentDate, // Use currentDate from res.locals
            p_LocalidadePedido,
            teCAssinado, // Use the modified value
            p_EfeitoIDEfeito
          ];
        console.log('Executing SQL Query:', queryTextNewRequest);
        console.log('Values:', values);

        await pool.query(queryTextNewRequest, values);

        if (req.session.userType === 'Utente') {
          res.redirect('/homepageAutenticatedUtente');
        } else if (req.session.userType === 'Médico') {
          res.redirect('/homepageAutenticatedMédico');
        } else {
          res.status(500).send('Internal Server Error');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }
  });

  return router;
};
