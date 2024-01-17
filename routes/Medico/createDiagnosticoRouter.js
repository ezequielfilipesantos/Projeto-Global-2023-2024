// createDiagnosticRouter.js
module.exports = function (pool) {
    const express = require('express');
    const router = express.Router();
  
    // Handle GET request to render the diagnostic creation page
    router.get('/:pedidoId', (req, res) => {
      const pedidoId = req.params.pedidoId;
      res.render('autenticated_medico/createDiagnosticoPage', { pedidoId: pedidoId });
    });
  
    // Handle POST request to create a diagnostic record
    router.post('/:pedidoId', async (req, res) => {
      const pedidoId = req.params.pedidoId;
      const { diagnosticoDetails } = req.body;
  
      try {
        // Assuming you have a function to create a diagnostic record, call it here
        await createDiagnosticRecord(pedidoId, diagnosticoDetails);
  
        // Redirect to the desired page after creating the diagnostic record
        res.redirect('/autenticated_medico/viewRequestsM');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
  
    return router;
  };
  