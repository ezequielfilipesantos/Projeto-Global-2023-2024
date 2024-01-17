-- Tabela "Utente"
INSERT INTO Utente (Nome, NISS, CC, NIF, DataNascimento, Sexo, Nacionalidade, FreguesiaNaturalidade, ConcelhoNaturalidade, PaisNaturalidade, Validade_Visto_R, VistoResidência, TipoSanguineo)
VALUES ('João Silva', 123456789, '1234567890AB', '123456789', '1990-05-15', 'Masculino', 'Português', 'Lisboa', 'Lisboa', 'Portugal', '2024-12-31', 'Estudante', 'A+');

INSERT INTO Utente (Nome, NISS, CC, NIF, DataNascimento, Sexo, Nacionalidade, FreguesiaNaturalidade, ConcelhoNaturalidade, PaisNaturalidade, Validade_Visto_R, VistoResidência, TipoSanguineo)
VALUES ('Maria Santos', 987654321, '9876543210CD', '987654321', '1985-08-20', 'Feminino', 'Português', 'Porto', 'Porto', 'Portugal', '2024-12-31', 'Empresária', 'B-');

-- Tabela "SituaçãoProfissional"
INSERT INTO SituaçãoProfissional (Profissão, Situação_Profissional)
VALUES ('Estudante', 'Estudante');

INSERT INTO SituaçãoProfissional (Profissão, Situação_Profissional)
VALUES ('Empresário', 'Empregado por conta própria');

-- Tabela "UtenteContacto"
INSERT INTO UtenteContacto (Telefone, Telemóvel, Email)
VALUES (210123456, 912345678, 'joao.silva@email.com');

INSERT INTO UtenteContacto (Telefone, Telemóvel, Email)
VALUES (220987654, 925678901, 'maria.santos@email.com');

-- Tabela "CP"
INSERT INTO CP (Localidade)
VALUES ('Lisboa');

INSERT INTO CP (Localidade)
VALUES ('Porto');

-- Tabela "Residência"
INSERT INTO Residência (RuaResidência, DistritoResidência, FreguesiaResidência, ConcelhoResidência, CPCP)
VALUES ('Rua da Amizade, 123', 'Lisboa', 'Lisboa', 'Lisboa', 1);

INSERT INTO Residência (RuaResidência, DistritoResidência, FreguesiaResidência, ConcelhoResidência, CPCP)
VALUES ('Avenida da Liberdade, 456', 'Porto', 'Porto', 'Porto', 2);

-- Tabela "Utente_Residência"
INSERT INTO Utente_Residência (Utenteutente_ID, Residêncianacionalidade_ID)
VALUES (1, 1);

INSERT INTO Utente_Residência (Utenteutente_ID, Residêncianacionalidade_ID)
VALUES (2, 2);

-- Tabela "CondiçãoPréExistente"
INSERT INTO CondiçãoPréExistente (Utenteutente_ID, NomeCondição, Anotação)
VALUES (1, 1, 'Hipertensão');

INSERT INTO CondiçãoPréExistente (Utenteutente_ID, NomeCondição, Anotação)
VALUES (2, 2, 'Alergia a amendoins');

-- Tabela "Utente_UtenteContacto"
INSERT INTO Utente_UtenteContacto (Utenteutente_ID, UtenteContactoContacto_ID)
VALUES (1, 1);

INSERT INTO Utente_UtenteContacto (Utenteutente_ID, UtenteContactoContacto_ID)
VALUES (2, 2);

-- Tabela "Utente_SituaçãoProfissional"
INSERT INTO Utente_SituaçãoProfissional (Utenteutente_ID, SituaçãoProfissionalSitProfissionalID)
VALUES (1, 1);

INSERT INTO Utente_SituaçãoProfissional (Utenteutente_ID, SituaçãoProfissionalSitProfissionalID)
VALUES (2, 2);
-- Tabela "Utente"
INSERT INTO Utente (Nome, NISS, CC, NIF, DataNascimento, Sexo, Nacionalidade, FreguesiaNaturalidade, ConcelhoNaturalidade, PaisNaturalidade, Validade_Visto_R, VistoResidência, TipoSanguineo)
VALUES ('Ana Pereira', 234567890, '2345678901DE', '234567890', '1988-03-10', 'Feminino', 'Português', 'Porto', 'Porto', 'Portugal', '2023-11-30', 'Estudante', 'O-');

INSERT INTO Utente (Nome, NISS, CC, NIF, DataNascimento, Sexo, Nacionalidade, FreguesiaNaturalidade, ConcelhoNaturalidade, PaisNaturalidade, Validade_Visto_R, VistoResidência, TipoSanguineo)
VALUES ('Ricardo Fernandes', 345678901, '3456789012FG', '345678901', '1995-12-05', 'Masculino', 'Português', 'Lisboa', 'Lisboa', 'Portugal', '2023-09-15', 'Trabalhador', 'A-');

-- Tabela "SituaçãoProfissional"
INSERT INTO SituaçãoProfissional (Profissão, Situação_Profissional)
VALUES ('Estudante', 'Estudante');

INSERT INTO SituaçãoProfissional (Profissão, Situação_Profissional)
VALUES ('Trabalhador', 'Empregado por conta de outrem');

-- Tabela "UtenteContacto"
INSERT INTO UtenteContacto (Telefone, Telemóvel, Email)
VALUES (217654321, 912345678, 'ana.pereira@email.com');

INSERT INTO UtenteContacto (Telefone, Telemóvel, Email)
VALUES (220123456, 925678901, 'ricardo.fernandes@email.com');

-- Tabela "CP"
INSERT INTO CP (Localidade)
VALUES ('Lisboa');

INSERT INTO CP (Localidade)
VALUES ('Porto');

-- Tabela "Residência"
INSERT INTO Residência (RuaResidência, DistritoResidência, FreguesiaResidência, ConcelhoResidência, CPCP)
VALUES ('Avenida Central, 567', 'Lisboa', 'Lisboa', 'Lisboa', 1);

INSERT INTO Residência (RuaResidência, DistritoResidência, FreguesiaResidência, ConcelhoResidência, CPCP)
VALUES ('Rua do Comércio, 789', 'Porto', 'Porto', 'Porto', 2);

-- Tabela "Utente_Residência"
INSERT INTO Utente_Residência (Utenteutente_ID, Residêncianacionalidade_ID)
VALUES (3, 3);

INSERT INTO Utente_Residência (Utenteutente_ID, Residêncianacionalidade_ID)
VALUES (4, 4);

-- Tabela "CondiçãoPréExistente"
INSERT INTO CondiçãoPréExistente (Utenteutente_ID, NomeCondição, Anotação)
VALUES (3, 3, 'Asma');

INSERT INTO CondiçãoPréExistente (Utenteutente_ID, NomeCondição, Anotação)
VALUES (4, 4, 'Diabetes tipo 2');

-- Tabela "Utente_UtenteContacto"
INSERT INTO Utente_UtenteContacto (Utenteutente_ID, UtenteContactoContacto_ID)
VALUES (3, 3);

INSERT INTO Utente_UtenteContacto (Utenteutente_ID, UtenteContactoContacto_ID)
VALUES (4, 4);

-- Tabela "Utente_SituaçãoProfissional"
INSERT INTO Utente_SituaçãoProfissional (Utenteutente_ID, SituaçãoProfissionalSitProfissionalID)
VALUES (3, 3);

INSERT INTO Utente_SituaçãoProfissional (Utenteutente_ID, SituaçãoProfissionalSitProfissionalID)
VALUES (4, 4);


