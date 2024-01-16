// newRequestRouter.js
const express = require('express');
const router = express.Router();

module.exports = function (pool) {
  router.get('/', async (req, res) => {
    try {
      // Fetch Efeito options from the database
      const queryText = 'SELECT IDEfeito, Descritivo FROM EfeitoPedido';
      const result = await pool.query(queryText);
      const efeitoOptions = result.rows;

      // Define currentDate here
      const currentDate = new Date().toISOString().slice(0, 10);

      res.render('autenticated_utente/newRequest', { userName: req.session.userName, efeitoOptions, currentDate });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/', async (req, res) => {
    try {
      const {
        utenteID,
        p_dataPedido,
        p_LocalidadePedido,
        p_TeCAssinado,
        p_EfeitoIDEfeito,
      } = req.body;

      const queryText = `
        SELECT addPedidoAvaliacaoMedica(
          $1, $2, $3, $4, $5, true
        )`;
      const values = [
        utenteID,
        p_dataPedido,
        p_LocalidadePedido,
        p_TeCAssinado,
        p_EfeitoIDEfeito
      ];

      await pool.query(queryText, values);

      if (req.session.userType === 'Utente') {
        res.redirect('autenticated_utente/homepageAutenticatedUtente');
      } else if (req.session.userType === 'Médico') {
        res.redirect('autenticated_medico/homepageAutenticatedMédico');
      } else {
        res.status(500).send('Internal Server Error');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
}
