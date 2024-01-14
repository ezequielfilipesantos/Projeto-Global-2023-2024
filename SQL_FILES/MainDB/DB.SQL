CREATE TABLE AgendamentoJuntaMédica (AgendamentoID SERIAL NOT NULL, JuntaMédicaAvaliaçãoAvaliaçãoJuntaMédicaID int4 NOT NULL, DataAgendamentoJuntaMédica date, TipoDeAvaliação varchar(32), PRIMARY KEY (AgendamentoID));
CREATE TABLE JuntaMédicaAvaliação (AvaliaçãoJuntaMédicaID SERIAL NOT NULL, ACES varchar(255), ARS varchar(255), ValorFinalIncapacidade float4, Decisão varchar(255), Notas varchar(255), DataDecisão date, JuntaMédicaJMID int4 NOT NULL, PRIMARY KEY (AvaliaçãoJuntaMédicaID));
CREATE TABLE JuntaMédica (JMID SERIAL NOT NULL, DataConstituição int4, MédicoMedicoID int4 NOT NULL, PRIMARY KEY (JMID));
CREATE TABLE Médico (MedicoID SERIAL NOT NULL, NomeMedico varchar(100), Função varchar(255), Especialidade varchar(100), PRIMARY KEY (MedicoID));
CREATE TABLE PedidoAvaliaçãoMédica (UtenteUtenteID int4 NOT NULL, dataPedido int4, LocalidadePedido int4, TeCAssinado bool, EfeitoIDEfeito int4 NOT NULL, EstadoIDEstado int4 NOT NULL, PRIMARY KEY (UtenteUtenteID));
CREATE TABLE Utente (UtenteID SERIAL NOT NULL, NomeUtente varchar(100), NISS int8, CC varchar(12), LocalidadeEmissãoDSIC varchar(255), DataEmissãoDSIC date, DataValidadeCC date, NIF varchar(9), DataNascimento date, FreguesiaNaturalidade varchar(255), ConcelhoNaturalidade varchar(255), PaisNaturalidade varchar(255), CartãoResidência int4, UtentePréviamenteSubmetidoAJM bool, PRIMARY KEY (UtenteID));
CREATE TABLE EfeitoPedido (IDEfeito SERIAL NOT NULL, Descritivo varchar(255), PRIMARY KEY (IDEfeito));
CREATE TABLE Estado (IDEstado SERIAL NOT NULL, Descritivo varchar(255), PRIMARY KEY (IDEstado));
CREATE TABLE DiagnósticoMédico (DiagnosticoID SERIAL NOT NULL, MedicoMedicoID int4 NOT NULL, AvaliaçãoMédicaIDAvaliação int4 NOT NULL, AvaliaçãoIncapacidade int4, DataDiagnóstico date, PRIMARY KEY (DiagnosticoID));
CREATE TABLE AvaliaçãoMédica (IDAvaliação SERIAL NOT NULL, DetalhesAvaliação varchar(255), GrauIncapacidade float4, dataAvaliação date, PedidoAvaliaçãoMédicaUtenteUtenteID int4 NOT NULL, PRIMARY KEY (IDAvaliação));
CREATE TABLE Incapacidade (IncapacidadeID SERIAL NOT NULL, CondiçãoCondiçãoID int4 NOT NULL, Capitulo int4, Número int4, Alinea int4, NomeIncapacidade varchar(255), CoeficienteMáximo float8, CoeficienteMinimo float8, PRIMARY KEY (IncapacidadeID));
CREATE TABLE UtenteLogin (Email varchar(64) NOT NULL, Password varchar(64), UtenteUtenteID int4 NOT NULL, PRIMARY KEY (Email));
CREATE TABLE Documentos (Ordem int4 NOT NULL, PedidoAvaliaçãoMédicaUtenteUtenteID int4 NOT NULL, Documento varchar(255), PRIMARY KEY (Ordem, PedidoAvaliaçãoMédicaUtenteUtenteID));
CREATE TABLE PedidoJMInfomarçãoAdicional (dataReavaliaçãoPedidoJM date, PedidoAvaliaçãoMédicaUtenteUtenteID int4 NOT NULL);
CREATE TABLE MédicoLogin ("E-Mail" varchar(64) NOT NULL, Password varchar(64), MedicoMedicoID int4 NOT NULL, PRIMARY KEY ("E-Mail"));
CREATE TABLE UtenteContacto (Telefone int4 NOT NULL, UtenteIdentificaçãoUtenteID int4 NOT NULL, PRIMARY KEY (Telefone, UtenteIdentificaçãoUtenteID));
CREATE TABLE UtenteResidênciaCP (CP varchar(100) NOT NULL, Localidade varchar(100), PRIMARY KEY (CP));
CREATE TABLE UtenteResidência (MoradaID SERIAL NOT NULL, RuaResidência varchar(100), DistritoResidência varchar(100), FreguesiaResidência varchar(100), ConcelhoResidência varchar(100), CodigoPostalCP varchar(100) NOT NULL, UtenteIdentificaçãoUtenteID int4 NOT NULL, PRIMARY KEY (MoradaID));
CREATE TABLE Condição (AvaliaçãoMédicaIDAvaliação int4 NOT NULL, IncapacidadeNumeroIncapacidadeID int4 NOT NULL, Coeficiente float4, Desvalorização int4, CapacidadeRestante int4);
CREATE TABLE Médica_Junta (MédicoMedicoID int4 NOT NULL, JuntaMédicaJMID int4 NOT NULL);
ALTER TABLE AgendamentoJuntaMédica ADD CONSTRAINT FKAgendament257599 FOREIGN KEY (JuntaMédicaAvaliaçãoAvaliaçãoJuntaMédicaID) REFERENCES JuntaMédicaAvaliação (AvaliaçãoJuntaMédicaID);
ALTER TABLE JuntaMédicaAvaliação ADD CONSTRAINT FKJuntaMédic976457 FOREIGN KEY (JuntaMédicaJMID) REFERENCES JuntaMédica (JMID);
ALTER TABLE PedidoAvaliaçãoMédica ADD CONSTRAINT FKPedidoAval601144 FOREIGN KEY (UtenteUtenteID) REFERENCES Utente (UtenteID);
ALTER TABLE PedidoAvaliaçãoMédica ADD CONSTRAINT FKPedidoAval946019 FOREIGN KEY (EfeitoIDEfeito) REFERENCES EfeitoPedido (IDEfeito);
ALTER TABLE PedidoAvaliaçãoMédica ADD CONSTRAINT FKPedidoAval992581 FOREIGN KEY (EstadoIDEstado) REFERENCES Estado (IDEstado);
ALTER TABLE DiagnósticoMédico ADD CONSTRAINT FKDiagnóstic779614 FOREIGN KEY (MedicoMedicoID) REFERENCES Médico (MedicoID);
ALTER TABLE DiagnósticoMédico ADD CONSTRAINT FKDiagnóstic392115 FOREIGN KEY (AvaliaçãoMédicaIDAvaliação) REFERENCES AvaliaçãoMédica (IDAvaliação);
ALTER TABLE AvaliaçãoMédica ADD CONSTRAINT FKAvaliaçãoM963314 FOREIGN KEY (PedidoAvaliaçãoMédicaUtenteUtenteID) REFERENCES PedidoAvaliaçãoMédica (UtenteUtenteID);
ALTER TABLE UtenteLogin ADD CONSTRAINT FKUtenteLogi736733 FOREIGN KEY (UtenteUtenteID) REFERENCES Utente (UtenteID);
ALTER TABLE Documentos ADD CONSTRAINT FKDocumentos679363 FOREIGN KEY (PedidoAvaliaçãoMédicaUtenteUtenteID) REFERENCES PedidoAvaliaçãoMédica (UtenteUtenteID);
ALTER TABLE PedidoJMInfomarçãoAdicional ADD CONSTRAINT FKPedidoJMIn583025 FOREIGN KEY (PedidoAvaliaçãoMédicaUtenteUtenteID) REFERENCES PedidoAvaliaçãoMédica (UtenteUtenteID);
ALTER TABLE MédicoLogin ADD CONSTRAINT FKMédicoLogi209529 FOREIGN KEY (MedicoMedicoID) REFERENCES Médico (MedicoID);
ALTER TABLE UtenteContacto ADD CONSTRAINT FKUtenteCont514312 FOREIGN KEY (UtenteIdentificaçãoUtenteID) REFERENCES Utente (UtenteID);
ALTER TABLE UtenteResidência ADD CONSTRAINT FKUtenteResi466631 FOREIGN KEY (CodigoPostalCP) REFERENCES UtenteResidênciaCP (CP);
ALTER TABLE UtenteResidência ADD CONSTRAINT FKUtenteResi488621 FOREIGN KEY (UtenteIdentificaçãoUtenteID) REFERENCES Utente (UtenteID);
ALTER TABLE Condição ADD CONSTRAINT FKCondição384816 FOREIGN KEY (AvaliaçãoMédicaIDAvaliação) REFERENCES AvaliaçãoMédica (IDAvaliação);
ALTER TABLE Condição ADD CONSTRAINT FKCondição967531 FOREIGN KEY (IncapacidadeNumeroIncapacidadeID) REFERENCES Incapacidade (IncapacidadeID);
ALTER TABLE Médica_Junta ADD CONSTRAINT FKMédica_Jun344021 FOREIGN KEY (MédicoMedicoID) REFERENCES Médico (MedicoID);
ALTER TABLE Médica_Junta ADD CONSTRAINT FKMédica_Jun638868 FOREIGN KEY (JuntaMédicaJMID) REFERENCES JuntaMédica (JMID);
ALTER TABLE JuntaMédica ADD CONSTRAINT FKJuntaMédic554304 FOREIGN KEY (MédicoMedicoID) REFERENCES Médico (MedicoID);
-----ADICIONADO----
ALTER TABLE PedidoAvaliaçãoMédica
ADD COLUMN PedidoEnviadoParaJuntaMédica BOOLEAN;
--------Documentos .PDF ou outros!
ALTER TABLE Documentos
ALTER COLUMN Documento TYPE bytea;
