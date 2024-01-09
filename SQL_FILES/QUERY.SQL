Temporary Files\funções.txt

@@ -1,55 +0,0 @@
---utente
CREATE OR REPLACE FUNCTION create_new_user_login(nomeUtente VARCHAR(100), email VARCHAR(64), password VARCHAR(16))
RETURNS INT AS $$
DECLARE
    new_utente_id INT;
BEGIN
    INSERT INTO UtenteIdentificação (NomeUtente) VALUES (nomeUtente) RETURNING UtenteID INTO new_utente_id;
    INSERT INTO UtenteLogin (Email, Password, UtenteIdentificaçãoUtenteID) VALUES (email, password, new_utente_id);
    RETURN new_utente_id;
END;
$$ LANGUAGE plpgsql;
---medico
CREATE OR REPLACE FUNCTION create_new_doctor_login(nomeMedico VARCHAR(100), especialidade VARCHAR(100), email VARCHAR(64), password VARCHAR(16))
RETURNS INT AS $$
DECLARE
    new_medico_id INT;
BEGIN
    INSERT INTO MédicoIdentificação (NomeMedico, Especialidade) VALUES (nomeMedico, especialidade) RETURNING MedicoID INTO new_medico_id;
    INSERT INTO MédicoLogin ("E-Mail", Password, MedicoMedicoID) VALUES (email, password, new_medico_id);
    RETURN new_medico_id;
END;
$$ LANGUAGE plpgsql;
--
SELECT create_new_user_login('John Doe', 'john@example.com', 'johnpassword');

SELECT create_new_doctor_login('Dr. Smith', 'Cardiology', 'drsmith@example.com', 'drsmithpassword');

--------------------------MANIPULACAO DE LOGINS------------------
CREATE OR REPLACE FUNCTION alter_user_login(utente_id INT, new_email VARCHAR(64) DEFAULT NULL, new_password VARCHAR(16) DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
    IF new_email IS NOT NULL THEN
        UPDATE UtenteLogin SET Email = new_email WHERE UtenteIdentificaçãoUtenteID = utente_id;
    END IF;
    IF new_password IS NOT NULL THEN