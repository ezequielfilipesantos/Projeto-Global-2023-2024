-- Insert data into Médico table
INSERT INTO Médico (NomeMedico, Função, Especialidade)
VALUES
  ('Dr. Flávio Carvalho', 'Clínico Geral', 'Medicina Interna'),
  ('Dr. Ezequiel Santos', 'Cirurgião', 'Cirurgia Cardíaca'),
  ('Dra. Adneiza Pontes', 'Pediatra', 'Pediatria');

-- Insert data into MédicoLogin table
INSERT INTO MédicoLogin ("E-Mail", Password, MedicoMedicoID)
VALUES
  ('carvalhoflavio@ACESIPCA.com', 'password', 1), -- Assuming Dr. Ana Silva has MedicoID 1
  ('pontesadneiza@ACESIPCA.com', 'password', 3), -- Assuming Dr. Pedro Almeida has MedicoID 2
  ('santosezequiel@ACESIPCA.com', 'password', 2); -- Assuming Dra. Sofia Santos has MedicoID 3

SELECT *FROM MédicoLogin;

-- Update passwords for the médicos in MédicoLogin table
UPDATE MédicoLogin
SET Password = '$2b$10$kuEJ4ljTehAaNe0JAfNQkeh9JLqn5bpslOH.o.hCQmrL4PjP2jukm'
WHERE "E-Mail" = 'carvalhoflavio@ACESIPCA.com';

UPDATE MédicoLogin
SET Password = '$2b$10$kuEJ4ljTehAaNe0JAfNQkeh9JLqn5bpslOH.o.hCQmrL4PjP2jukm'
WHERE "E-Mail" = 'pontesadneiza@ACESIPCA.com';

UPDATE MédicoLogin
SET Password = '$2b$10$kuEJ4ljTehAaNe0JAfNQkeh9JLqn5bpslOH.o.hCQmrL4PjP2jukm'
WHERE "E-Mail" = 'santosezequiel@ACESIPCA.com';

