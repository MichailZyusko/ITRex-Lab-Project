USE clinic;

CREATE TABLE IF NOT EXISTS doctors (
    doctor_id VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    gender VARCHAR(255),
    birthday DATE,
    user_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES credentials(user_id),
    PRIMARY KEY (doctor_id)
);
