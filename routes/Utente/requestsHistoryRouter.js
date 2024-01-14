//requestsHistoryRouter.js
const express = require('express');
const router = express.Router();

module.exports = function(pool) {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const utenteID = req.session.userID; 

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
