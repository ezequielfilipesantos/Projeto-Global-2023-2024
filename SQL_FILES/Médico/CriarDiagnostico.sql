CREATE OR REPLACE FUNCTION insert_diagnostico_medico(
    medicoMedicoID int4,
    avaliacaoMedicaIDAvaliacao int4,
    avaliacaoIncapacidade int4,
    dataDiagnostico date
) RETURNS void AS $$
BEGIN
    -- Insert into DiagnósticoMédico table
    INSERT INTO DiagnósticoMédico (MedicoMedicoID, AvaliaçãoMédicaIDAvaliação, AvaliaçãoIncapacidade, DataDiagnóstico)
    VALUES (medicoMedicoID, avaliacaoMedicaIDAvaliacao, avaliacaoIncapacidade, dataDiagnostico);

    -- Commit the transaction
    COMMIT;
END;
$$ LANGUAGE plpgsql;