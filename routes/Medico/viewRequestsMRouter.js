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
                SELECT *
                FROM PedidoAvaliaçãoMédica
                WHERE PedidoEnviadoParaJuntaMédica = FALSE
                ORDER BY datapedido ASC; -- Order by datapedido in ascending order
            `;

            const { rows } = await pool.query(queryText);
            res.render('autenticated_medico/viewRequestsM', { pedidoAvaliacaoMedicaRecords: rows, userName: req.session.userName });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
};

