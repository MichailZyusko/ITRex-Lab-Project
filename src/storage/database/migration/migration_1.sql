CREATE DATABASE IF NOT EXISTS queuedb;

USE queuedb;

CREATE TABLE IF NOT EXISTS specializations (
    specializationID VARCHAR(255),
    specializationName VARCHAR(255),
    PRIMARY KEY (specializationID)
);
