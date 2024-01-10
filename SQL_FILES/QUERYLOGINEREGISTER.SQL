CREATE OR REPLACE FUNCTION create_new_user_login(nomeUtente VARCHAR(100), nif VARCHAR(9), email VARCHAR(64), password VARCHAR(64))
RETURNS INT AS $$
DECLARE
    new_utente_id INT;
BEGIN
    -- Insert into Utente table
    INSERT INTO Utente (NomeUtente, NIF) VALUES (nomeUtente, nif) RETURNING UtenteID INTO new_utente_id;

    -- Insert into UtenteLogin table
    INSERT INTO UtenteLogin (Email, Password, UtenteIdentificaçãoUtenteID) VALUES (email, password, new_utente_id);

    RETURN new_utente_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION create_new_doctor_login(nomeMedico VARCHAR(100), função VARCHAR(255), especialidade VARCHAR(100), email VARCHAR(64), password VARCHAR(64))
RETURNS INT AS $$
DECLARE
    new_medico_id INT;
BEGIN
    INSERT INTO Médico (NomeMedico, Função, Especialidade) VALUES (nomeMedico, função, especialidade) RETURNING MedicoID INTO new_medico_id;
    INSERT INTO MédicoLogin ("E-Mail", Password, MedicoMedicoID) VALUES (email, password, new_medico_id);
    RETURN new_medico_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION alter_user_login(utente_id INT, new_email VARCHAR(64) DEFAULT NULL, new_password VARCHAR(64) DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
    IF new_email IS NOT NULL THEN
        UPDATE UtenteLogin SET Email = new_email WHERE UtenteIdentificaçãoUtenteID = utente_id;
    END IF;
    IF new_password IS NOT NULL THEN
        UPDATE UtenteLogin SET Password = new_password WHERE UtenteIdentificaçãoUtenteID = utente_id;
    END IF;
END;
$$ LANGUAGE plpgsql;
