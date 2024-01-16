ALTER TABLE PedidoAvaliaçãoMédica
ALTER COLUMN dataPedido TYPE DATE USING to_date(dataPedido::TEXT, 'YYYYMMDD');

ALTER TABLE PedidoAvaliaçãoMédica
ALTER COLUMN LocalidadePedido TYPE TEXT;
