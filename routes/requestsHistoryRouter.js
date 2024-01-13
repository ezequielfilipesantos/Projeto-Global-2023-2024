const express = require('express');
const router = express.Router();

// Export a function that takes the pool object as an argument
module.exports = function(pool) {
    const router = express.Router();

    // Define a route for displaying Pedido Avaliação Médica history
    router.get('/', async (req, res) => {
        try {
            const utenteID = req.session.userID; // Get the UtenteID from the session

            const queryText = `
                SELECT *
                FROM PedidoAvaliaçãoMédica
                WHERE UtenteUtenteID = $1
                ORDER BY datapedido DESC;
            `;

            const { rows } = await pool.query(queryText, [utenteID]);
            res.render('autenticated_utente/requestsHistory', { pedidoAvaliacaoMedicaRecords: rows });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
};
