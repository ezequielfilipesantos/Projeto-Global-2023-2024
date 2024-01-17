CREATE OR REPLACE FUNCTION update_utente_and_residencia(
    utente_id_param integer,
    nomeUtente_param character varying,
    niss_param bigint,
    cc_param character varying,
    localidadeEmissaoDSIC_param character varying,
    dataEmissaoDSIC_param date,
    dataValidadeCC_param date,
    nif_param varchar(9),
    dataNascimento_param date,
    freguesiaNaturalidade_param varchar(255),
    concelhoNaturalidade_param varchar(255),
    paisNaturalidade_param varchar(255),
    cartaoResidencia_param int4,
    previamenteSubmetidoAJM_param boolean,
    telefone_param varchar(255),
    p_RuaResidencia_param varchar(100),
    p_DistritoResidencia_param varchar(100),
    p_FreguesiaResidencia_param varchar(100),
    p_ConcelhoResidencia_param varchar(100),
    p_CodigoPostalCP_param varchar(100)
) RETURNS void AS
$$
BEGIN
    UPDATE Utente
    SET
        NomeUtente = nomeUtente_param,
        NISS = niss_param,
        CC = cc_param,
        LocalidadeEmissãoDSIC = localidadeEmissaoDSIC_param,
        DataEmissãoDSIC = dataEmissaoDSIC_param,
        DataValidadeCC = dataValidadeCC_param,
        NIF = nif_param,
        DataNascimento = dataNascimento_param,
        FreguesiaNaturalidade = freguesiaNaturalidade_param,
        ConcelhoNaturalidade = concelhoNaturalidade_param,
        PaisNaturalidade = paisNaturalidade_param,
        CartãoResidência = cartaoResidencia_param,
        UtentePréviamenteSubmetidoAJM = previamenteSubmetidoAJM_param
    WHERE UtenteID = utente_id_param;

    UPDATE UtenteContacto
    SET
        Telefone = CAST(telefone_param AS integer) -- Cast to integer    
    WHERE UtenteUtenteID = utente_id_param;

    UPDATE UtenteResidência
    SET
        RuaResidência = p_RuaResidencia_param,
        DistritoResidência = p_DistritoResidencia_param,
        FreguesiaResidência = p_FreguesiaResidencia_param,
        ConcelhoResidência = p_ConcelhoResidencia_param,
        CodigoPostalCP = p_CodigoPostalCP_param
    WHERE UtenteUtenteID = utente_id_param;
END;
$$ LANGUAGE plpgsql;