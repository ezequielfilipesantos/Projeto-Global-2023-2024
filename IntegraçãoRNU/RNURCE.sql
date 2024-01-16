CREATE TABLE Utente (utente_ID SERIAL NOT NULL, Nome varchar(255), NISS int8, CC varchar(12), NIF varchar(9), DataNascimento date, Sexo varchar(255), Nacionalidade varchar(255), FreguesiaNaturalidade varchar(255), ConcelhoNaturalidade varchar(255), PaisNaturalidade varchar(255), Validade_Visto_R date, VistoResidência varchar(255), TipoSanguineo varchar(10), PRIMARY KEY (utente_ID));
CREATE TABLE SituaçãoProfissional (SitProfissionalID SERIAL NOT NULL, Profissão varchar(255), Situação_Profissional varchar(255), PRIMARY KEY (SitProfissionalID));
CREATE TABLE UtenteContacto (Contacto_ID SERIAL NOT NULL, Telefone int4, Telemóvel int4, Email varchar(255), PRIMARY KEY (Contacto_ID));
CREATE TABLE CP (CP SERIAL NOT NULL, Localidade varchar(255), PRIMARY KEY (CP));
CREATE TABLE Residência (nacionalidade_ID SERIAL NOT NULL, RuaResidência varchar(255), DistritoResidência varchar(255), FreguesiaResidência varchar(255), ConcelhoResidência varchar(255), CPCP int4 NOT NULL, PRIMARY KEY (nacionalidade_ID));
CREATE TABLE Utente_Residência (Utenteutente_ID int4 NOT NULL, Residêncianacionalidade_ID int4 NOT NULL, PRIMARY KEY (Utenteutente_ID, Residêncianacionalidade_ID));
CREATE TABLE CondiçãoPréExistente (Utenteutente_ID int4 NOT NULL, CondiçãoID SERIAL NOT NULL, NomeCondição int4, Anotação varchar(255), PRIMARY KEY (CondiçãoID));
CREATE TABLE Utente_UtenteContacto (Utenteutente_ID int4 NOT NULL, UtenteContactoContacto_ID int4 NOT NULL, PRIMARY KEY (Utenteutente_ID, UtenteContactoContacto_ID));
CREATE TABLE Utente_SituaçãoProfissional (Utenteutente_ID int4 NOT NULL, SituaçãoProfissionalSitProfissionalID int4 NOT NULL, PRIMARY KEY (Utenteutente_ID, SituaçãoProfissionalSitProfissionalID));

ALTER TABLE Utente_Residência ADD CONSTRAINT FKUtente_Res971028 FOREIGN KEY (Utenteutente_ID) REFERENCES Utente (utente_ID);
ALTER TABLE Utente_Residência ADD CONSTRAINT FKUtente_Res621785 FOREIGN KEY (Residêncianacionalidade_ID) REFERENCES Residência (nacionalidade_ID);
ALTER TABLE Residência ADD CONSTRAINT FKResidência707843 FOREIGN KEY (CPCP) REFERENCES CP (CP);
ALTER TABLE CondiçãoPréExistente ADD CONSTRAINT FKCondiçãoPr307977 FOREIGN KEY (Utenteutente_ID) REFERENCES Utente (utente_ID);
ALTER TABLE Utente_UtenteContacto ADD CONSTRAINT FKUtente_Ute935745 FOREIGN KEY (Utenteutente_ID) REFERENCES Utente (utente_ID);
ALTER TABLE Utente_UtenteContacto ADD CONSTRAINT FKUtente_Ute692493 FOREIGN KEY (UtenteContactoContacto_ID) REFERENCES UtenteContacto (Contacto_ID);
ALTER TABLE Utente_SituaçãoProfissional ADD CONSTRAINT FKUtente_Sit90235 FOREIGN KEY (Utenteutente_ID) REFERENCES Utente (utente_ID);
ALTER TABLE Utente_SituaçãoProfissional ADD CONSTRAINT FKUtente_Sit501272 FOREIGN KEY (SituaçãoProfissionalSitProfissionalID) REFERENCES SituaçãoProfissional (SitProfissionalID);
