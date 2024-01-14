// createDiagnosticRouter.js
module.exports = function(pool) {
    const express = require('express');
    const router = express.Router();

    router.get('/:pedidoId', (req, res) => {
        const pedidoId = req.params.pedidoId;
        // Replace 'createDiagnosticoPage' with your actual EJS template filename
        res.render('autenticated_medico/createDiagnosticoPage', { pedidoId: pedidoId });
    });

    return router;
};
