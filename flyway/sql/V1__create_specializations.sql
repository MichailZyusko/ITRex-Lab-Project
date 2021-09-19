CREATE DATABASE IF NOT EXISTS clinic;

USE clinic;

CREATE TABLE IF NOT EXISTS specializations (
    specialization_id VARCHAR(255),
    specialization_name VARCHAR(255),
    PRIMARY KEY (specialization_id)
);
