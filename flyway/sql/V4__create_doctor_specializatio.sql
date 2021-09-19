USE clinic;

CREATE TABLE IF NOT EXISTS doctor_specialization (
    specialization_id VARCHAR(255),
    doctor_id VARCHAR(255),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
    FOREIGN KEY (specialization_id) REFERENCES specializations(specialization_id)
);
