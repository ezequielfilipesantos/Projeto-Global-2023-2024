CREATE OR REPLACE FUNCTION InsertUtenteResidencia(
    p_CodigoPostalCP text,
    p_Localidade text,
    p_RuaResidencia text,
    p_DistritoResidencia text,
    p_FreguesiaResidencia text,
    p_ConcelhoResidencia text,
    p_UtenteID int
)
RETURNS int AS
$$
DECLARE
    morada_id int;
BEGIN
    -- Insert data into UtenteResidênciaCP table
    INSERT INTO UtenteResidênciaCP (CP, Localidade)
    VALUES (p_CodigoPostalCP, p_Localidade);

    -- Insert data into UtenteResidência table
    INSERT INTO UtenteResidência (RuaResidência, DistritoResidência, FreguesiaResidência, ConcelhoResidência, CodigoPostalCP, UtenteIdentificaçãoUtenteID)
    VALUES (p_RuaResidencia, p_DistritoResidencia, p_FreguesiaResidencia, p_ConcelhoResidencia, p_CodigoPostalCP, p_UtenteID)
    RETURNING MoradaID INTO morada_id;

    RETURN morada_id;
END;
$$
LANGUAGE plpgsql;