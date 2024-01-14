module.exports = function(pool) {
    const express = require('express');
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

            const { rows } = await pool.query(queryText);
            res.render('autenticated_medico/viewRequestsM', { pedidoAvaliacaoMedicaRecords: rows, userName: req.session.userName });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    // Define a route for evaluating a Pedido
    router.get('/evaluate/:pedidoId', (req, res) => {
        const pedidoId = req.params.pedidoId;
        res.render('autenticated_medico/evaluateRequest', { pedidoId });
    });

    // Define a route for creating DiagnosticoMédico
    router.get('/createDiagnostico/:pedidoId', (req, res) => {
        const pedidoId = req.params.pedidoId;
        res.render('autenticated_medico/createDiagnostico', { pedidoId });
    });

    return router;
};
