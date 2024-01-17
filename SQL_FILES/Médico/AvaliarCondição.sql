CREATE OR REPLACE FUNCTION insert_avaliacao_condicao(
    detalhesAvaliacao varchar(255),
    grauIncapacidade float4,
    dataAvaliacao date,
    pedidoAvaliacaoMedicaUtenteID int4,
    coeficiente float4,
    desvalorizacao int4,
    capacidadeRestante int4
) RETURNS void AS $$
DECLARE IDAvaliacao int4;
BEGIN
    -- Insert into AvaliaçãoMédica table
    INSERT INTO AvaliaçãoMédica (DetalhesAvaliação, GrauIncapacidade, dataAvaliação, PedidoAvaliaçãoMédicaUtenteUtenteID)
    VALUES (detalhesAvaliacao, grauIncapacidade, dataAvaliacao, pedidoAvaliacaoMedicaUtenteID)
    RETURNING IDAvaliação INTO IDAvaliacao;

    -- Insert into Condição table
    INSERT INTO Condição (AvaliaçãoMédicaIDAvaliação, Coeficiente, Desvalorização, CapacidadeRestante)
    VALUES (IDAvaliacao, coeficiente, desvalorizacao, capacidadeRestante);
    
    -- Commit the transaction
    COMMIT;
END;
$$ LANGUAGE plpgsql;