//requestsHistoryRouter.js
const express = require('express');
const router = express.Router();

// Export a function that takes the pool object as an argument
module.exports = function(pool) {
    const router = express.Router();

    // Define a route for displaying Pedido Avaliação Médica history
    router.get('/', async (req, res) => {
        try {
            const queryText = `
            SELECT 
                pm.*,
                u.NomeUtente,
                u.NISS,
                u.CC,
                d.Documento
            FROM PedidoAvaliaçãoMédica pm
            JOIN Utente u ON pm.UtenteUtenteID = u.UtenteID
            LEFT JOIN Documentos d ON pm.UtenteUtenteID = d.PedidoAvaliaçãoMédicaUtenteUtenteID
            WHERE pm.PedidoEnviadoParaJuntaMédica = FALSE;
            `;
    
            const { rows } = await pool.query(queryText); // No need for parameters here
            res.render('autenticated_medico/viewRequestsM', { pedidoAvaliacaoMedicaRecords: rows, userName: req.session.userName });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    // Define routes for evaluating and creating DiagnosticoMédico
    router.get('/evaluate/:pedidoId', (req, res) => {
        const pedidoId = req.params.pedidoId;
        // Render a page to evaluate the request with pedidoId
        res.render('autenticated_medico/evaluateRequest', { pedidoId });
    });

    router.get('/createDiagnostico/:pedidoId', (req, res) => {
        const pedidoId = req.params.pedidoId;
        // Render a page to create DiagnosticoMédico for the request with pedidoId
        res.render('autenticated_medico/createDiagnostico', { pedidoId });
    });

    return router;
};
