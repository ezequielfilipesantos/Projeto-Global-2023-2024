@ -1,206 +0,0 @@
CREATE TABLE UtenteIdentificação (
    UtenteID SERIAL NOT NULL, 
    NomeUtente varchar(100), 
    NISS int4, 
    CC varchar(12), 
    LocalidadeEmissãoDSIC varchar(255), 
    DataEmissãoDSIC date, 
    DataValidadeCC date, 
    NIF int4, 
    DataNascimento date, 
    FreguesiaNaturalidade varchar(255), 
    ConcelhoNaturalidade varchar(255), 
    PaisNaturalidade varchar(255), 
    PRIMARY KEY (UtenteID)
);

CREATE TABLE MédicoIdentificação (
    MedicoID SERIAL NOT NULL, 
    NomeMedico varchar(100), 
    Especialidade varchar(100), 
    PRIMARY KEY (MedicoID)
);

CREATE TABLE PedidoJunta (
    IDOrdemEntrada SERIAL NOT NULL, 
    dataPedido int4, 
    localidadePedido int4, 
    dataAgendamento date, 
    termosECondiçõesAssinado bool, 
    EfeitoIDEfeito int4 NOT NULL, 
    EstadoIDEstado int4 NOT NULL, 
    meterbit int4, 
    UtenteIdentificaçãoUtenteID int4 NOT NULL, 
    PedidoMédicoIDPedido int4 NOT NULL, 
    PRIMARY KEY (IDOrdemEntrada)
);

CREATE TABLE UtenteResidência (
    MoradaID SERIAL NOT NULL, 
    RuaResidência varchar(100), 
    FreguesiaResidência varchar(100), 
    ConcelhoResidência varchar(100), 
    CodigoPostalCP varchar(100) NOT NULL, 
    UtenteIdentificaçãoUtenteID int4 NOT NULL, 
    PRIMARY KEY (MoradaID)
);

CREATE TABLE UtenteResidênciaCP (
    CP varchar(100) NOT NULL, 
    Localidade varchar(100), 
    PRIMARY KEY (CP)
);

CREATE TABLE UtenteContacto (
    Telefone int4 NOT NULL, 
    UtenteIdentificaçãoUtenteID int4 NOT NULL, 
    PRIMARY KEY (Telefone, UtenteIdentificaçãoUtenteID)
);

CREATE TABLE MédicoLogin (
    "E-Mail" varchar(64) NOT NULL, 
    Password varchar(16), 
    MedicoMedicoID int4 NOT NULL, 
    PRIMARY KEY ("E-Mail")
);

CREATE TABLE JuntaMédicaAvaliação (
    AvaliaçãoID SERIAL NOT NULL, 
    dataAvaliaçãoJuntaMédica date, 
    EstadoJuntaMédica int4, 
    grauIncapacidade int4, 
    PedidoJuntaIDOrdemEntrada int4 NOT NULL, 
    JuntaMédicaJMID int4 NOT NULL, 
    PRIMARY KEY (AvaliaçãoID)
);

CREATE TABLE PedidoJMInfomarçãoAdicional (
    dataReavaliaçãoPedidoJM date, 
    PedidoJuntaIDOrdemEntrada int4 NOT NULL
);

CREATE TABLE Efeito (
    IDEfeito SERIAL NOT NULL, 
    Descritivo varchar(255), 
    PRIMARY KEY (IDEfeito)
);

CREATE TABLE Documentos (
    PedidoMédicoIDPedido int4 NOT NULL, 
    Ordem int4 NOT NULL, 
    Documento int4, 
    PRIMARY KEY (PedidoMédicoIDPedido, Ordem)
);

CREATE TABLE PedidoMédico (
    IDPedido SERIAL NOT NULL, 
    UtenteIdentificaçãoUtenteID int4 NOT NULL, 
    Avaliação int4, 
    RelatorioClinco varchar(255), 
    dataPedido date, 
    dataResposta date, 
    MedicoMedicoID int4 NOT NULL, 
    PRIMARY KEY (IDPedido)
);

CREATE TABLE Estado (
    IDEstado SERIAL NOT NULL, 
    Descritivo varchar(255), 
    PRIMARY KEY (IDEstado)
);

CREATE TABLE UtenteLogin (
    Email varchar(64) NOT NULL, 
    Password varchar(16), 
    UtenteIdentificaçãoUtenteID int4 NOT NULL, 
    PRIMARY KEY (Email)
);

CREATE TABLE JuntaMédica (
    JMID SERIAL NOT NULL, 
    DataConstituição int4, 
    MedicoMedicoID int4 NOT NULL, 
    PRIMARY KEY (JMID)
);

ALTER TABLE UtenteResidência 
ADD CONSTRAINT FKUtenteResi466631 
FOREIGN KEY (CodigoPostalCP) 
REFERENCES UtenteResidênciaCP (CP);

ALTER TABLE PedidoJunta 
ADD CONSTRAINT FKPedidoJunt560832 
FOREIGN KEY (EfeitoIDEfeito) 
REFERENCES Efeito (IDEfeito);

ALTER TABLE PedidoJunta 
ADD CONSTRAINT FKPedidoJunt702081 
FOREIGN KEY (EstadoIDEstado) 
REFERENCES Estado (IDEstado);

ALTER TABLE PedidoJMInfomarçãoAdicional 
ADD CONSTRAINT FKPedidoJMIn967373 
FOREIGN KEY (PedidoJuntaIDOrdemEntrada) 
REFERENCES PedidoJunta (IDOrdemEntrada);

ALTER TABLE PedidoMédico 
ADD CONSTRAINT FKPedidoMédi322491 
FOREIGN KEY (UtenteIdentificaçãoUtenteID) 
REFERENCES UtenteIdentificação (UtenteID);

ALTER TABLE PedidoMédico 
ADD CONSTRAINT FKPedidoMédi58622 
FOREIGN KEY (MedicoMedicoID) 
REFERENCES MédicoIdentificação (MedicoID);

ALTER TABLE Documentos 
ADD CONSTRAINT FKDocumentos878668 
FOREIGN KEY (PedidoMédicoIDPedido) 
REFERENCES PedidoMédico (IDPedido);

ALTER TABLE PedidoJunta 
ADD CONSTRAINT FKPedidoJunt847568 
FOREIGN KEY (PedidoMédicoIDPedido) 
REFERENCES PedidoMédico (IDPedido);

ALTER TABLE JuntaMédicaAvaliação 
ADD CONSTRAINT FKJuntaMédic903108 
FOREIGN KEY (PedidoJuntaIDOrdemEntrada) 
REFERENCES PedidoJunta (IDOrdemEntrada);

ALTER TABLE UtenteContacto 
ADD CONSTRAINT FKUtenteCont987603 
FOREIGN KEY (UtenteIdentificaçãoUtenteID) 
REFERENCES UtenteIdentificação (UtenteID);

ALTER TABLE UtenteLogin 
ADD CONSTRAINT FKUtenteLogi267059 
FOREIGN KEY (UtenteIdentificaçãoUtenteID) 
REFERENCES UtenteIdentificação (UtenteID);

ALTER TABLE MédicoLogin 
ADD CONSTRAINT FKMédicoLogi964248 
FOREIGN KEY (MedicoMedicoID) 
REFERENCES MédicoIdentificação (MedicoID);

ALTER TABLE JuntaMédica 
ADD CONSTRAINT FKJuntaMédic219417 
FOREIGN KEY (MedicoMedicoID) 
REFERENCES MédicoIdentificação (MedicoID);

ALTER TABLE JuntaMédicaAvaliação 
ADD CONSTRAINT FKJuntaMédic976457 
FOREIGN KEY (JuntaMédicaJMID) 
REFERENCES JuntaMédica (JMID);

ALTER TABLE UtenteResidência 
ADD CONSTRAINT FKUtenteResi13295 
FOREIGN KEY (UtenteIdentificaçãoUtenteID) 
REFERENCES UtenteIdentificação (UtenteID);

ALTER TABLE utentelogin ALTER COLUMN password TYPE character varying(60);


ALTER TABLE utentelogin ALTER COLUMN password TYPE varchar(60);
ALTER TABLE médicologin ALTER COLUMN password TYPE varchar(60);
