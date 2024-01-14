CREATE OR REPLACE FUNCTION update_personal_info_utente(
    utenteID INT,
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
) RETURNS VOID AS $$
BEGIN
    UPDATE Utente
    SET NomeUtente = nome, 
        NISS = niss, 
        CC = cc, 
        LocalidadeEmissãoDSIC = localidadeEmissaoDSIC, 
        DataEmissãoDSIC = dataEmissaoDSIC, 
        DataValidadeCC = dataValidadeCC, 
        NIF = nif, 
        DataNascimento = dataNascimento, 
        FreguesiaNaturalidade = freguesiaNaturalidade, 
        ConcelhoNaturalidade = concelhoNaturalidade, 
        PaisNaturalidade = paisNaturalidade, 
        CartãoResidência = cartaoResidencia, 
        UtentePréviamenteSubmetidoAJM = previamenteSubmetidoAJM
    WHERE UtenteID = utenteID;
END;
$$ LANGUAGE plpgsql;
