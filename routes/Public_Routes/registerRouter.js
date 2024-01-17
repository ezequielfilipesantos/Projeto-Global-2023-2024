const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = function (pool, secondaryDBPool) {
  router.get('/', (req, res) => {
    res.render('public_views/user_logic/register'); 
  });

router.post('/', async (req, res) => {
  const { nomeutente, nif, email, password } = req.body;

  try {
    // Check if the user with the same NIF exists in the secondary database
    const secondaryDBQueryResult = await secondaryDBPool.query('SELECT * FROM Utente WHERE NIF = $1', [nif]);

    if (secondaryDBQueryResult.rows.length > 0) {
      // A user with the same NIF exists in the secondary database
      // Extract their information from the source database

      const sourceUser = secondaryDBQueryResult.rows[0];

      // Extract additional information from the source user
      const {
        NISS,
        CC,
        DataNascimento,
        FreguesiaNaturalidade,
        ConcelhoNaturalidade,
        PaisNaturalidade,
        VistoResidência,
      } = sourceUser;

      // Extract Residência information
      const {
        RuaResidência,
        DistritoResidência,
        FreguesiaResidência,
        ConcelhoResidência,
        CPCP,
      } = sourceUser;

      // Extract UtenteContacto information
      const { Telefone } = sourceUser;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Insert the user into the destination database with additional information
      const newUserResult = await pool.query(
        'INSERT INTO Utente (NomeUtente, NISS, CC, NIF, DataNascimento, FreguesiaNaturalidade, ConcelhoNaturalidade, PaisNaturalidade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING UtenteID',
        [
          nomeutente,
          NISS,
          CC,
          nif,
          DataNascimento,
          FreguesiaNaturalidade,
          ConcelhoNaturalidade,
          PaisNaturalidade,
        ]
      );

      const newUserID = newUserResult.rows[0].UtenteID;

      if (newUserID) {
        // Insert Residência information into the destination database
        await pool.query(
          'INSERT INTO UtenteResidência (RuaResidência, DistritoResidência, FreguesiaResidência, ConcelhoResidência, CodigoPostalCP, UtenteUtenteID) VALUES ($1, $2, $3, $4, $5, $6)',
          [RuaResidência, DistritoResidência, FreguesiaResidência, ConcelhoResidência, CPCP, newUserID]
        );

        // Insert UtenteContacto information into the destination database
        await pool.query(
          'INSERT INTO UtenteContacto (Telefone, UtenteUtenteID) VALUES ($1, $2)',
          [Telefone, newUserID]
        );

        req.session.isAuthenticated = true;
        req.session.userType = 'Utente';
        req.session.userID = newUserID;
        res.redirect('/index');
      } else {
        res.render('public_views/user_logic/register', { error: 'Registration failed' });
      }
    } else {
      // User with the same NIF not found in the secondary database, proceed with registration
      const hashedPassword = await bcrypt.hash(password, 12);
      const userExistsResult = await pool.query('SELECT * FROM UtenteLogin WHERE Email = $1', [email]);

      if (userExistsResult.rows.length > 0) {
        res.render('public_views/user_logic/register', { error: 'User with this email already exists' });
      } else {
        // Insert the user into the destination database without additional information
        const newUserResult = await pool.query(
          'INSERT INTO Utente (NomeUtente, NISS, CC, NIF, DataNascimento, FreguesiaNaturalidade, ConcelhoNaturalidade, PaisNaturalidade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING UtenteID',
          [
            nomeutente,
            NISS,
            CC,
            nif,
            DataNascimento,
            FreguesiaNaturalidade,
            ConcelhoNaturalidade,
            PaisNaturalidade,
          ]
        );

        const newUserID = newUserResult.rows[0].UtenteID;

        if (newUserID) {
          req.session.isAuthenticated = true;
          req.session.userType = 'Utente';
          req.session.userID = newUserID;
          res.redirect('/index');
        } else {
          res.render('public_views/user_logic/register', { error: 'Registration failed' });
        }
      }
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).render('public_views/user_logic/errorPage', { error: 'Internal Server Error' });
  }
});
return router;
};
