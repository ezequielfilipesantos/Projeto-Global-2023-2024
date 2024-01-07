CREATE TABLE PagamentoJunta (pagamentoID SERIAL NOT NULL, númeroFatura varchar(32), faturaContribuinte int4, métodoPagamento int4, valor float4, iva float4, JuntaMédicaAvaliaçãoAvaliaçãoID int4 NOT NULL, PRIMARY KEY (pagamentoID));
CREATE TABLE JuntaMédicaAvaliação (AvaliaçãoID SERIAL NOT NULL, dataAvaliaçãoJuntaMédica date, EstadoJuntaMédica int4, grauIncapacidade int4, PedidoJuntaIDOrdemEntrada int4 NOT NULL, JuntaMédicaJMID int4 NOT NULL, PRIMARY KEY (AvaliaçãoID));
CREATE TABLE PedidoJunta (IDOrdemEntrada SERIAL NOT NULL, dataPedido int4, localidadePedido int4, dataAgendamento date, termosECondiçõesAssinado bool, EfeitoIDEfeito int4 NOT NULL, EstadoIDEstado int4 NOT NULL, meterbit int4, UtenteIdentificaçãoUtenteID int4 NOT NULL, PedidoMédicoIDPedido int4 NOT NULL, PRIMARY KEY (IDOrdemEntrada));
CREATE TABLE Efeito (IDEfeito SERIAL NOT NULL, Descritivo varchar(255), PRIMARY KEY (IDEfeito));
CREATE TABLE Estado (IDEstado SERIAL NOT NULL, Descritivo varchar(255), PRIMARY KEY (IDEstado));
CREATE TABLE PedidoMédico (IDPedido SERIAL NOT NULL, UtenteIdentificaçãoUtenteID int4 NOT NULL, Avaliação int4, RelatorioClinco varchar(255), dataPedido date, dataResposta date, MedicoMedicoID int4 NOT NULL, PRIMARY KEY (IDPedido));
CREATE TABLE UtenteIdentificação (UtenteID SERIAL NOT NULL, NomeUtente varchar(100), NISS int4, CC varchar(12), LocalidadeEmissãoDSIC varchar(255), DataEmissãoDSIC date, DataValidadeCC date, NIF int4, DataNascimento date, FreguesiaNaturalidade varchar(255), ConcelhoNaturalidade varchar(255), PaisNaturalidade varchar(255), PRIMARY KEY (UtenteID));
CREATE TABLE Medico (MedicoID SERIAL NOT NULL, NomeMedico varchar(100), Especialidade varchar(100), PRIMARY KEY (MedicoID));
CREATE TABLE JuntaMédica (JMID SERIAL NOT NULL, DataConstituição int4, MedicoMedicoID int4 NOT NULL, PRIMARY KEY (JMID));
CREATE TABLE UtenteContacto (Telefone int4 NOT NULL, UtenteIdentificaçãoUtenteID int4 NOT NULL, PRIMARY KEY (Telefone, UtenteIdentificaçãoUtenteID));
CREATE TABLE UtenteResidênciaCP (CP varchar(100) NOT NULL, Localidade varchar(100), PRIMARY KEY (CP));
CREATE TABLE UtenteResidência (MoradaID int4 NOT NULL, RuaResidência varchar(100), FreguesiaResidência varchar(100), ConcelhoResidência varchar(100), CodigoPostalCP varchar(100) NOT NULL, PRIMARY KEY (MoradaID));
CREATE TABLE MédicoLogin ("E-Mail" varchar(64) NOT NULL, Password varchar(16), MedicoMedicoID int4 NOT NULL, PRIMARY KEY ("E-Mail"));
CREATE TABLE PedidoJMInfomarçãoAdicional (dataReavaliaçãoPedidoJM date, PedidoJuntaIDOrdemEntrada int4 NOT NULL);
CREATE TABLE Documentos (PedidoMédicoIDPedido int4 NOT NULL, Ordem int4 NOT NULL, Documento int4, PRIMARY KEY (PedidoMédicoIDPedido, Ordem));
CREATE TABLE UtenteLogin (Email varchar(64) NOT NULL, Password varchar(16), UtenteIdentificaçãoUtenteID int4 NOT NULL, PRIMARY KEY (Email));
CREATE TABLE pagamentoPedidos (pagamentoID SERIAL NOT NULL, númeroFatura int4, faturaContribuinte int4, metódoPagamento varchar(255), valor float4, iva float4, PedidoMédicoIDPedido int4 NOT NULL, PRIMARY KEY (pagamentoID));
ALTER TABLE PagamentoJunta ADD CONSTRAINT FKPagamentoJ403260 FOREIGN KEY (JuntaMédicaAvaliaçãoAvaliaçãoID) REFERENCES JuntaMédicaAvaliação (AvaliaçãoID);
ALTER TABLE JuntaMédicaAvaliação ADD CONSTRAINT FKJuntaMédic903108 FOREIGN KEY (PedidoJuntaIDOrdemEntrada) REFERENCES PedidoJunta (IDOrdemEntrada);
ALTER TABLE PedidoJunta ADD CONSTRAINT FKPedidoJunt560832 FOREIGN KEY (EfeitoIDEfeito) REFERENCES Efeito (IDEfeito);
ALTER TABLE PedidoJunta ADD CONSTRAINT FKPedidoJunt702081 FOREIGN KEY (EstadoIDEstado) REFERENCES Estado (IDEstado);
ALTER TABLE PedidoJunta ADD CONSTRAINT FKPedidoJunt847568 FOREIGN KEY (PedidoMédicoIDPedido) REFERENCES PedidoMédico (IDPedido);
ALTER TABLE PedidoMédico ADD CONSTRAINT FKPedidoMédi322491 FOREIGN KEY (UtenteIdentificaçãoUtenteID) REFERENCES UtenteIdentificação (UtenteID);
ALTER TABLE PedidoMédico ADD CONSTRAINT FKPedidoMédi834296 FOREIGN KEY (MedicoMedicoID) REFERENCES Medico (MedicoID);
ALTER TABLE JuntaMédicaAvaliação ADD CONSTRAINT FKJuntaMédic976457 FOREIGN KEY (JuntaMédicaJMID) REFERENCES JuntaMédica (JMID);
ALTER TABLE JuntaMédica ADD CONSTRAINT FKJuntaMédic140745 FOREIGN KEY (MedicoMedicoID) REFERENCES Medico (MedicoID);
ALTER TABLE UtenteContacto ADD CONSTRAINT FKUtenteCont987603 FOREIGN KEY (UtenteIdentificaçãoUtenteID) REFERENCES UtenteIdentificação (UtenteID);
ALTER TABLE UtenteResidência ADD CONSTRAINT FKUtenteResi649377 FOREIGN KEY (MoradaID) REFERENCES UtenteIdentificação (UtenteID);
ALTER TABLE UtenteResidência ADD CONSTRAINT FKUtenteResi466631 FOREIGN KEY (CodigoPostalCP) REFERENCES UtenteResidênciaCP (CP);
ALTER TABLE MédicoLogin ADD CONSTRAINT FKMédicoLogi114423 FOREIGN KEY (MedicoMedicoID) REFERENCES Medico (MedicoID);
ALTER TABLE PedidoJMInfomarçãoAdicional ADD CONSTRAINT FKPedidoJMIn967373 FOREIGN KEY (PedidoJuntaIDOrdemEntrada) REFERENCES PedidoJunta (IDOrdemEntrada);
ALTER TABLE Documentos ADD CONSTRAINT FKDocumentos878668 FOREIGN KEY (PedidoMédicoIDPedido) REFERENCES PedidoMédico (IDPedido);
ALTER TABLE UtenteLogin ADD CONSTRAINT FKUtenteLogi267059 FOREIGN KEY (UtenteIdentificaçãoUtenteID) REFERENCES UtenteIdentificação (UtenteID);
ALTER TABLE pagamentoPedidos ADD CONSTRAINT FKpagamentoP193068 FOREIGN KEY (PedidoMédicoIDPedido) REFERENCES PedidoMédico (IDPedido);


---1
-- Alter the foreign key constraint to allow null values
ALTER TABLE UtenteResidência
DROP CONSTRAINT IF EXISTS FKUtenteResi649377;

ALTER TABLE UtenteResidência
ADD CONSTRAINT FKUtenteResi649377
FOREIGN KEY (MoradaID)
REFERENCES UtenteIdentificação (UtenteID)
ON DELETE CASCADE
DEFERRABLE INITIALLY DEFERRED;

---2
-- Drop the existing UtenteResidência table if it exists
DROP TABLE IF EXISTS UtenteResidência;

-- Create a new UtenteResidência table with MoradaID as the primary key
CREATE TABLE UtenteResidência (
    MoradaID SERIAL PRIMARY KEY,
    RuaResidência VARCHAR(100),
    FreguesiaResidência VARCHAR(100),
    ConcelhoResidência VARCHAR(100),
    CodigoPostalCP VARCHAR(100) NOT NULL
);

-- Add a foreign key constraint if needed
-- ALTER TABLE UtenteResidência
-- ADD CONSTRAINT FKUtenteResi649377 FOREIGN KEY (MoradaID) REFERENCES UtenteIdentificação (UtenteID);


--------------------------outra reparacao

-- Drop the existing tables if they exist
DROP TABLE IF EXISTS UtenteResidência;
DROP TABLE IF EXISTS UtenteResidênciaCP;
DROP TABLE IF EXISTS UtenteContacto;

-- Create a new UtenteResidênciaCP table
CREATE TABLE UtenteResidênciaCP (
    CP VARCHAR(100) NOT NULL,
    Localidade VARCHAR(100),
    PRIMARY KEY (CP)
);

-- Create a new UtenteResidência table
CREATE TABLE UtenteResidência (
    MoradaID SERIAL NOT NULL,
    RuaResidência VARCHAR(100),
    FreguesiaResidência VARCHAR(100),
    ConcelhoResidência VARCHAR(100),
    CodigoPostalCP VARCHAR(100) NOT NULL,
    UtenteIdentificaçãoUtenteID INT4 NOT NULL,
    PRIMARY KEY (MoradaID),
    CONSTRAINT fk_utente_residencia_utente_id
        FOREIGN KEY (UtenteIdentificaçãoUtenteID)
        REFERENCES UtenteIdentificação(UtenteID)
);

-- Create a new UtenteContacto table
CREATE TABLE UtenteContacto (
    Telefone INT4 NOT NULL,
    UtenteIdentificaçãoUtenteID INT4 NOT NULL,
    PRIMARY KEY (Telefone, UtenteIdentificaçãoUtenteID),
    CONSTRAINT fk_utente_contacto_utente_id
        FOREIGN KEY (UtenteIdentificaçãoUtenteID)
        REFERENCES UtenteIdentificação(UtenteID)
);

