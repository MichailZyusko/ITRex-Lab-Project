use queuedb;

CREATE TABLE IF NOT EXISTS doctor_specialization (
    specializationID VARCHAR(255),
    doctorID VARCHAR(255),
    FOREIGN KEY (doctorID) REFERENCES doctors(doctorID),
    FOREIGN KEY (specializationID) REFERENCES specializations(specializationID)
);
