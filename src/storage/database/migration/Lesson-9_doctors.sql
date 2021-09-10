CREATE DATABASE IF NOT EXISTS queuedb;

USE queuedb;

CREATE TABLE IF NOT EXISTS specializations (
    specializationID VARCHAR(255),
    specializationName VARCHAR(255),
    PRIMARY KEY (specializationID)
    );

CREATE TABLE IF NOT EXISTS doctors (
    doctorID VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    gender VARCHAR(255),
    birthday DATE,
    PRIMARY KEY (doctorID)
    );


CREATE TABLE IF NOT EXISTS doctor_specialization (
    specializationID VARCHAR(255),
    doctorID VARCHAR(255),
    FOREIGN KEY (doctorID) REFERENCES doctors(doctorID),
    FOREIGN KEY (specializationID) REFERENCES specializations(specializationID)
    );

INSERT INTO specializations ( specializationID, specializationName ) VALUES
    ('c5360c66-10ac-11ec-82a8-0242ac130003', 'internist'),
    ('f7800e7e-10ac-11ec-82a8-0242ac130003', 'surgeon'),
    ('07bef192-10ad-11ec-82a8-0242ac130003', 'oncologist'),
    ('19a10986-10ad-11ec-82a8-0242ac130003', 'pediatrician');


INSERT INTO doctors ( doctorID, firstName, lastName, gender, birthday) VALUES
    ('90f3553c-1091-11ec-82a8-0242ac130003', 'Dima', 'Mitrichenko', 'male', '2000-02-18'),
    ('934bf734-1092-11ec-82a8-0242ac130003', 'Misha', 'Zyusko', 'male', '2001-03-18'),
    ('633f7ae2-1093-11ec-82a8-0242ac130003', 'Tim', 'Kinevich', 'male', '2001-02-18'),
    ('93deb8b6-1093-11ec-82a8-0242ac130003', 'Oleg', 'Dublyanin', 'male', '1995-02-18');

INSERT INTO doctor_specialization ( specializationID, doctorID ) VALUES
    ('c5360c66-10ac-11ec-82a8-0242ac130003', '90f3553c-1091-11ec-82a8-0242ac130003'),
    ('f7800e7e-10ac-11ec-82a8-0242ac130003', '934bf734-1092-11ec-82a8-0242ac130003'),
    ('07bef192-10ad-11ec-82a8-0242ac130003', '633f7ae2-1093-11ec-82a8-0242ac130003'),
    ('19a10986-10ad-11ec-82a8-0242ac130003', '93deb8b6-1093-11ec-82a8-0242ac130003');
