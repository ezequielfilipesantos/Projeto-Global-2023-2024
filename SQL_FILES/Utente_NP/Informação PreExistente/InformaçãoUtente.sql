CREATE OR REPLACE FUNCTION addUtenteInformation(
  nomeUtente VARCHAR(100),
  niss INT8,
  cc VARCHAR(12),
  localidadeEmissaoDSIC VARCHAR(255),
  dataEmissaoDSIC DATE,
  dataValidadeCC DATE,
  nif VARCHAR(9),
  dataNascimento DATE,
  freguesiaNaturalidade VARCHAR(255),
  concelhoNaturalidade VARCHAR(255),
  paisNaturalidade VARCHAR(255),
  cartaoResidencia INT4,
  utentePrevPreviouslySubmetidoAJM BOOL,
  phoneNumber INT4,
  p_RuaResidencia VARCHAR(100),
  p_DistritoResidencia VARCHAR(100),
  p_FreguesiaResidencia VARCHAR(100),
  p_ConcelhoResidencia VARCHAR(100),
  p_CodigoPostalCP VARCHAR(100),
  p_Localidade VARCHAR(100),
  previamenteSubmetidoAJM BOOL
) RETURNS VOID AS $$
BEGIN
  -- Insert into Utente table
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
    nomeUtente,
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
    utentePrevPreviouslySubmetidoAJM
  );

  -- Insert into UtenteResidência table
  INSERT INTO UtenteResidência (
    RuaResidência,
    DistritoResidência,
    FreguesiaResidência,
    ConcelhoResidência,
    CodigoPostalCP,
    UtenteIdentificaçãoUtenteID
  ) VALUES (
    p_RuaResidencia,
    p_DistritoResidencia,
    p_FreguesiaResidencia,
    p_ConcelhoResidencia,
    p_CodigoPostalCP,
    currval('Utente_UtenteID_seq')
  );

  -- Insert into UtenteContacto table
  INSERT INTO UtenteContacto (
    Telefone,
    UtenteIdentificaçãoUtenteID
  ) VALUES (
    phoneNumber,
    currval('Utente_UtenteID_seq')
  );

  -- Insert into PedidoAvaliaçãoMédica table
  INSERT INTO PedidoAvaliaçãoMédica (
    UtenteUtenteID,
    dataPedido,
    LocalidadePedido,
    TeCAssinado,
    EfeitoIDEfeito,
    EstadoIDEstado
  ) VALUES (
    currval('Utente_UtenteID_seq'),
    NULL, -- You need to provide a value for dataPedido
    NULL, -- You need to provide a value for LocalidadePedido
    FALSE, -- You need to provide a value for TeCAssinado
    NULL, -- You need to provide a value for EfeitoIDEfeito
    NULL  -- You need to provide a value for EstadoIDEstado
  );

END;
$$ LANGUAGE PLPGSQL;
