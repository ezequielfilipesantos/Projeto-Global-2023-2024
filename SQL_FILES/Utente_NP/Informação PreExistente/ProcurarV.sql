-- Function to find UtenteID from Email
CREATE OR REPLACE FUNCTION FindUtenteIDByEmail(email varchar(64))
RETURNS INT
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (SELECT UtenteUtenteID FROM UtenteLogin WHERE UtenteLogin.Email = email);
END;
$$;

-- Function to find UtenteID from NIF
CREATE OR REPLACE FUNCTION FindUtenteIDByNIF(nif varchar(9))
RETURNS INT
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (SELECT UtenteID FROM Utente WHERE NIF = nif);
END;
$$;

-- Function to find UtenteID from NISS
CREATE OR REPLACE FUNCTION FindUtenteIDByNISS(niss int8)
RETURNS INT
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (SELECT UtenteID FROM Utente WHERE NISS = niss);
END;
$$;
