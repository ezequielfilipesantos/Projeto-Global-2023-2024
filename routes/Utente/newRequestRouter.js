//newRequestRouter.js
const express = require('express');
const router = express.Router();

module.exports = function (pool) {
  router.get('/', (req, res) => {
    res.render('autenticated_utente/newRequest', { userName: req.session.userName });
    });

  router.post('/', async (req, res) => {
    try {
      const {
        p_UtenteID,
        p_dataPedido,
        p_LocalidadePedido,
        p_TeCAssinado,
        p_EfeitoIDEfeito,
        p_EstadoIDEstado,
        p_RuaResidencia,
        p_DistritoResidencia,
        p_FreguesiaResidencia,
        p_ConcelhoResidencia,
        p_CodigoPostalCP,
        p_Localidade,
      } = req.body;

      const queryText = `
        SELECT addPedidoAvaliacaoMedica(
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        )`;
      const values = [
        p_UtenteID,
        p_dataPedido,
        p_LocalidadePedido,
        p_TeCAssinado,
        p_EfeitoIDEfeito,
        p_EstadoIDEstado,
        p_RuaResidencia,
        p_DistritoResidencia,
        p_FreguesiaResidencia,
        p_ConcelhoResidencia,
        p_CodigoPostalCP,
        p_Localidade,
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
