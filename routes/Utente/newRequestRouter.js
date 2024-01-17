const express = require('express');
const router = express.Router();

module.exports = function(pool) {

  router.use(async (req, res, next) => {
    try {
      const currentDate = new Date().toISOString().slice(0, 10);

      const queryText = 'SELECT IDEfeito, Descritivo FROM EfeitoPedido';
      const result = await pool.query(queryText);
      const efeitoOptions = result.rows;

      res.locals.currentDate = currentDate;
      res.locals.efeitoOptions = efeitoOptions;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro do Servidor');
    }
  });

  router.all('/', async (req, res) => {
    if (req.method === 'GET') {
      try {
        res.render('autenticated_utente/newRequest'), {
          currentDate: res.locals.currentDate,
          efeitoOptions: res.locals.efeitoOptions,
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    } else if (req.method === 'POST') {
      try {
        const userEmail = req.session.userEmail;
        const userName = req.session.userName;

        const queryTextUserID = 'SELECT FindUtenteIDByEmail($1) as utenteid';
        const userIDResult = await pool.query(queryTextUserID, [userEmail]);
        const utenteID = userIDResult.rows[0].utenteid;

        console.log('Utente ID:', utenteID);
        console.log('User Email:', userEmail);
        console.log('User Name:', userName);

        const {
          p_LocalidadePedido,
          p_TeCAssinado,
          p_EfeitoIDEfeito,
        } = req.body;

        const teCAssinado = req.body.p_TeCAssinado === 'on'; 
        const queryTextNewRequest = `
          SELECT addPedidoAvaliacaoMedica(
            $1, $2, $3, $4, $5, true
          )`;
        const values = [
          utenteID,
          res.locals.currentDate, 
          p_LocalidadePedido,
          teCAssinado, 
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
