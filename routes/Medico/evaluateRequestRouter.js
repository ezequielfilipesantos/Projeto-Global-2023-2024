// evaluateRouter.js
module.exports = function(pool) {
    const express = require('express');
    const router = express.Router();

    router.get('/:pedidoId', (req, res) => {
        const pedidoId = req.params.pedidoId;
        res.render('/evaluatePage', { pedidoId: pedidoId });
    });

    // Handle POST request to submit the evaluation form
    router.post('/:pedidoId', async (req, res) => {
        const pedidoId = req.params.pedidoId;
        const { detalhesAvaliacao, grauIncapacidade, dataAvaliacao, coeficiente, desvalorizacao, capacidadeRestante } = req.body;

        // Call the PostgreSQL function to insert data
        try {
            const queryText = `
                SELECT insert_avaliacao_condicao($1, $2, $3, $4, $5, $6, $7);
            `;
            const values = [detalhesAvaliacao, grauIncapacidade, dataAvaliacao, pedidoId, coeficiente, desvalorizacao, capacidadeRestante];

            await pool.query(queryText, values);

            res.redirect('/autenticated_medico/viewRequestsM'); // Redirect to the desired page after submission
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
};
