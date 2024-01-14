//requestsHistoryRouter.js
const express = require('express');
const router = express.Router();

// Export a function that takes the pool object as an argument
module.exports = function(pool) {
    const router = express.Router();

    // Define a route for displaying Pedido Avaliação Médica history
    router.get('/', async (req, res) => {
        try {
            // Get the UtenteID from the session
            const utenteID = req.session.userID; 

            // Debug log to see the UtenteID from the session
            console.log("Debug Log - UtenteID from session:", utenteID);

            const queryText = `
                SELECT *
                FROM PedidoAvaliaçãoMédica
                WHERE UtenteUtenteID = $1
                ORDER BY datapedido DESC;
            `;

            const { rows } = await pool.query(queryText, [utenteID]);
            res.render('autenticated_utente/requestsHistory', { pedidoAvaliacaoMedicaRecords: rows, userName: req.session.userName });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
};
