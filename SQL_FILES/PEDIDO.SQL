SELECT addPedidoAvaliacaoMedica(
    4, -- Replace with the target UtenteID
    '2024-01-20'::DATE, -- New dataPedido
    'New Location'::TEXT, -- New LocalidadePedido
    true::BOOLEAN, -- New TeCAssinado value (true or false)
    1::INT, -- New EfeitoIDEfeito (integer value)
    true::BOOLEAN -- New PedidoEnviadoParaJuntaMédica value (true or false)
);

CREATE OR REPLACE FUNCTION addPedidoAvaliacaoMedica(
    p_UtenteID INT,
    p_dataPedido DATE,
    p_LocalidadePedido TEXT,
    p_TeCAssinado BOOLEAN,
    p_EfeitoIDEfeito INT,
    p_PedidoEnviadoParaJuntaMédica BOOLEAN -- Added as BOOLEAN parameter
)
RETURNS VOID AS $$
BEGIN
    -- Update the PedidoAvaliaçãoMédica table
    UPDATE PedidoAvaliaçãoMédica
    SET
        dataPedido = p_dataPedido,
        LocalidadePedido = p_LocalidadePedido,
        TeCAssinado = p_TeCAssinado,
        EfeitoIDEfeito = p_EfeitoIDEfeito,
        PedidoEnviadoParaJuntaMédica = p_PedidoEnviadoParaJuntaMédica -- Update the new column
    WHERE
        UtenteUtenteID = p_UtenteID;
END;
$$ LANGUAGE plpgsql;