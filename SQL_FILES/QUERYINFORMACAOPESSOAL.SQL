CREATE OR REPLACE FUNCTION submit_personal_info_utente(
    nome VARCHAR(100), 
    niss BIGINT, 
    cc VARCHAR(12), 
    localidadeEmissaoDSIC VARCHAR(255), 
    dataEmissaoDSIC DATE,
    dataValidadeCC DATE,
    nif VARCHAR(9),
    dataNascimento DATE,
    freguesiaNaturalidade VARCHAR(255),
    concelhoNaturalidade VARCHAR(255),
    paisNaturalidade VARCHAR(255),
    cartaoResidencia INT,
    previamenteSubmetidoAJM BOOLEAN
) RETURNS INT AS $$
DECLARE
    new_utente_id INT;
BEGIN
    INSERT INTO Utente (
        NomeUtente, 
        NISS, 
        CC, 
        LocalidadeEmissãoDSIC, 
        DataEmissãoDSIC, 
        DataValidadeCC, 
        NIF, 
        DataNascimento, 
        FreguesiaNaturalidade, 
        ConcelhoNaturalidade, 
        PaisNaturalidade, 
        CartãoResidência, 
        UtentePréviamenteSubmetidoAJM
    ) VALUES (
        nome, 
        niss, 
        cc, 
        localidadeEmissaoDSIC, 
        dataEmissaoDSIC, 
        dataValidadeCC, 
        nif, 
        dataNascimento, 
        freguesiaNaturalidade, 
        concelhoNaturalidade, 
        paisNaturalidade, 
        cartaoResidencia, 
        previamenteSubmetidoAJM
    ) RETURNING UtenteID INTO new_utente_id;
    
    RETURN new_utente_id;
END;
$$ LANGUAGE plpgsql;
